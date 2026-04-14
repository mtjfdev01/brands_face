"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { productDetailHref, type RelatedCategoryProduct } from "@/data/categoryPages";

import "swiper/css";
import "./related-products-carousel.css";

type Props = {
  items: RelatedCategoryProduct[];
  /** Keep `?fromTab=` when browsing related products from a non-default category filter. */
  preserveFromTab?: string;
};

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navBtnClass =
  "absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full " +
  "border border-[#103a2a]/10 bg-white text-[#103a2a] shadow-[0_10px_40px_rgba(16,58,42,0.12)] " +
  "backdrop-blur-[2px] transition-all duration-300 ease-out " +
  "hover:scale-110 hover:border-[#1dd1a1]/45 hover:bg-[#f8fbfa] hover:text-[#0c2e22] hover:shadow-[0_14px_44px_rgba(29,209,161,0.18)] " +
  "active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1dd1a1]/70 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-25 motion-reduce:transition-none";

export default function RelatedProductsCarousel({ items, preserveFromTab }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  if (items.length === 0) return null;

  const loop = items.length > 3;

  return (
    <section
      className="overflow-x-hidden border-t border-[#103a2a]/10 bg-white py-12 md:py-16"
      aria-labelledby="related-products-heading"
    >
      <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6">
        <h2
          id="related-products-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-[#103a2a] md:mb-10 md:text-3xl"
        >
          Related products you may like
        </h2>

        <div className="relative min-w-0 px-2 sm:px-4 md:px-8">
          <button
            type="button"
            className={`${navBtnClass} left-0 sm:left-1 md:left-2`}
            aria-label="Previous related products"
            onClick={goPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`${navBtnClass} right-0 sm:right-1 md:right-2`}
            aria-label="Next related products"
            onClick={goNext}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <Swiper
            className="related-products-carousel py-4 md:py-6"
            grabCursor
            centeredSlides
            centerInsufficientSlides
            slidesPerView="auto"
            speed={680}
            resistanceRatio={0.55}
            loop={loop}
            loopAdditionalSlides={3}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: { spaceBetween: 10 },
              640: { spaceBetween: 16 },
              1024: { spaceBetween: 22 },
            }}
          >
            {items.map((item) => (
              <SwiperSlide
                key={item.slug}
                className="!flex !h-auto !w-[min(68vw,188px)] justify-center sm:!w-[208px] md:!w-[232px] lg:!w-[248px]"
              >
                <Link
                  href={productDetailHref(item.slug, preserveFromTab)}
                  className="flex w-full flex-col overflow-hidden rounded-3xl bg-gray-100 shadow-md ring-1 ring-[#103a2a]/10 transition-[transform,box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:z-10 hover:scale-[1.03] hover:shadow-xl hover:ring-[#1dd1a1]/25 motion-reduce:transition-none motion-reduce:hover:scale-100"
                >
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none"
                      sizes="(max-width: 640px) 68vw, 248px"
                    />
                  </div>
                  <p className="line-clamp-2 min-h-[2.5rem] bg-white px-2 py-2 text-center text-[11px] font-semibold leading-snug text-[#103a2a] sm:min-h-[2.75rem] sm:text-xs md:text-sm">
                    {item.title}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
