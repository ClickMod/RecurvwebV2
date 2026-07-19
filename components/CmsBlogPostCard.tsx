import Image from "next/image";
import Link from "next/link";
import { theme as t } from "@/components/theme";
import { PhotoSlot } from "@/components/PhotoSlot";
import { strapiImageUrl } from "@/lib/strapi";
import type { StrapiBlogPost } from "@/lib/strapi";

interface CmsBlogPostCardProps {
  post: StrapiBlogPost;
}

function formatCardDate(publishedAt: string | null): string {
  if (!publishedAt) return "";
  return new Date(publishedAt).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).toUpperCase();
}

export function CmsBlogPostCard({ post }: CmsBlogPostCardProps) {
  const badge = post.category?.name?.toUpperCase() ?? "";
  const date = formatCardDate(post.publishedAt);
  const imageUrl = strapiImageUrl(post.cardImage?.url);

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      <article
        className="transition-[transform,border-color,box-shadow] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(79,51,217,0.25)] hover:border-[#4F33D9]"
        style={{
          background: t.surface,
          border: `1px solid ${t.line}`,
          borderRadius: 12,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          height: "100%",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        {/* Thumbnail */}
        {imageUrl && post.cardImage ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              borderRadius: 8,
              overflow: "hidden",
              background: t.surfaceAlt,
            }}
          >
            <Image
              src={imageUrl}
              alt={post.cardImage.alternativeText ?? post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <PhotoSlot
            label={post.title}
            caption={badge}
            tint={t.primary}
            bg="#1A1A2E"
            ratio="4 / 3"
            rounded={8}
            variant="gradient"
          />
        )}

        {/* Meta + content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {badge && (
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              {badge}
            </div>
          )}
          <h3
            style={{
              fontFamily: t.fontDisplay,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: 0,
              color: t.ink,
            }}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, margin: 0 }}>
              {post.excerpt}
            </p>
          )}
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: "auto",
              paddingTop: 16,
              borderTop: `1px solid ${t.line}`,
            }}
          >
            <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>
              {date}
            </span>
            <span
              className="mono transition-colors duration-[140ms]"
              style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: t.primary }}
            >
              VIEW →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
