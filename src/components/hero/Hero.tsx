'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useSearchParams } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/effect-fade';

import HomeHeroNavbar from '@/components/nav/HomeHeroNavbar';
import HeroSlide, { type SlideData } from '@/components/hero/HeroSlide';
import { HOME_CARDS } from '@/data/homeCards';

export default function Hero() {
  const searchParams = useSearchParams();
  const swiperRef = useRef<SwiperType | null>(null);
  const selectedCategory = (searchParams.get('category') || '').toLowerCase();

  const activeCategoryCard = useMemo(
    () => HOME_CARDS.find((card) => card.category === selectedCategory) ?? HOME_CARDS[0],
    [selectedCategory],
  );

  const slides = useMemo<SlideData[]>(
    () =>
      (activeCategoryCard?.heroSlides ?? []).map((slide, idx) => ({
        title: slide.title || `${activeCategoryCard?.title ?? 'Category'} ${idx + 1}`,
        description:
          slide.description ||
          activeCategoryCard?.heroDescription ||
          'Premium custom packaging solutions tailored to your category with reliable production quality, flexible finishes, and fast turnaround.',
        ctaText: slide.ctaText || activeCategoryCard?.heroCtaText || 'Get a Free Quote',
        productImage: slide.productImage || activeCategoryCard?.image || '/assets/images/categories/rigid_box.jpeg',
      })),
    [activeCategoryCard],
  );

  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(0, 0);
  }, [selectedCategory]);

  return (
    <section className="w-full px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 pb-12 md:pb-16">
      {/* ── Hero container with rounded corners ── */}
      <div
        className="relative w-full rounded-[var(--radius-hero)] bg-[#1a3a2a]"
        style={{ height: '95vh', minHeight: '520px', maxHeight: '860px' }}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        {/* ── Navbar overlay ── */}
        <HomeHeroNavbar />

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
            initialSlide={0}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full h-full"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                <HeroSlide slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Pagination dots ── */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, idx) => (
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
