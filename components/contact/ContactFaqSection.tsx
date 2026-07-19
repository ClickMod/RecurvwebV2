"use client";

import { FaqSection } from "@/components/sections/FaqSection";

const FAQS = [
  {
    q: "How long does a typical Recurv deployment take?",
    a: "Most teams are live within 3 business days. Once training is complete, your team can start collecting revenue immediately.",
  },
  {
    q: "Do you support migrations from existing debit-order providers?",
    a: "Yes. We handle the full migration on your behalf.",
  },
  {
    q: "Is Recurv suitable for small clubs or single-practice operators?",
    a: "Absolutely. Recurv scales from a single-practice dental office to a national property portfolio. Pricing is volume-based, so you only pay for what you collect.",
  },
  {
    q: "What does Recurv cost?",
    a: "Pricing is based on monthly collection volume with no setup fees. Book a demo and we'll give you exact numbers on the call, no follow-up email, no surprises.",
  },
  {
    q: "Where is customer data stored?",
    a: "All data is stored in South Africa on ISO 27001-aligned infrastructure. Banking details are tokenised on capture and never stored in plaintext.",
  },
  {
    q: "Can I integrate Recurv into our existing CRM?",
    a: "Yes. Recurv has a REST API which allows you to integrate with your existing CRM. Custom integrations are scoped during onboarding.",
  },
];

/** Contact-page variant with its own FAQ set. */
export function ContactFaqSection() {
  return <FaqSection items={FAQS} />;
}
