"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QuoteDetail = {
  id: number;
  phone: string | null;
  email?: string | null;
  requirement: string | null;
  attachment_paths: string[] | null;
  status: string;
  counter_offer: string | null;
  created_at: string;
  updated_at: string;
  full_name?: string | null;
  company?: string | null;
  width?: string | null;
  height?: string | null;
  depth?: string | null;
  material?: string | null;
  thickness?: string | null;
  addons?: string[] | null;
  finish?: string | null;
  extra_finishes?: string[] | null;
  unboxing?: string | null;
  quantity?: number | null;
};

function isImageUrl(url: string) {
  return (
    /\.(jpe?g|png|webp|gif)(\?|$)/i.test(url) ||
    url.includes("amazonaws.com") ||
    url.includes("cloudfront")
  );
}

function displayEmail(email: string | null | undefined) {
  const value = (email ?? "").trim();
  if (!value) return "—";
  if (value.endsWith("@leads.brandsface.local")) return "—";
  return value;
}

export default function AdminQuoteDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  const deleteQuote = async () => {
    if (!window.confirm(`Delete quote #${params.id}? This cannot be undone.`)) return;
    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/quotes/${params.id}`, { method: "DELETE" });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to delete quote.");
        return;
      }
      router.push("/admin/quotes");
      router.refresh();
    } catch {
      setError("Unable to delete quote.");
    } finally {
      setDeleting(false);
    }
  };

  const attachments = quote?.attachment_paths?.filter(Boolean) ?? [];
  const hasLegacyDetails =
    Boolean(quote?.material || quote?.finish || quote?.unboxing) ||
    Boolean(quote?.addons?.length) ||
    Boolean(quote?.extra_finishes?.length) ||
    (Number(quote?.width) > 0 && Number(quote?.height) > 0 && Number(quote?.depth) > 0);

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Quote Request #{params.id}</h1>
            <p className="mt-1 text-sm text-slate-600">
              Email, phone, requirement, and any uploaded image from the quote form.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/quotes"
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Back to Quotes
            </Link>
            <button
              type="button"
              onClick={() => void deleteQuote()}
              disabled={deleting || loading || !quote}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete quote"}
            </button>
          </div>
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
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Info label="Email" value={displayEmail(quote.email)} />
              <Info label="Phone" value={quote.phone || "—"} />
              <Info label="Status" value={quote.status} />
              <Info label="Counter Offer" value={quote.counter_offer ?? "—"} />
              <Info label="Created At" value={new Date(quote.created_at).toLocaleString()} />
              <Info label="Updated At" value={new Date(quote.updated_at).toLocaleString()} />
            </div>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Requirement</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                {(quote.requirement ?? "").trim() || "—"}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Related image{attachments.length > 1 ? "s" : ""}
              </p>
              {attachments.length === 0 ? (
                <p className="mt-2 text-sm text-slate-500">No image attached.</p>
              ) : (
                <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                  {attachments.map((url) => (
                    <li key={url} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {isImageUrl(url) ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="relative aspect-[4/3] w-full bg-slate-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt="Quote attachment" className="h-full w-full object-contain" />
                          </div>
                        </a>
                      ) : null}
                      <div className="border-t border-slate-100 px-3 py-2">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-xs font-medium text-[#103a2a] hover:underline"
                        >
                          Open attachment
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            {hasLegacyDetails ? (
              <details className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                  Legacy quote details (older submissions)
                </summary>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Info label="Full Name" value={quote.full_name || "—"} />
                  <Info label="Company" value={quote.company || "—"} />
                  <Info label="Quantity" value={quote.quantity != null ? String(quote.quantity) : "?"} />
                  <Info
                    label="Dimensions"
                    value={
                      Number(quote.width) || Number(quote.height) || Number(quote.depth)
                        ? `${quote.width} × ${quote.height} × ${quote.depth}`
                        : "?"
                    }
                  />
                  <Info label="Material" value={quote.material || "—"} />
                  <Info label="Thickness" value={quote.thickness || "—"} />
                  <Info label="Finish" value={quote.finish || "—"} />
                  <Info label="Unboxing" value={quote.unboxing || "—"} />
                  <Info label="Add-ons" value={quote.addons?.length ? quote.addons.join(", ") : "?"} />
                  <Info
                    label="Extra Finishes"
                    value={quote.extra_finishes?.length ? quote.extra_finishes.join(", ") : "?"}
                  />
                </div>
              </details>
            ) : null}
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
