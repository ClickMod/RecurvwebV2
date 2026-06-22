import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_POSTS, POST_CONTENT, type BodyBlock } from "@/components/blogData";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PhotoSlot } from "@/components/PhotoSlot";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { ContactCallSection } from "@/components/contact/ContactCallSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

function renderBlock(block: BodyBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={idx}
          id={block.text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
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
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
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
          {block.text}
        </h3>
      );
    case "blockquote":
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
            {block.text}
          </p>
        </blockquote>
      );
    case "ul":
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
          {block.items.map((item, i) => (
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
              />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
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
          {block.text}
        </p>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);
  const content = POST_CONTENT[slug];

  if (!post || !content) notFound();

  const relatedPosts = ALL_POSTS.filter(
    (p) => p.slug !== slug && p.industry === post.industry
  ).slice(0, 3);

  const morePosts =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...ALL_POSTS.filter(
            (p) => p.slug !== slug && p.industry !== post.industry
          ).slice(0, 3 - relatedPosts.length),
        ]
      : relatedPosts;

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
              Home
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: t.inkSoft, textDecoration: "none" }}>
              Blog
            </Link>
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
                <span>{post.category}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{post.readTime} MIN READ</span>
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

              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: t.inkSoft,
                  margin: 0,
                  maxWidth: 680,
                }}
              >
                {content.subtitle}
              </p>

            </div>

            {/* Right — tags + TOC on desktop */}
            <div
              className="hidden lg:flex flex-col gap-6 pt-2"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: 1,
                      padding: "5px 12px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      color: t.inkSoft,
                      background: t.surfaceAlt,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* TOC preview */}
              <div
                style={{
                  border: `1px solid ${t.line}`,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  className="mono px-5 py-3"
                  style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    color: t.inkSoft,
                    borderBottom: `1px solid ${t.line}`,
                    background: t.surfaceAlt,
                  }}
                >
                  IN THIS ARTICLE
                </div>
                <ol className="flex flex-col" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {content.toc.map((item, i) => (
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
                          borderBottom: i < content.toc.length - 1 ? `1px solid ${t.line}` : "none",
                        }}
                        className="hover:bg-[#F6F5F0] transition-colors duration-100"
                      >
                        <span
                          className="mono flex-shrink-0"
                          style={{ fontSize: 10, color: t.primary, letterSpacing: 1, minWidth: 20 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ lineHeight: 1.4 }}>{item}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Hero image ─────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
        <Container>
          <PhotoSlot
            label={post.imageDesc}
            caption={`${post.category} · ${post.readTime} MIN READ`}
            tint={t.primary}
            bg={post.imageBg}
            ratio="21 / 7"
            rounded={0}
            variant="spotlight"
          />
        </Container>
      </div>

      {/* ── Article body ───────────────────────────────── */}
      <div className="py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-20 items-start">

            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 flex flex-col gap-4">
                <div
                  className="mono"
                  style={{ fontSize: 10, letterSpacing: 1.5, color: t.inkSoft }}
                >
                  IN THIS ARTICLE
                </div>
                <ol className="flex flex-col gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {content.toc.map((item, i) => (
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

                {/* Mobile TOC accordion trigger is below */}
                <div
                  className="mt-6 pt-4"
                  style={{ borderTop: `1px solid ${t.line}` }}
                >
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

            {/* Article body */}
            <article>
              {/* Mobile TOC */}
              <details
                className="lg:hidden mb-8 overflow-hidden"
                style={{
                  border: `1px solid ${t.line}`,
                  borderRadius: 10,
                }}
              >
                <summary
                  className="mono cursor-pointer px-5 py-3 flex items-center justify-between"
                  style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft, background: t.surfaceAlt }}
                >
                  IN THIS ARTICLE
                  <span style={{ color: t.primary }}>▾</span>
                </summary>
                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {content.toc.map((item, i) => (
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

              {/* Body blocks */}
              <div style={{ maxWidth: 740 }}>
                {content.body.map((block, idx) => renderBlock(block, idx))}
              </div>

              {/* Tags row — mobile + bottom of article */}
              <div
                className="flex flex-wrap gap-2 mt-12 pt-8"
                style={{ borderTop: `1px solid ${t.line}` }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, alignSelf: "center" }}
                >
                  TAGS
                </span>
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: 1,
                      padding: "5px 12px",
                      borderRadius: 999,
                      border: `1px solid ${t.line}`,
                      color: t.inkSoft,
                      background: t.surfaceAlt,
                    }}
                  >
                    {tag}
                  </span>
                ))}
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
        <Section
          className="pt-0"
          style={{ borderTop: `1px solid ${t.line}` }}
        >
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
                <BlogCard key={p.slug} post={p} />
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
