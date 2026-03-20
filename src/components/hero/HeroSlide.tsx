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
    <div className="relative w-full h-full">
      {/* ── Product image as full hero background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={slide.productImage}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── HomeHero-inspired color scheme + ambient glows ── */}
      <div className="absolute inset-0 z-10 bg-[#1a3a2a]/45" />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-[420px] w-[420px] rounded-full bg-emerald-900/30 blur-[110px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[320px] w-[320px] rounded-full bg-emerald-800/20 blur-[95px]" />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />

      {/* ── Content area ── */}
      <div className="relative z-20 h-full flex items-center px-[var(--hero-padding-x)]">
        <div className="flex items-center justify-between w-full h-full">
          {/* ── Left text block ── */}
          <div className="max-w-xl pt-4 pb-12 sm:pb-16">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.15] tracking-tight">
              {slide.title}
            </h2>

            <p className="mt-4 sm:mt-5 text-gray-200 text-sm sm:text-[15px] leading-relaxed max-w-md">
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
