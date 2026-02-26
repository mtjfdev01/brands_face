"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Math helpers ── */
function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp01(t); }
function sub(p: number, s: number, e: number) { return clamp01((p - s) / (e - s)); }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

/*
  This section provides the BACKGROUND, HEADING, and SIDE LABELS
  for the flower scroll area. The actual cards are rendered by
  <ScrollCards /> as a fixed overlay across the entire page.

  Scroll phases (within this section's 350vh):
    0.00 - 0.12  Heading fades in
    0.12 - 0.40  Heading holds
    0.40 - 0.60  Heading slides up & fades out
    0.60 - 1.00  Flower area (cards + logo driven by ScrollCards)
*/

export default function CardFlowerSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const rafRef = useRef(0);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setP(clamp01(-rect.top / scrollable));
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* Heading animation */
  const headingIn = easeOut(sub(p, 0.0, 0.12));
  const headingOut = easeOut(sub(p, 0.40, 0.60));
  const headingOpacity = headingIn * (1 - headingOut);
  const headingY = lerp(60, 0, headingIn) + lerp(0, -80, headingOut);

  const sideLabelsOpacity = headingIn * (1 - easeOut(sub(p, 0.45, 0.65)));
  // As flower exits, compress section height to avoid trailing blank space.
  const shrinkT = easeOut(sub(p, 0.82, 1.0));
  const sectionVh = lerp(220, 170, shrinkT);

  if (isMobile) {
    return <div id="card-flower-section" />;
  }

  return (
    <section
      ref={sectionRef}
      id="card-flower-section"
      className="relative bg-[#f5f0ea]"
      style={{ height: `${sectionVh}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ── Side labels ── */}
        <div
          className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 hidden md:block"
          style={{ opacity: sideLabelsOpacity }}
        >
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Indigo</p>
          <p className="text-sm font-semibold text-[#1a3a2a] mt-0.5">Social Strategy</p>
        </div>
        <div
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 text-right hidden md:block"
          style={{ opacity: sideLabelsOpacity }}
        >
          <p className="text-[10px] uppercase tracking-widest text-gray-400">We have</p>
          <p className="text-sm font-semibold text-[#1a3a2a] mt-0.5">Millions Impacted</p>
        </div>

        {/* ── Heading ── */}
        <div
          className="absolute inset-x-0 top-[8%] sm:top-[10%] text-center px-6 z-10 pointer-events-none"
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1a3a2a] leading-[1.05] tracking-tight uppercase">
            Packaging That
            <br />
            <span className="text-[var(--color-brand-accent,#c8102e)]">Makes Impact</span> Every
            <br />
            Time
          </h2>
        </div>

        {/* Ground shadow (fades as cards spread) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[40%] h-6 bg-black/[0.06] rounded-[50%] blur-xl pointer-events-none"
          style={{ opacity: lerp(0.5, 0, easeOut(sub(p, 0.55, 0.75))) }}
        />
      </div>
    </section>
  );
}
