"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HERO_READY_MAX_MS = 8000;
const CHRISTMAS_HREF = "/category/christmas-packaging";

type HeroSlide = {
  id: string;
  mobileSrc: string;
  desktopSrc: string;
  mobile: {
    headingTag: "h1" | "h2";
    lines: [string, string, string];
    sub: ReactNode;
    desc: string;
    stats?: Array<{ value: string; label: string; icon: "cube" | "factory" | "chart" }>;
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
  };
  desktop: {
    headingTag: "h1" | "h2";
    eyebrow: string;
    title: string;
    highlight: string;
    sub: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    imageClass?: string;
  };
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "main",
    mobileSrc: "/assets/images/hero/mobile-hero-v2.png",
    desktopSrc: "/assets/images/hero/category-pedestals.png",
    mobile: {
      headingTag: "h1",
      lines: ["Custom Packaging", "for USA Brands", "That Stand Out"],
      sub: (
        <>
          Custom boxes. Rigid packaging.{" "}
          <span className="font-semibold text-[#57d7aa]">Printed packs.</span>
        </>
      ),
      desc: "Custom packaging company serving 300+ brands across the USA with custom boxes, rigid packaging, and retail-ready print.",
      stats: [
        { value: "300+", label: "Brands Served", icon: "cube" },
        { value: "Custom", label: "Boxes & Packs", icon: "factory" },
        { value: "USA", label: "Market Served", icon: "chart" },
      ],
    },
    desktop: {
      headingTag: "h1",
      eyebrow: "Custom Packaging Solutions",
      title: "Your Brand Deserves",
      highlight: "Better Packaging",
      sub: "Premium packaging for every idea, industry and occasion.",
      primary: { href: "/audit", label: "Get Started" },
      secondary: { href: "/catalog", label: "Explore All Products" },
    },
  },
  {
    id: "christmas-gift",
    mobileSrc: "/assets/images/hero/christmas_mob.png",
    desktopSrc: "/assets/images/hero/christmas_desktop.png",
    mobile: {
      headingTag: "h2",
      lines: ["Custom Christmas", "Packaging", "for USA Brands"],
      sub: (
        <>
          Gift boxes. Holiday bags.{" "}
          <span className="font-semibold text-[#57d7aa]">Festive wrap.</span>
        </>
      ),
      desc: "Custom Christmas packaging for brands across the USA — gift boxes, bags, and wrap for retail, hampers, and corporate gifting.",
      primary: { href: CHRISTMAS_HREF, label: "Shop Christmas" },
      secondary: { href: "/quote", label: "Get a Quote" },
    },
    desktop: {
      headingTag: "h2",
      eyebrow: "Custom Christmas Packaging",
      title: "Holiday Packaging",
      highlight: "That Gets Remembered",
      sub: "Custom Christmas gift boxes, bags, and wrap for brands across the USA.",
      primary: { href: CHRISTMAS_HREF, label: "Shop Christmas Packaging" },
      secondary: { href: "/quote", label: "Get a Quote" },
      imageClass: "origin-bottom scale-[1.22]",
    },
  },
  {
    id: "christmas-line",
    mobileSrc: "/assets/images/hero/christmas_2.png",
    desktopSrc: "/assets/images/hero/christmas_desktop_2.png",
    mobile: {
      headingTag: "h2",
      lines: ["Christmas Boxes", "Bags & Wrap", "One Complete Line"],
      sub: (
        <>
          Matching holiday sets.{" "}
          <span className="font-semibold text-[#57d7aa]">Retail-ready print.</span>
        </>
      ),
      desc: "Build a full Christmas packaging line for USA brands — sweet boxes, gift bags, tags, and seals that ship together for the season.",
      primary: { href: CHRISTMAS_HREF, label: "Explore Christmas Line" },
      secondary: { href: "/quote", label: "Get a Quote" },
    },
    desktop: {
      headingTag: "h2",
      eyebrow: "Seasonal Gift Collections",
      title: "Boxes, Bags & Wrap",
      highlight: "One Holiday Line",
      sub: "Matching Christmas packaging for retail, hampers, and corporate gifting.",
      primary: { href: CHRISTMAS_HREF, label: "Explore Christmas Line" },
      secondary: { href: "/quote", label: "Get a Quote" },
      imageClass: "origin-bottom scale-[1.28]",
    },
  },
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function getHeroAssetUrls(): string[] {
  const first = HERO_SLIDES[0];
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
    return [first.mobileSrc];
  }
  return [first.desktopSrc];
}

function StatIcon({ icon }: { icon: "cube" | "factory" | "chart" }) {
  if (icon === "cube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
        <path d="M12 2l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 7v10l9 5 9-5V7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 12v10" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (icon === "factory") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
        <path d="M3 21V10l6 3V10l6 3V10l6 3v8H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 21v-6h3v6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4 w-4">
      <path d="M4 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 15l3-3 3 2 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileCtas({
  primary,
  secondary,
}: {
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  if (!primary && !secondary) return null;
  return (
    <div className="mt-6 flex flex-col gap-3">
      {primary ? (
        <Link href={primary.href} className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1a3a2a]">
          {primary.label}
        </Link>
      ) : null}
      {secondary ? (
        <Link
          href={secondary.href}
          className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white"
        >
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

function DesktopCtas({
  primary,
  secondary,
}: {
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
      <Link
        href={primary.href}
        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1a3a2a] shadow-lg shadow-black/20 transition-all hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98]"
      >
        {primary.label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
      <Link
        href={secondary.href}
        className="inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-3 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10"
      >
        {secondary.label}
      </Link>
    </div>
  );
}

type HomeHeroProps = {
  onReady?: () => void;
};

export default function HomeHero({ onReady }: HomeHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    let cancelled = false;
    let didNotify = false;
    const finish = () => {
      if (cancelled || didNotify) return;
      didNotify = true;
      onReady?.();
      window.setTimeout(() => swiperRef.current?.autoplay?.start(), 400);
    };

    const maxTimer = window.setTimeout(finish, HERO_READY_MAX_MS);
    void Promise.all(getHeroAssetUrls().map(preloadImage)).then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, [onReady]);

  return (
    <section className="relative h-[calc(100svh-4.5rem)] max-h-[calc(100svh-4.5rem)] w-full overflow-hidden bg-[var(--dark-primary-green)]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        initialSlide={0}
        autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay?.stop();
        }}
        className="home-hero-swiper !h-full min-h-0 w-full [&_.swiper-wrapper]:h-full [&_.swiper-slide]:!h-full [&_.swiper-slide]:overflow-hidden [&_.swiper-pagination]:bottom-[26%] [&_.swiper-pagination]:z-30 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:bg-white/45 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-[var(--light-green)] max-lg:[&_.swiper-pagination]:bottom-6"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const MobileHeading = slide.mobile.headingTag;
          const DesktopHeading = slide.desktop.headingTag;
          return (
            <SwiperSlide key={slide.id} className="!h-full overflow-hidden">
              <div className="relative h-full min-h-0 w-full overflow-hidden">
                <div className="absolute inset-0 lg:hidden">
                  <Image
                    src={slide.mobileSrc}
                    alt=""
                    fill
                    priority={idx === 0}
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-bottom"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#132f2b]/70 via-[#132f2b]/35 to-transparent"
                    aria-hidden
                  />
                  <div className="relative z-10 mx-auto max-w-xl px-6 pb-24 pt-4 sm:px-8 sm:pt-5">
                    <MobileHeading className="mt-6 flex flex-col gap-3 text-[32px] font-extrabold leading-none tracking-tight text-white max-[360px]:text-[28px] sm:text-[2.65rem]">
                      <span>{slide.mobile.lines[0]}</span>
                      <span className="text-[var(--light-green)]">{slide.mobile.lines[1]}</span>
                      <span>{slide.mobile.lines[2]}</span>
                    </MobileHeading>
                    <p className="mt-4 text-sm font-medium text-white/70">{slide.mobile.sub}</p>
                    <p className="mt-3 max-w-[34rem] text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
                      {slide.mobile.desc}
                    </p>
                    {slide.mobile.stats ? (
                      <div className="mt-7 grid grid-cols-3 gap-3">
                        {slide.mobile.stats.map((stat) => (
                          <div key={stat.label} className="flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#57d7aa]">
                              <StatIcon icon={stat.icon} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-extrabold leading-none text-[#57d7aa]">{stat.value}</p>
                              <p className="mt-1 text-[10px] font-medium leading-tight text-white/55">{stat.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <MobileCtas primary={slide.mobile.primary} secondary={slide.mobile.secondary} />
                  </div>
                </div>

                <div className="absolute inset-0 hidden overflow-hidden lg:block">
                  <Image
                    src={slide.desktopSrc}
                    alt=""
                    fill
                    priority={idx === 0}
                    quality={95}
                    sizes="100vw"
                    className={`object-cover object-bottom ${slide.desktop.imageClass ?? ""}`.trim()}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#132f2b]/40 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 top-[6%] z-10 flex justify-center px-8 text-center">
                    <div className="max-w-4xl">
                      <p className="flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90">
                        <span className="h-px w-10 bg-white/55" aria-hidden />
                        {slide.desktop.eyebrow}
                        <span className="h-px w-10 bg-white/55" aria-hidden />
                      </p>
                      <DesktopHeading className="mt-2 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-5xl">
                        {slide.desktop.title}
                        <span className="mt-1 block text-[#d4c0a1]">{slide.desktop.highlight}</span>
                      </DesktopHeading>
                      <p className="mx-auto mt-2.5 max-w-xl text-sm font-medium text-white/80 xl:text-base">
                        {slide.desktop.sub}
                      </p>
                      <DesktopCtas primary={slide.desktop.primary} secondary={slide.desktop.secondary} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
