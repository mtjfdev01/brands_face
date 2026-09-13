import type { MetadataRoute } from "next";
import { getSitemapFeaturedProductSlugs } from "@/data/categoryPages";

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  return fromEnv || "https://www.Brandsface.com";
}

/** Crawler rules + sitemap pointer. Private admin/invoice routes are blocked. */
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  const featuredProductPaths = getSitemapFeaturedProductSlugs().map(
    (slug) => `/products/${encodeURIComponent(slug)}`,
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...featuredProductPaths],
        disallow: [
          "/admin/",
          "/admin",
          "/invoice/",
          "/invoice",
          "/api/",
          "/checkout/",
          "/checkout",
          "/products/",
        ],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin.replace(/^https?:\/\//, ""),
  };
}
