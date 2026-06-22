"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const TECH_BADGES = ["REST+JSON", "Signed Webhooks", "Sandbox Keys"];

// Syntax token colors
const C = {
  comment:  "#6A9955",
  keyword:  "#C9C7D4",
  flag:     "#DCDCAA",
  string:   "#9CDCFE",
  number:   "#CE9178",
  muted:    "rgba(201,199,212,0.35)",
  base:     "#C9C7D4",
} as const;

type TokenType = "comment" | "keyword" | "flag" | "string" | "number" | "muted" | "base";

type Token = { text: string; type: TokenType };

const CODE_LINES: (Token[] | null)[] = [
  [{ text: "# Create a recurring mandate for a customer", type: "comment" }],
  [
    { text: "curl ", type: "keyword" },
    { text: "https://api.recurv.tech/v1/mandates", type: "string" },
    { text: " \\", type: "muted" },
  ],
  [
    { text: "  -H ", type: "flag" },
    { text: '"Authorization: Bearer sk_live_••••"', type: "string" },
    { text: " \\", type: "muted" },
  ],
  [
    { text: "  -d ", type: "flag" },
    { text: "customer=cus_8Fk2P", type: "base" },
    { text: " \\", type: "muted" },
  ],
  [
    { text: "  -d ", type: "flag" },
    { text: "amount=", type: "base" },
    { text: "49900", type: "number" },
    { text: " \\", type: "muted" },
  ],
  [
    { text: "  -d ", type: "flag" },
    { text: "cadence=monthly", type: "base" },
  ],
  null, // blank line 7 (skipped in numbering)
  [{ text: "# → 201 Created", type: "comment" }],
  [
    { text: '{ ', type: "base" },
    { text: '"id"', type: "string" },
    { text: ': ', type: "base" },
    { text: '"mnd_3kQ9z"', type: "string" },
    { text: ', ', type: "base" },
    { text: '"status"', type: "string" },
    { text: ': ', type: "base" },
    { text: '"active"', type: "string" },
    { text: ' }', type: "base" },
  ],
];

export function ApiHeroSection() {
  return (
    <Section className="py-16 md:py-20 lg:py-[72px]">
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-[72px]">
          {/* Left: copy */}
          <div>
            <div
              className="mono mb-6"
              style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
            >
              API &amp; DEVELOPER DOCS
            </div>
            <h1
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-hero)",
                lineHeight: 0.94,
                letterSpacing: "-0.045em",
                margin: 0,
              }}
            >
              Plug Recurv into<br />
              <span style={{ color: t.primary }}>anything.</span>
            </h1>
            <p
              className="mt-7"
              style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, maxWidth: 520 }}
            >
              Recurv provides a comprehensive REST API and real-time webhooks, enabling seamless integration with virtually any accounting package, ERP, CRM, membership platform, or custom business application. Your systems stay connected while your teams stay productive.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contactus" style={{ textDecoration: "none" }}>
                <Button size="lg">Request API access</Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              {TECH_BADGES.map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    style={{ width: 6, height: 6, borderRadius: 999, background: t.primary, flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 13, color: t.inkSoft }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal window */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#1C1B22",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.45), 0 0 80px rgba(79,51,217,0.12)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ background: "#2A2830", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-4">
                {/* Traffic lights */}
                <div className="flex items-center gap-[7px]">
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: "#FF5F57", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: "#FFBD2E", display: "inline-block" }} />
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: "#28CA41", display: "inline-block" }} />
                </div>
                <span style={{ fontFamily: t.fontMono, fontSize: 12, color: "rgba(201,199,212,0.55)" }}>
                  create a debit-order mandate
                </span>
              </div>
              <span
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: 0.5,
                  color: "rgba(201,199,212,0.55)",
                  border: "1px solid rgba(201,199,212,0.2)",
                  borderRadius: 4,
                  padding: "2px 8px",
                }}
              >
                cURL
              </span>
            </div>

            {/* Code body */}
            <div className="overflow-x-auto" style={{ padding: "24px 20px 28px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {CODE_LINES.map((tokens, idx) => {
                    const lineNum = idx + 1;
                    if (tokens === null) {
                      return (
                        <tr key={idx}>
                          <td style={{ width: 28, paddingRight: 20, fontFamily: t.fontMono, fontSize: 13, color: C.muted, userSelect: "none", verticalAlign: "top", paddingTop: 4, paddingBottom: 4 }}>{lineNum}</td>
                          <td style={{ paddingTop: 4, paddingBottom: 4 }}>&nbsp;</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx}>
                        <td
                          style={{
                            width: 28,
                            paddingRight: 20,
                            fontFamily: t.fontMono,
                            fontSize: 13,
                            lineHeight: 1.75,
                            color: C.muted,
                            userSelect: "none",
                            verticalAlign: "top",
                            paddingTop: 4,
                            paddingBottom: 4,
                          }}
                        >
                          {lineNum}
                        </td>
                        <td style={{ paddingTop: 4, paddingBottom: 4, whiteSpace: "pre" }}>
                          {tokens.map((token, ti) => (
                            <span
                              key={ti}
                              style={{
                                fontFamily: t.fontMono,
                                fontSize: 13,
                                lineHeight: 1.75,
                                color: C[token.type],
                              }}
                            >
                              {token.text}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
