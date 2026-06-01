import { HOME_CARDS } from "@/data/homeCards";

export const ORDER_CATEGORY_OPTIONS = HOME_CARDS.map((card) => ({
  value: card.category,
  label: card.title,
  image: card.image,
  color: card.color,
}));

export function getOrderCategory(slug: string | null | undefined) {
  if (!slug?.trim()) return null;
  return HOME_CARDS.find((c) => c.category === slug.trim()) ?? null;
}
