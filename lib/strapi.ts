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

// ── Industry component shapes ──────────────────────────────────────────────────

export interface StrapiHeadlineSegment {
  id: number;
  text: string;
  style: "default" | "accent";
}

export interface StrapiLink {
  id: number;
  label: string;
  url: string;
}

export interface StrapiStat {
  id: number;
  value: string;
}

/**
 * Lucide icon name as stored in Strapi enumerations.
 * These are kebab-case lucide-react icon names.
 */
export type IndustryIconName =
  | "trending-up"
  | "clock"
  | "percent"
  | "file-search"
  | "alert-triangle"
  | "repeat"
  | "credit-card"
  | "users"
  | "shield-check"
  | "bar-chart-3";

export interface StrapiProblemCard {
  id: number;
  problemIcon: IndustryIconName;
  problemTitle: string;
  problemDescription: string;
  solutionDescription: string;
}

export interface StrapiNumberedFeature {
  id: number;
  featureIcon: IndustryIconName;
  featureTitle: string;
  featureDescription: string;
}

export interface StrapiDashboardFeature {
  id: number;
  dashboardFeatureIcon: IndustryIconName;
  dashboardFeatureTitle: string;
  dashboardFeatureDescription: string;
}

export interface StrapiOnboardingStep {
  id: number;
  stepTitle: string;
  stepDescription: string;
}

export interface StrapiFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface StrapiMetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
  image?: StrapiImage | null;
}

export interface StrapiSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaSocial?: StrapiMetaSocial[] | null;
}

// ── Industry nav / card shapes ─────────────────────────────────────────────────

/** Minimal shape used in the shared nav (header/footer). */
export interface StrapiIndustryNavItem {
  industryName: string;
  slug: string;
}

/** Shape used on the homepage "Industries" section and the /industries listing. */
export interface StrapiIndustryCard {
  id: number;
  documentId: string;
  industryName: string;
  slug: string;
  cardTagline?: string | null;
  cardImage?: StrapiImage | null;
  isFeatured?: boolean | null;
}

// ── Industry content type ──────────────────────────────────────────────────────

export interface StrapiIndustry {
  id: number;
  documentId: string;
  industryName: string;
  slug: string;
  cardTagline?: string | null;
  cardImage?: StrapiImage | null;
  isFeatured?: boolean | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // Hero section
  heroHeadline?: StrapiHeadlineSegment[] | null;
  heroIntro?: BlockNode[] | string | null;
  heroPrimaryCta?: StrapiLink | null;
  heroSecondaryCta?: StrapiLink | null;
  heroStats?: StrapiStat[] | null;
  heroImage?: StrapiImage | null;

  // Trusted-by strip
  trustedNames?: string | null;

  // Problems section
  problemsEyebrow?: string | null;
  problemsHeading?: StrapiHeadlineSegment[] | null;
  problemsIntro?: string | null;
  problems?: StrapiProblemCard[] | null;

  // Features / solution section
  featuresEyebrow?: string | null;
  featuresHeading?: StrapiHeadlineSegment[] | null;
  featuresIntro?: string | null;
  features?: StrapiNumberedFeature[] | null;

  // Dashboard section
  dashboardEyebrow?: string | null;
  dashboardHeading?: StrapiHeadlineSegment[] | null;
  dashboardIntro?: string | null;
  dashboardFeatures?: StrapiDashboardFeature[] | null;
  dashboardCta?: StrapiLink | null;

  // Onboarding section
  onboardingEyebrow?: string | null;
  onboardingHeading?: StrapiHeadlineSegment[] | null;
  onboardingCta?: StrapiLink | null;
  onboardingSteps?: StrapiOnboardingStep[] | null;

  // Contact section
  contactEyebrow?: string | null;
  contactHeading?: StrapiHeadlineSegment[] | null;
  contactDescription?: string | null;
  contactTeamLabel?: string | null;

  // FAQ section
  faqEyebrow?: string | null;
  faqHeading?: StrapiHeadlineSegment[] | null;
  faqIntro?: string | null;
  faqItems?: StrapiFaqItem[] | null;

  // SEO
  seo?: StrapiSeo | null;
}

// ── Image URL helper ──────────────────────────────────────────────────────────

/**
 * Resolves a Strapi image URL to an absolute URL.
 *
 * Strapi's local file provider returns relative paths ("/uploads/…") while
 * cloud providers (S3, Cloudinary, Railway) return absolute URLs. This helper
 * normalises both cases so next/image always receives a fully-qualified src.
 *
 * Must only be called in Server Components / server-side code because it reads
 * process.env.STRAPI_API_URL.
 */
export function strapiImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = (process.env.STRAPI_API_URL ?? "").replace(/\/$/, "");
  return `${base}${url}`;
}

// ── Strapi list response wrapper ──────────────────────────────────────────────

interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// ── Fetch helper ──────────────────────────────────────────────────────────────

const BASE = process.env.STRAPI_API_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiGetOptions {
  revalidate?: number;
  tags?: string[];
}

async function strapiGet<T>(path: string, options?: StrapiGetOptions): Promise<T> {
  if (!BASE) throw new Error("STRAPI_API_URL is not set");
  if (!TOKEN) throw new Error("STRAPI_API_TOKEN is not set");

  const url = `${BASE}/api${path}`;

  let nextConfig: { revalidate?: number; tags?: string[] };
  if (options?.revalidate !== undefined || options?.tags !== undefined) {
    nextConfig = {};
    if (options.revalidate !== undefined) nextConfig.revalidate = options.revalidate;
    if (options.tags !== undefined) nextConfig.tags = options.tags;
  } else {
    nextConfig = { tags: [path.split("?")[0]] };
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: nextConfig,
  });

  if (!res.ok) {
    throw new Error(`Strapi API error ${res.status} for ${url}`);
  }

  return res.json() as Promise<T>;
}

// ── Blog content types ────────────────────────────────────────────────────────

export interface StrapiBlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiBlogTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cardImage: StrapiImage | null;
  heroImage: StrapiImage | null;
  body: BlockNode[] | null;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: StrapiBlogCategory | null;
  tags: StrapiBlogTag[] | null;
  seo: StrapiSeo | null;
}

export interface StrapiBlogCategoryWithCount extends StrapiBlogCategory {
  postCount: number;
}

export interface StrapiBlogTagWithCount extends StrapiBlogTag {
  postCount: number;
}

// ── Blog card-level field set (shared param string) ───────────────────────────

const BLOG_CARD_FIELDS =
  "fields[0]=title&fields[1]=slug&fields[2]=excerpt" +
  "&fields[3]=publishedAt&fields[4]=isFeatured" +
  "&populate[cardImage]=true" +
  "&populate[category][fields][0]=name&populate[category][fields][1]=slug";

// ── Blog queries (new schema) ─────────────────────────────────────────────────

/**
 * Fetches the 3 most recently published blog posts for the homepage
 * "FROM THE BLOG" section. Cached for 1 hour with tag for on-demand bust.
 */
export async function getFeaturedBlogPostsForHomepage(): Promise<StrapiBlogPost[]> {
  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}&sort=publishedAt:desc&pagination[pageSize]=3`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return res.data;
}

/**
 * Fetches recent blog posts whose category slug matches an industry page slug.
 * This is the association used on /industries/[slug] — create a blog category
 * with the same slug as the industry (e.g. "schools-and-education") and assign
 * posts to it.
 */
export async function getBlogPostsForIndustry(
  industrySlug: string,
  limit = 3
): Promise<StrapiBlogPost[]> {
  const { posts } = await getAllBlogPosts({
    categorySlug: industrySlug,
    pageSize: limit,
    sort: "latest",
  });
  return posts;
}

/**
 * Fetches the single post with isFeatured=true for the /blog listing featured card.
 * Returns null if no post is marked featured.
 */
export async function getFeaturedBlogPost(): Promise<StrapiBlogPost | null> {
  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}&filters[isFeatured][$eq]=true&pagination[pageSize]=1`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return res.data[0] ?? null;
}

/**
 * Fetches paginated blog posts for the /blog listing page.
 * Supports optional category filter, sort direction, and pagination.
 */
export async function getAllBlogPosts({
  categorySlug,
  tagSlug,
  sort = "latest",
  page = 1,
  pageSize = 12,
  excludeId,
}: {
  categorySlug?: string;
  tagSlug?: string;
  sort?: "latest" | "oldest";
  page?: number;
  pageSize?: number;
  /** Exclude a specific post by numeric id (used to remove the featured card from the grid). */
  excludeId?: number;
} = {}): Promise<{ posts: StrapiBlogPost[]; total: number; pageCount: number }> {
  let qs =
    `${BLOG_CARD_FIELDS}` +
    `&sort=${sort === "oldest" ? "publishedAt:asc" : "publishedAt:desc"}` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}`;

  if (categorySlug) {
    qs += `&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`;
  }
  if (tagSlug) {
    qs += `&filters[tags][slug][$eq]=${encodeURIComponent(tagSlug)}`;
  }
  if (excludeId !== undefined) {
    qs += `&filters[id][$ne]=${excludeId}`;
  }

  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${qs}`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );
  return {
    posts: res.data,
    total: res.meta.pagination.total,
    pageCount: res.meta.pagination.pageCount,
  };
}

/**
 * Fetches all blog categories along with a post count for each.
 * Uses two parallel queries (categories + minimal post list) to avoid N+1.
 * Both results are cached and busted by the Strapi webhook.
 */
export async function getAllBlogCategoriesWithCounts(): Promise<StrapiBlogCategoryWithCount[]> {
  const [categoriesRes, postsRes] = await Promise.all([
    strapiGet<StrapiListResponse<StrapiBlogCategory>>(
      "/blog-categories?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100",
      { revalidate: 3600, tags: ["blog-categories"] }
    ),
    strapiGet<StrapiListResponse<{ id: number; category: { id: number } | null }>>(
      "/blog-posts?fields[0]=id&populate[category][fields][0]=id&pagination[pageSize]=1000&status=published",
      { revalidate: 3600, tags: ["blog-listing"] }
    ),
  ]);

  const countMap: Record<number, number> = {};
  for (const post of postsRes.data) {
    const catId = post.category?.id;
    if (catId !== undefined) countMap[catId] = (countMap[catId] ?? 0) + 1;
  }

  return categoriesRes.data.map((cat) => ({
    ...cat,
    postCount: countMap[cat.id] ?? 0,
  }));
}

/**
 * Fetches all blog tags along with a post count for each.
 * Uses two parallel queries to avoid N+1 — categories + a minimal post list
 * that includes the tags relation (many-to-many).
 */
export async function getAllBlogTagsWithCounts(): Promise<StrapiBlogTagWithCount[]> {
  const [tagsRes, postsRes] = await Promise.all([
    strapiGet<StrapiListResponse<StrapiBlogTag>>(
      "/blog-tags?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100",
      { revalidate: 3600, tags: ["blog-tags"] }
    ),
    strapiGet<StrapiListResponse<{ id: number; tags: { id: number }[] | null }>>(
      "/blog-posts?fields[0]=id&populate[tags][fields][0]=id&pagination[pageSize]=1000&status=published",
      { revalidate: 3600, tags: ["blog-listing"] }
    ),
  ]);

  const countMap: Record<number, number> = {};
  for (const post of postsRes.data) {
    for (const tag of post.tags ?? []) {
      countMap[tag.id] = (countMap[tag.id] ?? 0) + 1;
    }
  }

  return tagsRes.data
    .map((tag) => ({ ...tag, postCount: countMap[tag.id] ?? 0 }))
    .filter((tag) => tag.postCount > 0); // only show tags that have posts
}

/**
 * Fetches a single blog post with full populate (heroImage, category, tags,
 * seo, body). Returns null if no post with the given slug is found.
 */
export async function getBlogPostBySlug(slug: string): Promise<StrapiBlogPost | null> {
  const populate = [
    "populate[cardImage]=true",
    "populate[heroImage]=true",
    "populate[category][fields][0]=name",
    "populate[category][fields][1]=slug",
    "populate[tags][fields][0]=name",
    "populate[tags][fields][1]=slug",
    "populate[seo][populate][metaSocial][populate]=image",
  ].join("&");

  const res = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}`
  );
  return res.data[0] ?? null;
}

/**
 * Fetches all blog post slugs — used in generateStaticParams for the
 * /blog/[slug] route. Minimal payload (slug only).
 */
export async function getAllBlogSlugsForStaticParams(): Promise<{ slug: string }[]> {
  const res = await strapiGet<StrapiListResponse<Pick<StrapiBlogPost, "slug">>>(
    "/blog-posts?fields[0]=slug&pagination[pageSize]=1000"
  );
  return res.data;
}

/**
 * Fetches up to `limit` related posts for the "Keep reading" section.
 * Prioritises posts in the same category, backfills with most recent
 * posts from other categories if fewer than `limit` are available.
 */
export async function getRelatedBlogPosts(
  currentPostId: number,
  categoryId: number | null,
  limit = 3
): Promise<StrapiBlogPost[]> {
  const sameCategory: StrapiBlogPost[] = [];

  if (categoryId) {
    const r = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
      `/blog-posts?${BLOG_CARD_FIELDS}` +
        `&filters[category][id][$eq]=${categoryId}` +
        `&filters[id][$ne]=${currentPostId}` +
        `&sort=publishedAt:desc` +
        `&pagination[pageSize]=${limit}`,
      { revalidate: 3600, tags: ["blog-listing"] }
    );
    sameCategory.push(...r.data);
  }

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  // Backfill with posts from other categories
  const needed = limit - sameCategory.length;
  const sameCategoryIds = new Set(sameCategory.map((p) => p.id));

  const r = await strapiGet<StrapiListResponse<StrapiBlogPost>>(
    `/blog-posts?${BLOG_CARD_FIELDS}` +
      `&filters[id][$ne]=${currentPostId}` +
      `&sort=publishedAt:desc` +
      `&pagination[pageSize]=${limit * 3 + 5}`,
    { revalidate: 3600, tags: ["blog-listing"] }
  );

  const backfill = r.data.filter((p) => !sameCategoryIds.has(p.id));
  return [...sameCategory, ...backfill.slice(0, needed)];
}

// ── Legal page content type ───────────────────────────────────────────────────

export interface StrapiLegalPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  body: BlockNode[] | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetches a single legal page by slug (title + body).
 * Returns null if no published entry matches.
 */
export async function getLegalPageBySlug(slug: string): Promise<StrapiLegalPage | null> {
  const res = await strapiGet<StrapiListResponse<StrapiLegalPage>>(
    `/legal-pages?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&fields[0]=title&fields[1]=slug&fields[2]=body` +
      `&fields[3]=updatedAt&fields[4]=publishedAt`
  );
  return res.data[0] ?? null;
}

/**
 * Fetches all legal page slugs — used in generateStaticParams for the
 * root /[slug] route. Minimal payload (slug only).
 */
export async function getAllLegalPageSlugs(): Promise<{ slug: string }[]> {
  const res = await strapiGet<StrapiListResponse<Pick<StrapiLegalPage, "slug">>>(
    "/legal-pages?fields[0]=slug&pagination[pageSize]=100"
  );
  return res.data;
}

// ── Industry queries ──────────────────────────────────────────────────────────

export async function getIndustries(): Promise<StrapiIndustry[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    "/industries?sort=industryName:asc&pagination[pageSize]=100"
  );
  return res.data;
}

/** Fetches only slugs — for use in generateStaticParams (minimal payload). */
export async function getAllIndustrySlugs(): Promise<{ slug: string }[]> {
  const res = await strapiGet<StrapiListResponse<Pick<StrapiIndustry, "slug">>>(
    "/industries?fields[0]=slug&pagination[pageSize]=100"
  );
  return res.data;
}

/**
 * Fetches only industryName + slug for every published industry, sorted
 * alphabetically. Used in the shared header/footer nav so the payload is
 * as small as possible — no images, no components, no rich text.
 *
 * Cached for up to 1 hour (time-based) AND tagged as "industries-nav" so
 * the Strapi webhook can bust it immediately on any industry publish/update.
 */
export async function getIndustryNavList(): Promise<StrapiIndustryNavItem[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryNavItem>>(
    "/industries?fields[0]=industryName&fields[1]=slug&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-nav"] }
  );
  return res.data;
}

/**
 * Fetches the fields needed to render the homepage "Industries" section:
 * name, slug, card image (populated), tagline, and the isFeatured flag.
 *
 * Tagged as "industries-listing" so the Strapi webhook can bust it on publish.
 */
export async function getFeaturedIndustriesForHomepage(): Promise<StrapiIndustryCard[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryCard>>(
    "/industries?fields[0]=industryName&fields[1]=slug&fields[2]=cardTagline&fields[3]=isFeatured&populate[cardImage]=true&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-listing"] }
  );
  return res.data;
}

/**
 * Fetches all industries with the card-level fields needed for the /industries
 * listing page. Returns the complete list — pagination is not needed unless
 * the industry count grows significantly (current count is ~10).
 *
 * Tagged as "industries-listing" so the Strapi webhook can bust it on publish.
 */
export async function getAllIndustriesForListing(): Promise<StrapiIndustryCard[]> {
  const res = await strapiGet<StrapiListResponse<StrapiIndustryCard>>(
    "/industries?fields[0]=industryName&fields[1]=slug&fields[2]=cardTagline&fields[3]=isFeatured&populate[cardImage]=true&sort=industryName:asc&pagination[pageSize]=100",
    { revalidate: 3600, tags: ["industries-listing"] }
  );
  return res.data;
}

/** Full deep-populate fetch for a single industry page. */
export async function getIndustryBySlug(slug: string): Promise<StrapiIndustry | null> {
  // Build deep populate in a single request — avoids N+1 calls.
  const populate = [
    // Hero
    "populate[heroHeadline]=true",
    "populate[heroPrimaryCta]=true",
    "populate[heroSecondaryCta]=true",
    "populate[heroStats]=true",
    "populate[heroImage]=true",
    // Problems
    "populate[problemsHeading]=true",
    "populate[problems][populate]=*",
    // Features
    "populate[featuresHeading]=true",
    "populate[features][populate]=*",
    // Dashboard
    "populate[dashboardHeading]=true",
    "populate[dashboardFeatures][populate]=*",
    "populate[dashboardCta]=true",
    // Onboarding
    "populate[onboardingHeading]=true",
    "populate[onboardingSteps]=true",
    "populate[onboardingCta]=true",
    // Contact
    "populate[contactHeading]=true",
    // FAQ
    "populate[faqHeading]=true",
    "populate[faqItems]=true",
    // SEO
    "populate[seo][populate][metaSocial][populate]=image",
  ].join("&");

  const res = await strapiGet<StrapiListResponse<StrapiIndustry>>(
    `/industries?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}`
  );
  return res.data[0] ?? null;
}

/**
 * @deprecated Use getIndustryBySlug() instead — this alias kept for
 * any code that imported the old function name.
 */
export const getIndustry = getIndustryBySlug;

// ── Heading segment helpers ───────────────────────────────────────────────────

/**
 * Maps a StrapiHeadlineSegment array to the headingBefore / headingAccent
 * shape expected by existing industry section components.
 *
 * All "default" segments are joined (with line breaks preserved as an array)
 * and the first "accent" segment becomes the accent phrase.
 */
export function segmentsToProps(
  segments: StrapiHeadlineSegment[] | null | undefined
): { headingBefore: string[]; headingAccent: string } {
  if (!segments || segments.length === 0) {
    return { headingBefore: [""], headingAccent: "" };
  }
  const before = segments
    .filter((s) => s.style === "default")
    .map((s) => s.text);
  const accent = segments.find((s) => s.style === "accent")?.text ?? "";
  return { headingBefore: before.length > 0 ? before : [""], headingAccent: accent };
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
