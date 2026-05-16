"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import CategoryInfoTabs, {
  InfoTabIconLayers,
  InfoTabIconPuzzle,
  InfoTabIconShipping,
  InfoTabIconWeight,
  type CategoryInfoTabPanel,
} from "@/components/sale/CategoryInfoTabs";

const CATEGORY_INFO_TABS = [
  { id: "materials", label: "Materials", icon: <InfoTabIconLayers /> },
  { id: "addons", label: "Add-ons & finishing", icon: <InfoTabIconPuzzle /> },
  { id: "paper", label: "Paper weight", icon: <InfoTabIconWeight /> },
  { id: "shipping", label: "Shipping", icon: <InfoTabIconShipping /> },
] as const;

const FINISHING_BASE = "/assets/images/finishing%20materials";

type MediaSlide = { src: string; label: string };

type LightboxState = {
  item: MediaSlide;
  objectFit: "cover" | "contain";
};

function MediaSlideLightbox({
  state,
  onClose,
}: {
  state: LightboxState;
  onClose: () => void;
}) {
  const { item, objectFit } = state;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[85vh] w-full max-w-[min(900px,100%)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative aspect-square w-full max-h-[70vh] bg-gray-50 sm:max-h-[75vh]">
          <Image
            src={item.src}
            alt={item.label}
            fill
            className={objectFit === "contain" ? "object-contain p-6" : "object-cover"}
            sizes="(max-width: 900px) 90vw, 900px"
            priority
          />
        </div>
        <p className="border-t border-gray-100 px-5 py-3 text-center text-sm font-medium text-gray-800">
          {item.label}
        </p>
      </div>
    </div>
  );
}

function buildMediaSlides(
  items: MediaSlide[],
  onImageClick: (item: MediaSlide, objectFit: "cover" | "contain") => void,
  options?: { showLabel?: boolean; objectFit?: "cover" | "contain" },
) {
  const showLabel = options?.showLabel ?? true;
  const objectFit = options?.objectFit ?? "cover";
  return items.map((item, i) => (
    <figure
      key={`${item.src}-${i}`}
      className="flex w-[132px] shrink-0 flex-col items-center gap-2 sm:w-[140px]"
    >
      <button
        type="button"
        onClick={() => onImageClick(item, objectFit)}
        className="relative h-[132px] w-full cursor-zoom-in overflow-hidden rounded-xl bg-gray-50 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#722f37]/50 sm:h-[140px] sm:w-[140px]"
        aria-label={`View ${item.label} full size`}
      >
        <Image
          src={item.src}
          alt=""
          fill
          className={objectFit === "contain" ? "object-contain p-3" : "object-cover"}
          sizes="(max-width: 640px) 132px, 140px"
        />
      </button>
      {showLabel && (
        <figcaption className="text-center text-xs font-medium text-gray-700 sm:text-sm">
          {item.label}
        </figcaption>
      )}
    </figure>
  ));
}

const MATERIAL_SLIDES: MediaSlide[] = [
  { src: `${FINISHING_BASE}/imgi_77_kraft.jpg`, label: "Kraft" },
  { src: `${FINISHING_BASE}/imgi_78_rigid.jpg`, label: "Rigid" },
  { src: `${FINISHING_BASE}/imgi_79_textured-linen.jpg`, label: "Textured Linen" },
  { src: `${FINISHING_BASE}/imgi_73_white.jpg`, label: "White" },
  { src: `${FINISHING_BASE}/imgi_47_card-stock.webp`, label: "Card Stock" },
  { src: `${FINISHING_BASE}/imgi_75_corrugated.jpg`, label: "Corrugated" },
  { src: `${FINISHING_BASE}/imgi_88_foiling.jpg`, label: "Foil" },
];

const ADDON_SLIDES: MediaSlide[] = [
  { src: `${FINISHING_BASE}/imgi_84_raised-uv.jpg`, label: "Raised UV" },
  { src: `${FINISHING_BASE}/imgi_85_spot-uv.jpg`, label: "Spot UV" },
  { src: `${FINISHING_BASE}/imgi_80_glass-lamination.jpg`, label: "Gloss Lamination" },
  { src: `${FINISHING_BASE}/imgi_82_matte-lamination.jpg`, label: "Matte Lamination" },
  { src: `${FINISHING_BASE}/imgi_81_holographic-foiling.jpg`, label: "Holographic Foiling" },
];

const PAPER_SLIDES: MediaSlide[] = [
  { src: `${FINISHING_BASE}/imgi_43_silk-lamination.jpg`, label: "8 pt" },
  { src: `${FINISHING_BASE}/imgi_86_s1.png`, label: "10 pt" },
  { src: `${FINISHING_BASE}/imgi_88_foiling.jpg`, label: "14 pt" },
  { src: `${FINISHING_BASE}/imgi_78_rigid.jpg`, label: "16 pt" },
  { src: `${FINISHING_BASE}/imgi_90_s5.png`, label: "18 pt" },
  { src: `${FINISHING_BASE}/imgi_91_s6.png`, label: "20 pt" },
  { src: `${FINISHING_BASE}/imgi_88_s3.png`, label: "24 pt" },
  { src: `${FINISHING_BASE}/imgi_89_s4.png`, label: "28 pt" },
];

const SHIPPING_SLIDES: MediaSlide[] = [
  { src: `${FINISHING_BASE}/download.svg`, label: "Shipping partner" },
  { src: `${FINISHING_BASE}/download%20(1).svg`, label: "Shipping partner" },
  { src: `${FINISHING_BASE}/ups.png`, label: "UPS" },
];

type Props = {
  className?: string;
  ariaLabel?: string;
};

export default function PackagingInfoTabs({
  className = "mb-12 mt-4 md:mt-6",
  ariaLabel = "Packaging options and information",
}: Props) {
  const [activeTabId, setActiveTabId] = useState<string>("materials");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((item: MediaSlide, objectFit: "cover" | "contain") => {
    setLightbox({ item, objectFit });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const panels = useMemo<Record<string, CategoryInfoTabPanel>>(
    () => ({
      materials: {
        paragraph: (
          <p>
            Discover our range of high-quality packaging materials designed to tailor your packaging order to
            perfection. From sturdy cardboard boxes to eco-friendly options, we have the ideal materials for your
            unique needs. Elevate your brand and protect your products with our customizable packaging solutions.
          </p>
        ),
        gallerySlides: buildMediaSlides(MATERIAL_SLIDES, openLightbox),
      },
      addons: {
        paragraph: (
          <p>
            Elevate your packaging with our premium add-ons. Choose from lamination, foiling, coatings, and other
            finishing options to create packaging that reflects your brand&rsquo;s elegance and style. Tailor your
            order to your exact preferences for a distinctive and eye-catching presentation and make a lasting
            impression.
          </p>
        ),
        gallerySlides: buildMediaSlides(ADDON_SLIDES, openLightbox),
      },
      paper: {
        paragraph: (
          <p>
            Select from a range of packaging paper thicknesses, from 8 pt to 28 pt, to meet your specific needs.
            Rigid boxes demand greater thickness for durability and luxury, capable of supporting your
            product&rsquo;s weight. Make a wise choice that aligns with your budget while ensuring your packaging
            exudes quality and resilience.
          </p>
        ),
        gallerySlides: buildMediaSlides(PAPER_SLIDES, openLightbox, { showLabel: false }),
      },
      shipping: {
        paragraph: (
          <p>
            We partner with trusted global carriers to ship your packaging safely and on schedule. Choose from
            express, standard, and freight options tailored to your order volume and destination — with tracking
            and delivery estimates shared at checkout.
          </p>
        ),
        gallerySlides: buildMediaSlides(SHIPPING_SLIDES, openLightbox, {
          showLabel: false,
          objectFit: "contain",
        }),
      },
    }),
    [openLightbox],
  );

  return (
    <>
      <CategoryInfoTabs
        tabs={[...CATEGORY_INFO_TABS]}
        panels={panels}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        className={className}
        ariaLabel={ariaLabel}
      />
      {lightbox && <MediaSlideLightbox state={lightbox} onClose={closeLightbox} />}
    </>
  );
}
