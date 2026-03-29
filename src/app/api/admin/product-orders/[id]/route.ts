import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { isProductOrderStatus } from "@/lib/productOrderStatus";

/** Updates only; rows are never deleted — use status `cancelled` to close an order. */

type PatchBody = {
  status?: string;
  adminNotes?: string | null;
};

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

    const body = (await request.json()) as PatchBody;
    const hasStatus = typeof body.status !== "undefined";
    const hasNotes = typeof body.adminNotes !== "undefined";

    if (!hasStatus && !hasNotes) {
      return NextResponse.json({ message: "Nothing to update." }, { status: 400 });
    }

    const updates: string[] = [];
    const values: Array<string | number | null> = [];
    let idx = 1;

    if (hasStatus) {
      const status = body.status?.trim().toLowerCase() ?? "";
      if (!isProductOrderStatus(status)) {
        return NextResponse.json({ message: "Invalid status." }, { status: 400 });
      }
      updates.push(`status = $${idx++}`);
      values.push(status);
    }

    if (hasNotes) {
      const notes = body.adminNotes === null ? null : String(body.adminNotes).trim() || null;
      updates.push(`admin_notes = $${idx++}`);
      values.push(notes);
    }

    updates.push("updated_at = NOW()");
    values.push(id);

    const result = await dbQuery<{ id: number }>(
      `UPDATE product_orders SET ${updates.join(", ")} WHERE id = $${idx} RETURNING id`,
      values,
    );

    if (!result.rowCount) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated." }, { status: 200 });
  } catch (error) {
    console.error("admin product-orders PATCH:", error);
    return NextResponse.json({ message: "Unable to update." }, { status: 500 });
  }
}
