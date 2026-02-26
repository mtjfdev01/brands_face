"use client";

import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductInfo, { type ProductData } from "./ProductInfo";

type Props = {
  product: ProductData;
};

export default function ProductDetailPage({ product }: Props) {
  const defaultQty = product.quantities[0];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top navbar ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900 tracking-tight">
            Brands Cafe
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>

          <Link
            href="#"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Need help?
          </Link>
        </div>
      </header>

      {/* ── Main content: sticky left + scrollable right ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 pb-32">
          {/* Left: Sticky gallery */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-20">
              <ProductGallery images={product.images} alt={product.title} />
            </div>
          </div>

          {/* Right: Scrollable product info */}
          <div className="w-full lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>
      </main>

      {/* ── Bottom sticky bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Delivery info */}
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">Delivery</p>
            <p className="text-sm font-medium text-gray-900">
              {product.deliveryEstimate}
            </p>
          </div>

          {/* Quantity + price */}
          <div className="hidden sm:block text-right">
            <p className="text-xs text-gray-500">
              net / {defaultQty.qty} pieces
            </p>
            <p className="text-xl font-bold text-gray-900">
              ${defaultQty.total.toFixed(2)}
            </p>
          </div>

          {/* Mobile: compact price */}
          <div className="sm:hidden">
            <p className="text-lg font-bold text-gray-900">
              ${defaultQty.total.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">{defaultQty.qty} pieces</p>
          </div>

          {/* CTA button */}
          <button
            onClick={() => window.open("/studio", "_blank", "noopener,noreferrer")}
            className="shrink-0 bg-[var(--color-brand-accent)] text-white text-sm font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Customise design
          </button>
        </div>
      </div>
    </div>
  );
}
