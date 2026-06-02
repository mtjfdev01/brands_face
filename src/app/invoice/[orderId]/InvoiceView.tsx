"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BankDetails from "@/components/common/BankDetails";
import { submitBrandsfacePayfastCheckout } from "@/lib/payfastClient";
import type { PayfastCheckoutBranding } from "@/lib/payfastTypes";
import type { PublicInvoiceExpiredResponse, PublicInvoiceResponse } from "@/lib/publicInvoice";

const INVOICE_CURRENCY = "USD";

function formatMoney(amount: string | null) {
  if (amount === null || amount === "") return "—";
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: INVOICE_CURRENCY }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

function formatInvoiceDate(iso: string) {
  const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatSize(item: PublicInvoiceResponse["line_items"][0]) {
  const parts = [item.size_label, item.size_dimensions].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InvoiceShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[60vh] bg-[#f4f6f3] pb-16">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(29, 209, 161, 0.22) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5">{children}</div>
    </div>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-slate-600">
      <span className="flex w-5 shrink-0 justify-center text-[#5a7d6e]">{icon}</span>
      <span className="min-w-0 break-words text-slate-700">{children}</span>
    </div>
  );
}

function InvoiceDateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(6,33,24,0.06)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1dd1a1]/15 text-[#103a2a]">
        <CalendarIcon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
        <p className="mt-0.5 text-base font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function LeafDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="currentColor"
      aria-hidden
    >
      <path
        opacity="0.35"
        d="M40 8c8 12 6 28-4 38-6 6-14 10-22 10 4-10 10-20 14-32 2-10 4-18 2-16z"
      />
      <path
        opacity="0.2"
        d="M55 15c6 8 4 18-2 26-4 5-10 8-16 8 3-8 6-14 8-22 1-6 2-10 2-12z"
      />
    </svg>
  );
}

function CustomerInfoSection({
  customer,
  issued,
  due,
}: {
  customer: PublicInvoiceResponse["customer"];
  issued: string;
  due: string | null;
}) {
  const initial = customer.full_name.charAt(0).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <LeafDecor className="pointer-events-none absolute -left-2 bottom-0 h-24 w-24 text-[#1dd1a1]/30" />
      <LeafDecor className="pointer-events-none absolute -right-4 -top-2 h-20 w-20 rotate-45 text-[#1dd1a1]/20" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Bill to */}
        <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
          <span className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#103a2a] text-2xl font-bold text-white shadow-md sm:h-20 sm:w-20">
            {initial}
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#1dd1a1] text-white"
              aria-hidden
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </span>

          <div className="min-w-0 flex-1 space-y-3 pt-0.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2a8f5c]">Bill to</p>
            <p className="-mt-1 text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{customer.full_name}</p>
            <div className="space-y-2 pt-0.5">
              <ContactRow
                icon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              >
                <a href={`mailto:${customer.email}`} className="hover:text-[#103a2a]">
                  {customer.email}
                </a>
              </ContactRow>
              {customer.phone && (
                <ContactRow
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                >
                  <a href={`tel:${customer.phone.replace(/\s/g, "")}`} className="hover:text-[#103a2a]">
                    {customer.phone}
                  </a>
                </ContactRow>
              )}
              {customer.company && (
                <ContactRow
                  icon={
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  }
                >
                  {customer.company}
                </ContactRow>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden w-px shrink-0 self-stretch bg-slate-200 lg:block" aria-hidden />

        {/* Dates */}
        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[min(100%,280px)]">
          <div className="h-px w-full bg-slate-200 lg:hidden" aria-hidden />
          <InvoiceDateCard label="Issued" value={issued} />
          <InvoiceDateCard label="Due date" value={due ?? "—"} />
        </div>
      </div>
    </section>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function InvoiceView() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = String(params.orderId ?? "");
  const key = searchParams.get("key")?.trim() ?? "";

  const [data, setData] = useState<PublicInvoiceResponse | null>(null);
  const [expired, setExpired] = useState<PublicInvoiceExpiredResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [payMessage, setPayMessage] = useState("");

  useEffect(() => {
    if (!orderId || !key) {
      setError("This link is incomplete. Use the full URL from your invoice email.");
      setLoading(false);
      setData(null);
      setExpired(null);
      return;
    }

    const controller = new AbortController();
    let active = true;

    void (async () => {
      setLoading(true);
      setError("");
      setExpired(null);
      setData(null);

      try {
        const res = await fetch(`/api/invoice/${orderId}?key=${encodeURIComponent(key)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!active) return;

        const json = (await res.json()) as PublicInvoiceResponse &
          PublicInvoiceExpiredResponse & { message?: string };

        if (res.status === 410 && json.expired) {
          setExpired(json);
          setData(null);
          setError("");
          return;
        }

        if (!res.ok) {
          setError(json.message ?? "Could not load invoice.");
          setData(null);
          setExpired(null);
          return;
        }

        if (!json.order || !Array.isArray(json.line_items)) {
          setError("Invoice data was incomplete. Please refresh or contact support.");
          setData(null);
          setExpired(null);
          return;
        }

        setData(json as PublicInvoiceResponse);
        setExpired(null);
        setError("");
      } catch (err) {
        if (!active) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Could not load invoice.");
        setData(null);
        setExpired(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [orderId, key]);

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
    Number(data.order.payable_total) > 0;

  if (loading) {
    return (
      <InvoiceShell>
        <p className="py-20 text-center text-slate-600">Loading your invoice…</p>
      </InvoiceShell>
    );
  }

  if (expired) {
    const dueLabel = expired.due_date ? formatInvoiceDate(expired.due_date) : null;
    return (
      <InvoiceShell>
        <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-amber-950">Invoice link expired</h1>
          <p className="mt-4 text-sm leading-relaxed text-amber-900">{expired.message}</p>
          {dueLabel && (
            <p className="mt-2 text-xs text-amber-800">
              Due date was <span className="font-semibold">{dueLabel}</span>.
            </p>
          )}
          <a
            href={`mailto:${expired.support_email}?subject=${encodeURIComponent("New invoice request")}`}
            className="mt-6 inline-block rounded-full bg-[#103a2a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0c2e22]"
          >
            Contact support
          </a>
        </div>
      </InvoiceShell>
    );
  }

  if (error || !data) {
    return (
      <InvoiceShell>
        <p className="py-20 text-center text-sm text-rose-700">{error || "Invoice not found."}</p>
      </InvoiceShell>
    );
  }

  const issued = formatInvoiceDate(data.order.created_at);
  const due = data.order.due_date ? formatInvoiceDate(data.order.due_date) : null;
  const showDiscount =
    data.order.discounted_grand_total != null &&
    data.order.grand_total != null &&
    Number(data.order.discounted_grand_total) < Number(data.order.grand_total);
  const payStatus = data.payment.payment_status.replace(/_/g, " ");
  const isPaid = data.payment.payment_status === "paid";

  return (
    <InvoiceShell>
      <div className="space-y-5">
        <CustomerInfoSection customer={data.customer} issued={issued} due={due} />

        {/* Products */}
        <SectionCard
          title="Products"
          icon={
            <span className="text-[#103a2a]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-3">Product</th>
                  <th className="pb-3 pr-3">Size</th>
                  <th className="pb-3 pr-3 text-right">Qty</th>
                  <th className="pb-3 pr-3 text-right">Unit Price</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.line_items.map((item, idx) => {
                  const lineAmount = item.discounted_line_total ?? item.line_total;
                  const hasLineDiscount =
                    item.discounted_line_total != null &&
                    Number(item.discounted_line_total) < Number(item.line_total);
                  return (
                    <tr key={idx} className="border-b border-slate-50 last:border-0">
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100${item.category_image ? "" : " hidden sm:block"}`}
                          >
                            {item.category_image ? (
                              <Image
                                src={item.category_image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                PKG
                              </span>
                            )}
                          </span>
                          <span>
                            <span className="font-semibold text-slate-900">{item.product_title}</span>
                            {item.category_label && (
                              <span className="mt-0.5 block text-xs text-slate-500">{item.category_label}</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3 text-slate-600">{formatSize(item)}</td>
                      <td className="py-3.5 pr-3 text-right text-slate-700">{item.quantity}</td>
                      <td className="py-3.5 pr-3 text-right text-slate-700">
                        {formatMoney(item.price_per_piece)}
                      </td>
                      <td className="py-3.5 text-right">
                        {hasLineDiscount && (
                          <span className="mr-1.5 text-xs text-slate-400 line-through">
                            {formatMoney(item.line_total)}
                          </span>
                        )}
                        <span className="font-semibold text-slate-900">{formatMoney(lineAmount)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {data.order.customer_notes && (
            <p className="mt-4 text-sm text-slate-600">
              <span className="font-medium text-slate-700">Note:</span> {data.order.customer_notes}
            </p>
          )}
        </SectionCard>

        {/* Totals */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1dd1a1]/20 text-[#103a2a]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 7h10v10H7zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Totals</h2>
              {showDiscount && (
                <>
                  <p className="mt-3 flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatMoney(data.order.grand_total)}</span>
                  </p>
                  <p className="mt-1 flex justify-between text-sm font-medium text-emerald-700">
                    <span>Discount applied</span>
                    <span>
                      −
                      {formatMoney(
                        String(
                          Number(data.order.grand_total) - Number(data.order.discounted_grand_total),
                        ),
                      )}
                    </span>
                  </p>
                </>
              )}
              <p className="mt-2 flex justify-between text-xl font-bold text-slate-900">
                <span>Amount due</span>
                <span>{formatMoney(data.order.payable_total)}</span>
              </p>
              <p className="mt-2 text-sm capitalize text-slate-500">
                Payment status:{" "}
                <span className={isPaid ? "font-semibold text-emerald-700" : "font-semibold text-rose-600"}>
                  {payStatus}
                </span>
              </p>
              {data.payment.gateway_error && (
                <p className="mt-2 text-xs text-rose-700">{data.payment.gateway_error}</p>
              )}
            </div>
          </div>
        </section>

        {/* Payment */}
        {isPaid ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-center text-sm font-medium text-emerald-900">
            Thank you — this invoice is marked paid.
          </p>
        ) : (
          <div className="space-y-5">
            {canPayOnline && (
              <div className="space-y-3">
                {payMessage && <p className="text-center text-sm text-rose-700">{payMessage}</p>}
                <button
                  type="button"
                  disabled={paying}
                  onClick={() => void pay()}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#103a2a] py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#0c2e22] disabled:opacity-60"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  {paying ? "Redirecting…" : "Pay invoice online"}
                </button>
                <p className="text-center text-xs text-slate-500">
                  Secure card checkout via our payment partner.
                </p>
              </div>
            )}

            <SectionCard
              title={canPayOnline ? "Or pay by bank transfer" : "Pay by bank transfer"}
              icon={
                <span className="text-[#103a2a]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 10h18M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M5 14v6M19 14v6M9 14v6M15 14v6" />
                  </svg>
                </span>
              }
            >
              <p className="mb-4 text-sm text-slate-600">
                Include your <span className="font-semibold text-slate-800">company name</span> or{" "}
                <span className="font-semibold text-slate-800">email</span> as the payment reference.
              </p>
              <BankDetails
                layout="grid"
                labelClassName="text-[10px] font-bold uppercase tracking-wide text-slate-400"
                valueClassName="mt-1 text-sm font-semibold text-slate-800"
              />
            </SectionCard>
          </div>
        )}

        <p className="pt-4 text-center font-serif text-2xl italic text-[#103a2a]/80">
        Crafted with care. Delivered with trust.
          <span className="mt-1 block text-base not-italic text-[#1dd1a1]">♥</span>
        </p>
      </div>
    </InvoiceShell>
  );
}
