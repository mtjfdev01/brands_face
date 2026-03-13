"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_CARDS } from "@/data/homeCards";

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

export default function CategoryFocusCarousel() {
  const [current, setCurrent] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev" | null>(null);
  const total = HOME_CARDS.length;
  const SLIDE_MS = 320;

  const prevIndex = useMemo(() => wrapIndex(current - 1, total), [current, total]);
  const nextIndex = useMemo(() => wrapIndex(current + 1, total), [current, total]);

  const prevCard = HOME_CARDS[prevIndex];
  const centerCard = HOME_CARDS[current];
  const nextCard = HOME_CARDS[nextIndex];

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
    <div className="w-full">
      <div className="mx-auto w-full">
        <div className="relative h-[320px] sm:h-[360px] md:h-[420px]">
          {/* Left card */}
          <Link
            href={`/category/${prevCard.category}`}
            className="absolute left-[6%] top-1/2 z-10 block w-[28%] max-w-[260px] -translate-y-1/2 -rotate-[22deg] transition-transform duration-500 hover:scale-[1.03]"
          >
            <article className="relative aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <Image src={prevCard.image} alt={prevCard.title} fill className="object-cover" sizes="(max-width: 768px) 34vw, 320px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-bold text-white drop-shadow">{prevCard.title}</p>
              </div>
            </article>
          </Link>

          {/* Center card (zoomed) */}
          <div className="absolute left-1/2 top-[40%] sm:top-[46%] z-20 block w-[40%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-[1.03]">
            <article className="relative aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
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
            className="absolute right-[6%] top-1/2 z-10 block w-[28%] max-w-[260px] -translate-y-1/2 rotate-[22deg] transition-transform duration-500 hover:scale-[1.03]"
          >
            <article className="relative aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <Image src={nextCard.image} alt={nextCard.title} fill className="object-cover" sizes="(max-width: 768px) 34vw, 320px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-bold text-white drop-shadow">{nextCard.title}</p>
              </div>
            </article>
          </Link>
        </div>

        {/* Navigation */}
        <div className="-mt-16 sm:mt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => handleShift("prev")}
            disabled={isSliding}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#103a2a]/20 bg-white text-[#103a2a] transition hover:bg-[#103a2a] hover:text-white"
            aria-label="Previous category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => handleShift("next")}
            disabled={isSliding}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#103a2a]/20 bg-white text-[#103a2a] transition hover:bg-[#103a2a] hover:text-white"
            aria-label="Next category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
