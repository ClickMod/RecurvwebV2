import { ReactNode, CSSProperties } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Adds responsive horizontal gutters to section content.
 * Use inside every page section. Never hardcode horizontal padding in sections.
 *
 * Gutters: 16px (mobile) → 32px (md) → 56px (lg+)
 * No max-width constraint — content fills the full viewport width.
 */
export function Container({ children, className = "", style }: ContainerProps) {
  return (
    <div
      className={`w-full px-4 md:px-8 lg:px-14 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
