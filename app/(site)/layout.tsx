import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getIndustryNavList } from "@/lib/strapi";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const industryNavList = await getIndustryNavList().catch(() => []);

  return (
    <>
      <SiteHeader industryNavList={industryNavList} />
      {children}
      <SiteFooter industryNavList={industryNavList} />
    </>
  );
}
