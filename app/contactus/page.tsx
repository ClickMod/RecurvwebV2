import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactDoorsSection } from "@/components/contact/ContactDoorsSection";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";
import { ContactCallSection } from "@/components/contact/ContactCallSection";

export default function ContactUsPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactDoorsSection />
      <ContactFormSection />
      <ContactFaqSection />
      <ContactCallSection />
    </>
  );
}
