"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsStars } from "react-icons/bs";

import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";
import CardFlowerSection from "@/components/home/CardFlowerSection";
import ScrollCards from "@/components/home/ScrollCards";

const STAGGER_BASE_DELAY_MS = 0;

const HERO_MAIN = "/assets/images/hero_main.png";
const HERO_READY_MAX_MS = 8000;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function getHeroAssetUrls(): string[] {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
    return [HERO_MAIN];
  }
  return [];
}

type HomeHeroProps = {
  onReady?: () => void;
};

export default function HomeHero({ onReady }: HomeHeroProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // Start reveals as soon as the curtain overlay is gone.
    if (!root.dataset.curtainActive) {
      setAnimate(true);
      return;
    }

    const start = () => setAnimate(true);

    const mo = new MutationObserver(() => {
      if (!root.dataset.curtainActive) {
        mo.disconnect();
        start();
      }
    });

    mo.observe(root, { attributes: true, attributeFilter: ["data-curtain-active"] });

    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!onReady) return;

    let cancelled = false;
    let didNotify = false;
    const finish = () => {
      if (cancelled || didNotify) return;
      didNotify = true;
      onReady();
    };

    const maxTimer = window.setTimeout(finish, HERO_READY_MAX_MS);
    void Promise.all(getHeroAssetUrls().map(preloadImage)).then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, [onReady]);

  return (
    <>
    <section
      className="relative w-full overflow-hidden bg-[var(--dark-primary-green)] max-lg:min-h-0 lg:min-h-[100svh] lg:h-screen lg:overflow-visible"
    >
      <HomeHeroNavbar />

      {/* Mobile-only hero — w-full so children can align to viewport with w-[100dvw] */}
      <div className="relative w-full min-w-0 max-w-none lg:hidden">
        <div className="mx-auto max-w-xl px-6 pb-0 pt-28 sm:px-8 sm:pb-0 sm:pt-32">
          {/* Eyebrow pill */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#57d7aa]/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80 backdrop-blur">
              <span className="inline-flex h-5 w-5 items-center justify-center text-[#57d7aa]">
                <BsStars className="h-3.5 w-3.5" aria-hidden />
              </span>
              Packaging Intelligence &amp; Manufacturing
            </span>
          </div>

          {/* Headline */}
          <h4
            className="mt-6 text-[40px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl"
          >
            Re-Engineering{" "}
            <span className="text-[#57d7aa]">Brand Perception</span>
            <br />
            Through Packaging.
          </h4>

          {/* Subline */}
          <p
            className="mt-4 text-sm font-medium text-white/70"
          >
            We <span className="font-semibold text-white/90">Audit</span>. We{" "}
            <span className="font-semibold text-white/90">Design</span>. We{" "}
            <span className="font-semibold text-[#57d7aa]">Manufacture</span>.
          </p>

          {/* Description */}
          <p
            className="mt-3 max-w-[34rem] text-[13px] leading-relaxed text-white/55 sm:text-[14px]"
          >
            Uncover what&apos;s hurting your sales, then bring it to life with packaging that builds trust and drives growth.
          </p>

          {/* CTAs */}
          <div
            className="mt-6 grid grid-cols-1 gap-3"
          >
            <Link href="/audit" className="primary_btn w-full">
              Get Free Packaging Audit
              <span className="primary_btn__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                  <path
                    d="M7 17L17 7M10 7h7v7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="/catalog"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors active:scale-[0.99]"
            >
              See How We Work
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-7 grid grid-cols-3 gap-3"
          >
            {[
              { value: "250+", label: "Brands Audited", icon: "cube" as const },
              { value: "Own", label: "Manufacturing", icon: "factory" as const },
              { value: "37%", label: "Avg. Sales Uplift", icon: "chart" as const },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#57d7aa]">
                  {stat.icon === "cube" ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                      <path d="M12 2l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M3 7v10l9 5 9-5V7" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 12v10" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  ) : stat.icon === "factory" ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                      <path d="M3 21V10l6 3V10l6 3V10l6 3v8H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M7 21v-6h3v6" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                      <path d="M4 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M7 15l3-3 3 2 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold leading-none text-[#57d7aa]">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-medium leading-tight text-white/55">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Let the image define its own height instead of forcing a fixed frame. */}
        <div
          className="relative mt-8 w-full shadow-[0_30px_70px_-40px_rgba(87,215,170,0.55)]"
        >
          <div className="relative w-full">
            <img
              src={HERO_MAIN}
              alt=""
              draggable={false}
              className="block h-auto w-full select-none"
            />
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(87,215,170,0.18),transparent_62%)]" />
          </div>
        </div>

        <div className="mx-auto max-w-xl px-6 pb-12 pt-0 sm:px-8 sm:pb-14">
          <div
            className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] text-white/75 backdrop-blur"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#57d7aa]/15 text-[#57d7aa]">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
                <path d="M12 2l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 7v10l9 5 9-5V7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 12v10" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-white/90">In-House Manufacturing. Premium Execution.</p>
              <p className="mt-0.5 text-[11px] text-white/55">From concept to finished packaging.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop hero (existing layout) */}
      <div className="relative hidden w-full max-lg:min-h-0 flex-col items-start pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:flex-row lg:items-center lg:pt-24">
        {/* ── Left: category flower (ScrollCards) lives in normal flow inside the hero column ── */}
        <div className="relative z-10 hidden h-[42svh] max-[700px]:h-[46svh] sm:h-[48svh] w-full overflow-visible lg:flex lg:h-full lg:min-h-0 lg:w-[45%] lg:items-center lg:justify-center lg:px-2">
          <ScrollCards />
        </div>

        {/* ── Right: text content (55%) ── */}
        <div className="flex w-full items-center px-6 pb-10 sm:px-8 sm:pb-8 lg:h-full lg:w-[55%] lg:px-16 lg:pb-0">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div>
              <span className="inline-flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-medium tracking-wider uppercase lg:mt-3">
                <span className="w-8 h-px bg-emerald-400" />
                FREE PACKAGING AUDIT
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08]"
            >
              Brands Face
            </h1>

            <h2
              className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white tracking-wide text-white"
            >
              Re-Engineering Brand Perception Through Packaging
            </h2>

            {/* Description */}
            <p
              className="mt-4 sm:mt-6 text-base sm:text-lg text-white leading-relaxed max-w-xxl"
            >
              We conduct a comprehensive packaging audit to identify gaps in structure, materials, printing finishes, and visual impact.
              Based on these insights, we design and manufacture packaging solutions that elevate brand perception and market presence.
            </p>

            {/* CTA buttons */}
            <div
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 bg-white text-[#1a3a2a] font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-black/20"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
              >
                View Catalog
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-10"
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
    {/* <CardFlowerSection /> */}
    </>
  );
}
