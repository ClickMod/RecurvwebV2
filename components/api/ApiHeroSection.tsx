"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const TECH_BADGES = ["REST+JSON", "Signed Webhooks", "Sandbox Keys"];

// ── Token colours ─────────────────────────────────────────────────────────────
const TC = {
  kw:  "#A89BF0",
  str: "#9BE7C4",
  num: "#F4C77B",
  txt: "#EDEAE0",
  pun: "rgba(246,245,240,0.70)",
  dim: "rgba(246,245,240,0.40)",
} as const;

type TK = readonly [text: string, color: string];

// Each request line is an array of [text, color] tuples
const REQUEST_LINES: TK[][] = [
  [["curl", TC.kw], [" -X ", TC.txt], ["POST", TC.kw], [" \\", TC.pun]],
  [["  https://api.recurv.tech/v1/mandates", TC.str], [" \\", TC.pun]],
  [["  -H ", TC.kw], ['"Authorization: Bearer sk_live_••••"', TC.str], [" \\", TC.pun]],
  [["  -H ", TC.kw], ['"Content-Type: application/json"', TC.str], [" \\", TC.pun]],
  [["  -d ", TC.kw], ["'{", TC.pun]],
  [["    ", TC.txt], ['"customer"', TC.txt], [": ", TC.pun], ['"sub_9fKn2xM"', TC.str], [",", TC.pun]],
  [["    ", TC.txt], ['"amount"',   TC.txt], [": ", TC.pun], ["49900",          TC.num], [",", TC.pun]],
  [["    ", TC.txt], ['"cadence"',  TC.txt], [": ", TC.pun], ['"monthly"',      TC.str]],
  [["  }'", TC.pun]],
];

// First row is intentionally blank to serve as a visual spacer
const RESPONSE_LINES: TK[][] = [
  [],
  [["# 201 Created", TC.dim]],
  [["{", TC.pun]],
  [["  ", TC.txt], ['"id"',     TC.txt], [": ", TC.pun], ['"mnd_3kQ9z"', TC.str], [",", TC.pun]],
  [["  ", TC.txt], ['"status"', TC.txt], [": ", TC.pun], ['"active"',    TC.str]],
  [["}", TC.pun]],
];

const TOTAL_CHARS = REQUEST_LINES.reduce(
  (s, line) => s + line.reduce((ls, [text]) => ls + text.length, 0),
  0
);

function caretLineOf(count: number): number {
  let rem = count;
  for (let i = 0; i < REQUEST_LINES.length; i++) {
    const len = REQUEST_LINES[i].reduce((s, [text]) => s + text.length, 0);
    if (rem <= len) return i;
    rem -= len;
  }
  return REQUEST_LINES.length - 1;
}

function buildVisibleReq(count: number): TK[][] {
  let rem = count;
  return REQUEST_LINES.map((tokens) => {
    if (rem <= 0) return [];
    const out: TK[] = [];
    for (const [text, color] of tokens) {
      if (rem >= text.length) {
        out.push([text, color]);
        rem -= text.length;
      } else if (rem > 0) {
        out.push([text.slice(0, rem), color]);
        rem = 0;
      }
    }
    return out;
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
type Phase = "typing" | "sending" | "response";

export function ApiHeroSection() {
  // All state initialised for the non-reduced-motion path so SSR and client
  // hydration always agree; reduced-motion is applied after mount.
  const [phase, setPhase]         = useState<Phase>("typing");
  const [charCount, setCharCount] = useState(0);
  const [respVis, setRespVis]     = useState(false);
  const [caretOn, setCaretOn]     = useState(true);
  const reducedMotion             = useRef(false);

  // Detect prefers-reduced-motion after mount and jump to completed state
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reducedMotion.current) {
      setPhase("response");
      setCharCount(TOTAL_CHARS);
      setRespVis(true);
    }
  }, []);

  // State machine: typing → sending → response → loop
  useEffect(() => {
    if (reducedMotion.current) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (phase === "typing") {
      if (charCount < TOTAL_CHARS) {
        timers.push(setTimeout(() => setCharCount((c) => Math.min(c + 2, TOTAL_CHARS)), 22));
      } else {
        timers.push(setTimeout(() => setPhase("sending"), 200));
      }
    } else if (phase === "sending") {
      timers.push(setTimeout(() => { setPhase("response"); setRespVis(true); }, 780));
    } else if (phase === "response") {
      // Fade the response out, then reset to typing
      timers.push(setTimeout(() => setRespVis(false), 2800));
      timers.push(setTimeout(() => { setPhase("typing"); setCharCount(0); }, 3350));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, charCount]);

  // Caret blink (only during typing)
  useEffect(() => {
    if (reducedMotion.current || phase !== "typing") return;
    const id = setInterval(() => setCaretOn((v) => !v), 530);
    return () => clearInterval(id);
  }, [phase]);

  const visReq    = phase === "typing" ? buildVisibleReq(charCount) : REQUEST_LINES;
  const caretLine = phase === "typing" ? caretLineOf(charCount)     : -1;

  return (
    <Section className="py-16 md:py-20 lg:py-[72px]">
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-[72px]">

          {/* ── Left: copy ── */}
          <div>
            <div className="mono mb-6" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
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
            <p className="mt-7" style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, maxWidth: 520 }}>
              Recurv provides a comprehensive REST API and real-time webhooks, enabling seamless
              integration with virtually any accounting package, ERP, CRM, membership platform, or
              custom business application. Your systems stay connected while your teams stay productive.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/contactus" className="w-full sm:w-auto" style={{ textDecoration: "none" }}>
                <Button size="lg" className="w-full sm:w-auto justify-center">Request API access</Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              {TECH_BADGES.map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <div style={{ width: 6, height: 6, borderRadius: 999, background: t.primary, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: t.inkSoft }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: animated terminal card ── */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "#15122B",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.07), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(79,51,217,0.12)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2.5 px-[18px] py-[13px]"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-[6px] shrink-0">
                {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((c) => (
                  <span
                    key={c}
                    style={{ width: 11, height: 11, borderRadius: 999, background: c, display: "inline-block" }}
                  />
                ))}
              </div>

              <span
                className="flex-1 text-center"
                style={{ fontFamily: t.fontMono, fontSize: 11.5, color: "rgba(246,245,240,0.42)", letterSpacing: 0.2 }}
              >
                create a debit-order mandate
              </span>

              {/* Status pill */}
              <div className="flex items-center gap-1.5 shrink-0" style={{ minWidth: 148, justifyContent: "flex-end" }}>
                {phase === "typing" && (
                  <>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(168,155,240,0.55)", display: "inline-block" }} />
                    <span style={{ fontFamily: t.fontMono, fontSize: 10, color: "rgba(246,245,240,0.32)", letterSpacing: 0.9 }}>
                      READY
                    </span>
                  </>
                )}
                {phase === "sending" && (
                  <>
                    {/* animate-spin is Tailwind's built-in; override duration via style */}
                    <span
                      className="animate-spin shrink-0"
                      style={{
                        width: 10, height: 10, borderRadius: 999, display: "inline-block",
                        border: "1.5px solid #FEBC2E", borderTopColor: "transparent",
                        animationDuration: "0.65s",
                      }}
                    />
                    <span style={{ fontFamily: t.fontMono, fontSize: 10, color: "#FEBC2E", letterSpacing: 0.9 }}>
                      SENDING…
                    </span>
                  </>
                )}
                {phase === "response" && (
                  <>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "#28C840", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: t.fontMono, fontSize: 10, color: "#28C840", letterSpacing: 0.9 }}>
                      201 CREATED · 142 ms
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Code body */}
            <div className="overflow-x-auto" style={{ padding: "18px 0 22px" }}>
              <div style={{ fontFamily: t.fontMono, fontSize: 12.5, lineHeight: 1.72 }}>

                {/* Request rows */}
                {REQUEST_LINES.map((_, i) => {
                  const visible  = visReq[i];
                  const hasChars = visible && visible.length > 0;
                  const isCaret  = i === caretLine;
                  return (
                    <div
                      key={i}
                      className="flex items-baseline"
                      style={{ minHeight: "1.72em", paddingLeft: 20, paddingRight: 20 }}
                    >
                      <span
                        style={{
                          width: 22, minWidth: 22, fontSize: 11, textAlign: "right",
                          marginRight: 18, flexShrink: 0, userSelect: "none",
                          color: "rgba(246,245,240,0.18)",
                          opacity: hasChars || isCaret ? 1 : 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ whiteSpace: "pre" }}>
                        {visible && visible.map(([text, color], ti) => (
                          <span key={ti} style={{ color }}>{text}</span>
                        ))}
                        {isCaret && (
                          <span
                            style={{
                              display: "inline-block", width: 7, height: "0.85em",
                              background: caretOn ? TC.kw : "transparent",
                              verticalAlign: "text-bottom", marginLeft: 1,
                            }}
                          />
                        )}
                      </span>
                    </div>
                  );
                })}

                {/* Response rows — always rendered so card height never jumps */}
                {RESPONSE_LINES.map((tokens, i) => (
                  <div
                    key={`r${i}`}
                    className="flex items-baseline"
                    style={{
                      minHeight: "1.72em", paddingLeft: 20, paddingRight: 20,
                      opacity: respVis ? 1 : 0,
                      transform: respVis ? "translateY(0)" : "translateY(6px)",
                      transition: reducedMotion.current
                        ? "none"
                        : `opacity 0.45s ease ${i * 0.055}s, transform 0.45s ease ${i * 0.055}s`,
                    }}
                  >
                    <span
                      style={{
                        width: 22, minWidth: 22, fontSize: 11, textAlign: "right",
                        marginRight: 18, flexShrink: 0, userSelect: "none",
                        color: "rgba(246,245,240,0.18)",
                        opacity: tokens.length > 0 ? 1 : 0,
                      }}
                    >
                      {REQUEST_LINES.length + i + 1}
                    </span>
                    <span style={{ whiteSpace: "pre" }}>
                      {tokens.map(([text, color], ti) => (
                        <span key={ti} style={{ color }}>{text}</span>
                      ))}
                    </span>
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
