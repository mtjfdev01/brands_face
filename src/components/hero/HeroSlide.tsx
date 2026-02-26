'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export interface SlideData {
  title: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  bgImage: string;
  productImage: string;
  align?: 'left' | 'center';
}

interface HeroSlideProps {
  slide: SlideData;
}

export default function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="relative w-full h-full">
      {/* ── Background image (full cover) ── */}
      <Image
        src={slide.bgImage}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* ── Subtle readability overlay on the left ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-hero-overlay)] via-transparent to-transparent" />

      {/* ── Content area ── */}
      <div className="relative z-10 h-full flex items-center px-[var(--hero-padding-x)]">
        <div className="flex items-center justify-between w-full h-full">
          {/* ── Left text block ── */}
          <div className="max-w-xl pt-4 pb-12 sm:pb-16">
            <h2 className="text-[var(--color-hero-text)] text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight">
              {slide.title}
            </h2>

            <p className="mt-4 sm:mt-5 text-[var(--color-hero-desc)] text-sm sm:text-[15px] leading-relaxed max-w-md">
              {slide.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <Button variant="primary" size="lg" pill>
                {slide.ctaText}
              </Button>
            </div>
          </div>

          {/* ── Product cutout image (bottom-right) ── */}
          <div className="hidden sm:block absolute right-4 sm:right-6 lg:right-10 bottom-0 pointer-events-none">
            <div className="relative w-[260px] h-[280px] sm:w-[320px] sm:h-[340px] md:w-[400px] md:h-[380px] lg:w-[480px] lg:h-[420px] xl:w-[540px] xl:h-[460px]">
              <Image
                src={slide.productImage}
                alt={slide.title}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 540px"
                priority
              />
            </div>
          </div>

          {/* ── Mobile product image ── */}
          <div className="sm:hidden absolute right-2 bottom-2 pointer-events-none opacity-80">
            <div className="relative w-[180px] h-[180px]">
              <Image
                src={slide.productImage}
                alt={slide.title}
                fill
                className="object-contain object-bottom"
                sizes="180px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
