import type { MetadataRoute } from "next";

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
  return fromEnv || "https://www.brandsface.com";
}

/** Crawler rules + sitemap pointer. Private admin/invoice routes are blocked. */
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/admin",
          "/invoice/",
          "/invoice",
          "/api/",
          "/checkout/",
          "/checkout",
        ],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin.replace(/^https?:\/\//, ""),
  };
}
