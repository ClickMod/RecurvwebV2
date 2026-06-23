import { ReactNode } from "react";
import Link from "next/link";
import { DashboardMock } from "@/components/DashboardMock";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustryDashboardBullet {
  heading: string;
  description: string;
}

export interface IndustryDashboardSectionProps {
  /** Small mono eyebrow above the heading, e.g. "BURSAR'S DASHBOARD" */
  eyebrow: string;
  /** Heading text before the accent phrase */
  headingBefore: string;
  /** Accent phrase rendered in primary colour */
  headingAccent: string;
  /** Short body paragraph below the heading */
  body: string | ReactNode;
  /** Up to three bullet points explaining key capabilities */
  bullets: IndustryDashboardBullet[];
  /** CTA link label, e.g. "See the bursar dashboard" */
  ctaLabel: string;
  /** CTA href */
  ctaHref: string;
}

export function IndustryDashboardSection({
  eyebrow,
  headingBefore,
  headingAccent,
  body,
  bullets,
  ctaLabel,
  ctaHref,
}: IndustryDashboardSectionProps) {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">
          {/* ── Left: copy ── */}
          <div className="min-w-0">
            <Reveal>
              <div
                className="mono mb-5"
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
                  letterSpacing: "-0.035em",
                  margin: 0,
                }}
              >
                {headingBefore}
                <br />
                <span style={{ color: t.primary }}>{headingAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={STAGGER}>
              <p
                className="mt-6"
                style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.65 }}
              >
                {body}
              </p>
            </Reveal>

            {/* Bullets */}
            <div className="mt-8 flex flex-col gap-4">
              {bullets.map((b, i) => (
                <Reveal key={b.heading} delay={STAGGER * (i + 2)}>
                  <div className="grid grid-cols-[20px_1fr] gap-3.5">
                    {/* Circle bullet */}
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        border: `2px solid ${t.primary}`,
                        marginTop: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: t.primary,
                          borderRadius: 999,
                          display: "block",
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>
                        {b.heading}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: t.inkSoft,
                          lineHeight: 1.55,
                          marginTop: 2,
                        }}
                      >
                        {b.description}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA link */}
            <Reveal delay={STAGGER * (bullets.length + 2)}>
              <div className="mt-8" style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20 }}>
                <Link
                  href={ctaHref}
                  style={{
                    fontSize: 14,
                    color: t.ink,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  className="hover:text-[var(--primary)] transition-colors duration-150"
                >
                  {ctaLabel} →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Right: dashboard mockup ── */}
          <Reveal delay={STAGGER}>
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
