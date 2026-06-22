"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const METHOD_COLORS: Record<string, string> = {
  GET: "#1E7A4E",
  POST: "#4F33D9",
  PUT: "#B45A1B",
  DELETE: "#C0392B",
};

const API_ENDPOINTS = [
  {
    method: "POST",
    path: "/v1/mandates",
    desc: "Create a DebiCheck or NAEDO mandate for a subscriber.",
    body: `{
  "subscriber_id": "sub_9fKn2xM",
  "account": {
    "bank_code": "632005",
    "account_number": "••••••7821",
    "account_type": "cheque"
  },
  "collection_amount": 249900,
  "frequency": "monthly",
  "first_collection_date": "2026-02-01"
}`,
    response: `{
  "id": "mnd_4R7GhpQw",
  "status": "pending_authentication",
  "auth_channel": "debicheck",
  "auth_expires_at": "2026-01-25T18:00:00Z"
}`,
  },
  {
    method: "GET",
    path: "/v1/mandates/{id}",
    desc: "Retrieve a mandate and its current authentication status.",
    body: null,
    response: `{
  "id": "mnd_4R7GhpQw",
  "status": "authenticated",
  "subscriber_id": "sub_9fKn2xM",
  "collection_amount": 249900,
  "frequency": "monthly",
  "authenticated_at": "2026-01-24T09:14:32Z"
}`,
  },
  {
    method: "POST",
    path: "/v1/collections",
    desc: "Trigger a once-off or scheduled collection run against an active mandate.",
    body: `{
  "mandate_id": "mnd_4R7GhpQw",
  "amount": 249900,
  "reference": "INV-2026-0041",
  "collection_date": "2026-02-01"
}`,
    response: `{
  "id": "col_7TpXvNm1",
  "status": "queued",
  "mandate_id": "mnd_4R7GhpQw",
  "amount": 249900,
  "collection_date": "2026-02-01",
  "estimated_settlement": "2026-02-01T15:30:00Z"
}`,
  },
  {
    method: "GET",
    path: "/v1/collections/{id}",
    desc: "Get the real-time status of a collection, including settlement and failure reasons.",
    body: null,
    response: `{
  "id": "col_7TpXvNm1",
  "status": "settled",
  "amount": 249900,
  "settled_at": "2026-02-01T15:28:14Z",
  "net_amount": 248773,
  "fee": 1127
}`,
  },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      style={{
        background: "#0F0E14",
        borderRadius: 8,
        padding: "20px 24px",
        fontFamily: t.fontMono,
        fontSize: 13,
        lineHeight: 1.65,
        color: "#C9C7D4",
        overflowX: "auto",
        whiteSpace: "pre",
        margin: 0,
      }}
    >
      {code}
    </pre>
  );
}

export function ApiEndpointSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ep = API_ENDPOINTS[activeIdx];

  return (
    <Section style={{ borderTop: `1px solid ${t.line}` }} className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
          ENDPOINT EXPLORER
        </div>
        <h2
          className="mb-10"
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 500,
            fontSize: "var(--fs-h2-md)",
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: 40,
          }}
        >
          REST API reference.
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:gap-6 items-start">
          {/* Endpoint list */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: `1px solid ${t.line}` }}
          >
            {API_ENDPOINTS.map((endpoint, i) => (
              <button
                key={endpoint.path}
                onClick={() => setActiveIdx(i)}
                className="w-full flex gap-3 items-start text-left transition-colors"
                style={{
                  padding: "16px 20px",
                  background: activeIdx === i ? t.softTint : t.surface,
                  borderBottom:
                    i < API_ENDPOINTS.length - 1 ? `1px solid ${t.line}` : "none",
                  border: "none",
                  borderLeft: `3px solid ${activeIdx === i ? t.primary : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: t.fontBody,
                }}
              >
                <span
                  className="mono shrink-0 mt-[2px]"
                  style={{
                    fontSize: 10,
                    letterSpacing: 1,
                    color: METHOD_COLORS[endpoint.method],
                    fontWeight: 700,
                  }}
                >
                  {endpoint.method}
                </span>
                <span className="mono" style={{ fontSize: 12, color: t.ink, lineHeight: 1.4 }}>
                  {endpoint.path}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex flex-col gap-5">
            {/* Header card */}
            <div
              className="rounded-xl p-6 md:p-7"
              style={{ background: t.surface, border: `1px solid ${t.line}` }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 4,
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    background: `${METHOD_COLORS[ep.method]}18`,
                    color: METHOD_COLORS[ep.method],
                  }}
                >
                  {ep.method}
                </span>
                <span className="mono" style={{ fontSize: 14, color: t.ink }}>
                  {ep.path}
                </span>
              </div>
              <div style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>{ep.desc}</div>
            </div>

            {/* Request body */}
            {ep.body && (
              <div>
                <div
                  className="mono mb-2.5"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
                >
                  REQUEST BODY
                </div>
                <CodeBlock code={ep.body} />
              </div>
            )}

            {/* Response */}
            <div>
              <div
                className="mono mb-2.5"
                style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
              >
                RESPONSE
              </div>
              <CodeBlock code={ep.response} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
