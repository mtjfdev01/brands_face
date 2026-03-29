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

      {/* Fixed bar — dark green band + mint CTA (navbar / catalog pattern) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#103a2a] shadow-[0_-8px_32px_rgba(16,58,42,0.28)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="hidden sm:block">
            <p className="text-xs text-white/60">Delivery</p>
            <p className="text-sm font-medium text-white">{product.deliveryEstimate}</p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-white/60">
              net / {footerTier.qty} pieces
            </p>
            <p className="text-xl font-bold text-white">
              ${footerTier.total.toFixed(2)}
            </p>
          </div>

          <div className="sm:hidden">
            <p className="text-lg font-bold text-white">
              ${footerTier.total.toFixed(2)}
            </p>
            <p className="text-xs text-white/60">{footerTier.qty} pieces</p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={handleFooterPrimary}
              className="rounded-full bg-[#1dd1a1] px-6 py-3 text-sm font-bold text-[#0f2f22] shadow-[0_6px_24px_rgba(29,209,161,0.35)] transition-all hover:bg-[#37dfb2] active:scale-[0.98] sm:px-8 sm:py-3.5"
            >
              Place order
            </button>
            <button
              type="button"
              onClick={() => window.open("/studio", "_blank", "noopener,noreferrer")}
              className="text-xs font-semibold text-white/70 underline-offset-2 transition-colors hover:text-white hover:underline"
            >
              3D mockup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
