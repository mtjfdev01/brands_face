import type { Metadata } from "next";
import ProductDetailPage from "@/components/product/ProductDetailPage";
import type { ProductData } from "@/components/product/ProductInfo";
import { ART_CARD_PRODUCTS } from "@/data/artCardProducts";
import { CORRUGATED_PRODUCTS } from "@/data/corrugatedProducts";
import { KRAFT_PRODUCTS } from "@/data/kraftProducts";
import { POUCH_PRODUCTS } from "@/data/pouchProducts";
import { CARRY_BAG_PRODUCTS } from "@/data/carryBagProducts";
import { RIGID_PRODUCTS } from "@/data/rigidProducts";
import { getProductFromCategoryConfig } from "@/data/categoryPages";


/* ── Fallback product for unknown slugs ── */
const FALLBACK_PRODUCT: ProductData = {
  slug: "product",
  title: "Custom Packaging Box",
  description:
    "Fully customisable packaging solution with premium materials and finishes. Contact us for a custom quote.",
  badges: ["CUSTOM DESIGN", "ECO-FRIENDLY"],
  deals: [],
  quantities: [
    { qty: 50, pricePerPiece: 1.0, total: 50.0 },
    { qty: 100, pricePerPiece: 0.85, total: 85.0 },
    { qty: 500, pricePerPiece: 0.6, total: 300.0 },
  ],
  sizes: [
    { label: "Standard", dimensions: "Custom dimensions available" },
  ],
  deliveryEstimate: "Contact us for estimate",
  images: ["/products/mailer.png"],
  features: [
    { label: "Material", value: "Various options" },
    { label: "Print", value: "Full colour" },
    { label: "Min. Order", value: "30 pieces" },
    { label: "Lead Time", value: "10–18 business days" },
  ],
  details:
    "We offer fully customisable packaging solutions for every need. Whether you need mailer boxes, rigid boxes, folding cartons, or something completely unique — our design team will work with you to create the perfect packaging.\n\nContact us for a free consultation and custom quote.",
};

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductFromCategoryConfig(slug) ?? FALLBACK_PRODUCT;
  return {
    title: `${product.title} | Brands Face`,
    description: product.description,
  };
}

/* ── Page ── */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product =
    getProductFromCategoryConfig(slug) ??
    { ...FALLBACK_PRODUCT, slug };

  return <ProductDetailPage product={product} />;
}
