import { notFound, redirect } from "next/navigation";
import { isValidCategorySlug, resolveCategorySlug } from "@/data/categoryPages";
import { categoryHubPath } from "@/lib/routes";

/** Old `/sale/[category]` bookmarks → `/category/[category]`. */
export default function SaleCategoryLegacyRedirect({
  params,
}: {
  params: { category: string };
}) {
  if (!isValidCategorySlug(params.category)) {
    notFound();
  }
  redirect(categoryHubPath(resolveCategorySlug(params.category)!));
}
