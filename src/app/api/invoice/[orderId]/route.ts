import { NextResponse } from "next/server";
import { resolvePublicInvoice } from "@/lib/publicInvoice";

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

  const result = await resolvePublicInvoice(id, key);
  if (result.status === "not_found") {
    return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
  }
  if (result.status === "expired") {
    return NextResponse.json(result.expired, { status: 410 });
  }

  return NextResponse.json(result.data, { status: 200 });
}
