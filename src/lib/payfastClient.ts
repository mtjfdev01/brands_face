"use client";

import type { PayfastCheckoutBranding, PayfastCheckoutLead } from "@/lib/payfastTypes";

export type { PayfastCheckoutBranding, PayfastCheckoutLead } from "@/lib/payfastTypes";

/** Same-window POST to Apps.net.pk PostTransaction (invoice / checkout). */
const DEFAULT_POST_URL =
  "https://ipg1.apps.net.pk/Ecommerce/api/Transaction/PostTransaction";

/**
 * Validates token payload and submits hidden POST form (browser navigation).
 * Mirrors donation-site pattern; strip donation-only fields — caller supplies branding URLs.
 */
export function submitBrandsfacePayfastCheckout(
  payfastResponse: Record<string, unknown>,
  lead: PayfastCheckoutLead,
  branding: PayfastCheckoutBranding,
): void {
  if (!payfastResponse) {
    throw new Error("PayFast response is missing.");
  }

  const MERCHANT_ID = payfastResponse.MERCHANT_ID as string | undefined;
  const ACCESS_TOKEN = payfastResponse.ACCESS_TOKEN as string | undefined;
  const BASKET_ID = (payfastResponse.BASKET_ID as string | undefined) ?? "";
  const TXNAMT = (payfastResponse.TXNAMT as string | undefined) ?? "";

  if (!MERCHANT_ID || !ACCESS_TOKEN || !BASKET_ID || !TXNAMT) {
    throw new Error("Missing MERCHANT_ID, ACCESS_TOKEN, BASKET_ID, or TXNAMT.");
  }

  const now = new Date();
  const ORDER_DATE = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  const SIGNATURE = Math.random().toString(36).slice(2, 10);

  const fields: Record<string, string> = {
    MERCHANT_ID,
    MERCHANT_NAME: branding.merchantName,
    TOKEN: ACCESS_TOKEN,
    PROCCODE: "00",
    TXNAMT,
    CUSTOMER_MOBILE_NO: lead.customerPhone,
    CUSTOMER_EMAIL_ADDRESS: lead.customerEmail,
    SIGNATURE,
    VERSION: SIGNATURE,
    TXNDESC: branding.txndesc,
    SUCCESS_URL: branding.successUrl,
    FAILURE_URL: branding.failureUrl,
    CHECKOUT_URL: branding.checkoutUrl,
    BASKET_ID,
    ORDER_DATE,
    CURRENCY_CODE: branding.currencyCode,
    TRAN_TYPE: "ECOMM_PURCHASE",
  };

  const postUrl =
    process.env.NEXT_PUBLIC_PAYFAST_POST_TRANSACTION_URL?.trim() || DEFAULT_POST_URL;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = postUrl;
  form.target = "_self";

  Object.entries(fields).forEach(([k, v]) => {
    if (v == null || v === "") return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = k;
    input.value = String(v);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  setTimeout(() => {
    form.parentNode?.removeChild(form);
  }, 1000);
}
