import { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustryProblemItem {
  /** Rendered icon — pass <CarbonIcon> for static pages, <DynamicIcon> for CMS pages. */
  icon: ReactNode;
  /** Card heading — the problem in plain terms */
  heading: string;
  /** One or two sentences describing why this hurts */
  description: string;
  /** One or two sentences on exactly how Recurv fixes it */
  fix: string;
}

export interface IndustryProblemsSectionProps {
  /** Small mono eyebrow above the heading, e.g. "WHERE SCHOOL BILLING BREAKS" */
  eyebrow: string;
  /** Heading text before the accent phrase */
  headingBefore: string;
  /** Accent phrase rendered in primary colour */
  headingAccent: string;
  /** Intro paragraph shown to the right of the heading */
  intro: string | ReactNode;
  /** Exactly four problem cards (2 × 2 grid) */
  problems: IndustryProblemItem[];
}

export function IndustryProblemsSection({
  eyebrow,
  headingBefore,
  headingAccent,
  intro,
  problems,
}: IndustryProblemsSectionProps) {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2 lg:gap-16 lg:mb-14 items-end">
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
                fontSize: "var(--fs-h2-lg)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              {headingBefore}{" "}
              <span style={{ color: t.primary }}>{headingAccent}</span>
            </h2>
          </Reveal>

          <Reveal delay={STAGGER}>
            <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.65, margin: 0 }}>
              {intro}
            </p>
          </Reveal>
        </div>

        {/* ── Problem cards — 2 × 2 grid ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {problems.map((p, i) => (
            <Reveal key={p.heading} delay={i * STAGGER}>
              <div
                className="flex flex-col h-full rounded-2xl p-6 md:p-7"
                style={{
                  background: t.surface,
                  border: `1px solid ${t.line}`,
                }}
              >
                {/* Icon + heading */}
                <div className="flex items-center gap-3 mb-4">
                  {p.icon}
                  <h3
                    style={{
                      fontFamily: t.fontDisplay,
                      fontWeight: 500,
                      fontSize: 19,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {p.heading}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="flex-1"
                  style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.65, margin: 0 }}
                >
                  {p.description}
                </p>

                {/* Divider */}
                <div
                  className="my-5"
                  style={{ height: 1, background: t.line }}
                  aria-hidden="true"
                />

                {/* Recurv fix */}
                <div className="flex gap-3 items-start">
                  <span
                    className="mono shrink-0 mt-[1px]"
                    style={{ fontSize: 10, color: t.primary, letterSpacing: 1.5 }}
                  >
                    RECURV ·
                  </span>
                  <p
                    style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}
                  >
                    {p.fix}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
