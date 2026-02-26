'use client';

import React from 'react';
import Link from 'next/link';

interface SubLink {
  label: string;
  href: string;
  indent?: boolean;
}

interface ProductCategory {
  title: string;
  href: string;
  items: SubLink[];
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: 'Boxes',
    href: '#',
    items: [
      { label: 'Mailer Boxes', href: '#' },
      { label: 'Shipping Boxes', href: '#' },
      { label: 'Product Boxes', href: '#' },
      { label: 'Folding Cartons', href: '#', indent: true },
      { label: 'Rigid Boxes', href: '#', indent: true },
    ],
  },
  {
    title: 'Packaging Tubes',
    href: '#',
    items: [
      { label: 'Tube Boxes', href: '#' },
      { label: 'Mailing Tubes', href: '#' },
    ],
  },
  {
    title: 'Mailing Bags',
    href: '#',
    items: [
      { label: 'Poly Mailers', href: '#' },
      { label: 'Paper Mailing Bags', href: '#' },
    ],
  },
  {
    title: 'Accessories',
    href: '#',
    items: [
      { label: 'Tissue & wrapping paper', href: '#' },
      { label: 'Fillers', href: '#' },
      { label: 'Tapes', href: '#' },
      { label: 'Labels', href: '#' },
      { label: 'Stickers', href: '#' },
      { label: 'Other', href: '#' },
    ],
  },
  {
    title: 'Pouches',
    href: '#',
    items: [],
  },
  {
    title: 'Packaging Bags',
    href: '#',
    items: [
      { label: 'Paper Bags', href: '#' },
      { label: 'Cotton Bags', href: '#' },
    ],
  },
  {
    title: 'Envelopes',
    href: '#',
    items: [
      { label: 'Cardboard', href: '#' },
      { label: 'Padded', href: '#' },
    ],
  },
  {
    title: 'Food Packaging',
    href: '#',
    items: [
      { label: 'Pizza Boxes', href: '#' },
      { label: 'Cups and Cup Accessories', href: '#' },
    ],
  },
  {
    title: 'Containers',
    href: '#',
    items: [
      { label: 'Bottles', href: '#' },
      { label: 'Jars', href: '#' },
    ],
  },
  {
    title: 'Samples',
    href: '#',
    items: [],
  },
  {
    title: 'Bundles',
    href: '#',
    items: [],
  },
];

export default function ProductsPanel() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 p-8 max-h-[60vh] overflow-y-auto">
      {PRODUCT_CATEGORIES.map((cat) => (
        <div key={cat.title}>
          <Link
            href={cat.href}
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-[var(--color-hero-text)] hover:text-[var(--color-nav-active)] transition-colors"
          >
            {cat.title}
            <span className="text-xs opacity-50">&rarr;</span>
          </Link>

          {cat.items.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {cat.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`text-sm text-gray-600 hover:text-[var(--color-hero-text)] transition-colors ${
                      item.indent ? 'pl-3' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
