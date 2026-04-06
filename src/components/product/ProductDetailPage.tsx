"use client";

import { useEffect, useRef, useState } from "react";
import HomeHeroNavbar from "@/components/nav/HomeHeroNavbar";
import ProductGallery from "./ProductGallery";
import ProductInfo, { type ProductData, type QuantityOption } from "./ProductInfo";
import type { ProductLeadFormsHandle } from "./ProductLeadForms";

type Props = {
  product: ProductData;
};

/**
 * PDP shell: sticky gallery + scrollable ProductInfo + fixed CTA bar.
 * Visual tokens align with catalog / home (forest #103a2a, mint CTA #1dd1a1).
 */
export default function ProductDetailPage({ product }: Props) {
  const leadFormsRef = useRef<ProductLeadFormsHandle | null>(null);
  const [footerTier, setFooterTier] = useState<QuantityOption>(() => product.quantities[0]);

  useEffect(() => {
    setFooterTier(product.quantities[0]);
  }, [product.slug]);

  const handleFooterPrimary = () => {
    leadFormsRef.current?.openPlaceOrder();
  };

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-[#103a2a]">
      <HomeHeroNavbar variant="layout" />

      {/* Main: same max width as catalog-style pages */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 py-8 pb-32 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-28">
              <ProductGallery images={product.images} alt={product.title} />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <ProductInfo
              key={product.slug}
              product={product}
              onQuantityTierChange={setFooterTier}
              leadFormsRef={leadFormsRef}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
