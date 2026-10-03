import { Button } from "@/components/Button";
import {
  BOOK_DEMO_LABEL,
  BOOK_DEMO_URL,
  SPEAK_TO_SALES_HREF,
  SPEAK_TO_SALES_LABEL,
  VIEW_DEMO_LABEL,
  VIEW_DEMO_PATH,
} from "@/lib/site-cta";

interface SiteCtaTrioProps {
  /** Row on sm and up. Stack stays a single column at every width. */
  layout?: "row" | "stack";
  size?: "sm" | "md" | "lg";
}

export function SiteCtaTrio({ layout = "row", size = "lg" }: SiteCtaTrioProps) {
  const itemClass =
    layout === "stack" ? "w-full justify-center" : "w-full sm:w-auto justify-center";

  return (
    <div
      className={
        layout === "stack"
          ? "flex flex-col gap-3"
          : "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      }
    >
      <Button size={size} href={VIEW_DEMO_PATH} className={itemClass}>
        {VIEW_DEMO_LABEL}
      </Button>
      <Button size={size} variant="secondary" href={BOOK_DEMO_URL} className={itemClass}>
        {BOOK_DEMO_LABEL}
      </Button>
      <Button size={size} variant="ghost" href={SPEAK_TO_SALES_HREF} className={itemClass}>
        {SPEAK_TO_SALES_LABEL}
      </Button>
    </div>
  );
}
