"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_CARDS } from "@/data/homeCards";
import AllCategoriesOverlay from "@/components/home/AllCategoriesOverlay";

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

export default function CategoryFocusCarousel() {
  const [current, setCurrent] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev" | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const total = HOME_CARDS.length;
  const SLIDE_MS = 320;

  const prevIndex = useMemo(() => wrapIndex(current - 1, total), [current, total]);
  const nextIndex = useMemo(() => wrapIndex(current + 1, total), [current, total]);
  const prevPrevIndex = useMemo(() => wrapIndex(current - 2, total), [current, total]);
  const nextNextIndex = useMemo(() => wrapIndex(current + 2, total), [current, total]);

  const prevPrevCard = HOME_CARDS[prevPrevIndex];
  const prevCard = HOME_CARDS[prevIndex];
  const centerCard = HOME_CARDS[current];
  const nextCard = HOME_CARDS[nextIndex];
  const nextNextCard = HOME_CARDS[nextNextIndex];

  const centerTranslate = !isSliding ? "-33.3333%" : slideDir === "next" ? "-66.6667%" : "0%";

  const handleShift = useCallback((dir: "next" | "prev") => {
    if (isSliding) return;
    setSlideDir(dir);
    setIsSliding(true);
    setTimeout(() => {
      setCurrent((v) => wrapIndex(v + (dir === "next" ? 1 : -1), total));
      setIsSliding(false);
      setSlideDir(null);
    }, SLIDE_MS);
  }, [isSliding, total, SLIDE_MS]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      handleShift("next");
    }, 3800);
    return () => clearInterval(timer);
  }, [handleShift, total]);

  return (
    <div className="relative w-full">
      <div className="mx-auto w-full">
        <div className="relative h-[390px] sm:h-[360px] md:h-[420px]">
          {/* Left card */}
          <Link
            href={`/category/${prevCard.category}`}
            className="absolute left-[4%] top-[52%] z-10 block w-[37%] max-w-[210px] -translate-y-1/2 -rotate-[22deg] transition-transform duration-500 hover:scale-[1.03] sm:left-[6%] sm:top-1/2 sm:w-[33%] sm:max-w-[260px]"
          >
            <article className="relative aspect-[3/4.6] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[prevPrevCard, prevCard, centerCard].map((card, idx) => (
                  <div key={`${card.category}-${idx}`} className="relative block h-full w-1/3 shrink-0">
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 34vw, 320px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-bold text-white drop-shadow">{card.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Link>

          {/* Center card (zoomed) */}
          <div className="absolute left-1/2 top-[43%] z-20 block w-[57%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-[1.03] sm:top-[46%] sm:w-[45%] sm:max-w-[380px]">
            <article className="relative aspect-[3/4.6] overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[prevCard, centerCard, nextCard].map((card, idx) => (
                  <Link key={`${card.category}-${idx}`} href={`/category/${card.category}`} className="relative block h-full w-1/3 shrink-0">
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 40vw, 380px" priority={idx === 1} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-sm font-black text-white drop-shadow sm:text-base">{card.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          {/* Right card */}
          <Link
            href={`/category/${nextCard.category}`}
            className="absolute right-[4%] top-[52%] z-10 block w-[37%] max-w-[210px] -translate-y-1/2 rotate-[22deg] transition-transform duration-500 hover:scale-[1.03] sm:right-[6%] sm:top-1/2 sm:w-[33%] sm:max-w-[260px]"
          >
            <article className="relative aspect-[3/4.6] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[centerCard, nextCard, nextNextCard].map((card, idx) => (
                  <div key={`${card.category}-${idx}`} className="relative block h-full w-1/3 shrink-0">
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 34vw, 320px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-bold text-white drop-shadow">{card.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Link>
        </div>

        {/* Navigation */}
        <div className="-mt-16 sm:mt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => handleShift("prev")}
            disabled={isSliding}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 active:scale-95 ${
              isSliding && slideDir === "prev"
                ? "border-[#103a2a] bg-[#103a2a] text-white"
                : "border-[#103a2a]/20 bg-white text-[#103a2a] hover:bg-[#103a2a] hover:text-white"
            }`}
            aria-label="Previous category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => handleShift("next")}
            disabled={isSliding}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 active:scale-95 ${
              isSliding && slideDir === "next"
                ? "border-[#103a2a] bg-[#103a2a] text-white"
                : "border-[#103a2a]/20 bg-white text-[#103a2a] hover:bg-[#103a2a] hover:text-white"
            }`}
            aria-label="Next category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllCategories(true)}
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-[#103a2a] transition hover:text-[#0b5d44]"
          >
            <span className="relative">
              See all Product Categories
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-transform duration-300 group-hover:scale-x-110" />
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <AllCategoriesOverlay open={showAllCategories} onClose={() => setShowAllCategories(false)} />
    </div>
  );
}
