'use client';

import React from 'react';
import Link from 'next/link';

const INDUSTRIES = [
  { label: 'E-commerce', href: '#' },
  { label: 'Apparel & Fashion', href: '#' },
  { label: 'Health & Beauty', href: '#' },
  { label: 'Home & Deco', href: '#' },
  { label: 'Hobby & Gifts', href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Supplements & CBD', href: '#' },
  { label: 'Food & Takeaway', href: '#' },
];

export default function IndustriesPanel() {
  return (
    <div className="flex gap-6 p-8">
      {/* ── Left: industry links ── */}
      <div className="w-48 shrink-0">
        <h3 className="text-lg font-bold text-[var(--color-hero-text)] mb-4">
          Industries
        </h3>
        <ul className="space-y-2.5">
          {INDUSTRIES.map((ind) => (
            <li key={ind.label}>
              <Link
                href={ind.href}
                className="text-sm text-gray-600 hover:text-[var(--color-hero-text)] transition-colors"
              >
                {ind.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#"
              className="text-sm font-medium text-[var(--color-nav-active)] hover:underline"
            >
              All industries
            </Link>
          </li>
        </ul>
      </div>

      {/* ── Right: promo cards ── */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
        {/* Brief card */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Brief
            </span>
            <h4 className="mt-2 text-lg font-bold text-[var(--color-hero-text)] leading-snug">
              Need something else?
              <br />
              Send us a brief and we&apos;ll sort you out
            </h4>
          </div>
          <Link
            href="#"
            className="mt-4 text-sm font-medium text-[var(--color-nav-active)] hover:underline"
          >
            Send us a brief
          </Link>
        </div>

        {/* Wholesale card */}
        <div className="bg-[#3B5BDB] rounded-2xl p-6 flex flex-col justify-between min-h-[220px] text-white">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
              Lower Your Costs
            </span>
            <h4 className="mt-2 text-xl font-bold leading-snug">
              Wholesale packaging
            </h4>
          </div>
          <Link
            href="#"
            className="mt-4 text-sm font-medium text-blue-100 hover:text-white hover:underline"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
