"use client";

import { useCallback, useId, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import { HOME_CARDS } from "@/data/homeCards";

import "swiper/css";
import "./category-row-carousel.css";

export type CategoryRowCarouselItem = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
};

type Props = {
  items?: CategoryRowCarouselItem[];
  className?: string;
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

export default function CategoryRowCarousel({ items, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const swiperRef = useRef<SwiperType | null>(null);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const resolved: CategoryRowCarouselItem[] =
    items ??
    HOME_CARDS.map((c) => ({
      id: c.category,
      title: c.title,
      href: `/category/${c.category}`,
      imageSrc: c.image,
    }));

  if (resolved.length === 0) return null;

  const loop = resolved.length > 4;

  return (
    <section className={className}>
      <div className="relative min-w-0">
        <button
          type="button"
          aria-label="Previous"
          onClick={goPrev}
          className={[
            `cat-row-prev-${uid}`,
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
            `cat-row-next-${uid}`,
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
          loopAdditionalSlides={3}
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
          {resolved.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!flex !h-auto !w-[min(72vw,320px)] shrink-0 justify-center sm:!w-[280px] md:!w-[320px] lg:!w-[340px]"
            >
              <Link
                href={item.href}
                className="group block w-full select-none"
                aria-label={item.title}
              >
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
    </section>
  );
}

