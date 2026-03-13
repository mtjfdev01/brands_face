import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureQuoteSchema } from "@/lib/quoteSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type QuoteRow = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  width: string;
  height: string;
  depth: string;
  material: string | null;
  thickness: string | null;
  addons: string[];
  finish: string | null;
  extra_finishes: string[];
  unboxing: string | null;
  quantity: number;
  status: string;
  counter_offer: string | null;
  created_at: string;
  updated_at: string;
};

export async function GET(request: Request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureQuoteSchema();
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const where: string[] = [];
    const values: Array<string> = [];

    if (from) {
      values.push(from);
      where.push(`created_at >= $${values.length}::date`);
    }
    if (to) {
      values.push(to);
      where.push(`created_at < ($${values.length}::date + INTERVAL '1 day')`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const result = await dbQuery<QuoteRow>(
      `SELECT
        id,
        full_name,
        email,
        phone,
        company,
        width,
        height,
        depth,
        material,
        thickness,
        addons,
        finish,
        extra_finishes,
        unboxing,
        quantity,
        status,
        counter_offer,
        created_at,
        updated_at
      FROM quote_requests
      ${whereSql}
      ORDER BY created_at DESC`,
      values,
    );

    return NextResponse.json({ quotes: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Admin quote list error:", error);
    return NextResponse.json({ message: "Unable to load quotes right now." }, { status: 500 });
  }
}
