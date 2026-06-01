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

export async function POST(request: Request) {
  try {
    await ensureProductOrderSchema();
    const body = (await request.json()) as Body;

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
        customer_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
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
