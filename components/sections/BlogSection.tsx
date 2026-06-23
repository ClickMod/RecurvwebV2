import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";
import { ALL_POSTS, LATEST_POSTS } from "@/components/blogData";

export interface BlogSectionProps {
  /** Small mono eyebrow above the heading */
  eyebrow?: string;
  /** Heading text before the accent phrase */
  headingBefore?: string;
  /** Accent phrase rendered in primary colour */
  headingAccent?: string;
  /** Optional sub-paragraph below the heading */
  body?: string;
  /**
   * Filter posts to one or more industry keys, e.g. ["Schools"].
   * Omit (or pass an empty array) to show across all industries.
   */
  industries?: string[];
  /** Maximum number of cards to render (default 3) */
  limit?: number;
  /**
   * When true and the industry filter returns fewer posts than `limit`,
   * backfill with the most recent posts from other industries (default true).
   */
  fallbackToLatest?: boolean;
  /** CTA button label (default "View all articles") */
  ctaLabel?: string;
  /** CTA button href (default "/blog") */
  ctaHref?: string;
  /** Show the total article count badge (default true) */
  showCount?: boolean;
}

const DEFAULTS = {
  eyebrow: "FROM THE BLOG",
  headingBefore: "Field notes on payment operations —",
  headingAccent: "written by the team.",
  body: "Practical, vendor-neutral writing on collections, payment plans, and running a finance team across South Africa.",
  limit: 3,
  fallbackToLatest: true,
  ctaLabel: "View all articles",
  ctaHref: "/blog",
  showCount: true,
};

export function BlogSection({
  eyebrow = DEFAULTS.eyebrow,
  headingBefore = DEFAULTS.headingBefore,
  headingAccent = DEFAULTS.headingAccent,
  body = DEFAULTS.body,
  industries,
  limit = DEFAULTS.limit,
  fallbackToLatest = DEFAULTS.fallbackToLatest,
  ctaLabel = DEFAULTS.ctaLabel,
  ctaHref = DEFAULTS.ctaHref,
  showCount = DEFAULTS.showCount,
}: BlogSectionProps) {
  const hasFilter = Array.isArray(industries) && industries.length > 0;

  // Filter + sort descending by date
  const filtered = hasFilter
    ? LATEST_POSTS.filter((p) => industries.includes(p.industry))
    : LATEST_POSTS;

  // Backfill with latest posts from other industries if needed
  let posts = filtered.slice(0, limit);
  if (fallbackToLatest && posts.length < limit) {
    const slugsUsed = new Set(posts.map((p) => p.slug));
    const backfill = LATEST_POSTS.filter((p) => !slugsUsed.has(p.slug));
    posts = [...posts, ...backfill].slice(0, limit);
  }

  // Build a filtered blog link (e.g. /blog?industry=Schools)
  const viewAllHref =
    hasFilter && ctaHref === DEFAULTS.ctaHref
      ? `${ctaHref}?industry=${industries![0]}`
      : ctaHref;

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
                href={viewAllHref}
                variant="secondary"
                icon={<span>→</span>}
                className="w-full md:w-auto justify-center"
              >
                {ctaLabel}
              </Button>
              {showCount && (
                <div
                  className="mono"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}
                >
                  {ALL_POSTS.length} ARTICLES · UPDATED WEEKLY
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Blog card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * STAGGER} className="h-full">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
