import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogPostBySlug,
  getAllBlogSlugsForStaticParams,
  getRelatedBlogPosts,
  strapiImageUrl,
} from "@/lib/strapi";
import {
  extractTableOfContents,
  calculateReadTime,
} from "@/lib/blog-content";
import { RichText } from "@/components/RichText";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { CmsBlogPostCard } from "@/components/CmsBlogPostCard";
import { Button } from "@/components/Button";
import { BlogShareRow } from "@/components/BlogShareRow";
import { ContactCallSection } from "@/components/contact/ContactCallSection";
import { RevenueCtaSection } from "@/components/sections/RevenueCtaSection";

/**
 * Allow slugs that weren't pre-built to be rendered on first request (ISR).
 * New blog posts published in Strapi appear immediately after the first visitor
 * hits the URL — no redeploy needed.
 */
export const dynamicParams = true;

const SITE_URL = "https://recurv.tech";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugsForStaticParams();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const seo = post.seo;
    const title = seo?.metaTitle ?? `${post.title} — Recurv Blog`;
    const description = seo?.metaDescription ?? post.excerpt ?? undefined;
    const ogImage =
      seo?.metaSocial?.find((s) => s.socialNetwork === "OpenGraph")?.image?.url ??
      strapiImageUrl(post.heroImage?.url ?? post.cardImage?.url);

    return {
      title,
      description: description ?? undefined,
      openGraph: {
        title: seo?.metaSocial?.find((s) => s.socialNetwork === "OpenGraph")?.title ?? title,
        description:
          seo?.metaSocial?.find((s) => s.socialNetwork === "OpenGraph")?.description ??
          description ??
          undefined,
        images: ogImage ? [{ url: ogImage }] : undefined,
        type: "article",
        publishedTime: post.publishedAt ?? undefined,
      },
      twitter: {
        title: seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter")?.title ?? title,
        description:
          seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter")?.description ??
          description ??
          undefined,
        images: (() => {
          const twitterImg =
            seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter")?.image?.url;
          return twitterImg ? [twitterImg] : undefined;
        })(),
      },
    };
  } catch {
    return {};
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedBlogPosts(
    post.id,
    post.category?.id ?? null,
    3
  ).catch(() => []);

  const toc = extractTableOfContents(post.body);
  const readTime = calculateReadTime(post.body);

  const badge = post.category?.name?.toUpperCase() ?? "";

  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const heroImageUrl = strapiImageUrl(post.heroImage?.url);

  // ── Article JSON-LD ────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: heroImageUrl ?? strapiImageUrl(post.cardImage?.url) ?? undefined,
    publisher: {
      "@type": "Organization",
      name: "Recurv",
      url: SITE_URL,
    },
  };

  return (
    <div>
      {/* ── JSON-LD ─────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div style={{ borderBottom: `1px solid ${t.line}` }}>
        <Container>
          <div
            className="mono flex items-center gap-2 py-5"
            style={{ fontSize: 13, color: t.inkSoft }}
          >
            <Link href="/" style={{ color: t.inkSoft, textDecoration: "none" }}>
              Resources
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: t.inkSoft, textDecoration: "none" }}>
              Blog
            </Link>
            {post.category && (
              <>
                <span style={{ opacity: 0.4 }}>/</span>
                <span style={{ color: t.inkSoft }}>{post.category.name.toUpperCase()}</span>
              </>
            )}
            <span style={{ opacity: 0.4 }}>/</span>
            <span
              style={{ color: t.ink, fontWeight: 500, maxWidth: 300 }}
              className="truncate"
            >
              {post.title}
            </span>
          </div>
        </Container>
      </div>

      {/* ── Article header ─────────────────────────────── */}
      <Section className="pb-10 lg:pb-12">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-16 items-start">
            {/* Left — meta + title */}
            <div>
              <div
                className="mono mb-6 flex items-center gap-3 flex-wrap"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                {badge && <span>{badge}</span>}
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{readTime.toUpperCase()}</span>
              </div>

              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-h2-xl)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  margin: "0 0 24px",
                  color: t.ink,
                }}
              >
                {post.title}
              </h1>

              {post.excerpt && (
                <p
                  style={{
                    fontSize: 19,
                    lineHeight: 1.6,
                    color: t.inkSoft,
                    margin: 0,
                    maxWidth: 680,
                  }}
                >
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Right — published + share */}
            <div className="hidden lg:flex flex-col gap-8 pt-2">
              {dateFormatted && (
                <div className="flex flex-col gap-2">
                  <div
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}
                  >
                    PUBLISHED
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: t.ink }}>
                    {dateFormatted}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div
                  className="mono"
                  style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}
                >
                  SHARE
                </div>
                <BlogShareRow
                  url={`${SITE_URL}/blog/${post.slug}`}
                  title={post.title}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}
                  >
                    TAGS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="mono"
                        style={{
                          fontSize: 10,
                          padding: "4px 10px",
                          borderRadius: 4,
                          border: `1px solid ${t.line}`,
                          color: t.inkSoft,
                          letterSpacing: 1,
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Hero image ─────────────────────────────────── */}
      {heroImageUrl && post.heroImage && (
        <div style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
          <Container>
            <Image
              src={heroImageUrl}
              alt={post.heroImage.alternativeText ?? post.title}
              width={post.heroImage.width}
              height={post.heroImage.height}
              className="w-full object-cover"
              style={{ maxHeight: 480, objectPosition: "center" }}
              priority
            />
          </Container>
        </div>
      )}

      {/* ── Article body ───────────────────────────────── */}
      <div className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-20 items-start">

            {/* Sticky TOC — desktop only */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-8 flex flex-col gap-4">
                  <div
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}
                  >
                    IN THIS ARTICLE
                  </div>
                  <ol className="flex flex-col gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-baseline gap-2.5 py-1 group transition-colors duration-100"
                          style={{
                            fontSize: 13,
                            color: t.inkSoft,
                            textDecoration: "none",
                            lineHeight: 1.4,
                          }}
                        >
                          <span
                            className="mono flex-shrink-0"
                            style={{ fontSize: 10, color: t.primary, letterSpacing: 1 }}
                          >
                            {String(item.order).padStart(2, "0")}
                          </span>
                          <span className="group-hover:underline">{item.text}</span>
                        </a>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${t.line}` }}>
                    <Link
                      href="/blog"
                      className="mono flex items-center gap-2 transition-colors duration-100"
                      style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1, textDecoration: "none" }}
                    >
                      <span style={{ color: t.primary }}>←</span> All articles
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* Article body */}
            <article>
              {/* Mobile TOC accordion */}
              {toc.length > 0 && (
                <details
                  className="lg:hidden mb-8 overflow-hidden"
                  style={{ border: `1px solid ${t.line}`, borderRadius: 10 }}
                >
                  <summary
                    className="mono cursor-pointer px-5 py-3 flex items-center justify-between"
                    style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft, background: t.surfaceAlt }}
                  >
                    IN THIS ARTICLE
                    <span style={{ color: t.primary }}>▾</span>
                  </summary>
                  <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 12,
                            padding: "10px 20px",
                            fontSize: 13,
                            color: t.inkSoft,
                            textDecoration: "none",
                            borderTop: `1px solid ${t.line}`,
                          }}
                        >
                          <span
                            className="mono flex-shrink-0"
                            style={{ fontSize: 10, color: t.primary, letterSpacing: 1 }}
                          >
                            {String(item.order).padStart(2, "0")}
                          </span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {/* Body blocks — RichText injects id attributes on H2 headings */}
              <div style={{ maxWidth: 740 }}>
                <RichText blocks={post.body} />
              </div>

              {/* Mobile: published date + share + tags */}
              <div className="lg:hidden mt-10 flex flex-col gap-6" style={{ borderTop: `1px solid ${t.line}`, paddingTop: 24 }}>
                {dateFormatted && (
                  <div className="flex flex-col gap-1">
                    <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}>
                      PUBLISHED
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: t.ink }}>{dateFormatted}</div>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}>
                    SHARE
                  </div>
                  <BlogShareRow url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="mono"
                        style={{
                          fontSize: 10,
                          padding: "4px 10px",
                          borderRadius: 4,
                          border: `1px solid ${t.line}`,
                          color: t.inkSoft,
                          letterSpacing: 1,
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Back link — mobile */}
              <div className="mt-8 lg:hidden">
                <Link
                  href="/blog"
                  className="mono flex items-center gap-2 transition-colors duration-100"
                  style={{ fontSize: 13, color: t.primary, textDecoration: "none" }}
                >
                  ← Back to all articles
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </div>

      {/* ── Platform CTA ──────────────────────────────── */}
      <RevenueCtaSection />

      {/* ── Related articles ───────────────────────────── */}
      {relatedPosts.length > 0 && (
        <Section className="pt-0" style={{ borderTop: `1px solid ${t.line}` }}>
          <Container>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div
                  className="mono mb-4"
                  style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
                >
                  KEEP READING
                </div>
                <h2
                  style={{
                    fontFamily: t.fontDisplay,
                    fontWeight: 500,
                    fontSize: "var(--fs-h2-lg)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.035em",
                    margin: 0,
                  }}
                >
                  More from the{" "}
                  <span style={{ color: t.primary }}>Recurv blog.</span>
                </h2>
              </div>
              <Button variant="ghost" size="sm" icon={<span>→</span>} href="/blog">
                All articles
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <CmsBlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── CTA ───────────────────────────────────────── */}
      <ContactCallSection />
    </div>
  );
}
