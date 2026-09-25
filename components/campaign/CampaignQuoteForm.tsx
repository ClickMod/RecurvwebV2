"use client";

import { useEffect, useId, useRef } from "react";
import {
  PIPEDRIVE_FORM_URL,
  PIPEDRIVE_LOADER_SRC,
  QUOTE_FORM_ID,
} from "@/components/campaign/constants";
import { useCampaign } from "@/components/campaign/CampaignProvider";
import { appendUtms } from "@/components/campaign/tracking";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { theme as t } from "@/components/theme";

function ensurePipedriveLoader() {
  if (document.querySelector(`script[src="${PIPEDRIVE_LOADER_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = PIPEDRIVE_LOADER_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function CampaignQuoteForm() {
  const { utms, bookDemoHref, fullDemoHref, track } = useCampaign();
  const reactId = useId().replace(/:/g, "");
  const uuid = `pd${reactId}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = appendUtms(`${PIPEDRIVE_FORM_URL}?embeded=1&uuid=${uuid}`, utms);

  useEffect(() => {
    ensurePipedriveLoader();
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendConfig = () => {
      iframe.contentWindow?.postMessage({ type: 2, payload: { url: document.URL } }, "*");
    };

    // Pipedrive's loader sets a height that clips the reCAPTCHA line.
    // Keep a small buffer on top of whatever height they write.
    const BUFFER = 72;
    let base = 0;
    const applyBuffer = (raw: number) => {
      base = raw;
      const height = `${Math.ceil(raw) + BUFFER}px`;
      iframe.style.setProperty("height", height, "important");
      if (iframe.parentElement) iframe.parentElement.style.minHeight = height;
    };
    const observer = new MutationObserver(() => {
      const current = parseFloat(iframe.style.height);
      if (!current) return;
      if (!base) {
        applyBuffer(current);
        return;
      }
      if (current === base) applyBuffer(base);
    });
    observer.observe(iframe, { attributes: true, attributeFilter: ["style"] });
    const existing = parseFloat(iframe.style.height);
    if (existing) applyBuffer(existing);

    const enforce = window.setInterval(() => {
      const current = iframe.offsetHeight;
      if (current > 0 && current < 760) {
        iframe.style.setProperty("height", "760px", "important");
        if (iframe.parentElement) iframe.parentElement.style.minHeight = "760px";
      }
    }, 250);

    iframe.addEventListener("load", sendConfig);
    return () => {
      window.clearInterval(enforce);
      observer.disconnect();
      iframe.removeEventListener("load", sendConfig);
    };
  }, [uuid]);

  return (
    <section id={QUOTE_FORM_ID} className="scroll-mt-24 py-12 md:py-16 lg:py-20" style={{ borderTop: `1px solid ${t.line}` }}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:items-start">
          <div>
            <div className="mono mb-5" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
              GET IN TOUCH
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-lg)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                margin: 0,
              }}
            >
              Talk to the{" "}
              <span style={{ color: t.primary }}>sales team.</span>
            </h2>
            <p className="mt-5" style={{ fontSize: 17, lineHeight: 1.6, color: t.inkSoft }}>
              Call us, or send the form and we&apos;ll come back with pricing for your collections.
            </p>
            <div className="mt-8">
              <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
                SALES TEAM
              </div>
              <a
                href="tel:+27615862591"
                className="mt-3 inline-block py-2"
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-h2-md)",
                  letterSpacing: "-0.03em",
                  color: t.ink,
                  textDecoration: "none",
                }}
              >
                +27 61 586 2591
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                variant="accent"
                size="lg"
                className="w-full justify-center sm:w-auto"
                href={bookDemoHref}
                onClick={() => track("book_demo_clicked")}
              >
                Book an online demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full justify-center sm:w-auto"
                href={fullDemoHref ?? undefined}
                onClick={fullDemoHref ? () => track("full_demo_clicked") : undefined}
                style={fullDemoHref ? undefined : { opacity: 0.45, pointerEvents: "none" }}
              >
                Explore Recurv yourself
              </Button>
            </div>
          </div>

          <div
            className="rounded-xl p-4 md:p-8"
            style={{ background: t.surface, border: `1px solid ${t.line}` }}
          >
            <div
              id={uuid}
              className="pipedriveWebForms relative w-full min-h-[640px]"
              data-pd-webforms={PIPEDRIVE_FORM_URL}
            >
              <iframe
                ref={iframeRef}
                src={src}
                title="Get in touch"
                scrolling="no"
                className="block w-full min-h-[640px] border-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
