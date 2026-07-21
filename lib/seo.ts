import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";
import type { StrapiImage, StrapiSeo } from "@/lib/strapi";
import { strapiImageUrl } from "@/lib/strapi";

/**
 * Strips a trailing site-name suffix CMS editors may have included,
 * so it doesn't duplicate the root layout title template (%s | Recurv).
 */
export function sanitizeTitle(title: string): string {
  const escapedSiteName = SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\s*(?:\\||—|–|-|:)\\s*${escapedSiteName}\\s*$`, "i");
  return title.replace(pattern, "").trimEnd();
}

export interface ShareImageOptions {
  seo?: StrapiSeo | null;
  heroImage?: StrapiImage | null;
  cardImage?: StrapiImage | null;
}

function resolveImageUrl(image: StrapiImage | null | undefined): string | undefined {
  if (!image?.url) return undefined;
  return strapiImageUrl(image.url);
}

/**
 * Resolves the best share image for OG/Twitter metadata.
 * Priority: seo.shareImage → metaSocial.image → heroImage → cardImage → DEFAULT_OG_IMAGE.
 */
export function getShareImageUrl({
  seo,
  heroImage,
  cardImage,
}: ShareImageOptions): string {
  const candidates: (StrapiImage | null | undefined)[] = [
    seo?.shareImage,
    ...(seo?.metaSocial?.map((entry) => entry.image) ?? []),
    heroImage,
    cardImage,
  ];

  for (const image of candidates) {
    const url = resolveImageUrl(image);
    if (url) return url;
  }

  return DEFAULT_OG_IMAGE;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export function buildFaqPageJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
