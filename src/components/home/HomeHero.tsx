"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const HERO_READY_MAX_MS = 8000;
const AUTOPLAY_MS = 6500;

type HeroSlide = {
  id: string;
  headingTag: "h1" | "h2";
  mobileSrc: string;
  desktopSrc: string;
  imageAlt: string;
  barLabel: string;
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
  desc: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

const QUOTE_CTA = { href: "/quote", label: "Get a Quote" } as const;

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "christmas",
    headingTag: "h1",
    mobileSrc: "/assets/images/home_hero/v3-mobile-christmas.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-christmas.png",
    imageAlt: "Four Christmas packaging products: gift bag, wrapping paper, sweet box, and art-card carton",
    barLabel: "Christmas Packaging",
    eyebrow: "Custom Christmas Packaging",
    title: "Christmas Gift Boxes",
    highlight: "Bags & Wrap",
    sub: "Four premium Christmas formats for retail, hampers, and corporate gifting.",
    desc: "Gift bags, wrapping paper, sweet boxes, and festive art-card cartons — one seasonal brand look.",
    primary: { href: "/category/christmas-packaging", label: "Explore Christmas Packaging" },
    secondary: QUOTE_CTA,
  },
  {
    id: "artcard",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-artcard.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-artcard.png",
    imageAlt: "Four premium art-card boxes: printed, foiled, embossed, and matte finish",
    barLabel: "Art Card Boxes",
    eyebrow: "Custom Art Card Boxes",
    title: "Printed, Foiled",
    highlight: "Embossed & Matte",
    sub: "Four premium art-card finishes with sharp print and refined construction.",
    desc: "Printed, foiled, embossed, and matte-finish cartons for cosmetics, gifts, and retail.",
    primary: { href: "/category/art_card_boxes", label: "Explore Art Card Boxes" },
    secondary: QUOTE_CTA,
  },
  {
    id: "corrugated",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-corrugated.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-corrugated.png",
    imageAlt: "Four premium corrugated boxes: printed, kraft, white, and heavy-duty",
    barLabel: "Corrugated Boxes",
    eyebrow: "Custom Corrugated Boxes",
    title: "Printed, Kraft",
    highlight: "White & Heavy Duty",
    sub: "Four premium corrugated builds for shipping, retail, and branded fulfilment.",
    desc: "Custom printed, kraft, white, and heavy-duty cartons engineered for transit and shelf.",
    primary: { href: "/category/corrugated_boxes", label: "Explore Corrugated Boxes" },
    secondary: QUOTE_CTA,
  },
  {
    id: "pouches",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-pouches.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-pouches.png",
    imageAlt: "Four premium pouches: printed, matte, gloss, and foil",
    barLabel: "Custom Pouches",
    eyebrow: "Custom Pouches",
    title: "Printed, Matte",
    highlight: "Gloss & Foil",
    sub: "Four premium pouch finishes with barrier films and retail-ready seals.",
    desc: "Printed, matte, gloss, and foil stand-up pouches for food, beauty, and refill lines.",
    primary: { href: "/category/custom_pouches", label: "Explore Custom Pouches" },
    secondary: QUOTE_CTA,
  },
  {
    id: "bags",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-bags.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-bags.png",
    imageAlt: "Four premium carry bags: printed, foiled, embossed, and matte",
    barLabel: "Carry Bags",
    eyebrow: "Custom Carry Bags",
    title: "Printed, Foiled",
    highlight: "Embossed & Matte",
    sub: "Four premium retail bags with rope, ribbon, and campaign-grade print.",
    desc: "Custom printed, foiled, embossed, and matte carry bags for boutiques and gifting.",
    primary: { href: "/category/carry_bags", label: "Explore Carry Bags" },
    secondary: QUOTE_CTA,
  },
  {
    id: "kraft",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-kraft.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-kraft.png",
    imageAlt: "Four premium kraft boxes: printed, foiled, embossed, and matte",
    barLabel: "Kraft Boxes",
    eyebrow: "Custom Kraft Boxes",
    title: "Printed, Foiled",
    highlight: "Embossed & Matte",
    sub: "Four premium kraft finishes with natural fibre and clean brand print.",
    desc: "Printed, foiled, embossed, and matte kraft boxes for eco-forward retail and gifts.",
    primary: { href: "/category/kraft_boxes", label: "Explore Kraft Boxes" },
    secondary: QUOTE_CTA,
  },
  {
    id: "labels",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-labels.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-labels.png",
    imageAlt: "Four premium labels and tags: clear, embossed, foil, and gloss",
    barLabel: "Labels & Tags",
    eyebrow: "Custom Labels & Tags",
    title: "Clear, Embossed",
    highlight: "Foil & Gloss",
    sub: "Four premium label finishes for bottles, hang tags, and retail seals.",
    desc: "Clear, embossed, foil, and gloss labels and tags that keep every SKU on-brand.",
    primary: { href: "/category/labels_and_tags", label: "Explore Labels & Tags" },
    secondary: QUOTE_CTA,
  },
  {
    id: "rigid",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-rigid.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-rigid.png",
    imageAlt: "Four premium rigid boxes: foam insert, velvet, divider, and printed magnetic",
    barLabel: "Rigid Boxes",
    eyebrow: "Custom Rigid Boxes",
    title: "Inserts, Velvet",
    highlight: "Dividers & Print",
    sub: "Four premium rigid structures with inserts, foil, and magnetic closures.",
    desc: "Foam-insert, velvet, divider, and custom-printed rigid boxes for luxury unboxing.",
    primary: { href: "/category/rigid_boxes", label: "Explore Rigid Boxes" },
    secondary: QUOTE_CTA,
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
    <div
      className={`min-w-0 max-w-full ${compact ? "mx-auto w-full max-w-xl text-center" : "max-w-xl text-left"}`}
    >
      <p
        className={`flex items-center font-semibold uppercase tracking-[0.22em] text-[#c5a059] [text-shadow:0_1px_12px_rgba(19,47,43,0.55)] ${
          compact ? "justify-center gap-3 text-[10px]" : "justify-start gap-4 text-[11px]"
        }`}
      >
        <span className={`h-px bg-[#c5a059]/70 ${compact ? "w-8" : "w-10"}`} aria-hidden />
        {slide.eyebrow}
        {compact ? <span className="h-px w-8 bg-[#c5a059]/70" aria-hidden /> : null}
      </p>
      <Heading
        className={`font-[family-name:var(--font-playfair)] font-extrabold leading-[1.12] tracking-normal text-white [text-shadow:0_2px_24px_rgba(19,47,43,0.55)] ${
          compact
            ? "mt-3 text-[2.05rem] max-[360px]:text-[1.8rem] sm:text-4xl"
            : "mt-4 text-[2.65rem] xl:text-[3.15rem]"
        }`}
      >
        <span className="block">{slide.title}</span>
        <span className="mt-1 block text-[#ead9b8]">{slide.highlight}</span>
      </Heading>
      <span
        className={`mt-4 block h-px bg-gradient-to-r from-[#c5a059] to-transparent ${
          compact ? "mx-auto w-16" : "w-20"
        }`}
        aria-hidden
      />
      <p
        className={`font-semibold text-white [text-shadow:0_1px_16px_rgba(19,47,43,0.55)] ${
          compact ? "mt-3 text-[15px]" : "mt-4 text-[15px] xl:text-base"
        }`}
      >
        {slide.sub}
      </p>
      {compact ? null : (
        <p className="mt-3 text-sm leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(19,47,43,0.5)] xl:text-[15px]">
          {slide.desc}
        </p>
      )}
      <div className={`mt-5 flex flex-wrap items-center gap-3 ${compact ? "justify-center" : "mt-7 justify-start"}`}>
        <Link
          href={slide.primary.href}
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1a3a2a] shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:bg-gray-100 active:scale-[0.98] sm:px-8"
        >
          {slide.primary.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href={slide.secondary.href}
          className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/70 px-6 py-3 text-sm font-medium text-white transition-all hover:border-[#c5a059] hover:bg-[#c5a059]/10 sm:px-7"
        >
          {slide.secondary.label}
        </Link>
      </div>
    </div>
  );
}

type HomeHeroProps = {
  onReady?: () => void;
};

export default function HomeHero({ onReady }: HomeHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const slide = HERO_SLIDES[active] ?? HERO_SLIDES[0];

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
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1100}
        initialSlide={0}
        keyboard={{ enabled: true }}
        autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay?.stop();
        }}
        onSlideChange={(swiper) => {
          setActive(swiper.realIndex);
          setProgress(0);
        }}
        onAutoplayTimeLeft={(_swiper, _time, ratio) => {
          setProgress(1 - ratio);
        }}
        className="home-hero-swiper !h-full min-h-0 w-full max-w-full overflow-hidden [&_.swiper-wrapper]:h-full [&_.swiper-slide]:!h-full [&_.swiper-slide]:max-w-full [&_.swiper-slide]:overflow-hidden"
      >
        {HERO_SLIDES.map((item, idx) => (
          <SwiperSlide key={item.id} className="!h-full overflow-hidden">
            <div className="relative h-full min-h-0 w-full overflow-hidden">
              <div className="hero-photo absolute inset-0">
                <Image
                  src={item.mobileSrc}
                  alt={item.imageAlt}
                  fill
                  priority={idx === 0}
                  quality={95}
                  sizes="100vw"
                  className="object-cover object-bottom lg:hidden"
                />
                <Image
                  src={item.desktopSrc}
                  alt={item.imageAlt}
                  fill
                  priority={idx === 0}
                  quality={95}
                  sizes="100vw"
                  className="hidden object-cover object-right lg:block"
                />
              </div>
              <span
                className="hero-shine pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/3 bg-gradient-to-r from-transparent via-[#ead9b8]/25 to-transparent"
                aria-hidden
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[58%] bg-gradient-to-b from-[#132f2b]/92 via-[#132f2b]/64 to-transparent lg:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[52%] bg-gradient-to-r from-[#132f2b]/92 via-[#132f2b]/58 to-transparent lg:block xl:w-[48%]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#132f2b]/50 via-transparent to-transparent" aria-hidden />

      <span className="home-hero-orb pointer-events-none absolute left-[18%] top-[22%] z-[2] hidden h-24 w-24 rounded-full bg-[#c5a059]/18 blur-2xl lg:block" aria-hidden />
      <span className="home-hero-orb home-hero-orb-b pointer-events-none absolute bottom-[28%] right-[14%] z-[2] hidden h-32 w-32 rounded-full bg-[#ead9b8]/12 blur-3xl lg:block" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-10 flex h-full flex-col px-4 pb-[5.5rem] pt-6 sm:px-6 sm:pt-8 lg:justify-center lg:px-12 lg:pb-28 lg:pt-10 xl:px-16">
        <div className="pointer-events-auto lg:hidden">
          <SlideCopy slide={slide} compact />
        </div>
        <div className="pointer-events-auto hidden lg:block">
          <SlideCopy slide={slide} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 px-4 pb-5 sm:px-6 lg:px-12 lg:pb-7">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-[#132f2b]/55 px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-[family-name:var(--font-playfair)] text-sm font-bold tracking-[0.18em] text-[#ead9b8]">
                {String(active + 1).padStart(2, "0")}
                <span className="ml-1 font-sans text-[11px] font-semibold tracking-normal text-white/45">
                  / {String(HERO_SLIDES.length).padStart(2, "0")}
                </span>
              </p>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">
                {slide.barLabel}
              </p>
            </div>
            <div className="h-[2px] overflow-hidden rounded-full bg-white/15" aria-hidden>
              <div
                className="h-full rounded-full bg-[#c5a059] transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.max(progress, 0.03) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/60 text-[#ead9b8] transition hover:bg-[#c5a059] hover:text-[#132f2b]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 6 9 12l6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/60 text-[#ead9b8] transition hover:bg-[#c5a059] hover:text-[#132f2b]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
