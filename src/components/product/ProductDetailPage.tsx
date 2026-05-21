"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import FAQs from "@/components/faqs/FAQs";
import type {
  CategoryFaqItem,
  CategoryProductBackContext,
  RelatedCategoryProduct,
} from "@/data/categoryPages";
import type { ProductDetailBlock } from "@/data/productDetailLongDescription";
import ProductGallery from "./ProductGallery";
import ProductInfo, { type ProductData, type QuantityOption } from "./ProductInfo";
import type { ProductLeadFormsHandle } from "./ProductLeadForms";
import RelatedProductsCarousel from "./RelatedProductsCarousel";
import ProductDetailScrollSection from "./ProductDetailScrollSection";

type Props = {
  product: ProductData;
  relatedProducts?: RelatedCategoryProduct[];
  productFaqs?: CategoryFaqItem[];
  detailBlocks?: ProductDetailBlock[];
  categoryBack?: CategoryProductBackContext;
  preserveFromTabForRelated?: string;
};

/**
 * PDP shell: sticky gallery + scrollable ProductInfo + fixed CTA bar.
 * Visual tokens align with catalog / home (forest #103a2a, mint CTA #1dd1a1).
 */
function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductDetailPage({
  product,
  relatedProducts = [],
  productFaqs = [],
  detailBlocks,
  categoryBack,
  preserveFromTabForRelated,
}: Props) {
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
      {/* Main: same max width as catalog-style pages */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {categoryBack && (
          <div className="pt-6">
            <Link
              href={categoryBack.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#103a2a] transition-colors hover:text-[#1dd1a1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1dd1a1]/70 focus-visible:ring-offset-2"
              aria-label={`Back to ${categoryBack.categoryTitle} ${categoryBack.label}`}
            >
              <BackArrowIcon className="h-5 w-5 shrink-0" />
              <span>
                Back to {categoryBack.categoryTitle} {categoryBack.label}
              </span>
            </Link>
          </div>
        )}
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

        <div className="pb-4">
          <ProductDetailScrollSection productTitle={product.title} blocks={detailBlocks} />
        </div>

        <RelatedProductsCarousel items={relatedProducts} preserveFromTab={preserveFromTabForRelated} />

        {productFaqs.length > 0 && (
          <FAQs
            title="Frequently asked questions"
            subtitle={`About ${product.title} — ordering, customisation, and timelines.`}
            faqs={productFaqs}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
