"use client";

import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import { CATEGORY_PAGE_CONFIG, productDetailHref } from "@/data/categoryPages";

import "swiper/css";
import "./category-row-carousel.css";

type CarouselItem = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
};

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      {direction === "prev" ? (
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function encodePublicPath(src: string): string {
  if (!src.startsWith("/")) return src;
  return (
    "/" +
    src
      .slice(1)
      .split("/")
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}

type Props = {
  query?: string;
};

export default function AllProductsRowCarousel({ query }: Props) {
  const uid = useId().replace(/:/g, "");
  const swiperRef = useRef<SwiperType | null>(null);
  const navUnlockTimerRef = useRef<number | null>(null);

  const items: CarouselItem[] = useMemo(() => {
    const bySlug = new Map<string, CarouselItem>();

    for (const cfg of CATEGORY_PAGE_CONFIG) {
      for (const p of cfg.products) {
        if (!p?.slug) continue;
        if (bySlug.has(p.slug)) continue;
        bySlug.set(p.slug, {
          id: p.slug,
          title: p.title,
          href: productDetailHref(p.slug),
          imageSrc: encodePublicPath(p.cardImage),
        });
      }
    }

    return Array.from(bySlug.values());
  }, []);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  const filtered = useMemo(() => {
    if (!normalizedQuery) return items;
    return items.filter((p) => {
      const hay = `${p.title} ${p.id}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [items, normalizedQuery]);

  const n = filtered.length;
  const loop = n > 6;

  const nudge = useCallback(
    (dir: -1 | 1) => {
      const swiper = swiperRef.current;
      if (!swiper || swiper.destroyed || n <= 1) return;

      if (navUnlockTimerRef.current) {
        window.clearTimeout(navUnlockTimerRef.current);
        navUnlockTimerRef.current = null;
      }

      // Pause continuous autoplay so the manual slide is visible.
      swiper.autoplay?.stop();

      // `freeMode` + long `speed` makes arrow navigation feel like a linear scroll, not a swipe.
      // Temporarily disable freeMode and use a normal transition speed for one navigation step.
      const prevSpeed = swiper.params.speed;
      const prevFreeMode = swiper.params.freeMode;

      const disableFreeMode = () => {
        if (typeof prevFreeMode === "boolean") {
          swiper.params.freeMode = false;
          return;
        }
        swiper.params.freeMode = {
          ...(prevFreeMode && typeof prevFreeMode === "object" ? prevFreeMode : {}),
          enabled: false,
          momentum: false,
        };
      };

      disableFreeMode();
      swiper.params.speed = 720;
      swiper.update();

      const finish = () => {
        if (swiper.destroyed) return;
        swiper.params.speed = prevSpeed;
        swiper.params.freeMode = prevFreeMode;
        swiper.update();
        swiper.autoplay?.start();
      };

      const onTransitionEnd = () => {
        swiper.off("transitionEnd", onTransitionEnd);
        finish();
      };

      swiper.once("transitionEnd", onTransitionEnd);

      // Safety: if transitionEnd doesn't fire for any reason, still restore state.
      navUnlockTimerRef.current = window.setTimeout(() => {
        swiper.off("transitionEnd", onTransitionEnd);
        finish();
        navUnlockTimerRef.current = null;
      }, 1200);

      if (loop) {
        const nextReal = (swiper.realIndex + dir + n) % n;
        swiper.slideToLoop(nextReal, 720);
      } else {
        if (dir < 0) swiper.slidePrev(720);
        else swiper.slideNext(720);
      }
    },
    [loop, n],
  );

  const goPrev = useCallback(() => {
    nudge(-1);
  }, [nudge]);

  const goNext = useCallback(() => {
    nudge(1);
  }, [nudge]);

  if (filtered.length === 0) return null;

  useEffect(() => {
    swiperRef.current?.update();
    if (swiperRef.current && !swiperRef.current.destroyed) {
      if (loop) swiperRef.current.slideToLoop(0, 0);
      else swiperRef.current.slideTo(0, 0);
    }
  }, [filtered.length, loop, normalizedQuery]);

  useEffect(() => {
    return () => {
      if (navUnlockTimerRef.current) window.clearTimeout(navUnlockTimerRef.current);
    };
  }, []);

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        aria-label="Previous"
        onClick={goPrev}
        className={[
          `all-prod-row-prev-${uid}`,
          "absolute left-2 top-1/2 z-20 -translate-y-1/2",
          "grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#103a2a]",
          "shadow-[0_12px_40px_rgba(16,58,42,0.18)] ring-1 ring-[#103a2a]/10 backdrop-blur",
          "transition hover:scale-110 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57d7aa]/70 focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <ArrowIcon direction="prev" />
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={goNext}
        className={[
          `all-prod-row-next-${uid}`,
          "absolute right-2 top-1/2 z-20 -translate-y-1/2",
          "grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#103a2a]",
          "shadow-[0_12px_40px_rgba(16,58,42,0.18)] ring-1 ring-[#103a2a]/10 backdrop-blur",
          "transition hover:scale-110 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57d7aa]/70 focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <ArrowIcon direction="next" />
      </button>

      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={14}
        slidesPerView="auto"
        freeMode={{ enabled: true, momentum: false }}
        speed={9000}
        loop={loop}
        loopAdditionalSlides={6}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="category-row-carousel px-12 py-2"
        breakpoints={{
          0: { spaceBetween: 12 },
          640: { spaceBetween: 16 },
          1024: { spaceBetween: 18 },
        }}
      >
        {filtered.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!flex !h-auto !w-[min(72vw,320px)] shrink-0 justify-center sm:!w-[280px] md:!w-[320px] lg:!w-[340px]"
          >
            <Link href={item.href} className="group block w-full select-none" aria-label={item.title}>
              <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:scale-100">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 320px, 340px"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-sm font-medium text-[#103a2a]">{item.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

