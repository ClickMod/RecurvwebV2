import { DashboardMock } from "@/components/DashboardMock";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

const BULLETS = [
  ["Live cashflow tracking", "Watch revenue land as it happens, across every plan and customer."],
  ["Retry intelligence", "Failed collections are retried at the right time, for the right reason. Automatically."],
  ["Reconciled export", "One-click CSV that matches your bank statement, every time."],
] as const;

export function DashboardSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0">
            <Reveal>
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                UNIFIED DASHBOARD
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Every collection. Every customer.<br />
                <span style={{ color: t.primary }}>In one place.</span>
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p className="mt-6" style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6 }}>
                Ditch the spreadsheets and the WhatsApp reminders. Recurv gives your finance team a single view
                of every payment plan, subscription, and collection run — with real-time data to spot problems
                early, forecast accurately, and act fast.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3.5">
              {BULLETS.map(([h, d], i) => (
                <Reveal key={h} delay={STAGGER * (i + 2)}>
                  <div className="grid grid-cols-[20px_1fr] gap-3.5">
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      border: `2px solid ${t.primary}`,
                      marginTop: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <span style={{ width: 6, height: 6, background: t.primary, borderRadius: 999, display: "block" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{h}</div>
                      <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, marginTop: 2 }}>{d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

          <Reveal delay={STAGGER}>
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
