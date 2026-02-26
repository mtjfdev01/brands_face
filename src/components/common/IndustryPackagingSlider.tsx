"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

/* ── Types ── */
export type IndustryItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  badge?: string; // e.g. "Coming Soon"
};

type Props = {
  title: string;
  items: IndustryItem[];
};

/* ── Arrow button ── */
function NavArrow({
  className,
  direction,
}: {
  className: string;
  direction: "prev" | "next";
}) {
  return (
    <button
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={[
        className,
        "grid h-10 w-10 place-items-center rounded-full bg-white border border-gray-200 shadow-sm",
        "hover:shadow-md active:scale-95 transition-all",
      ].join(" ")}
      type="button"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === "prev" ? (
          <path
            d="M14.5 5L8 12L14.5 19"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9.5 5L16 12L9.5 19"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/* ── Main component ── */
export default function IndustryPackagingSlider({ title, items }: Props) {
  const prev = "industry-prev";
  const next = "industry-next";

  return (
    <section className="w-full py-12 md:py-16">
      {/* Title */}
      <AnimateOnScroll animation="blur-in">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={100}>
        <div className="relative px-4 md:px-6">
        {/* Navigation arrows */}
        <NavArrow
          direction="prev"
          className={`${prev} absolute left-0 top-1/2 z-20 -translate-y-1/2 md:left-1`}
        />
        <NavArrow
          direction="next"
          className={`${next} absolute right-0 top-1/2 z-20 -translate-y-1/2 md:right-1`}
        />

        <div className="mx-8 md:mx-12">
          <Swiper
            modules={[Navigation, Grid]}
            navigation={{ prevEl: `.${prev}`, nextEl: `.${next}` }}
            spaceBetween={20}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: "row",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                grid: { rows: 2, fill: "row" },
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                grid: { rows: 2, fill: "row" },
                spaceBetween: 24,
              },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <Link href={item.href} className="group block pb-4">
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title + arrow */}
                  <div className="mt-3 flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[var(--color-nav-active)] transition-colors md:text-lg">
                      {item.title}
                    </h3>
                    <span className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {item.description}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
