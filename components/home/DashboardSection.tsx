import { FileCheck, GitMerge, Plug, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { DashboardMock } from "@/components/DashboardMock";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { theme as t, iconSize } from "@/components/theme";

const FEATURES: { icon: LucideIcon; title: string; desc: ReactNode }[] = [
  {
    icon: TrendingUp,
    title: "Billing cycle insights",
    desc: "See the outcome of every billing cycle at a glance, with failed transactions clearly prioritised so your team knows exactly where to take action.",
  },
  {
    icon: GitMerge,
    title: "Automated reconciliation",
    desc: "Recurv automatically matches collections and payment outcomes, reducing manual back-office work and removing the need for spreadsheets and VLOOKUPs.",
  },
  {
    icon: Plug,
    title: "Reports and integrations",
    desc: (
      <>
        Export collection data for your accounting or CRM system, or connect through our{" "}
        <Link
          href="/api-docs"
          style={{ color: t.primary, textDecoration: "underline", textUnderlineOffset: 2 }}
        >
          API
        </Link>{" "}
        for real-time data synchronisation.
      </>
    ),
  },
  {
    icon: FileCheck,
    title: "Mandate monitoring",
    desc: "Track mandate statuses and identify issues before collections are submitted, helping you avoid unnecessary rejections and banking penalty fees.",
  },
];

export function DashboardSection() {
  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">
          <div className="min-w-0">
            <Reveal>
              <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              BILLING CYCLE CONTROL
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                Focus on what needs attention.<br />
                <span style={{ color: t.primary }}>We handle the rest.</span>
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p className="mt-6" style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6 }}>
              Recurv gives your team a complete view of every billing cycle
                without forcing them to work through every successful
                transaction to find the exceptions. Failed collections,
                mandate issues and transactions requiring intervention are
                surfaced immediately, while reconciliation and reporting happen
                automatically in the background.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-4">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={STAGGER * (i + 2)}>
                  <div className="grid grid-cols-[20px_1fr] gap-3.5">
                    <div className="shrink-0" style={{ marginTop: 2 }}>
                      <SiteIcon icon={f.icon} color={t.primary} size={iconSize.compact} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{f.title}</div>
                      <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, marginTop: 2 }}>{f.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={STAGGER * 6}>
              <div className="mt-8">
                <Button
                  href="/contactus"
                  variant="secondary"
                  icon={<span>→</span>}
                  className="w-full sm:w-auto justify-center"
                >
                  Speak to sales
                </Button>
              </div>
            </Reveal>

          </div>

          <Reveal delay={STAGGER}>
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
