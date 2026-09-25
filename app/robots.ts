import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllLegalPageSlugs } from "@/lib/strapi";

/**
 * Allows crawling of public pages; blocks noindex routes (/thank-you, /start, legal).
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const legalSlugs = await getAllLegalPageSlugs().catch(() => []);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/thank-you",
        "/start",
        ...legalSlugs.map(({ slug }) => `/${slug}`),
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
