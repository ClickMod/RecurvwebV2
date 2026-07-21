import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getIndustryNavList } from "@/lib/strapi";
import { DEFAULT_OG_IMAGE, SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Recurv",
    default: "Recurv",
  },
  description:
    "Recurv handles the full collection cycle — from payment authorisation to reconciliation — across membership dues, payment plans, rent, subscriptions, and more.",
  openGraph: {
    type: "website",
    siteName: "Recurv",
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_LOGO}`,
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
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
      style={{ background: "#FFFFFF" }}
    >
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader industryNavList={industryNavList} />
        {children}
        <SiteFooter industryNavList={industryNavList} />
      </body>
    </html>
  );
}
