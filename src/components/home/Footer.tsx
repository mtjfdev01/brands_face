"use client";

import { useEffect, useRef, useState } from "react";

const COMPANY = [
  { label: "Our expertise", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact us", href: "#" },
];

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
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
      {/* ── Top: links + newsletter ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-16 sm:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left — tagline + newsletter */}
          <div>
            <h3 className="text-[#1a1a1a] text-lg sm:text-xl font-semibold leading-snug mb-6">
              Made for Businessmen.<br />Built for Storytellers.
            </h3>
            <p className="text-[#1a1a1a]/50 text-xs mb-3">Newsletter</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="flex-1 h-10 px-4 rounded-full bg-white border border-[#1a1a1a]/10 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/35 outline-none focus:border-[#1a1a1a]/30 transition-colors"
              />
              <button className="h-10 px-5 rounded-full bg-[#f5c518] text-[#1a1a1a] text-sm font-semibold hover:bg-[#e6b800] active:scale-[0.97] transition-all">
                Subscribe
              </button>
            </div>
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
        <p className="mt-10 text-[10px] text-[#1a1a1a]/40">
          &copy; BrandsCafe, all rights reserved, {new Date().getFullYear()}
        </p>
      </div>

      {/* ── Bottom: giant animated text ── */}
      <div ref={ref} className="relative z-0 w-full overflow-hidden pb-4 sm:pb-6">
        {/* Decorative swirl */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
          <span className="text-[40vw] font-black text-[#1a1a1a] leading-none">&amp;</span>
        </div>

        {/* BRANDS — slides from left */}
        <div
          className="transition-all duration-[1200ms] ease-out"
          style={{
            transform: visible ? "translateX(0)" : "translateX(-100%)",
            opacity: visible ? 1 : 0,
          }}
        >
          <p className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black text-[#1a3c28] leading-[0.85] tracking-tighter pl-2 sm:pl-4 select-none">
            BRANDS
          </p>
        </div>

        {/* FACE — slides from right */}
        <div
          className="transition-all duration-[1200ms] ease-out delay-150"
          style={{
            transform: visible ? "translateX(0)" : "translateX(100%)",
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="flex items-end justify-end pr-2 sm:pr-4">
            <p className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black text-[#1a3c28] leading-[0.85] tracking-tighter select-none">
              CAFE
            </p>
            {/* Registered mark */}
            <span className="text-[4vw] sm:text-[3.5vw] md:text-[3vw] font-bold text-[#1a3c28] mb-[1vw] ml-1 select-none">&reg;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
