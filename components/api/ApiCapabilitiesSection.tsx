import { CarbonIcon } from "@/components/CarbonIcon";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const CAPABILITIES = [
  {
    icon: "mandate" as const,
    title: "Mandates",
    desc: "Create, amend and cancel debit-order mandates. Capture consent and store tokenised banking details.",
    route: "/v1/mandates",
  },
  {
    icon: "schedule" as const,
    title: "Collections",
    desc: "Schedule one-off or recurring collections, set retry logic, and track every status transition.",
    route: "/v1/collections",
  },
  {
    icon: "people" as const,
    title: "Customers",
    desc: "Manage payers, payment methods and contact details with full history and search.",
    route: "/v1/customers",
  },
  {
    icon: "wallet" as const,
    title: "Payouts",
    desc: "Reconcile settled funds, fees and refunds — pulled straight into your own ledger.",
    route: "/v1/payouts",
  },
  {
    icon: "bolt" as const,
    title: "Webhooks",
    desc: "Subscribe to 30+ signed event types. Replay, filter and inspect every delivery.",
    route: "/v1/webhooks",
  },
  {
    icon: "graph" as const,
    title: "Reporting",
    desc: "Query collected, failed and forecast revenue. Export to your BI tool or data warehouse.",
    route: "/v1/reporting",
  },
];

export function ApiCapabilitiesSection() {
  return (
    <Section style={{ borderTop: `1px solid ${t.line}` }} className="py-16 md:py-20 lg:py-24">
      <Container>
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 mb-10 items-end md:grid-cols-[1fr_auto]">
          <div>
            <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              FULL SURFACE AREA
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                margin: 0,
                maxWidth: 640,
              }}
            >
              Everything the dashboard does,{" "}
              <span style={{ color: t.primary }}>over the API.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <span style={{ width: 8, height: 8, borderRadius: 999, background: t.success, display: "inline-block", flexShrink: 0 }} />
            <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
              v1 · 99.98% UPTIME
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-xl"
          style={{ border: `1px solid ${t.line}` }}
        >
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className="flex flex-col gap-4 p-7 md:p-8"
              style={{
                borderRight: i % 3 < 2 ? `1px solid ${t.line}` : undefined,
                borderBottom: i < 3 ? `1px solid ${t.line}` : undefined,
              }}
            >
              <CarbonIcon name={cap.icon} color={t.primary} size={32} />
              <div>
                <div
                  style={{
                    fontFamily: t.fontDisplay,
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                  }}
                >
                  {cap.title}
                </div>
                <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.65 }}>
                  {cap.desc}
                </div>
              </div>
              <div
                className="mono mt-auto pt-2"
                style={{ fontSize: 12, color: t.primary, letterSpacing: 0.3 }}
              >
                {cap.route}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
