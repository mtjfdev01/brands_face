"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HERO_READY_MAX_MS = 8000;
const CHRISTMAS_HREF = "/category/christmas-packaging";

type HeroSlide = {
  id: string;
  headingTag: "h1" | "h2";
  mobileSrc: string;
  desktopSrc: string;
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
  desc: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  desktopImageClass?: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "main",
    headingTag: "h1",
    mobileSrc: "/assets/images/hero/mobile-hero-v2.png",
    desktopSrc: "/assets/images/hero/category-pedestals.png",
    eyebrow: "Custom Packaging Solutions",
    title: "Your Brand Deserves",
    highlight: "Better Packaging",
    sub: "Premium packaging for every idea, industry and occasion.",
    desc: "Custom boxes, rigid packaging, and printed packs for 300+ brands across the USA.",
    primary: { href: "/audit", label: "Get Started" },
    secondary: { href: "/catalog", label: "Explore All Products" },
  },
  {
    id: "christmas-gift",
    headingTag: "h2",
    mobileSrc: "/assets/images/hero/christmas_mob.png",
    desktopSrc: "/assets/images/hero/christmas_desktop.png",
    eyebrow: "Custom Christmas Packaging",
    title: "Holiday Packaging",
    highlight: "That Gets Remembered",
    sub: "Custom Christmas gift boxes, bags, and wrap for brands across the USA.",
    desc: "Gift boxes, bags, and wrap for Christmas retail, hampers, and corporate gifting.",
    primary: { href: CHRISTMAS_HREF, label: "Shop Christmas Packaging" },
    secondary: { href: "/quote", label: "Get a Quote" },
    desktopImageClass: "origin-bottom scale-[1.22]",
  },
  {
    id: "christmas-line",
    headingTag: "h2",
    mobileSrc: "/assets/images/hero/christmas_2.png",
    desktopSrc: "/assets/images/hero/christmas_desktop_2.png",
    eyebrow: "Seasonal Gift Collections",
    title: "Boxes, Bags & Wrap",
    highlight: "One Holiday Line",
    sub: "Matching Christmas packaging for retail, hampers, and corporate gifting.",
    desc: "Sweet boxes, gift bags, tags, and seals that ship together as one holiday line.",
    primary: { href: CHRISTMAS_HREF, label: "Explore Christmas Line" },
    secondary: { href: "/quote", label: "Get a Quote" },
    desktopImageClass: "origin-bottom scale-[1.28]",
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

function SlideCopy({ slide, compact = false }: { slide: HeroSlide; compact?: boolean }) {
  const Heading = slide.headingTag;
  return (
    <div className={`hero-slide-copy min-w-0 max-w-full ${compact ? "mx-auto w-full max-w-xl" : "max-w-4xl"}`}>
      <p
        className={`hero-line hero-from-left flex items-center justify-center font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] ${
          compact ? "gap-3 text-[10px]" : "gap-4 text-[11px]"
        }`}
        style={{ animationDelay: "0ms" }}
      >
        <span className={`h-px bg-white/55 ${compact ? "w-8" : "w-10"}`} aria-hidden />
        {slide.eyebrow}
        <span className={`h-px bg-white/55 ${compact ? "w-8" : "w-10"}`} aria-hidden />
      </p>
      <Heading
        className={`font-[family-name:var(--font-playfair)] font-extrabold leading-[1.14] tracking-normal text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)] ${
          compact
            ? "mt-3 text-[2.1rem] max-[360px]:text-[1.85rem] sm:text-4xl"
            : "mt-2 text-[2.75rem] xl:text-5xl"
        }`}
      >
        <span className="hero-line hero-from-right block" style={{ animationDelay: "180ms" }}>
          {slide.title}
        </span>
        <span
          className="hero-line hero-from-left mt-1 block text-[#ead9b8]"
          style={{ animationDelay: "360ms" }}
        >
          {slide.highlight}
        </span>
      </Heading>
      <p
        className={`hero-line hero-from-right mx-auto max-w-2xl font-semibold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] ${
          compact ? "mt-3 text-[15px]" : "mt-3 text-[15px] xl:text-base"
        }`}
        style={{ animationDelay: "540ms" }}
      >
        {slide.sub}
      </p>
      <p
        className={`hero-line hero-from-left mx-auto max-w-xl leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] ${
          compact ? "mt-2 text-[13px]" : "mt-2.5 text-sm"
        }`}
        style={{ animationDelay: "720ms" }}
      >
        {slide.desc}
      </p>
      <div
        className={`hero-line hero-from-right flex flex-wrap items-center justify-center gap-3 ${compact ? "mt-5" : "mt-4"}`}
        style={{ animationDelay: "900ms" }}
      >
        <Link
          href={slide.primary.href}
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1a3a2a] shadow-lg shadow-black/20 transition-all hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98] sm:px-8"
        >
          {slide.primary.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href={slide.secondary.href}
          className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 sm:px-7"
        >
          {slide.secondary.label}
        </Link>
      </div>
    </div>
  );
}

function HeroNavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={`absolute top-1/2 z-40 flex h-12 w-10 -translate-y-1/2 items-center justify-center text-white/85 transition hover:text-white active:scale-95 max-lg:top-auto max-lg:bottom-12 max-lg:h-11 max-lg:w-9 sm:h-14 sm:w-12 ${
        isPrev ? "left-0 lg:left-2" : "right-0 lg:right-2"
      }`}
    >
      <svg
        className="h-9 w-9 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:h-11 sm:w-11 lg:h-14 lg:w-14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isPrev ? <path d="M15 4 7 12l8 8" /> : <path d="M9 4l8 8-8 8" />}
      </svg>
    </button>
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
    <section className="relative h-[calc(100dvh-var(--site-header-h))] max-h-[calc(100dvh-var(--site-header-h))] w-full max-w-full overflow-hidden bg-[var(--dark-primary-green)]">
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        initialSlide={0}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay?.stop();
        }}
        className="home-hero-swiper !h-full min-h-0 w-full max-w-full overflow-hidden [&_.swiper-wrapper]:h-full [&_.swiper-slide]:!h-full [&_.swiper-slide]:max-w-full [&_.swiper-slide]:overflow-hidden [&_.swiper-pagination]:bottom-[26%] [&_.swiper-pagination]:z-30 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:bg-white/45 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-[var(--light-green)] max-lg:[&_.swiper-pagination]:bottom-6"
      >
        {HERO_SLIDES.map((slide, idx) => {
          return (
            <SwiperSlide key={slide.id} className="!h-full overflow-hidden">
              <div className="relative h-full min-h-0 w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden lg:hidden">
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
                  <div className="absolute inset-x-0 top-0 z-10 px-4 pb-20 pt-5 text-center sm:px-6 sm:pt-6">
                    <SlideCopy slide={slide} compact />
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
                    className={`object-cover object-bottom ${slide.desktopImageClass ?? ""}`.trim()}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#132f2b]/40 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 top-[6%] z-10 flex justify-center overflow-hidden px-8 text-center">
                    <SlideCopy slide={slide} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <HeroNavButton direction="prev" onClick={() => swiperRef.current?.slidePrev()} />
      <HeroNavButton direction="next" onClick={() => swiperRef.current?.slideNext()} />
    </section>
  );
}
