"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const ACCENT = "#A89BF0";

export interface CallSectionProps {
  /** Small mono eyebrow, e.g. "STILL WONDERING?" or "TALK TO A SCHOOLS SPECIALIST" */
  eyebrow?: string;
  /** Heading text before the accent phrase */
  headingBefore?: string;
  /** Accent phrase rendered in the light-purple on-deep colour */
  headingAccent?: string;
  /** Body paragraph below the heading */
  body?: string;
  /** Label above the phone number, e.g. "DIRECT LINE" or "SCHOOLS TEAM" */
  phoneLabel?: string;
  /** Display phone number, e.g. "+27 61 586 2591" */
  phone?: string;
  /** Tel href, e.g. "+27615862591" — digits only, no spaces */
  phoneTel?: string;
  /** WhatsApp number for wa.me link, e.g. "27615862591" */
  whatsapp?: string;
  /** Optional second-line note below the phone, e.g. "Or WhatsApp ..." — defaults to auto-generated from whatsapp prop */
  phoneNote?: string;
  /** Primary button label, defaults to "Call now" */
  primaryLabel?: string;
  /** Secondary button label, defaults to "Open WhatsApp" */
  secondaryLabel?: string;
}

const DEFAULTS: Required<CallSectionProps> = {
  eyebrow: "STILL WONDERING?",
  headingBefore: "Prefer to",
  headingAccent: "just call?",
  body: "Pick up the phone. A specialist will answer within three rings, between 08:00 and 17:00. No menu trees, no transfers, pure human support.",
  phoneLabel: "DIRECT LINE",
  phone: "+27 61 586 2591",
  phoneTel: "27615862591",
  whatsapp: "27615862591",
  phoneNote: "",
  primaryLabel: "Call now",
  secondaryLabel: "Open WhatsApp",
};

export function CallSection(props: CallSectionProps) {
  const p: Required<CallSectionProps> = { ...DEFAULTS, ...props };

  const whatsappHref = `https://wa.me/${p.whatsapp}`;
  const telHref = `tel:+${p.phoneTel}`;

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surfaceDeep, color: t.inkOnDeep }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-20">

          {/* Left */}
          <div>
            <div
              className="mono mb-5"
              style={{ fontSize: 11, color: ACCENT, letterSpacing: 1.5 }}
            >
              {p.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-hero)",
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                margin: 0,
              }}
            >
              {p.headingBefore}{" "}
              <span style={{ color: ACCENT }}>{p.headingAccent}</span>
            </h2>
            <p
              className="mt-6 max-w-[440px]"
              style={{ fontSize: 17, color: t.inkOnDeepSoft, lineHeight: 1.6 }}
            >
              {p.body}
            </p>
          </div>

          {/* Right */}
          <div>
            <div
              className="mono mb-4"
              style={{ fontSize: 11, color: ACCENT, letterSpacing: 1.5 }}
            >
              {p.phoneLabel}
            </div>
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: t.inkOnDeep,
              }}
            >
              {p.phone}
            </div>
            {/* Note line — use explicit prop if set, otherwise auto-generate from whatsapp */}
            {(p.phoneNote || p.whatsapp) && (
              <div className="mt-3" style={{ fontSize: 13, color: t.inkOnDeepSoft }}>
                {p.phoneNote ? (
                  p.phoneNote
                ) : (
                  <>
                    Or WhatsApp{" "}
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: t.inkOnDeep, fontWeight: 600, textDecoration: "none" }}
                    >
                      {p.phone}
                    </a>
                  </>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a href={telHref} className="w-full sm:w-auto" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  className="w-full sm:w-auto justify-center"
                  style={{ background: t.inkOnDeep, color: t.surfaceDeep, border: "none" }}
                >
                  {p.primaryLabel}
                </Button>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="secondary"
                  icon={<span>→</span>}
                  className="w-full sm:w-auto justify-center"
                  style={{ borderColor: "rgba(246,245,240,0.25)", color: t.inkOnDeep }}
                >
                  {p.secondaryLabel}
                </Button>
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
