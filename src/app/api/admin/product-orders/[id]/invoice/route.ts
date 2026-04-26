import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";

export const dynamic = "force-dynamic";

type Body = {
  regenerate?: boolean;
};

/** Create or return the public invoice link: `/invoice/{id}?key=…` */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ensureProductOrderSchema();
    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ message: "Invalid id." }, { status: 400 });
    }

    const body = (await request.json().catch(() => ({}))) as Body;
    const regenerate = Boolean(body.regenerate);

    const existing = await dbQuery<{ invoice_public_key: string | null }>(
      `SELECT invoice_public_key FROM product_orders WHERE id = $1`,
      [id],
    );
    const row = existing.rows[0];
    if (!row) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }

    let key = row.invoice_public_key?.trim() || null;
    if (!key || regenerate) {
      key = randomUUID();
      await dbQuery(`UPDATE product_orders SET invoice_public_key = $1, updated_at = NOW() WHERE id = $2`, [
        key,
        id,
      ]);
    }

    const envOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
    const origin = envOrigin || new URL(request.url).origin;
    const url = `${origin}/invoice/${id}?key=${encodeURIComponent(key)}`;

    return NextResponse.json({ url, invoicePublicKey: key }, { status: 200 });
  } catch (error) {
    console.error("admin invoice POST:", error);
    return NextResponse.json({ message: "Unable to create invoice link." }, { status: 500 });
  }
}
