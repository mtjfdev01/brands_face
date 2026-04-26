import type { QueryResultRow } from "pg";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { upsertCustomerFromLead } from "@/lib/customerSchema";
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

type CreateAdminOrderBody = {
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
  adminNotes?: string | null;
};

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

/** Admin: create a standard order + customer (for manual sales / invoices). */
export async function POST(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureProductOrderSchema();
    const body = (await request.json()) as CreateAdminOrderBody;

    const productSlug = body.productSlug?.trim() || "admin-order";
    const productTitle = body.productTitle?.trim() ?? "";
    const quantity = Number(body.quantity);
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() || null;
    const company = body.company?.trim() || null;
    const customerNotes = body.customerNotes?.trim() || null;
    const adminNotes = body.adminNotes?.trim() || null;
    const sizeLabel = body.sizeLabel?.trim() || null;
    const sizeDimensions = body.sizeDimensions?.trim() || null;

    let pricePerPiece =
      body.pricePerPiece === null || typeof body.pricePerPiece === "undefined"
        ? null
        : Number(body.pricePerPiece);
    let lineTotal =
      body.lineTotal === null || typeof body.lineTotal === "undefined" ? null : Number(body.lineTotal);

    if (!productTitle) {
      return NextResponse.json({ message: "Product title is required." }, { status: 400 });
    }
    if (!fullName || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Valid customer name and email are required." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json({ message: "Quantity must be a positive integer." }, { status: 400 });
    }
    if (pricePerPiece === null || !Number.isFinite(pricePerPiece) || pricePerPiece < 0) {
      return NextResponse.json({ message: "Valid price per piece is required." }, { status: 400 });
    }
    if (lineTotal === null || !Number.isFinite(lineTotal) || lineTotal < 0) {
      lineTotal = Math.round(quantity * pricePerPiece * 100) / 100;
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
        full_name,
        email,
        phone,
        company,
        customer_notes,
        admin_notes,
        customer_id
      )
      VALUES ('standard_order', 'admin', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        productSlug,
        productTitle,
        quantity,
        sizeLabel,
        sizeDimensions,
        pricePerPiece,
        lineTotal,
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

    return NextResponse.json({ id, message: "Order created." }, { status: 201 });
  } catch (error) {
    console.error("admin product-orders POST:", error);
    return NextResponse.json({ message: "Unable to create order." }, { status: 500 });
  }
}
