import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us — Recurv",
  description:
    "Get in touch with the Recurv team. Talk to sales, customer support, or our partnerships team — we reply within one business day.",
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
