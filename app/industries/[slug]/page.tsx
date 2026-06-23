import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getIndustry, getIndustries, type BlockNode, type InlineNode, type ListItemNode } from "@/lib/strapi";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { CallSection } from "@/components/sections/CallSection";

/**
 * Allow slugs that weren't pre-built to be rendered on first request (ISR).
 * This means a new industry created in Strapi appears on the frontend
 * immediately after the first visitor hits its URL — no redeploy needed.
 */
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const industries = await getIndustries();
    return industries.map((i) => ({ slug: i.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const industry = await getIndustry(slug);
    if (!industry) return {};
    return {
      title: industry.metaTitle ?? `${industry.title} — Recurv`,
      description: industry.metaDescription ?? undefined,
    };
  } catch {
    return {};
  }
}

// ── Strapi Blocks renderer (shared pattern with blog page) ───────────────────

function renderInline(nodes: InlineNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    let el: React.ReactNode = node.text;
    if (node.bold) el = <strong key={i}>{el}</strong>;
    if (node.italic) el = <em key={i}>{el}</em>;
    if (node.underline) el = <u key={i}>{el}</u>;
    if (node.code)
      el = (
        <code
          key={i}
          style={{
            fontFamily: "monospace",
            background: t.surfaceAlt,
            padding: "2px 5px",
            borderRadius: 4,
          }}
        >
          {el}
        </code>
      );
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
              color: t.inkSoft,
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

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = await getIndustry(slug);

  if (!industry) notFound();

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-4 lg:pb-24">
        <Container>
          {/* Breadcrumb */}
          <nav
            className="mono mb-10 flex items-center gap-2"
            style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}
            aria-label="Breadcrumb"
          >
            <a href="/industries" style={{ color: t.inkSoft, textDecoration: "none" }}>
              Industries
            </a>
            <span aria-hidden="true">/</span>
            <span style={{ color: t.ink }}>{industry.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 items-center">
            {/* Left: heading + body */}
            <div className="min-w-0">
              <div
                className="mono mb-7"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                INDUSTRIES · {industry.title.toUpperCase()}
              </div>

              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-hero)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.04em",
                  margin: 0,
                  color: t.ink,
                }}
              >
                {industry.title}
              </h1>

              {industry.metaDescription && (
                <p
                  className="mt-8 max-w-[520px]"
                  style={{ fontSize: 18, lineHeight: 1.6, color: t.inkSoft }}
                >
                  {industry.metaDescription}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-9">
                <a
                  href="/contactus"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors duration-150"
                  style={{
                    background: t.ink,
                    color: t.bg,
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  Book a live demo
                </a>
                <a
                  href="/contactus"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-150"
                  style={{
                    border: `1px solid ${t.line}`,
                    color: t.ink,
                    textDecoration: "none",
                    fontSize: 15,
                  }}
                >
                  Talk to our team <span>→</span>
                </a>
              </div>
            </div>

            {/* Right: featured image or placeholder */}
            <div className="w-full">
              {industry.featuredImage ? (
                <Image
                  src={industry.featuredImage.url}
                  alt={industry.featuredImage.alternativeText ?? industry.title}
                  width={industry.featuredImage.width}
                  height={industry.featuredImage.height}
                  className="w-full rounded-xl object-cover"
                  style={{ maxHeight: 520 }}
                  priority
                />
              ) : (
                <div
                  className="w-full rounded-xl"
                  style={{
                    aspectRatio: "4 / 5",
                    background: t.surfaceAlt,
                    border: `1px solid ${t.line}`,
                  }}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Rich text body ─────────────────────────────── */}
      {industry.content && industry.content.length > 0 && (
        <Section style={{ borderTop: `1px solid ${t.line}` }}>
          <Container>
            <div className="mx-auto" style={{ maxWidth: 860 }}>
              {industry.content.map((block, idx) => renderBlock(block, idx))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Shared static sections ─────────────────────── */}
      <CallSection
        eyebrow={`TALK TO A ${industry.title.toUpperCase()} SPECIALIST`}
        headingBefore="Ready to get"
        headingAccent="started?"
        body="Speak to someone who knows your industry. We'll walk you through the onboarding and have your first collection running within a week."
        phoneLabel={industry.title.toUpperCase()}
        primaryLabel="Call us now"
        secondaryLabel="WhatsApp us"
      />

      <StatsSection />
      <CtaSection />
    </main>
  );
}
