/** Existing Recurv demo scheduler. Used when the CMS URL is empty. */
export const DEFAULT_BOOK_DEMO_URL =
  "https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv";

export const PIPEDRIVE_FORM_URL =
  "https://webforms.pipedrive.com/f/c5i7nMULYKlwDu9Mamc6pYlltXys3qC120m9OPqWnNaFs0hTUX7tLhHNEZ6MvWdIXx";

export const PIPEDRIVE_LOADER_SRC = "https://webforms.pipedrive.com/f/loader";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const QUOTE_FORM_ID = "campaign-quote";

/** Claims already published on recurv.tech. Do not add new ones here. */
export const TRUST_BADGES = ["PCI DSS L1", "ISO 27001", "SARB"] as const;

export const TRUST_POINTS = [
  ["PCI DSS", "Level 1, the highest tier for payment data handling."],
  ["SARB", "Compliant collection rails, operated locally in South Africa."],
] as const;
