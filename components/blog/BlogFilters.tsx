"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { theme as t } from "@/components/theme";
import type { StrapiBlogCategoryWithCount, StrapiBlogTagWithCount } from "@/lib/strapi";

interface BlogFiltersProps {
  categories: StrapiBlogCategoryWithCount[];
  tags: StrapiBlogTagWithCount[];
  totalCount: number;
  activeCategory?: string;
  activeTag?: string;
  activeSort: "latest" | "oldest";
  activePage: number;
}

export function BlogFilters({
  categories,
  tags,
  totalCount,
  activeCategory,
  activeTag,
  activeSort,
}: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      // Reset to page 1 on any filter/sort change
      if (updates["page"] === undefined) params.delete("page");
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams]
  );

  function setCategory(slug: string | undefined) {
    router.push(createUrl({ category: slug }));
  }

  function setTag(slug: string | undefined) {
    router.push(createUrl({ tag: slug }));
  }

  function setSort(sort: "latest" | "oldest") {
    router.push(createUrl({ sort }));
  }

  const hasTags = tags.length > 0;

  // ── Pill component (reused for both category and tag rows)
  function Pill({
    active,
    onClick,
    label,
    count,
  }: {
    active: boolean;
    onClick: () => void;
    label: string;
    count?: number;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 transition-all duration-[120ms] cursor-pointer"
        style={{
          padding: "7px 13px",
          borderRadius: 999,
          background: active ? t.ink : "transparent",
          color: active ? "#fff" : t.ink,
          border: `1px solid ${active ? t.ink : t.line}`,
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {label}
        {count !== undefined && (
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: 0.5,
              color: active ? "rgba(255,255,255,0.65)" : t.inkSoft,
            }}
          >
            {String(count).padStart(2, "0")}
          </span>
        )}
      </button>
    );
  }

  // ── Chevron SVG for dropdowns
  function Chevron({ active }: { active: boolean }) {
    return (
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke={active ? "#fff" : t.inkSoft}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const dropdownBase: React.CSSProperties = {
    height: 44,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: t.fontBody,
    outline: "none",
  };

  return (
    <div
      style={{
        borderTop: `1px solid ${t.line}`,
        borderBottom: `1px solid ${t.line}`,
        background: t.surfaceAlt,
      }}
    >
      <div className="px-4 sm:px-8 lg:px-14">
        <div className={`py-5 flex flex-col ${hasTags ? "gap-3" : "gap-0"}`}>

          {/* ── Mobile layout ─────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 md:hidden">
            {/* Category dropdown */}
            <div className="relative flex-1" style={{ minWidth: 120 }}>
              <select
                value={activeCategory ?? ""}
                onChange={(e) => setCategory(e.target.value || undefined)}
                className="w-full appearance-none cursor-pointer pr-9 pl-4"
                style={{
                  ...dropdownBase,
                  border: `1px solid ${activeCategory ? t.ink : t.line}`,
                  background: activeCategory ? t.ink : t.bg,
                  color: activeCategory ? "#fff" : t.ink,
                }}
              >
                <option value="" style={{ background: "#fff", color: t.ink }}>
                  All articles ({String(totalCount).padStart(2, "0")})
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} style={{ background: "#fff", color: t.ink }}>
                    {cat.name} ({String(cat.postCount).padStart(2, "0")})
                  </option>
                ))}
              </select>
              <Chevron active={Boolean(activeCategory)} />
            </div>

            {/* Tag dropdown (only shown if tags exist) */}
            {hasTags && (
              <div className="relative flex-1" style={{ minWidth: 120 }}>
                <select
                  value={activeTag ?? ""}
                  onChange={(e) => setTag(e.target.value || undefined)}
                  className="w-full appearance-none cursor-pointer pr-9 pl-4"
                  style={{
                    ...dropdownBase,
                    border: `1px solid ${activeTag ? t.ink : t.line}`,
                    background: activeTag ? t.ink : t.bg,
                    color: activeTag ? "#fff" : t.ink,
                  }}
                >
                  <option value="" style={{ background: "#fff", color: t.ink }}>
                    All tags
                  </option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.slug} style={{ background: "#fff", color: t.ink }}>
                      {tag.name} ({String(tag.postCount).padStart(2, "0")})
                    </option>
                  ))}
                </select>
                <Chevron active={Boolean(activeTag)} />
              </div>
            )}

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
                className="appearance-none cursor-pointer pr-9 pl-4"
                style={{
                  ...dropdownBase,
                  border: `1px solid ${t.line}`,
                  background: t.bg,
                  color: t.ink,
                  minWidth: 100,
                }}
              >
                <option value="latest" style={{ background: "#fff", color: t.ink }}>Latest</option>
                <option value="oldest" style={{ background: "#fff", color: t.ink }}>Oldest</option>
              </select>
              <Chevron active={false} />
            </div>
          </div>

          {/* ── Desktop: category pills + sort toggle ─────────────────────── */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="mono mr-2" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                CATEGORY
              </span>
              <Pill
                active={!activeCategory}
                onClick={() => setCategory(undefined)}
                label="All articles"
                count={totalCount}
              />
              {categories.map((cat) => (
                <Pill
                  key={cat.id}
                  active={activeCategory === cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  label={cat.name}
                  count={cat.postCount}
                />
              ))}
            </div>

            {/* Sort toggle */}
            <div className="flex items-center gap-3">
              <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                SORT
              </span>
              <div
                className="inline-flex p-0.5"
                style={{ border: `1px solid ${t.line}`, borderRadius: 999, background: t.bg }}
              >
                {(["latest", "oldest"] as const).map((k) => {
                  const active = activeSort === k;
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

          {/* ── Desktop: tag pills (second row, only if tags exist) ─────────── */}
          {hasTags && (
            <div className="hidden md:flex flex-wrap gap-2 items-center">
              <span className="mono mr-2" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                TAGS
              </span>
              {/* "All tags" — selecting it clears the tag filter */}
              <Pill
                active={!activeTag}
                onClick={() => setTag(undefined)}
                label="All"
              />
              {tags.map((tag) => (
                <Pill
                  key={tag.id}
                  active={activeTag === tag.slug}
                  onClick={() => setTag(tag.slug)}
                  label={tag.name}
                  count={tag.postCount}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
