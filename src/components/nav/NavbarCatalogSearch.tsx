"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  getCatalogSearchIndex,
  type NavSearchCategoryHit,
  type NavSearchProductHit,
  type NavSearchResult,
} from "@/data/categoryPages";

type Props = {
  className?: string;
  /** Called after user picks a result (e.g. close mobile drawer). */
  onNavigate?: () => void;
  /** Chrome tuned for dark green nav bar vs mobile drawer. */
  tone?: "nav" | "drawer";
};

function partitionMatches(index: NavSearchResult[], q: string) {
  const n = q.trim().toLowerCase();
  if (!n) return { categories: [] as NavSearchCategoryHit[], products: [] as NavSearchProductHit[] };
  const categories: NavSearchCategoryHit[] = [];
  const products: NavSearchProductHit[] = [];
  for (const item of index) {
    if (item.kind === "category") {
      if (item.title.toLowerCase().includes(n) || item.category.toLowerCase().includes(n)) {
        categories.push(item);
      }
    } else if (
      item.title.toLowerCase().includes(n) ||
      item.categoryTitle.toLowerCase().includes(n) ||
      item.slug.toLowerCase().includes(n)
    ) {
      products.push(item);
    }
  }
  return {
    categories: categories.slice(0, 8),
    products: products.slice(0, 20),
  };
}

export default function NavbarCatalogSearch({ className = "", onNavigate, tone = "nav" }: Props) {
  const inputId = useId();
  const index = useMemo(() => getCatalogSearchIndex(), []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const positionDrawerPanel = useCallback(() => {
    if (tone !== "drawer" || !panelRef.current || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    const el = panelRef.current;
    const pad = 8;
    const w = Math.min(r.width, window.innerWidth - pad * 2);
    const left = Math.min(Math.max(pad, r.left), window.innerWidth - pad - w);
    el.style.position = "fixed";
    el.style.left = `${left}px`;
    el.style.top = `${r.bottom + 4}px`;
    el.style.width = `${w}px`;
    el.style.zIndex = "200";
  }, [tone]);

  const { categories, products } = useMemo(() => partitionMatches(index, query), [index, query]);
  const hasResults = categories.length > 0 || products.length > 0;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showPanel = open && query.trim().length > 0;

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (tone === "nav" && el) {
      el.style.position = "";
      el.style.left = "";
      el.style.top = "";
      el.style.width = "";
      el.style.zIndex = "";
    }
    if (tone !== "drawer" || !showPanel) return;
    positionDrawerPanel();
    window.addEventListener("resize", positionDrawerPanel);
    return () => window.removeEventListener("resize", positionDrawerPanel);
  }, [tone, showPanel, positionDrawerPanel, query]);

  const handlePick = useCallback(() => {
    setQuery("");
    setOpen(false);
    onNavigate?.();
  }, [onNavigate]);

  const inputClass =
    tone === "nav"
      ? "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 pl-9 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#1dd1a1]/60 focus:ring-2 focus:ring-[#1dd1a1]/25"
      : "w-full rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2 pl-9 text-sm text-white placeholder:text-white/45 outline-none focus:border-[#1dd1a1]/50 focus:ring-2 focus:ring-[#1dd1a1]/20";

  const panelClass =
    tone === "nav"
      ? "absolute left-0 right-0 top-full z-[120] mt-1 max-h-[min(70vh,420px)] overflow-y-auto rounded-xl border border-[#103a2a]/20 bg-[#f8fbf9] py-2 shadow-[0_20px_50px_-12px_rgba(16,58,42,0.28)]"
      : "max-h-[min(50vh,360px)] overflow-y-auto rounded-xl border border-white/12 bg-[#0f3325] py-2 shadow-lg";

  const sectionLabel =
    tone === "nav"
      ? "text-[10px] font-bold uppercase tracking-[0.08em] text-[#103a2a]/45"
      : "text-[10px] font-bold uppercase tracking-[0.08em] text-white/40";

  const linkCategory =
    tone === "nav"
      ? "block px-3 py-2 text-sm font-semibold text-[#103a2a] hover:bg-[#103a2a]/8"
      : "block px-3 py-2 text-sm font-semibold text-white hover:bg-white/10";

  const linkProduct =
    tone === "nav"
      ? "block px-3 py-1.5 text-sm text-[#103a2a]/90 hover:bg-[#103a2a]/6"
      : "block px-3 py-1.5 text-sm text-white/90 hover:bg-white/[0.08]";

  const subMuted =
    tone === "nav" ? "mt-0.5 block text-xs text-[#103a2a]/50" : "mt-0.5 block text-xs text-white/45";

  const emptyClass =
    tone === "nav" ? "px-3 py-4 text-center text-sm text-[#103a2a]/55" : "px-3 py-4 text-center text-sm text-white/50";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <label className="sr-only" htmlFor={inputId}>
        Search categories and products
      </label>
      <span
        className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-white/50"
        aria-hidden
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Search categories & products…"
        className={inputClass}
      />
      {showPanel && (
        <div ref={panelRef} className={panelClass} role="listbox" aria-label="Search results">
          {!hasResults ? (
            <p className={emptyClass}>No matches for &ldquo;{query.trim()}&rdquo;</p>
          ) : (
            <>
              {categories.length > 0 && (
                <div className="mb-1">
                  <p className={`${sectionLabel} px-3 pb-1 pt-1`}>Categories</p>
                  <ul>
                    {categories.map((c) => (
                      <li key={`cat-${c.category}`}>
                        <Link href={c.href} role="option" className={linkCategory} onClick={handlePick}>
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {products.length > 0 && (
                <div>
                  <p className={`${sectionLabel} px-3 pb-1 pt-1`}>Products</p>
                  <ul>
                    {products.map((p) => (
                      <li key={`prod-${p.slug}`}>
                        <Link href={p.href} role="option" className={linkProduct} onClick={handlePick}>
                          <span className="line-clamp-2">{p.title}</span>
                          <span className={subMuted}>{p.categoryTitle}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
