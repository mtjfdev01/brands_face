'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';

export default function HeroNavbar() {
  return (
    <nav className="relative z-20 w-full px-[var(--hero-padding-x)] pt-5 pb-2">
      <div className="flex items-center justify-between gap-4">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative w-[120px] h-[36px] sm:w-[140px] sm:h-[40px]">
            <Image
              src="/brands-face/logo.svg"
              alt="Brands Face"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* ── Search (hidden mobile) ── */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="primary" size="md" pill>
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      {/* ── Mobile search ── */}
      <div className="md:hidden mt-3 px-1">
        <SearchBar />
      </div>
    </nav>
  );
}
