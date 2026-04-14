"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_CARDS } from "@/data/homeCards";
import AllCategoriesOverlay from "@/components/home/AllCategoriesOverlay";

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

/** Card frame ratio (width : height) — matches `aspect-[3/4.6]` */
const CARD_ASPECT = 4.6 / 3;

type CategoryCarouselLayout = {
  stageHeight: number;
  centerWidth: number;
  sideWidth: number;
  gap: number;
};

const DEFAULT_LAYOUT: CategoryCarouselLayout = {
  stageHeight: 360,
  centerWidth: 248,
  sideWidth: 158,
  gap: 10,
};

/**
 * Sizes the stage and cards from the real container width + viewport height
 * so short phones, notches, and landscape stay balanced.
 */
function computeCategoryCarouselLayout(containerWidth: number, viewportHeight: number): CategoryCarouselLayout {
  const w = Math.max(0, containerWidth);
  const vh = Math.max(320, viewportHeight);
  const isSm = w >= 640;
  const isMd = w >= 768;

  const maxCenterCap = isMd ? 380 : isSm ? 300 : 288;
  const minCenter = w < 320 ? 92 : w < 360 ? 108 : w < 400 ? 120 : 148;
  const SIDE_RATIO = 0.62;

  // Do not let the center card tower past ~38% of viewport height (keeps nav + “see all” breathing room).
  const maxCenterFromHeight = (vh * 0.38) / CARD_ASPECT;
  // Use most of the track width; inner wrapper already has px-3 on the page.
  const maxCenterFromWidth = w * 0.58;
  const gap = Math.round(Math.max(6, Math.min(14, w * 0.022)));
  // Both wings must fit: center/2 + gap + sideWidth ≤ w/2 − margin (symmetric layout from center).
  const maxCenterFromPack = Math.max(0, (w / 2 - 12 - gap) / (0.5 + SIDE_RATIO));
  let centerWidth = Math.min(maxCenterFromWidth, maxCenterFromHeight, maxCenterCap, maxCenterFromPack);
  centerWidth = Math.round(Math.max(minCenter, centerWidth));

  // Side stacks ~62% of center — close to old 37% / 57% visual ratio.
  let sideWidth = Math.round(Math.max(centerWidth * SIDE_RATIO, minCenter * SIDE_RATIO));
  const half = centerWidth / 2;
  if (half + gap + sideWidth > w / 2 - 4) {
    sideWidth = Math.max(80, Math.floor(w / 2 - 4 - gap - half));
  }

  const centerH = centerWidth * CARD_ASPECT;
  const sideH = sideWidth * CARD_ASPECT;
  const rot = (22 * Math.PI) / 180;
  // Conservative vertical envelope for rotated wing cards + center.
  const wingHalf =
    0.5 *
    (Math.abs(sideH * Math.cos(rot)) + Math.abs(sideWidth * Math.sin(rot)) + Math.abs(sideWidth * Math.cos(rot)) * 0.15);
  let stageHeight = Math.ceil(centerH * 0.5 + wingHalf + centerH * 0.5 + 36);
  stageHeight = Math.max(Math.round(centerH + 48), stageHeight);
  stageHeight = Math.min(Math.round(vh * 0.5), Math.max(280, stageHeight));

  return {
    stageHeight,
    centerWidth: Math.round(centerWidth),
    sideWidth,
    gap,
  };
}

export default function CategoryFocusCarousel() {
  const [current, setCurrent] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev" | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [layout, setLayout] = useState<CategoryCarouselLayout>(DEFAULT_LAYOUT);
  const trackRef = useRef<HTMLDivElement | null>(null);

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

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    const rectW = el?.getBoundingClientRect().width ?? 0;
    const cw = Math.max(rectW, vw * 0.88);
    setLayout(computeCategoryCarouselLayout(cw, vh));
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = trackRef.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => measure()) : null;
    if (el && ro) ro.observe(el);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [measure]);

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

  const { stageHeight, centerWidth, sideWidth, gap } = layout;
  const halfCenter = centerWidth / 2;
  const navPullUp = Math.round(Math.min(72, Math.max(36, stageHeight * 0.14)));

  const leftCardStyle = {
    left: `calc(50% - ${halfCenter + gap + sideWidth}px)`,
    top: "50%",
    width: sideWidth,
    transform: "translateY(-50%) rotate(-22deg)",
  } as const;

  const centerCardStyle = {
    left: "50%",
    top: "50%",
    width: centerWidth,
    transform: "translate(-50%, -50%)",
  } as const;

  const rightCardStyle = {
    left: `calc(50% + ${halfCenter + gap}px)`,
    top: "50%",
    width: sideWidth,
    transform: "translateY(-50%) rotate(22deg)",
  } as const;

  return (
    <div className="relative w-full">
      <div ref={trackRef} className="mx-auto w-full max-w-[min(100%,560px)] px-1 sm:px-2">
        <div className="relative z-0 isolate w-full overflow-visible" style={{ height: stageHeight }}>
          {/* Left card */}
          <Link
            href={`/category/${prevCard.category}`}
            className="absolute z-10 block origin-center transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={leftCardStyle}
          >
            <article className="relative w-full overflow-hidden rounded-2xl border-2 border-white shadow-2xl aspect-[3/4.6]">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[prevPrevCard, prevCard, centerCard].map((card, idx) => (
                  <div key={`${card.category}-${idx}`} className="relative block h-full w-1/3 shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes={`${Math.ceil(sideWidth)}px`}
                    />
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
          <div
            className="absolute z-20 block origin-center transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={centerCardStyle}
          >
            <article className="relative w-full overflow-hidden rounded-2xl border-2 border-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] aspect-[3/4.6]">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[prevCard, centerCard, nextCard].map((card, idx) => (
                  <Link key={`${card.category}-${idx}`} href={`/category/${card.category}`} className="relative block h-full w-1/3 shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes={`${Math.ceil(centerWidth)}px`}
                      priority={idx === 1}
                    />
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
            className="absolute z-10 block origin-center transition-transform duration-500 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={rightCardStyle}
          >
            <article className="relative w-full overflow-hidden rounded-2xl border-2 border-white shadow-2xl aspect-[3/4.6]">
              <div
                className="flex h-full w-[300%]"
                style={{
                  transform: `translateX(${centerTranslate})`,
                  transition: isSliding ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
                }}
              >
                {[centerCard, nextCard, nextNextCard].map((card, idx) => (
                  <div key={`${card.category}-${idx}`} className="relative block h-full w-1/3 shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes={`${Math.ceil(sideWidth)}px`}
                    />
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

        {/* Navigation — above card hit targets (center stack uses z-20) */}
        <div
          className="relative z-30 flex items-center justify-center gap-3 touch-manipulation sm:mt-1"
          style={{ marginTop: -navPullUp }}
        >
          <button
            type="button"
            onClick={() => handleShift("prev")}
            disabled={isSliding}
            className={`relative z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 active:scale-95 ${
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
            type="button"
            onClick={() => handleShift("next")}
            disabled={isSliding}
            className={`relative z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 active:scale-95 ${
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

        <div className="relative z-30 mt-5 flex justify-center touch-manipulation">
          <button
            type="button"
            onClick={() => setShowAllCategories(true)}
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white/95 transition hover:text-emerald-200"
          >
            <span className="relative">
              See all Product Categories
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-gradient-to-r from-emerald-300 to-cyan-300 transition-transform duration-300 group-hover:scale-x-110" />
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
