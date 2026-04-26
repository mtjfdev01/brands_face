"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { submitBrandsfacePayfastCheckout } from "@/lib/payfastClient";
import type { PayfastCheckoutBranding } from "@/lib/payfastTypes";
import type { PublicInvoiceResponse } from "@/lib/publicInvoice";

function formatMoney(amount: string | null, currency: string) {
  if (amount === null || amount === "") return "—";
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export default function InvoiceView() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = String(params.orderId ?? "");
  const key = searchParams.get("key")?.trim() ?? "";

  const [data, setData] = useState<PublicInvoiceResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [payMessage, setPayMessage] = useState("");

  const load = useCallback(async () => {
    if (!orderId || !key) {
      setError("This link is incomplete. Use the full URL from your invoice email.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/invoice/${orderId}?key=${encodeURIComponent(key)}`, { cache: "no-store" });
      const json = (await res.json()) as PublicInvoiceResponse & { message?: string };
      if (!res.ok) {
        setError(json.message ?? "Could not load invoice.");
        setData(null);
        return;
      }
      setData(json as PublicInvoiceResponse);
    } catch {
      setError("Could not load invoice.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [orderId, key]);

  useEffect(() => {
    void load();
  }, [load]);

  const pay = async () => {
    if (!key || !orderId) return;
    setPayMessage("");
    setPaying(true);
    try {
      const res = await fetch(`/api/invoice/${orderId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const json = (await res.json()) as {
        message?: string;
        payfast?: Record<string, unknown>;
        branding?: PayfastCheckoutBranding;
        lead?: { customerPhone: string; customerEmail: string };
      };
      if (!res.ok) {
        setPayMessage(json.message ?? "Payment could not be started.");
        return;
      }
      if (json.payfast && json.branding && json.lead) {
        submitBrandsfacePayfastCheckout(json.payfast, json.lead, json.branding);
        return;
      }
      setPayMessage("Invalid payment response.");
    } catch {
      setPayMessage("Something went wrong.");
    } finally {
      setPaying(false);
    }
  };

  const canPayOnline =
    data &&
    data.order.request_type === "standard_order" &&
    data.payment.payment_status !== "paid" &&
    Number(data.order.line_total) > 0;

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-600">
        <p>Loading invoice…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">Invoice</h1>
        <p className="mt-3 text-sm text-rose-700">{error || "Not found."}</p>
      </div>
    );
  }

  const cur = data.payment.currency_code;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Invoice</p>
        <h1 className="mt-2 text-2xl font-black text-[#103a2a]">#{data.order.id}</h1>
        <p className="mt-1 text-sm text-slate-500">{new Date(data.order.created_at).toLocaleString()}</p>
      </header>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase text-slate-400">Bill to</h2>
          <p className="mt-2 font-medium text-slate-900">{data.customer.full_name}</p>
          <p className="text-sm text-slate-600">{data.customer.email}</p>
          {data.customer.phone && <p className="text-sm text-slate-600">{data.customer.phone}</p>}
          {data.customer.company && <p className="text-sm text-slate-600">{data.customer.company}</p>}
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase text-slate-400">Order</h2>
          <p className="mt-2 font-medium text-slate-900">{data.order.product_title}</p>
          <p className="text-sm text-slate-600">
            Qty {data.order.quantity}
            {data.order.size_label ? ` · ${data.order.size_label}` : ""}
            {data.order.size_dimensions ? ` (${data.order.size_dimensions})` : ""}
          </p>
          {data.order.customer_notes && (
            <p className="mt-2 text-sm text-slate-600">Notes: {data.order.customer_notes}</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xs font-semibold uppercase text-slate-400">Payment</h2>
          <p className="mt-2 text-lg font-bold text-slate-900">
            {formatMoney(data.order.line_total, cur)}
          </p>
          <p className="mt-1 text-sm capitalize text-slate-600">
            Status: {data.payment.payment_status.replace(/_/g, " ")}
          </p>
          {data.payment.gateway_error && (
            <p className="mt-2 text-xs text-rose-700">Last gateway message: {data.payment.gateway_error}</p>
          )}
        </div>

        {data.payment.payment_status === "paid" ? (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Thank you — this invoice is marked paid.
          </p>
        ) : canPayOnline ? (
          <div className="space-y-3">
            {payMessage && <p className="text-sm text-rose-700">{payMessage}</p>}
            <button
              type="button"
              disabled={paying}
              onClick={() => void pay()}
              className="w-full rounded-full bg-[#1dd1a1] py-3.5 text-sm font-bold text-[#0f2f22] shadow-[0_6px_20px_rgba(29,209,161,0.3)] transition hover:bg-[#37dfb2] disabled:opacity-60 sm:w-auto sm:min-w-[220px] sm:px-10"
            >
              {paying ? "Redirecting…" : "Pay invoice"}
            </button>
            <p className="text-xs text-slate-500">You will be taken to our bank&apos;s secure checkout page.</p>
          </div>
        ) : (
          <p className="text-sm text-slate-600">Contact us to complete payment for this invoice.</p>
        )}
      </section>
    </div>
  );
}
