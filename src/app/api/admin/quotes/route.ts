import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureQuoteSchema } from "@/lib/quoteSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type QuoteRow = {
  id: number;
  phone: string | null;
  requirement: string | null;
  attachment_paths: string[] | null;
  status: string;
  counter_offer: string | null;
  created_at: string;
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
        phone,
        requirement,
        attachment_paths,
        status,
        counter_offer,
        created_at
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
