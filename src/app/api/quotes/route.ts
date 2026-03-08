import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureQuoteSchema } from "@/lib/quoteSchema";

type CreateQuoteBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  material?: string | null;
  thickness?: string | null;
  addons?: string[];
  finish?: string | null;
  extraFinishes?: string[];
  unboxing?: string | null;
  quantity?: number;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    await ensureQuoteSchema();
    const body = (await request.json()) as CreateQuoteBody;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() || null;
    const company = body.company?.trim() || null;
    const width = Number(body.dimensions?.width);
    const height = Number(body.dimensions?.height);
    const depth = Number(body.dimensions?.depth);
    const material = body.material ?? null;
    const thickness = body.thickness ?? null;
    const addons = Array.isArray(body.addons) ? body.addons : [];
    const finish = body.finish ?? null;
    const extraFinishes = Array.isArray(body.extraFinishes) ? body.extraFinishes : [];
    const unboxing = body.unboxing ?? null;
    const quantity = Number(body.quantity);

    if (!fullName || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "Please provide valid contact details." }, { status: 400 });
    }

    if (![width, height, depth].every((value) => Number.isFinite(value) && value > 0)) {
      return NextResponse.json({ message: "Please provide valid dimensions." }, { status: 400 });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json({ message: "Please provide a valid quantity." }, { status: 400 });
    }

    const inserted = await dbQuery<{ id: number }>(
      `INSERT INTO quote_requests (
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
        quantity
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::text[], $11, $12::text[], $13, $14
      )
      RETURNING id`,
      [
        fullName,
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
        extraFinishes,
        unboxing,
        quantity,
      ],
    );

    return NextResponse.json(
      {
        message: "Quote request submitted successfully.",
        quoteId: inserted.rows[0]?.id ?? null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create quote error:", error);
    return NextResponse.json({ message: "Unable to submit quote right now." }, { status: 500 });
  }
}
