"use client";

import { useEffect, useRef, useState, useCallback, useMemo, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbCarFan } from "react-icons/tb";
import { HOME_CARDS } from "@/data/homeCards";
import { categoryHubPath } from "@/lib/routes";

const CARDS = HOME_CARDS;

/* ── Math ── */
function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t);
}
function sub(p: number, start: number, end: number) {
  return clamp((p - start) / (end - start));
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
/* Responsive config — flower radius + card sizes per breakpoint */
function getResponsiveConfig(width: number) {
  const w = width;

  if (w < 640)
    return { rx: 50, ry: 52, heroW: 200, heroH: 310, dragW: 92, dragH: 138, flowerW: 108, flowerH: 160 };
  if (w < 1024)
    return { rx: 74, ry: 57, heroW: 180, heroH: 280, dragW: 145, dragH: 220, flowerW: 204, flowerH: 298 };

  /* lg+: flower in HomeHero’s left column */
  return { rx: 76, ry: 46, heroW: 200, heroH: 320, dragW: 150, dragH: 225, flowerW: 214, flowerH: 322 };
}



/* ──────────────────────────────────────────────────
   Desktop: full flower + center logo from first paint after entry (no hero
   fan, drag, or bloom). Scroll progress only drives exit at end of journey.
   ────────────────────────────────────────────────── */

const ENTRY_DELAY = 1500; // matches curtain

/** Visual scale for each orbit slot (exactly +3.5% vs 0.72). */
const FLOWER_SLOT_SCALE = 0.72 * 1.035;

/** Orbit animation: 1× = 60s per turn; `--home-flower-orbit-duration` is read in globals.css. */
const ORBIT_BASE_DURATION_SEC = 60;
const ORBIT_SPEED_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20] as const;

function orbitSpeedLabel(m: number) {
  return `${m}x`;
}

/* ── Mobile card slider ── */
function MobileCardSlider({ show }: { show: boolean }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((i: number) => {
    setCurrent((i + CARDS.length) % CARDS.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 3500);
    return () => clearInterval(timerRef.current);
  }, [current, goTo]);

  return (
    <section
      className="bg-[#f5f0ea] py-14 px-4"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <h2 className="text-3xl sm:text-4xl font-black text-[#1a3a2a] text-center leading-tight uppercase mb-8">
        Packaging That
        <br />
        <span className="text-[var(--color-brand-accent,#c8102e)]">Makes Impact</span>
      </h2>

      <div className="relative max-w-[300px] mx-auto">
        {/* Track */}
        <div
          className="overflow-hidden rounded-2xl"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {CARDS.map((card) => (
              <div key={card.title} className="w-full flex-shrink-0">
                <Link
                  href={categoryHubPath(card.category)}
                  className="relative block w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#1a3a2a] touch-manipulation"
                  aria-label={`${card.title} — view category`}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: card.color }} />
                  <Image src={card.image} alt="" fill className="object-cover" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-semibold drop-shadow-lg">{card.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{card.category}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[120%] w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#1a3a2a] active:scale-90 transition-transform"
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[120%] w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#1a3a2a] active:scale-90 transition-transform"
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {CARDS.map((c, i) => (
          <button
            key={c.title}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#1a3a2a] w-5" : "bg-[#1a3a2a]/25"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function ScrollCards() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [sliderRevealed, setSliderRevealed] = useState(false);
  const [mobileSeenSlider, setMobileSeenSlider] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [orbitSpeedIdx, setOrbitSpeedIdx] = useState(2); // 1×

  useEffect(() => {
    const mult = ORBIT_SPEED_LEVELS[orbitSpeedIdx];
    const seconds = ORBIT_BASE_DURATION_SEC / mult;
    document.documentElement.style.setProperty("--home-flower-orbit-duration", `${seconds}s`);
    return () => {
      document.documentElement.style.removeProperty("--home-flower-orbit-duration");
    };
  }, [orbitSpeedIdx]);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setViewportWidth(w);
      setIsMobile(w < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Entry animation timer */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), ENTRY_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Scroll functionality disabled: keep progress fixed.
    setProgress(0);
  }, [isMobile]);

  const p = progress;

/* ✅ Responsive config (must be BEFORE return) */
const cfg = useMemo(
  // Keep SSR + first client render aligned to avoid hydration style mismatch.
  () => getResponsiveConfig(viewportWidth ?? 1280),
  [viewportWidth],
);
const { rx: FLOWER_RX, ry: FLOWER_RY } = cfg;

const FLOWER = useMemo(() => {
  const count = CARDS.length;
  const step = 360 / count;
  return Array.from({ length: count }, (_, i) => {
    const angleDeg = i * step - 90;
    const angle = (angleDeg * Math.PI) / 180;

    return {
      rotate: angleDeg - 90,
      x: Math.cos(angle) * FLOWER_RX,
      y: Math.sin(angle) * FLOWER_RY,
      scale: FLOWER_SLOT_SCALE,
    };
  });
}, [FLOWER_RX, FLOWER_RY]);

  const flowerCompleteBoost = isMobile ? 1 : lerp(1, 1.06, easeOut(sub(p, 0.88, 1.0)));
  const cardW = cfg.flowerW * flowerCompleteBoost;
  const cardH = cfg.flowerH * flowerCompleteBoost;

  /* ── Mobile handoff with hysteresis: reveal slider down, restore cards up ── */
  useEffect(() => {
    if (!isMobile) return;
    if (p >= 0.34 && !sliderRevealed) setSliderRevealed(true);
    if (p <= 0.26 && sliderRevealed) setSliderRevealed(false);
  }, [isMobile, p, sliderRevealed]);
  useEffect(() => {
    if (isMobile && sliderRevealed && !mobileSeenSlider) setMobileSeenSlider(true);
  }, [isMobile, sliderRevealed, mobileSeenSlider]);

  /* ── Exit animation: slower, stretched to section end ── */
  const exitT = easeOut(sub(p, 0.78, 1.0));
  // Slow down fade progression so cards stay visible longer.
  const exitOpacity = lerp(1, 0, Math.pow(exitT, 2));

  /* ── Should cards be visible? ── */
  const beyondFlower = isMobile ? sliderRevealed : p >= 1;
  const visible = entered && !beyondFlower;
  const inCircleLinkPhase = visible && !isMobile;
  const flowerOpened = inCircleLinkPhase;

  // Mobile: category carousel lives after HomeHero in page.tsx; scroll-driven cards are desktop-only.
  if (isMobile) {
    return null;
  }

  return (
    <div
      className="relative z-10 w-full max-w-[min(100%,560px)] shrink-0 overflow-visible pointer-events-none"
      style={{
        opacity: visible ? exitOpacity : 0,
        transform: "none",
        transition: visible ? "none" : "opacity 0.3s ease",
      }}
    >
      <div className="relative mx-auto aspect-[560/430] w-full overflow-visible">
        {/* Top-right of flower frame only (not viewport / HomeHero chrome) */}
        <div
          className="pointer-events-auto absolute right-0 -top-20 z-[100] flex items-center gap-0.5 rounded-full border border-[#1a3a2a]/18 bg-white/95 px-1.5 py-1 shadow-md backdrop-blur-sm"
          role="group"
          aria-label="Flower rotation speed"
        >
          <div className="flex flex-col items-center justify-center gap-0 pr-0.5 leading-none">
            <TbCarFan className="h-4 w-4 shrink-0 text-[#1a3a2a]" aria-hidden />
            <span className="text-center text-[10px] font-bold tabular-nums leading-none text-[#1a3a2a]">
              {orbitSpeedLabel(ORBIT_SPEED_LEVELS[orbitSpeedIdx])}
            </span>
          </div>
          <div className="flex flex-col border-l border-[#1a3a2a]/15 pl-0.5">
            <button
              type="button"
              className="rounded p-0.5 text-[#1a3a2a] transition hover:bg-[#1a3a2a]/10 disabled:pointer-events-none disabled:opacity-35"
              aria-label="Faster rotation"
              disabled={orbitSpeedIdx >= ORBIT_SPEED_LEVELS.length - 1}
              onClick={() => setOrbitSpeedIdx((i) => Math.min(i + 1, ORBIT_SPEED_LEVELS.length - 1))}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="rounded p-0.5 text-[#1a3a2a] transition hover:bg-[#1a3a2a]/10 disabled:pointer-events-none disabled:opacity-35"
              aria-label="Slower rotation"
              disabled={orbitSpeedIdx <= 0}
              onClick={() => setOrbitSpeedIdx((i) => Math.max(i - 1, 0))}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ring rotates continuously; duration from --home-flower-orbit-duration */}
        <div
          className="home-flower-orbit relative h-full w-full select-none"
          style={{
            animationPlayState: entered && visible ? "running" : "paused",
          }}
        >

{CARDS.map((card, idx) => {
  const sourceCard = card;
  const flowerSlot = FLOWER[idx];
  const rotate = flowerSlot.rotate;
  const x = flowerSlot.x;
  const y = flowerSlot.y;
  const scale = flowerSlot.scale;
  const opacity = entered ? 1 : 0;

  const cardIsInteractive = inCircleLinkPhase;
  const isHoveredInFlower = flowerOpened && hoveredCardIndex === idx;
  const renderScale = isHoveredInFlower ? scale * 1.28 : scale;

  const depthByY = Math.round((y + 100) * 2);
  const zIndex = isHoveredInFlower ? 999 : 300 + depthByY + idx;

  return (
    <div
      key={`${sourceCard.title}-${idx}`}
      draggable={false}
      // onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        // Prevent browser "drag image" / selection drag on desktop.
        e.preventDefault();
      }}
      className={`absolute left-1/2 top-1/2 origin-center select-none ${
        cardIsInteractive ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
      }`}
      onClick={() => {
        if (inCircleLinkPhase) {
          router.push(categoryHubPath(sourceCard.category));
        }
      }}
      {...(inCircleLinkPhase
        ? {
            role: "link" as const,
            tabIndex: 0,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(categoryHubPath(sourceCard.category));
              }
            },
            "aria-label": `Open ${sourceCard.title} — category page`,
          }
        : {})}
      onMouseEnter={() => {
        if (flowerOpened) setHoveredCardIndex(idx);
      }}
      onMouseLeave={() => {
        if (flowerOpened) setHoveredCardIndex(null);
      }}
      style={{
        width: cardW,
        height: cardH,
        opacity,
        zIndex,
        transform: `translate(-50%, -50%) translate(${x}%, ${y}%) rotate(${rotate}deg) scale(${renderScale})`,
        willChange: "transform, opacity",
        transition: flowerOpened
          ? "transform 220ms ease, opacity 0.55s ease"
          : "opacity 0.55s ease",
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-[3px] border-white">
        <div className="absolute inset-0" style={{ backgroundColor: sourceCard.color }} />
        <Image
          src={sourceCard.image}
          alt={sourceCard.title}
          fill
          draggable={false}
          className="pointer-events-none object-cover"
          sizes="(min-width: 1024px) 240px, 200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-xs font-semibold drop-shadow-lg leading-tight">
            {sourceCard.title}
          </p>
          <p className="text-white/50 text-[10px] mt-0.5">{sourceCard.category}</p>
        </div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/15 pointer-events-none" />
      </div>
    </div>
  );
})}

        </div>

        {/* ── Center hub (outside rotating ring so label stays upright) ── */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 max-w-[10rem] text-center sm:max-w-[11rem]"
          style={{
            opacity: entered ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${entered ? 1 : 0.92})`,
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          <div className="relative mx-auto mb-2 h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-2xl sm:h-14 sm:w-14">
            <Image
              src="/assets/images/logos/logo_x.png"
              alt=""
              fill
              className="object-contain p-1.5 sm:p-2"
              sizes="56px"
            />
          </div>
          {/* <h3 className="text-lg font-black uppercase leading-tight tracking-tight text-[#1a3a2a] sm:text-xl md:text-2xl">
            Endless
            <br />
            Possibilities
          </h3> */}
        </div>
      </div>
    </div>
  );
}
