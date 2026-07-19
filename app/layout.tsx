import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getIndustryNavList } from "@/lib/strapi";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recurv — Stop chasing payments. Start running your business.",
  description:
    "Recurv handles the full collection cycle — from payment authorisation to reconciliation — across membership dues, payment plans, rent, subscriptions, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetched once here and passed down — avoids duplicate fetches from both
  // SiteHeader and SiteFooter requesting the same data independently.
  const industryNavList = await getIndustryNavList().catch(() => []);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ background: "#FFFFFF" }}
    >
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <SiteHeader industryNavList={industryNavList} />
        {children}
        <SiteFooter industryNavList={industryNavList} />
      </body>
    </html>
  );
}
