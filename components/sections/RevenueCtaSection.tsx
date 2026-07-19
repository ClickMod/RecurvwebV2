import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { theme as t } from "@/components/theme";

const DEMO_URL =
  "https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv";

export interface RevenueCtaSectionProps {
  eyebrow?: string;
  headingBefore?: string;
  headingAccent?: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

const DEFAULTS: Required<RevenueCtaSectionProps> = {
  eyebrow: "REVENUE COLLECTION",
  headingBefore: "The leading platform for",
  headingAccent: "revenue collections.",
  body: "Bring every revenue stream together in one platform. Whether you collect subscriptions, instalments, invoices, memberships, levies, rent or ad hoc charges, Recurv centralises your collections, automates reconciliation and gives your team complete visibility over every billing cycle. Discover how Recurv can simplify the way your organisation collects revenue.",
  primaryLabel: "Book a live demo",
  secondaryLabel: "Contact sales",
};

export function RevenueCtaSection(props: RevenueCtaSectionProps = {}) {
  const p: Required<RevenueCtaSectionProps> = { ...DEFAULTS, ...props };

  return (
    <Section
      className="py-16 md:py-20 lg:py-24"
      style={{ background: t.surfaceAlt, borderTop: `1px solid ${t.line}` }}
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <div
              className="mono mb-5"
              style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
            >
              {p.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-h2-xl)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                margin: 0,
                color: t.ink,
              }}
            >
              {p.headingBefore}
              <br />
              <span style={{ color: t.primary }}>{p.headingAccent}</span>
            </h2>
            <p
              className="mt-6 max-w-[540px]"
              style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6 }}
            >
              {p.body}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full justify-center" href={DEMO_URL}>
              {p.primaryLabel}
            </Button>
            <Link href="/contactus" className="w-full" style={{ textDecoration: "none" }}>
              <Button
                size="lg"
                variant="secondary"
                icon={<span>→</span>}
                className="w-full justify-center"
              >
                {p.secondaryLabel}
              </Button>
            </Link>
            <div className="mt-3" style={{ fontSize: 13, color: t.inkSoft }}>
              Or email{" "}
              <span style={{ color: t.ink, fontWeight: 600 }}>sales@recurv.tech</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
