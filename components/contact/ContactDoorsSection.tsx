import { CarbonIcon } from "@/components/CarbonIcon";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const DOORS = [
  {
    num: "01",
    icon: "wallet" as const,
    tag: "SALES",
    title: "Talk to sales",
    desc: "You're evaluating Recurv for your business, want pricing, or need a tailored demo for your team.",
    email: "christell@clickmod.co.za",
    phone: "+27 61 586 2591",
    sla: "Reply within 1 business hour",
  },
  {
    num: "02",
    icon: "shield" as const,
    tag: "SUPPORT",
    title: "Customer support",
    desc: "You already run Recurv and need help with mandates, collections, reconciliation, or your dashboard.",
    email: "riaan@clickmod.co.za",
    phone: "+27 82 416 8273",
    sla: "Reply within 4 business hours",
  },
  {
    num: "03",
    icon: "people" as const,
    tag: "PARTNERS & PRESS",
    title: "Partnerships & press",
    desc: "You're a banking, accounting, or technology partner, or a journalist with questions about Recurv.",
    email: "riaan@clickmod.co.za",
    phone: "+27 82 416 8273",
    sla: "Reply within 2 business days",
  },
];

export function ContactDoorsSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div style={{ borderTop: `1px solid ${t.line}` }} className="pt-10 lg:pt-14">
          {/* Section header */}
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-12">
            <div>
              <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                HOW CAN WE HELP?
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-md)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Three doors,<br /><span style={{ color: t.primary }}>one team behind them.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
                Routing your message to the right person up front means a faster, sharper reply.
                Pick the door that best matches your reason for getting in touch.
              </p>
            </div>
          </div>

          {/* Door cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ borderTop: `1px solid ${t.line}` }}
          >
            {DOORS.map((door, i) => (
              <div
                key={door.num}
                className="flex flex-col gap-3.5 p-7 md:p-8"
                style={{
                  borderBottom: `1px solid ${t.line}`,
                  borderRight: i < 2 ? `1px solid ${t.line}` : "none",
                }}
              >
                <div className="flex justify-between items-center">
                  <CarbonIcon name={door.icon} color={t.primary} size={40} />
                  <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>
                    {door.num} · {door.tag}
                  </span>
                </div>
                <div className="mt-1" style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {door.title}
                </div>
                <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55 }}>{door.desc}</div>
                <div
                  className="mt-auto pt-4 flex flex-col gap-2"
                  style={{ borderTop: `1px dashed ${t.line}` }}
                >
                  <a href={`mailto:${door.email}`} style={{ fontSize: 14, fontWeight: 600, color: t.ink, textDecoration: "none" }}>
                    {door.email}
                  </a>
                  <div className="mono" style={{ fontSize: 12, color: t.inkSoft, letterSpacing: 0.5 }}>{door.phone}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: t.success, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: t.inkSoft }}>{door.sla}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
