import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLegalPageBySlug, getAllLegalPageSlugs } from "@/lib/strapi";
import { extractTableOfContents } from "@/lib/blog-content";
import { RichText } from "@/components/RichText";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

/**
 * Allow slugs that weren't pre-built to be rendered on first request (ISR).
 * New legal pages published in Strapi appear after the first visitor hits
 * the URL — no redeploy needed.
 */
export const dynamicParams = true;

// No explicit `export const revalidate` — uses tag-based on-demand ISR via
// the Strapi webhook at POST /api/revalidate, consistent with blog/industry routes.

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllLegalPageSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getLegalPageBySlug(slug);
    if (!page) return {};

    return {
      title: page.title,
      description: `${page.title} for Recurv.`,
      alternates: { canonical: `/${slug}` },
      robots: { index: false, follow: false },
    };
  } catch {
    return {};
  }
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) notFound();

  const toc = extractTableOfContents(
    page.body,
    [1, 2, 3, 4, 5, 6]
  );

  const updatedFormatted = page.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <Container>
          <h1
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-xl)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: t.ink,
              margin: 0,
              maxWidth: 740,
            }}
          >
            {page.title}
          </h1>

          {updatedFormatted && (
            <p
              className="mt-4 mb-0"
              style={{ fontSize: 14, color: t.inkSoft }}
            >
              Last updated {updatedFormatted}
            </p>
          )}
        </Container>
      </Section>

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
                </div>
              </aside>
            )}

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

              <div style={{ maxWidth: 740 }}>
                <RichText blocks={page.body} />
              </div>
            </article>
          </div>
        </Container>
      </div>
    </>
  );
}
