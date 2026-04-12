"use client";

import { useEffect, useRef, useState } from "react";
import { defaultCategoryHubPath } from "@/lib/routes";

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Services", href: defaultCategoryHubPath() },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact us", href: "/quote" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/brands.face?igsh=OWRuZnpxdmt0YmJn" },
  { label: "TikTok", href: "https://www.tiktok.com/@brandsface?_r=1&_t=ZS-94Z4BX3eAku" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/brands-face/" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="relative w-full bg-[#f0ebe3] overflow-hidden">
      {/* ── Top: links ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left — tagline */}
          <div>
            <h3 className="text-[#1a1a1a] text-lg sm:text-xl font-semibold leading-snug mb-6">
            Built for Brands.<br />Engineered for Growth.
                        </h3>
          </div>

          {/* Center — Company */}
          <div className="md:pl-12">
            <p className="text-[#1a1a1a]/50 text-xs mb-4">Company</p>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#1a1a1a] text-sm hover:text-[#1a1a1a]/70 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Social */}
          <div className="md:pl-6">
            <p className="text-[#1a1a1a]/50 text-xs mb-4">Social</p>
            <ul className="space-y-2.5">
              {SOCIAL.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#1a1a1a] text-sm hover:text-[#1a1a1a]/70 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        {/* <p className="mt-10 text-[10px] text-[#1a1a1a]/40">
          &copy; Brands Face, all rights reserved, {new Date().getFullYear()}
        </p> */}
      </div>

      {/* ── Bottom: BRANDS / FACE + logo ── */}
      <div ref={ref} className="relative z-0 w-full overflow-hidden bg-[#f0ebe3] pb-4 sm:pb-6">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/assets/images/logos/logo_ultra_hd.png')] bg-contain bg-center bg-no-repeat opacity-[0.42]"
          aria-hidden
        />
        {/* BRANDS — slides from left */}
        <div
          className="relative z-[1] transition-all duration-[1200ms] ease-out"
          style={{
            transform: visible ? "translateX(0)" : "translateX(-100%)",
            opacity: visible ? 1 : 0,
          }}
        >
          <p className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black leading-[0.85] tracking-tighter text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] pl-2 sm:pl-4 select-none">
            BRANDS
          </p>
        </div>

        {/* FACE — slides from right */}
        <div
          className="relative z-[1] transition-all duration-[1200ms] ease-out delay-150"
          style={{
            transform: visible ? "translateX(0)" : "translateX(100%)",
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="flex justify-end pr-2 sm:pr-4">
            <p className="inline-flex items-start justify-end gap-[0.12em] text-right text-[18vw] sm:text-[16vw] md:text-[14vw] font-black leading-[0.85] tracking-tighter text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] select-none">
              <span>FACE</span>
              <span
                className="shrink-0 font-bold leading-none text-[4vw] text-[#1a3c28] [text-shadow:0_1px_0_rgba(240,235,227,0.9)] sm:text-[3.5vw] md:text-[3vw] motion-reduce:transform-none translate-y-[-0.42em]"
                aria-hidden
              >
                &reg;
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
