'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useSearchParams } from 'next/navigation';

import 'swiper/css';

import HomeHeroNavbar from '@/components/nav/HomeHeroNavbar';
import HeroSlide, { type SlideData } from '@/components/hero/HeroSlide';
import { getCategoryPageConfig } from '@/data/categoryPages';
import { HOME_CARDS } from '@/data/homeCards';

type HeroProps = {
  /** When set (e.g. from `/category/[category]`), overrides `?category=` for the active card. */
  categorySlug?: string | null;
};

export default function Hero({ categorySlug: categorySlugProp }: HeroProps) {
  const searchParams = useSearchParams();
  const swiperRef = useRef<SwiperType | null>(null);
  const fromQuery = (searchParams.get('category') || '').toLowerCase();
  const fromProp = (categorySlugProp || '').toLowerCase();
  const selectedCategory = fromProp || fromQuery;

  const activeCategoryCard = useMemo(
    () => HOME_CARDS.find((card) => card.category === selectedCategory) ?? HOME_CARDS[0],
    [selectedCategory],
  );

  const slides = useMemo<SlideData[]>(
    () => {
      const activeIndex = HOME_CARDS.findIndex(
        (card) => card.category === activeCategoryCard?.category,
      );
      const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
      const pageCfg = activeCategoryCard
        ? getCategoryPageConfig(activeCategoryCard.category)
        : undefined;
      const banners = pageCfg?.bannerImages?.filter(Boolean) ?? [];

      return (activeCategoryCard?.heroSlides ?? []).map((slide, idx) => ({
        title: slide.title || `${activeCategoryCard?.title ?? 'Category'} ${idx + 1}`,
        description:
          slide.description ||
          activeCategoryCard?.heroDescription ||
          'Premium custom packaging solutions tailored to your category with reliable production quality, flexible finishes, and fast turnaround.',
        ctaText: slide.ctaText || activeCategoryCard?.heroCtaText || 'Get a Free Quote',
        productImage:
          slide.productImage ||
          (banners.length > 0 ? banners[idx % banners.length] : undefined) ||
          HOME_CARDS[(safeActiveIndex + idx) % HOME_CARDS.length]?.image ||
          activeCategoryCard?.image ||
          '/hero/slide1-bg.jpg',
      }));
    },
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
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop
            speed={1100}
            initialSlide={0}
            resistanceRatio={0.85}
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
