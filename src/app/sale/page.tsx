import { redirect } from "next/navigation";
import { defaultCategoryHubPath, categoryHubPath } from "@/lib/routes";
import { isValidCategorySlug, resolveCategorySlug } from "@/data/categoryPages";

type Props = {
  searchParams: { category?: string | string[] };
};

/** Legacy `/sale` URLs → `/category/[slug]` (no `sale` in the public path). */
export default function SaleLegacyRedirect({ searchParams }: Props) {
  const raw = searchParams.category;
  const q = Array.isArray(raw) ? raw[0] : raw;
  if (q && isValidCategorySlug(q)) {
    redirect(categoryHubPath(resolveCategorySlug(q)!));
  }
  redirect(defaultCategoryHubPath());
}
