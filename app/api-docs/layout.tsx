import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API & Developer Docs — Recurv",
  description:
    "A clean REST API, webhooks, and pre-built connectors for Xero, Sage, Jonas Club Software, and 40+ other SA platforms. Ship integrations in days, not months.",
};

export default function ApiDocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
