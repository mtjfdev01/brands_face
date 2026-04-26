"use client";

import CurtainOverlay from "@/components/home/CurtainOverlay";
import HomeHero from "@/components/home/HomeHero";
import ComparisonSection from "@/components/home/ComparisonSection";
import ProcessProcedureSection from "@/components/home/ProcessProcedureSection";
import CreativeDirection from "@/components/home/CreativeDirection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";
import AdvanceStudioShowCase from "@/components/common/AdvanceStudioShowCase";
import CategoryFocusCarousel from "@/components/home/CategoryFocusCarousel";

export default function HomePage() {
  return (
    <main className="relative bg-[var(--color-page-bg)]">
      <CurtainOverlay
        desktopSrc="/hero/hero banner.png"
        mobileSrc="/hero/hero mobile banner.png"
      />
      <HomeHero />
      {/* Mobile: category cards below hero copy; desktop flower lives inside HomeHero (ScrollCards) */}
      <div className="border-t border-white/10 px-3 pb-12 pt-2 lg:hidden">
        <CategoryFocusCarousel />
      </div>
      <ComparisonSection />
      <ProcessProcedureSection />
      <AdvanceStudioShowCase />
      <CreativeDirection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
