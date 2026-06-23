/**
 * Typed API client for the Recurv Strapi CMS.
 *
 * Environment variables required:
 *   STRAPI_API_URL   — e.g. https://strapi-cms.up.railway.app
 *   STRAPI_API_TOKEN — read-only API token generated in Strapi admin
 */

// ── Strapi Blocks rich-text node types ────────────────────────────────────────

export type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "list"; format: "unordered" | "ordered"; children: ListItemNode[] }
  | { type: "image"; image: StrapiImage; children: InlineNode[] }
  | { type: "code"; language?: string; children: InlineNode[] };

export type InlineNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type ListItemNode = {
  type: "list-item";
  children: InlineNode[];
};

// ── Strapi media ──────────────────────────────────────────────────────────────

export interface StrapiImage {
  url: string;
  width: number;
  height: number;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// ── Content-type response shapes ──────────────────────────────────────────────

export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: BlockNode[] | null;
  category?: string | null;
  industry?: string | null;
  readTime?: number | null;
  author?: string | null;
  authorInitials?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage?: StrapiImage | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiIndustry {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content?: BlockNode[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage?: StrapiImage | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Strapi list response wrapper ──────────────────────────────────────────────

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

const BASE = process.env.STRAPI_API_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;

async function strapiGet<T>(path: string, revalidate?: number): Promise<T> {
  if (!BASE) throw new Error("STRAPI_API_URL is not set");
  if (!TOKEN) throw new Error("STRAPI_API_TOKEN is not set");

  const url = `${BASE}/api${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next:
      revalidate !== undefined
        ? { revalidate }
        : { tags: [path.split("?")[0]] },
  });

  if (!res.ok) {
    throw new Error(`Strapi API error ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

// ── Blog post queries ─────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<StrapiPost[]> {
  const res = await strapiGet<StrapiListResponse<StrapiPost>>(
    "/blog-posts?populate=featuredImage&sort=publishedAt:desc&pagination[pageSize]=100"
  );
  return res.data;
}

export async function getBlogPost(slug: string): Promise<StrapiPost | null> {
  const res = await strapiGet<StrapiListResponse<StrapiPost>>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=featuredImage`
  );
  return res.data[0] ?? null;
}

// ── Industry queries ──────────────────────────────────────────────────────────

export async function getIndustries(): Promise<StrapiIndustry[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    "/industries?populate=featuredImage&sort=title:asc&pagination[pageSize]=100"
  );
  return res.data;
}

export async function getIndustry(slug: string): Promise<StrapiIndustry | null> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    `/industries?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=featuredImage`
  );
  return res.data[0] ?? null;
}

// ── Blocks renderer helper ────────────────────────────────────────────────────

/**
 * Extracts plain-text h2 headings from Strapi Blocks content.
 * Used to build the article TOC.
 */
export function extractHeadings(blocks: BlockNode[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b): b is Extract<BlockNode, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((b) => b.children.map((c) => c.text).join(""));
}

/**
 * Maps a StrapiPost to the legacy `Post` shape used by BlogCard.
 * Fields that have no direct Strapi equivalent use sensible defaults.
 */
export function toPostCard(p: StrapiPost): import("@/components/blogData").Post {
  const date = p.publishedAt
    ? new Date(p.publishedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return {
    slug: p.slug,
    industry: p.industry ?? "General",
    category: p.category ?? "Article",
    readTime: p.readTime ?? 5,
    title: p.title,
    excerpt: p.excerpt ?? p.metaDescription ?? "",
    author: p.author ?? "Recurv",
    authorInitials: p.authorInitials ?? "RC",
    date,
    dateSort: p.publishedAt ? new Date(p.publishedAt).getTime() : 0,
    imageDesc: p.featuredImage?.alternativeText ?? `Photo for ${p.title}`,
    imageBg: "#0F0E14",
  };
}
