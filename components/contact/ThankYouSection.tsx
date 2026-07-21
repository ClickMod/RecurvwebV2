import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/Container";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { theme as t, iconSize } from "@/components/theme";

const CEO_EMAIL = "riaan@clickmod.co.za";
const CEO_PHONE = "+27 82 416 8273";

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
          We&rsquo;ve got
          <br />
          <span style={{ color: t.primary }}>your message.</span>
        </h1>

        <p
          className="mt-8 max-w-[560px]"
          style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft }}
        >
          One of our payments experts will be in touch with you soon.
        </p>

        <div className="mt-12 max-w-[560px]" style={{ borderTop: `1px solid ${t.line}` }}>
          <div
            className="flex flex-col gap-3.5 p-7 md:p-8"
            style={{ borderBottom: `1px solid ${t.line}` }}
          >
            <div className="flex items-center justify-between">
              <SiteIcon icon={ShieldCheck} color={t.primary} size={iconSize.card} />
              <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>
                CEO · DIRECT LINE
              </span>
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: t.fontDisplay,
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Need a faster response?
            </div>
            <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55 }}>
              If you haven&rsquo;t heard from us, reach out to our CEO Riaan Backer directly.
            </div>
            <div
              className="mt-auto flex flex-col gap-2 pt-4"
              style={{ borderTop: `1px dashed ${t.line}` }}
            >
              <a
                href={`mailto:${CEO_EMAIL}`}
                style={{ fontSize: 14, fontWeight: 600, color: t.ink, textDecoration: "none" }}
              >
                {CEO_EMAIL}
              </a>
              <a
                href="tel:+27824168273"
                className="mono"
                style={{ fontSize: 12, color: t.inkSoft, letterSpacing: 0.5, textDecoration: "none" }}
              >
                {CEO_PHONE}
              </a>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: t.success,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: t.inkSoft }}>Reply within 4 business hours</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
