import type { QueryResultRow } from "pg";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { upsertCustomerFromLead } from "@/lib/customerSchema";
import { buildPublicInvoiceUrl, ensureInvoicePublicKey } from "@/lib/invoiceLink";
import {
  computeLineTotal,
  insertOrderLineItems,
  sumLineTotals,
  type OrderLineItemInput,
} from "@/lib/orderLineItems";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ProductOrderRow = QueryResultRow & {
  id: number;
  request_type: string;
  cta_source: string;
  status: string;
  customer_id: string | null;
  payment_status: string;
  gateway_error: string | null;
  invoice_public_key: string | null;
  product_slug: string;
  product_title: string;
  quantity: number;
  size_label: string | null;
  size_dimensions: string | null;
  price_per_piece: string | null;
  line_total: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

type LineItemBody = {
  productTitle?: string;
  productSlug?: string;
  category?: string | null;
  sizeLabel?: string | null;
  sizeDimensions?: string | null;
  quantity?: number;
  pricePerPiece?: number;
  lineTotal?: number | null;
  discountedLineTotal?: number | null;
};

type CreateAdminOrderBody = {
  fullName?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  customerId?: number | null;
  dueDate?: string | null;
  grandTotal?: number | null;
  discountedGrandTotal?: number | null;
  lineItems?: LineItemBody[];
  customerNotes?: string | null;
  adminNotes?: string | null;
  generateInvoice?: boolean;
  /** @deprecated Use lineItems */
  productSlug?: string;
  productTitle?: string;
  category?: string | null;
  quantity?: number;
  sizeLabel?: string | null;
  sizeDimensions?: string | null;
  pricePerPiece?: number | null;
  lineTotal?: number | null;
};

function parseDueDate(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  const d = raw.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  return d;
}

function normalizeLineItems(body: CreateAdminOrderBody): OrderLineItemInput[] | { error: string } {
  if (Array.isArray(body.lineItems) && body.lineItems.length > 0) {
    const out: OrderLineItemInput[] = [];
    for (let i = 0; i < body.lineItems.length; i++) {
      const row = body.lineItems[i];
      const productTitle = row.productTitle?.trim() ?? "";
      const quantity = Number(row.quantity);
      const pricePerPiece = Number(row.pricePerPiece);
      if (!productTitle) {
        return { error: `Line ${i + 1}: product name is required.` };
      }
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return { error: `Line ${i + 1}: quantity must be a positive whole number.` };
      }
      if (!Number.isFinite(pricePerPiece) || pricePerPiece < 0) {
        return { error: `Line ${i + 1}: price per item must be a valid number.` };
      }
      let lineTotal =
        row.lineTotal === null || typeof row.lineTotal === "undefined" ? undefined : Number(row.lineTotal);
      if (lineTotal !== undefined && (!Number.isFinite(lineTotal) || lineTotal < 0)) {
        return { error: `Line ${i + 1}: line total is invalid.` };
      }
      if (lineTotal === undefined) {
        lineTotal = computeLineTotal(quantity, pricePerPiece);
      }
      let discountedLineTotal: number | null =
        row.discountedLineTotal === null || typeof row.discountedLineTotal === "undefined"
          ? null
          : Number(row.discountedLineTotal);
      if (discountedLineTotal !== null && (!Number.isFinite(discountedLineTotal) || discountedLineTotal < 0)) {
        return { error: `Line ${i + 1}: discounted line total is invalid.` };
      }
      out.push({
        productTitle,
        productSlug: row.productSlug?.trim() || row.category?.trim() || "admin-order",
        category: row.category?.trim() || null,
        sizeLabel: row.sizeLabel?.trim() || null,
        sizeDimensions: row.sizeDimensions?.trim() || null,
        quantity,
        pricePerPiece,
        lineTotal,
        discountedLineTotal,
      });
    }
    return out;
  }

  const productTitle = body.productTitle?.trim() ?? "";
  const quantity = Number(body.quantity);
  const pricePerPiece = Number(body.pricePerPiece);
  if (!productTitle) {
    return { error: "Add at least one product line." };
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { error: "Quantity must be a positive integer." };
  }
  if (!Number.isFinite(pricePerPiece) || pricePerPiece < 0) {
    return { error: "Valid price per piece is required." };
  }
  let lineTotal =
    body.lineTotal === null || typeof body.lineTotal === "undefined" ? undefined : Number(body.lineTotal);
  if (lineTotal === undefined) {
    lineTotal = computeLineTotal(quantity, pricePerPiece);
  }
  return [
    {
      productTitle,
      productSlug: body.productSlug?.trim() || body.category?.trim() || "admin-order",
      category: body.category?.trim() || null,
      sizeLabel: body.sizeLabel?.trim() || null,
      sizeDimensions: body.sizeDimensions?.trim() || null,
      quantity,
      pricePerPiece,
      lineTotal,
      discountedLineTotal: null,
    },
  ];
}

export async function GET(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureProductOrderSchema();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status")?.trim().toLowerCase();

    const where: string[] = [];
    const values: string[] = [];
    if (status && status !== "all") {
      values.push(status);
      where.push(`status = $${values.length}`);
    }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const result = await dbQuery<ProductOrderRow>(
      `SELECT
        id,
        request_type,
        cta_source,
        status,
        customer_id::text,
        payment_status,
        gateway_error,
        invoice_public_key,
        product_slug,
        product_title,
        quantity,
        size_label,
        size_dimensions,
        price_per_piece::text,
        line_total::text,
        full_name,
        email,
        phone,
        company,
        customer_notes,
        admin_notes,
        created_at,
        updated_at
      FROM product_orders
      ${whereSql}
      ORDER BY created_at DESC`,
      values,
    );

    return NextResponse.json({ orders: result.rows }, { status: 200 });
  } catch (error) {
    console.error("admin product-orders GET:", error);
    return NextResponse.json({ message: "Unable to load orders." }, { status: 500 });
  }
}

/** Admin: create a standard order with one or more line items + optional invoice link. */
export async function POST(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureProductOrderSchema();
    const body = (await request.json()) as CreateAdminOrderBody;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() || null;
    const company = body.company?.trim() || null;
    const customerNotes = body.customerNotes?.trim() || null;
    const adminNotes = body.adminNotes?.trim() || null;
    const dueDate = parseDueDate(body.dueDate);
    const generateInvoice = body.generateInvoice !== false;

    if (!fullName || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Valid customer name and email are required." }, { status: 400 });
    }

    const normalized = normalizeLineItems(body);
    if ("error" in normalized) {
      return NextResponse.json({ message: normalized.error }, { status: 400 });
    }
    const lineItems = normalized;

    const computed = sumLineTotals(
      lineItems.map((i) => ({
        lineTotal: i.lineTotal ?? computeLineTotal(i.quantity, i.pricePerPiece),
        discountedLineTotal: i.discountedLineTotal,
      })),
    );

    let grandTotal =
      body.grandTotal === null || typeof body.grandTotal === "undefined" ? computed.grandTotal : Number(body.grandTotal);
    if (!Number.isFinite(grandTotal) || grandTotal < 0) {
      return NextResponse.json({ message: "Grand total is invalid." }, { status: 400 });
    }

    let discountedGrandTotal: number | null =
      body.discountedGrandTotal === null || typeof body.discountedGrandTotal === "undefined"
        ? computed.discountedGrandTotal
        : Number(body.discountedGrandTotal);
    if (discountedGrandTotal !== null && (!Number.isFinite(discountedGrandTotal) || discountedGrandTotal < 0)) {
      return NextResponse.json({ message: "Discounted grand total is invalid." }, { status: 400 });
    }

    const customerId = await upsertCustomerFromLead({
      email,
      fullName,
      phone,
      company,
    });

    const first = lineItems[0];
    const headerLineTotal = first.lineTotal ?? computeLineTotal(first.quantity, first.pricePerPiece);

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
        discounted_grand_total,
        due_date,
        full_name,
        email,
        phone,
        company,
        customer_notes,
        admin_notes,
        customer_id
      )
      VALUES (
        'standard_order', 'admin', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::date,
        $11, $12, $13, $14, $15, $16, $17
      )
      RETURNING id`,
      [
        first.productSlug?.trim() || "admin-order",
        first.productTitle,
        first.quantity,
        first.sizeLabel,
        first.sizeDimensions,
        first.pricePerPiece,
        headerLineTotal,
        grandTotal,
        discountedGrandTotal,
        dueDate,
        fullName,
        email,
        phone,
        company,
        customerNotes,
        adminNotes,
        customerId,
      ],
    );

    const id = inserted.rows[0]?.id ?? null;
    if (!id) {
      return NextResponse.json({ message: "Unable to create order." }, { status: 500 });
    }

    await insertOrderLineItems(id, lineItems);

    let invoiceUrl: string | undefined;
    let invoicePublicKey: string | undefined;
    if (generateInvoice) {
      const key = await ensureInvoicePublicKey(id);
      const envOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
      const origin = envOrigin || new URL(request.url).origin;
      invoiceUrl = buildPublicInvoiceUrl(id, key, origin);
      invoicePublicKey = key;
    }

    return NextResponse.json(
      {
        id,
        message: "Order created.",
        invoiceUrl,
        invoicePublicKey,
        grandTotal,
        discountedGrandTotal,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("admin product-orders POST:", error);
    return NextResponse.json({ message: "Unable to create order." }, { status: 500 });
  }
}
