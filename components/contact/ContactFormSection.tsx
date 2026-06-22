"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 16,
  padding: "14px 16px",
  background: "var(--surface)",
  borderRadius: 8,
  color: "var(--ink)",
  width: "100%",
  boxSizing: "border-box",
};

const inputClass = "border border-[var(--line)] focus:border-[var(--primary)] outline-none transition-colors duration-150";

const BULLET_POINTS = [
  "No slides — a live product demo against your billing pattern.",
  "Pricing on the call, not in a follow-up email.",
  "Talk to a specialist who's deployed Recurv in your industry.",
] as const;

export function ContactFormSection() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div
          className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.35fr]"
          style={{
            background: t.surface,
            border: `1px solid ${t.line}`,
          }}
        >
          {/* Left panel */}
          <div
            className="flex flex-col gap-8 p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r"
            style={{
              background: t.surfaceAlt,
              borderColor: t.line,
            }}
          >
            <div>
              <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>GET A DEMO</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: "var(--fs-h2-md)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
                Tell us about your collections.
              </div>
              <p className="mt-4" style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>
                A 25-minute walkthrough with a recurring-revenue specialist.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {BULLET_POINTS.map((line) => (
                <div key={line} className="grid grid-cols-[20px_1fr] gap-3.5 items-start">
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: 999,
                    border: `2px solid ${t.primary}`,
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ width: 6, height: 6, background: t.primary, borderRadius: 999, display: "block" }} />
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: t.ink }}>{line}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — form */}
          <div className="p-8 md:p-12 lg:p-14">
            <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>FULL NAME</span>
                <input className={inputClass} style={inputStyle} name="fullName" type="text" placeholder="Thandi Ngwenya" required />
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>WORK EMAIL</span>
                <input className={inputClass} style={inputStyle} name="email" type="email" placeholder="thandi@company.co.za" required />
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>COMPANY</span>
                <input className={inputClass} style={inputStyle} name="company" type="text" placeholder="Royal Cape Town Golf Club" required />
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono flex justify-between" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>
                  <span>PHONE</span>
                  <span style={{ opacity: 0.7 }}>OPTIONAL</span>
                </span>
                <input className={inputClass} style={inputStyle} name="phone" type="tel" placeholder="+27 82 514 0908" />
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>INDUSTRY</span>
                <select className={inputClass} name="industry" style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} required>
                  <option value="">Select your industry</option>
                  <option>Golf &amp; sport clubs</option>
                  <option>Medical &amp; dental</option>
                  <option>Property &amp; rentals</option>
                  <option>Subscriptions</option>
                  <option>Payment plans</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>MONTHLY COLLECTIONS VOLUME</span>
                <select className={inputClass} name="volume" style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} required>
                  <option value="">Select volume</option>
                  <option>Under R 100K / month</option>
                  <option>R 100K – R 500K / month</option>
                  <option>R 500K – R 1M / month</option>
                  <option>R 1M – R 5M / month</option>
                  <option>R 5M+ / month</option>
                </select>
              </label>

              <label className="sm:col-span-2 flex flex-col gap-2">
                <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>WHAT WOULD YOU LIKE TO DISCUSS?</span>
                <textarea
                  className={inputClass}
                  name="message"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                  placeholder="Tell us about your current collection setup and what's not working..."
                  required
                />
              </label>

              <div
                className="sm:col-span-2 mt-2 pt-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center"
                style={{ borderTop: `1px solid ${t.line}` }}
              >
                <label className="flex items-center gap-3 cursor-pointer max-w-[420px]" style={{ fontSize: 13, color: t.inkSoft }}>
                  <div
                    onClick={() => setAgreed(!agreed)}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: `1.5px solid ${agreed ? t.primary : t.lineStrong}`,
                      background: agreed ? t.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                  >
                    {agreed && (
                      <svg width="11" height="11" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span>
                    I agree to Recurv&rsquo;s{" "}
                    <span style={{ color: t.ink, fontWeight: 500, borderBottom: `1px solid ${t.ink}` }}>privacy policy</span>.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="secondary" type="reset" className="w-full sm:w-auto justify-center">Clear form</Button>
                  <Button size="lg" variant="accent" icon={<span>→</span>} type="submit" className="w-full sm:w-auto justify-center">Submit form</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
