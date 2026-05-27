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
      "/assets/images/categories/rigid_box.jpeg",
      "/assets/images/categories/rigid_box.jpeg",
    ],
  },
  corrugated_boxes: {
    description: "Sustainable corrugated packaging offering superior strength and durability.",
    images: [
      "/assets/images/categories/coregerated_box.jpeg",
      "/assets/images/categories/coregerated_box.jpeg",
    ],
  },
  custom_pouches: {
    description: "Flexible pouches designed with standout custom prints.",
    images: [
      "/assets/images/categories/pouch.jpeg",
      "/assets/images/categories/pouch.jpeg",
    ],
  },
  carry_bags: {
    title: "Hand / Shopping Bags",
    description: "Elegant bags that ensure your brand leaves a lasting impression.",
    images: [
      "/assets/images/categories/gift_box.jpeg",
      "/assets/images/categories/gift_box.jpeg",
    ],
  },
  kraft_boxes: {
    title: "Kraft Paper",
    description: "Eco-friendly Kraft paper packaging with natural charm.",
    images: [
      "/assets/images/categories/craft_box.jpeg",
      "/assets/images/categories/craft_box.jpeg",
    ],
  },
  labels_tags: {
    title: "Labels & Stickers",
    description: "Custom labels that add a refined touch to your brand's identity.",
    images: [
      "/assets/images/categories/tags.jpeg",
      "/assets/images/categories/tags.jpeg",
    ],
  },
  art_card: {
    description: "Premium cards and stationery designed to elevate your brand experience.",
    images: [
      "/assets/images/categories/art_card.jpeg",
      "/assets/images/categories/art_card.jpeg",
    ],
  },
};

const CATEGORY_ORDER = [
  "rigid_boxes",
  "corrugated_boxes",
  "custom_pouches",
  "carry_bags",
  "kraft_boxes",
  "labels_tags",
  "art_card",
] as const;

function homeCardForSlug(slug: string) {
  return HOME_CARDS.find((c) => c.category === slug);
}

function resolveImages(paths: string[], fallbackImage?: string): string[] {
  const list = paths.map((p) => p.trim()).filter(Boolean);
  if (list.length >= 2) return list.slice(0, 3);
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
