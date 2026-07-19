import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";
import { CmsBlogPostCard } from "@/components/CmsBlogPostCard";
import type { StrapiBlogPost } from "@/lib/strapi";

interface HomeBlogSectionProps {
  posts: StrapiBlogPost[];
  eyebrow?: string;
  headingBefore?: string;
  headingAccent?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const DEFAULTS = {
  eyebrow: "FROM THE BLOG",
  headingBefore: "Field notes on payment operations",
  headingAccent: "written by the team.",
  body: "Practical, vendor-neutral writing on revenue collections, payment plans and running a finance team across South Africa.",
  ctaLabel: "View all articles",
  ctaHref: "/blog",
};

export function BlogSection({
  posts,
  eyebrow = DEFAULTS.eyebrow,
  headingBefore = DEFAULTS.headingBefore,
  headingAccent = DEFAULTS.headingAccent,
  body = DEFAULTS.body,
  ctaLabel = DEFAULTS.ctaLabel,
  ctaHref = DEFAULTS.ctaHref,
}: HomeBlogSectionProps) {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <div
              className="mono mb-5"
              style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
            >
              {eyebrow}
            </div>
            <h2
              className="max-w-[820px]"
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              {headingBefore}{" "}
              <span style={{ color: t.primary }}>{headingAccent}</span>
            </h2>
            {body && (
              <p
                className="mt-5 max-w-[640px]"
                style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.55 }}
              >
                {body}
              </p>
            )}
          </Reveal>

          <Reveal delay={STAGGER}>
            <div className="flex flex-col-reverse md:flex-col items-start md:items-end gap-2.5">
              <Button
                href={ctaHref}
                variant="secondary"
                icon={<span>→</span>}
                className="w-full md:w-auto justify-center"
              >
                {ctaLabel}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Blog card grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * STAGGER} className="h-full">
                <CmsBlogPostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div
            className="py-16 text-center"
            style={{
              border: `1px dashed ${t.line}`,
              borderRadius: 12,
              background: t.surface,
            }}
          >
            <div
              className="mono"
              style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
            >
              ARTICLES COMING SOON
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
