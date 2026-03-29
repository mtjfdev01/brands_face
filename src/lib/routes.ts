import { HOME_CARDS } from "@/data/homeCards";

/** Marketing category hub: `/category/[slug]` (matches `HomeCard.category`). */
export function categoryHubPath(categorySlug: string) {
  return `/category/${categorySlug}`;
}

/** Default category landing (first catalog card). */
export function defaultCategoryHubPath() {
  return categoryHubPath(HOME_CARDS[0].category);
}
