import { ApiHeroSection } from "@/components/api/ApiHeroSection";
import { ApiHowItWorksSection } from "@/components/api/ApiHowItWorksSection";
import { ApiCapabilitiesSection } from "@/components/api/ApiCapabilitiesSection";
import { ApiCtaSection } from "@/components/api/ApiCtaSection";

export default function ApiDocsPage() {
  return (
    <>
      <ApiHeroSection />
      <ApiHowItWorksSection />
      <ApiCapabilitiesSection />
      <ApiCtaSection />
    </>
  );
}
