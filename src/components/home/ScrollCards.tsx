"use client";

import { useEffect, useRef, useState, useCallback, useMemo, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HOME_CARDS } from "@/data/homeCards";
import { categoryHubPath } from "@/lib/routes";
import CategoryFocusCarousel from "@/components/home/CategoryFocusCarousel";
import AllCategoriesOverlay from "@/components/home/AllCategoriesOverlay";

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
    return { rx: 48, ry: 50, heroW: 200, heroH: 310, dragW: 92, dragH: 138, flowerW: 100, flowerH: 149 };
  if (w < 1024)
    return { rx: 70, ry: 55, heroW: 180, heroH: 280, dragW: 145, dragH: 220, flowerW: 188, flowerH: 276 };

  return { rx: 85 * 1.2, ry: 60 * 1.08, heroW: 220, heroH: 351, dragW: 174, dragH: 261, flowerW: 264, flowerH: 378 };
}



/* ──────────────────────────────────────────────────
   HERO-PHASE card positions
   Cards sit in the LEFT-CENTER of the hero (45% width area)
   Positions as % offsets from that anchor point
   ────────────────────────────────────────────────── */
const HERO_FAN = [
  { rotate: -15, x: -30, y: -2, scale: 0.86, delay: 0 },
  { rotate: -7, x: -14, y: -1, scale: 0.92, delay: 100 },
  { rotate: 2, x: 2, y: 0, scale: 0.98, delay: 200 },
  { rotate: 10, x: 16, y: 2, scale: 1.04, delay: 300 },
];

/* ──────────────────────────────────────────────────
   SCROLL PHASES (normalized to total scroll journey):

   HERO PHASE  (0.00 → 0.20)  Cards in hero left-center, fanned
   DRAG PHASE  (0.20 → 0.35)  Cards drag from hero-left → viewport-center, shrink
   HOLD PHASE  (0.35 → 0.50)  Heading visible, cards folded center
   SPREAD      (0.50 → 0.65)  Heading exits, more cards appear, fan widens
   BLOOM       (0.65 → 0.88)  All cards bloom to flower, logo appears
   HOLD FLOWER (0.88 → 1.00)  Hold final state
   ────────────────────────────────────────────────── */

const ENTRY_DELAY = 1500; // matches curtain
const CORE_CARDS_COUNT = 4;

/**
 * Manual vertical tweak for the fixed card stack (desktop scroll animation).
 * `anchorTop` is in % of viewport height from the top — increase to move the stack down, decrease to move up.
 */
const ANCHOR_TOP_DESKTOP_OFFSET_PCT = 5;

/** Same idea when mobile uses the scroll-driven card path (if enabled). */
const ANCHOR_TOP_MOBILE_OFFSET_PCT = 0;

/** Extra distance below the card stack for "See all Product Categories" (px, positive = lower on screen). */
const CATEGORIES_BUTTON_TOP_OFFSET_PX = 28;

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
  const [showAllCategories, setShowAllCategories] = useState(false);
  const rafRef = useRef(0);

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

  /* Scroll tracking */
  const onScroll = useCallback(() => {
    if (isMobile) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const heroFraction = clamp(scrollY / vh); // 0→1 as hero scrolls away

      const flowerEl = document.getElementById("card-flower-section");
      if (!flowerEl) {
        /* Only hero on screen — use hero progress */
        setProgress(clamp(scrollY / vh, 0, 0.2));
        return;
      }

      const flowerRect = flowerEl.getBoundingClientRect();
      const flowerScrollable = flowerEl.offsetHeight - vh;

      /* Hero takes ~0 to 0.35 of total progress */
      /* Flower takes ~0.35 to 1.0 of total progress */
      if (heroFraction < 1) {
        /* Still in hero area: map 0→1 scroll to 0→0.35 progress */
        setProgress(heroFraction * 0.35);
      } else {
        /* In flower section: map flower scroll to 0.35→1.0 */
        const fp = flowerScrollable > 0 ? clamp(-flowerRect.top / flowerScrollable) : 0;
        setProgress(0.35 + fp * 0.65);
      }
    });
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setProgress(0);
      return;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, onScroll]);

  /* ── Derived phase values ── */
  const p = progress;
  const dragT = easeOut(sub(p, 0.20, 0.35));   // hero → center
  const foldedT = sub(p, 0.35, 0.50);           // hold in center
  const circleT = easeOut(sub(p, 0.50, 0.88));  // clockwise circle completion
  const flowerT = easeOut(sub(p, 0.65, 0.88));  // center logo timing only
  const centerLogoT = easeOut(sub(p, 0.75, 0.92));

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
      scale: 0.68,
    };
  });
}, [FLOWER_RX, FLOWER_RY]);

const heroFan = useMemo(
  () =>
    isMobile
      ? HERO_FAN.map((h) => ({
          ...h,
          rotate: h.rotate * 0.8,
          x: h.x * 0.62,
          y: h.y * 0.7,
          scale: h.scale * 0.78,
        }))
      : HERO_FAN,
  [isMobile],
);

  /* ── Anchor: cards drag diagonally — down AND rightward ── */
  const mobileHeroRestore = isMobile && mobileSeenSlider && !sliderRevealed && p <= 0.30;
  const dragProgress = mobileHeroRestore ? 0 : dragT;
  const phaseHeroFan = mobileHeroRestore ? heroFan : heroFan;
  const anchorLeft = isMobile ? 50 : lerp(22.5, 50, dragProgress);
  const flowerLiftT = easeOut(sub(p, 0.50, 0.88)); // heading out -> flower open
  const anchorTop =
    (isMobile ? lerp(36, 52, dragProgress) : lerp(45, 65, dragProgress)) -
    lerp(0, 14, flowerLiftT) +
    (isMobile ? ANCHOR_TOP_MOBILE_OFFSET_PCT : ANCHOR_TOP_DESKTOP_OFFSET_PCT);

  /* Card size: responsive per breakpoint */
  const heroWForPhase = mobileHeroRestore ? cfg.heroW : cfg.heroW;
  const heroHForPhase = mobileHeroRestore ? cfg.heroH : cfg.heroH;
  // Mobile only: keep hero size for first 10% of hero scroll, then downsize.
  const mobileHeroProgress = clamp(p / 0.35);
  const sizeDragT = isMobile ? sub(mobileHeroProgress, 0.10, 1.0) : dragProgress;
  const flowerCompleteBoost = isMobile ? 1 : lerp(1, 1.14, easeOut(sub(p, 0.88, 1.0)));
  const cardW = lerp(lerp(heroWForPhase, cfg.dragW, sizeDragT), cfg.flowerW, flowerT) * flowerCompleteBoost;
  const cardH = lerp(lerp(heroHForPhase, cfg.dragH, sizeDragT), cfg.flowerH, flowerT) * flowerCompleteBoost;

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
  const exitRotate = lerp(0, 24, exitT);
  const exitScale = lerp(1, 0.3, exitT);
  // Slow down fade progression so cards stay visible longer.
  const exitOpacity = lerp(1, 0, Math.pow(exitT, 2));
  const exitLift = lerp(0, -140, exitT);
  const desktopCategoriesBtnTop = `calc(${anchorTop}% + ${Math.round(cardH * 0.62) + CATEGORIES_BUTTON_TOP_OFFSET_PX}px)`;

  /* ── Should cards be visible? ── */
  const beyondFlower = isMobile ? sliderRevealed : p >= 1;
  const visible = entered && !beyondFlower;
  const inCircleLinkPhase = p >= 0.65 && visible;
  const flowerOpened = inCircleLinkPhase && !isMobile;
  const scrollToOpenedFlower = useCallback(() => {
    const flowerEl = document.getElementById("card-flower-section");
    if (!flowerEl) return;

    // Jump to the bloom part (not just section start) for both desktop and mobile.
    const flowerScrollable = Math.max(0, flowerEl.offsetHeight - window.innerHeight);
    const targetY = flowerEl.offsetTop + flowerScrollable * 0.55;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  // Mobile-only behavior: show category carousel in the same hero overlay area.
  if (isMobile) {
    return (
      <div
        className="absolute inset-x-0 top-0 h-screen z-20 pointer-events-none"
        style={{
          opacity: entered ? 1 : 0,
          transform: "none",
          transition: "none",
        }}
      >
        <div className="absolute left-1/2 top-[42%] max-[420px]:top-[44%] w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 px-3 pointer-events-auto">
          <CategoryFocusCarousel  />
        </div>
      </div>
    );
  }

  return (
    <>
    <button
      type="button"
      onClick={() => setShowAllCategories(true)}
      className="fixed z-40 inline-flex items-center gap-2 rounded-full border border-[#103a2a]/20 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#103a2a] backdrop-blur transition hover:border-[#103a2a]/45 hover:bg-white sm:text-sm"
      style={{
        opacity: visible && !isMobile ? 1 : 0,
        left: `${anchorLeft}%`,
        top: desktopCategoriesBtnTop,
        transform: visible && !isMobile ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
        pointerEvents: visible && !isMobile ? "auto" : "none",
      }}
    >
      See all Product Categories
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </button>

    <div
      className="fixed inset-0 z-20 pointer-events-none"
      style={{
        opacity: visible ? exitOpacity : 0,
        transform: `translateY(${exitLift}px) rotate(${exitRotate}deg) scale(${exitScale})`,
        transformOrigin: `${anchorLeft}% ${anchorTop}%`,
        transition: visible ? "none" : "opacity 0.3s ease",
      }}
    >
      {/* Card container anchored to moving center point */}
      <div
        className="absolute"
        style={{
          left: `${anchorLeft}%`,
          top: `${anchorTop}%`,
          transform: "translate(-50%, -50%)",
          width: "min(90vw, 700px)",
          height: "min(70vh, 500px)",
        }}
      >


{CARDS.map((card, idx) => {
  const isCoreCard = idx < CORE_CARDS_COUNT;
  // Use all unique cards in the flower (no repeated visuals).
  const sourceCard = card;

  let rotate = 0,
    x = 0,
    y = 0,
    scale = 0.85,
    opacity = 0;

  const flowerSlot = FLOWER[idx];

  if (circleT > 0) {
    // Clockwise completion: cards fill the circle sequentially by index.
    const base = isCoreCard ? phaseHeroFan[idx] : phaseHeroFan[idx % CORE_CARDS_COUNT];
    const start = isCoreCard
      ? { rotate: base.rotate, x: base.x, y: base.y, scale: base.scale }
      : {
          rotate: base.rotate * 0.9,
          x: base.x * 0.9,
          y: base.y * 0.9 + 2,
          scale: base.scale * 0.95,
        };
    // Simple follow sequence: front-most card moves first, others follow.
    const followOrder = [3, 0, 1, 2, ...Array.from({ length: Math.max(0, CARDS.length - CORE_CARDS_COUNT) }, (_, i) => i + CORE_CARDS_COUNT)];
    const seq = followOrder.indexOf(idx);
    const delay = seq * 0.07;
    const t = easeOut(clamp((circleT - delay) / (1 - delay)));
    rotate = lerp(start.rotate, flowerSlot.rotate, t);
    x = lerp(start.x, flowerSlot.x, t);
    y = lerp(start.y, flowerSlot.y, t);
    scale = lerp(start.scale, flowerSlot.scale, t);
    opacity = isCoreCard ? 1 : t;
  } else if (dragProgress > 0 || foldedT > 0) {
    /**
     * DRAG + HOLD (hero → folded center):
     * Keep your original behavior.
     */
    if (isCoreCard) {
      const hf = phaseHeroFan[idx];
      const ff = heroFan[idx];
      rotate = lerp(hf.rotate, ff.rotate, dragProgress);
      x = lerp(hf.x, ff.x, dragProgress);
      y = lerp(hf.y, ff.y, dragProgress);
      scale = lerp(hf.scale, ff.scale, dragProgress);
      opacity = 1;
    } else {
      opacity = 0;
    }
  } else {
    /**
     * HERO entry: keep original behavior.
     */
    if (isCoreCard) {
      const hf = phaseHeroFan[idx];
      const entryT = entered ? 1 : 0;
      // Start tightly packed, then spread to the current hero fan layout.
      rotate = lerp(hf.rotate * 0.25, hf.rotate, entryT);
      x = lerp(hf.x * 0.22, hf.x, entryT);
      y = lerp(hf.y * 0.35, hf.y, entryT);
      scale = lerp(hf.scale * 0.98, hf.scale, entryT);
      opacity = entryT;
    }
  }

  // Hero arrangement: explicit stack order to keep fan clean like reference.
  const heroZOrder = [10, 20, 30, 40]; // back -> front (idx 3 is front-most)
  const inHeroLikePhase = isCoreCard && p < 0.50;
  const cardIsInteractive = inHeroLikePhase || inCircleLinkPhase;
  const isHoveredInFlower = flowerOpened && hoveredCardIndex === idx;
  const renderScale = isHoveredInFlower ? scale * 1.3 : scale;

  // Other phases: depth by y for stable layering.
  const depthByY = Math.round((y + 100) * 2);
  const zIndex = isHoveredInFlower ? 999 : (inHeroLikePhase ? heroZOrder[idx] : 300 + depthByY + idx);

  return (
    <div
      key={`${sourceCard.title}-${idx}`}
      className={`absolute left-1/2 top-1/2 origin-center ${
        cardIsInteractive ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
      }`}
      onClick={() => {
        if (inCircleLinkPhase) {
          router.push(categoryHubPath(sourceCard.category));
          return;
        }

        if (inHeroLikePhase) {
          scrollToOpenedFlower();
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
        transition:
          flowerOpened
            ? "transform 220ms ease, opacity 220ms ease"
            : entered && p < 0.01 && isCoreCard
            ? `transform 1.8s cubic-bezier(0.16,1,0.3,1) ${phaseHeroFan[idx].delay}ms, opacity 0.9s ease ${phaseHeroFan[idx].delay}ms`
            : "none",
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-[5px] border-white">
        <div className="absolute inset-0" style={{ backgroundColor: sourceCard.color }} />
        <Image
          src={sourceCard.image}
          alt={sourceCard.title}
          fill
          className="object-cover"
          sizes="200px"
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

        {/* ── Center logo (flower phase) ── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center"
          style={{
            opacity: centerLogoT,
            transform: `translate(-50%, -50%) scale(${lerp(0.7, 1, centerLogoT)})`,
          }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#1a3a2a] flex items-center justify-center shadow-2xl mb-3">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1a3a2a] uppercase leading-none tracking-tight">
            Endless
            <br />
            Possibilities
          </h3>
        </div>
      </div>
    </div>

    <AllCategoriesOverlay open={showAllCategories} onClose={() => setShowAllCategories(false)} />
    </>
  );
}
