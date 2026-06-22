import { Button } from "@/components/Button";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

const INDUSTRIES_COMPACT = [
  { h: "Golf & country clubs", collect: "Membership dues & green fees", tint: "#3E6B47", bg: "#16241A" },
  { h: "Medical & dental", collect: "Patient payment plans", tint: "#3D5C8A", bg: "#141E2E" },
  { h: "Sport clubs & unions", collect: "Subs, term fees & event collections", tint: "#9A6B3E", bg: "#241A12" },
] as const;

export function IndustriesSection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ borderTop: `1px solid ${t.line}`, background: t.surfaceAlt }}
    >
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              INDUSTRIES
            </div>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-xl)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              Built for every billing pattern,<br />
              <span style={{ color: t.primary }}>not just monthly debit orders.</span>
            </h2>
            <p className="mt-5 max-w-[560px]" style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.55 }}>
              Membership dues, term fees, payment plans, or monthly rent — Recurv adapts
              to your billing cycle, not the other way around.
            </p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <div className="flex flex-col-reverse md:flex-col items-start md:items-end gap-3 pb-1">
              <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>R 30.6M COLLECTED / MONTH</div>
              <Button variant="secondary" className="w-full md:w-auto justify-center">All industries →</Button>
            </div>
          </Reveal>
        </div>

        {/* Industry tiles */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.12fr_1fr] items-stretch min-w-0">
          {/* Featured tile — Property & Rentals */}
          <Reveal className="relative rounded-2xl overflow-hidden min-h-[360px] md:min-h-[520px]">
            <div className="absolute inset-0">
              <PhotoSlot tint="#6E4A2A" bg="#241813" variant="spotlight" rounded={0} style={{ height: "100%", aspectRatio: "auto" }}>
                <span />
              </PhotoSlot>
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(15,14,20,0.12) 0%, transparent 32%, rgba(15,14,20,0.55) 78%, rgba(15,14,20,0.82) 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)" }}>
                TOWNHOUSE COMPLEX · DROP IMAGE
              </div>
              <div>
                <div className="mono mb-3" style={{ fontSize: 11, letterSpacing: 1.5, color: "#E9C9A6" }}>HIGHEST VOLUME</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: "var(--fs-h2-md)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>
                  Property & rentals
                </div>
                <p className="mt-3 mb-5 max-w-[420px]" style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
                  Rent collection, tenant onboarding & deposit management — automated end to end.
                </p>
                <div className="flex items-center pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                  <span className="cursor-pointer underline underline-offset-4" style={{ fontSize: 14, color: "rgba(255,255,255,0.82)" }}>See Use Case →</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Compact industry rows */}
          <div className="flex flex-col gap-4">
            {INDUSTRIES_COMPACT.map((ind, i) => (
              <Reveal key={ind.h} delay={i * STAGGER} className="flex-1">
              <div
                className="h-full grid grid-cols-[100px_1fr] sm:grid-cols-[132px_1fr] gap-4 sm:gap-5 items-center rounded-[14px] p-3.5 transition-[border-color,box-shadow,transform] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: t.surface,
                  border: `1px solid ${t.line}`,
                }}
              >
                <div className="relative self-stretch min-h-[120px]">
                  <div className="absolute inset-0">
                    <PhotoSlot tint={ind.tint} bg={ind.bg} variant="spotlight" rounded={10} style={{ height: "100%", aspectRatio: "auto" }}>
                      <span />
                    </PhotoSlot>
                  </div>
                </div>
                <div className="flex flex-col gap-1 pr-2 min-w-0">
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 23, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
                    {ind.h}
                  </div>
                  <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.4 }}>{ind.collect}</div>
                  <div
                    className="flex items-center mt-2.5 pt-3"
                    style={{ borderTop: `1px solid ${t.line}` }}
                  >
                    <span className="cursor-pointer underline underline-offset-4" style={{ fontSize: 13, color: t.inkSoft }}>See Use Case →</span>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
