"use client";

import { AlertTriangle, FileCheck, GitMerge, Plug, Repeat, Users, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { CampaignQuoteForm } from "@/components/campaign/CampaignQuoteForm";
import { CampaignVideoPlayer } from "@/components/campaign/CampaignVideoPlayer";
import { useCampaign } from "@/components/campaign/CampaignProvider";
import { TRUST_BADGES, TRUST_POINTS } from "@/components/campaign/constants";
import { iconSize, theme as t } from "@/components/theme";
import type { StrapiCampaignPage, StrapiHeadlineSegment } from "@/lib/strapi";

const BENEFIT_ICONS: LucideIcon[] = [FileCheck, Repeat, AlertTriangle, GitMerge];
const STEP_ICONS: LucideIcon[] = [Users, Plug, Zap];

function paragraphs(value?: string | null) {
  return (value ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function Headline({
  as: Tag,
  segments,
  accent,
  size = "var(--fs-h2-lg)",
}: {
  as: "h1" | "h2";
  segments?: StrapiHeadlineSegment[] | null;
  accent: string;
  size?: string;
}) {
  if (!segments?.length) return null;
  return (
    <Tag
      style={{
        fontFamily: t.fontDisplay,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.035em",
        margin: 0,
        color: t.ink,
      }}
    >
      {segments.map((segment, index) => {
        const highlighted = segment.style === "accent" || (segments.length > 1 && index === segments.length - 1);
        return (
          <span key={segment.id ?? index}>
            <span style={highlighted ? { color: accent } : undefined}>{segment.text}</span>
            {index < segments.length - 1 ? <br /> : null}
          </span>
        );
      })}
    </Tag>
  );
}

function SectionHeader({
  eyebrow,
  segments,
  body,
  accent = t.primary,
  heading = "h2",
  headingSize,
  bodyColor = t.inkSoft,
}: {
  eyebrow?: string | null;
  segments?: StrapiHeadlineSegment[] | null;
  body?: string | null;
  accent?: string;
  heading?: "h1" | "h2";
  headingSize?: string;
  bodyColor?: string;
}) {
  const lines = paragraphs(body);
  return (
    <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-14 lg:items-start">
      <div>
        {eyebrow ? (
          <div className="mono mb-5" style={{ fontSize: 11, color: accent, letterSpacing: 1.5 }}>
            {eyebrow}
          </div>
        ) : null}
        <Headline as={heading} segments={segments} accent={accent} size={headingSize} />
      </div>
      {lines.length > 0 ? (
        <div className="flex flex-col gap-4">
          {lines.map((paragraph) => (
            <p key={paragraph} style={{ fontSize: 17, color: bodyColor, lineHeight: 1.6, margin: 0 }}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CampaignSections({
  page,
  videoSrc,
  posterSrc,
  videoMime,
}: {
  page: StrapiCampaignPage;
  videoSrc?: string;
  posterSrc?: string;
  videoMime?: string | null;
}) {
  const { bookDemoHref, fullDemoHref, openQuote, track } = useCampaign();

  return (
    <>
      <section className="py-10 md:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={page.heroEyebrow}
            segments={page.heroHeadline}
            body={page.heroBody}
            heading="h1"
            headingSize="var(--fs-hero)"
          />
          <div>
            <CampaignVideoPlayer
              src={videoSrc}
              mime={videoMime}
              poster={posterSrc}
              onStarted={() => track("intro_video_started")}
              onCompleted={() => track("intro_video_completed")}
            />
          </div>
          {page.heroVideoCaption ? (
            <p className="mt-6" style={{ fontSize: 14, color: t.inkSoft }}>
              {page.heroVideoCaption}
            </p>
          ) : null}
        </Container>
      </section>

      <section className="py-12 md:py-16 lg:py-20" style={{ borderTop: `1px solid ${t.line}` }}>
        <Container>
          <SectionHeader
            eyebrow={page.valueEyebrow}
            segments={page.valueHeadline}
            body={page.valueBody}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(page.benefits ?? []).map((benefit, index) => (
              <div
                key={benefit.id}
                className="grid grid-cols-[22px_1fr] items-start gap-3.5 rounded-xl p-5 md:p-6"
                style={{ border: `1px solid ${t.line}` }}
              >
                <div className="shrink-0" style={{ marginTop: 2 }}>
                  <SiteIcon icon={BENEFIT_ICONS[index % BENEFIT_ICONS.length]} color={t.primary} size={iconSize.card} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0 }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, margin: "6px 0 0" }}>
                    {benefit.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16 lg:py-20" style={{ borderTop: `1px solid ${t.line}` }}>
        <Container>
          <SectionHeader
            eyebrow={page.gettingStartedEyebrow}
            segments={page.gettingStartedHeadline}
            body={page.gettingStartedBody}
          />
          <ol
            className="grid grid-cols-1 p-0 list-none md:grid-cols-3"
            style={{ borderTop: `1px solid ${t.line}` }}
          >
            {(page.steps ?? []).map((step, index) => (
              <li
                key={step.id}
                className="flex h-full flex-col gap-4 p-7 transition-[background-color] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--surface-alt)] md:p-8"
                style={{
                  borderBottom: `1px solid ${t.line}`,
                  borderRight: `1px solid ${t.line}`,
                }}
              >
                <SiteIcon icon={STEP_ICONS[index % STEP_ICONS.length]} color={t.primary} size={iconSize.card} />
                <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {step.title}
                </div>
                {step.body ? (
                  <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{step.body}</div>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-12 md:py-16 lg:py-20" style={{ background: t.surfaceAlt }}>
        <Container>
          <SectionHeader
            eyebrow={page.conversionEyebrow}
            segments={page.conversionHeadline}
            body={page.conversionBody}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {(page.conversionCards ?? []).map((card) => {
              return (
                <div
                  key={card.id}
                  className="flex flex-col rounded-xl p-6 md:p-7"
                  style={{
                    background: t.surface,
                    border: `1px solid ${t.line}`,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: t.fontDisplay,
                      fontWeight: 500,
                      fontSize: "var(--fs-h3)",
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1" style={{ fontSize: 15, lineHeight: 1.55, color: t.inkSoft }}>
                    {card.body}
                  </p>
                  {card.supportingText ? (
                    <p className="mono mt-4" style={{ fontSize: 12, letterSpacing: 0.4, color: t.ink }}>
                      {card.supportingText}
                    </p>
                  ) : null}
                  <div className="mt-6">
                    {card.action === "request_quote" ? (
                      <Button variant="secondary" size="lg" className="w-full justify-center" onClick={openQuote}>
                        {card.ctaLabel}
                      </Button>
                    ) : card.action === "full_demo" ? (
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full justify-center"
                        href={fullDemoHref ?? undefined}
                        onClick={fullDemoHref ? () => track("full_demo_clicked") : undefined}
                        style={fullDemoHref ? undefined : { opacity: 0.45, pointerEvents: "none" }}
                      >
                        {card.ctaLabel}
                      </Button>
                    ) : (
                      <Button
                        variant="accent"
                        size="lg"
                        className="w-full justify-center"
                        href={bookDemoHref}
                        onClick={() => track("book_demo_clicked")}
                      >
                        {card.ctaLabel}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16" style={{ background: t.surfaceDeep, color: t.inkOnDeep }}>
        <Container>
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-14 lg:items-start">
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-lg)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                margin: 0,
                color: t.inkOnDeep,
              }}
            >
              {(page.trustHeadline ?? "Built for collecting money in South Africa.").replace(/\s*South Africa\.?$/, "")}{" "}
              <span style={{ color: "#A89BF0" }}>South Africa.</span>
            </h2>
            {page.trustBody ? (
              <p style={{ fontSize: 17, lineHeight: 1.6, color: t.inkOnDeepSoft, margin: 0 }}>
                {page.trustBody}
              </p>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="mono"
                style={{
                  fontSize: 11,
                  padding: "4px 8px",
                  border: "1px solid rgba(246,245,240,0.18)",
                  borderRadius: 4,
                  color: "#A89BF0",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TRUST_POINTS.map(([title, body]) => (
              <div key={title} className="pt-4" style={{ borderTop: "1px solid rgba(246,245,240,0.18)" }}>
                <div className="mono" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>{title}</div>
                <p className="mt-2" style={{ fontSize: 13, lineHeight: 1.55, color: t.inkOnDeepSoft, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CampaignQuoteForm />
    </>
  );
}
