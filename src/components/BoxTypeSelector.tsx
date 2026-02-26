'use client';

import { useEffect, useRef } from 'react';
import { useBoxStore } from '@/store/useBoxStore';
import {
  BoxType,
  BoxCategory,
  BOX_TYPE_CATALOG,
  CATEGORY_LABELS,
} from '@/types/box';

/* ================================================================== */
/*  SVG icons for each box type (simple line-art silhouettes)          */
/* ================================================================== */
const BOX_ICONS: Record<BoxType, React.ReactNode> = {
  mailer: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="8" y="14" width="32" height="24" rx="1" />
      <path d="M8 14l16-8 16 8" />
      <path d="M8 14l6-3v10" strokeDasharray="2 2" />
    </svg>
  ),
  shipping: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="8" y="16" width="32" height="22" rx="1" />
      <path d="M8 16l4-4h24l4 4" />
      <path d="M12 12l4 4M36 12l-4 4" />
      <path d="M20 16v-4M28 16v-4" />
    </svg>
  ),
  tuckEnd: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="10" y="10" width="28" height="28" rx="1" />
      <path d="M10 16h28M10 32h28" />
      <path d="M18 10v-4M30 10v-4M18 38v4M30 38v4" strokeDasharray="2 2" />
    </svg>
  ),
  product: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="10" y="18" width="28" height="22" rx="1" />
      <rect x="8" y="8" width="32" height="12" rx="1" />
      <path d="M12 20h24" strokeDasharray="3 2" />
    </svg>
  ),
  rigid: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="10" y="20" width="28" height="20" rx="1" strokeWidth={2.5} />
      <rect x="8" y="8" width="32" height="14" rx="1" strokeWidth={2.5} />
      <path d="M8 22h32" strokeWidth={1} strokeDasharray="3 2" />
    </svg>
  ),
  sleeve: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <path d="M10 8v32M38 8v32M10 8h28M10 40h28" />
      <path d="M16 4v4M32 4v4M16 40v4M32 40v4" strokeDasharray="1 2" opacity={0.5} />
    </svg>
  ),
  drawer: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="8" y="12" width="32" height="24" rx="1" />
      <rect x="12" y="16" width="24" height="16" rx="1" strokeDasharray="3 2" />
      <path d="M12 36l-2 4h28l-2-4" opacity={0.6} />
      <rect x="20" y="22" width="8" height="4" rx="1" />
    </svg>
  ),
  display: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <path d="M10 10v30h28V10" />
      <path d="M10 40h28" />
      <path d="M10 10h28" />
      <path d="M10 24h28" strokeDasharray="3 2" />
      <path d="M10 10v14" strokeWidth={2.2} />
      <path d="M38 10v14" strokeWidth={2.2} />
    </svg>
  ),
  gable: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="10" y="18" width="28" height="22" rx="1" />
      <path d="M10 18L24 6l14 12" />
      <path d="M20 6h8" strokeWidth={2.5} />
    </svg>
  ),
  hexagonal: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <path d="M24 4L40 14v20L24 44 8 34V14z" />
      <path d="M24 4v8M8 14l7 4M40 14l-7 4" opacity={0.4} />
    </svg>
  ),
  pillow: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <path d="M8 16C8 12 14 8 24 8s16 4 16 8v16c0 4-6 8-16 8S8 36 8 32V16z" />
      <path d="M8 16c0 3 6 6 16 6s16-3 16-6" strokeDasharray="3 2" />
    </svg>
  ),
  pizza: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-full h-full">
      <rect x="6" y="26" width="36" height="12" rx="1" />
      <path d="M6 26l4-14h28l4 14" />
      <path d="M10 12h28" strokeDasharray="3 2" />
    </svg>
  ),
};

/* ================================================================== */
/*  SELECTOR MODAL                                                     */
/* ================================================================== */
export default function BoxTypeSelector({ onClose }: { onClose: () => void }) {
  const { boxType, setBoxType } = useBoxStore();
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSelect = (type: BoxType) => {
    setBoxType(type);
    onClose();
  };

  // Group types by category
  const categories = Object.entries(CATEGORY_LABELS) as [BoxCategory, string][];
  const typesByCategory = categories.map(([cat, label]) => ({
    category: cat,
    label,
    types: (Object.entries(BOX_TYPE_CATALOG) as [BoxType, typeof BOX_TYPE_CATALOG[BoxType]][])
      .filter(([, info]) => info.category === cat)
      .map(([type]) => type),
  })).filter((g) => g.types.length > 0);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-20 overflow-y-auto"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="bg-panel border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <h2 className="text-base font-bold text-white">Select Box Type</h2>
            <p className="text-xs text-gray-500 mt-0.5">Choose a packaging style for your product</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {typesByCategory.map((group) => (
            <div key={group.category}>
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2.5 px-1">
                {group.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {group.types.map((type) => {
                  const info = BOX_TYPE_CATALOG[type];
                  const selected = boxType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleSelect(type)}
                      className={`group relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl text-center transition-all duration-200 ${
                        selected
                          ? 'bg-accent/15 ring-2 ring-accent shadow-lg shadow-accent/10 text-white'
                          : 'bg-surface/50 hover:bg-surface text-gray-300 hover:text-white hover:shadow-md'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors ${
                          selected ? 'text-accent-light' : 'text-gray-500 group-hover:text-gray-300'
                        }`}
                      >
                        {BOX_ICONS[type]}
                      </div>

                      {/* Label */}
                      <div>
                        <p className="text-xs sm:text-sm font-medium leading-tight">{info.label}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-tight hidden sm:block">
                          {info.description}
                        </p>
                      </div>

                      {/* Selected badge */}
                      {selected && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
