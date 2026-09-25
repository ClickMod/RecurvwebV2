import { Container } from "@/components/Container";
import { HomepageVideoPlayer } from "@/components/home/HomepageVideoPlayer";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export interface IndustryVideoSectionProps {
  /** Small mono label above the heading */
  label?: string | null;
  /** Heading lines before the accent phrase */
  headingBefore?: string | string[];
  /** Accent phrase rendered in the primary colour */
  headingAccent?: string | null;
  /** Body copy beside the heading. Blank lines start a new paragraph. */
  body?: string | null;
  src: string;
  mime?: string | null;
}

export function IndustryVideoSection({
  label,
  headingBefore,
  headingAccent,
  body,
  src,
  mime,
}: IndustryVideoSectionProps) {
  if (!src) return null;

  const lines = (Array.isArray(headingBefore) ? headingBefore : [headingBefore ?? ""])
    .map((line) => line.trim())
    .filter(Boolean);
  const accent = headingAccent?.trim() ?? "";
  const paragraphs = (body ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const hasCopy = Boolean(label?.trim() || lines.length > 0 || accent || paragraphs.length > 0);

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        {hasCopy && (
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-14">
            <Reveal>
              {label?.trim() && (
                <div
                  className="mono mb-5 uppercase"
                  style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
                >
                  {label}
                </div>
              )}
              {(lines.length > 0 || accent) && (
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
                  {lines.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                  {accent && (
                    <>
                      {lines.length > 0 && <br />}
                      <span style={{ color: t.primary }}>{accent}</span>
                    </>
                  )}
                </h2>
              )}
            </Reveal>
            {paragraphs.length > 0 && (
              <Reveal delay={STAGGER}>
                <div className="flex flex-col gap-4">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        )}
        <HomepageVideoPlayer
          src={src}
          mime={mime ?? undefined}
          label={accent || lines[0] || label || "Industry overview video"}
        />
      </Container>
    </section>
  );
}
