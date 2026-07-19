import { type StrapiHeadlineSegment } from "@/lib/strapi";
import { theme as t } from "@/components/theme";

interface StyledHeadingProps {
  segments: StrapiHeadlineSegment[] | null | undefined;
}

/**
 * Renders a StrapiHeadlineSegment array as inline styled spans.
 * Each segment is placed on its own line via a <br /> after it.
 * Segments with style "accent" are coloured with the brand primary.
 *
 * Usage — the caller provides the heading tag and typographic styles:
 *   <h1 style={{ fontFamily: t.fontDisplay, fontSize: "var(--fs-hero)", ... }}>
 *     <StyledHeading segments={industry.heroHeadline} />
 *   </h1>
 */
export function StyledHeading({ segments }: StyledHeadingProps) {
  if (!segments || segments.length === 0) return null;

  return (
    <>
      {segments.map((seg, i) => (
        <span key={seg.id ?? i}>
          <span style={seg.style === "accent" ? { color: t.primary } : undefined}>
            {seg.text}
          </span>
          {i < segments.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
