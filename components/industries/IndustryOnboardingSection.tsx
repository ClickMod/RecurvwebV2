import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustryOnboardingStep {
  heading: string;
  description: string;
}

export interface IndustryOnboardingSectionProps {
  /** Small mono eyebrow above the heading, e.g. "FROM ENROLMENT TO COLLECTION" */
  eyebrow: string;
  /** Heading text rendered in ink colour */
  headingBefore: string;
  /** Second line rendered in primary accent colour */
  headingAccent: string;
  /** CTA button label, e.g. "See a live onboarding" */
  ctaLabel: string;
  /** CTA button href */
  ctaHref: string;
  /** Ordered steps — typically 3–5 */
  steps: IndustryOnboardingStep[];
}

export function IndustryOnboardingSection({
  eyebrow,
  headingBefore,
  headingAccent,
  ctaLabel,
  ctaHref,
  steps,
}: IndustryOnboardingSectionProps) {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-[1fr_auto] lg:items-center lg:mb-12">
          <Reveal>
            <div
              className="mono mb-5 uppercase"
              style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
            >
              {eyebrow}
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              {headingBefore}
              <br />
              <span style={{ color: t.primary }}>{headingAccent}</span>
            </h2>
          </Reveal>

          <Reveal delay={STAGGER}>
            <Button variant="secondary" size="md" href={ctaHref} icon={<span>→</span>}>
              {ctaLabel}
            </Button>
          </Reveal>
        </div>

        {/* ── Steps grid ── */}
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-${steps.length}`}
        >
          {steps.map((step, i) => (
            <Reveal key={step.heading} delay={i * STAGGER}>
              <div
                className="flex flex-col gap-3 rounded-xl p-5 md:p-6 h-full"
                style={{
                  border: `1px solid ${t.line}`,
                  background: t.surface,
                }}
              >
                {/* Step label + arrow */}
                <div className="flex items-center justify-between">
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      style={{ fontSize: 13, color: t.inkSoft }}
                    >
                      →
                    </span>
                  )}
                </div>

                {/* Heading */}
                <h3
                  style={{
                    fontFamily: t.fontDisplay,
                    fontWeight: 500,
                    fontSize: 20,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {step.heading}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: t.inkSoft,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
