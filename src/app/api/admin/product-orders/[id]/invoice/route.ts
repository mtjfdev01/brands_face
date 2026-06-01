import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { buildPublicInvoiceUrl, ensureInvoicePublicKey } from "@/lib/invoiceLink";
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

    let key: string;
    try {
      key = await ensureInvoicePublicKey(id, { regenerate });
    } catch (err) {
      if (err instanceof Error && err.message === "Order not found.") {
        return NextResponse.json({ message: "Not found." }, { status: 404 });
      }
      throw err;
    }
    const envOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
    const origin = envOrigin || new URL(request.url).origin;
    const url = buildPublicInvoiceUrl(id, key, origin);

    return NextResponse.json({ url, invoicePublicKey: key }, { status: 200 });
  } catch (error) {
    console.error("admin invoice POST:", error);
    return NextResponse.json({ message: "Unable to create invoice link." }, { status: 500 });
  }
}
