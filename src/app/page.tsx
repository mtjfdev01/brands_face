"use client";

import CurtainOverlay from "@/components/home/CurtainOverlay";
import HomeHero from "@/components/home/HomeHero";
import CardFlowerSection from "@/components/home/CardFlowerSection";
import ScrollCards from "@/components/home/ScrollCards";
import ComparisonSection from "@/components/home/ComparisonSection";
import CreativeDirection from "@/components/home/CreativeDirection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/home/Footer";
import AdvanceStudioShowCase from "@/components/common/AdvanceStudioShowCase";

export default function HomePage() {
  return (
    <main className="relative bg-[var(--color-page-bg)]">
      <CurtainOverlay
        desktopSrc="/hero/hero banner.png"
        mobileSrc="/hero/hero mobile banner.png"
      />
      <HomeHero />
      <CardFlowerSection />
      <ScrollCards />
      <AdvanceStudioShowCase />
      <ComparisonSection />
      <CreativeDirection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
