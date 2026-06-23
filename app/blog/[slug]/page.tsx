import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogPost,
  getBlogPosts,
  extractHeadings,
  toPostCard,
  type BlockNode,
  type InlineNode,
  type ListItemNode,
} from "@/lib/strapi";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { BlogShareRow } from "@/components/BlogShareRow";
import { ContactCallSection } from "@/components/contact/ContactCallSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    // Strapi may not be reachable at build time in local dev — return empty list
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    if (!post) return {};
    return {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
    };
  } catch {
    return {};
  }
}

// ── Strapi Blocks renderer ────────────────────────────────────────────────────

function renderInline(nodes: InlineNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    let el: React.ReactNode = node.text;
    if (node.bold) el = <strong key={i}>{el}</strong>;
    if (node.italic) el = <em key={i}>{el}</em>;
    if (node.underline) el = <u key={i}>{el}</u>;
    if (node.code) el = <code key={i} style={{ fontFamily: "monospace", background: t.surfaceAlt, padding: "2px 5px", borderRadius: 4 }}>{el}</code>;
    return <span key={i}>{el}</span>;
  });
}

function renderListItem(node: ListItemNode, i: number): React.ReactNode {
  return (
    <li
      key={i}
      style={{
        fontSize: 17,
        lineHeight: 1.65,
        color: t.inkSoft,
        paddingLeft: 20,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "0.55em",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: t.primary,
          display: "block",
        }}
        aria-hidden="true"
      />
      {renderInline(node.children)}
    </li>
  );
}

function renderBlock(block: BlockNode, idx: number): React.ReactNode {
  switch (block.type) {
    case "heading": {
      const text = block.children.map((c) => c.text).join("");
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (block.level === 2) {
        return (
          <h2
            key={idx}
            id={id}
            style={{
              fontFamily: t.fontDisplay,
              fontSize: "var(--fs-h2-md)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "2.5em 0 0.75em",
              color: t.ink,
            }}
          >
            {renderInline(block.children)}
          </h2>
        );
      }
      return (
        <h3
          key={idx}
          id={id}
          style={{
            fontFamily: t.fontDisplay,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "2em 0 0.5em",
            color: t.ink,
          }}
        >
          {renderInline(block.children)}
        </h3>
      );
    }
    case "quote":
      return (
        <blockquote
          key={idx}
          style={{
            borderLeft: `3px solid ${t.primary}`,
            paddingLeft: 24,
            margin: "2em 0",
            color: t.inkSoft,
          }}
        >
          <p
            style={{
              fontFamily: t.fontDisplay,
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {renderInline(block.children)}
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul
          key={idx}
          style={{
            paddingLeft: 0,
            listStyle: "none",
            margin: "1.5em 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {block.children.map((item, i) => renderListItem(item, i))}
        </ul>
      );
    case "image":
      return (
        <figure key={idx} style={{ margin: "2em 0" }}>
          <Image
            src={block.image.url}
            alt={block.image.alternativeText ?? ""}
            width={block.image.width}
            height={block.image.height}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </figure>
      );
    case "code":
      return (
        <pre
          key={idx}
          style={{
            background: t.surfaceAlt,
            border: `1px solid ${t.line}`,
            borderRadius: 8,
            padding: "16px 20px",
            overflowX: "auto",
            margin: "1.5em 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <code style={{ fontFamily: "monospace" }}>
            {block.children.map((c) => c.text).join("")}
          </code>
        </pre>
      );
    default:
      // paragraph
      return (
        <p
          key={idx}
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: t.inkSoft,
            margin: "1.25em 0",
          }}
        >
          {renderInline((block as { type: "paragraph"; children: InlineNode[] }).children)}
        </p>
      );
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  // Fetch all posts for the related articles row
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.industry === post.industry)
    .slice(0, 3);
  const morePosts =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...allPosts
            .filter((p) => p.slug !== slug && p.industry !== post.industry)
            .slice(0, 3 - relatedPosts.length),
        ]
      : relatedPosts;

  const toc = extractHeadings(post.content);

  const dateFormatted = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div>
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
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: t.inkSoft }}>{(post.category ?? "Article").toUpperCase()}</span>
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
                <span>{post.category ?? "Article"}</span>
                {post.readTime && (
                  <>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{post.readTime} MIN READ</span>
                  </>
                )}
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
                  url={`https://recurv.co.za/blog/${post.slug}`}
                  title={post.title}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Hero image ─────────────────────────────────── */}
      {post.featuredImage && (
        <div style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
          <Container>
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alternativeText ?? post.title}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
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
                    {toc.map((item, i) => (
                      <li key={i}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
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
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="group-hover:underline">{item}</span>
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
                    {toc.map((item, i) => (
                      <li key={i}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
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
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {/* Body blocks */}
              <div style={{ maxWidth: 740 }}>
                {post.content?.map((block, idx) => renderBlock(block, idx))}
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

      {/* ── Related articles ───────────────────────────── */}
      {morePosts.length > 0 && (
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
              {morePosts.map((p) => (
                <BlogCard key={p.slug} post={toPostCard(p)} />
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
