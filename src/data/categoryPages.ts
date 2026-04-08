import { HOME_CARDS, type HomeCard } from "@/data/homeCards";
import { CATEGORY_PAGE_CONFIG } from "./categoryPageConfig";
import type { ProductData } from "@/components/product/ProductInfo";

export { CATEGORY_PAGE_CONFIG };

/**
 * ── Category & product teaser model (for `/category/[category]` → `/products/[slug]`) ──
 *
 * `CategoryPageConfig` keys / fields:
 * - `category` — URL segment; must match `HomeCard.category` (e.g. `rigid_boxes`).
 * - `cardImage` — Category thumbnail (nav cards, overlays, grids).
 * - `bannerImages` — Hero carousel backgrounds; cycles if fewer than slide count.
 * - `tabs` — Optional pill filters; each category defines its own labels/ids. Include `{ id: "all", label: "All" }` first when used.
 * - `products` — Rows in “Products related to category” → each links to PDP `/products/[slug]`.
 *
 * `CategoryProductTeaser` keys:
 * - `slug` — Product detail key (must match `PRODUCTS` in `app/products/[slug]/page.tsx` or falls back PDP).
 * - `cardImage` — Image for the product strip card.
 * - `detailImages` — Optional extra images for the product detail gallery (PDP uses `[cardImage, ...detailImages]`).
 * - `heading` — Small label above the title (e.g. “Signature”, “Shipping”).
 * - `title` — Primary line on the card.
 * - `subtitle` — Supporting description line.
 * - `tabId` — When `tabs` is set, must match a tab `id` (not `"all"`). Omitted = only visible under “All”.
 *
 * `CategoryTab`:
 * - `id` — Stable key; use `"all"` for the show-everything tab (include as first tab when using filters).
 * - `label` — Pill label text.
 */
export type CategoryTab = {
  id: string;
  label: string;
};

/** FAQ entry for category hubs and PDPs (sourced from `categoryPageConfig.ts`). */
export type CategoryFaqItem = {
  question: string;
  answer: string;
};

export type CategoryProductTeaser = {
  slug: string;
  cardImage: string;
  /** Additional gallery images for `/products/[slug]` (card uses `cardImage`). */
  detailImages?: string[];
  heading: string;
  title: string;
  subtitle: string;
  /** Assign to a filter tab `id` (exclude `all`). If missing, product shows only when “All” is selected. */
  tabId?: string;
  /**
   * Full PDP fields centralized in config.
   * Intentionally omits `quantities` + `deliveryEstimate` for now; we provide safe defaults at runtime.
   */
  pdp?: Omit<ProductData, "slug" | "images" | "quantities" | "deliveryEstimate">;
  /** Product-specific FAQs on `/products/[slug]` (merged with category FAQs). */
  faqs?: CategoryFaqItem[];
};

export type CategoryPageConfig = {
  category: string;
  cardImage: string;
  bannerImages: string[];
  /** If set, category page shows a pill tab bar; products filter by `tabId`. Omit for legacy single-list behavior. */
  tabs?: CategoryTab[];
  products: CategoryProductTeaser[];
  /** Category hub FAQs on `/category/[category]`. */
  faqs?: CategoryFaqItem[];
};

/** PDP gallery for rigid products: category teaser `cardImage` + `detailImages`. */
export function getRigidCategoryProductImages(slug: string): string[] | undefined {
  const cfg = CATEGORY_PAGE_CONFIG.find((c) => c.category === "rigid_boxes");
  const teaser = cfg?.products.find((p) => p.slug === slug);
  if (!teaser) return undefined;
  const extras = teaser.detailImages;
  if (extras?.length) return [teaser.cardImage, ...extras];
  return [teaser.cardImage];
}

const DEFAULT_QUANTITIES: ProductData["quantities"] = [{ qty: 50, pricePerPiece: 0, total: 0 }];
const DEFAULT_DELIVERY_ESTIMATE = "Contact us for estimate";

/**
 * Centralized PDP lookup from `CATEGORY_PAGE_CONFIG`.
 * Returns `undefined` if the product doesn't have `pdp` filled yet.
 */
export function getProductFromCategoryConfig(slug: string): ProductData | undefined {
  const key = slug.trim();
  if (!key) return undefined;

  for (const cfg of CATEGORY_PAGE_CONFIG) {
    const teaser = cfg.products.find((p) => p.slug === key);
    if (!teaser?.pdp) continue;
    const images = teaser.detailImages?.length ? [teaser.cardImage, ...teaser.detailImages] : [teaser.cardImage];
    return {
      slug: key,
      ...teaser.pdp,
      images,
      quantities: DEFAULT_QUANTITIES,
      deliveryEstimate: DEFAULT_DELIVERY_ESTIMATE,
    };
  }
  return undefined;
}

const CONFIG_BY_CATEGORY: Record<string, CategoryPageConfig> = Object.fromEntries(
  CATEGORY_PAGE_CONFIG.map((c) => [c.category.toLowerCase(), c as CategoryPageConfig]),
);

/** Normalize any `HomeCard` entry missing from explicit config (defensive). */
function configFromHomeCard(card: HomeCard): CategoryPageConfig {
  const existing = CONFIG_BY_CATEGORY[card.category.toLowerCase()];
  if (existing) return existing;
  const slides = card.heroSlides ?? [];
  const fromSlides = slides.map((s) => s.productImage).filter(Boolean) as string[];
  const bannerImages =
    fromSlides.length > 0 ? [card.image, ...fromSlides] : [card.image, card.image];
  return {
    category: card.category,
    cardImage: card.image,
    bannerImages,
    products: [
      {
        slug: "mailer",
        cardImage: "/products/mailer.png",
        heading: "Featured",
        title: `${card.title} solutions`,
        subtitle: card.heroDescription.slice(0, 120) + (card.heroDescription.length > 120 ? "…" : ""),
      },
    ],
  };
}

export function getCategoryPageConfig(categorySlug: string): CategoryPageConfig | undefined {
  const key = categorySlug.trim().toLowerCase();
  const fromMap = CONFIG_BY_CATEGORY[key];
  if (fromMap) return fromMap;
  const card = HOME_CARDS.find((c) => c.category.toLowerCase() === key);
  return card ? configFromHomeCard(card) : undefined;
}

/** Canonical slug as stored in `HOME_CARDS` (correct casing). */
export function resolveCategorySlug(categorySlug: string): string | undefined {
  const key = categorySlug.trim().toLowerCase();
  return HOME_CARDS.find((c) => c.category.toLowerCase() === key)?.category;
}

export function isValidCategorySlug(categorySlug: string): boolean {
  return resolveCategorySlug(categorySlug) !== undefined;
}

export function getAllCategorySlugs(): string[] {
  return HOME_CARDS.map((c) => c.category);
}

/** Tab id that shows every product in the list. */
export const CATEGORY_TAB_ALL_ID = "all";

/**
 * Filter product teasers by selected pill tab.
 * - No `tabs` config → returns full list (unchanged behavior).
 * - `activeTabId === all` → full list.
 * - Otherwise → products whose `tabId` matches; teasers without `tabId` only appear under “All”.
 */
export function filterTeasersByTab(
  products: CategoryProductTeaser[],
  tabs: CategoryTab[] | undefined,
  activeTabId: string,
): CategoryProductTeaser[] {
  if (!tabs?.length) return products;
  if (activeTabId === CATEGORY_TAB_ALL_ID) return products;
  return products.filter((p) => p.tabId === activeTabId);
}

/** Encode each path segment so spaces (e.g. `RIGID BOX Category`) work with `next/image` for files under `public/`. */
function encodePublicPath(src: string): string {
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

export function teasersToIndustryItems(teasers: CategoryProductTeaser[]) {
  return teasers.map((p, i) => ({
    id: `${p.slug}-${i}`,
    title: `${p.title}`,
    description: p.subtitle,
    imageSrc: encodePublicPath(p.cardImage),
    href: `/products/${p.slug}`,
  }));
}

/** PDP “related” strip: every teaser in the same `CATEGORY_PAGE_CONFIG` block (all tabs), excluding the current slug. */
export type RelatedCategoryProduct = {
  slug: string;
  title: string;
  imageSrc: string;
};

export function getRelatedProductsInCategory(currentSlug: string): RelatedCategoryProduct[] {
  const key = currentSlug.trim();
  if (!key) return [];

  const cfg = CATEGORY_PAGE_CONFIG.find((c) => c.products.some((p) => p.slug === key));
  if (!cfg) return [];

  const seen = new Set<string>();
  const out: RelatedCategoryProduct[] = [];
  for (const p of cfg.products) {
    if (p.slug === key) continue;
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push({
      slug: p.slug,
      title: p.title,
      imageSrc: encodePublicPath(p.cardImage),
    });
  }
  return out;
}

const GENERIC_PDP_FAQS: CategoryFaqItem[] = [
  {
    question: "What is the typical minimum order quantity?",
    answer:
      "MOQs depend on structure, materials, and finish. Each product lists a starting quantity; we can often support pilots or phased rollouts — send a quote for your SKU.",
  },
  {
    question: "How long do production and shipping take?",
    answer:
      "Lead times vary by tooling, proofs, and fulfilment lane. Your product page shows a typical range; we confirm dates after artwork approval and deposit.",
  },
  {
    question: "Can I get a sample before the full order?",
    answer:
      "Yes. We can provide structural blanks, print proofs, or finish swatches where applicable so you can approve fit, colour, and feel before production.",
  },
];

/** Category hub: FAQs attached to the resolved category config (`categoryPageConfig`). */
export function getCategoryHubFaqs(categorySlug: string): CategoryFaqItem[] {
  const cfg = getCategoryPageConfig(categorySlug);
  return cfg?.faqs?.length ? cfg.faqs : [];
}

/** PDP: product FAQs first, then category FAQs; de-duplicated by question text. Unknown slugs get generic FAQs. */
export function getMergedFaqsForProductDetail(slug: string): CategoryFaqItem[] {
  const key = slug.trim();
  if (!key) return [...GENERIC_PDP_FAQS];

  for (const c of CATEGORY_PAGE_CONFIG) {
    const p = c.products.find((x) => x.slug === key);
    if (!p) continue;

    const productFaqs = p.faqs ?? [];
    const categoryFaqs = c.faqs ?? [];
    const seen = new Set<string>();
    const out: CategoryFaqItem[] = [];

    for (const item of [...productFaqs, ...categoryFaqs]) {
      const qk = item.question.trim().toLowerCase();
      if (seen.has(qk)) continue;
      seen.add(qk);
      out.push(item);
    }

    return out.length > 0 ? out : [...GENERIC_PDP_FAQS];
  }

  return [...GENERIC_PDP_FAQS];
}
