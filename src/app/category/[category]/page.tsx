import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SaleCategoryClient from "@/components/sale/SaleCategoryClient";
import { isValidCategorySlug, resolveCategorySlug } from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";

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
  if (!card) {
    return { title: "Category | Brands Face" };
  }
  return {
    title: `${card.title} | Brands Face`,
    description: card.heroDescription,
  };
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
  return <SaleCategoryClient categorySlug={canonical} />;
}
