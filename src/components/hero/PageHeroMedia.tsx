"use client";

import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export type PageHeroImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

const MEDIA_WRAPPER_CLASS = "relative mx-auto w-full max-w-[520px] lg:max-w-none";
const MEDIA_FRAME_CLASS =
  "relative aspect-[4/3] w-full overflow-hidden bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.35)] lg:aspect-[5/4]";

function MediaOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(70%_60%_at_50%_40%,rgba(87,215,170,0.12),transparent_65%)]" />
  );
}

function SingleHeroImage({ image }: { image: PageHeroImage }) {
  return (
    <div className={MEDIA_WRAPPER_CLASS}>
      <div className={MEDIA_FRAME_CLASS}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority}
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-cover"
        />
        <MediaOverlay />
      </div>
    </div>
  );
}

type SliderProps = {
  images: PageHeroImage[];
  autoplayDelay?: number;
};

function HeroImageSlider({ images, autoplayDelay = 5000 }: SliderProps) {
  const slideCount = images.length;

  return (
    <div className={MEDIA_WRAPPER_CLASS}>
      <div
        className={[
          MEDIA_FRAME_CLASS,
          "group [&_.swiper]:h-full [&_.swiper-slide]:h-full",
          "[&_.swiper-pagination]:bottom-3 [&_.swiper-pagination]:z-[3]",
          "[&_.swiper-pagination-bullet]:bg-white/35 [&_.swiper-pagination-bullet]:opacity-100",
          "[&_.swiper-pagination-bullet-active]:bg-[var(--light-green)]",
        ].join(" ")}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={slideCount > 1}
          speed={900}
          autoplay={
            slideCount > 1
              ? { delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          pagination={slideCount > 1 ? { clickable: true } : false}
          className="h-full w-full"
        >
          {images.map((item, idx) => (
            <SwiperSlide key={`${item.src}-${idx}`}>
              <div className="relative h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={item.priority ?? idx === 0}
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <MediaOverlay />
      </div>
    </div>
  );
}

type PageHeroMediaProps = {
  images: PageHeroImage[];
  autoplayDelay?: number;
};

export default function PageHeroMedia({ images, autoplayDelay }: PageHeroMediaProps) {
  const list = images.filter((item) => item.src);
  if (list.length === 0) return null;
  if (list.length === 1) return <SingleHeroImage image={list[0]} />;
  return <HeroImageSlider images={list} autoplayDelay={autoplayDelay} />;
}
