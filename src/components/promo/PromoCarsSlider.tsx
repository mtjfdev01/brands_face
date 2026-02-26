// components/promo/PromoCardsSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import PromoCard, { PromoSlide } from "./PromoCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

function ArrowButton({
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
        "promo-nav-btn",
        className,
        "grid h-14 w-14 place-items-center rounded-full bg-white shadow-md",
        "hover:shadow-lg active:scale-[0.98] transition",
      ].join(" ")}
      type="button"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-slate-900"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === "prev" ? (
          <path
            d="M14.5 5L8 12L14.5 19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9.5 5L16 12L9.5 19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export default function PromoCardsSlider() {
  const slides: PromoSlide[] = [
    {
      id: "promo-1",
      tag: "DEAL",
      title: "Join newsletter & get 15% discount",
      description:
        "15% off your first order when you sign up for our newsletter. Get emails with the latest exclusive deals, product updates, packaging inspirations and news from the industry.",
      linkText: "Subscribe",
      href: "#",
      bgClass: "bg-sky-100",
      textClass: "text-slate-900",
      imageSrc: "/promo/promo1.png",
      imageAlt: "Newsletter promo packaging sample",
    },
    {
      id: "promo-2",
      tag: "DEALS",
      title: "Restock for the new year and save 12%",
      description:
        "Start the new year fully stocked. Applies to Mailer Boxes and Poly Mailers (excluding plain versions). Get 12% off when you spend €500.",
      linkText: "Shop now",
      href: "#",
      bgClass: "bg-[#3B2F46]",
      textClass: "text-white",
      imageSrc: "/promo/promo2.png",
      imageAlt: "Restock promo boxes",
    },
    {
      id: "promo-3",
      tag: "DEAL",
      title: "Cashback from samples",
      description:
        "Order our sample pack and get cashback on your next order. You can choose products from the sample pack.",
      linkText: "Order samples",
      href: "#",
      bgClass: "bg-slate-100",
      textClass: "text-slate-900",
      imageSrc: "/promo/promo3.png",
      imageAlt: "Sample pack promo",
    },
    {
        id: "promo-4",
        tag: "DEALS",
        title: "Restock for the new year and save 12%",
        description:
          "Start the new year fully stocked. Applies to Mailer Boxes and Poly Mailers (excluding plain versions). Get 12% off when you spend €500.",
        linkText: "Shop now",
        href: "#",
        bgClass: "bg-[#3B2F46]",
        textClass: "text-white",
        imageSrc: "/promo/promo2.png",
        imageAlt: "Restock promo boxes",
      },
      {
        id: "promo-5",
        tag: "DEAL",
        title: "Cashback from samples",
        description:
          "Order our sample pack and get cashback on your next order. You can choose products from the sample pack.",
        linkText: "Order samples",
        href: "#",
        bgClass: "bg-slate-100",
        textClass: "text-slate-900",
        imageSrc: "/promo/promo3.png",
        imageAlt: "Sample pack promo",
      },
  ];

  return (
    <AnimateOnScroll animation="fade-in" as="section" className="relative w-full py-12 md:py-16">
      {/* custom nav buttons (overlay) */}
      <ArrowButton
        direction="prev"
        className="promo-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 md:left-6"
      />
      <ArrowButton
        direction="next"
        className="promo-next absolute right-4 top-1/2 z-20 -translate-y-1/2 md:right-6"
      />

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".promo-prev",
          nextEl: ".promo-next",
        }}
        spaceBetween={28}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 28 },
          1280: { slidesPerView: 3, spaceBetween: 32 },
        }}
        className="!px-4 md:!px-6"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id} className="pb-2">
            <PromoCard slide={s} />
          </SwiperSlide>
        ))}
      </Swiper>
    </AnimateOnScroll>
  );
}
