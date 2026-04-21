'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export interface SlideData {
  title: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  productImage: string;
  align?: 'left' | 'center';
}

interface HeroSlideProps {
  slide: SlideData;
}

export default function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="relative h-full min-h-full w-full min-w-0 flex-1 self-stretch">
      {/* ── Product image as full hero background ── */}
      <div className="absolute inset-0 z-0 min-h-full pointer-events-none">
        <Image
          src={slide.productImage}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Content area (text shadow only — no scrim over the photo) ── */}
      <div className="relative z-20 h-full flex items-center px-[var(--hero-padding-x)]">
        <div className="flex items-center justify-between w-full h-full">
          {/* ── Left text block ── */}
          <div className="max-w-xl pt-4 pb-12 sm:pb-16">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              {slide.title}
            </h2>

            <p className="mt-4 sm:mt-5 text-gray-200 text-sm sm:text-[15px] leading-relaxed max-w-md [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              {slide.description}
            </p>

            <div className="mt-6 sm:mt-8">
              <Button variant="primary" size="lg" pill>
                {slide.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
