import type { Metadata } from "next";
import ProductDetailPage from "@/components/product/ProductDetailPage";
import type { ProductData } from "@/components/product/ProductInfo";

/* ── Sample product database (replace with CMS/API later) ── */
const PRODUCTS: Record<string, ProductData> = {
  mailer: {
    slug: "mailer",
    title: "Custom Mailer Box",
    description:
      "Fully customisable mailer box with options for print, material, and finish — from subtle recycled tones to vibrant saturated colours or premium matte and foil finishes, applied outside, inside, or both.",
    badges: ["3D EDITOR", "ECO-FRIENDLY", "LOYALTY PROGRAM"],
    deals: [
      {
        title: "A perfect match for your brand – 20% off",
        description:
          "This Valentine's Day, fall in love with your packaging all over again. Enjoy 20% off all products and treat your brand to something special.",
        code: "LOVEPACK",
      },
      {
        title: "Free shipping on orders over $200",
        description:
          "Order now and enjoy complimentary shipping on all orders above $200. Fast turnaround, no hidden fees.",
        code: "FREESHIP200",
      },
      {
        title: "Bulk discount — save 15%",
        description:
          "Ordering 500+ pieces? Get 15% off automatically applied at checkout. Perfect for large campaigns.",
        code: "BULK15",
      },
    ],
    quantities: [
      { qty: 30, pricePerPiece: 0.9, total: 27.0 },
      { qty: 50, pricePerPiece: 0.8, total: 40.0 },
      { qty: 100, pricePerPiece: 0.65, total: 65.0 },
      { qty: 250, pricePerPiece: 0.52, total: 130.0 },
      { qty: 500, pricePerPiece: 0.42, total: 210.0 },
      { qty: 1000, pricePerPiece: 0.35, total: 350.0 },
    ],
    sizes: [
      { label: "F23", dimensions: "9.2 x 9.2 x 5 cm" },
      { label: "F32", dimensions: "15.5 x 11 x 4.5 cm" },
      { label: "F42", dimensions: "20 x 15 x 7.5 cm" },
      { label: "F52", dimensions: "25 x 20 x 10 cm" },
      { label: "F62", dimensions: "30 x 25 x 12 cm" },
      { label: "F72", dimensions: "40 x 30 x 15 cm" },
    ],
    deliveryEstimate: "Feb 26 – Mar 10",
    images: [
      "/products/mailer-1.jpg",
      "/products/mailer-2.jpg",
      "/products/mailer-3.jpg",
      "/products/mailer-4.jpg",
      "/products/mailer-5.jpg",
      "/products/mailer-6.jpg",
    ],
    features: [
      { label: "Material", value: "Corrugated Cardboard (E-flute)" },
      { label: "Print", value: "Full colour (CMYK + White)" },
      { label: "Finish", value: "Matte / Gloss / Foil" },
      { label: "Closing", value: "Tuck-top with front flap" },
      { label: "Min. Order", value: "30 pieces" },
      { label: "Lead Time", value: "10–14 business days" },
    ],
    details:
      "Our Custom Mailer Box is the most popular choice for e-commerce brands looking to create a memorable unboxing experience. Made from durable corrugated E-flute cardboard, it provides excellent protection while remaining lightweight for shipping.\n\nAvailable in 6 standard sizes or fully custom dimensions. Print your design on the outside, inside, or both — with options for matte lamination, gloss UV coating, or luxurious foil stamping.\n\nAll our mailer boxes ship flat to save storage space and are made from 100% recyclable materials. They are FSC-certified and produced in our US-based manufacturing facility.\n\nNeed a different shape or custom insert? Contact our design team for a free consultation and we'll create a bespoke solution tailored to your product.",
  },
  rigid: {
    slug: "rigid",
    title: "Custom Rigid Box",
    description:
      "Premium rigid boxes with thick walls and a luxurious feel. Perfect for high-end products, gifts, and subscription boxes that demand a first-class presentation.",
    badges: ["3D EDITOR", "PREMIUM QUALITY", "LUXURY FINISH"],
    deals: [
      {
        title: "Launch offer — 10% off rigid boxes",
        description:
          "Try our new rigid box line and get 10% off your first order. Premium quality at an introductory price.",
        code: "RIGID10",
      },
    ],
    quantities: [
      { qty: 50, pricePerPiece: 3.5, total: 175.0 },
      { qty: 100, pricePerPiece: 2.9, total: 290.0 },
      { qty: 250, pricePerPiece: 2.4, total: 600.0 },
      { qty: 500, pricePerPiece: 1.95, total: 975.0 },
    ],
    sizes: [
      { label: "R20", dimensions: "10 x 10 x 5 cm" },
      { label: "R30", dimensions: "15 x 15 x 8 cm" },
      { label: "R40", dimensions: "20 x 20 x 10 cm" },
      { label: "R50", dimensions: "25 x 20 x 12 cm" },
    ],
    deliveryEstimate: "Mar 5 – Mar 20",
    images: [
      "/products/rigid-1.jpg",
      "/products/rigid-2.jpg",
      "/products/rigid-3.jpg",
    ],
    features: [
      { label: "Material", value: "Greyboard (2mm) + Art Paper Wrap" },
      { label: "Print", value: "Full colour (CMYK)" },
      { label: "Finish", value: "Soft-touch / Foil / Emboss" },
      { label: "Closing", value: "Magnetic flap / Lift-off lid" },
      { label: "Min. Order", value: "50 pieces" },
      { label: "Lead Time", value: "14–18 business days" },
    ],
    details:
      "Our Custom Rigid Boxes are the gold standard in packaging. Built with thick 2mm greyboard wrapped in premium art paper, they provide an unmatched tactile and visual experience.\n\nChoose from magnetic closure, lift-off lid, or hinged designs. Add soft-touch lamination for a velvety feel, or go bold with gold/silver foil stamping and embossed logos.\n\nIdeal for luxury cosmetics, jewelry, electronics, premium spirits, and gift packaging where presentation matters as much as the product inside.",
  },
};

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
  const product = PRODUCTS[slug] ?? FALLBACK_PRODUCT;
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
  const product = PRODUCTS[slug] ?? { ...FALLBACK_PRODUCT, slug };

  return <ProductDetailPage product={product} />;
}
