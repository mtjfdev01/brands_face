"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Quote = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  quantity: number;
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

const STATUS_OPTIONS = ["pending", "in_review", "quoted", "approved", "rejected", "closed"];
const FILTER_STORAGE_KEY = "admin_quotes_filters";

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
      // ignore malformed local storage and continue with no filter
    }
    void loadQuotes("", "");
  }, []);

  const quoteCount = useMemo(() => quotes.length, [quotes]);

  const updateField = (id: number, patch: Partial<QuoteEdit>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const applyFilters = () => {
    try {
      window.localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify({ fromDate, toDate }));
    } catch {
      // ignore storage failures
    }
    void loadQuotes(fromDate, toDate);
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    try {
      window.localStorage.removeItem(FILTER_STORAGE_KEY);
    } catch {
      // ignore storage failures
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

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">Quotes</h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage quote requests, update status, and keep counter-offer pricing records.
        </p>
        <p className="mt-2 text-xs font-medium text-slate-500">Total Quotes: {quoteCount}</p>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="text-xs font-medium text-slate-600">
            From
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="mt-1 block h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-sm text-slate-800 outline-none focus:border-[#103a2a]"
            />
          </label>
          <label className="text-xs font-medium text-slate-600">
            To
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="mt-1 block h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-sm text-slate-800 outline-none focus:border-[#103a2a]"
            />
          </label>
          <button
            onClick={applyFilters}
            className="h-9 rounded-lg bg-[#103a2a] px-3.5 text-xs font-semibold text-white transition hover:bg-[#0d3224]"
          >
            Apply Filter
          </button>
          <button
            onClick={clearFilters}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-sm text-slate-600">Loading quotes...</div>
        ) : error ? (
          <div className="p-6 text-sm font-medium text-red-600">{error}</div>
        ) : quotes.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No quote requests yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-600">
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Quantity</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Counter Offer</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">View</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => {
                  const edit = edits[quote.id];
                  return (
                    <tr key={quote.id} className="border-t border-slate-100 align-top">
                      <td className="px-4 py-3 font-medium text-slate-800">#{quote.id}</td>
                      <td className="px-4 py-3 text-slate-700">{quote.full_name}</td>
                      <td className="px-4 py-3 text-slate-700">{quote.email}</td>
                      <td className="px-4 py-3 text-slate-700">{quote.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <select
                          value={edit?.status ?? quote.status}
                          onChange={(event) => updateField(quote.id, { status: event.target.value })}
                          className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-sm text-slate-800 outline-none focus:border-[#103a2a]"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={edit?.counterOffer ?? ""}
                          onChange={(event) => updateField(quote.id, { counterOffer: event.target.value })}
                          placeholder="e.g. 450.00"
                          className="h-9 w-32 rounded-lg border border-slate-300 px-2.5 text-sm text-slate-800 outline-none focus:border-[#103a2a]"
                        />
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/quotes/${quote.id}`}
                          className="rounded-lg border border-[#103a2a]/25 bg-[#103a2a]/5 px-3 py-2 text-xs font-semibold text-[#103a2a] transition hover:bg-[#103a2a]/10"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => void saveQuote(quote.id)}
                          disabled={Boolean(edit?.saving)}
                          className="rounded-lg bg-[#103a2a] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0d3224] disabled:opacity-60"
                        >
                          {edit?.saving ? "Saving..." : "Save"}
                        </button>
                        {edit?.message ? (
                          <p
                            className={`mt-1 text-[11px] ${
                              edit.message === "Saved." ? "text-emerald-700" : "text-red-600"
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
