import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { createPayfastCheckoutForStandardOrder, isPayfastConfigured } from "@/lib/payfastServer";

export const dynamic = "force-dynamic";

/** Admin: mint PayFast PostTransaction payload for an existing order (invoice / payment link). */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!isPayfastConfigured()) {
      return NextResponse.json({ message: "PayFast is not configured on this server." }, { status: 503 });
    }

    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ message: "Invalid id." }, { status: 400 });
    }

    try {
      const sessionPayload = await createPayfastCheckoutForStandardOrder(id, request);
      return NextResponse.json(sessionPayload, { status: 200 });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "PayFast token failed";
      const m = msg.toLowerCase();
      const status =
        m.includes("not configured")
          ? 503
          : m.includes("not found")
            ? 404
            : m.includes("already marked paid") ||
                m.includes("payable total") ||
                m.includes("phone") ||
                m.includes("only standard")
              ? 400
              : 502;
      return NextResponse.json({ message: msg }, { status });
    }
  } catch (error) {
    console.error("admin payment-session:", error);
    return NextResponse.json({ message: "Unable to create payment session." }, { status: 500 });
  }
}
