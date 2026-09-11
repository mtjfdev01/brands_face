"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import PageLoader from "@/components/common/PageLoader";
import Loader from "@/components/common/Loader";

const HomeBelowHero = dynamic(() => import("@/components/home/HomeBelowHero"), {
  loading: () => (
    <div className="flex min-h-[40vh] items-center justify-center bg-[var(--color-page-bg)]">
      <Loader tone="onLight" size={0.75} />
    </div>
  ),
});

export default function HomePage() {
  const [productQuery, setProductQuery] = useState("");
  const [heroReady, setHeroReady] = useState(false);
  const handleHeroReady = useCallback(() => setHeroReady(true), []);

  return (
    <main className="relative bg-[var(--color-page-bg)]">
      {!heroReady && <PageLoader overlay />}
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
