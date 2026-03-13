"use client";

import CurtainOverlay from "@/components/home/CurtainOverlay";
import HomeHero from "@/components/home/HomeHero";
import CardFlowerSection from "@/components/home/CardFlowerSection";
import ScrollCards from "@/components/home/ScrollCards";
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
      <ScrollCards />
      <CardFlowerSection />
      <ComparisonSection />
      <ProcessProcedureSection />
      <AdvanceStudioShowCase />
      <CreativeDirection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
