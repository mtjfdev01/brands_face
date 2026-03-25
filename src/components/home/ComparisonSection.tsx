"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Each benefit has its own slide image + comparison data ── */
interface Benefit {
  label: string;
  us: boolean;
  them: boolean;
  bg: string;
  product: string;
  caseStudyPath: string;
}
type Phase = "before" | "in" | "after";
type PanelDirection = "left" | "center" | "right";

const BENEFITS: Benefit[] = [
  { label: "Strategy before execution", us: true, them: false, bg: "/assets/images/comparison/limora_beofre.jpeg", product: "/assets/images/comparison/limora_beofre.jpeg", caseStudyPath: "/product-study_case/strategy-before-execution" },
  { label: "Real testing & optimization", us: true, them: false, bg: "/assets/images/17.jpg", product: "/assets/images/8.png", caseStudyPath: "/product-study_case/testing-optimization" },
  { label: "Conversion-focused content", us: true, them: false, bg: "/assets/images/compare_2.png", product: "/assets/images/compare_2.png", caseStudyPath: "/product-study_case/conversion-focused-content" },
  { label: "Clear ROI tracking & reporting", us: true, them: true, bg: "/assets/images/16.png", product: "/assets/images/13.png", caseStudyPath: "/product-study_case/roi-tracking-reporting" },
  { label: "Transparent reporting", us: true, them: false, bg: "/assets/images/12.png", product: "/assets/images/5.png", caseStudyPath: "/product-study_case/transparent-reporting" },
];

function getPieceAnimationStyle(phase: Phase, direction: PanelDirection): CSSProperties {
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return {
      opacity: 1,
      transform: "none",
      transition: "none",
    };
  }

  if (direction === "left") {
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

  if (direction === "center") {
    return {
      opacity: phase === "in" ? 1 : 0,
      transform:
        phase === "in"
          ? "translateY(0px)"
          : phase === "before"
            ? "translateY(32px)"
            : "translateY(-22px)",
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

function ComparisonImagePanel({
  phase,
  current,
  imageKey,
  label,
  direction,
  caption,
}: {
  phase: Phase;
  current: number;
  imageKey: "bg" | "product";
  label: string;
  direction: PanelDirection;
  caption: string;
}) {
  return (
    <div
      className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[520px] rounded-[24px] overflow-hidden border border-white/10 bg-[#143425] shadow-[0_18px_50px_rgba(9,22,16,0.45)]"
      style={getPieceAnimationStyle(phase, direction)}
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-emerald-950/60" />

          <div className="absolute inset-0">
            <div className="relative w-full h-full drop-shadow-2xl">
              <Image
                src={b[imageKey]}
                alt={`${label}: ${b.label}`}
                fill
                className="object-contain"
                sizes="(max-width: 1023px) 100vw, 33vw"
                quality={95}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-md border border-white/20 bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
        {label}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-4 pb-4 pt-10">
        <p className="text-xs sm:text-sm text-white/80">{caption}</p>
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
      className="w-full flex flex-col justify-center px-6 sm:px-10 lg:px-8 py-10 lg:py-12 rounded-[24px] border border-white/10 bg-[#1a3a2a] shadow-[0_18px_50px_rgba(9,22,16,0.45)]"
      style={getPieceAnimationStyle(phase, "left")}
    >
      <p className="text-emerald-400 text-sm sm:text-base font-medium tracking-wide uppercase">
        WHY TRANSFORMATION MATTERS
      </p>
      <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase">
        Same  Product Different Perceived Value
      </h2>

      <div className="mt-8 sm:mt-10">
        <div className="grid grid-cols-[1fr_88px] sm:grid-cols-[1fr_102px] items-center pb-3 border-b border-white/10">
          <span className="text-white/50 text-xs sm:text-sm font-medium">Brands</span>
          <span className="text-white/40 text-xs sm:text-sm font-medium text-center">Read more</span>
        </div>

        {BENEFITS.map((f, i) => {
          const isActive = i === current;
          return (
            <div
              key={f.label}
              onClick={() => goTo(i)}
              className={`grid grid-cols-[1fr_88px] sm:grid-cols-[1fr_102px] items-center py-3.5 border-b border-white/[0.06] cursor-pointer transition-all duration-300 ${
                isActive ? "bg-white/[0.07] -mx-3 px-3 rounded-lg" : ""
              }`}
            >
              <span className={`text-xs sm:text-sm transition-colors duration-300 ${isActive ? "text-white font-medium" : "text-white/60"}`}>
                {f.label}
              </span>
              <span className="flex justify-center">
                <Link
                  href={f.caseStudyPath}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  Read
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => goTo(current - 1)}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        <div className="flex items-center gap-1.5">
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

        <button
          onClick={() => goTo(current + 1)}
          className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all"
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
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
        className="relative max-w-[1400px] mx-auto rounded-[34px] border border-white/10 bg-gradient-to-br from-[#173626] via-[#132d20] to-[#0f2118] p-4 sm:p-5 lg:p-6 shadow-[0_26px_70px_rgba(5,14,10,0.55)]"
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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
          <div className="w-full lg:w-[38%]">
            <ComparisonTablePanel phase={phase} current={current} goTo={goTo} />
          </div>

          <div className="w-full lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3">
            <ComparisonImagePanel
              phase={phase}
              current={current}
              imageKey="bg"
              label="Before"
              direction="center"
              caption="Lower shelf impact and weaker visual authority."
            />
            <ComparisonImagePanel
              phase={phase}
              current={current}
              imageKey="product"
              label="After"
              direction="right"
              caption="Premium perception that supports stronger conversion."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
