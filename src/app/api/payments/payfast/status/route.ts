import { NextResponse } from "next/server";
import { isPayfastConfigured } from "@/lib/payfastServer";

export const dynamic = "force-dynamic";

/**
 * Safe health check: whether the **server** sees PayFast env (no secrets returned).
 * Open in browser: `/api/payments/payfast/status`
 */
export async function GET() {
  const merchant = Boolean(process.env.PAYFAST_MERCHANT_ID?.trim());
  const secured = Boolean(process.env.PAYFAST_SECURED_KEY?.trim());
  const proxy = Boolean(process.env.PAYFAST_ACCESS_TOKEN_URL?.trim());

  let mode: "direct" | "proxy" | "off" = "off";
  if (merchant && secured) mode = "direct";
  else if (proxy) mode = "proxy";

  const configured = isPayfastConfigured();

  return NextResponse.json({
    configured,
    mode,
    hint:
      mode === "off"
        ? "Next.js only loads .env / .env.local from the project root (same folder as package.json), not from src/. Copy vars there and restart `npm run dev`."
        : mode === "direct"
          ? "Direct GetAccessToken is enabled. Standard orders with phone + total should return payfast in POST /api/product-orders and redirect."
          : "Proxy token URL is enabled.",
  });
}
