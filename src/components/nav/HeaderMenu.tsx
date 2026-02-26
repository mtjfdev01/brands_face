'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import ProductsPanel from './megamenu/ProductsPanel';
import IndustriesPanel from './megamenu/IndustriesPanel';
import InspirationsPanel from './megamenu/InspirationsPanel';

/* ── Panel registry ── */
const PANELS: Record<string, React.ReactNode> = {
  products: <ProductsPanel />,
  industries: <IndustriesPanel />,
  inspirations: <InspirationsPanel />,
};

/* ── Menu items ── */
interface MenuItem {
  label: string;
  href: string;
  panelId?: string; // key into PANELS
  active?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Products', href: '#', panelId: 'products' },
  { label: 'Industries', href: '#', panelId: 'industries' },
  { label: 'Solutions', href: '#' },
  { label: 'Inspirations', href: '#', panelId: 'inspirations' },
  { label: 'Samples', href: '#' },
  { label: 'Deals', href: '#' },
  { label: 'Get a quote', href: '/quote' },
  { label: 'Contact', href: '#' },
];

export default function HeaderMenu() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Delayed close so the cursor can travel from link → panel */
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenPanel(null), 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleEnter = useCallback(
    (panelId?: string) => {
      cancelClose();
      setOpenPanel(panelId ?? null);
    },
    [cancelClose],
  );

  const handleLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Close on click outside */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const panelContent = openPanel ? PANELS[openPanel] : null;

  return (
    <div ref={menuRef} className="relative z-40 w-full px-[var(--hero-padding-x)]">
      {/* ── Menu row ── */}
      <div className="border-b border-black/8">
        <div className="flex items-center gap-0.5 py-2 overflow-x-auto mega-scrollbar-hide">
          {MENU_ITEMS.map((item) => {
            const isOpen = openPanel === item.panelId;
            const isActive = item.active || isOpen;

            return (
              <div
                key={item.label}
                onMouseEnter={() => handleEnter(item.panelId)}
                onMouseLeave={handleLeave}
                className="shrink-0"
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.panelId) {
                      e.preventDefault();
                      setOpenPanel(isOpen ? null : item.panelId);
                    }
                  }}
                  className={`inline-block whitespace-nowrap px-3 py-2 text-[13px] font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[var(--color-nav-active)]'
                      : 'text-[var(--color-nav-link)] hover:text-[var(--color-nav-link-hover)]'
                  }`}
                >
                  {item.label}
                  {/* Underline indicator for active */}
                  {isActive && (
                    <span className="block h-[2px] mt-0.5 bg-[var(--color-nav-active)] rounded-full" />
                  )}
                </Link>
              </div>
            );
          })}

          {/* Right CTA */}
          <div className="ml-auto shrink-0 hidden lg:block">
            <Link
              href="/studio"
              className="inline-flex items-center gap-1.5 bg-[var(--color-nav-active)] text-white text-xs font-semibold px-4 py-2 rounded-[var(--radius-pill)] hover:opacity-90 transition-opacity"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Design in Editor
            </Link>
          </div>
        </div>
      </div>

      {/* ── Dropdown panel ── */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={handleLeave}
        className={`absolute left-0 right-0 top-full bg-white rounded-b-[20px] shadow-2xl shadow-black/10 border-t border-gray-100 transition-all duration-200 origin-top ${
          panelContent
            ? 'opacity-100 scale-y-100 pointer-events-auto'
            : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(95vh - 140px)', overflowY: 'auto' }}
      >
        {panelContent}
      </div>

      {/* scrollbar hide */}
      <style jsx>{`
        .mega-scrollbar-hide::-webkit-scrollbar { display: none; }
        .mega-scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}
