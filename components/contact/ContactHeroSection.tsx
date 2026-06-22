import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export function ContactHeroSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div
          className="mono mb-7 flex flex-wrap gap-4"
          style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
        >
          <span>CONTACT</span><span>·</span><span>RECURV · ZA</span>
        </div>
        <h1 style={{
          fontFamily: t.fontDisplay,
          fontWeight: 500,
          fontSize: "var(--fs-display)",
          lineHeight: 0.92,
          letterSpacing: "-0.05em",
          margin: 0,
        }}>
          Let&rsquo;s <span style={{ color: t.primary }}>talk.</span>
        </h1>
        <p
          className="mt-8 max-w-[560px]"
          style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft }}
        >
          Tell us where you collect, who you collect from, and what&rsquo;s not working today 
          and we&rsquo;ll come back with a plan, pricing and a live demo within one business day.
        </p>
      </Container>
    </section>
  );
}
