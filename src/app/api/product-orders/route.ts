import path from "path";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { upsertCustomerFromLead } from "@/lib/customerSchema";
import {
  fetchPayfastAccessPayload,
  getPayfastBrandingFromRequest,
  isCheckoutPhoneOk,
  isPayfastConfigured,
  markOrderPaymentPendingCheckout,
  persistProductOrderGatewayError,
} from "@/lib/payfastServer";
import { insertOrderLineItems } from "@/lib/orderLineItems";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import type { PayfastCheckoutBranding } from "@/lib/payfastTypes";
import { getProductOrdersS3Folder, isS3Configured, uploadFileToS3 } from "@/lib/s3";

type Body = {
  requestType?: string;
  ctaSource?: string;
  productSlug?: string;
  productTitle?: string;
  quantity?: number;
  sizeLabel?: string | null;
  sizeDimensions?: string | null;
  pricePerPiece?: number | null;
  lineTotal?: number | null;
  fullName?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  customerNotes?: string | null;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ARTWORK_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf", ".zip", ".ai", ".eps", ".svg"]);
const ARTWORK_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/postscript",
  "application/illustrator",
  "image/svg+xml",
  "application/octet-stream",
]);
const MAX_ARTWORK_BYTES = 2 * 1024 * 1024;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function parseOrderRequest(request: Request): Promise<{ fields: Body; artwork: File | null }> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const raw = formData.get("artwork");
    const artwork = raw instanceof File && raw.size > 0 ? raw : null;
    const qtyRaw = getString(formData, "quantity");
    const priceRaw = getString(formData, "pricePerPiece");
    const totalRaw = getString(formData, "lineTotal");
    return {
      fields: {
        requestType: getString(formData, "requestType"),
        ctaSource: getString(formData, "ctaSource"),
        productSlug: getString(formData, "productSlug"),
        productTitle: getString(formData, "productTitle"),
        quantity: qtyRaw ? Number(qtyRaw) : undefined,
        sizeLabel: getString(formData, "sizeLabel") || null,
        sizeDimensions: getString(formData, "sizeDimensions") || null,
        pricePerPiece: priceRaw ? Number(priceRaw) : null,
        lineTotal: totalRaw ? Number(totalRaw) : null,
        fullName: getString(formData, "fullName"),
        email: getString(formData, "email"),
        phone: getString(formData, "phone") || null,
        company: getString(formData, "company") || null,
        customerNotes: getString(formData, "customerNotes") || null,
      },
      artwork,
    };
  }

  return { fields: (await request.json()) as Body, artwork: null };
}

export async function POST(request: Request) {
  try {
    await ensureProductOrderSchema();
    const { fields: body, artwork } = await parseOrderRequest(request);

    const requestType = body.requestType?.trim().toLowerCase() ?? "";
    if (requestType !== "custom_quote" && requestType !== "standard_order") {
      return NextResponse.json({ message: "Invalid request type." }, { status: 400 });
    }

    let cta = body.ctaSource?.trim().toLowerCase() ?? "place_order";
    if (requestType === "custom_quote") {
      cta = "custom_quote";
    } else if (cta !== "place_order" && cta !== "add_to_cart") {
      cta = "place_order";
    }

    const productSlug = body.productSlug?.trim() ?? "";
    const productTitle = body.productTitle?.trim() ?? "";
    const quantity = Number(body.quantity);
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() || null;
    const company = body.company?.trim() || null;
    const customerNotes = body.customerNotes?.trim() || null;
    const sizeLabel = body.sizeLabel?.trim() || null;
    const sizeDimensions = body.sizeDimensions?.trim() || null;

    let pricePerPiece: number | null =
      body.pricePerPiece === null || typeof body.pricePerPiece === "undefined"
        ? null
        : Number(body.pricePerPiece);
    let lineTotal: number | null =
      body.lineTotal === null || typeof body.lineTotal === "undefined" ? null : Number(body.lineTotal);

    if (!productSlug || !productTitle) {
      return NextResponse.json({ message: "Product information is required." }, { status: 400 });
    }

    if (!fullName || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Please provide valid contact details." }, { status: 400 });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json({ message: "Please provide a valid quantity." }, { status: 400 });
    }

    if (requestType === "standard_order") {
      if (pricePerPiece === null || !Number.isFinite(pricePerPiece) || pricePerPiece < 0) {
        return NextResponse.json({ message: "Invalid price data for this order." }, { status: 400 });
      }
      if (lineTotal === null || !Number.isFinite(lineTotal) || lineTotal < 0) {
        return NextResponse.json({ message: "Invalid total for this order." }, { status: 400 });
      }
      if (isPayfastConfigured() && lineTotal > 0) {
        if (!isCheckoutPhoneOk(phone)) {
          return NextResponse.json(
            { message: "A valid phone number is required for secure checkout." },
            { status: 400 },
          );
        }
      }
    } else {
      pricePerPiece = null;
      lineTotal = null;
    }

    let artworkUrl: string | null = null;
    if (artwork) {
      if (!isS3Configured()) {
        return NextResponse.json(
          {
            message:
              "File upload is not available yet. Please try again later or submit without artwork.",
          },
          { status: 503 },
        );
      }

      const ext = path.extname(artwork.name).toLowerCase();
      const mimeOk = !artwork.type || ARTWORK_MIME.has(artwork.type);
      if (!ARTWORK_EXT.has(ext) || !mimeOk) {
        return NextResponse.json(
          { message: "Artwork must be JPG, PNG, WEBP, PDF, ZIP, AI, EPS, or SVG." },
          { status: 400 },
        );
      }
      if (artwork.size > MAX_ARTWORK_BYTES) {
        return NextResponse.json({ message: "Artwork must be 2 MB or smaller." }, { status: 400 });
      }

      try {
        artworkUrl = await uploadFileToS3({ file: artwork, folder: getProductOrdersS3Folder() });
      } catch (uploadError) {
        console.error("product-orders S3 upload error:", uploadError);
        return NextResponse.json(
          { message: "Unable to upload artwork right now. Please try again." },
          { status: 502 },
        );
      }
    }

    const customerId = await upsertCustomerFromLead({
      email,
      fullName,
      phone,
      company,
    });

    const inserted = await dbQuery<{ id: number }>(
      `INSERT INTO product_orders (
        request_type,
        cta_source,
        product_slug,
        product_title,
        quantity,
        size_label,
        size_dimensions,
        price_per_piece,
        line_total,
        grand_total,
        full_name,
        email,
        phone,
        company,
        customer_notes,
        artwork_url,
        customer_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING id`,
      [
        requestType,
        cta,
        productSlug,
        productTitle,
        quantity,
        sizeLabel,
        sizeDimensions,
        pricePerPiece,
        lineTotal,
        requestType === "standard_order" ? lineTotal : null,
        fullName,
        email,
        phone,
        company,
        customerNotes,
        artworkUrl,
        customerId,
      ],
    );

    const orderId = inserted.rows[0]?.id ?? null;
    if (!orderId) {
      return NextResponse.json({ message: "Unable to create order." }, { status: 500 });
    }

    if (requestType === "standard_order" && lineTotal !== null) {
      await insertOrderLineItems(orderId, [
        {
          productTitle,
          productSlug,
          sizeLabel,
          sizeDimensions,
          quantity,
          pricePerPiece: pricePerPiece!,
          lineTotal,
        },
      ]);
    }

    let payfast: Record<string, unknown> | undefined;
    let branding: PayfastCheckoutBranding | undefined;

    if (
      requestType === "standard_order" &&
      isPayfastConfigured() &&
      lineTotal !== null &&
      lineTotal > 0 &&
      phone
    ) {
      branding = getPayfastBrandingFromRequest(request);
      try {
        payfast = await fetchPayfastAccessPayload(String(orderId), lineTotal);
        await markOrderPaymentPendingCheckout(orderId);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "PayFast token failed";
        await persistProductOrderGatewayError(orderId, msg);
        return NextResponse.json(
          {
            message:
              "Your order was saved, but we could not start the payment page. Our team will contact you with a payment link.",
            id: orderId,
            checkoutError: true,
          },
          { status: 201 },
        );
      }
    }

    const baseMessage =
      requestType === "custom_quote"
        ? "Quote request received. Our sales team will contact you shortly."
        : payfast
          ? "Redirecting to secure checkout…"
          : "Order request submitted. We will confirm details with you soon.";

    return NextResponse.json(
      {
        message: baseMessage,
        id: orderId,
        ...(payfast && branding ? { payfast, branding } : {}),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("product-orders POST:", error);
    return NextResponse.json({ message: "Unable to submit right now. Please try again later." }, { status: 500 });
  }
}
