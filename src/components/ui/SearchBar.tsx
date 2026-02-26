'use client';

import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search...',
  className = '',
}: SearchBarProps) {
  return (
    <div
      className={`relative flex items-center w-full max-w-[680px] ${className}`}
    >
      {/* Search icon */}
      <svg
        className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full pl-12 pr-5 py-3 bg-[var(--color-nav-search-bg)] border border-[var(--color-nav-search-border)] rounded-[var(--radius-pill)] text-sm text-[var(--color-hero-text)] placeholder:text-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 transition-all"
      />
    </div>
  );
}
