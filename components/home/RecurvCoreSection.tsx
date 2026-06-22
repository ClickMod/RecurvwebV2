import { CarbonIcon } from "@/components/CarbonIcon";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

const FEATURES = [
  { num: "01", icon: "mandate", title: "Cut the admin", desc: "Stop wrestling with spreadsheets, paperwork, and manual follow-ups. Recurv enables customers to authorise payments digitally and allows your team to create flexible collection schedules for any business model. Whether you bill once, monthly, indefinitely or based on changing amounts, we make revenue collection effortless." },
  { num: "02", icon: "wallet", title: "Collect with confidence", desc: "Move beyond spreadsheets and batch files. Recurv automates recurring revenue collections from end to end, handling payment processing, status updates, retries and reconciliation in real time. Your team gets instant visibility into collection outcomes without lifting a finger." },
  { num: "03", icon: "reconcile", title: "From reconciliation to resolution", desc: "Recurv automatically matches and reconciles collection outcomes, allowing your back-office team to focus on resolving failed payments instead of processing successful ones. Real-time dashboards provide complete visibility into collection performance without the spreadsheets and manual effort." },
  { num: "04", icon: "shield", title: "Get Authorised Faster", desc: "Make it effortless for customers to approve payments. Send secure payment links via email, SMS, QR code, WhatsApp, or embed the experience directly into your website. Customers can authorise collections in minutes from any device, reducing paperwork, delays, and administrative overhead." },
  { num: "05", icon: "graph", title: "Know your revenue", desc: "See upcoming collections, expected revenue, success rates, failed payments and collection trends in real time. Recurv gives your team complete visibility into future cash flow, helping you forecast accurately and act before revenue problems become cash flow problems." },
] as const;

export function RecurvCoreSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div style={{ borderTop: `1px solid ${t.line}` }} className="pt-12 lg:pt-16">
          {/* Section header */}
          <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:mb-16">
            <Reveal>
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                RECURV CORE
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-lg)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Payment operations, built for{" "}
                <span style={{ color: t.primary }}>South African enterprise scale.</span>
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Recurv is the payment collection layer trusted by golf clubs, schools, sport clubs,
                property managers and many other industries across the country. One platform that handles authorisation, scheduling,
                collections, retries and reconciliation at any volume, with the
                audit trail your accountant actually wants.
              </p>
            </Reveal>
          </div>

          {/* Feature grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            style={{ borderTop: `1px solid ${t.line}` }}
          >
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} delay={i * STAGGER}>
                <div
                  className="flex flex-col gap-4 p-6 lg:p-8 h-full transition-[background-color] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--surface-alt)]"
                  style={{
                    borderBottom: `1px solid ${t.line}`,
                    borderRight: `1px solid ${t.line}`,
                  }}
                >
                  <CarbonIcon name={f.icon} color={t.primary} size={44} />
                  <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</div>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
