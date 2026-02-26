'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface InspirationProject {
  name: string;
  category: string;
  image: string;
  href: string;
}

const PROJECTS: InspirationProject[] = [
  {
    name: 'Djuce',
    category: 'Alcoholic beverages',
    image: '/inspirations/djuce.jpg',
    href: '#',
  },
  {
    name: 'Kuyichi',
    category: 'Apparel & Fashion',
    image: '/inspirations/kuyichi.jpg',
    href: '#',
  },
  {
    name: 'Oase',
    category: 'Health & Beauty',
    image: '/inspirations/oase.jpg',
    href: '#',
  },
  {
    name: 'Psi Bufet',
    category: 'Food',
    image: '/inspirations/psi-bufet.jpg',
    href: '#',
  },
  {
    name: 'Your KAYA',
    category: 'Health & Beauty',
    image: '/inspirations/your-kaya.jpg',
    href: '#',
  },
  {
    name: 'Hemp Juice',
    category: 'Supplements & CBD',
    image: '/inspirations/hemp-juice.jpg',
    href: '#',
  },
  {
    name: 'Fluus',
    category: 'Apparel & Fashion',
    image: '/inspirations/fluus.jpg',
    href: '#',
  },
  {
    name: 'XLASH',
    category: 'Health & Beauty',
    image: '/inspirations/xlash.jpg',
    href: '#',
  },
];

/* ── Color palette for placeholder thumbnails ── */
const PLACEHOLDER_COLORS = [
  'bg-amber-100',
  'bg-stone-200',
  'bg-sky-100',
  'bg-rose-100',
  'bg-emerald-100',
  'bg-indigo-100',
  'bg-cyan-100',
  'bg-violet-100',
];

export default function InspirationsPanel() {
  return (
    <div className="p-8">
      <h3 className="text-lg font-bold text-[var(--color-hero-text)] mb-5">
        Inspirations
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PROJECTS.map((project, idx) => (
          <Link
            key={project.name}
            href={project.href}
            className="group block"
          >
            {/* Image / placeholder */}
            <div
              className={`relative aspect-[4/3] rounded-xl overflow-hidden ${PLACEHOLDER_COLORS[idx]} transition-shadow group-hover:shadow-lg`}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={(e) => {
                  /* Hide broken image — placeholder color shows through */
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Placeholder icon when image missing */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>

            {/* Label */}
            <div className="mt-2.5">
              <p className="text-sm font-semibold text-[var(--color-hero-text)] group-hover:text-[var(--color-nav-active)] transition-colors">
                {project.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{project.category}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="inline-block mt-5 text-sm font-medium text-[var(--color-nav-active)] hover:underline"
      >
        More inspirations
      </Link>
    </div>
  );
}
