import type { Metadata } from "next";
import { ALL_POSTS } from "@/components/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article not found — Recurv Blog",
    };
  }

  return {
    title: `${post.title} — Recurv Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
