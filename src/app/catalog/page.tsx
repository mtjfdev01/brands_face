import type { Metadata } from "next";
import CatalogPage from "@/components/catalog/CatalogPage";

export const metadata: Metadata = {
  title: "Explore Packaging Solutions | Brands Face",
  description:
    "Explore packaging solutions by category, industry, material, finish, and use case. Compare options and move toward audit or quote.",
};

export default function CatalogRoutePage() {
  return <CatalogPage />;
}
