"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  /** Used only for building a mixed ordering; not rendered. */
  category: string;
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

function shuffleArray<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mix products across categories by taking small random bursts (1–3) from a randomly chosen category,
 * then switching to another category, repeating until exhausted.
 */
function mixProductsAcrossCategories(products: CarouselItem[]): CarouselItem[] {
  if (products.length <= 1) return products.slice();

  const groups = new Map<string, CarouselItem[]>();
  for (const p of products) {
    const key = p.category;
    const g = groups.get(key);
    if (g) g.push(p);
    else groups.set(key, [p]);
  }

  // Randomize within-category order so bursts aren't predictable.
  groups.forEach((group, categoryKey) => {
    groups.set(categoryKey, shuffleArray(group));
  });

  const categories = shuffleArray(Array.from(groups.keys()));
  const out: CarouselItem[] = [];

  while (categories.length > 0) {
    const catIdx = Math.floor(Math.random() * categories.length);
    const cat = categories[catIdx]!;
    const q = groups.get(cat)!;

    // Take a small random burst from this category, then potentially switch.
    const burst = 1 + Math.floor(Math.random() * 3);
    let taken = 0;
    while (taken < burst && q.length > 0) {
      const next = q.shift();
      if (next) out.push(next);
      taken++;
    }

    if (q.length === 0) {
      groups.delete(cat);
      categories.splice(catIdx, 1);
    }
  }

  return out;
}

type Props = {
  query?: string;
};

function buildBaseCatalogItems(): CarouselItem[] {
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
        category: cfg.category,
      });
    }
  }

  // Deterministic ordering for SSR + initial client render (must not use Math.random here).
  return Array.from(bySlug.values()).sort((a, b) => a.id.localeCompare(b.id));
}

export default function AllProductsRowCarousel({ query }: Props) {
  const uid = useId().replace(/:/g, "");
  const swiperRef = useRef<SwiperType | null>(null);
  const navUnlockTimerRef = useRef<number | null>(null);
  const [mixedReady, setMixedReady] = useState(false);
  const [items, setItems] = useState<CarouselItem[]>([]);

  const baseItems = useMemo(() => buildBaseCatalogItems(), []);

  useLayoutEffect(() => {
    // Random mixing must happen only on the client after mount to avoid hydration mismatches (React #423).
    setItems(mixProductsAcrossCategories(baseItems));
    setMixedReady(true);
  }, [baseItems]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  const filtered = useMemo(() => {
    if (!mixedReady) return [];
    if (!normalizedQuery) return items;
    return items.filter((p) => {
      const hay = `${p.title} ${p.id}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }, [items, mixedReady, normalizedQuery]);

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

  useEffect(() => {
    if (!mixedReady) return;
    if (filtered.length === 0) return;

    swiperRef.current?.update();
    if (swiperRef.current && !swiperRef.current.destroyed) {
      if (loop) swiperRef.current.slideToLoop(0, 0);
      else swiperRef.current.slideTo(0, 0);
    }
  }, [filtered.length, loop, mixedReady, normalizedQuery]);

  useEffect(() => {
    return () => {
      if (navUnlockTimerRef.current) window.clearTimeout(navUnlockTimerRef.current);
    };
  }, []);

  if (!mixedReady) {
    return (
      <div className="relative min-w-0 px-12 py-6">
        <div className="mx-auto h-[220px] max-w-5xl animate-pulse rounded-2xl bg-[#103a2a]/5" />
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="px-12 py-6 text-center text-sm text-[#103a2a]/70">No products available.</div>;
  }

  if (filtered.length === 0) {
    return (
      <div className="px-12 py-10 text-center text-sm text-[#103a2a]/70">
        No products match "{query?.trim() ?? ""}".
      </div>
    );
  }

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        aria-label="Previous"
        onClick={goPrev}
        disabled={n <= 1}
        className={[
          `all-prod-row-prev-${uid}`,
          "absolute left-2 top-1/2 z-20 -translate-y-1/2",
          "grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#103a2a]",
          "shadow-[0_12px_40px_rgba(16,58,42,0.18)] ring-1 ring-[#103a2a]/10 backdrop-blur",
          "transition hover:scale-110 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57d7aa]/70 focus-visible:ring-offset-2",
          n <= 1 ? "pointer-events-none opacity-30" : "",
        ].join(" ")}
      >
        <ArrowIcon direction="prev" />
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={goNext}
        disabled={n <= 1}
        className={[
          `all-prod-row-next-${uid}`,
          "absolute right-2 top-1/2 z-20 -translate-y-1/2",
          "grid h-11 w-11 place-items-center rounded-full bg-white/95 text-[#103a2a]",
          "shadow-[0_12px_40px_rgba(16,58,42,0.18)] ring-1 ring-[#103a2a]/10 backdrop-blur",
          "transition hover:scale-110 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#57d7aa]/70 focus-visible:ring-offset-2",
          n <= 1 ? "pointer-events-none opacity-30" : "",
        ].join(" ")}
      >
        <ArrowIcon direction="next" />
      </button>

      <Swiper
        key={`${normalizedQuery}:${filtered.length}:${loop ? "loop" : "noloop"}`}
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

