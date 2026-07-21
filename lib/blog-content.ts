/**
 * Blog content utilities — all derived from the Strapi Blocks `body` field.
 *
 * None of these values are stored in Strapi; they are computed at render time
 * from the raw BlockNode[] array.
 */

import type { BlockNode } from "@/lib/strapi";

// ── Slugify (must match BlogContent.tsx id generation exactly) ──────────────

/**
 * Converts a heading string to a URL-safe id for use as an HTML anchor.
 * This MUST match the slugify logic in BlogContent.tsx so that TOC links
 * actually jump to the correct heading in the rendered body.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Safely joins inline node text — Strapi may omit `text` on empty formatting nodes. */
function inlineText(nodes: Array<{ text?: string | null }>): string {
  return nodes.map((c) => c.text ?? "").join("");
}

// ── Table of Contents ─────────────────────────────────────────────────────────

export interface TocItem {
  id: string;
  text: string;
  order: number;
}

/**
 * Parses Blocks JSON body, finds matching headings, and returns an ordered list
 * of { id, text, order } for rendering the "IN THIS ARTICLE" TOC sidebar.
 *
 * Defaults to H2 only (blog behaviour). Pass additional levels for denser docs
 * such as legal pages that section with H3.
 */
export function extractTableOfContents(
  body: BlockNode[] | null | undefined,
  levels: ReadonlyArray<1 | 2 | 3 | 4 | 5 | 6> = [2]
): TocItem[] {
  if (!body || !Array.isArray(body)) return [];
  const headingBlocks = body.filter(
    (b): b is Extract<BlockNode, { type: "heading" }> =>
      b.type === "heading" && levels.includes(b.level)
  );
  return headingBlocks
    .map((b) => {
      const text = inlineText(b.children);
      if (!text.trim()) return null;
      return { id: slugifyHeading(text), text };
    })
    .filter((item): item is Pick<TocItem, "id" | "text"> => item !== null)
    .map((item, i) => ({ ...item, order: i + 1 }));
}

// ── Read time ─────────────────────────────────────────────────────────────────

/**
 * Extracts all plain text from Blocks content, counts words, divides by 200
 * (average reading speed in WPM), rounds up, and returns "N min read".
 */
export function calculateReadTime(
  body: BlockNode[] | null | undefined
): string {
  if (!body || !Array.isArray(body) || body.length === 0) return "1 min read";

  let wordCount = 0;

  function countInText(text: string | null | undefined) {
    if (!text) return;
    wordCount += text.split(/\s+/).filter(Boolean).length;
  }

  for (const block of body) {
    switch (block.type) {
      case "paragraph":
      case "heading":
      case "quote":
      case "code":
        countInText(inlineText(block.children));
        break;
      case "list":
        for (const item of block.children) {
          countInText(inlineText(item.children));
        }
        break;
      default:
        break;
    }
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

// ── Share links ───────────────────────────────────────────────────────────────

export interface ShareLinks {
  twitter: string;
  linkedin: string;
  whatsapp: string;
  email: string;
  /** Full canonical URL — for the copy-link action. */
  copyLink: string;
}

/**
 * Generates social share URLs from a post's title and slug.
 * URL encoding matches BlogShareRow.tsx exactly so the same links work in both
 * the React component and any non-component contexts (e.g. JSON-LD, SSR).
 */
export function generateShareLinks(
  title: string,
  slug: string,
  siteUrl: string
): ShareLinks {
  const url = `${siteUrl}/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
    email: `mailto:?subject=${encodedTitle}&body=${encoded}`,
    copyLink: url,
  };
}
