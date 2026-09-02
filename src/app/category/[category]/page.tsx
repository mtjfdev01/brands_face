import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SaleCategoryClient from "@/components/sale/SaleCategoryClient";
import { isValidCategorySlug, resolveCategorySlug } from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";
import { categoryShareMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return HOME_CARDS.map((c) => ({ category: c.category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const canonical = resolveCategorySlug(category);
  const card = HOME_CARDS.find((c) => c.category === canonical);
  if (!card || !canonical) {
    return { title: "Category | Brands Face" };
  }
  return categoryShareMetadata(canonical);
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategorySlug(category)) {
    notFound();
  }
  const canonical = resolveCategorySlug(category)!;
  return (
    <Suspense fallback={null}>
      <SaleCategoryClient categorySlug={canonical} />
    </Suspense>
  );
}
