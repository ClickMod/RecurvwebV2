"use client";

import { useEffect, useId, useRef } from "react";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

const PIPEDRIVE_FORM_URL =
  "https://webforms.pipedrive.com/f/63uaQh1b6qazIKOmhXcDFN1axcQQsDy6zxXNVibJcEfVDMFM67wm1C3IGuxlblWKVd";

const PIPEDRIVE_LOADER_SRC = "https://webforms.pipedrive.com/f/loader";

/** Pipedrive message types from their webforms loader */
const PD_MSG = {
  CONFIG: 2,
} as const;

const BULLET_POINTS = [
  "No slides, a live product demo against your billing pattern.",
  "Pricing on the call, not in a follow-up email.",
  "Talk to a specialist who's deployed Recurv in your industry.",
] as const;

/**
 * Pipedrive's loader only scans `.pipedriveWebForms` once on first script load.
 * That races with Next.js hydration and breaks on client navigations.
 * We embed the iframe ourselves (same URL shape as their loader) so the form
 * is present on first paint; the official loader stays for resize/redirect messages.
 */
function ensurePipedriveLoader() {
  if (document.querySelector(`script[src="${PIPEDRIVE_LOADER_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = PIPEDRIVE_LOADER_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function ContactFormSection() {
  const reactId = useId().replace(/:/g, "");
  const uuid = `pd${reactId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    ensurePipedriveLoader();

    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendConfig = () => {
      iframe.contentWindow?.postMessage(
        { type: PD_MSG.CONFIG, payload: { url: document.URL } },
        "*",
      );
    };

    if (iframe.contentDocument?.readyState === "complete") {
      sendConfig();
    }
    iframe.addEventListener("load", sendConfig);
    return () => iframe.removeEventListener("load", sendConfig);
  }, []);

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

          {/* Right panel — Pipedrive form */}
          <div className="p-8 md:p-12 lg:p-14">
            <div
              id={uuid}
              className="pipedriveWebForms relative w-full min-h-[520px] overflow-hidden"
              data-pd-webforms={PIPEDRIVE_FORM_URL}
            >
              <iframe
                ref={iframeRef}
                src={`${PIPEDRIVE_FORM_URL}?embeded=1&uuid=${uuid}`}
                title="Contact form"
                scrolling="no"
                className="block w-full max-w-[768px] border-0 min-h-[520px] h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
