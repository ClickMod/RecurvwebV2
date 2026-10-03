import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { DemoAccessGate } from "@/components/demo/DemoAccessGate";
import { GuidedDemoExperience } from "@/components/demo/GuidedDemoExperience";
import { DEMO_ACCESS_COOKIE, hasDemoAccessCookie } from "@/lib/demo-access";
import { getFeatureVideos, getGuidedDemoVideos } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Guided product demo",
  description:
    "See how Recurv helps South African businesses simplify collections, automate reconciliation and reduce payment admin.",
  alternates: { canonical: "/demo" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": 0,
    },
  },
};

export default async function DemoPage() {
  const cookieStore = await cookies();
  const unlocked = await hasDemoAccessCookie(cookieStore.get(DEMO_ACCESS_COOKIE)?.value);
  if (!unlocked) return <DemoAccessGate />;

  const [guidedVideos, featureVideos] = await Promise.all([
    getGuidedDemoVideos().catch(() => []),
    getFeatureVideos().catch(() => []),
  ]);

  return (
    <Suspense>
      <GuidedDemoExperience guidedVideos={guidedVideos} featureVideos={featureVideos} />
    </Suspense>
  );
}
