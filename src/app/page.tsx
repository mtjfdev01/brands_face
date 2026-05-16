"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import CurtainOverlay from "@/components/home/CurtainOverlay";
import HomeHero from "@/components/home/HomeHero";

const HomeBelowHero = dynamic(() => import("@/components/home/HomeBelowHero"), {
  loading: () => null,
});

export default function HomePage() {
  const [productQuery, setProductQuery] = useState("");
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  return (
    <main className="relative bg-[var(--color-page-bg)]">
      <CurtainOverlay
        desktopSrc="/hero/hero banner.png"
        mobileSrc="/hero/hero mobile banner.png"
      />
      <HomeHero onReady={handleHeroReady} />
      {heroReady && (
        <HomeBelowHero
          productQuery={productQuery}
          onProductQueryChange={setProductQuery}
        />
      )}
    </main>
  );
}
