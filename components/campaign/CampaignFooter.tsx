"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";
import { useCampaign } from "@/components/campaign/CampaignProvider";

export function CampaignFooter() {
  const { openQuote } = useCampaign();

  return (
    <footer style={{ borderTop: `1px solid ${t.line}` }}>
      <Container>
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 600,
                fontSize: 28,
                letterSpacing: "-0.04em",
                color: t.ink,
              }}
            >
              Recurv<span style={{ color: t.primary }}>.</span>
            </div>
            <p className="mt-2" style={{ fontSize: 13, color: t.inkSoft }}>
              South Africa
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link href="/privacy-policy" style={{ fontSize: 14, color: t.ink, textDecoration: "none" }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ fontSize: 14, color: t.ink, textDecoration: "none" }}>
              Terms
            </Link>
            <button
              type="button"
              onClick={openQuote}
              style={{
                fontSize: 14,
                color: t.ink,
                background: "none",
                border: 0,
                padding: 0,
                cursor: "pointer",
                fontFamily: t.fontBody,
                textAlign: "left",
              }}
            >
              Contact
            </button>
            <a href="mailto:sales@recurv.tech" style={{ fontSize: 14, color: t.inkSoft, textDecoration: "none" }}>
              sales@recurv.tech
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
