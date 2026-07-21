import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllIndustriesForListing, strapiImageUrl } from "@/lib/strapi";
import { SITE_URL } from "@/lib/site";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { STAGGER } from "@/components/motion";
import { Button } from "@/components/Button";
import { PhotoSlot } from "@/components/PhotoSlot";
import { CallSection } from "@/components/sections/CallSection";
import { CtaSection } from "@/components/home/CtaSection";
import { theme as t } from "@/components/theme";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Recurv adapts to every recurring billing pattern, from school fees and rent to membership dues and medical payment plans.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const industries = await getAllIndustriesForListing().catch(() => []);

  const featured = industries.find((i) => i.isFeatured) ?? industries[0];
  const rest = industries.filter((i) => i !== featured);

  // JSON-LD: ItemList so search engines can understand this as a navigable
  // list of distinct industry pages, improving crawlability and rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries served by Recurv",
    description:
      "Recurring billing automation for every industry — schools, property, clubs, medical, and more.",
    url: `${SITE_URL}/industries`,
    numberOfItems: industries.length,
    itemListElement: industries.map((ind, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: ind.industryName,
      url: `${SITE_URL}/industries/${ind.slug}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              Membership dues, term fees, rent, retainers, payment plans.
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
              <span>{industries.length} INDUSTRIES SERVED</span>
              <span style={{ color: t.lineStrong }}>·</span>
              <span>SARB COMPLIANT</span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Featured industry card ── */}
      {featured && (
        <section
          className="py-0 pb-6"
          style={{ borderTop: `1px solid ${t.line}` }}
        >
          <Container>
            <Reveal className="mt-8">
              <Link
                href={`/industries/${featured.slug}`}
                className="relative block min-h-[420px] rounded-2xl transition-transform duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:min-h-[520px]"
                style={{ textDecoration: "none" }}
              >
                {featured.cardImage ? (
                  <Image
                    src={strapiImageUrl(featured.cardImage.url)!}
                    alt={featured.cardImage.alternativeText || featured.industryName}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority
                  />
                ) : (
                  <PhotoSlot
                    tint="#4A6E8A"
                    bg="#141E2E"
                    variant="spotlight"
                    rounded={16}
                    style={{ height: "100%", aspectRatio: "auto" }}
                  />
                )}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,14,20,0.10) 0%, transparent 30%, rgba(15,14,20,0.55) 75%, rgba(15,14,20,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 md:p-10">
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
                      USE CASE LIVE
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
                      {featured.industryName}
                    </div>
                    {featured.cardTagline && (
                      <p
                        className="mt-3 mb-5 max-w-[480px]"
                        style={{
                          fontSize: 17,
                          color: "rgba(255,255,255,0.82)",
                          lineHeight: 1.5,
                        }}
                      >
                        {featured.cardTagline}
                      </p>
                    )}
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
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── Industry grid ── */}
      {rest.length > 0 && (
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
              {rest.map((ind, i) => (
                <Reveal key={ind.slug} delay={i * STAGGER}>
                  <Link href={`/industries/${ind.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      className="h-full rounded-[14px] overflow-hidden transition-[border-color,box-shadow,transform] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-sm"
                      style={{
                        border: `1px solid ${t.line}`,
                        background: t.surface,
                      }}
                    >
                      {/* Card image */}
                      <div className="relative h-[160px] md:h-[180px]">
                        {ind.cardImage ? (
                          <Image
                            src={strapiImageUrl(ind.cardImage.url)!}
                            alt={ind.cardImage.alternativeText || ind.industryName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <PhotoSlot
                            tint="#4A6E8A"
                            bg="#141E2E"
                            variant="spotlight"
                            rounded={0}
                            style={{ height: "100%", aspectRatio: "auto" }}
                          />
                        )}
                      </div>
                      {/* Card copy */}
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
                          {ind.industryName}
                        </div>
                        {ind.cardTagline && (
                          <div
                            className="mt-1.5"
                            style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.4 }}
                          >
                            {ind.cardTagline}
                          </div>
                        )}
                        <div
                          className="flex items-center justify-between mt-4 pt-4"
                          style={{ borderTop: `1px solid ${t.line}` }}
                        >
                          <span
                            className="underline underline-offset-4"
                            style={{ fontSize: 13, color: t.inkSoft }}
                          >
                            View use case →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

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
                DON&apos;T SEE YOUR INDUSTRY?
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
                If your business collects money on a schedule, monthly,
                termly, annually or on any other cycle, Recurv can automate
                it. Our sales team will walk you through exactly how the
                platform handles your specific billing model, live in under 30
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
                  Recurv automates it,no obligation.
                </p>
                <div className="flex flex-col gap-3 mt-1">
                  <Button
                    href="https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv"
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
        body="Speak to a Recurv specialist who knows your billing context. We'll walk you through the platform live and have your first collection running within a day."
        phoneLabel="SALES TEAM"
        primaryLabel="Call us now"
        secondaryLabel="WhatsApp us"
      />

      {/* ── Bottom CTA ── */}
      <CtaSection />
    </main>
  );
}
