"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type QuoteDetail = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  width: string;
  height: string;
  depth: string;
  material: string | null;
  thickness: string | null;
  addons: string[];
  finish: string | null;
  extra_finishes: string[];
  unboxing: string | null;
  quantity: number;
  status: string;
  counter_offer: string | null;
  created_at: string;
  updated_at: string;
};

export default function AdminQuoteDetailPage({ params }: { params: { id: string } }) {
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/admin/quotes/${params.id}`, { cache: "no-store" });
        const data = (await response.json()) as { quote?: QuoteDetail; message?: string };
        if (!response.ok) {
          setError(data.message ?? "Unable to load quote.");
          return;
        }
        setQuote(data.quote ?? null);
      } catch {
        setError("Unable to load quote.");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [params.id]);

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Quote Request #{params.id}</h1>
            <p className="mt-1 text-sm text-slate-600">Detailed view of the submitted packaging quote request.</p>
          </div>
          <Link
            href="/admin/quotes"
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Back to Quotes
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {loading ? (
          <p className="text-sm text-slate-600">Loading quote details...</p>
        ) : error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : !quote ? (
          <p className="text-sm text-slate-600">Quote not found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Full Name" value={quote.full_name} />
            <Info label="Email" value={quote.email} />
            <Info label="Phone" value={quote.phone || "—"} />
            <Info label="Company" value={quote.company || "—"} />
            <Info label="Quantity" value={quote.quantity.toLocaleString()} />
            <Info label="Status" value={quote.status} />
            <Info label="Counter Offer" value={quote.counter_offer ?? "—"} />
            <Info label="Dimensions" value={`${quote.width} × ${quote.height} × ${quote.depth} in`} />
            <Info label="Material" value={quote.material || "—"} />
            <Info label="Thickness" value={quote.thickness || "—"} />
            <Info label="Finish" value={quote.finish || "—"} />
            <Info label="Unboxing" value={quote.unboxing || "—"} />
            <Info label="Add-ons" value={quote.addons.length ? quote.addons.join(", ") : "—"} />
            <Info
              label="Extra Finishes"
              value={quote.extra_finishes.length ? quote.extra_finishes.join(", ") : "—"}
            />
            <Info label="Created At" value={new Date(quote.created_at).toLocaleString()} />
            <Info label="Updated At" value={new Date(quote.updated_at).toLocaleString()} />
          </div>
        )}
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </article>
  );
}
