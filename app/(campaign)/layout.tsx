import { notFound } from "next/navigation";
import { CampaignFooter } from "@/components/campaign/CampaignFooter";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { CampaignProvider } from "@/components/campaign/CampaignProvider";
import { getCampaignPage } from "@/lib/strapi";

export default async function CampaignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = await getCampaignPage();
  if (!page) notFound();

  return (
    <CampaignProvider bookDemoUrl={page.bookDemoUrl} fullDemoUrl={page.fullDemoUrl}>
      <CampaignHeader label={page.headerCtaLabel?.trim() || "Book a demo"} />
      {children}
      <CampaignFooter />
    </CampaignProvider>
  );
}
