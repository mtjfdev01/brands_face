import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureQuoteSchema } from "@/lib/quoteSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

type UpdateQuoteBody = {
  status?: string;
  counterOffer?: number | null;
};

const ALLOWED_STATUSES = ["pending", "in_review", "quoted", "approved", "rejected", "closed"] as const;

type QuoteDetailRow = {
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureQuoteSchema();
    const quoteId = Number(params.id);
    if (!Number.isInteger(quoteId) || quoteId <= 0) {
      return NextResponse.json({ message: "Invalid quote id." }, { status: 400 });
    }

    const result = await dbQuery<QuoteDetailRow>(
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
      WHERE id = $1
      LIMIT 1`,
      [quoteId],
    );

    if (!result.rowCount) {
      return NextResponse.json({ message: "Quote not found." }, { status: 404 });
    }

    return NextResponse.json({ quote: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Admin quote detail error:", error);
    return NextResponse.json({ message: "Unable to load quote right now." }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureQuoteSchema();
    const quoteId = Number(params.id);
    if (!Number.isInteger(quoteId) || quoteId <= 0) {
      return NextResponse.json({ message: "Invalid quote id." }, { status: 400 });
    }

    const body = (await request.json()) as UpdateQuoteBody;
    const hasStatus = typeof body.status !== "undefined";
    const hasCounter = typeof body.counterOffer !== "undefined";

    if (!hasStatus && !hasCounter) {
      return NextResponse.json({ message: "No update payload provided." }, { status: 400 });
    }

    const updates: string[] = [];
    const values: Array<string | number | null> = [];
    let idx = 1;

    if (hasStatus) {
      const status = body.status?.trim().toLowerCase() ?? "";
      if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
        return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
      }
      updates.push(`status = $${idx++}`);
      values.push(status);
    }

    if (hasCounter) {
      const counterOffer = body.counterOffer;
      if (typeof counterOffer === "undefined") {
        return NextResponse.json({ message: "Counter offer payload is invalid." }, { status: 400 });
      }
      if (counterOffer !== null && (!Number.isFinite(counterOffer) || counterOffer < 0)) {
        return NextResponse.json({ message: "Counter offer must be a valid positive number or null." }, { status: 400 });
      }
      updates.push(`counter_offer = $${idx++}`);
      values.push(counterOffer ?? null);
    }

    updates.push("updated_at = NOW()");
    values.push(quoteId);

    const result = await dbQuery<{ id: number }>(
      `UPDATE quote_requests
       SET ${updates.join(", ")}
       WHERE id = $${idx}
       RETURNING id`,
      values,
    );

    if (!result.rowCount) {
      return NextResponse.json({ message: "Quote not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Quote updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Admin quote update error:", error);
    return NextResponse.json({ message: "Unable to update quote right now." }, { status: 500 });
  }
}
