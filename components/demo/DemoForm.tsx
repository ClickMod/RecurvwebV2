"use client";

import { useEffect, useId, useRef } from "react";
import { VIEW_DEMO_FORM_URL } from "@/lib/site-cta";

const PIPEDRIVE_LOADER_SRC = "https://webforms.pipedrive.com/f/loader";

/** Pipedrive webforms loader message: send the parent page URL into the iframe. */
const PD_CONFIG = 2;

function ensurePipedriveLoader() {
  if (document.querySelector(`script[src="${PIPEDRIVE_LOADER_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = PIPEDRIVE_LOADER_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function DemoForm() {
  const formId = `pd${useId().replace(/:/g, "")}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    ensurePipedriveLoader();
    const iframe = iframeRef.current;
    if (!iframe) return;

    const sendConfig = () => {
      iframe.contentWindow?.postMessage(
        { type: PD_CONFIG, payload: { url: document.URL } },
        "*",
      );
    };

    iframe.addEventListener("load", sendConfig);
    return () => iframe.removeEventListener("load", sendConfig);
  }, []);

  return (
    <div
      id={formId}
      className="pipedriveWebForms relative w-full min-h-[520px] overflow-hidden"
      data-pd-webforms={VIEW_DEMO_FORM_URL}
    >
      <iframe
        ref={iframeRef}
        src={`${VIEW_DEMO_FORM_URL}?embeded=1&uuid=${formId}`}
        title="View online demo"
        scrolling="no"
        className="block w-full border-0 min-h-[520px]"
      />
    </div>
  );
}
