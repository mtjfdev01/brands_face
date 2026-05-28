"use client";

import Image from "next/image";
import Link from "next/link";

import CategoryGridCard from "./CategoryGridCard";
import { CATEGORY_LAYOUT_ITEMS } from "./categoriesLayoutData";
import { CategoryIcon } from "./CategoryIcon";

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

function CategoriesCtaCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-[#c5a059]/70 bg-white px-5 py-8 text-center shadow-[0_8px_28px_rgba(19,47,43,0.06)] sm:px-6 sm:py-10">
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/45 text-[#c5a059]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M12 8v13M12 8a4 4 0 00-4-4H6a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-2a4 4 0 00-4 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-lg font-bold leading-snug text-[var(--dark-primary-green)] sm:text-xl">
        Need Custom Packaging?
      </h3>
      <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-[var(--dark-primary-green)]/55 sm:text-sm">
        Let&apos;s create packaging that&apos;s uniquely yours.
      </p>
      <Link
        href="/audit"
        className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-[#c5a059] px-5 py-2.5 text-sm font-semibold text-[#c5a059] transition-colors hover:bg-[#c5a059]/8"
      >
        Get Free Audit
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
    </div>
  );
}

export default function CategoriesLayout() {
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

        <div className="grid grid-cols-2 gap-x-1.5 gap-y-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {CATEGORY_LAYOUT_ITEMS.map((item) => (
            <CategoryGridCard key={item.slug} item={item} />
          ))}
          <CategoriesCtaCard />
        </div>
      </div>
    </section>
  );
}
