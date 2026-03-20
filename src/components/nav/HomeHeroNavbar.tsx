"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_CARDS } from "@/data/homeCards";

const MENU_ITEMS = [
  // { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  // { label: "Contact", href: "/quote" },
];

export default function HomeHeroNavbar() {
  const [open, setOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 top-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">
      <nav className="mx-auto max-w-[1280px] rounded-2xl border border-white/15 bg-[#103a2a]/70 backdrop-blur-xl shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 lg:px-6 py-3.5">
          {/* Left: logo */}
          <Link href="/" className="relative w-[122px] h-[36px] shrink-0">
            <Image
              src="/assets/images/logos/logo.png"
              alt="Brands Face"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Center: menu desktop */}
          <ul className="hidden md:flex items-center justify-center gap-7 lg:gap-8 flex-1">
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
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCategoriesOpen((v) => !v)}
                className="inline-flex items-center gap-1 text-sm lg:text-[15px] text-white/85 hover:text-white font-medium transition-colors"
                aria-expanded={categoriesOpen}
              >
                Product Categories
                <svg
                  className={`h-4 w-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                </svg>
              </button>

              <div
                className={`absolute left-1/2 top-full mt-0 w-[280px] -translate-x-1/2 rounded-xl border border-white/15 bg-[#0f3325]/95 p-2 shadow-2xl backdrop-blur-xl transition-all ${
                  categoriesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                {HOME_CARDS.map((card) => (
                  <Link
                    key={card.category}
                    href={`/category/${card.category}`}
                    className="block rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {card.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          {/* Right: CTAs desktop */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full bg-white/12 border border-white/25 px-4 lg:px-5 py-2.5 text-white text-sm font-semibold hover:bg-white/20 transition-all"
            >
              Get a Quote
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-full bg-[#1dd1a1] px-4 lg:px-5 py-2.5 text-[#0f2f22] text-sm font-bold hover:bg-[#37dfb2] transition-all shadow-[0_6px_24px_rgba(29,209,161,0.35)]"
            >
              Create 3D Mockup
            </Link>
          </div>

          {/* Mobile: animated hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden relative w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center active:scale-95 transition-transform"
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
