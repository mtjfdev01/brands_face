"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  PRODUCT_ORDER_STATUSES,
  PRODUCT_ORDER_STATUS_LABELS,
  type ProductOrderStatus,
} from "@/lib/productOrderStatus";
import { submitBrandsfacePayfastCheckout } from "@/lib/payfastClient";
import { isCheckoutPhoneOk } from "@/lib/payfastPhone";
import type { PayfastCheckoutBranding } from "@/lib/payfastTypes";

type OrderRow = {
  id: number;
  request_type: string;
  cta_source: string;
  status: string;
  customer_id: string | null;
  payment_status: string;
  gateway_error: string | null;
  invoice_public_key: string | null;
  product_slug: string;
  product_title: string;
  quantity: number;
  size_label: string | null;
  size_dimensions: string | null;
  price_per_piece: string | null;
  line_total: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

type EditState = {
  status: string;
  adminNotes: string;
  contactPhone: string;
  saving: boolean;
  checkoutLoading: boolean;
  invoiceWorking: boolean;
  invoiceFlash: string;
  message: string;
};

function formatMoney(v: string | null) {
  if (v === null || v === "") return "—";
  const n = Number(v);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : v;
}

function paymentBadgeClasses(paymentStatus: string) {
  switch (paymentStatus) {
    case "paid":
      return "bg-emerald-50 text-emerald-900 ring-emerald-200";
    case "pending_checkout":
      return "bg-amber-50 text-amber-900 ring-amber-200";
    case "failed":
      return "bg-rose-50 text-rose-900 ring-rose-200";
    case "refunded":
      return "bg-slate-100 text-slate-600 ring-slate-300";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-200";
  }
}

function statusBadgeClasses(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-900 ring-amber-200";
    case "responded":
      return "bg-sky-50 text-sky-900 ring-sky-200";
    case "in_progress":
      return "bg-violet-50 text-violet-900 ring-violet-200";
    case "completed":
      return "bg-emerald-50 text-emerald-900 ring-emerald-200";
    case "rejected":
      return "bg-rose-50 text-rose-900 ring-rose-200";
    case "cancelled":
      return "bg-slate-100 text-slate-600 ring-slate-300";
    default:
      return "bg-slate-50 text-slate-700 ring-slate-200";
  }
}

export default function AdminProductOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [edits, setEdits] = useState<Record<number, EditState>>({});

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const q = filter !== "all" ? `?status=${encodeURIComponent(filter)}` : "";
      const res = await fetch(`/api/admin/product-orders${q}`, { cache: "no-store" });
      const data = (await res.json()) as { orders?: OrderRow[]; message?: string };
      if (!res.ok) {
        setError(data.message ?? "Failed to load.");
        return;
      }
      const rows = data.orders ?? [];
      setOrders(rows);
      setEdits(
        rows.reduce<Record<number, EditState>>((acc, o) => {
          acc[o.id] = {
            status: o.status,
            adminNotes: o.admin_notes ?? "",
            contactPhone: o.phone ?? "",
            saving: false,
            checkoutLoading: false,
            invoiceWorking: false,
            invoiceFlash: "",
            message: "",
          };
          return acc;
        }, {}),
      );
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

  const count = useMemo(() => orders.length, [orders]);

  const patchField = (id: number, patch: Partial<EditState>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const save = async (id: number, statusOverride?: ProductOrderStatus) => {
    const e = edits[id];
    if (!e) return;
    const status = statusOverride ?? e.status;
    patchField(id, { saving: true, message: "" });
    try {
      const res = await fetch(`/api/admin/product-orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: e.adminNotes }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        patchField(id, { saving: false, message: data.message ?? "Save failed" });
        return;
      }
      patchField(id, { saving: false, message: "Saved.", status });
      await load();
    } catch {
      patchField(id, { saving: false, message: "Save failed" });
    }
  };

  const saveNotesOnly = async (id: number) => {
    const e = edits[id];
    if (!e) return;
    patchField(id, { saving: true, message: "" });
    try {
      const res = await fetch(`/api/admin/product-orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: e.adminNotes }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        patchField(id, { saving: false, message: data.message ?? "Save failed" });
        return;
      }
      patchField(id, { saving: false, message: "Notes saved." });
      await load();
    } catch {
      patchField(id, { saving: false, message: "Save failed" });
    }
  };

  const savePhone = async (id: number) => {
    const e = edits[id];
    if (!e) return;
    patchField(id, { saving: true, message: "" });
    try {
      const res = await fetch(`/api/admin/product-orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e.contactPhone.trim() || null }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        patchField(id, { saving: false, message: data.message ?? "Save failed" });
        return;
      }
      patchField(id, { saving: false, message: "Phone saved." });
      await load();
    } catch {
      patchField(id, { saving: false, message: "Save failed" });
    }
  };

  const invoiceUrlFor = (o: OrderRow) => {
    if (!o.invoice_public_key) return "";
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/invoice/${o.id}?key=${encodeURIComponent(o.invoice_public_key)}`;
  };

  const generateInvoiceLink = async (id: number, regenerate: boolean) => {
    const e = edits[id];
    if (!e) return;
    patchField(id, { invoiceWorking: true, invoiceFlash: "", message: "" });
    try {
      const res = await fetch(`/api/admin/product-orders/${id}/invoice`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regenerate }),
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok) {
        patchField(id, { invoiceWorking: false, message: data.message ?? "Invoice failed" });
        return;
      }
      patchField(id, { invoiceWorking: false, invoiceFlash: regenerate ? "New link generated." : "Invoice link ready." });
      await load();
    } catch {
      patchField(id, { invoiceWorking: false, message: "Invoice request failed" });
    }
  };

  const copyInvoiceLink = async (o: OrderRow) => {
    const url = invoiceUrlFor(o);
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      patchField(o.id, { invoiceFlash: "Copied to clipboard." });
    } catch {
      patchField(o.id, { invoiceFlash: "Could not copy — copy the URL manually." });
    }
  };

  const openPayfastCheckout = async (id: number) => {
    const e = edits[id];
    if (!e) return;
    if (!isCheckoutPhoneOk(e.contactPhone)) {
      patchField(id, { message: "Enter a valid phone (8+ chars, include digits) before checkout." });
      return;
    }
    patchField(id, { checkoutLoading: true, message: "" });
    try {
      const res = await fetch(`/api/admin/product-orders/${id}/payment-session`, {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json()) as {
        message?: string;
        payfast?: Record<string, unknown>;
        branding?: PayfastCheckoutBranding;
        lead?: { customerPhone: string; customerEmail: string };
      };
      if (!res.ok) {
        patchField(id, { checkoutLoading: false, message: data.message ?? "Checkout failed" });
        return;
      }
      if (data.payfast && data.branding && data.lead) {
        submitBrandsfacePayfastCheckout(data.payfast, data.lead, data.branding);
        return;
      }
      patchField(id, { checkoutLoading: false, message: "Invalid checkout response." });
    } catch {
      patchField(id, { checkoutLoading: false, message: "Checkout failed" });
    }
  };

  const cancelOrder = (id: number) => {
    if (
      !window.confirm(
        "Cancel this order? The row stays in the database with status “Cancelled” — nothing is deleted.",
      )
    ) {
      return;
    }
    void save(id, "cancelled");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sales</p>
        <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Product orders & quotes</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Submissions from product pages (tier orders, cart holds, custom quantities). Update response state, add internal
          notes, or cancel — <strong className="font-semibold">records are never deleted</strong>; cancel only changes
          status.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/admin/product-orders/new"
          className="rounded-lg bg-[#103a2a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c2e22]"
        >
          Create order
        </Link>
        <label className="text-sm font-medium text-slate-700">
          Status
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {PRODUCT_ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PRODUCT_ORDER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Refresh
        </button>
        <span className="text-sm text-slate-500">{count} record(s)</span>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500">No rows for this filter.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => {
            const edit = edits[o.id];
            const typeLabel =
              o.request_type === "custom_quote"
                ? "Custom quote"
                : o.cta_source === "admin"
                  ? "Admin order"
                  : o.cta_source === "add_to_cart"
                    ? "Cart request"
                    : "Order request";
            const label =
              PRODUCT_ORDER_STATUS_LABELS[o.status as ProductOrderStatus] ?? o.status;
            const payLabel = o.payment_status.replace(/_/g, " ");
            const isClosed = o.status === "cancelled" || o.status === "rejected" || o.status === "completed";
            const canPayfast =
              o.request_type === "standard_order" &&
              o.line_total !== null &&
              o.line_total !== "" &&
              Number(o.line_total) > 0 &&
              o.payment_status !== "paid" &&
              !isClosed;
            return (
              <article
                key={o.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#103a2a]">{typeLabel}</p>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${statusBadgeClasses(o.status)}`}
                      >
                        {label}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${paymentBadgeClasses(o.payment_status)}`}
                      >
                        Payment: {payLabel}
                      </span>
                    </div>
                    <h2 className="mt-1 text-lg font-bold text-slate-900">{o.product_title}</h2>
                    <p className="text-sm text-slate-500">
                      Slug: {o.product_slug} · Qty {o.quantity}
                      {o.size_label ? ` · ${o.size_label}` : ""}
                    </p>
                    {o.request_type === "standard_order" && (
                      <p className="mt-1 text-sm text-slate-600">
                        Est. total {formatMoney(o.line_total)} ({formatMoney(o.price_per_piece)} / pc)
                      </p>
                    )}
                    {o.gateway_error && (
                      <p className="mt-2 text-xs text-rose-700">Gateway: {o.gateway_error}</p>
                    )}
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>#{o.id}</div>
                    <div>{new Date(o.created_at).toLocaleString()}</div>
                  </div>
                </div>

                {edit && (
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-400">Public invoice</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Shareable URL: <code className="text-slate-700">/invoice/{o.id}?key=…</code> (key is secret)
                    </p>
                    {o.invoice_public_key && (
                      <p className="mt-2 break-all font-mono text-[11px] text-slate-600">{invoiceUrlFor(o)}</p>
                    )}
                    {edit.invoiceFlash && (
                      <p className="mt-2 text-xs font-medium text-emerald-800">{edit.invoiceFlash}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={edit.invoiceWorking}
                        onClick={() => void generateInvoiceLink(o.id, false)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
                      >
                        {o.invoice_public_key ? "Show / refresh link" : "Generate invoice link"}
                      </button>
                      {o.invoice_public_key && (
                        <>
                          <button
                            type="button"
                            disabled={edit.invoiceWorking}
                            onClick={() => void generateInvoiceLink(o.id, true)}
                            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-50"
                          >
                            New key (invalidates old link)
                          </button>
                          <button
                            type="button"
                            onClick={() => void copyInvoiceLink(o)}
                            className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-900"
                          >
                            Copy URL
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Contact</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{o.full_name}</p>
                    <p className="text-sm text-slate-600">{o.email}</p>
                    {o.phone && <p className="text-sm text-slate-600">{o.phone}</p>}
                    {o.company && <p className="text-sm text-slate-600">{o.company}</p>}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">Customer notes</p>
                    <p className="mt-1 text-sm text-slate-600">{o.customer_notes || "—"}</p>
                  </div>
                </div>

                {edit && (
                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap items-end gap-3">
                      <label className="block min-w-[200px] text-sm font-medium text-slate-700">
                        Customer phone (PayFast)
                        <input
                          type="tel"
                          value={edit.contactPhone}
                          onChange={(e) => patchField(o.id, { contactPhone: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          placeholder="+92…"
                        />
                      </label>
                      <button
                        type="button"
                        disabled={edit.saving}
                        onClick={() => void savePhone(o.id)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Save phone
                      </button>
                      {canPayfast && (
                        <button
                          type="button"
                          disabled={edit.checkoutLoading || edit.saving || !isCheckoutPhoneOk(edit.contactPhone)}
                          onClick={() => void openPayfastCheckout(o.id)}
                          className="rounded-lg bg-[#1dd1a1] px-4 py-2 text-sm font-bold text-[#0f2f22] hover:bg-[#37dfb2] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {edit.checkoutLoading ? "Opening…" : "Open PayFast checkout"}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={edit.saving || o.status === "responded" || isClosed}
                        onClick={() => void save(o.id, "responded")}
                        className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Mark responded
                      </button>
                      <button
                        type="button"
                        disabled={edit.saving || o.status === "cancelled"}
                        onClick={() => cancelOrder(o.id)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Cancel order
                      </button>
                      <span className="text-xs text-slate-500">Cancel keeps the row; only status changes.</span>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                      <label className="text-sm font-medium text-slate-700">
                        Status
                        <select
                          value={edit.status}
                          onChange={(e) => patchField(o.id, { status: e.target.value })}
                          className="mt-1 block w-52 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                        >
                          {PRODUCT_ORDER_STATUSES.map((opt) => (
                            <option key={opt} value={opt}>
                              {PRODUCT_ORDER_STATUS_LABELS[opt]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        disabled={edit.saving}
                        onClick={() => void save(o.id)}
                        className="rounded-lg bg-[#103a2a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c2e22] disabled:opacity-50"
                      >
                        {edit.saving ? "Saving…" : "Save status & notes"}
                      </button>
                      <button
                        type="button"
                        disabled={edit.saving}
                        onClick={() => void saveNotesOnly(o.id)}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Save notes only
                      </button>
                      {edit.message && <span className="text-sm text-slate-600">{edit.message}</span>}
                    </div>
                    <label className="block text-sm font-medium text-slate-700">
                      Internal notes
                      <textarea
                        value={edit.adminNotes}
                        onChange={(e) => patchField(o.id, { adminNotes: e.target.value })}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        placeholder="Call outcome, follow-up date, why rejected…"
                      />
                    </label>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
