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

const USA_BRAND = "Best custom packaging company in the USA — Brands Face presents";

const CATEGORY_SHARE: Record<string, string> = {
  "christmas-packaging":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas bags, wrapping paper, gift boxes & tags.",
  art_card:
    "Best custom art card packaging company in the USA — Brands Face presents: folding cartons, tuck boxes & premium print.",
  rigid_boxes:
    "Best custom rigid box company in the USA — Brands Face presents: luxury gift boxes, magnetic closures & inserts.",
  corrugated_boxes:
    "Best custom corrugated packaging company in the USA — Brands Face presents: mailers, shippers & retail cartons.",
  custom_pouches:
    "Best custom pouch packaging company in the USA — Brands Face presents: stand-up pouches, zip packs & barrier films.",
  carry_bags:
    "Best custom shopping bag company in the USA — Brands Face presents: paper gift bags, retail bags & branded handles.",
  kraft_boxes:
    "Best custom kraft packaging company in the USA — Brands Face presents: eco kraft boxes, mailers & gift cartons.",
  labels_tags:
    "Best custom label and tag company in the USA — Brands Face presents: hang tags, product labels & seals.",
};

const PRODUCT_SHARE: Record<string, string> = {
  "custom-christmas-gift-bags":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas bags, wrapping paper & holiday gift packs.",
  "custom-christmas-gift-boxes":
    "Best Christmas packaging company in the USA — Brands Face presents: custom Christmas gift boxes for retail & corporate gifting.",
  "custom-christmas-wrapping-paper":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas wrapping paper, bags & festive gift wrap.",
  "christmas-sweet-boxes":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas sweet boxes, candy cartons & holiday treats packing.",
  "christmas-art-card-boxes":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas art card boxes with festive print & foil.",
  "christmas-bakery-boxes":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas bakery boxes for cookies, cakes & festive gifts.",
  "christmas-chocolate-boxes":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas chocolate boxes, trays & luxury holiday packs.",
  "custom-christmas-gift-tags":
    "Best Christmas packaging company in the USA — Brands Face presents: custom Christmas gift tags, hang tags & festive labels.",
  "christmas-stickers-and-seals":
    "Best Christmas packaging company in the USA — Brands Face presents: Christmas stickers, envelope seals & holiday closure labels.",
};

function categoryShareFallback(title: string): string {
  return `${USA_BRAND}: custom ${title.toLowerCase()} for retail, gifting & e-commerce.`;
}

function productShareFallback(productTitle: string, categorySlug?: string): string {
  if (categorySlug === "christmas-packaging") {
    return `Best Christmas packaging company in the USA — Brands Face presents: ${productTitle}.`;
  }
  const category = HOME_CARDS.find((c) => c.category === categorySlug);
  const label = category?.title ?? "custom packaging";
  return `Best custom ${label.toLowerCase()} company in the USA — Brands Face presents: ${productTitle}.`;
}

export function shareDescriptionForCategory(categorySlug: string, fallbackTitle?: string): string {
  return CATEGORY_SHARE[categorySlug] ?? categoryShareFallback(fallbackTitle || "packaging");
}

export function shareDescriptionForProduct(slug: string, productTitle: string): string {
  if (PRODUCT_SHARE[slug]) return PRODUCT_SHARE[slug];
  const categorySlug = getCategorySlugForProduct(slug);
  return productShareFallback(productTitle, categorySlug);
}

type ShareCard = {
  title: string;
  description: string;
  url: string;
  image?: string;
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

export function categoryShareMetadata(categorySlug: string): Metadata {
  const card = HOME_CARDS.find((c) => c.category === categorySlug);
  const cfg = getCategoryPageConfig(categorySlug);
  const title = `${card?.title ?? "Category"} | Brands Face`;
  const url = absoluteUrl(`/category/${categorySlug}`);
  return toMetadata({
    title,
    description: shareDescriptionForCategory(categorySlug, card?.title),
    url,
    image: cfg?.cardImage || card?.image,
  });
}

export function productShareMetadata(
  slug: string,
  product: { title: string; description: string; images?: string[] },
): Metadata {
  const title = `${product.title} | Brands Face`;
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
  });
}
