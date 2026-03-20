"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import Image from "next/image";

/* ── Each benefit has its own slide image + comparison data ── */
interface Benefit {
  label: string;
  us: boolean;
  them: boolean;
  bg: string;
  product: string;
}
type Phase = "before" | "in" | "after";

const BENEFITS: Benefit[] = [
  { label: "Strategy before execution", us: true, them: false, bg: "/assets/images/compare.png", product: "/assets/images/4.png" },
  { label: "Conversion-focused content", us: true, them: false, bg: "/assets/images/compare_2.png", product: "/assets/images/compare_2.png" },
  { label: "Clear ROI tracking & reporting", us: true, them: true, bg: "/assets/images/16.png", product: "/assets/images/13.png" },
  { label: "Real testing & optimization", us: true, them: false, bg: "/assets/images/17.jpg", product: "/assets/images/8.png" },
  { label: "Transparent reporting", us: true, them: false, bg: "/assets/images/12.png", product: "/assets/images/5.png" },
];

function getPieceAnimationStyle(phase: Phase, direction: "up" | "down"): CSSProperties {
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return {
      opacity: 1,
      transform: "none",
      transition: "none",
    };
  }

  // "up" maps to the left panel, "down" maps to the right panel.
  // Keep naming stable while switching to horizontal entrance animation.
  if (direction === "up") {
    return {
      opacity: phase === "in" ? 1 : 0,
      transform:
        phase === "in"
          ? "translateX(0px)"
          : phase === "before"
            ? "translateX(-150px)"
            : "translateX(-90px)",
      transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.75s ease",
    };
  }

  return {
    opacity: phase === "in" ? 1 : 0,
    transform:
      phase === "in"
        ? "translateX(0px)"
        : phase === "before"
          ? "translateX(150px)"
          : "translateX(90px)",
    transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.75s ease",
  };
}

function ComparisonMediaPanel({
  phase,
  current,
  goTo,
}: {
  phase: Phase;
  current: number;
  goTo: (i: number) => void;
}) {
  return (
    <div
      className="relative w-full lg:w-[42%] min-h-[340px] sm:min-h-[400px] lg:min-h-[480px] rounded-[24px] lg:rounded-r-none overflow-hidden border border-white/10 bg-[#143425] shadow-[0_18px_50px_rgba(9,22,16,0.45)]"
      style={getPieceAnimationStyle(phase, "up")}
    >
      {BENEFITS.map((b, idx) => (
        <div
          key={b.label}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          {/* Background image (temporarily disabled) */}
          {/* 
          <Image
            src={b.bg}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 500px"
            priority={idx === 0}
          />
          */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-emerald-950/60" />

          <div className="absolute inset-0">
            <div className="relative w-full h-full drop-shadow-2xl">
              <Image
                src={b.product}
                alt={b.label}
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 42vw"
                quality={95}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {BENEFITS.map((b, i) => (
          <button
            key={b.label}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ComparisonTablePanel({
  phase,
  current,
  goTo,
}: {
  phase: Phase;
  current: number;
  goTo: (i: number) => void;
}) {
  return (
    <div
      className="w-full lg:w-[58%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-14 rounded-[24px] lg:rounded-l-none border border-white/10 bg-[#1a3a2a] shadow-[0_18px_50px_rgba(9,22,16,0.45)]"
      style={getPieceAnimationStyle(phase, "down")}
    >
      <p className="text-emerald-400 text-sm sm:text-base font-medium tracking-wide uppercase">
        More than ordinary.
      </p>
      <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase">
        See the difference.
      </h2>

      <div className="mt-8 sm:mt-10">
        <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] items-center pb-3 border-b border-white/10">
          <span className="text-white/50 text-xs sm:text-sm font-medium">Benefits</span>
          <span className="text-center">
            <span className="inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-bold">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Brands Face
            </span>
          </span>
          <span className="text-white/40 text-xs sm:text-sm font-medium text-center">Other Options</span>
        </div>

        {BENEFITS.map((f, i) => {
          const isActive = i === current;
          return (
            <div
              key={f.label}
              onClick={() => goTo(i)}
              className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] items-center py-3.5 border-b border-white/[0.06] cursor-pointer transition-all duration-400 ${
                isActive ? "bg-white/[0.07] -mx-3 px-3 rounded-lg" : ""
              }`}
            >
              <span className={`text-xs sm:text-sm transition-colors duration-400 ${isActive ? "text-white font-medium" : "text-white/60"}`}>
                {f.label}
              </span>
              <span className="flex justify-center">
                {f.us ? (
                  <span className={`flex items-center justify-center rounded-full transition-all duration-400 ${isActive ? "w-7 h-7 bg-emerald-400/20" : ""}`}>
                    <svg className={`transition-all duration-400 ${isActive ? "w-5 h-5 text-emerald-300" : "w-4 h-4 text-emerald-400/60"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                ) : (
                  <svg className="w-4 h-4 text-red-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                )}
              </span>
              <span className="flex justify-center">
                {f.them ? (
                  <svg className="w-4 h-4 text-emerald-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                ) : (
                  <svg className="w-4 h-4 text-red-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("before");
  const [isMobile, setIsMobile] = useState(false);

  const goTo = useCallback(
    (i: number) => setCurrent((i + BENEFITS.length) % BENEFITS.length),
    [],
  );

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(timerRef.current);
  }, [current, goTo]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top > vh * 0.88) {
        setPhase("before");
      } else if (rect.bottom < vh * 0.12) {
        setPhase("after");
      } else {
        setPhase("in");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hidden lg:block w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28"
    >
      <div
        className="relative max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-0"
        style={
          isMobile
            ? { opacity: 1, transform: "none", transition: "none" }
            : {
                opacity: phase === "in" ? 1 : 0,
                transform:
                  phase === "in"
                    ? "translateY(0px) scale(1)"
                    : phase === "before"
                      ? "translateY(40px) scale(0.96)"
                      : "translateY(-20px) scale(0.97)",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
              }
        }
      >
        {/* Visual bridge so separate cards feel connected */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center lg:flex">
          <span className="h-[2px] w-12 bg-white/35" />
          <span className="mx-2 h-3 w-3 rounded-full border border-white/60 bg-emerald-300/70 shadow-[0_0_18px_rgba(74,222,128,0.7)]" />
          <span className="h-[2px] w-12 bg-white/35" />
        </div>

        <ComparisonMediaPanel phase={phase} current={current} goTo={goTo} />
        <ComparisonTablePanel phase={phase} current={current} goTo={goTo} />
      </div>
    </section>
  );
}
