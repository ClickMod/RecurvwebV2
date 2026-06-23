import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustryStatBadge {
  label: string;
}

export interface IndustryCta {
  label: string;
  href: string;
}

export interface IndustryHeroImage {
  /** Short description shown in the placeholder, e.g. "Pupils crossing the quad, morning light" */
  label?: string;
  /** Mono caption line, e.g. "HERC · SCHOOLS · 1200 × 1500" */
  caption?: string;
  /** Accent tint for the radial spotlight, defaults to primary */
  tint?: string;
  /** Background fill colour */
  bg?: string;
}

export interface IndustryHeroProps {
  /**
   * Industry name used in the breadcrumb and eyebrow label,
   * e.g. "Schools & Education".
   */
  industryName: string;

  /**
   * Heading text rendered before the accent phrase, e.g. "School fees shouldn't be".
   * Wrap in an array to force manual line breaks: ["School fees", "shouldn't be"].
   */
  headingBefore: string | string[];

  /**
   * Accent word or phrase rendered in the primary colour on its own line,
   * e.g. "chased."
   */
  headingAccent: string;

  /** Body copy below the heading */
  body: string | ReactNode;

  /** Primary CTA — dark filled button */
  primaryCta: IndustryCta;

  /** Secondary CTA — outlined button with arrow */
  secondaryCta: IndustryCta;

  /**
   * Stat badges shown in the mono row below the CTAs,
   * e.g. [{ label: "12G+ SCHOOLS LIVE" }, { label: "180 000 PUPILS BILLED" }]
   */
  stats: IndustryStatBadge[];

  /** Image placeholder configuration */
  image?: IndustryHeroImage;
}

export function IndustryHeroSection({
  industryName,
  headingBefore,
  headingAccent,
  body,
  primaryCta,
  secondaryCta,
  stats,
  image = {},
}: IndustryHeroProps) {
  const headingLines = Array.isArray(headingBefore) ? headingBefore : [headingBefore];

  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-4 lg:pb-24">
      <Container>
        {/* Breadcrumb */}
        <nav
          className="mono mb-10 flex items-center gap-2"
          style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}
          aria-label="Breadcrumb"
        >
          <Link href="/industries" style={{ color: t.inkSoft, textDecoration: "none" }}>
            Industries
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: t.ink }}>{industryName}</span>
        </nav>

        {/* Two-column grid — collapses to single column on mobile */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 items-center">
          {/* ── Left: copy ── */}
          <div className="min-w-0">
            {/* Eyebrow */}
            <Reveal>
              <div
                className="mono mb-7"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                INDUSTRIES · {industryName.toUpperCase()}
              </div>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-hero)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
                <span style={{ color: t.primary }}>{headingAccent}</span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal delay={STAGGER}>
              <p
                className="mt-8 max-w-[520px]"
                style={{ fontSize: 18, lineHeight: 1.6, color: t.inkSoft }}
              >
                {body}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={STAGGER * 2}>
              <div className="flex flex-col sm:flex-row gap-3 mt-9">
                <Button size="lg" href={primaryCta.href} className="w-full sm:w-auto justify-center">
                  {primaryCta.label}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  href={secondaryCta.href}
                  icon={<span>→</span>}
                  className="w-full sm:w-auto justify-center"
                >
                  {secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={STAGGER * 3}>
              <div
                className="mono mt-10 flex flex-wrap items-center gap-3"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.2 }}
              >
                {stats.map((stat, i) => (
                  <span key={stat.label} className="flex items-center gap-3">
                    {stat.label}
                    {i < stats.length - 1 && (
                      <span aria-hidden="true" style={{ color: t.lineStrong }}>
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right: image placeholder ── */}
          <Reveal delay={STAGGER} className="w-full">
            <PhotoSlot
              label={image.label ?? `Editorial photo — ${industryName.toLowerCase()} scene`}
              caption={image.caption}
              tint={image.tint ?? t.primary}
              bg={image.bg ?? "#0F0E14"}
              ratio="4 / 5"
              variant="spotlight"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
