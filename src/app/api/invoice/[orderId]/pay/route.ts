import { NextResponse } from "next/server";
import { getPublicInvoicePayload } from "@/lib/publicInvoice";
import { createPayfastCheckoutForStandardOrder, isPayfastConfigured } from "@/lib/payfastServer";

export const dynamic = "force-dynamic";

type Body = {
  key?: string;
};

/** Public: start PayFast checkout for this invoice (validates `key`). */
export async function POST(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const id = Number(params.orderId);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ message: "Invalid invoice." }, { status: 400 });
    }

    const body = (await request.json().catch(() => ({}))) as Body;
    const key = body.key?.trim() ?? "";
    if (!key) {
      return NextResponse.json({ message: "Missing key." }, { status: 400 });
    }

    const inv = await getPublicInvoicePayload(id, key);
    if (!inv) {
      return NextResponse.json({ message: "Invoice not found." }, { status: 404 });
    }

    if (inv.order.request_type !== "standard_order") {
      return NextResponse.json({ message: "This invoice is not payable online." }, { status: 400 });
    }

    if (inv.payment.payment_status === "paid") {
      return NextResponse.json({ message: "This invoice is already paid." }, { status: 400 });
    }

    if (!isPayfastConfigured()) {
      return NextResponse.json({ message: "Online payment is not available." }, { status: 503 });
    }

    try {
      const session = await createPayfastCheckoutForStandardOrder(id, request);
      return NextResponse.json(session, { status: 200 });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment could not be started.";
      if (msg.toLowerCase().includes("not configured")) {
        return NextResponse.json({ message: msg }, { status: 503 });
      }
      return NextResponse.json({ message: msg }, { status: 502 });
    }
  } catch (error) {
    console.error("invoice pay:", error);
    return NextResponse.json({ message: "Unable to start payment." }, { status: 500 });
  }
}
