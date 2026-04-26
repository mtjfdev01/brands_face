import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";

export const dynamic = "force-dynamic";

function pickBasketId(body: Record<string, unknown>): string | null {
  const raw =
    body.BASKET_ID ??
    body.basket_id ??
    body.BasketId ??
    body.orderId ??
    body.ORDER_ID;
  if (raw == null || raw === "") return null;
  return String(raw).trim();
}

/** Gateway server notify (CHECKOUT_URL). Body shape varies — we key off BASKET_ID = product_orders.id. */
export async function POST(request: Request) {
  try {
    const ct = request.headers.get("content-type") || "";
    let flat: Record<string, unknown> = {};

    if (ct.includes("application/json")) {
      flat = (await request.json()) as Record<string, unknown>;
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      params.forEach((v, k) => {
        flat[k] = v;
      });
    } else {
      const form = await request.formData();
      form.forEach((v, k) => {
        flat[k] = typeof v === "string" ? v : "";
      });
    }

    const basketId = pickBasketId(flat);
    if (!basketId) {
      return new NextResponse("OK", { status: 200 });
    }

    const orderId = Number.parseInt(basketId, 10);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      return new NextResponse("OK", { status: 200 });
    }

    const respCode = String(
      flat.RESPONSE_CODE ?? flat.response_code ?? flat.STATUS ?? flat.status ?? "",
    ).toUpperCase();
    const successLike =
      respCode === "000" ||
      respCode === "00" ||
      respCode === "SUCCESS" ||
      respCode === "APPROVED" ||
      respCode === "";

    await ensureProductOrderSchema();

    if (successLike) {
      await dbQuery(
        `UPDATE product_orders
         SET payment_status = 'paid', gateway_error = NULL, updated_at = NOW()
         WHERE id = $1`,
        [orderId],
      );
    } else {
      await dbQuery(
        `UPDATE product_orders
         SET payment_status = 'failed',
             gateway_error = COALESCE($1::text, gateway_error),
             updated_at = NOW()
         WHERE id = $2`,
        [respCode ? `IPN: ${respCode.slice(0, 500)}` : null, orderId],
      );
    }

    return new NextResponse("OK", { status: 200 });
  } catch (e) {
    console.error("payfast ipn:", e);
    return new NextResponse("OK", { status: 200 });
  }
}
