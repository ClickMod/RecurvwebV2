"use client";

import { DynamicIcon as LucideDynamicIcon } from "lucide-react/dynamic";
import type { IndustryIconName } from "@/lib/strapi";
import { iconSize, iconStroke } from "@/components/theme";

interface DynamicIconProps {
  /** Lucide kebab-case icon name as stored in the Strapi IndustryIconName enum. */
  name: IndustryIconName;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Lazily loads a single Lucide icon by name without bundling the entire icon set.
 * The loading state shows a fixed-size transparent placeholder to prevent layout shift.
 *
 * Used for icons driven by Strapi enumeration fields (problemIcon, featureIcon,
 * dashboardFeatureIcon). TypeScript enforces that only valid IndustryIconName values
 * can be passed, matching what Strapi stores.
 */
export function DynamicIcon({
  name,
  size = iconSize.card,
  className,
  color,
  strokeWidth = iconStroke.lucide,
}: DynamicIconProps) {
  // fallback must be a render function (() => JSX.Element | null) per lucide-react types
  const fallback = () => (
    <span
      aria-hidden="true"
      style={{ display: "inline-block", width: size, height: size, flexShrink: 0 }}
    />
  );

  return (
    <LucideDynamicIcon
      name={name}
      size={size}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
      fallback={fallback}
    />
  );
}
