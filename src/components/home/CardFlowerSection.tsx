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
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}
function sub(p: number, s: number, e: number) {
  return clamp01((p - s) / (e - s));
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/*
  Background, heading, and side labels for the flower scroll area.
  The flower cards and rotation speed UI live in <ScrollCards /> (HomeHero).
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
  const headingOut = easeOut(sub(p, 0.4, 0.6));
  const headingOpacity = headingIn * (1 - headingOut);
  const headingY = lerp(60, 0, headingIn) + lerp(0, -80, headingOut);

  const sideLabelsOpacity = headingIn * (1 - easeOut(sub(p, 0.45, 0.65)));
  const shrinkT = easeOut(sub(p, 0.82, 1.0));
  const sectionVh = lerp(165, 130, shrinkT);

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
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          className="absolute left-6 top-1/2 hidden -translate-y-1/2 sm:left-10 md:block"
          style={{ opacity: sideLabelsOpacity }}
        >
          <p className="text-[10px] uppercase tracking-widest text-gray-400">Indigo</p>
          <p className="mt-0.5 text-sm font-semibold text-[#1a3a2a]">Social Strategy</p>
        </div>
        <div
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-right sm:right-10 md:block"
          style={{ opacity: sideLabelsOpacity }}
        >
          <p className="text-[10px] uppercase tracking-widest text-gray-400">We have</p>
          <p className="mt-0.5 text-sm font-semibold text-[#1a3a2a] md:scroll-mt-28">Millions Impacted</p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-[8%] z-10 px-6 text-center sm:top-[10%] md:scroll-mt-28"
          style={{
            opacity: headingOpacity,
            transform: `translateY(${headingY}px)`,
          }}
        >
          <h2 className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-[#1a3a2a] sm:text-5xl md:text-6xl lg:text-7xl">
            Packaging That
            <br />
            <span className="text-[var(--color-brand-accent,#c8102e)]">Makes Impact</span> Every
            <br />
            Time
          </h2>
        </div>

        <div
          className="pointer-events-none absolute bottom-[12%] left-1/2 h-7 w-[44%] -translate-x-1/2 rounded-[50%] bg-black/[0.06] blur-xl"
          style={{ opacity: lerp(0.5, 0, easeOut(sub(p, 0.55, 0.75))) }}
        />
      </div>
    </section>
  );
}
