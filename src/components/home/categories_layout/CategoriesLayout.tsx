"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CategoryGridCard from "./CategoryGridCard";
import { CATEGORY_LAYOUT_ITEMS } from "./categoriesLayoutData";
import IndustryPackagingSlider from "@/components/common/IndustryPackagingSlider";
import {
  CATEGORY_PAGE_CONFIG,
  CATEGORY_TAB_ALL_ID,
  filterTeasersByTab,
  teasersToIndustryItems,
} from "@/data/categoryPages";

const FLOURISH_SRC = "/assets/images/categories/categories_layout/flourish.png";

function SectionFlourish() {
  return (
    <div className="mb-4 flex justify-center" aria-hidden>
      <Image
        src={FLOURISH_SRC}
        alt=""
        width={280}
        height={48}
        className="h-auto w-[200px] max-w-full object-contain sm:w-[260px]"
        priority={false}
      />
    </div>
  );
}

function CategoriesCtaBar({
  showingAllProducts,
  onViewAllProducts,
}: {
  showingAllProducts: boolean;
  onViewAllProducts: () => void;
}) {
  return (
    <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border-2 border-[#c5a059]/70 bg-white px-5 py-5 text-center shadow-[0_8px_28px_rgba(19,47,43,0.06)] sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-5 sm:text-left lg:mt-8">
      <div className="flex min-w-0 flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-5">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c5a059]/45 text-[#c5a059]"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M12 8v13M12 8a4 4 0 00-4-4H6a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-2a4 4 0 00-4 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold leading-snug text-[var(--dark-primary-green)] sm:text-xl">
            Need Custom Packaging?
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[var(--dark-primary-green)]/55 sm:text-sm">
            Let&apos;s create packaging that&apos;s uniquely yours.
          </p>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
        <Link
          href="/quote"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--dark-primary-green)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--dark-primary-green)]/90"
        >
          Get a Quote
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <button
          type="button"
          aria-pressed={showingAllProducts}
          onClick={onViewAllProducts}
          className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
            showingAllProducts
              ? "border-[var(--dark-primary-green)] bg-[var(--dark-primary-green)] text-white"
              : "border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/8"
          }`}
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default function CategoriesLayout() {
  const [showingAllProducts, setShowingAllProducts] = useState(false);

  const allProducts = useMemo(() => {
    const seen = new Set<string>();
    return CATEGORY_PAGE_CONFIG.flatMap((cfg) => {
      const teasers = cfg.tabs?.length
        ? filterTeasersByTab(cfg.products, cfg.tabs, CATEGORY_TAB_ALL_ID)
        : cfg.products;
      return teasersToIndustryItems(teasers)
        .filter((item) => {
          if (seen.has(item.href)) return false;
          seen.add(item.href);
          return true;
        })
        .map((item) => ({
          ...item,
          id: `${cfg.category}-${item.id}`,
        }));
    });
  }, []);

  return (
    <section className="w-full bg-[var(--primary-cream)] px-1.5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-10 text-center sm:mb-12">
          <SectionFlourish />
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight text-[var(--dark-primary-green)] sm:text-3xl lg:text-4xl">
            Explore Packaging Categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--dark-primary-green)]/60 sm:text-base">
            Thoughtfully crafted packaging solutions to elevate your brand and leave a lasting impression.
          </p>
        </header>

        {showingAllProducts ? (
          <IndustryPackagingSlider title="All Products" items={allProducts} itemsKey="home-all-products" />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {CATEGORY_LAYOUT_ITEMS.map((item) => (
              <CategoryGridCard key={item.slug} item={item} />
            ))}
          </div>
        )}
        <CategoriesCtaBar
          showingAllProducts={showingAllProducts}
          onViewAllProducts={() => setShowingAllProducts(true)}
        />
      </div>
    </section>
  );
}
