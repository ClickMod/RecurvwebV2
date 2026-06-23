import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export interface IndustryTrustedBySectionProps {
  /** List of institution / company names to display */
  names: string[];
  /** Override the left-hand label (defaults to "TRUSTED BY") */
  label?: string;
}

export function IndustryTrustedBySection({
  names,
  label = "TRUSTED BY",
}: IndustryTrustedBySectionProps) {
  return (
    <div
      className="py-4"
      style={{
        borderTop: `1px solid ${t.line}`,
        borderBottom: `1px solid ${t.line}`,
        background: t.bg,
      }}
    >
      <Container>
        {/*
         * Desktop: label + names on one row.
         * Mobile: hide label, names overflow-scroll in a single line.
         */}
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-none">
          {/* Label — hidden on the smallest viewport to keep the strip tight */}
          <span
            className="mono shrink-0 hidden sm:block"
            style={{ fontSize: 10, letterSpacing: 1.8, color: t.inkSoft }}
          >
            {label}
          </span>

          {/* Divider between label and names — desktop only */}
          <span
            className="shrink-0 hidden sm:block"
            style={{ width: 1, height: 14, background: t.line }}
            aria-hidden="true"
          />

          {/* Names */}
          <ul className="flex items-center gap-8 md:gap-12 list-none m-0 p-0">
            {names.map((name) => (
              <li
                key={name}
                className="shrink-0 mono whitespace-nowrap"
                style={{ fontSize: 13, color: t.inkSoft, letterSpacing: 0.2 }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
