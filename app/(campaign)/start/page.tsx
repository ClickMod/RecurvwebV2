import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignSections } from "@/components/campaign/CampaignSections";
import { getCampaignPage, strapiImageUrl } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCampaignPage();
  return {
    title: page?.seo?.metaTitle || "Stop chasing payments",
    description:
      page?.seo?.metaDescription ||
      "Recurv automates the entire collection process for South African businesses.",
    robots: { index: false, follow: false },
  };
}

export default async function CampaignStartPage() {
  const page = await getCampaignPage();
  if (!page) notFound();

  return (
    <CampaignSections
      page={page}
      videoSrc={strapiImageUrl(page.introVideo?.url)}
      posterSrc={strapiImageUrl(page.introPoster?.url)}
      videoMime={page.introVideo?.mime}
    />
  );
}
