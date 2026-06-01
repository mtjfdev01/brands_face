import { dbQuery } from "@/lib/postgres";
import { resolvePayableTotal } from "@/lib/orderLineItems";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import type { PayfastCheckoutBranding } from "@/lib/payfastTypes";
import { isCheckoutPhoneOk } from "@/lib/payfastPhone";

export { isCheckoutPhoneOk } from "@/lib/payfastPhone";

const DEFAULT_GET_ACCESS_TOKEN_BASE =
  "https://ipg1.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken";

/**
 * PayFast (Apps.net.pk IPG) checkout is enabled when either:
 * - **Direct token:** `PAYFAST_MERCHANT_ID` + `PAYFAST_SECURED_KEY` → POST `GetAccessToken?...` (same as your PayfastService), or
 * - **Proxy:** `PAYFAST_ACCESS_TOKEN_URL` → POST JSON `{ basketId, amount }` if you keep tokens behind your own API.
 */
export function isPayfastConfigured(): boolean {
  const direct =
    Boolean(process.env.PAYFAST_MERCHANT_ID?.trim()) &&
    Boolean(process.env.PAYFAST_SECURED_KEY?.trim());
  const proxy = Boolean(process.env.PAYFAST_ACCESS_TOKEN_URL?.trim());
  return direct || proxy;
}

/** Public + IPN URLs for PostTransaction hidden form (server builds; returned to client for submit). */
export function getPayfastBrandingFromRequest(request: Request): PayfastCheckoutBranding {
  const envOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  const origin = envOrigin || new URL(request.url).origin;
  const merchantName = process.env.PAYFAST_MERCHANT_DISPLAY_NAME?.trim() || "BrandsFace";
  const txndesc = process.env.PAYFAST_TXN_DESC?.trim() || "BrandsFace product order";
  const currencyCode = process.env.PAYFAST_CURRENCY_CODE?.trim() || "PKR";
  return {
    merchantName,
    txndesc,
    successUrl: `${origin}/checkout/success`,
    failureUrl: `${origin}/checkout/failure`,
    checkoutUrl: `${origin}/api/payments/payfast/ipn`,
    currencyCode,
  };
}

function pickTokenPayload(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  if (o.data && typeof o.data === "object") return o.data as Record<string, unknown>;
  return o;
}

function normalizeAccessTokenResponse(
  parsed: unknown,
  basketId: string,
  amount: number | string,
): Record<string, unknown> {
  const data = pickTokenPayload(parsed);
  const merchantId = data.MERCHANT_ID ?? data.merchant_id ?? process.env.PAYFAST_MERCHANT_ID;
  const accessToken =
    data.ACCESS_TOKEN ?? data.access_token ?? data.accessToken ?? data.TOKEN ?? data.token;

  if (!merchantId || !accessToken) {
    throw new Error("PayFast token response missing MERCHANT_ID or ACCESS_TOKEN.");
  }

  return {
    ...data,
    MERCHANT_ID: merchantId,
    ACCESS_TOKEN: accessToken,
    BASKET_ID: basketId,
    TXNAMT: String(amount),
  };
}

/** Matches Postman / IPG: POST with query string only (no JSON body). */
async function fetchPayfastGetAccessTokenDirect(
  basketId: string,
  amount: number | string,
): Promise<Record<string, unknown>> {
  const merchantId = process.env.PAYFAST_MERCHANT_ID?.trim();
  const securedKey = process.env.PAYFAST_SECURED_KEY?.trim();
  if (!merchantId || !securedKey) {
    throw new Error("PAYFAST_MERCHANT_ID and PAYFAST_SECURED_KEY are not configured.");
  }

  const base = process.env.PAYFAST_GET_ACCESS_TOKEN_URL?.trim() || DEFAULT_GET_ACCESS_TOKEN_BASE;
  const currency = process.env.PAYFAST_CURRENCY_CODE?.trim() || "PKR";
  const qs = new URLSearchParams({
    MERCHANT_ID: merchantId,
    SECURED_KEY: securedKey,
    BASKET_ID: String(basketId),
    TXNAMT: String(amount),
    CURRENCY_CODE: currency,
  });
  const url = `${base.replace(/\/$/, "")}?${qs.toString()}`;

  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`PayFast GetAccessToken response is not JSON (HTTP ${res.status}).`);
  }

  if (!res.ok) {
    const msg =
      typeof parsed === "object" && parsed && "message" in parsed
        ? String((parsed as { message: unknown }).message)
        : text || `HTTP ${res.status}`;
    throw new Error(`PayFast GetAccessToken failed: ${msg}`);
  }

  return normalizeAccessTokenResponse(parsed, basketId, amount);
}

async function fetchPayfastAccessTokenViaProxy(
  basketId: string,
  amount: number | string,
): Promise<Record<string, unknown>> {
  const url = process.env.PAYFAST_ACCESS_TOKEN_URL?.trim();
  if (!url) {
    throw new Error("PAYFAST_ACCESS_TOKEN_URL is not configured.");
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const extraAuth = process.env.PAYFAST_TOKEN_AUTH_HEADER?.trim();
  if (extraAuth) {
    headers.Authorization = extraAuth;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      basketId,
      amount: String(amount),
    }),
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: unknown;
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`PayFast token response is not JSON (HTTP ${res.status}).`);
  }

  if (!res.ok) {
    throw new Error(
      typeof parsed === "object" && parsed && "message" in parsed
        ? String((parsed as { message: unknown }).message)
        : text || `HTTP ${res.status}`,
    );
  }

  return normalizeAccessTokenResponse(parsed, basketId, amount);
}

/**
 * @param basketId — order id as string (matches PostTransaction BASKET_ID)
 * @param amount — must match TXNAMT / token request
 */
export async function fetchPayfastAccessPayload(
  basketId: string,
  amount: number | string,
): Promise<Record<string, unknown>> {
  const useDirect =
    Boolean(process.env.PAYFAST_MERCHANT_ID?.trim()) &&
    Boolean(process.env.PAYFAST_SECURED_KEY?.trim());

  if (useDirect) {
    return fetchPayfastGetAccessTokenDirect(basketId, amount);
  }

  return fetchPayfastAccessTokenViaProxy(basketId, amount);
}

export async function persistProductOrderGatewayError(orderId: number, message: string) {
  await ensureProductOrderSchema();
  const msg = message.slice(0, 4000);
  await dbQuery(
    `UPDATE product_orders
     SET gateway_error = $1, payment_status = 'failed', updated_at = NOW()
     WHERE id = $2`,
    [msg, orderId],
  );
}

export async function markOrderPaymentPendingCheckout(orderId: number) {
  await ensureProductOrderSchema();
  await dbQuery(
    `UPDATE product_orders SET payment_status = 'pending_checkout', gateway_error = NULL, updated_at = NOW() WHERE id = $1`,
    [orderId],
  );
}

export type PayfastCheckoutSession = {
  payfast: Record<string, unknown>;
  branding: PayfastCheckoutBranding;
  lead: { customerPhone: string; customerEmail: string };
};

/** Loads a standard order, validates PayFast + phone + amount, mints token, sets pending_checkout. */
export async function createPayfastCheckoutForStandardOrder(
  orderId: number,
  request: Request,
): Promise<PayfastCheckoutSession> {
  if (!isPayfastConfigured()) {
    throw new Error("PayFast is not configured on this server.");
  }

  await ensureProductOrderSchema();

  type Row = {
    id: number;
    request_type: string;
    line_total: string | null;
    grand_total: string | null;
    discounted_grand_total: string | null;
    email: string;
    phone: string | null;
    payment_status: string;
  };

  const result = await dbQuery<Row>(
    `SELECT id, request_type, line_total::text, grand_total::text, discounted_grand_total::text,
            email, phone, payment_status
     FROM product_orders WHERE id = $1`,
    [orderId],
  );
  const row = result.rows[0];
  if (!row) {
    throw new Error("Order not found.");
  }
  if (row.request_type !== "standard_order") {
    throw new Error("Only standard orders can use PayFast checkout.");
  }
  const amount = resolvePayableTotal(row);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Order has no payable total.");
  }
  if (row.payment_status === "paid") {
    throw new Error("This order is already marked paid.");
  }
  if (!isCheckoutPhoneOk(row.phone)) {
    throw new Error("Add a valid customer phone before opening checkout.");
  }

  const branding = getPayfastBrandingFromRequest(request);

  try {
    const payfast = await fetchPayfastAccessPayload(String(row.id), amount);
    await markOrderPaymentPendingCheckout(row.id);
    return {
      payfast,
      branding,
      lead: {
        customerPhone: row.phone!.trim(),
        customerEmail: row.email.trim().toLowerCase(),
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "PayFast token failed";
    await persistProductOrderGatewayError(row.id, msg);
    throw new Error(msg);
  }
}
