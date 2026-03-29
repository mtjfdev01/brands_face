import type { QueryResultRow } from "pg";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type ProductOrderRow = QueryResultRow & {
  id: number;
  request_type: string;
  cta_source: string;
  status: string;
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

export async function GET(request: Request) {  try {
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
