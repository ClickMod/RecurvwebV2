import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { RecurvCoreSection } from "@/components/home/RecurvCoreSection";
import { CollectionTypesSection } from "@/components/home/CollectionTypesSection";
import { DashboardSection } from "@/components/home/DashboardSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getFeaturedIndustriesForHomepage, getFeaturedBlogPostsForHomepage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: {
    absolute: "Recurv — Stop chasing payments. Start running your business.",
  },
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [industries, blogPosts] = await Promise.all([
    getFeaturedIndustriesForHomepage().catch(() => []),
    getFeaturedBlogPostsForHomepage().catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <RecurvCoreSection />
      <CollectionTypesSection />
      <DashboardSection />
      <IndustriesSection industries={industries} />
      <BlogSection posts={blogPosts} />
      <SecuritySection />
      <StatsSection />
      <CtaSection />
    </>
  );
}
