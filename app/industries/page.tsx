import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { CallSection } from "@/components/sections/CallSection";
import { CtaSection } from "@/components/home/CtaSection";
import { STAGGER } from "@/components/motion";
import { theme as t } from "@/components/theme";

export const metadata = {
  title: "Industries — Recurv",
  description:
    "Recurv adapts to every recurring billing pattern — from school fees and rent to membership dues and medical payment plans.",
};

interface Industry {
  name: string;
  tagline: string;
  collect: string;
  href: string;
  /** Whether a dedicated use-case page exists */
  live: boolean;
  tint: string;
  bg: string;
  badge?: string;
}

const INDUSTRIES: Industry[] = [
  {
    name: "Schools & Education",
    tagline: "School fees shouldn't be chased.",
    collect: "Term fees, levies, aftercare & bursaries",
    href: "/industries/schools-and-education",
    live: true,
    tint: "#4A6E8A",
    bg: "#141E2E",
    badge: "USE CASE LIVE",
  },
  {
    name: "Property & Rentals",
    tagline: "Rent, on time, every month.",
    collect: "Monthly rent, deposits & levies",
    href: "/contactus",
    live: false,
    tint: "#6E4A2A",
    bg: "#241813",
  },
  {
    name: "Golf & Country Clubs",
    tagline: "Membership dues without the admin.",
    collect: "Membership dues & green fees",
    href: "/contactus",
    live: false,
    tint: "#3E6B47",
    bg: "#16241A",
  },
  {
    name: "Medical & Dental",
    tagline: "Payment plans that actually collect.",
    collect: "Patient payment plans & co-payments",
    href: "/contactus",
    live: false,
    tint: "#3D5C8A",
    bg: "#141E2E",
  },
  {
    name: "Sport Clubs & Unions",
    tagline: "Subs collected before the season starts.",
    collect: "Subs, term fees & event collections",
    href: "/contactus",
    live: false,
    tint: "#9A6B3E",
    bg: "#241A12",
  },
  {
    name: "Body Corporates & HOAs",
    tagline: "Levies on time, arrears resolved.",
    collect: "Monthly levies, special levies & maintenance",
    href: "/contactus",
    live: false,
    tint: "#5A3E8A",
    bg: "#1A1428",
  },
  {
    name: "Gyms & Fitness",
    tagline: "Monthly billing that never misses.",
    collect: "Monthly membership & class packages",
    href: "/contactus",
    live: false,
    tint: "#8A3E5A",
    bg: "#281420",
  },
  {
    name: "Professional Services",
    tagline: "Retainers collected without the chase.",
    collect: "Monthly retainers & instalment plans",
    href: "/contactus",
    live: false,
    tint: "#4A7A6E",
    bg: "#14201E",
  },
  {
    name: "Religious Organisations",
    tagline: "Tithes and donations, automated with care.",
    collect: "Tithes, pledges & recurring donations",
    href: "/contactus",
    live: false,
    tint: "#7A6E3E",
    bg: "#201E14",
  },
  {
    name: "Non-Profits & NPOs",
    tagline: "Donor billing that funds the mission.",
    collect: "Recurring donations & membership dues",
    href: "/contactus",
    live: false,
    tint: "#3E7A6E",
    bg: "#14201E",
  },
];

const FEATURED = INDUSTRIES[0];
const REST = INDUSTRIES.slice(1);

export default function IndustriesPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="pt-16 pb-14 md:pt-20 md:pb-18 lg:pt-24 lg:pb-20">
        <Container>
          <Reveal>
            <div
              className="mono mb-5"
              style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
            >
              INDUSTRIES
            </div>
            <h1
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 500,
                fontSize: "var(--fs-hero)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              Built for every
              <br />
              <span style={{ color: t.primary }}>billing pattern.</span>
            </h1>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p
              className="mt-7 max-w-[560px]"
              style={{ fontSize: 18, color: t.inkSoft, lineHeight: 1.6 }}
            >
              Membership dues, term fees, rent, retainers, payment plans —
              Recurv adapts to your billing cycle, not the other way around.
              Select your industry below to see exactly how it works.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 2}>
            <div
              className="mono mt-8 flex flex-wrap items-center gap-3"
              style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.2 }}
            >
              <span>R 30.6M COLLECTED / MONTH</span>
              <span style={{ color: t.lineStrong }}>·</span>
              <span>10 INDUSTRIES SERVED</span>
              <span style={{ color: t.lineStrong }}>·</span>
              <span>POPIA COMPLIANT</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Featured industry — Schools & Education ── */}
      <section
        className="py-0 pb-6"
        style={{ borderTop: `1px solid ${t.line}` }}
      >
        <Container>
          <Reveal className="mt-8">
            <Link href={FEATURED.href} style={{ textDecoration: "none" }}>
              <div
                className="relative rounded-2xl overflow-hidden min-h-[420px] md:min-h-[520px] transition-[transform,box-shadow] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0">
                  <PhotoSlot
                    tint={FEATURED.tint}
                    bg={FEATURED.bg}
                    variant="spotlight"
                    rounded={0}
                    style={{ height: "100%", aspectRatio: "auto" }}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,14,20,0.10) 0%, transparent 30%, rgba(15,14,20,0.55) 75%, rgba(15,14,20,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between">
                    <div
                      className="mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: 1.5,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      FEATURED INDUSTRY
                    </div>
                    <div
                      className="mono px-2 py-1 rounded"
                      style={{
                        fontSize: 10,
                        letterSpacing: 1.5,
                        background: "rgba(79,51,217,0.85)",
                        color: "#fff",
                      }}
                    >
                      {FEATURED.badge}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: t.fontDisplay,
                        fontSize: "var(--fs-h2-md)",
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        color: "#fff",
                      }}
                    >
                      {FEATURED.name}
                    </div>
                    <p
                      className="mt-3 mb-5 max-w-[480px]"
                      style={{
                        fontSize: 17,
                        color: "rgba(255,255,255,0.82)",
                        lineHeight: 1.5,
                      }}
                    >
                      {FEATURED.tagline}
                    </p>
                    <div
                      className="mono mb-6"
                      style={{
                        fontSize: 12,
                        letterSpacing: 1,
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {FEATURED.collect.toUpperCase()}
                    </div>
                    <div
                      className="flex items-center pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}
                    >
                      <span
                        className="underline underline-offset-4"
                        style={{ fontSize: 14, color: "rgba(255,255,255,0.9)" }}
                      >
                        View use case →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ── Industry grid ── */}
      <section
        className="py-10 md:py-14"
        style={{ borderTop: `1px solid ${t.line}` }}
      >
        <Container>
          <Reveal>
            <div
              className="mono mb-8"
              style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
            >
              ALL INDUSTRIES
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REST.map((ind, i) => (
              <Reveal key={ind.name} delay={i * STAGGER}>
                <Link href={ind.href} style={{ textDecoration: "none" }}>
                  <div
                    className="h-full rounded-[14px] overflow-hidden transition-[border-color,box-shadow,transform] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-sm"
                    style={{
                      border: `1px solid ${t.line}`,
                      background: t.surface,
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[160px] md:h-[180px]">
                      <PhotoSlot
                        tint={ind.tint}
                        bg={ind.bg}
                        variant="spotlight"
                        rounded={0}
                        style={{ height: "100%", aspectRatio: "auto" }}
                      />
                    </div>
                    {/* Copy */}
                    <div className="p-5">
                      <div
                        style={{
                          fontFamily: t.fontDisplay,
                          fontSize: 22,
                          fontWeight: 500,
                          letterSpacing: "-0.025em",
                          lineHeight: 1.1,
                          color: t.ink,
                        }}
                      >
                        {ind.name}
                      </div>
                      <div
                        className="mt-1.5"
                        style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.4 }}
                      >
                        {ind.collect}
                      </div>
                      <div
                        className="flex items-center justify-between mt-4 pt-4"
                        style={{ borderTop: `1px solid ${t.line}` }}
                      >
                        <span
                          className="underline underline-offset-4"
                          style={{ fontSize: 13, color: t.inkSoft }}
                        >
                          Book a demo →
                        </span>
                        <div
                          className="mono px-2 py-0.5 rounded"
                          style={{
                            fontSize: 9,
                            letterSpacing: 1.2,
                            background: t.surfaceAlt,
                            color: t.inkSoft,
                            border: `1px solid ${t.line}`,
                          }}
                        >
                          TALK TO SALES
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Don't see your industry? ── */}
      <section
        className="py-16 md:py-20 lg:py-24"
        style={{ borderTop: `1px solid ${t.line}`, background: t.surfaceAlt }}
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-[1fr_auto] lg:gap-20">
            <Reveal>
              <div
                className="mono mb-5"
                style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}
              >
                DON'T SEE YOUR INDUSTRY?
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
                Recurv&apos;s billing rails adapt to
                <br />
                <span style={{ color: t.primary }}>any recurring pattern.</span>
              </h2>
              <p
                className="mt-6 max-w-[520px]"
                style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6 }}
              >
                If your business collects money on a schedule — monthly,
                termly, annually, or on any other cycle — Recurv can automate
                it. Our sales team will walk you through exactly how the
                platform handles your specific billing model, live, in under 30
                minutes.
              </p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <div
                className="flex flex-col gap-4 p-6 rounded-2xl md:p-8"
                style={{
                  background: t.surface,
                  border: `1px solid ${t.line}`,
                  minWidth: 280,
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}
                >
                  GET IN TOUCH
                </div>
                <div
                  style={{
                    fontFamily: t.fontDisplay,
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    color: t.ink,
                  }}
                >
                  Book a 30-min
                  <br />
                  live demo
                </div>
                <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.5 }}>
                  Tell us your billing cycle and we&apos;ll show you exactly how
                  Recurv automates it — no obligation.
                </p>
                <div className="flex flex-col gap-3 mt-1">
                  <Button
                    href="/contactus"
                    variant="accent"
                    className="w-full justify-center"
                  >
                    Book a live demo
                  </Button>
                  <Button
                    href="/contactus"
                    variant="secondary"
                    icon={<span>→</span>}
                    className="w-full justify-center"
                  >
                    Talk to sales
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Call section ── */}
      <CallSection
        eyebrow="PREFER TO TALK?"
        headingBefore="Our team is"
        headingAccent="one call away."
        body="Speak to a Recurv specialist who knows your billing context. We'll walk you through the platform live and have your first collection running within a week."
        phoneLabel="SALES TEAM"
        primaryLabel="Call us now"
        secondaryLabel="WhatsApp us"
      />

      {/* ── Bottom CTA ── */}
      <CtaSection />
    </main>
  );
}
