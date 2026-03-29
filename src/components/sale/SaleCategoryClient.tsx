"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Hero from "@/components/hero/Hero";
import IndustryPackagingSlider from "@/components/common/IndustryPackagingSlider";
import WhyChooseUs, { type FeatureCard } from "@/components/common/WhyChooseUs";
import AdvanceStudioShowCase from "@/components/common/AdvanceStudioShowCase";
import Footer from "@/components/home/Footer";
import CategoryInfoTabs, {
  InfoTabIconLayers,
  InfoTabIconPuzzle,
  InfoTabIconShipping,
  InfoTabIconWeight,
  type CategoryInfoTabPanel,
} from "@/components/sale/CategoryInfoTabs";
import CategoryProductFilterTabs from "@/components/sale/CategoryProductFilterTabs";
import {
  CATEGORY_TAB_ALL_ID,
  filterTeasersByTab,
  getCategoryPageConfig,
  resolveCategorySlug,
  teasersToIndustryItems,
} from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";

/** Info section below product grid — tab ids: materials | addons | paper | shipping */
const CATEGORY_INFO_TABS = [
  { id: "materials", label: "Materials", icon: <InfoTabIconLayers /> },
  { id: "addons", label: "Add-ons & finishing", icon: <InfoTabIconPuzzle /> },
  { id: "paper", label: "Paper weight", icon: <InfoTabIconWeight /> },
  { id: "shipping", label: "Shipping", icon: <InfoTabIconShipping /> },
] as const;

/** One slide per item — shown in the right column carousel */
function galleryPlaceholderSlides(count = 4) {
  return Array.from({ length: count }, (_, i) => (
    <div
      className="flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-[10px] font-medium text-gray-400 sm:h-[100px] sm:w-[100px] sm:text-xs"
      key={i}
    >
      Image {i + 1}
    </div>
  ));
}

const CATEGORY_INFO_PANELS: Record<string, CategoryInfoTabPanel> = {
  materials: {
    paragraph: (
      <p>
        Discover our range of high-quality packaging materials designed to tailor your packaging order to
        perfection. From sturdy cardboard boxes to eco-friendly options, we have the ideal materials for your
        unique needs. Elevate your brand and protect your products with our customizable packaging solutions.
      </p>
    ),
    gallerySlides: galleryPlaceholderSlides(4),
  },
  addons: {
    paragraph: <p>Add finishing and add-on copy will go here.</p>,
    gallerySlides: galleryPlaceholderSlides(4),
  },
  paper: {
    paragraph: <p>Paper weight and stock guidance will go here.</p>,
    gallerySlides: galleryPlaceholderSlides(4),
  },
  shipping: {
    paragraph: <p>Shipping options and timelines will go here.</p>,
    gallerySlides: galleryPlaceholderSlides(4),
  },
};

const whyFeatures: FeatureCard[] = [
  {
    id: "why-1",
    icon: "audit",
    title: "Free Packaging Audit",
    description:
      "We evaluate your current packaging and uncover hidden gaps that may be affecting your brand perception, customer trust, and sales performance.",
  },
  {
    id: "why-2",
    icon: "strategy",
    title: "Strategy-Driven Approach",
    description:
      "Every packaging solution we create is backed by research, market positioning, and customer psychology — not just visuals.",
  },
  {
    id: "why-3",
    icon: "design",
    title: "Design That Converts",
    description:
      "We design packaging that attracts attention, builds trust, and influences buying decisions through smart use of color, layout, and branding.",
  },
  {
    id: "why-4",
    icon: "unboxing",
    title: "Premium Unboxing Experience",
    description:
      "We craft packaging experiences that customers remember, increasing repeat purchases and organic word-of-mouth marketing.",
  },
  {
    id: "why-5",
    icon: "execution",
    title: "End-to-End Execution",
    description:
      "From concept to production, we handle everything — ensuring consistent quality, precision, and scalability for your brand.",
  },
  {
    id: "why-6",
    icon: "modern",
    title: "Built for Modern Brands",
    description:
      "Whether you sell online or in retail, our packaging is optimized for durability, presentation, and customer experience.",
  },
];

type Props = {
  categorySlug: string;
};

export default function SaleCategoryClient({ categorySlug }: Props) {
  const canonical = resolveCategorySlug(categorySlug);
  const card = HOME_CARDS.find((c) => c.category === canonical);
  const config = canonical ? getCategoryPageConfig(canonical) : undefined;

  const defaultTabId = config?.tabs?.[0]?.id ?? CATEGORY_TAB_ALL_ID;
  const [activeTabId, setActiveTabId] = useState(defaultTabId);
  const [displayTabId, setDisplayTabId] = useState(defaultTabId);
  const [panelVisible, setPanelVisible] = useState(true);
  const [infoTabId, setInfoTabId] = useState<string>("materials");

  const hasProductTabs = Boolean(config?.tabs && config.tabs.length > 0);

  useEffect(() => {
    const initial = config?.tabs?.[0]?.id ?? CATEGORY_TAB_ALL_ID;
    setActiveTabId(initial);
    setDisplayTabId(initial);
    setPanelVisible(true);
  }, [canonical, config?.tabs]);

  useEffect(() => {
    if (!hasProductTabs) return;
    if (activeTabId === displayTabId) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayTabId(activeTabId);
      return;
    }
    setPanelVisible(false);
  }, [hasProductTabs, activeTabId, displayTabId]);

  const handlePanelTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity") return;
      if (!hasProductTabs || panelVisible || activeTabId === displayTabId) return;
      setDisplayTabId(activeTabId);
      requestAnimationFrame(() => setPanelVisible(true));
    },
    [hasProductTabs, panelVisible, activeTabId, displayTabId],
  );

  const productItems = useMemo(() => {
    if (!config) return [];
    if (!config.tabs?.length) {
      return teasersToIndustryItems(config.products);
    }
    const filtered = filterTeasersByTab(config.products, config.tabs, displayTabId);
    return teasersToIndustryItems(filtered);
  }, [config, displayTabId]);

  const categoryTitle = card?.title ?? "Packaging";

  return (
    <main className="min-h-screen bg-[var(--color-page-bg)]">
      <Suspense fallback={<div className="w-full px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 pb-12 md:pb-16" />}>
        <Hero categorySlug={canonical} />
      </Suspense>

      {config?.tabs && config.tabs.length > 0 && (
        <CategoryProductFilterTabs tabs={config.tabs} activeId={activeTabId} onChange={setActiveTabId} />
      )}
      {hasProductTabs ? (
        <div
          className={[
            "motion-reduce:transition-none",
            "transition-[opacity,transform] duration-200 ease-out",
            "motion-reduce:duration-0",
            panelVisible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2",
          ].join(" ")}
          onTransitionEnd={handlePanelTransitionEnd}
        >
          <IndustryPackagingSlider
            title={categoryTitle}
            items={productItems}
            itemsKey={canonical ? `${canonical}-${displayTabId}` : displayTabId}
          />
        </div>
      ) : (
        <IndustryPackagingSlider title={categoryTitle} items={productItems} />
      )}

      {/* <AdvanceStudioShowCase /> */}
      <CategoryInfoTabs
        tabs={[...CATEGORY_INFO_TABS]}
        panels={CATEGORY_INFO_PANELS}
        activeTabId={infoTabId}
        onTabChange={setInfoTabId}
        className="mb-12 mt-4 md:mt-6"
        ariaLabel="Packaging options and information"
      />
      <WhyChooseUs
        heading="Why Choose BrandsFace?"
        subheading="We don’t just create packaging — we build brand perception. From strategy to design to manufacturing, BrandsFace helps your product stand out, build trust, and convert customers at first glance."
        features={whyFeatures}
      />

      <Footer />
    </main>
  );
}
