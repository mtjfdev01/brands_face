"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "@/components/hero/Hero";
import IndustryPackagingSlider from "@/components/common/IndustryPackagingSlider";
import WhyChooseUs, { type FeatureCard } from "@/components/common/WhyChooseUs";
// import AdvanceStudioShowCase from "@/components/common/AdvanceStudioShowCase";
import Footer from "@/components/home/Footer";
import QuickQuoteHeroSection from "@/components/home/QuickQuoteHeroSection";
import PackagingInfoTabs from "@/components/sale/PackagingInfoTabs";
import CategoryProductFilterTabs from "@/components/sale/CategoryProductFilterTabs";
import FAQs from "@/components/faqs/FAQs";
import {
  CATEGORY_TAB_ALL_ID,
  filterTeasersByTab,
  getCategoryHubFaqs,
  getCategoryPageConfig,
  resolveCategorySlug,
  teasersToIndustryItems,
} from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";

const whyFeatures: FeatureCard[] = [
  {
    id: "why-1",
    icon: "audit",
    title: "Free Packaging Audit",
    description:
      "We evaluate your packaging to uncover gaps affecting brand perception, customer trust, and sales.",
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
    "We design packaging that grabs attention, builds trust, and drives buying decisions through smart branding.",  },
  {
    id: "why-4",
    icon: "unboxing",
    title: "Premium Unboxing Experience",
    description:
    "We craft memorable packaging experiences that boost repeat purchases and word-of-mouth."
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
"We craft memorable packaging experiences that boost repeat purchases and word-of-mouth."  },
];

type Props = {
  categorySlug: string;
};

export default function SaleCategoryClient({ categorySlug }: Props) {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const canonical = resolveCategorySlug(categorySlug);
  const card = HOME_CARDS.find((c) => c.category === canonical);
  const config = canonical ? getCategoryPageConfig(canonical) : undefined;

  const defaultTabId = useMemo(() => {
    const tabs = config?.tabs ?? [];
    if (tabs.length === 0) return CATEGORY_TAB_ALL_ID;
    // Prefer "core_products" when a category provides it.
    const core = tabs.find((t) => t.id === "core_products")?.id;
    if (core) return core;
    // Otherwise prefer the first non-"all" tab so users land on real content.
    const firstNonAll = tabs.find((t) => t.id !== CATEGORY_TAB_ALL_ID)?.id;
    return firstNonAll ?? tabs[0]?.id ?? CATEGORY_TAB_ALL_ID;
  }, [config?.tabs]);
  const [activeTabId, setActiveTabId] = useState(defaultTabId);
  const [displayTabId, setDisplayTabId] = useState(defaultTabId);
  const [panelVisible, setPanelVisible] = useState(true);

  const hasProductTabs = Boolean(config?.tabs && config.tabs.length > 0);

  useEffect(() => {
    const tabs = config?.tabs ?? [];
    if (
      tabFromUrl &&
      tabs.length > 0 &&
      tabs.some((t) => t.id === tabFromUrl)
    ) {
      setActiveTabId(tabFromUrl);
      setDisplayTabId(tabFromUrl);
      setPanelVisible(true);
      return;
    }
    const initial = defaultTabId;
    setActiveTabId(initial);
    setDisplayTabId(initial);
    setPanelVisible(true);
  }, [canonical, defaultTabId, config?.tabs, tabFromUrl]);

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
    const preserveTabInProductLinks = displayTabId !== defaultTabId;
    return teasersToIndustryItems(filtered, preserveTabInProductLinks ? { fromTab: displayTabId } : undefined);
  }, [config, defaultTabId, displayTabId]);

  const categoryFaqs = useMemo(() => (canonical ? getCategoryHubFaqs(canonical) : []), [canonical]);

  const categoryTitle = card?.title ?? "Packaging";

  return (
    <main className="min-h-screen bg-[var(--color-page-bg)]">
      <Suspense fallback={<div className="w-full px-3 sm:px-4 lg:px-5 pb-12 md:pb-16 pt-0" />}>
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
      <PackagingInfoTabs />
      <WhyChooseUs
        heading="Why Choose BrandsFace?"
        subheading="We don’t just create packaging — we build brand perception. From strategy to design to manufacturing, BrandsFace helps your product stand out, build trust, and convert customers at first glance."
        features={whyFeatures}
      />

      {categoryFaqs.length > 0 && (
        <FAQs
          title="Frequently asked questions"
          subtitle={`Answers about ${categoryTitle} — materials, ordering, and how we work with your brand.`}
          faqs={categoryFaqs}
        />
      )}

      <QuickQuoteHeroSection
        backgroundSrc="/assets/images/quick_quote.jpg"
        formAlign="right"
        layout="band"
        hangOnTop
        className="border-t border-[#103a2a]/10"
      />

      <Footer />
    </main>
  );
}
