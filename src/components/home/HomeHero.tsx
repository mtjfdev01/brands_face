"use client";

import { useEffect, useState } from "react";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";

const ANIMATION_DELAY = 1500;

export default function HomeHero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), ANIMATION_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-[112svh] md:h-screen overflow-hidden bg-[#1a3a2a]">
      <HomeHeroNavbar />
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-800/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative flex flex-col lg:flex-row w-full h-full items-center">
        {/* ── Left: empty space where ScrollCards renders the fixed cards ── */}
        <div className="relative w-full lg:w-[45%] h-[48%] sm:h-[55%] lg:h-full" />

        {/* ── Right: text content (55%) ── */}
        <div className="w-full lg:w-[55%] h-[52%] sm:h-[45%] lg:h-full flex items-center px-6 sm:px-8 lg:px-16 pb-8 sm:pb-0">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${ANIMATION_DELAY + 200}ms`,
              }}
            >
              <span className="inline-flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                <span className="w-8 h-px bg-emerald-400" />
                Premium Packaging
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08]"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(30px)",
                transition: `all 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${ANIMATION_DELAY + 350}ms`,
              }}
            >
              Brands Face
            </h1>

            {/* Description */}
            <p
              className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(25px)",
                transition: `all 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${ANIMATION_DELAY + 500}ms`,
              }}
            >
              Premium custom packaging solutions designed to elevate your brand.
              From concept to doorstep.
            </p>

            {/* CTA buttons */}
            <div
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: `all 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${ANIMATION_DELAY + 650}ms`,
              }}
            >
              <button className="inline-flex items-center gap-2 bg-white text-[#1a3a2a] font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-black/20">
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all">
                View Catalog
              </button>
            </div>

            {/* Stats row */}
            <div
              className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-10"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(15px)",
                transition: `all 1000ms cubic-bezier(0.16, 1, 0.3, 1) ${ANIMATION_DELAY + 800}ms`,
              }}
            >
              {[
                { value: "12+", label: "Box Types" },
                { value: "4", label: "Finishes" },
                { value: "3D", label: "Live Preview" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
