"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSectionProps {
  /** Small mono eyebrow, e.g. "BEFORE YOU WRITE" */
  eyebrow?: string;
  /** Heading text before the accent phrase */
  headingBefore?: string;
  /** Accent phrase rendered in primary colour */
  headingAccent?: string;
  /** Subtext below the heading */
  subtext?: string;
  /** FAQ items */
  items: FaqItem[];
  /** Index of the item open on first render (defaults to 0) */
  defaultOpen?: number;
}

const DEFAULTS = {
  eyebrow: "BEFORE YOU WRITE",
  headingBefore: "Quick answers to",
  headingAccent: "questions we hear often.",
  subtext:
    "Couldn\u2019t find what you needed? The form above goes straight to a human, usually one with strong opinions about revenue collection.",
  defaultOpen: 0,
};

export function FaqSection({
  eyebrow = DEFAULTS.eyebrow,
  headingBefore = DEFAULTS.headingBefore,
  headingAccent = DEFAULTS.headingAccent,
  subtext = DEFAULTS.subtext,
  items,
  defaultOpen = DEFAULTS.defaultOpen,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number>(defaultOpen);

  return (
    <section className="pb-16 md:pb-20 lg:pb-32">
      <Container>
        <div
          className="pt-12 lg:pt-16"
          style={{ borderTop: `1px solid ${t.line}` }}
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

            {/* Left — label + heading */}
            <div>
              <div
                className="mono mb-5 uppercase"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                {eyebrow}
              </div>
              <h2
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-h2-md)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                  margin: 0,
                }}
              >
                {headingBefore}{" "}
                <span style={{ color: t.primary }}>{headingAccent}</span>
              </h2>
              <p
                className="mt-5 max-w-[300px]"
                style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}
              >
                {subtext}
              </p>
            </div>

            {/* Right — accordion */}
            <div>
              {items.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={faq.q} style={{ borderTop: `1px solid ${t.line}` }}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full grid grid-cols-[1fr_auto] items-center gap-6"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "22px 0",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: t.fontBody,
                          fontSize: 15,
                          fontWeight: isOpen ? 600 : 400,
                          color: t.ink,
                          lineHeight: 1.4,
                        }}
                      >
                        {faq.q}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: 11,
                          color: t.inkSoft,
                          letterSpacing: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        className="pb-6 max-w-[600px]"
                        style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.65 }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ borderTop: `1px solid ${t.line}` }} />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
