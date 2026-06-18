import { theme } from './theme';
import { PhotoSlot } from './PhotoSlot';
import type { Post } from './blogData';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = theme;
  return (
    <article
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
          style={{
            marginTop: 'auto',
            paddingTop: 16,
            borderTop: `1px solid ${t.line}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
          }}
        >
          <span style={{ color: t.ink, fontWeight: 500 }}>{post.author}</span>
          <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>{post.date}</span>
        </div>
      </div>
    </article>
  );
}
