"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminNewProductOrderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [productSlug, setProductSlug] = useState("admin-order");
  const [productTitle, setProductTitle] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [pricePerPiece, setPricePerPiece] = useState("");
  const [lineTotal, setLineTotal] = useState("");
  const [sizeLabel, setSizeLabel] = useState("");
  const [sizeDimensions, setSizeDimensions] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    const qty = parseInt(quantity, 10);
    const ppp = Number(pricePerPiece);
    if (!productTitle.trim()) {
      setMessage("Product title is required.");
      return;
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      setMessage("Quantity must be a positive whole number.");
      return;
    }
    if (!Number.isFinite(ppp) || ppp < 0) {
      setMessage("Price per piece must be a valid number.");
      return;
    }
    if (!fullName.trim() || !EMAIL_REGEX.test(email.trim())) {
      setMessage("Customer name and valid email are required.");
      return;
    }

    let lt: number | null = null;
    if (lineTotal.trim()) {
      lt = Number(lineTotal);
      if (!Number.isFinite(lt) || lt < 0) {
        setMessage("Line total must be a valid number, or leave blank to auto-calculate.");
        return;
      }
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/product-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productSlug: productSlug.trim() || "admin-order",
          productTitle: productTitle.trim(),
          quantity: qty,
          pricePerPiece: ppp,
          lineTotal: lt,
          sizeLabel: sizeLabel.trim() || null,
          sizeDimensions: sizeDimensions.trim() || null,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          company: company.trim() || null,
          customerNotes: customerNotes.trim() || null,
          adminNotes: adminNotes.trim() || null,
        }),
      });
      const data = (await res.json()) as { id?: number; message?: string };
      if (!res.ok) {
        setMessage(data.message ?? "Failed to create order.");
        return;
      }
      if (data.id) {
        router.push("/admin/product-orders");
        return;
      }
      setMessage("Created, but no id returned.");
    } catch {
      setMessage("Request failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/product-orders" className="text-sm font-semibold text-[#103a2a] hover:underline">
          ← Back to orders
        </Link>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Sales</p>
        <h1 className="mt-2 text-2xl font-black text-slate-900">Create order</h1>
        <p className="mt-2 text-sm text-slate-600">
          Creates a <strong className="font-semibold">standard order</strong>, upserts the customer by email, then you
          can generate a public invoice link from the orders list.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{message}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Product title *</label>
          <input
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Product slug</label>
            <input
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="admin-order"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Quantity *</label>
            <input
              type="number"
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Price per piece *</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={pricePerPiece}
              onChange={(e) => setPricePerPiece(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Line total (optional)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={lineTotal}
              onChange={(e) => setLineTotal(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Auto: qty × price"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Size label</label>
            <input
              value={sizeLabel}
              onChange={(e) => setSizeLabel(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Size dimensions</label>
            <input
              value={sizeDimensions}
              onChange={(e) => setSizeDimensions(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Customer name *</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              autoComplete="name"
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

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#103a2a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0c2e22] disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create order"}
        </button>
      </form>
    </div>
  );
}
