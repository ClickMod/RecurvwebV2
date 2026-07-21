import { Lock, Plug, Repeat } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { theme as t, iconSize } from "@/components/theme";

const STEPS = [
  {
    icon: Lock,
    step: "01 · AUTHENTICATE",
    title: "Drop in your API key",
    desc: "Bearer-token auth over TLS. Separate sandbox and live keys, scoped to your account, rotatable at any time.",
  },
  {
    icon: Plug,
    step: "02 · CALL",
    title: "Create mandates & plans",
    desc: "RESTful resources for customers, mandates, collections and payouts. Idempotency keys make every write safe to retry.",
  },
  {
    icon: Repeat,
    step: "03 · LISTEN",
    title: "Subscribe to webhooks",
    desc: "Signed, real-time events push every status change back to your platform so your records stay in lockstep with the bank.",
  },
];

export function ApiHowItWorksSection() {
  return (
    <Section style={{ borderTop: `1px solid ${t.line}` }} className="py-16 md:py-20 lg:py-24">
      <Container>
        {/* Top: heading + body */}
        <div className="grid grid-cols-1 gap-8 mb-14 md:mb-16 lg:grid-cols-2 lg:gap-20 items-end">
          <div>
            <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              HOW THE API WORKS
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              Three calls<br />
              <span style={{ color: t.primary }}>and you're live.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.65, margin: 0 }}>
            Authenticate with a secret key, create a mandate, then listen for webhooks as
            collections succeed, retry or fail. No SOAP, no batch files, no bank-specific
            plumbing. Recurv normalises every rail behind one JSON interface.
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-xl"
          style={{ border: `1px solid ${t.line}` }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 p-7 md:p-8"
              style={{
                borderRight: i < STEPS.length - 1 ? `1px solid ${t.line}` : undefined,
                borderBottom: undefined,
              }}
            >
              {/* Icon row */}
              <div className="flex items-center justify-between">
                <SiteIcon icon={step.icon} color={t.primary} size={iconSize.card} />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
                >
                  {step.step}
                </span>
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: t.fontDisplay,
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </div>

              {/* Description */}
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.65 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
