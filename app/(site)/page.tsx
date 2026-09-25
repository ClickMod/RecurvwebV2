import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { HomepageVideoSection } from "@/components/home/HomepageVideoSection";
import { RecurvCoreSection } from "@/components/home/RecurvCoreSection";
import { CollectionTypesSection } from "@/components/home/CollectionTypesSection";
import { DashboardSection } from "@/components/home/DashboardSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { BlogSection } from "@/components/home/BlogSection";
import { SecuritySection } from "@/components/home/SecuritySection";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";
import {
  getFeaturedIndustriesForHomepage,
  getFeaturedBlogPostsForHomepage,
  getHomepage,
  segmentsToProps,
  strapiImageUrl,
} from "@/lib/strapi";

export const metadata: Metadata = {
  title: {
    absolute: "Recurv — Stop chasing payments. Start running your business.",
  },
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [industries, blogPosts, homepage] = await Promise.all([
    getFeaturedIndustriesForHomepage().catch(() => []),
    getFeaturedBlogPostsForHomepage().catch(() => []),
    getHomepage().catch(() => null),
  ]);
  const videoHeading = segmentsToProps(homepage?.videoHeadline);
  const videoSrc = strapiImageUrl(homepage?.video?.url);

  return (
    <>
      <HeroSection />
      {videoSrc && (
        <HomepageVideoSection
          label={homepage?.videoLabel}
          headingBefore={videoHeading.headingBefore}
          headingAccent={videoHeading.headingAccent}
          body={homepage?.videoBody}
          src={videoSrc}
          mime={homepage?.video?.mime}
        />
      )}
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
