import { PhotoSlot } from "@/components/PhotoSlot";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

const CERTS = [
  ["PCI DSS", "Level 1, the highest tier for payment data handling."],
  ["SARB", "Compliant collection rails, operated locally in South Africa."],
] as const;

export function SecuritySection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surfaceDeep, color: t.inkOnDeep }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <Reveal>
              <div className="mono mb-5" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>
                SECURITY & COMPLIANCE
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                margin: 0,
              }}>
                <span style={{ color: "#A89BF0" }}>PCI&nbsp;DSS Level&nbsp;1</span><br />
                compliant.
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <p className="mt-6" style={{ fontSize: 17, color: t.inkOnDeepSoft, lineHeight: 1.6 }}>
              Built with security, privacy and reliability at its core. 
              Recurv protects sensitive customer and payment data using industry best practices, including encryption, secure tokenisation and continuous monitoring, helping your organisation meet the highest standards of data security.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              {CERTS.map(([h, d], i) => (
                <Reveal key={h} delay={STAGGER * (i + 2)}>
                  <div className="pt-4" style={{ borderTop: "1px solid rgba(246,245,240,0.18)" }}>
                    <div className="mono" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>{h}</div>
                    <div className="mt-2" style={{ fontSize: 13, color: t.inkOnDeepSoft, lineHeight: 1.55 }}>{d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <PhotoSlot
              label="Security ops — server rack / lock close-up"
              caption="SECURE · ZA · 1200 × 900"
              tint={t.primary}
              bg="#08070F"
              ratio="4 / 3"
              rounded={12}
              variant="spotlight"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
