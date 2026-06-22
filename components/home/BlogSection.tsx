import { Button } from "@/components/Button";
import { BlogCard } from "@/components/BlogCard";
import { LATEST_POSTS, ALL_POSTS } from "@/components/blogData";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export function BlogSection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              FROM THE BLOG
            </div>
            <h2 className="max-w-[820px]" style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-xl)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              Field notes on payment operations —{" "}
              <span style={{ color: t.primary }}>written by the team.</span>
            </h2>
            <p className="mt-5 max-w-[640px]" style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.55 }}>
              Practical, vendor-neutral writing on collections, payment plans, and running a finance team across South Africa.
            </p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5">
              <Button variant="secondary" icon={<span>→</span>}>View all articles</Button>
              <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>
                {ALL_POSTS.length} ARTICLES · UPDATED WEEKLY
              </div>
            </div>
          </Reveal>
        </div>

        {/* Blog card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LATEST_POSTS.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * STAGGER} className="h-full">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
