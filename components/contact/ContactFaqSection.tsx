"use client";

import { FaqSection } from "@/components/sections/FaqSection";
import { CONTACT_FAQS } from "@/components/contact/contactFaqs";

/** Contact-page variant with its own FAQ set. */
export function ContactFaqSection() {
  return <FaqSection items={[...CONTACT_FAQS]} />;
}
