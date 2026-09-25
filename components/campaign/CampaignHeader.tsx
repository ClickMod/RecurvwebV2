"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { theme as t } from "@/components/theme";
import { useCampaign } from "@/components/campaign/CampaignProvider";

export function CampaignHeader({ label }: { label: string }) {
  const { bookDemoHref, track } = useCampaign();

  return (
    <header
      className="sticky top-0 z-[100]"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderBottom: `1px solid ${t.line}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-14">
        <Link href="/" aria-label="Recurv home" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo size={22} />
        </Link>
        <Button
          size="sm"
          href={bookDemoHref}
          onClick={() => track("book_demo_clicked")}
        >
          {label}
        </Button>
      </div>
    </header>
  );
}
