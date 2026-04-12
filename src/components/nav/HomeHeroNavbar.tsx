"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_CARDS } from "@/data/homeCards";
import { getNavMegaMenuCategories } from "@/data/categoryPages";
import NavbarCatalogSearch from "@/components/nav/NavbarCatalogSearch";

const MENU_ITEMS = [
  // { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  // { label: "Contact", href: "/quote" },
];

export type HomeHeroNavbarProps = {
  /**
   * `overlay` — absolute strip on full-bleed heroes (home, sale Hero, marketing tops).
   * `layout` — sticky top bar for long scrolling pages (quote, PDP, studio, audit).
   */
  variant?: "overlay" | "layout";
};

export default function HomeHeroNavbar({ variant = "overlay" }: HomeHeroNavbarProps) {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [hoveredMegaCategory, setHoveredMegaCategory] = useState<string | null>(null);
  const megaCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelMegaClose = () => {
    if (megaCloseTimerRef.current) {
      clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  };

  const scheduleMegaClose = () => {
    cancelMegaClose();
    megaCloseTimerRef.current = setTimeout(() => {
      setCategoriesOpen(false);
      setHoveredMegaCategory(null);
      megaCloseTimerRef.current = null;
    }, 220);
  };

  useEffect(() => () => cancelMegaClose(), []);

  const megaMenuTopClass =
    variant === "layout"
      ? "top-[4rem] sm:top-[4.25rem]"
      : "top-[5rem] sm:top-[5.5rem] lg:top-[5.75rem]";

  const megaCategories = useMemo(() => getNavMegaMenuCategories(), []);
  const activeMega =
    megaCategories.find((c) => c.category === hoveredMegaCategory) ?? megaCategories[0];

  const outerClassName =
    variant === "layout"
      ? "sticky top-0 z-50 w-full border-b border-white/10 bg-[#103a2a]/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8"
      : "absolute inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8";

  return (
    <div className={outerClassName}>
      <nav className="mx-auto max-w-[1280px] overflow-visible rounded-2xl border border-white/15 bg-[#103a2a]/70 backdrop-blur-xl shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
        <div className="relative flex items-center gap-3 overflow-visible px-4 sm:px-5 lg:px-6 py-3.5">
          {/* Desktop: menu on the left */}
          <ul className="relative z-[2] hidden min-w-0 flex-1 flex-wrap items-center justify-start gap-x-6 gap-y-2 lg:gap-x-8 md:flex">
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm lg:text-[15px] text-white/85 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              className="relative"
              onMouseEnter={() => {
                cancelMegaClose();
                setCategoriesOpen(true);
                setHoveredMegaCategory((prev) => prev ?? megaCategories[0]?.category ?? null);
              }}
              onMouseLeave={scheduleMegaClose}
            >
              <button
                type="button"
                onClick={() =>
                  setCategoriesOpen((v) => {
                    const next = !v;
                    if (next) {
                      setHoveredMegaCategory((p) => p ?? megaCategories[0]?.category ?? null);
                    } else {
                      setHoveredMegaCategory(null);
                    }
                    return next;
                  })
                }
                className="inline-flex items-center gap-1 text-sm lg:text-[15px] text-white/85 hover:text-white font-medium transition-colors"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
              >
                Product Categories
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                </svg>
              </button>

              <div
                className={`fixed inset-x-0 z-[100] hidden justify-center px-4 md:flex pointer-events-none ${megaMenuTopClass}`}
              >
                <div
                  onMouseEnter={cancelMegaClose}
                  onMouseLeave={() => {
                    cancelMegaClose();
                    setCategoriesOpen(false);
                    setHoveredMegaCategory(null);
                  }}
                  className={`pointer-events-auto pt-2 transition-all duration-200 ease-out ${
                    categoriesOpen
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div
                    className="w-[min(1100px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-[#103a2a]/15 bg-light-theme shadow-[0_20px_50px_-12px_rgba(16,58,42,0.25)]"
                    role="region"
                    aria-label="Product categories"
                  >
                  <div className="flex gap-1 overflow-x-auto border-b border-[#103a2a]/10 px-2 py-2.5 sm:px-3">
                    {megaCategories.map((c) => {
                      const selected = c.category === (hoveredMegaCategory ?? megaCategories[0]?.category);
                      return (
                        <Link
                          key={c.category}
                          href={c.seeAllHref}
                          onMouseEnter={() => setHoveredMegaCategory(c.category)}
                          onFocus={() => setHoveredMegaCategory(c.category)}
                          className={[
                            "shrink-0 rounded-lg px-3 py-2 text-left text-xs font-semibold no-underline transition-colors sm:text-sm",
                            selected
                              ? "bg-[#103a2a] text-white shadow-sm"
                              : "text-[#103a2a]/80 hover:bg-[#103a2a]/8 hover:text-[#103a2a]",
                          ].join(" ")}
                        >
                          {c.title}
                        </Link>
                      );
                    })}
                  </div>

                  {activeMega && activeMega.columns.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5">
                      {activeMega.columns.map((col) => (
                        <div key={col.tabId} className="flex min-w-0 flex-col">
                          <Link
                            href={col.categoryHrefWithTab}
                            className="mb-2 inline-block shrink-0 text-sm font-bold text-[#103a2a] transition-colors hover:text-[#0f6b52]"
                          >
                            {col.label}
                          </Link>
                          <ul
                            className="max-h-[min(320px,42vh)] space-y-0.5 overflow-y-auto overscroll-contain pr-1 text-[#103a2a]/90"
                            aria-label={`${col.label} products`}
                          >
                            {col.products.length === 0 ? (
                              <li className="py-1 text-xs text-[#103a2a]/50">No products in this tab yet.</li>
                            ) : (
                              col.products.map((p) => (
                                <li key={p.slug}>
                                  <Link
                                    href={p.href}
                                    className="block rounded-md px-1 py-1 text-left text-xs leading-snug transition-colors hover:bg-[#103a2a]/6 hover:text-[#103a2a] sm:text-[13px]"
                                  >
                                    {p.title}
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="px-5 py-4 text-sm text-[#103a2a]/65">
                      Browse all products in this category.
                    </p>
                  )}

                  <div className="flex justify-end border-t border-[#103a2a]/10 px-4 py-3 sm:px-5">
                    {activeMega && (
                      <Link
                        href={activeMega.seeAllHref}
                        className="text-sm font-semibold text-[#0f6b52] transition-colors hover:text-[#103a2a]"
                      >
                        See all
                      </Link>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </li>
          </ul>

          {/* Center: logo (true center of nav bar) */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-[-10] flex -translate-x-1/2 -translate-y-1/2 items-center"
            aria-label="BrandsFace home"
          >
            {/* Outer h-9 = zero layout impact on bar (link is absolute); inner chip is much taller, centered, spills vertically */}
            <span className="relative h-9 w-[156px] shrink-0 overflow-visible sm:w-[182px] md:w-[210px]">
              <span className="absolute left-0 right-0 top-1/2 z-[1] h-[96px] w-full -translate-y-1/2 overflow-hidden rounded-xl bg-white/92 shadow-sm sm:h-[112px] md:h-[132px]">
                <Image
                  src="/assets/images/logos/logo.png"
                  alt=""
                  fill
                  className="object-contain object-center p-1"
                  sizes="(max-width: 640px) 156px, (max-width: 768px) 182px, 210px"
                  priority
                />
              </span>
            </span>
          </Link>

          {/* Desktop: catalog search + CTAs */}
          <div className="relative z-[2] hidden min-w-0 flex-1 items-center justify-end gap-2.5 md:flex">
            <NavbarCatalogSearch className="mr-1 w-full max-w-[200px] lg:max-w-[240px] xl:max-w-[260px]" />
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/12 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 lg:px-5"
            >
              Get a Quote
            </Link>
            {/* <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-full bg-[#1dd1a1] px-4 py-2.5 text-sm font-bold text-[#0f2f22] shadow-[0_6px_24px_rgba(29,209,161,0.35)] transition-all hover:bg-[#37dfb2] lg:px-5"
            >
              Create 3D Mockup
            </Link> */}
          </div>

          {/* Mobile: hamburger on the right */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-[2] ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 transition-transform active:scale-95 md:hidden"
          >
            <span
              className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${
                open ? "rotate-45 translate-y-0" : "-translate-y-[7px]"
              }`}
            />
            <span
              className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${
                open ? "opacity-0 scale-x-50" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-[2.5px] w-6 rounded-full bg-white transition-all duration-300 ${
                open ? "-rotate-45 translate-y-0" : "translate-y-[7px]"
              }`}
            />
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
            open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-1 border-t border-white/10 bg-[#0f3325]/90">
            <div className="mb-3 pt-2">
              <NavbarCatalogSearch
                tone="drawer"
                className="w-full"
                onNavigate={() => {
                  setOpen(false);
                  setMobileCategoriesOpen(false);
                }}
              />
            </div>
            <ul className="grid grid-cols-2 gap-2.5">
              {MENU_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="col-span-2">
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90"
                  aria-expanded={mobileCategoriesOpen}
                >
                  Categories
                  <svg
                    className={`h-4 w-4 transition-transform ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                <div
                  className={`mt-2 grid grid-cols-2 gap-2 overflow-hidden transition-all ${
                    mobileCategoriesOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {HOME_CARDS.map((card) => (
                    <Link
                      key={card.category}
                      href={`/category/${card.category}`}
                      onClick={() => {
                        setOpen(false);
                        setMobileCategoriesOpen(false);
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition-colors"
                    >
                      {card.title}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-white/12 border border-white/20 px-3 py-2.5 text-white text-sm font-semibold"
              >
                Get a Quote
              </Link>
              <Link
                href="/studio"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg bg-[#1dd1a1] px-3 py-2.5 text-[#0f2f22] text-sm font-bold"
              >
                Create Mockup
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
