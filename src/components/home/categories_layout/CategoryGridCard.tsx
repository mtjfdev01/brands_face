"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import type { CategoryLayoutItem } from "./categoriesLayoutData";
import { CategoryIcon } from "./CategoryIcon";

import "swiper/css";

type Props = {
  item: CategoryLayoutItem;
};

function SlideDots({
  count,
  activeIndex,
  onSelect,
  className = "",
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  if (count <= 1) return null;

  return (
    <div
      className={`flex shrink-0 items-center ${className}`}
      role="tablist"
      aria-label="Slide indicators"
    >
      {Array.from({ length: count }, (_, idx) => (
        <button
          key={idx}
          type="button"
          role="tab"
          aria-selected={idx === activeIndex}
          aria-label={`Slide ${idx + 1}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect(idx);
          }}
          className={[
            "rounded-full transition-colors",
            idx === activeIndex
              ? "h-2 w-2 bg-[#c5a059]"
              : "h-1.5 w-1.5 bg-[#d4c4a8]/70 hover:bg-[#c5a059]/50",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function CategoryGridCard({ item }: Props) {
  const href = `/category/${item.slug}`;
  const slideCount = item.images.length;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (idx: number) => {
    swiperRef.current?.slideToLoop(idx);
    setActiveIndex(idx);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8dcc8] bg-white shadow-[0_6px_24px_rgba(19,47,43,0.07)]">
      <Link href={href} className="flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#f5f2eb]">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={slideCount > 1}
            speed={700}
            autoplay={
              slideCount > 1
                ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(slideCount > 1 ? swiper.realIndex : swiper.activeIndex);
            }}
            className="h-full w-full"
          >
            {item.images.map((src, idx) => (
              <SwiperSlide key={`${src}-${idx}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 25vw"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-5 sm:pb-3 sm:pt-5 lg:pb-4">
          {/* Mobile: icon + title row, then full-width 2-line description + dots */}
          <div className="lg:hidden">
            <div className="flex items-start gap-2.5">
              <CategoryIcon type={item.icon} />
              <h3 className="min-w-0 flex-1 font-[family-name:var(--font-playfair)] text-[14px] font-bold leading-tight text-[#1a2e28]">
                {item.title}
              </h3>
            </div>
            <p className="mt-2 line-clamp-2 w-full text-[11px] leading-[1.45] text-[#5a6562]">
              {item.description}
            </p>
          </div>

          {/* Desktop: icon + title + description */}
          <div className="hidden items-start gap-3 lg:flex">
            <CategoryIcon type={item.icon} />
            <div className="min-w-0 flex-1">
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold leading-tight text-[#1a2e28]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-[1.5] text-[#5a6562]">{item.description}</p>
            </div>
          </div>
        </div>
      </Link>

      <SlideDots
        count={slideCount}
        activeIndex={activeIndex}
        onSelect={goToSlide}
        className="justify-center gap-1.5 pb-4 pt-2 lg:pt-1"
      />
    </article>
  );
}
