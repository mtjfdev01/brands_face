'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';

import HeroNavbar from '@/components/nav/HeroNavbar';
import HeaderMenu from '@/components/nav/HeaderMenu';
import HeroSlide, { type SlideData } from '@/components/hero/HeroSlide';

/* ── Slide data ── */
const SLIDES: SlideData[] = [
  {
    title: 'Custom CBD Packaging',
    description:
      'Get custom CBD packaging from Brands Face that protects potency, meets state labeling rules, and suits your product requirements. We offer free design support, US manufacturing, and fast shipping.',
    ctaText: 'Get a Free Quote',
    bgImage: '/hero/slide1-bg.jpg',
    productImage: '/hero/slide1-product.png',
  },
  {
    title: 'Premium Custom Boxes',
    description:
      'Elevate your brand with premium packaging solutions. Choose from rigid, mailer, and display boxes — all fully customizable with your artwork and finishes.',
    ctaText: 'Design Your Box',
    bgImage: '/hero/slide1-bg.jpg',
    productImage: '/hero/slide1-product.png',
  },
  {
    title: 'Labels & Stickers',
    description:
      'High-quality custom labels and stickers printed on premium materials. Perfect for product branding, packaging seals, and promotional use.',
    ctaText: 'Order Now',
    bgImage: '/hero/slide1-bg.jpg',
    productImage: '/hero/slide1-product.png',
  },
];

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 pb-12 md:pb-16">
      {/* ── Hero container with rounded corners ── */}
      <div
        className="relative w-full rounded-[var(--radius-hero)] bg-[var(--color-hero-bg)]"
        style={{ height: '95vh', minHeight: '520px', maxHeight: '860px' }}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        {/* ── Navbar + Menu (sit on top, can overflow for mega menus) ── */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <HeroNavbar />
          <HeaderMenu />
        </div>

        {/* ── Carousel clip container (keeps slides within rounded area) ── */}
        <div className="absolute inset-0 rounded-[var(--radius-hero)] overflow-hidden">
          {/* ── Swiper carousel ── */}
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop
            speed={800}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full h-full"
          >
            {SLIDES.map((slide, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                <HeroSlide slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Pagination dots ── */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="w-2 h-2 rounded-full bg-[var(--color-hero-text)] opacity-20 hover:opacity-50 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
