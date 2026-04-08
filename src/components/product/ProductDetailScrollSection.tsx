"use client";

import type { ProductDetailBlock } from "@/data/productDetailLongDescription";
import { DEFAULT_PRODUCT_DETAIL_BLOCKS } from "@/data/productDetailLongDescription";
import "./product-detail-scroll-section.css";

type Props = {
  /** Product name — used in the section subtitle only. */
  productTitle: string;
  /** Override default long-form blocks (e.g. from CMS later). */
  blocks?: ProductDetailBlock[];
  /** Visible scroll area height cap; content scrolls inside. */
  maxHeightClassName?: string;
};

export default function ProductDetailScrollSection({
  productTitle,
  blocks = DEFAULT_PRODUCT_DETAIL_BLOCKS,
  maxHeightClassName = "max-h-[min(42vh,26rem)] sm:max-h-[min(48vh,28rem)]",
}: Props) {
  return (
    <section
      className="product-detail-scroll-section relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[#103a2a]/12 bg-white shadow-[0_20px_50px_-24px_rgba(16,58,42,0.25)]"
      aria-labelledby="product-detail-scroll-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_320px_at_0%_-20%,rgba(29,209,161,0.14),transparent_55%),radial-gradient(700px_280px_at_100%_0%,rgba(16,58,42,0.06),transparent_50%)]" />

      <div className="relative border-b border-[#103a2a]/10 bg-gradient-to-r from-[#103a2a] via-[#103a2a] to-[#0f3428] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/55">Deep dive</p>
            <h2
              id="product-detail-scroll-heading"
              className="mt-1.5 font-serif text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]"
            >
              Product details
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
              Specifications, materials, finishing, and ordering notes for{" "}
              <span className="font-medium text-[#a8f5e0]">{productTitle}</span>. Scroll the panel below to read the
              full brief.
            </p>
          </div>
          <div
            className="product-detail-scroll-section__hint hidden shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.7rem] font-medium text-white/85 sm:flex"
            aria-hidden
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#1dd1a1]" />
            Scroll for more
          </div>
        </div>
        <div className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-[#1dd1a1]/90 via-[#1dd1a1]/35 to-transparent" />
      </div>

      <div className="relative px-1 pb-1 pt-0 sm:px-2 sm:pb-2">
        <div
          className={`product-detail-scroll-section__scroll ${maxHeightClassName} overflow-y-auto overscroll-y-contain px-4 py-5 sm:px-6 sm:py-6`}
          tabIndex={0}
          role="region"
          aria-label={`Extended product details for ${productTitle}`}
        >
          <div className="mx-auto max-w-3xl space-y-5 text-[#103a2a]">
            {blocks.map((block, i) => {
              const key = `${block.type}-${i}`;
              if (block.type === "h2") {
                return (
                  <h3
                    key={key}
                    className="scroll-mt-4 border-l-[3px] border-[#1dd1a1] pl-4 text-lg font-bold tracking-tight text-[#103a2a] first:mt-0 sm:text-xl"
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "h3") {
                return (
                  <h4 key={key} className="text-base font-semibold tracking-tight text-[#103a2a]/95 sm:text-[1.05rem]">
                    {block.text}
                  </h4>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={key} className="text-[0.9375rem] leading-[1.7] text-[#103a2a]/80">
                    {block.text}
                  </p>
                );
              }
              return (
                <ul
                  key={key}
                  className="space-y-2.5 border border-[#103a2a]/10 bg-[#f8fbf9]/90 py-4 pl-4 pr-4 text-[0.9375rem] leading-relaxed text-[#103a2a]/85 sm:rounded-2xl sm:pl-5"
                >
                  {block.items.map((item, j) => (
                    <li key={`${i}-${j}`} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1dd1a1] shadow-[0_0_0_3px_rgba(29,209,161,0.2)]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white via-white/92 to-transparent sm:h-16"
          aria-hidden
        />
      </div>

      <p className="relative border-t border-[#103a2a]/8 bg-[#f8fbf9]/80 px-5 py-3 text-center text-[0.7rem] text-[#103a2a]/45 sm:px-7">
        Placeholder editorial content — replace with SKU-specific copy when ready.
      </p>
    </section>
  );
}
