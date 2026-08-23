"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineCheck, HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";

type Quote = {
  id: number;
  phone: string | null;
  requirement: string | null;
  attachment_paths: string[] | null;
  status: string;
  counter_offer: string | null;
  created_at: string;
};

type QuoteEdit = {
  status: string;
  counterOffer: string;
  saving: boolean;
  message: string;
};

const STATUS_OPTIONS = ["pending", "in_review", "quoted", "approved", "rejected", "closed"] as const;

const STATUS_LABELS: Record<(typeof STATUS_OPTIONS)[number], string> = {
  pending: "Pending",
  in_review: "In review",
  quoted: "Quoted",
  approved: "Approved",
  rejected: "Rejected",
  closed: "Closed",
};

const FILTER_STORAGE_KEY = "admin_quotes_filters";

function truncateText(text: string | null | undefined, max = 80) {
  const value = (text ?? "").trim();
  if (!value) return "—";
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function statusSelectClasses(status: string) {
  switch (status) {
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-950";
    case "in_review":
      return "border-sky-200 bg-sky-50 text-sky-950";
    case "quoted":
      return "border-violet-200 bg-violet-50 text-violet-950";
    case "approved":
      return "border-emerald-200 bg-emerald-50 text-emerald-950";
    case "rejected":
      return "border-rose-200 bg-rose-50 text-rose-950";
    case "closed":
      return "border-slate-200 bg-slate-100 text-slate-700";
    default:
      return "border-slate-200 bg-white text-slate-800";
  }
}

function formatCreatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [edits, setEdits] = useState<Record<number, QuoteEdit>>({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadQuotes = async (from = fromDate, to = toDate) => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const query = params.toString();

      const response = await fetch(`/api/admin/quotes${query ? `?${query}` : ""}`, { cache: "no-store" });
      const data = (await response.json()) as { quotes?: Quote[]; message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to fetch quotes.");
        return;
      }

      const rows = data.quotes ?? [];
      setQuotes(rows);
      setEdits(
        rows.reduce<Record<number, QuoteEdit>>((acc, quote) => {
          acc[quote.id] = {
            status: quote.status,
            counterOffer: quote.counter_offer ?? "",
            saving: false,
            message: "",
          };
          return acc;
        }, {}),
      );
    } catch {
      setError("Unable to fetch quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FILTER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { fromDate?: string; toDate?: string };
        const from = parsed.fromDate ?? "";
        const to = parsed.toDate ?? "";
        setFromDate(from);
        setToDate(to);
        void loadQuotes(from, to);
        return;
      }
    } catch {
      // ignore malformed local storage
    }
    void loadQuotes("", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quoteCount = useMemo(() => quotes.length, [quotes]);

  const updateField = (id: number, patch: Partial<QuoteEdit>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const applyFilters = () => {
    try {
      window.localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify({ fromDate, toDate }));
    } catch {
      // ignore
    }
    void loadQuotes(fromDate, toDate);
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    try {
      window.localStorage.removeItem(FILTER_STORAGE_KEY);
    } catch {
      // ignore
    }
    void loadQuotes("", "");
  };

  const saveQuote = async (id: number) => {
    const edit = edits[id];
    if (!edit) return;

    const counterValue = edit.counterOffer.trim();
    const payload = {
      status: edit.status,
      counterOffer: counterValue === "" ? null : Number(counterValue),
    };

    if (counterValue !== "" && (!Number.isFinite(payload.counterOffer) || Number(payload.counterOffer) < 0)) {
      updateField(id, { message: "Counter offer must be a valid positive number." });
      return;
    }

    updateField(id, { saving: true, message: "" });
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        updateField(id, { saving: false, message: data.message ?? "Update failed." });
        return;
      }

      setQuotes((prev) =>
        prev.map((quote) =>
          quote.id === id
            ? {
                ...quote,
                status: edit.status,
                counter_offer: counterValue === "" ? null : counterValue,
              }
            : quote,
        ),
      );

      updateField(id, { saving: false, message: "Saved." });
    } catch {
      updateField(id, { saving: false, message: "Update failed." });
    }
  };

  const deleteQuote = async (id: number) => {
    if (!window.confirm(`Delete quote #${id}? This cannot be undone.`)) return;

    updateField(id, { saving: true, message: "" });
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        updateField(id, { saving: false, message: data.message ?? "Delete failed." });
        return;
      }
      setQuotes((prev) => prev.filter((quote) => quote.id !== id));
      setEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch {
      updateField(id, { saving: false, message: "Delete failed." });
    }
  };

  return (
    <div className="space-y-5">
      <header className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#103a2a]/[0.06] via-white to-white px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Quote requests</h1>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Review quote requests and update status. Open a row for full contact, image, and counter offer.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#103a2a] px-3 py-1 text-xs font-semibold text-white">
              {quoteCount} total
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              From
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="mt-1.5 block h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-[#103a2a] focus:ring-2 focus:ring-[#103a2a]/15"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              To
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="mt-1.5 block h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-[#103a2a] focus:ring-2 focus:ring-[#103a2a]/15"
              />
            </label>
            <button
              type="button"
              onClick={applyFilters}
              className="h-10 rounded-xl bg-[#103a2a] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0d3224]"
            >
              Apply filter
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Clear
            </button>
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center gap-3 p-8 text-sm text-slate-600">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#103a2a]" />
            Loading quotes…
          </div>
        ) : error ? (
          <div className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : quotes.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-base font-semibold text-slate-800">No quote requests yet</p>
            <p className="mt-1 text-sm text-slate-500">New submissions from the quote form will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3.5 sm:px-5">ID</th>
                  <th className="px-4 py-3.5 sm:px-5">Requirement</th>
                  <th className="px-4 py-3.5 sm:px-5">Status</th>
                  <th className="px-4 py-3.5 sm:px-5">Created</th>
                  <th className="px-4 py-3.5 sm:px-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((quote) => {
                  const edit = edits[quote.id];
                  const status = edit?.status ?? quote.status;

                  return (
                    <tr key={quote.id} className="align-middle transition hover:bg-slate-50/70">
                      <td className="px-4 py-3.5 sm:px-5">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700">
                          #{quote.id}
                        </span>
                      </td>
                      <td className="max-w-[220px] px-4 py-3.5 sm:px-5">
                        <p
                          className="truncate leading-snug text-slate-700"
                          title={quote.requirement ?? undefined}
                        >
                          {truncateText(quote.requirement, 48)}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 sm:px-5">
                        <select
                          value={status}
                          onChange={(event) => updateField(quote.id, { status: event.target.value })}
                          className={`h-9 rounded-lg border px-2.5 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-[#103a2a]/20 ${statusSelectClasses(status)}`}
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {STATUS_LABELS[option]}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 sm:px-5">
                        {formatCreatedAt(quote.created_at)}
                      </td>
                      <td className="px-4 py-3.5 sm:px-5">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/quotes/${quote.id}`}
                            title="View"
                            aria-label={`View quote #${quote.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#103a2a]"
                          >
                            <HiOutlineEye className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            title="Save"
                            aria-label={`Save quote #${quote.id}`}
                            onClick={() => void saveQuote(quote.id)}
                            disabled={Boolean(edit?.saving)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#103a2a] text-white shadow-sm transition hover:bg-[#0d3224] disabled:opacity-60"
                          >
                            <HiOutlineCheck className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Delete"
                            aria-label={`Delete quote #${quote.id}`}
                            onClick={() => void deleteQuote(quote.id)}
                            disabled={Boolean(edit?.saving)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 transition hover:bg-rose-100 disabled:opacity-60"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                        {edit?.message ? (
                          <p
                            className={`mt-1.5 text-[11px] font-medium ${
                              edit.message === "Saved." ? "text-emerald-700" : "text-rose-600"
                            }`}
                          >
                            {edit.message}
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
