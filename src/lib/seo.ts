import type { Metadata } from "next";
import { HOME_CARDS } from "@/data/homeCards";
import { getCategoryPageConfig, getCategorySlugForProduct } from "@/data/categoryPages";

export function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  return fromEnv || "https://www.Brandsface.com";
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
  title: "Brandsface | Custom Packaging Solutions for USA Businesses",
  description:
    "Looking for the best packaging company in the USA? Brandsface is a custom packaging company serving brands across the USA with custom boxes, rigid boxes, and printed packaging.",
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
    title: "Custom Christmas Packaging | Gift Bags, Boxes & Wrap | Brandsface",
    description:
      `${SERVING_USA}. Custom Christmas packaging including gift bags, wrapping paper, sweet and bakery boxes, chocolate cartons, tags, and seals for holiday retail and corporate gifting.`,
    keywords: [
      "custom Christmas packaging",
      "Christmas gift boxes",
      "Christmas gift bags",
      "custom packaging company USA",
    ],
  },
  art_card_boxes: {
    title: "Custom Art Card Boxes | Printed Product Boxes | Brandsface",
    description:
      "Custom art card boxes with premium print and finishing. Custom printed product boxes and retail cartons from a custom box maker serving brands across the USA.",
    keywords: [
      "custom art card boxes",
      "art card packaging",
      "custom printed boxes",
      "custom box manufacturer",
      "product box manufacturer",
      "custom retail packaging boxes",
    ],
  },
  rigid_boxes: {
    title: "Custom Rigid Boxes | Luxury Rigid Box Manufacturer | Brandsface",
    description:
      "Custom rigid boxes for premium brands. Luxury rigid boxes, magnetic gift boxes, and custom rigid packaging for beauty and skincare products.",
    keywords: [
      "custom rigid boxes",
      "rigid box manufacturer",
      "rigid box maker",
      "luxury rigid box manufacturer",
      "magnetic rigid box manufacturer",
      "custom rigid gift box manufacturer",
    ],
  },
  corrugated_boxes: {
    title: "Custom Corrugated Boxes | Shipping Mailers | Brandsface",
    description:
      "Custom corrugated boxes for shipping, mailers, and retail. A packaging box manufacturer serving brands across the USA with durable printed cartons.",
    keywords: [
      "custom corrugated boxes",
      "corrugated shipping boxes",
      "packaging box manufacturer",
      "custom box manufacturer USA",
    ],
  },
  custom_pouches: {
    title: "Custom Pouches | Printed Flexible Packaging | Brandsface",
    description:
      `${SERVING_USA}. Custom pouches, zip packs, and printed flexible packaging for retail and growing brands.`,
    keywords: [
      "custom pouches",
      "custom printed pouches",
      "stand up pouches",
      "flexible packaging manufacturer",
    ],
  },
  carry_bags: {
    title: "Custom Carry Bags | Paper Shopping Bags | Brandsface",
    description:
      `${SERVING_USA}. Custom carry bags, paper shopping bags, kraft bags, and branded retail bags for checkout and gifting.`,
    keywords: [
      "custom carry bags",
      "paper shopping bags",
      "custom gift bags",
      "kraft carry bags",
      "branded retail bags",
    ],
  },
  kraft_boxes: {
    title: "Custom Kraft Boxes | Eco Packaging | Brandsface",
    description:
      "Custom kraft boxes and eco packaging from a custom box maker serving brands across the USA. Printed kraft cartons, mailers, and gift boxes.",
    keywords: [
      "custom kraft boxes",
      "kraft packaging boxes",
      "eco packaging boxes",
      "custom packaging boxes manufacturer",
    ],
  },
  labels_and_tags: {
    title: "Custom Labels & Tags | Hang Tags & Seals | Brandsface",
    description:
      `${SERVING_USA}. Custom labels and tags, hang tags, product labels, and seals for retail packaging and branded unboxing.`,
    keywords: [
      "custom labels and tags",
      "custom hang tags",
      "product labels",
      "custom printed packaging",
    ],
  },
};

const PRODUCT_SEO: Record<string, SeoCopy> = {
  "custom-christmas-gift-bags": {
    title: "Custom Christmas Gift Bags | Brandsface",
    description:
      "Custom Christmas gift bags from a custom packaging company serving brands across the USA. Festive retail bags, branded handles, and holiday gift packs.",
  },
  "custom-christmas-gift-boxes": {
    title: "Custom Christmas Gift Boxes | Brandsface",
    description:
      "Custom Christmas gift boxes from a custom box manufacturer serving brands across the USA. Holiday gift boxes for retail, hampers, and corporate gifting.",
  },
  "custom-christmas-wrapping-paper": {
    title: "Custom Christmas Wrapping Paper | Brandsface",
    description:
      "Custom Christmas wrapping paper and festive gift wrap from Brandsface, a custom packaging company serving brands across the USA.",
  },
  "christmas-sweet-boxes": {
    title: "Christmas Sweet Boxes | Brandsface",
    description:
      "Christmas sweet boxes and candy cartons from a custom box maker serving brands across the USA. Holiday treat packaging for retail and gifting.",
  },
  "christmas-art-card-boxes": {
    title: "Christmas Art Card Boxes | Brandsface",
    description:
      "Christmas art card boxes with custom print and foil. Custom printed boxes for seasonal brands, manufactured for the USA market.",
  },
  "christmas-bakery-boxes": {
    title: "Christmas Bakery Boxes | Brandsface",
    description:
      "Christmas bakery boxes for cookies, cakes, and festive gifts. Custom product boxes from a packaging company serving brands across the USA.",
  },
  "christmas-chocolate-boxes": {
    title: "Christmas Chocolate Boxes | Brandsface",
    description:
      "Christmas chocolate boxes and luxury holiday packs. Premium custom packaging for beauty-adjacent gifting and confectionery brands in the USA.",
  },
  "custom-christmas-gift-tags": {
    title: "Custom Christmas Gift Tags | Brandsface",
    description:
      "Custom Christmas gift tags and festive hang tags from Brandsface. Custom packaging company serving brands across the USA.",
  },
  "christmas-stickers-and-seals": {
    title: "Christmas Stickers and Seals | Brandsface",
    description:
      "Christmas stickers, envelope seals, and holiday closure labels. Custom printed packaging details for brands across the USA.",
  },
};

function categoryShareFallback(title: string): string {
  return `${SERVING_USA}. Custom ${title.toLowerCase()} — custom boxes, printed packaging, and box manufacturing for growing brands.`;
}

function productShareFallback(productTitle: string, categorySlug?: string): string {
  if (categorySlug === "christmas-packaging") {
    return `${productTitle} — custom Christmas packaging from Brandsface, a custom packaging company serving brands across the USA.`;
  }
  if (categorySlug === "rigid_boxes") {
    return `${productTitle} — custom rigid box packaging from a rigid box manufacturer & maker serving premium brands across the USA.`;
  }
  if (categorySlug === "art_card_boxes") {
    return `${productTitle} — custom printed boxes from a custom box manufacturer for brands across the USA.`;
  }
  const category = HOME_CARDS.find((c) => c.category === categorySlug);
  const label = category?.title ?? "custom packaging";
  return `${productTitle} — ${label.toLowerCase()} from Brandsface, a custom packaging company serving brands across the USA.`;
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
      siteName: "Brandsface",
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
  const heading = card?.heroTitle ?? card?.title ?? "Category";
  const title = seo?.title ?? `${heading} | Brandsface`;
  const url = absoluteUrl(`/category/${categorySlug}`);
  return toMetadata({
    title,
    description: shareDescriptionForCategory(categorySlug, heading),
    url,
    image: cfg?.cardImage || card?.image,
    keywords: seo?.keywords,
  });
}

export function productShareMetadata(
  slug: string,
  product: { title: string; description: string; images?: string[] },
): Metadata {
  const title = PRODUCT_SEO[slug]?.title ?? `${product.title} | Brandsface`;
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
