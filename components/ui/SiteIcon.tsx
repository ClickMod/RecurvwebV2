import type { LucideIcon } from "lucide-react";
import { iconSize, iconStroke } from "@/components/theme";

interface SiteIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

/** Static Lucide icon with site-wide size and stroke tokens. */
export function SiteIcon({
  icon: Icon,
  size = iconSize.card,
  color,
  className,
}: SiteIconProps) {
  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={iconStroke.lucide}
      className={className}
      aria-hidden
    />
  );
}
