import type { Metadata } from "next";
import { HOME_CARDS } from "@/data/homeCards";
import { getCategoryPageConfig, getCategorySlugForProduct } from "@/data/categoryPages";

export function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  return fromEnv || "https://www.brandsface.com";
}

function encodeAssetPath(src: string): string {
  if (!src.startsWith("/")) return src;
  return (
    "/" +
    src
      .slice(1)
      .split("/")
      .filter(Boolean)
      .map((seg) => encodeURIComponent(seg))
      .join("/")
  );
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = siteOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${encodeAssetPath(normalized)}`;
}

type SeoCopy = {
  title: string;
  description: string;
  keywords?: string[];
};

/** USA is the market we serve — do not imply a US factory. */
const SERVING_USA = "Custom packaging company serving brands across the USA";

const HOME_SEO: SeoCopy = {
  title: "Best Packaging Company in the USA | Custom Boxes | Brands Face",
  description:
    "Looking for the best packaging company in the USA? Brands Face is a custom packaging company serving brands across the USA with custom boxes, rigid boxes, and printed packaging.",
  keywords: [
    "best packaging company in USA",
    "packaging company USA",
    "custom packaging company USA",
    "custom packaging manufacturer",
    "custom box manufacturer USA",
    "custom box maker USA",
    "packaging box manufacturer",
    "best custom packaging company in USA",
    "custom packaging boxes manufacturer",
    "custom printed box manufacturer",
    "custom boxes for brands",
    "premium packaging manufacturer",
    "custom packaging supplier USA",
  ],
};

const CATEGORY_SEO: Record<string, SeoCopy> = {
  "christmas-packaging": {
    title: "Custom Christmas Packaging | Gift Boxes & Bags | Brands Face",
    description:
      `${SERVING_USA}. Christmas gift boxes, bags, wrapping paper, and holiday tags for seasonal retail and corporate gifting.`,
    keywords: [
      "custom Christmas packaging",
      "Christmas gift boxes",
      "Christmas gift bags",
      "custom packaging company USA",
    ],
  },
  art_card: {
    title: "Custom Box Manufacturer for Brands | Brands Face",
    description:
      "Custom box manufacturer for brands. Custom printed boxes, product packaging boxes, and retail cartons from a custom box maker serving brands across the USA.",
    keywords: [
      "custom box manufacturer",
      "custom box maker",
      "custom packaging boxes",
      "printed box manufacturer",
      "product box manufacturer",
      "custom product boxes",
      "custom retail packaging boxes",
    ],
  },
  rigid_boxes: {
    title: "Custom Rigid Box Manufacturer & Maker | Brands Face",
    description:
      "Custom rigid box manufacturer & maker for premium brands. Luxury rigid boxes, magnetic gift boxes, and custom rigid packaging for beauty and skincare products.",
    keywords: [
      "rigid box manufacturer",
      "rigid box maker",
      "custom rigid boxes",
      "rigid packaging manufacturer",
      "luxury rigid box manufacturer",
      "custom rigid box packaging",
      "magnetic rigid box manufacturer",
      "custom rigid gift box manufacturer",
    ],
  },
  corrugated_boxes: {
    title: "Custom Box Manufacturer for Product Packaging | Brands Face",
    description:
      "Custom corrugated boxes for shipping, mailers, and retail. A packaging box manufacturer serving brands across the USA with durable printed cartons.",
    keywords: [
      "packaging box manufacturer",
      "custom box manufacturer USA",
      "box manufacturer USA",
      "custom product packaging manufacturer",
    ],
  },
  custom_pouches: {
    title: "Custom Packaging Manufacturer | Pouches | Brands Face",
    description:
      `${SERVING_USA}. Custom printed pouches, zip packs, and flexible packaging for retail and growing brands.`,
    keywords: [
      "custom packaging manufacturer",
      "custom packaging supplier USA",
      "custom product packaging manufacturer",
    ],
  },
  carry_bags: {
    title: "Custom Packaging Company for Growing Brands | Bags | Brands Face",
    description:
      `${SERVING_USA}. Custom shopping bags, paper gift bags, and branded retail bags for checkout and gifting.`,
    keywords: [
      "custom packaging company USA",
      "packaging company USA",
      "custom boxes for brands",
    ],
  },
  kraft_boxes: {
    title: "Custom Packaging Boxes Designed & Manufactured | Kraft | Brands Face",
    description:
      "Custom kraft boxes and eco packaging from a custom box maker serving brands across the USA. Printed kraft cartons, mailers, and gift boxes.",
    keywords: [
      "custom packaging boxes manufacturer",
      "custom packaging box maker",
      "packaging manufacturer for small businesses",
      "low MOQ packaging manufacturer",
    ],
  },
  labels_tags: {
    title: "Custom Printed Packaging | Labels & Tags | Brands Face",
    description:
      `${SERVING_USA}. Custom hang tags, product labels, and seals for retail packaging and branded unboxing.`,
    keywords: [
      "custom printed box manufacturer",
      "custom packaging company USA",
      "custom packaging supplier USA",
    ],
  },
};

const PRODUCT_SEO: Record<string, SeoCopy> = {
  "custom-christmas-gift-bags": {
    title: "Custom Christmas Gift Bags | Brands Face",
    description:
      "Custom Christmas gift bags from a custom packaging company serving brands across the USA. Festive retail bags, branded handles, and holiday gift packs.",
  },
  "custom-christmas-gift-boxes": {
    title: "Custom Christmas Gift Boxes | Brands Face",
    description:
      "Custom Christmas gift boxes from a custom box manufacturer serving brands across the USA. Holiday gift boxes for retail, hampers, and corporate gifting.",
  },
  "custom-christmas-wrapping-paper": {
    title: "Custom Christmas Wrapping Paper | Brands Face",
    description:
      "Custom Christmas wrapping paper and festive gift wrap from Brands Face, a custom packaging company serving brands across the USA.",
  },
  "christmas-sweet-boxes": {
    title: "Christmas Sweet Boxes | Brands Face",
    description:
      "Christmas sweet boxes and candy cartons from a custom box maker serving brands across the USA. Holiday treat packaging for retail and gifting.",
  },
  "christmas-art-card-boxes": {
    title: "Christmas Art Card Boxes | Brands Face",
    description:
      "Christmas art card boxes with custom print and foil. Custom printed boxes for seasonal brands, manufactured for the USA market.",
  },
  "christmas-bakery-boxes": {
    title: "Christmas Bakery Boxes | Brands Face",
    description:
      "Christmas bakery boxes for cookies, cakes, and festive gifts. Custom product boxes from a packaging company serving brands across the USA.",
  },
  "christmas-chocolate-boxes": {
    title: "Christmas Chocolate Boxes | Brands Face",
    description:
      "Christmas chocolate boxes and luxury holiday packs. Premium custom packaging for beauty-adjacent gifting and confectionery brands in the USA.",
  },
  "custom-christmas-gift-tags": {
    title: "Custom Christmas Gift Tags | Brands Face",
    description:
      "Custom Christmas gift tags and festive hang tags from Brands Face. Custom packaging company serving brands across the USA.",
  },
  "christmas-stickers-and-seals": {
    title: "Christmas Stickers and Seals | Brands Face",
    description:
      "Christmas stickers, envelope seals, and holiday closure labels. Custom printed packaging details for brands across the USA.",
  },
};

function categoryShareFallback(title: string): string {
  return `${SERVING_USA}. Custom ${title.toLowerCase()} — custom boxes, printed packaging, and box manufacturing for growing brands.`;
}

function productShareFallback(productTitle: string, categorySlug?: string): string {
  if (categorySlug === "christmas-packaging") {
    return `${productTitle} — custom Christmas packaging from Brands Face, a custom packaging company serving brands across the USA.`;
  }
  if (categorySlug === "rigid_boxes") {
    return `${productTitle} — custom rigid box packaging from a rigid box manufacturer & maker serving premium brands across the USA.`;
  }
  if (categorySlug === "art_card") {
    return `${productTitle} — custom printed boxes from a custom box manufacturer for brands across the USA.`;
  }
  const category = HOME_CARDS.find((c) => c.category === categorySlug);
  const label = category?.title ?? "custom packaging";
  return `${productTitle} — ${label.toLowerCase()} from Brands Face, a custom packaging company serving brands across the USA.`;
}

export function shareDescriptionForCategory(categorySlug: string, fallbackTitle?: string): string {
  return CATEGORY_SEO[categorySlug]?.description ?? categoryShareFallback(fallbackTitle || "packaging");
}

export function shareDescriptionForProduct(slug: string, productTitle: string): string {
  if (PRODUCT_SEO[slug]?.description) return PRODUCT_SEO[slug].description;
  const categorySlug = getCategorySlugForProduct(slug);
  return productShareFallback(productTitle, categorySlug);
}

type ShareCard = {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
};

function toMetadata(card: ShareCard): Metadata {
  const images = card.image
    ? [
        {
          url: absoluteUrl(card.image),
          alt: card.title,
        },
      ]
    : undefined;

  return {
    title: card.title,
    description: card.description,
    keywords: card.keywords,
    alternates: { canonical: card.url },
    openGraph: {
      type: "website",
      siteName: "Brands Face",
      title: card.title,
      description: card.description,
      url: card.url,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: card.title,
      description: card.description,
      images: images?.map((img) => img.url),
    },
  };
}

export function homeShareMetadata(): Metadata {
  return toMetadata({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    url: absoluteUrl("/"),
    image: "/assets/images/logos/logo_x.png",
    keywords: HOME_SEO.keywords,
  });
}

export function categoryShareMetadata(categorySlug: string): Metadata {
  const card = HOME_CARDS.find((c) => c.category === categorySlug);
  const cfg = getCategoryPageConfig(categorySlug);
  const seo = CATEGORY_SEO[categorySlug];
  const title = seo?.title ?? `${card?.title ?? "Category"} | Brands Face`;
  const url = absoluteUrl(`/category/${categorySlug}`);
  return toMetadata({
    title,
    description: shareDescriptionForCategory(categorySlug, card?.title),
    url,
    image: cfg?.cardImage || card?.image,
    keywords: seo?.keywords,
  });
}

export function productShareMetadata(
  slug: string,
  product: { title: string; description: string; images?: string[] },
): Metadata {
  const title = PRODUCT_SEO[slug]?.title ?? `${product.title} | Brands Face`;
  const url = absoluteUrl(`/products/${encodeURIComponent(slug)}`);
  const categorySlug = getCategorySlugForProduct(slug);
  const cfg = categorySlug ? getCategoryPageConfig(categorySlug) : undefined;
  const teaser = cfg?.products.find((p) => p.slug === slug);
  const image = product.images?.[0] || teaser?.cardImage || cfg?.cardImage;
  return toMetadata({
    title,
    description: shareDescriptionForProduct(slug, product.title),
    url,
    image,
    keywords: categorySlug ? CATEGORY_SEO[categorySlug]?.keywords : undefined,
  });
}
