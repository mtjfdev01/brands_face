"use client";

import ComparisonSection from "@/components/home/ComparisonSection";
import MobileComparison from "@/components/home/MobileComparison";
import CategoryFocusCarousel from "@/components/home/CategoryFocusCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import NewHowItWorks from "@/components/home/NewHowItWorks";
import CreativeDirection from "@/components/home/CreativeDirection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";
import AdvanceStudioShowCase from "@/components/common/AdvanceStudioShowCase";
import AllProductsRowCarousel from "@/components/home/AllProductsRowCarousel";
import PackagingInfoTabs from "@/components/sale/PackagingInfoTabs";
import { CategoriesLayout } from "./categories_layout";

type Props = {
  productQuery: string;
  onProductQueryChange: (value: string) => void;
};

export default function HomeBelowHero({ productQuery, onProductQueryChange }: Props) {
  return (
    <>
     <CategoriesLayout />
      <div className="md:hidden">
        <CategoryFocusCarousel />
      </div>
      <section className="relative z-10 w-full bg-white px-3 py-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-[#103a2a]">
            Explore Products
          </h2>
          <div className="mx-auto mb-6 flex max-w-xl items-center gap-3">
            <div className="relative w-full">
              <input
                value={productQuery}
                onChange={(e) => onProductQueryChange(e.target.value)}
                placeholder="Search products…"
                className="h-12 w-full rounded-2xl border border-[#103a2a]/15 bg-white px-4 pr-11 text-sm text-[#103a2a] shadow-sm outline-none placeholder:text-[#103a2a]/45 focus:border-[#57d7aa]/70 focus:ring-4 focus:ring-[#57d7aa]/15"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#103a2a]/55">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21l-4.2-4.2"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AllProductsRowCarousel query={productQuery} />
      <NewHowItWorks />
      <div className="hidden md:block">
        <HowItWorks />
      </div>
      <PackagingInfoTabs className="mb-12 mt-12 md:mt-20" />
      <AdvanceStudioShowCase />
      <MobileComparison />
      <div className="hidden md:block">
        <ComparisonSection />
      </div>
      <CreativeDirection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
