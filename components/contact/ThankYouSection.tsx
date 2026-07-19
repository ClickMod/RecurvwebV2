import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const PHONE_DISPLAY = "082 416 8273";
const PHONE_TEL = "0824168273";
const EMAIL = "riaan@clickmod.co.za";

export function ThankYouSection() {
  return (
    <section className="pt-4 pb-20 md:pt-6 md:pb-28 lg:pt-4 lg:pb-32">
      <Container>
        <div
          className="mono mb-7 flex flex-wrap gap-4"
          style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
        >
          <span>CONTACT</span>
          <span>·</span>
          <span>THANK YOU</span>
        </div>

        <h1
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 500,
            fontSize: "var(--fs-display)",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            margin: 0,
          }}
        >
          We&rsquo;ve got{" "}
          <span style={{ color: t.primary }}>your message.</span>
        </h1>

        <p
          className="mt-8 max-w-[560px]"
          style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft }}
        >
          One of our payments experts will be in touch with you soon.
        </p>

        <div
          className="mt-12 max-w-[560px] rounded-2xl p-8 md:p-10"
          style={{
            background: t.surfaceAlt,
            border: `1px solid ${t.line}`,
          }}
        >
          <div
            className="mono mb-3"
            style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
          >
            NEED A FASTER RESPONSE?
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: t.ink, margin: 0 }}>
            If you haven&rsquo;t heard from us, call our CEO{" "}
            <span style={{ fontWeight: 600 }}>Riaan Backer</span> on{" "}
            <a
              href={`tel:${PHONE_TEL}`}
              style={{ color: t.primary, fontWeight: 600, textDecoration: "none" }}
            >
              {PHONE_DISPLAY}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${EMAIL}`}
              style={{ color: t.primary, fontWeight: 600, textDecoration: "none" }}
            >
              {EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" variant="accent" icon={<span>→</span>} className="justify-center">
            Back to home
          </Button>
          <Button href="/contactus" size="lg" variant="secondary" className="justify-center">
            Return to contact
          </Button>
        </div>
      </Container>
    </section>
  );
}
