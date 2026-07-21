import Link from "next/link";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

interface BlogPostBreadcrumbProps {
  title: string;
  category?: { name: string; slug: string } | null;
}

const linkStyle = { color: t.inkSoft, textDecoration: "none" as const };
const separatorStyle = { opacity: 0.4 };

export function BlogPostBreadcrumb({ title, category }: BlogPostBreadcrumbProps) {
  return (
    <div style={{ borderBottom: `1px solid ${t.line}` }}>
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mono min-w-0 py-5"
          style={{ fontSize: 13, color: t.inkSoft }}
        >
          {/* Mobile — back link + truncated title */}
          <div className="flex min-w-0 items-center gap-2 md:hidden">
            <Link href="/blog" className="shrink-0" style={linkStyle}>
              ← Blog
            </Link>
            <span aria-hidden="true" style={separatorStyle}>
              ·
            </span>
            <span
              className="min-w-0 truncate"
              style={{ color: t.ink, fontWeight: 500 }}
              aria-current="page"
            >
              {title}
            </span>
          </div>

          {/* Desktop — full trail */}
          <ol className="hidden md:flex min-w-0 list-none items-center gap-2 p-0 m-0">
            <li className="flex shrink-0 items-center gap-2">
              <Link href="/" style={linkStyle}>
                Resources
              </Link>
              <span aria-hidden="true" style={separatorStyle}>
                /
              </span>
            </li>

            <li className="flex shrink-0 items-center gap-2">
              <Link href="/blog" style={linkStyle}>
                Blog
              </Link>
              {category && (
                <span aria-hidden="true" style={separatorStyle}>
                  /
                </span>
              )}
            </li>

            {category && (
              <li className="flex min-w-0 max-w-[16rem] items-center gap-2 lg:max-w-[20rem]">
                <Link
                  href={`/blog?category=${category.slug}`}
                  className="truncate"
                  style={linkStyle}
                >
                  {category.name}
                </Link>
                <span aria-hidden="true" className="shrink-0" style={separatorStyle}>
                  /
                </span>
              </li>
            )}

            <li
              className="min-w-0 flex-1 truncate"
              style={{ color: t.ink, fontWeight: 500 }}
              aria-current="page"
            >
              {title}
            </li>
          </ol>
        </nav>
      </Container>
    </div>
  );
}
