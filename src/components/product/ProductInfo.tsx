"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Types ── */
export type ProductDeal = {
  title: string;
  description: string;
  code: string;
};

export type ProductSize = {
  label: string;
  dimensions: string;
};

export type QuantityOption = {
  qty: number;
  pricePerPiece: number;
  total: number;
};

export type ProductData = {
  slug: string;
  title: string;
  description: string;
  badges: string[];
  deals: ProductDeal[];
  quantities: QuantityOption[];
  sizes: ProductSize[];
  deliveryEstimate: string;
  images: string[];
  features: { label: string; value: string }[];
  details: string; // HTML or long text for extra details below
};

/* ── Badge pill ── */
function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium text-gray-700">
      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {label}
    </span>
  );
}

/* ── Deal banner ── */
function DealBanner({ deals }: { deals: ProductDeal[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (deals.length === 0) return null;
  const deal = deals[activeIdx];

  return (
    <div className="rounded-2xl bg-[#B91C1C] text-white p-5">
      <h4 className="text-sm font-bold">{deal.title}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-white/80">
        {deal.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">Code:</span>
          <span className="inline-flex items-center gap-1 bg-white/15 rounded px-2 py-0.5 text-xs font-bold tracking-wide">
            {deal.code}
            <button
              onClick={() => navigator.clipboard?.writeText(deal.code)}
              className="hover:text-white/60 transition-colors"
              aria-label="Copy code"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">
            Deal {activeIdx + 1} / {deals.length}
          </span>
          <button
            onClick={() => setActiveIdx((prev) => (prev - 1 + deals.length) % deals.length)}
            className="w-6 h-6 rounded-full border border-white/30 grid place-items-center text-xs hover:bg-white/10 transition-colors"
            aria-label="Previous deal"
          >
            ‹
          </button>
          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % deals.length)}
            className="w-6 h-6 rounded-full border border-white/30 grid place-items-center text-xs hover:bg-white/10 transition-colors"
            aria-label="Next deal"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ProductInfo ── */
export default function ProductInfo({ product }: { product: ProductData }) {
  const [selectedQty, setSelectedQty] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qtyDropdownOpen, setQtyDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const currentQty = product.quantities[selectedQty];
  const currentSize = product.sizes[selectedSize];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl tracking-tight">
          {product.title}
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge} label={badge} />
          ))}
        </div>
      )}

      {/* Deal banner */}
      <DealBanner deals={product.deals} />

      {/* Quantity selector */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
        <div className="relative">
          <button
            onClick={() => setQtyDropdownOpen(!qtyDropdownOpen)}
            className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 text-sm hover:border-gray-400 transition-colors"
          >
            <span className="font-semibold text-gray-900">{currentQty.qty}</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                ${currentQty.pricePerPiece.toFixed(2)}/piece
              </span>
              <span className="font-bold text-gray-900">
                ${currentQty.total.toFixed(2)}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${qtyDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {qtyDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              {product.quantities.map((opt, idx) => (
                <button
                  key={opt.qty}
                  onClick={() => {
                    setSelectedQty(idx);
                    setQtyDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    idx === selectedQty ? "bg-gray-50 font-semibold" : ""
                  }`}
                >
                  <span className="font-semibold text-gray-900">{opt.qty}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">
                      ${opt.pricePerPiece.toFixed(2)}/piece
                    </span>
                    <span className="font-bold text-gray-900">
                      ${opt.total.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Bigger needs?{" "}
          <Link href="#" className="inline-flex items-center gap-1 font-medium text-gray-900 underline underline-offset-2 hover:text-[var(--color-brand-accent)]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Let&apos;s talk
          </Link>
        </p>
      </div>

      {/* Size selector */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Size (external)
        </h3>
        <div className="relative">
          <button
            onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
            className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3.5 text-sm hover:border-gray-400 transition-colors"
          >
            <span className="text-gray-900">
              {currentSize.label}{" "}
              <span className="text-gray-500">({currentSize.dimensions})</span>
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${sizeDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sizeDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              {product.sizes.map((size, idx) => (
                <button
                  key={size.label}
                  onClick={() => {
                    setSelectedSize(idx);
                    setSizeDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    idx === selectedSize ? "bg-gray-50 font-semibold" : ""
                  }`}
                >
                  {size.label}{" "}
                  <span className="text-gray-500">({size.dimensions})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Specifications */}
      {product.features.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Specifications
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {product.features.map((feat) => (
              <div key={feat.label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500">{feat.label}</p>
                <p className="mt-0.5 text-sm font-medium text-gray-900">
                  {feat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details / description */}
      {product.details && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Product Details
          </h3>
          <div className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed">
            {product.details.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-3">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
