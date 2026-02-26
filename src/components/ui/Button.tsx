'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  pill = true,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap';

  const variants: Record<string, string> = {
    primary:
      'bg-[var(--color-cta-bg)] text-[var(--color-cta-text)] hover:bg-[var(--color-cta-hover)] shadow-sm',
    outline:
      'border border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-cta-text)]',
    ghost:
      'text-[var(--color-nav-link)] hover:text-[var(--color-nav-link-hover)] hover:bg-black/5',
  };

  const sizes: Record<string, string> = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3 gap-2',
  };

  const radius = pill ? 'rounded-[var(--radius-pill)]' : 'rounded-lg';

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${radius} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
