"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ORDER_CATEGORY_OPTIONS } from "@/lib/orderCategories";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CustomerHit = {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
};

type ProductLine = {
  key: string;
  category: string;
  productTitle: string;
  sizeLabel: string;
  quantity: string;
  pricePerPiece: string;
  discountedLineTotal: string;
};

function newLine(): ProductLine {
  return {
    key: crypto.randomUUID(),
    category: "",
    productTitle: "",
    sizeLabel: "",
    quantity: "1",
    pricePerPiece: "",
    discountedLineTotal: "",
  };
}

function lineSubtotal(line: ProductLine): number {
  const qty = parseInt(line.quantity, 10);
  const ppp = Number(line.pricePerPiece);
  if (!Number.isInteger(qty) || qty <= 0 || !Number.isFinite(ppp) || ppp < 0) return 0;
  return Math.round(qty * ppp * 100) / 100;
}

function linePayable(line: ProductLine): number {
  const disc = line.discountedLineTotal.trim();
  if (disc !== "") {
    const n = Number(disc);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return lineSubtotal(line);
}

export default function AdminNewProductOrderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error" | "warning">("warning");
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const [customerSearch, setCustomerSearch] = useState("");
  const [searchHits, setSearchHits] = useState<CustomerHit[]>([]);
  const [searching, setSearching] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [lines, setLines] = useState<ProductLine[]>(() => [newLine()]);
  const [orderDiscountedGrandTotal, setOrderDiscountedGrandTotal] = useState("");

  const [customerNotes, setCustomerNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const computedGrandTotal = useMemo(
    () => Math.round(lines.reduce((s, l) => s + lineSubtotal(l), 0) * 100) / 100,
    [lines],
  );

  const lineItemsPayableSum = useMemo(
    () => Math.round(lines.reduce((s, l) => s + linePayable(l), 0) * 100) / 100,
    [lines],
  );

  const finalInvoiceTotal = useMemo(() => {
    const orderDisc = orderDiscountedGrandTotal.trim();
    if (orderDisc !== "") {
      const n = Number(orderDisc);
      if (Number.isFinite(n) && n >= 0) return n;
    }
    return lineItemsPayableSum;
  }, [lineItemsPayableSum, orderDiscountedGrandTotal]);

  const hasPerLineDiscount = lines.some((l) => l.discountedLineTotal.trim() !== "");

  useEffect(() => {
    const q = customerSearch.trim();
    if (q.length < 2) {
      setSearchHits([]);
      return;
    }
    const t = window.setTimeout(() => {
      void (async () => {
        setSearching(true);
        try {
          const res = await fetch(`/api/admin/customers?q=${encodeURIComponent(q)}`, { cache: "no-store" });
          const data = (await res.json()) as { customers?: CustomerHit[] };
          setSearchHits(data.customers ?? []);
        } catch {
          setSearchHits([]);
        } finally {
          setSearching(false);
        }
      })();
    }, 300);
    return () => window.clearTimeout(t);
  }, [customerSearch]);

  const applyCustomer = (c: CustomerHit) => {
    setFullName(c.full_name);
    setEmail(c.email);
    setPhone(c.phone ?? "");
    setCompany(c.company ?? "");
    setCustomerSearch("");
    setSearchHits([]);
  };

  const updateLine = (key: string, patch: Partial<ProductLine>) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  };

  const addLine = () => setLines((prev) => [...prev, newLine()]);

  const removeLine = (key: string) => {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.key !== key)));
  };

  const copyInvoice = useCallback(async () => {
    if (!invoiceUrl) return;
    try {
      await navigator.clipboard.writeText(invoiceUrl);
      setMessageTone("success");
      setMessage("Invoice link copied.");
    } catch {
      setMessageTone("warning");
      setMessage("Could not copy — select the URL manually.");
    }
  }, [invoiceUrl]);

  const sendInvoiceEmail = useCallback(async () => {
    if (!orderId) return;
    setEmailSending(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/product-orders/${orderId}/send-invoice`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email.trim() || undefined }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setMessageTone("error");
        setMessage(data.message ?? "Failed to send invoice email.");
        return;
      }
      setMessageTone("success");
      setMessage(data.message ?? "Invoice email sent.");
    } catch {
      setMessageTone("error");
      setMessage("Failed to send invoice email.");
    } finally {
      setEmailSending(false);
    }
  }, [email, orderId]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageTone("warning");
    setInvoiceUrl("");
    setOrderId(null);

    if (!fullName.trim() || !EMAIL_REGEX.test(email.trim())) {
      setMessageTone("warning");
      setMessage("Customer name and valid email are required.");
      return;
    }

    const payloadLines = [];
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const title = l.productTitle.trim();
      const qty = parseInt(l.quantity, 10);
      const ppp = Number(l.pricePerPiece);
      if (!title) {
        setMessageTone("warning");
        setMessage(`Product ${i + 1}: name is required.`);
        return;
      }
      if (!Number.isInteger(qty) || qty <= 0) {
        setMessageTone("warning");
        setMessage(`Product ${i + 1}: enter a valid quantity.`);
        return;
      }
      if (!Number.isFinite(ppp) || ppp < 0) {
        setMessageTone("warning");
        setMessage(`Product ${i + 1}: enter a valid price per item.`);
        return;
      }
      const lineTotal = lineSubtotal(l);
      let discountedLineTotal: number | null = null;
      if (l.discountedLineTotal.trim() !== "") {
        discountedLineTotal = Number(l.discountedLineTotal);
        if (!Number.isFinite(discountedLineTotal) || discountedLineTotal < 0) {
          setMessageTone("warning");
          setMessage(`Product ${i + 1}: discounted line total is invalid.`);
          return;
        }
      }
      payloadLines.push({
        productTitle: title,
        category: l.category.trim() || null,
        sizeLabel: l.sizeLabel.trim() || null,
        quantity: qty,
        pricePerPiece: ppp,
        lineTotal,
        discountedLineTotal,
      });
    }

    let discountedGrandTotal: number | null = null;
    if (orderDiscountedGrandTotal.trim() !== "") {
      discountedGrandTotal = Number(orderDiscountedGrandTotal);
      if (!Number.isFinite(discountedGrandTotal) || discountedGrandTotal < 0) {
        setMessageTone("warning");
        setMessage("Discounted grand total is invalid.");
        return;
      }
    } else if (hasPerLineDiscount || lineItemsPayableSum < computedGrandTotal) {
      discountedGrandTotal = lineItemsPayableSum;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/product-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          company: company.trim() || null,
          dueDate: dueDate.trim() || null,
          grandTotal: computedGrandTotal,
          discountedGrandTotal,
          lineItems: payloadLines,
          customerNotes: customerNotes.trim() || null,
          adminNotes: adminNotes.trim() || null,
          generateInvoice: true,
        }),
      });
      const data = (await res.json()) as {
        id?: number;
        message?: string;
        invoiceUrl?: string;
      };
      if (!res.ok) {
        setMessageTone("error");
        setMessage(data.message ?? "Failed to create order.");
        return;
      }
      if (data.invoiceUrl) {
        setInvoiceUrl(data.invoiceUrl);
        if (data.id) setOrderId(data.id);
        setMessageTone("success");
        setMessage(data.message ?? "Order created. Invoice link is ready below.");
        return;
      }
      if (data.id) {
        router.push("/admin/product-orders");
      }
    } catch {
      setMessageTone("error");
      setMessage("Request failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/product-orders" className="text-sm font-semibold text-[#103a2a] hover:underline">
          ← Back to orders
        </Link>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Sales</p>
        <h1 className="mt-2 text-2xl font-black text-slate-900">Create order</h1>
        <p className="mt-2 text-sm text-slate-600">
          Select or enter a customer, add one or more products, and generate a public invoice link automatically.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            messageTone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : messageTone === "error"
                ? "border-rose-200 bg-rose-50 text-rose-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          {message}
        </div>
      )}

      {invoiceUrl && (
        <div className="rounded-2xl border border-[#103a2a]/20 bg-[#103a2a]/5 p-4">
          <p className="text-xs font-semibold uppercase text-[#103a2a]">Public invoice URL</p>
          <p className="mt-2 break-all font-mono text-xs text-slate-700">{invoiceUrl}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyInvoice()}
              className="rounded-lg bg-[#103a2a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0c2e22]"
            >
              Copy link
            </button>
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              Open invoice
            </a>
            <button
              type="button"
              onClick={() => void sendInvoiceEmail()}
              disabled={emailSending || !orderId}
              className="rounded-lg border border-[#103a2a]/30 bg-white px-4 py-2 text-xs font-semibold text-[#103a2a] hover:bg-[#103a2a]/5 disabled:opacity-50"
            >
              {emailSending ? "Sending…" : "Send via email"}
            </button>
            <Link
              href="/admin/product-orders"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              Go to orders list
            </Link>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Customer</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700">Search existing customers (optional)</label>
            <input
              type="search"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder="Name, email, phone, or company…"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              autoComplete="off"
            />
            {searching && <p className="mt-1 text-xs text-slate-500">Searching…</p>}
            {searchHits.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                {searchHits.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => applyCustomer(c)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                    >
                      <span className="font-medium text-slate-900">{c.full_name}</span>
                      <span className="text-slate-500"> · {c.email}</span>
                      {c.phone && <span className="block text-xs text-slate-500">{c.phone}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Customer name *</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                autoComplete="tel"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Company</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Invoice due date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-slate-900">Products</h2>
            <button
              type="button"
              onClick={addLine}
              className="inline-flex items-center gap-1 rounded-lg border border-[#103a2a]/30 bg-[#103a2a]/5 px-3 py-1.5 text-xs font-semibold text-[#103a2a] hover:bg-[#103a2a]/10"
              aria-label="Add product line"
            >
              <span className="text-base leading-none">+</span> Add product
            </button>
          </div>

          {lines.map((line, index) => (
            <div key={line.key} className="relative rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase text-slate-500">Line {index + 1}</p>
                {lines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-700"
                    aria-label="Remove product line"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600">Category (optional)</label>
                  <select
                    value={line.category}
                    onChange={(e) => updateLine(line.key, { category: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">— Select category —</option>
                    {ORDER_CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600">Product name *</label>
                  <input
                    value={line.productTitle}
                    onChange={(e) => updateLine(line.key, { productTitle: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600">Size</label>
                  <input
                    value={line.sizeLabel}
                    onChange={(e) => updateLine(line.key, { sizeLabel: e.target.value })}
                    placeholder="e.g. 10×8×3 in"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Quantity *</label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={line.quantity}
                    onChange={(e) => updateLine(line.key, { quantity: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Price per item *</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={line.pricePerPiece}
                    onChange={(e) => updateLine(line.key, { pricePerPiece: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Line total</label>
                  <p className="mt-2 text-sm font-semibold text-slate-800">${lineSubtotal(line).toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600">Discounted line total (optional)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={line.discountedLineTotal}
                    onChange={(e) => updateLine(line.key, { discountedLineTotal: e.target.value })}
                    placeholder="Leave blank for none"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Grand total</span>
              <span className="font-bold text-slate-900">${computedGrandTotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-slate-600">Subtotal after line discounts</span>
              <span className="font-semibold text-slate-800">${lineItemsPayableSum.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-sm">
              <span className="font-medium text-slate-700">Final invoice total</span>
              <span className="font-bold text-[#103a2a]">${finalInvoiceTotal.toFixed(2)}</span>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-600">
                Discounted grand total (optional — overrides final total)
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={orderDiscountedGrandTotal}
                onChange={(e) => setOrderDiscountedGrandTotal(e.target.value)}
                placeholder={lineItemsPayableSum.toFixed(2)}
                className="mt-1 w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Customer-facing notes</label>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Internal notes</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting || Boolean(invoiceUrl)}
          className="rounded-lg bg-[#103a2a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0c2e22] disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create order & invoice"}
        </button>
      </form>
    </div>
  );
}
