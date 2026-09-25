import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactDoorsSection } from "@/components/contact/ContactDoorsSection";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";
import { ContactCallSection } from "@/components/contact/ContactCallSection";
import { CONTACT_FAQS } from "@/components/contact/contactFaqs";
import { buildFaqPageJsonLd } from "@/lib/seo";

const contactFaqJsonLd = buildFaqPageJsonLd([...CONTACT_FAQS]);

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }}
      />
      <ContactHeroSection />
      <ContactDoorsSection />
      <ContactFormSection />
      <ContactFaqSection />
      <ContactCallSection />
    </>
  );
}
