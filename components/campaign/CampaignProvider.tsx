"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_BOOK_DEMO_URL,
  QUOTE_FORM_ID,
  type UtmParams,
} from "@/components/campaign/constants";
import { appendUtms, readAndStoreUtms, trackCampaignEvent } from "@/components/campaign/tracking";

interface CampaignContextValue {
  quoteOpen: boolean;
  openQuote: () => void;
  bookDemoHref: string;
  fullDemoHref: string | null;
  utms: UtmParams;
  track: (name: string) => void;
}

const CampaignContext = createContext<CampaignContextValue | null>(null);

export function CampaignProvider({
  bookDemoUrl,
  fullDemoUrl,
  children,
}: {
  bookDemoUrl?: string | null;
  fullDemoUrl?: string | null;
  children: React.ReactNode;
}) {
  const [utms, setUtms] = useState<UtmParams>({});
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const stored = readAndStoreUtms();
    setUtms(stored);
    trackCampaignEvent("landing_page_view", stored);
  }, []);

  const track = useCallback(
    (name: string) => {
      trackCampaignEvent(name, utms);
    },
    [utms],
  );

  const openQuote = useCallback(() => {
    trackCampaignEvent("request_quote_clicked", utms);
    setQuoteOpen(true);
    requestAnimationFrame(() => {
      document.getElementById(QUOTE_FORM_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [utms]);

  const value = useMemo<CampaignContextValue>(() => {
    const demo = (bookDemoUrl || DEFAULT_BOOK_DEMO_URL).trim();
    const full = fullDemoUrl?.trim() || "";
    return {
      quoteOpen,
      openQuote,
      bookDemoHref: appendUtms(demo, utms),
      fullDemoHref: full ? appendUtms(full, utms) : null,
      utms,
      track,
    };
  }, [bookDemoUrl, fullDemoUrl, openQuote, quoteOpen, track, utms]);

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const value = useContext(CampaignContext);
  if (!value) throw new Error("useCampaign must be used within CampaignProvider");
  return value;
}
