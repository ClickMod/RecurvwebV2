import type { Metadata } from "next";
import { ThankYouSection } from "@/components/contact/ThankYouSection";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Thanks for getting in touch. One of our payments experts will contact you soon.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouSection />;
}
