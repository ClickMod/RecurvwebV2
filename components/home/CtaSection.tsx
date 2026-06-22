import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 lg:py-48">
      <Container>
        <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-hero)",
              lineHeight: 0.94,
              letterSpacing: "-0.045em",
              margin: 0,
            }}>
              More revenue.<br /><span style={{ color: t.primary }}>Less admin.</span>
            </h2>
            <p className="mt-6 max-w-[540px]" style={{ fontSize: 19, color: t.inkSoft, lineHeight: 1.55 }}>
              Connect with our team to see Recurv in action. We&rsquo;ll walk you through pricing, integrations,
              and a tailored setup for your industry — usually in 30 minutes or less.
            </p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full justify-center">Book a live demo</Button>
              <Link href="/contactus" className="w-full" style={{ textDecoration: "none" }}>
                <Button size="lg" variant="secondary" icon={<span>→</span>} className="w-full justify-center">Speak to sales</Button>
              </Link>
              <div className="mt-3" style={{ fontSize: 13, color: t.inkSoft }}>
                Or email <span style={{ color: t.ink, fontWeight: 600 }}>sales@recurv.tech</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
