"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const FAQS = [
  {
    q: "How long does a typical Recurv deployment take?",
    a: "Most teams are live within 5 business days. Mandate templates, retry rules and dashboard access are set up on day one; bank integrations and reconciliation imports usually wrap by end of week.",
  },
  {
    q: "Do you support migrations from existing debit-order providers?",
    a: "Yes — we handle the full migration, including porting active mandates and reconciling historical collections so there's no gap in your records.",
  },
  {
    q: "Is Recurv suitable for small clubs or single-practice operators?",
    a: "Absolutely. Recurv scales from a single-practice dental office to a national property portfolio. Pricing is volume-based, so you only pay for what you collect.",
  },
  {
    q: "What does Recurv cost?",
    a: "Pricing is based on monthly collection volume with no setup fees. Book a demo and we'll give you exact numbers on the call — no follow-up email, no surprises.",
  },
  {
    q: "Where is customer data stored?",
    a: "All data is stored in South Africa on ISO 27001-aligned infrastructure. Banking details are tokenised on capture and never stored in plaintext — by us, or by you.",
  },
  {
    q: "Can I integrate Recurv into our existing CRM?",
    a: "Yes. Recurv has a REST API and native connectors for Xero, Sage, and the most common South African CRMs. Custom integrations are scoped during onboarding.",
  },
];

export function ContactFaqSection() {
  const [open, setOpen] = useState<number>(0);

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
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                BEFORE YOU WRITE
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-md)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Quick answers to{" "}
                <span style={{ color: t.primary }}>questions we hear often.</span>
              </h2>
              <p className="mt-5 max-w-[300px]" style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>
                Couldn&rsquo;t find what you needed? The form above goes straight to a human — usually
                one with strong opinions about debit orders.
              </p>
              <div className="mt-7">
                <Button variant="secondary" icon={<span>→</span>}>Full help centre</Button>
              </div>
            </div>

            {/* Right — accordion */}
            <div>
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                const total = FAQS.length;
                return (
                  <div
                    key={faq.q}
                    style={{ borderTop: `1px solid ${t.line}` }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full grid grid-cols-[1fr_auto] items-center gap-6 py-[22px] text-left"
                      style={{
                        background: "none",
                        border: "none",
                        padding: "22px 0",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{
                        fontFamily: t.fontBody,
                        fontSize: 15,
                        fontWeight: isOpen ? 600 : 400,
                        color: t.ink,
                        lineHeight: 1.4,
                      }}>
                        {faq.q}
                      </span>
                      <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1, whiteSpace: "nowrap" }}>
                        {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6 max-w-[600px]" style={{
                        fontSize: 14,
                        color: t.inkSoft,
                        lineHeight: 1.65,
                      }}>
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
