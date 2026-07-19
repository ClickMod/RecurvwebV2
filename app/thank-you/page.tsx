import type { Metadata } from "next";
import { ThankYouSection } from "@/components/contact/ThankYouSection";

export const metadata: Metadata = {
  title: "Thank you — Recurv",
  description:
    "Thanks for getting in touch. One of our payments experts will contact you soon.",
};

export default function ThankYouPage() {
  return <ThankYouSection />;
}
