"use client";

import { useEffect, useState, type ForwardedRef, type RefObject } from "react";
import Link from "next/link";
import ProductLeadForms, { type ProductLeadFormsHandle } from "./ProductLeadForms";

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
  details: string;
};

const border = "border-[#103a2a]/15";
const text = "text-[#103a2a]";
const textMuted = "text-[#103a2a]/70";
const textSoft = "text-[#103a2a]/55";
const surface = "bg-[#f8fbf9]";
const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1dd1a1]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function Badge({ label }: { label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${border} bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] ${text}`}
    >
      <svg
        className={`h-3.5 w-3.5 shrink-0 ${textSoft}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {label}
    </span>
  );
}

/** Promo strip — forest band aligned with catalog CTAs / PDP footer */
function DealBanner({ deals }: { deals: ProductDeal[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (deals.length === 0) return null;
  const deal = deals[activeIdx];

  return (
    <div className="rounded-2xl bg-[#103a2a] p-5 text-white shadow-[0_12px_38px_rgba(16,58,42,0.2)]">
      <h4 className="text-sm font-bold">{deal.title}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-white/80">{deal.description}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/90">Code:</span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/12 px-2 py-0.5 text-xs font-bold tracking-wide">
            {deal.code}
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(deal.code)}
              className="rounded p-0.5 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Copy code"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/55">
            Deal {activeIdx + 1} / {deals.length}
          </span>
          <button
            type="button"
            onClick={() => setActiveIdx((prev) => (prev - 1 + deals.length) % deals.length)}
            className={`grid h-7 w-7 place-items-center rounded-full border border-white/25 text-sm transition-colors hover:bg-white/10 ${focusRing}`}
            aria-label="Previous deal"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActiveIdx((prev) => (prev + 1) % deals.length)}
            className={`grid h-7 w-7 place-items-center rounded-full border border-white/25 text-sm transition-colors hover:bg-white/10 ${focusRing}`}
            aria-label="Next deal"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

type ProductInfoProps = {
  product: ProductData;
  /** Syncs sticky footer / parent UI with the selected pricing tier */
  onQuantityTierChange?: (tier: QuantityOption) => void;
  leadFormsRef?: RefObject<ProductLeadFormsHandle | null>;
};

export default function ProductInfo({
  product,
  onQuantityTierChange,
  leadFormsRef,
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const currentQty = product.quantities[0];
  const currentSize = product.sizes[selectedSize];

  useEffect(() => {
    onQuantityTierChange?.(currentQty);
  }, [currentQty, onQuantityTierChange]);

  return (
    <div
      className={`space-y-6 rounded-2xl border ${border} bg-white p-6 shadow-[0_12px_38px_rgba(16,58,42,0.07)] sm:p-8`}
    >
      <div>
        <h1 className={`text-3xl font-bold tracking-tight md:text-4xl ${text}`}>{product.title}</h1>
        <p className={`mt-3 text-base leading-relaxed ${textMuted}`}>{product.description}</p>
      </div>

      {product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge} label={badge} />
          ))}
        </div>
      )}

      <DealBanner deals={product.deals} />

      <div id="pdp-quantity" className="scroll-mt-28">
        <h3 className={`mb-2 text-sm font-semibold ${text}`}>Order</h3>
        <ProductLeadForms
          ref={leadFormsRef as ForwardedRef<ProductLeadFormsHandle>}
          showActions
          productSlug={product.slug}
          productTitle={product.title}
          selectedQuantity={currentQty}
          selectedSize={currentSize}
        />
        <p className={`mt-3 text-sm ${textSoft}`}>
          Bigger needs?{" "}
          <Link
            href="/quote"
            className={`inline-flex items-center gap-1 font-semibold ${text} underline decoration-[#103a2a]/30 underline-offset-2 transition-colors hover:text-[#0c2e22] hover:decoration-[#1dd1a1]/60`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Let&apos;s talk
          </Link>
        </p>
      </div>

      <div>
        <h3 className={`mb-2 text-sm font-semibold ${text}`}>Size (external)</h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
            className={`flex w-full items-center justify-between rounded-xl border ${border} bg-white px-4 py-3.5 text-sm transition-colors hover:border-[#103a2a]/35 ${focusRing}`}
            aria-expanded={sizeDropdownOpen}
          >
            <span className={text}>
              {currentSize.label}{" "}
              <span className={textSoft}>({currentSize.dimensions})</span>
            </span>
            <svg
              className={`h-4 w-4 ${textSoft} transition-transform ${sizeDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sizeDropdownOpen && (
            <div
              className={`absolute z-20 mt-1 w-full overflow-hidden rounded-xl border ${border} bg-white shadow-[0_16px_40px_rgba(16,58,42,0.12)]`}
            >
              {product.sizes.map((size, idx) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => {
                    setSelectedSize(idx);
                    setSizeDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#f8fbf9] ${
                    idx === selectedSize ? `bg-[#f8fbf9] font-semibold ${text}` : textMuted
                  }`}
                >
                  {size.label} <span className={textSoft}>({size.dimensions})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {product.features.length > 0 && (
        <div>
          <button
            type="button"
            id="pdp-features-toggle"
            aria-expanded={featuresOpen}
            aria-controls="pdp-features-panel"
            onClick={() => setFeaturesOpen((o) => !o)}
            className={`flex w-full items-center justify-between rounded-xl border ${border} bg-white px-4 py-3.5 text-sm font-semibold transition-colors hover:border-[#103a2a]/35 ${text} ${focusRing}`}
          >
            Features
            <svg
              className={`h-4 w-4 shrink-0 ${textSoft} transition-transform ${featuresOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {featuresOpen && (
            <div id="pdp-features-panel" role="region" aria-labelledby="pdp-features-toggle" className="mt-3">
              <h3 className={`mb-3 text-sm font-semibold ${text}`}>Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feat) => (
                  <div
                    key={feat.label}
                    className={`rounded-xl border ${border} ${surface} px-4 py-3`}
                  >
                    <p className={`text-xs ${textSoft}`}>{feat.label}</p>
                    <p className={`mt-0.5 text-sm font-medium ${text}`}>{feat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* {product.details && (
        <div>
          <h3 className={`mb-3 text-sm font-semibold ${text}`}>Product Details</h3>
          <div className={`max-w-none text-sm leading-relaxed ${textMuted}`}>
            {product.details.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
