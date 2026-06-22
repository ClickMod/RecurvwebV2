import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const WHAT_YOU_GET = [
  { label: "Sandbox keys", detail: "Same day" },
  { label: "Full API reference", detail: "Public docs" },
  { label: "Solutions engineer", detail: "On your build" },
];

export function ApiCtaSection() {
  return (
    <Section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surfaceDeep }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left: copy + CTAs */}
          <div>
            <div
              className="mono mb-5"
              style={{ fontSize: 11, color: "rgba(246,245,240,0.5)", letterSpacing: 1.5 }}
            >
              GET API ACCESS
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: t.inkOnDeep,
                margin: 0,
              }}
            >
              Ready to{" "}
              <span style={{ color: t.primary }}>build?</span>
            </h2>
            <p
              className="mt-6 max-w-[480px]"
              style={{ fontSize: 16, color: t.inkOnDeepSoft, lineHeight: 1.65 }}
            >
              API access is granted per account. Tell us what you're integrating
              and we'll issue sandbox keys, share the full reference, and put a
              solutions engineer on your build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contactus" style={{ textDecoration: "none" }}>
                <Button size="lg" variant="accent">
                  Request API access →
                </Button>
              </Link>
              <Link href="/contactus" style={{ textDecoration: "none" }}>
                <Button
                  size="lg"
                  variant="secondary"
                  style={{
                    color: t.inkOnDeep,
                    borderColor: "rgba(246,245,240,0.25)",
                  }}
                >
                  Talk to our team
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: what you get list */}
          <div>
            <div
              className="mono mb-6"
              style={{ fontSize: 11, color: "rgba(246,245,240,0.4)", letterSpacing: 1.5 }}
            >
              WHAT YOU GET
            </div>
            <div className="flex flex-col">
              {WHAT_YOU_GET.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-5"
                  style={{
                    borderTop: `1px solid rgba(246,245,240,0.10)`,
                    borderBottom:
                      i === WHAT_YOU_GET.length - 1
                        ? `1px solid rgba(246,245,240,0.10)`
                        : undefined,
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 450,
                      color: t.inkOnDeep,
                      fontFamily: t.fontDisplay,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 12, color: "rgba(246,245,240,0.4)", letterSpacing: 0.5 }}
                  >
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
