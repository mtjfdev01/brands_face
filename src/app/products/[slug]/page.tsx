import type { Metadata } from "next";
import ProductDetailPage from "@/components/product/ProductDetailPage";
import type { ProductData } from "@/components/product/ProductInfo";
import {
  getCategoryProductBackContext,
  getMergedFaqsForProductDetail,
  getProductDetailBlocks,
  getProductFromCategoryConfig,
  getRelatedProductsInCategory,
} from "@/data/categoryPages";


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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const { slug } = await params;
  const product =
    getProductFromCategoryConfig(slug) ??
    { ...FALLBACK_PRODUCT, slug };

  const relatedProducts = getRelatedProductsInCategory(slug);
  const productFaqs = getMergedFaqsForProductDetail(slug);
  const detailBlocks = getProductDetailBlocks(slug);

  const rawFromTab = searchParams?.fromTab;
  const fromTabQuery =
    typeof rawFromTab === "string" ? rawFromTab : Array.isArray(rawFromTab) ? rawFromTab[0] : undefined;
  const categoryBack = getCategoryProductBackContext(slug, fromTabQuery);

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      productFaqs={productFaqs}
      detailBlocks={detailBlocks}
      categoryBack={categoryBack}
      preserveFromTabForRelated={categoryBack?.tabId}
    />
  );
}
