"use client";

import { useState } from "react";
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

function buildMediaSlides(
  items: MediaSlide[],
  options?: { showLabel?: boolean; objectFit?: "cover" | "contain" },
) {
  const showLabel = options?.showLabel ?? true;
  const objectFit = options?.objectFit ?? "cover";
  return items.map((item, i) => (
    <figure
      key={`${item.src}-${i}`}
      className="flex w-[120px] shrink-0 flex-col items-center gap-2 sm:w-[140px]"
    >
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-xl bg-gray-50 sm:h-[140px] sm:w-[140px]">
        <Image
          src={item.src}
          alt={item.label}
          fill
          className={objectFit === "contain" ? "object-contain p-3" : "object-cover"}
          sizes="(max-width: 640px) 120px, 140px"
        />
      </div>
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

const CATEGORY_INFO_PANELS: Record<string, CategoryInfoTabPanel> = {
  materials: {
    paragraph: (
      <p>
        Discover our range of high-quality packaging materials designed to tailor your packaging order to
        perfection. From sturdy cardboard boxes to eco-friendly options, we have the ideal materials for your
        unique needs. Elevate your brand and protect your products with our customizable packaging solutions.
      </p>
    ),
    gallerySlides: buildMediaSlides(MATERIAL_SLIDES),
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
    gallerySlides: buildMediaSlides(ADDON_SLIDES),
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
    gallerySlides: buildMediaSlides(PAPER_SLIDES, { showLabel: false }),
  },
  shipping: {
    paragraph: (
      <p>
        We partner with trusted global carriers to ship your packaging safely and on schedule. Choose from
        express, standard, and freight options tailored to your order volume and destination — with tracking
        and delivery estimates shared at checkout.
      </p>
    ),
    gallerySlides: buildMediaSlides(SHIPPING_SLIDES, { showLabel: false, objectFit: "contain" }),
  },
};

type Props = {
  className?: string;
  ariaLabel?: string;
};

export default function PackagingInfoTabs({
  className = "mb-12 mt-4 md:mt-6",
  ariaLabel = "Packaging options and information",
}: Props) {
  const [activeTabId, setActiveTabId] = useState<string>("materials");

  return (
    <CategoryInfoTabs
      tabs={[...CATEGORY_INFO_TABS]}
      panels={CATEGORY_INFO_PANELS}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      className={className}
      ariaLabel={ariaLabel}
    />
  );
}
