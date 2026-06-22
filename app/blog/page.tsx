"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { theme as t } from "@/components/theme";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { BlogCard } from "@/components/BlogCard";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Button } from "@/components/Button";
import { ALL_POSTS } from "@/components/blogData";

const BLOG_INDUSTRIES = [
  { key: "all",        label: "All articles" },
  { key: "Golf",       label: "Golf clubs" },
  { key: "Medical",    label: "Medical" },
  { key: "Sport",      label: "Sport clubs" },
  { key: "Rentals",    label: "Property & rentals" },
  { key: "Compliance", label: "Compliance" },
  { key: "Platform",   label: "Platform" },
];

export default function BlogIndexPage() {
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [industry, setIndustry] = useState("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: ALL_POSTS.length };
    for (const p of ALL_POSTS) c[p.industry] = (c[p.industry] || 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    let xs = industry === "all" ? ALL_POSTS : ALL_POSTS.filter((p) => p.industry === industry);
    xs = [...xs].sort((a, b) =>
      sort === "latest" ? b.dateSort - a.dateSort : a.dateSort - b.dateSort
    );
    return xs;
  }, [sort, industry]);

  const showFeatured = industry === "all" && sort === "latest" && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${t.line}` }}>
        <Container>
          <div
            className="mono flex items-center gap-2 py-5"
            style={{ fontSize: 13, color: t.inkSoft }}
          >
            <span>Resources</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: t.ink, fontWeight: 500 }}>Blog</span>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <Section className="py-10 lg:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <div
                className="mono mb-7"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                THE RECURV BLOG
              </div>
              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-hero)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.045em",
                  margin: 0,
                }}
              >
                Field notes on
                <br />
                <span style={{ color: t.primary }}>recurring revenue.</span>
              </h1>
            </div>
            <div>
              <p style={{ fontSize: 18, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Practical, vendor-neutral writing on debit orders, payment plans and running a business with predictable revenueacross South Africa. Written by the people who build
                Recurv and the operators using it.
              </p>
              <div
                className="mono mt-7 flex flex-wrap gap-4 items-center"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                <span>{ALL_POSTS.length} ARTICLES</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>UPDATED WEEKLY</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>RSS</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter bar */}
      <div
        style={{
          borderTop: `1px solid ${t.line}`,
          borderBottom: `1px solid ${t.line}`,
          background: t.surfaceAlt,
        }}
      >
        <Container>
          <div className="py-5">

            {/* ── Mobile: two dropdowns side-by-side ── */}
            <div className="flex gap-3 md:hidden">
              {/* Industry dropdown */}
              <div className="relative flex-1">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none cursor-pointer pr-9 pl-4"
                  style={{
                    height: 44,
                    border: `1px solid ${industry !== "all" ? t.ink : t.line}`,
                    borderRadius: 999,
                    background: industry !== "all" ? t.ink : t.bg,
                    color: industry !== "all" ? "#fff" : t.ink,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: t.fontBody,
                    outline: "none",
                  }}
                >
                  {BLOG_INDUSTRIES.map((ind) => (
                    <option key={ind.key} value={ind.key} style={{ background: "#fff", color: t.ink }}>
                      {ind.label} ({String(counts[ind.key] || 0).padStart(2, "0")})
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke={industry !== "all" ? "#fff" : t.inkSoft}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
                  className="appearance-none cursor-pointer pr-9 pl-4"
                  style={{
                    height: 44,
                    border: `1px solid ${t.line}`,
                    borderRadius: 999,
                    background: t.bg,
                    color: t.ink,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: t.fontBody,
                    outline: "none",
                    minWidth: 100,
                  }}
                >
                  <option value="latest" style={{ background: "#fff", color: t.ink }}>Latest</option>
                  <option value="oldest" style={{ background: "#fff", color: t.ink }}>Oldest</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke={t.inkSoft}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* ── Desktop: pills + sort toggle ── */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
              {/* Industry pills */}
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className="mono mr-2"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
                >
                  FILTER
                </span>
                {BLOG_INDUSTRIES.map((ind) => {
                  const active = industry === ind.key;
                  const n = counts[ind.key] || 0;
                  return (
                    <button
                      key={ind.key}
                      type="button"
                      onClick={() => setIndustry(ind.key)}
                      className="inline-flex items-center gap-2 transition-all duration-[120ms] cursor-pointer"
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: active ? t.ink : "transparent",
                        color: active ? "#fff" : t.ink,
                        border: `1px solid ${active ? t.ink : t.line}`,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {ind.label}
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: 0.5,
                          color: active ? "rgba(255,255,255,0.65)" : t.inkSoft,
                        }}
                      >
                        {String(n).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sort toggle */}
              <div className="flex items-center gap-3">
                <span
                  className="mono"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
                >
                  SORT
                </span>
                <div
                  className="inline-flex p-0.5"
                  style={{
                    border: `1px solid ${t.line}`,
                    borderRadius: 999,
                    background: t.bg,
                  }}
                >
                  {(["latest", "oldest"] as const).map((k) => {
                    const active = sort === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSort(k)}
                        className="cursor-pointer transition-all duration-[120ms]"
                        style={{
                          padding: "6px 14px",
                          borderRadius: 999,
                          background: active ? t.ink : "transparent",
                          color: active ? "#fff" : t.ink,
                          border: "none",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        {k === "latest" ? "Latest" : "Oldest"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Results + posts */}
      <div className="pt-5 pb-16 lg:pb-24">
        <Container>
          {/* Count / clear row */}
          <div className="flex items-baseline justify-between mb-8">
            <div
              className="mono"
              style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
            >
              SHOWING {String(filtered.length).padStart(2, "0")}
              {industry !== "all" && (
                <> · {BLOG_INDUSTRIES.find((i) => i.key === industry)?.label.toUpperCase()}</>
              )}
              {" · "}
              {sort === "latest" ? "NEWEST FIRST" : "OLDEST FIRST"}
            </div>
            {industry !== "all" && (
              <button
                type="button"
                onClick={() => setIndustry("all")}
                className="cursor-pointer"
                style={{
                  fontSize: 13,
                  color: t.primary,
                  background: "none",
                  border: "none",
                  fontWeight: 500,
                  padding: 0,
                }}
              >
                Clear filter ×
              </button>
            )}
          </div>

          {/* Featured post card */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
            <article
              className="grid grid-cols-1 overflow-hidden mb-10 lg:grid-cols-[1.1fr_1fr] transition-[border-color,box-shadow] duration-[140ms] hover:shadow-[0_4px_24px_rgba(79,51,217,0.2)] hover:border-[#4F33D9]"
              style={{
                background: t.surface,
                border: `1px solid ${t.line}`,
                borderRadius: 16,
                cursor: "pointer",
              }}
            >
              <PhotoSlot
                label={featured.imageDesc}
                caption={`${featured.category} · FEATURED`}
                tint={t.primary}
                bg={featured.imageBg}
                ratio="4 / 3"
                rounded={0}
                variant="spotlight"
              />
              <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      padding: "4px 10px",
                      borderRadius: 4,
                      background: t.primary,
                      color: "#fff",
                      letterSpacing: 1.5,
                    }}
                  >
                    LATEST
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
                  >
                    {featured.category} · {featured.readTime} MIN READ
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: t.fontDisplay,
                    fontWeight: 500,
                    fontSize: "var(--fs-h2-lg)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  {featured.title}
                </h2>
                <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                  {featured.excerpt}
                </p>
                <div
                  className="flex items-center justify-end pt-5 mt-3"
                  style={{ borderTop: `1px solid ${t.line}` }}
                >
                  <Button size="sm" icon={<span>→</span>}>
                    Read article
                  </Button>
                </div>
              </div>
            </article>
            </Link>
          )}

          {/* Post grid or empty state */}
          {rest.length === 0 ? (
            <div
              className="py-20 text-center"
              style={{
                border: `1px dashed ${t.line}`,
                borderRadius: 12,
                background: t.surface,
              }}
            >
              <div
                className="mono mb-3"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                NO ARTICLES YET
              </div>
              <div
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 28,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Nothing in this category — try another industry.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {rest.length > 0 && (
            <div
              className="flex flex-col gap-3 mt-14 pt-6 md:flex-row md:items-center md:justify-between"
              style={{ borderTop: `1px solid ${t.line}` }}
            >
              {/* Page count — top on desktop, below buttons on mobile */}
              <div
                className="mono order-2 text-center md:order-1 md:text-left"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                PAGE 01 OF 01
              </div>
              <div className="flex gap-2 justify-center order-1 md:order-2 md:justify-end">
                <button
                  type="button"
                  disabled
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    border: `1px solid ${t.line}`,
                    background: "transparent",
                    color: t.inkSoft,
                    fontSize: 13,
                    cursor: "not-allowed",
                  }}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    border: `1px solid ${t.line}`,
                    background: "transparent",
                    color: t.inkSoft,
                    fontSize: 13,
                    cursor: "not-allowed",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
