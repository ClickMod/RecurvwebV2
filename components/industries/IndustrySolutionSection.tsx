import { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustrySolutionFeature {
  /** Rendered icon — pass <CarbonIcon> for static pages, <DynamicIcon> for CMS pages. */
  icon: ReactNode;
  /** Feature heading */
  heading: string;
  /** One or two sentences describing the capability */
  description: string;
}

export interface IndustrySolutionSectionProps {
  /** Small mono eyebrow above the heading, e.g. "WHAT RECURV DOES" */
  eyebrow?: string;
  /** Heading text before the accent phrase */
  headingBefore: string;
  /** Accent phrase rendered in primary colour */
  headingAccent: string;
  /** Intro paragraph shown to the right of the heading */
  intro: string | ReactNode;
  /** Feature columns — typically 4–6 items */
  features: IndustrySolutionFeature[];
}

export function IndustrySolutionSection({
  eyebrow,
  headingBefore,
  headingAccent,
  intro,
  features,
}: IndustrySolutionSectionProps) {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        {/* ── Section header ── */}
        <div className="grid grid-cols-1 gap-8 mb-14 lg:grid-cols-2 lg:gap-16 items-end">
          <Reveal>
            {eyebrow && (
              <div
                className="mono mb-5 uppercase"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                {eyebrow}
              </div>
            )}
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

        {/* ── Feature columns ── */}
        {/*
         * Mobile:  single column stack, horizontal rule between items.
         * Tablet:  2-column grid.
         * Desktop: all items in one row, separated by vertical dividers.
         */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:flex"
          style={{ borderTop: `1px solid ${t.line}` }}
        >
          {features.map((f, i) => (
            <Reveal
              key={f.heading}
              delay={i * STAGGER}
              className={[
                "flex-1 flex flex-col gap-4 py-8 sm:py-8",
                /* horizontal padding — first col flush left, last col flush right */
                i === 0
                  ? "lg:pr-8"
                  : i === features.length - 1
                  ? "lg:pl-8"
                  : "lg:px-8",
                /* border-bottom on mobile/tablet; border-right on desktop */
                i < features.length - 1
                  ? "border-b sm:border-b lg:border-b-0 lg:border-r"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                borderColor: t.line,
              }}
            >
              {/* Icon */}
              {f.icon}

              {/* Index */}
              <div
                className="mono"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {f.heading}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 13.5,
                  color: t.inkSoft,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {f.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
