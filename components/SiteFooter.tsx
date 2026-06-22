"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const COLLECTION_TYPE_ITEMS = [
  "Once-off collection",
  "Fixed-term collections",
  "Ongoing collections",
  "Ad hoc fees",
  "Variable amounts",
];

const FOOTER_LINKS: [string, string[]][] = [
  ["Collection Types", COLLECTION_TYPE_ITEMS],
  ["Solutions", ["Golf & sport", "Medical", "Property & rentals", "Subscriptions", "Payment plans"]],
  ["Company", ["About", "Blog", "Contact"]],
  ["Resources", ["API Docs", "Calculator", "Privacy", "Terms"]],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SiteFooter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubscribe() {
    const val = inputRef.current?.value.trim() ?? "";
    if (!EMAIL_RE.test(val)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
    } else {
      setError("");
      // TODO: submit subscription
    }
  }

  return (
    <footer style={{ borderTop: `1px solid ${t.line}` }}>
      {/* Newsletter */}
      <div
        className="py-14 md:py-16 lg:py-[72px]"
        style={{ borderBottom: `1px solid ${t.line}` }}
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 items-end md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>STAY IN THE LOOP</div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
                maxWidth: 560,
              }}>
                Payment operations insights,{" "}
                <span style={{ color: t.primary }}>once a month.</span>
              </h2>
            </div>
            <div>
              <div className="flex gap-2.5 items-stretch">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="you@company.co.za"
                  className="flex-1 px-4 outline-none bg-transparent focus:ring-0 transition-colors"
                  style={{
                    border: `1px solid ${error ? "#EF4444" : focused ? "#7C3AED" : t.lineStrong}`,
                    borderRadius: 8,
                    fontSize: 15,
                    color: t.inkSoft,
                    height: 52,
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={() => { if (error) setError(""); }}
                />
                <Button size="lg" onClick={handleSubscribe}>Subscribe</Button>
              </div>
              {error && (
                <p className="mt-1.5" style={{ fontSize: 12.5, color: "#EF4444" }}>{error}</p>
              )}
              <div className="mt-3.5" style={{ fontSize: 12.5, color: t.inkSoft, lineHeight: 1.5 }}>
                No spam. Unsubscribe anytime. Read by 2,400+ finance teams across South Africa.
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Link columns */}
      <div className="py-10 md:py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <p className="mt-4 max-w-[280px]" style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.6 }}>
                Payment collection infrastructure for South African businesses.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 items-center">
                {["PCI DSS L1", "ISO 27001", "SARB"].map((b) => (
                  <span
                    key={b}
                    className="mono"
                    style={{ fontSize: 11, padding: "4px 8px", border: `1px solid ${t.line}`, borderRadius: 4, color: t.inkSoft }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            {FOOTER_LINKS.map(([heading, items]) => (
              <div key={heading}>
                <div className="mono mb-3.5" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                  {heading.toUpperCase()}
                </div>
                <ul className="flex flex-col gap-2.5 p-0 list-none">
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: 14, color: t.ink, cursor: "pointer" }}>
                      {heading === "Collection Types" ? (
                        <Link href="/#collection-types" style={{ color: "inherit", textDecoration: "none" }}>{item}</Link>
                      ) : item === "Contact" ? (
                        <Link href="/contactus" style={{ color: "inherit", textDecoration: "none" }}>{item}</Link>
                      ) : item === "Blog" ? (
                        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>{item}</Link>
                      ) : item === "API Docs" ? (
                        <Link href="/api-docs" style={{ color: "inherit", textDecoration: "none" }}>{item}</Link>
                      ) : item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Oversized wordmark */}
      <div className="overflow-hidden px-4 md:px-8 lg:px-14 pt-2">
        <Link href="/" style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            fontFamily: t.fontDisplay,
            fontWeight: 600,
            fontSize: "var(--fs-display)",
            lineHeight: 0.8,
            letterSpacing: "-0.05em",
            color: t.ink,
            whiteSpace: "nowrap",
          }}>
            Recurv<span style={{ color: t.primary }}>.</span>
          </div>
        </Link>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col gap-3 py-6 md:flex-row md:justify-between md:items-center px-4 md:px-8 lg:px-14"
        style={{ borderTop: `1px solid ${t.line}`, fontSize: 12, color: t.inkSoft }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <span>© 2026 Recurv.Tech Pty Ltd · South Africa · 🇿🇦</span>
          <a
            href="https://clickmod.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: t.inkSoft, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
          </a>
        </div>
        <div className="flex flex-wrap gap-5">
          <span className="mono">All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
