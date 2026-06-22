import Link from 'next/link';
import { theme } from './theme';
import { PhotoSlot } from './PhotoSlot';
import type { Post } from './blogData';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = theme;
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
    <article
      className="transition-[transform,border-color,box-shadow] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(79,51,217,0.25)] hover:border-[#4F33D9]"
      style={{
        background: t.surface,
        border: `1px solid ${t.line}`,
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        height: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
    >
      <PhotoSlot
        label={post.imageDesc}
        caption={post.category}
        tint={t.primary}
        bg={post.imageBg}
        ratio="4 / 3"
        rounded={8}
        variant="gradient"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
          {post.category} · {post.readTime} MIN READ
        </div>
        <h3
          style={{
            fontFamily: t.fontDisplay,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {post.title}
        </h3>
        <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, margin: 0 }}>{post.excerpt}</p>
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: 'auto',
            paddingTop: 16,
            borderTop: `1px solid ${t.line}`,
          }}
        >
          <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>{post.date}</span>
          <span
            className="mono transition-colors duration-[140ms]"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.5,
              color: t.primary,
            }}
          >
            VIEW →
          </span>
        </div>
      </div>
    </article>
    </Link>
  );
}
