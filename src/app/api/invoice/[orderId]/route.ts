import { NextResponse } from "next/server";
import { getPublicInvoicePayload } from "@/lib/publicInvoice";

export const dynamic = "force-dynamic";

/** Public invoice JSON (requires `?key=`). */
export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  const id = Number(params.orderId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: "Invalid invoice." }, { status: 400 });
  }

  const key = new URL(request.url).searchParams.get("key")?.trim() ?? "";
  if (!key) {
    return NextResponse.json({ message: "Missing key." }, { status: 400 });
  }

  const payload = await getPublicInvoicePayload(id, key);
  if (!payload) {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }

  return NextResponse.json(payload, { status: 200 });
}
