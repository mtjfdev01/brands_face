import { HOME_CARDS } from "@/data/homeCards";

export type CategoryLayoutIcon =
  | "rigid"
  | "corrugated"
  | "pouch"
  | "bag"
  | "kraft"
  | "label"
  | "artcard";

export type CategoryLayoutItem = {
  title: string;
  slug: string;
  description: string;
  icon: CategoryLayoutIcon;
  images: string[];
};

type CategoryDisplayConfig = {
  title?: string;
  description: string;
  /** 2–3 paths per card — files under `public/`, URLs like `/assets/images/...` */
  images: string[];
};

const ICON_BY_SLUG: Record<string, CategoryLayoutIcon> = {
  rigid_boxes: "rigid",
  corrugated_boxes: "corrugated",
  custom_pouches: "pouch",
  carry_bags: "bag",
  kraft_boxes: "kraft",
  labels_tags: "label",
  art_card: "artcard",
};

/** Edit copy and slider image paths here. */
const DISPLAY: Record<string, CategoryDisplayConfig> = {
  rigid_boxes: {
    description: "Premium rigid boxes crafted for luxury products and gift packaging.",
    images: [
      "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(1).png",
      "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(2).png",
      "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(3).png",
      "/assets/images/categories/categories_layout/rigid_box/rigid_cat_main%20(4).png",
    ],
  },
  corrugated_boxes: {
    description: "Sustainable corrugated packaging offering superior strength and durability.",
    images: [
      "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(1).png",
      "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(2).png",
      "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(3).png",
      "/assets/images/categories/categories_layout/corrugrated/corrugrated%20(4).png",
    ],
  },
  custom_pouches: {
    description: "Flexible pouches designed with standout custom prints.",
    images: [
      "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement.png",
      "/assets/images/categories/categories_layout/pouches/elegant_pouch_packaging_arrangement%20(2).png",
    ],
  },
  carry_bags: {
    title: "Hand / Shopping Bags",
    description: "Elegant bags that ensure your brand leaves a lasting impression.",
    images: [
      "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(1).png",
      "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(2).png",
      "/assets/images/categories/categories_layout/shopping_bags/shopping_bags%20(3).png",
    ],
  },
  kraft_boxes: {
    title: "Kraft Paper",
    description: "Eco-friendly Kraft paper packaging with natural charm.",
    images: [
      "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(1).png",
      "/assets/images/categories/categories_layout/kraft_paper/kraft_paper%20(2).png",
    ],
  },
  labels_tags: {
    title: "Labels & Stickers",
    description: "Custom labels that add a refined touch to your brand's identity.",
    images: [
      "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(1).webp",
      "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(2).webp",
      "/assets/images/categories/categories_layout/Labels%20%26%20Stickers/label_stickers%20(3).webp",
    ],
  },
  art_card: {
    description: "Premium cards and stationery designed to elevate your brand experience.",
    images: [
      "/assets/images/categories/categories_layout/art_card/art_card%20(1).webp",
      "/assets/images/categories/categories_layout/art_card/art_card%20(2).webp",
      "/assets/images/categories/categories_layout/art_card/art_card%20(3).webp",
    ],
  },
};

const CATEGORY_ORDER = [
  "art_card",
  "corrugated_boxes",
  "custom_pouches",
  "carry_bags",
  "kraft_boxes",
  "labels_tags",
  "rigid_boxes",
] as const;

function homeCardForSlug(slug: string) {
  return HOME_CARDS.find((c) => c.category === slug);
}

function resolveImages(paths: string[], fallbackImage?: string): string[] {
  const list = paths.map((p) => p.trim()).filter(Boolean);
  if (list.length >= 2) return list.slice(0, 4);
  if (list.length === 1) return [list[0], list[0]];
  if (fallbackImage) return [fallbackImage, fallbackImage];
  return [];
}

export const CATEGORY_LAYOUT_ITEMS: CategoryLayoutItem[] = CATEGORY_ORDER.map((slug) => {
  const meta = DISPLAY[slug];
  const card = homeCardForSlug(slug);

  if (!meta) {
    throw new Error(`categories_layout: missing DISPLAY config for "${slug}"`);
  }

  return {
    title: meta.title ?? card?.title ?? slug,
    slug,
    description: meta.description,
    icon: ICON_BY_SLUG[slug] ?? "rigid",
    images: resolveImages(meta.images, card?.image),
  };
});
