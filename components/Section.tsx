import { ReactNode, CSSProperties } from "react";

interface SectionProps {
  children: ReactNode;
  /** Tailwind classes for background, border, custom padding overrides, etc. */
  className?: string;
  /** Inline style for token-based values (border-color, background from theme, etc.) */
  style?: CSSProperties;
  id?: string;
}

/**
 * Standard page section with responsive vertical padding.
 * Pairs with <Container> for horizontal gutters.
 *
 * Default vertical padding: py-16 (64px) → md:py-20 (80px) → lg:py-24 (96px)
 * Override via className, e.g. className="py-20 lg:py-32"
 */
export function Section({ children, className = "", style, id }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 lg:py-24 ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
