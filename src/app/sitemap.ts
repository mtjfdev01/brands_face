import type { MetadataRoute } from "next";
import { getAllCatalogProductSlugs, getAllCategorySlugs } from "@/data/categoryPages";
import { categoryHubPath } from "@/lib/routes";

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  return fromEnv || "https://brandsface.com";
}

/** Public marketing + catalog URLs for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/catalog",
    "/quote",
    "/audit",
    "/studio",
    "/case-studies",
    "/support",
    "/sale",
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/shipping-policy",
    "/whistleblowing-policy",
  ].map((path) => ({
    url: `${origin}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategorySlugs().map((category) => ({
    url: `${origin}${categoryHubPath(category)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const productPages: MetadataRoute.Sitemap = getAllCatalogProductSlugs().map((slug) => ({
    url: `${origin}/products/${encodeURIComponent(slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
