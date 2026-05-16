"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Image from "next/image";

/* ── Same brand assets as the desktop ComparisonSection ── */
interface Slide {
  label: string;
  before: string;
  after: string;
  uplift: string;
}

const SLIDES: Slide[] = [
  {
    label: "Sand + Fog",
    before: "/assets/images/comparison/sand+fog_before.jpeg",
    after: "/assets/images/comparison/sand+fog_after.jpeg",
    uplift: "+64%",
  },
  {
    label: "Limora",
    before: "/assets/images/comparison/limora_beofre.jpeg",
    after: "/assets/images/comparison/limora_after.jpeg",
    uplift: "+58%",
  },
  {
    label: "Clean Reserve",
    before: "/assets/images/comparison/clean_reserve_b.webp",
    after: "/assets/images/comparison/clean_reserve_a.jpeg",
    uplift: "+72%",
  },
  {
    label: "Neo Lunix",
    before: "/assets/images/comparison/neo_lunix_b.jpeg",
    after: "/assets/images/comparison/neo_lunix_a.jpeg",
    uplift: "+49%",
  },
  {
    label: "Soshe",
    before: "/assets/images/comparison/soshe_b.jpeg",
    after: "/assets/images/comparison/soshe_a.jpeg",
    uplift: "+61%",
  },
];

interface Feature {
  label: string;
  icon: ReactNode;
}

const FEATURES: Feature[] = [
  {
    label: "Builds Trust",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3 5 6v6c0 4.5 3.2 7.6 7 8.5 3.8-.9 7-4 7-8.5V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Improves Shelf Impact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 19h16" />
        <path d="M7 16v-4" />
        <path d="M12 16V8" />
        <path d="M17 16v-6" />
        <path d="m6 9 4-4 3 3 5-5" />
        <path d="M14 3h4v4" />
      </svg>
    ),
  },
  {
    label: "Enhances Unboxing Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 8 12 4l9 4-9 4-9-4Z" />
        <path d="M3 8v8l9 4 9-4V8" />
        <path d="M12 12v8" />
      </svg>
    ),
  },
  {
    label: "Drives Sales & Repeat Customers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12a9 9 0 0 1-15.5 6.3" />
        <path d="M3 12a9 9 0 0 1 15.5-6.3" />
        <path d="M21 4v5h-5" />
        <path d="M3 20v-5h5" />
      </svg>
    ),
  },
];

const AUTO_INTERVAL = 4500;

export default function MobileComparison() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (i: number) => setCurrent((i + SLIDES.length) % SLIDES.length),
    [],
  );

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAuto]);

  /* ── Swipe ── */
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) {
      goTo(current + (dx < 0 ? 1 : -1));
      startAuto();
    }
  };

  const slide = SLIDES[current];

  return (
    <section
      style={{ backgroundColor: "#fbf6ec" }}
      className="relative w-full overflow-hidden px-4 pb-8 pt-8 md:hidden"
      aria-label="Same product, different box, stronger value"
    >
      {/* Eyebrow */}
      <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0a8a59]">
        Smart Transformation Matters
      </p>

      {/* Heading */}
      <h2
        className="mt-3 text-center text-[34px] font-bold leading-[1.05] tracking-[-0.015em] text-[#13251e]"
        style={{ fontFamily: 'var(--font-playfair), Georgia, "Times New Roman", serif' }}
      >
        <span className="block">Same Product.</span>
        <span className="block">Different Box.</span>
        <span className="relative inline-block text-[#0a8a59]">
          Stronger Value.
          <svg
            className="pointer-events-none absolute -bottom-2 left-0 right-0 mx-auto h-2 w-[92%]"
            viewBox="0 0 220 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 8 Q 60 -1 110 6 T 217 5"
              stroke="#d7a05b"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h2>

      {/* Feature pills (2 x 2) */}
      <div className="mx-auto mt-7 grid max-w-[330px] grid-cols-2 gap-2.5">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-[0_4px_12px_rgba(13,40,28,0.06)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0d3a26] text-white">
              <span className="block h-3.5 w-3.5">{f.icon}</span>
            </span>
            <span className="text-[11px] font-bold leading-tight text-[#13251e]">
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* Comparison card */}
      <div
        className="relative mx-auto mt-6 max-w-[346px] overflow-hidden rounded-[24px] shadow-[0_14px_30px_rgba(9,22,16,0.18)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image area (split before / after) */}
        <div className="relative h-[300px] w-full">
          {SLIDES.map((s, idx) => (
            <div
              key={s.label}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: idx === current ? 1 : 0 }}
            >
              {/* Before half (dulled) */}
              <div className="absolute inset-y-0 left-0 right-1/2 overflow-hidden bg-[#ececec]">
                <Image
                  src={s.before}
                  alt={`${s.label} before`}
                  fill
                  className="object-cover"
                  sizes="173px"
                  quality={92}
                  style={{ filter: "saturate(0.35) brightness(0.92) contrast(0.95)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-white/15" />
              </div>
              {/* After half (clear / vibrant) */}
              <div className="absolute inset-y-0 left-1/2 right-0 overflow-hidden bg-[#0d3a26]">
                <Image
                  src={s.after}
                  alt={`${s.label} after`}
                  fill
                  className="object-cover"
                  sizes="173px"
                  quality={95}
                  style={{ filter: "saturate(1.1) contrast(1.05)" }}
                />
              </div>
            </div>
          ))}

          {/* BEFORE tag */}
          <div className="absolute left-3 top-3 z-10 rounded-md bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a7a7a]">
            Before
          </div>

          {/* AFTER tag */}
          <div className="absolute left-1/2 top-3 z-10 ml-2 rounded-md bg-[#0d3a26] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#3ee59a]">
            After
          </div>

          {/* Center divider with arrow */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 -translate-x-1/2">
            <div className="h-full w-px bg-white/85" />
            <button
              type="button"
              onClick={() => {
                goTo(current + 1);
                startAuto();
              }}
              className="pointer-events-auto absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0d3a26] shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
              aria-label="Next comparison"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* +xx% Perceived Value badge */}
          <div
            className="absolute bottom-1.5 right-1.5 z-10 rounded-lg px-2 py-1 text-center backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(13, 58, 38, 0.82)",
              border: "1px solid rgba(214, 232, 75, 0.85)",
              boxShadow: "0 0 8px rgba(214, 232, 75, 0.35), 0 3px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p className="text-[14px] font-black leading-none text-[#f5e85b]">
              {slide.uplift}
            </p>
            <p className="mt-0.5 text-[7px] font-bold leading-none text-white/90">
              Perceived Value
            </p>
          </div>
        </div>

      </div>

      {/* Dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              goTo(i);
              startAuto();
            }}
            aria-label={`Go to ${s.label}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-[#0d3a26]" : "w-1.5 bg-[#0d3a26]/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
