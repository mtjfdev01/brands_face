"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  PRODUCT_ORDER_STATUSES,
  PRODUCT_ORDER_STATUS_LABELS,
  type ProductOrderStatus,
} from "@/lib/productOrderStatus";

type OrderRow = {
  id: number;
  request_type: string;
  cta_source: string;
  status: string;
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
  saving: boolean;
  message: string;
};

function formatMoney(v: string | null) {
  if (v === null || v === "") return "—";
  const n = Number(v);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : v;
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
            saving: false,
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
                : o.cta_source === "add_to_cart"
                  ? "Cart request"
                  : "Order request";
            const label =
              PRODUCT_ORDER_STATUS_LABELS[o.status as ProductOrderStatus] ?? o.status;
            const isClosed = o.status === "cancelled" || o.status === "rejected" || o.status === "completed";
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
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>#{o.id}</div>
                    <div>{new Date(o.created_at).toLocaleString()}</div>
                  </div>
                </div>

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
