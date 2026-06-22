"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

export function ContactCallSection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surfaceDeep, color: t.inkOnDeep }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

          {/* Left */}
          <div>
            <div className="mono mb-5" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>
              STILL WONDERING?
            </div>
            <h2 style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-hero)",
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
              margin: 0,
            }}>
              Prefer to <span style={{ color: "#A89BF0" }}>just call?</span>
            </h2>
            <p className="mt-6 max-w-[440px]" style={{ fontSize: 17, color: t.inkOnDeepSoft, lineHeight: 1.6 }}>
              Pick up the phone. A specialist will answer within three rings,
              between 08:00 and 18:00 SAST — no menu trees, no transfers.
            </p>
          </div>

          {/* Right */}
          <div>
            <div className="mono mb-4" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>
              DIRECT LINE
            </div>
            <div style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-xl)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: t.inkOnDeep,
            }}>
              +27 21 200 4188
            </div>
            <div className="mt-3" style={{ fontSize: 13, color: t.inkOnDeepSoft }}>
              Or WhatsApp{" "}
              <a
                href="https://wa.me/27821004188"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: t.inkOnDeep, fontWeight: 600, textDecoration: "none" }}
              >
                +27 82 100 4188
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="tel:+27212004188" style={{ textDecoration: "none" }}>
                <Button variant="primary" style={{ background: t.inkOnDeep, color: t.surfaceDeep, border: "none" }}>
                  Call now
                </Button>
              </a>
              <a href="https://wa.me/27821004188" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Button variant="secondary" icon={<span>→</span>} style={{ borderColor: "rgba(246,245,240,0.25)", color: t.inkOnDeep }}>
                  Open WhatsApp
                </Button>
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
