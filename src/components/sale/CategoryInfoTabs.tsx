"use client";

import { useId } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

/** Optional built-in icons (pass your own via `tabs[].icon`). */
export function InfoTabIconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8h16v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M4 6h16v1H4V6z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function InfoTabIconPuzzle({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 4h3a1 1 0 011 1v1.5a1.5 1.5 0 003 0V5a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-1.5a1.5 1.5 0 000 3H20a1 1 0 011 1v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1.5a1.5 1.5 0 00-3 0V20a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 011-1h1.5a1.5 1.5 0 000-3H4a1 1 0 01-1-1v-2a1 1 0 011-1h3a1 1 0 011 1v1.5a1.5 1.5 0 003 0V5a1 1 0 011-1z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function InfoTabIconWeight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a4 4 0 014 4v2h1a2 2 0 012 2v8H5v-8a2 2 0 012-2h1V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V7a2 2 0 00-2-2z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function InfoTabIconShipping({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 14h11v5H3v-5zm2 2v1h7v-1H5zm11-7l4 3v4h-3v2h-2v-2H14V9h2zm-1 2v3h2.5L17 11h-2z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export type CategoryInfoTabDef = {
  id: string;
  label: string;
  /** Optional icon (left of label). */
  icon?: React.ReactNode;
};

export type CategoryInfoTabPanel = {
  /** Left column — paragraph(s) or any JSX (half width on lg+ when paired with gallery) */
  paragraph: React.ReactNode;
  /** Right column — static block (omit if using gallerySlides) */
  gallery?: React.ReactNode;
  /** Right column — one entry per carousel slide (~60% width); preferred for image slider */
  gallerySlides?: React.ReactNode[];
};

type Props = {
  tabs: CategoryInfoTabDef[];
  /** Content per tab id — fill in as you add copy */
  panels: Partial<Record<string, CategoryInfoTabPanel>>;
  activeTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
  /** Visually hidden heading for the tablist (accessibility) */
  ariaLabel?: string;
};

function GalleryNavArrow({
  className,
  direction,
}: {
  className: string;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={[
        className,
        "grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm",
        "transition hover:border-gray-300 hover:shadow active:scale-95",
      ].join(" ")}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        {direction === "prev" ? (
          <path
            d="M14.5 5L8 12L14.5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9.5 5L16 12L9.5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

function InfoGalleryCarousel({ slides, navId }: { slides: React.ReactNode[]; navId: string }) {
  const prev = `info-gal-prev-${navId}`;
  const next = `info-gal-next-${navId}`;

  return (
    <div className="relative w-full min-w-0">
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: `.${prev}`, nextEl: `.${next}` }}
        slidesPerView="auto"
        spaceBetween={12}
        className="info-gallery-swiper !pb-1"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="!h-auto !w-auto shrink-0">
            <div className="box-content shrink-0">{slide}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-3 flex justify-end gap-2">
        <GalleryNavArrow direction="prev" className={prev} />
        <GalleryNavArrow direction="next" className={next} />
      </div>
    </div>
  );
}

/**
 * Reference-style tab block: top tab strip (icon + label), body = left paragraph + right gallery (50/50 on lg+).
 * Use `gallerySlides` for a carousel; optional `gallery` for static right column.
 */
export default function CategoryInfoTabs({
  tabs,
  panels,
  activeTabId,
  onTabChange,
  className = "",
  ariaLabel = "Category information sections",
}: Props) {
  const baseId = useId();
  const navUid = baseId.replace(/:/g, "");
  const active = panels[activeTabId];
  const panelId = `${baseId}-panel`;

  return (
    <section className={["mx-auto w-full max-w-6xl px-4 md:px-6", className].join(" ")}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-0 rounded-t-xl border border-b-0 border-gray-200 bg-[#f3f4f6] p-1 sm:flex-nowrap"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              id={`${baseId}-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={[
                "flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors duration-200 sm:px-4 sm:text-xs",
                selected
                  ? "bg-[#722f37] text-white shadow-sm"
                  : "bg-transparent text-gray-500 hover:bg-white/60 hover:text-gray-700",
              ].join(" ")}
            >
              {tab.icon ? (
                <span className={["shrink-0", selected ? "text-white" : "text-gray-400"].join(" ")}>{tab.icon}</span>
              ) : null}
              <span className="text-center leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeTabId}`}
        className="rounded-b-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 md:p-10"
      >
        {active ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-8 xl:gap-10">
            <div className="min-w-0 text-[15px] leading-relaxed text-gray-600 md:text-base [&_p+_p]:mt-4">
              {active.paragraph}
            </div>
            <div className="min-w-0 lg:max-w-none">
              {active.gallerySlides && active.gallerySlides.length > 0 ? (
                <InfoGalleryCarousel key={activeTabId} slides={active.gallerySlides} navId={navUid} />
              ) : active.gallery ? (
                active.gallery
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No content for this tab yet.</p>
        )}
      </div>
    </section>
  );
}
