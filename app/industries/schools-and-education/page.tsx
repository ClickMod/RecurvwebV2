import { IndustryHeroSection } from "@/components/industries/IndustryHeroSection";
import { IndustryTrustedBySection } from "@/components/industries/IndustryTrustedBySection";
import { IndustryProblemsSection } from "@/components/industries/IndustryProblemsSection";
import { IndustrySolutionSection } from "@/components/industries/IndustrySolutionSection";
import { IndustryDashboardSection } from "@/components/industries/IndustryDashboardSection";
import { IndustryOnboardingSection } from "@/components/industries/IndustryOnboardingSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CallSection } from "@/components/sections/CallSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = {
  title: "Schools & Education — Recurv",
  description:
    "Recurv collects every school fee, on schedule, automatically — so the school is funded and no parent gets a phone call.",
};

export default function SchoolsAndEducationPage() {
  return (
    <main>
      <IndustryHeroSection
        industryName="Schools & Education"
        headingBefore={["School fees", "shouldn\u2019t be"]}
        headingAccent="chased."
        body={
          <>
            Term-based billing, parents in arrears, debit orders that bounce the
            week salaries are due, sibling discounts and bursaries reconciled by
            hand — fee collection is the quiet crisis in every bursar&apos;s
            office.{" "}
            <strong>
              Recurv collects every fee, on schedule, automatically
            </strong>{" "}
            — so the school is funded and no parent gets a phone call.
          </>
        }
        primaryCta={{ label: "Book a live demo", href: "/contactus" }}
        secondaryCta={{ label: "Talk to our schools team", href: "/contactus" }}
        stats={[
          { label: "12G+ SCHOOLS LIVE" },
          { label: "180 000 PUPILS BILLED" },
          { label: "POPIA COMPLIANT" },
        ]}
        image={{
          label: "Editorial photo — pupils crossing the quad, morning light",
          caption: "HERC · SCHOOLS · 1200 × 1500",
        }}
      />
      <IndustryTrustedBySection
        names={[
          "Bishops Diocesan",
          "St Mary\u2019s DSG",
          "Pretoria Boys High",
          "Reddam House",
          "Curro Group",
          "Herschel",
        ]}
      />
      <IndustryProblemsSection
        eyebrow="WHERE SCHOOL BILLING BREAKS"
        headingBefore="Four problems every bursar"
        headingAccent="knows by name."
        intro="Fee collection isn't one job — it's a dozen exceptions running at once. Each one costs the finance office hours it doesn't have, and the school cash flow it can't spare. Here's what actually goes wrong, and exactly how Recurv takes it off the bursar's desk."
        problems={[
          {
            icon: "schedule",
            heading: "Income arrives in lumps, salaries don't.",
            description:
              "Term and annual fees land in two-week windows. The other ten months, cash flow is tight while salaries, suppliers and bond repayments run on a monthly clock.",
            fix: "Recurv spreads fees into smooth monthly debit orders — parents choose a plan, the school gets predictable income every single month.",
          },
          {
            icon: "people",
            heading: "Parents fall into arrears, quietly.",
            description:
              "One bounced order becomes three months behind before anyone notices. Chasing it means awkward calls that strain the parent relationship the school works to protect.",
            fix: "Intelligent retries recover most failures automatically. Branded reminders go out before a balance grows — the bursar only steps in as a last resort.",
          },
          {
            icon: "split",
            heading: "Discounts and bursaries are done by hand.",
            description:
              "Sibling discounts, staff remissions, partial bursaries, scholarship top-ups — every exception is a manual calculation re-applied to every invoice, every term.",
            fix: "Set each rule once. Recurv applies sibling discounts, bursary splits and part-paid balances to every future invoice automatically — no spreadsheet maths.",
          },
          {
            icon: "reconcile",
            heading: "Reconciling EFTs eats the finance office.",
            description:
              "Parents pay by EFT with no reference, wrong reference, or a lump sum across three children. Matching payments to pupils swallows days each month.",
            fix: "Every collection is pre-matched to the pupil and fee line. Recurv reconciles to your accounting system automatically — no detective work, no mystery deposits.",
          },
        ]}
      />
      <IndustrySolutionSection
        headingBefore="Every fee a school charges,"
        headingAccent="on one rail."
        intro="Tuition, registration, aftercare, transport, boarding, sports and cultural levies, exam and device fees — each on its own schedule, all in one ledger. The finance office stops juggling spreadsheets and starts reading a single, reconciled view."
        features={[
          {
            icon: "mandate",
            heading: "Paperless parent onboarding",
            description:
              "Parents authorise their debit order in under 60 seconds on any device. No paper forms returned via the school bag, no manual capture.",
          },
          {
            icon: "schedule",
            heading: "Termly, annual or monthly",
            description:
              "Offer parents the plan that suits them — annual upfront with a discount, per-term, or smoothed monthly — all billed from one place.",
          },
          {
            icon: "wallet",
            heading: "Levies & ad-hoc charges",
            description:
              "Aftercare, transport routes, tours, exam fees, devices, sports kit — bill them once and collect them on the same trusted rail.",
          },
          {
            icon: "split",
            heading: "Discounts & bursaries built in",
            description:
              "Sibling discounts, staff remissions, partial bursaries and scholarships applied automatically to every relevant invoice.",
          },
          {
            icon: "graph",
            heading: "Governing-body reporting",
            description:
              "Reconciled fee income by grade and category, live arrears, and collection rates — the numbers the SGB and auditors actually ask for.",
          },
        ]}
      />
      <IndustryDashboardSection
        eyebrow="BURSAR'S DASHBOARD"
        headingBefore="Every pupil, every fee,"
        headingAccent="reconciled by morning."
        body="Built for the finance office, not a corporate treasury team. Track fee income, arrears and ad-hoc levies across grades and campuses without ever opening a spreadsheet."
        bullets={[
          {
            heading: "Live fee & arrears tracking",
            description:
              "See which families are paid up, behind, or lapsing — by grade, campus, or fee category, in real time.",
          },
          {
            heading: "Arrears surfaced before they grow",
            description:
              "Families behind on fees are flagged automatically, with branded reminders running before the next governing-body meeting, not after.",
          },
          {
            heading: "Synced to your school system",
            description:
              "Paid-up status syncs to your school management system (d6, ADAM, SACEE) so admin always reflects who has actually paid.",
          },
        ]}
        ctaLabel="See the bursar dashboard"
        ctaHref="/contactus"
      />
      <IndustryOnboardingSection
        eyebrow="FROM ENROLMENT TO COLLECTION"
        headingBefore="Onboard a family in 60 seconds."
        headingAccent="Fund the year automatically."
        ctaLabel="See a live onboarding"
        ctaHref="/contactus"
        steps={[
          {
            heading: "Send the enrolment link",
            description:
              "Email, SMS or QR from the admissions office. Branded, signed, ready for any device.",
          },
          {
            heading: "Parent completes",
            description:
              "Banking details, fee plan, pupils and any sibling links — captured in one flow.",
          },
          {
            heading: "Plan activates",
            description:
              "Tuition, levies and aftercare scheduled automatically, with discounts already applied.",
          },
          {
            heading: "Recurv collects",
            description:
              "Bank-grade rails, intelligent retries, reconciled to your school accounts.",
          },
        ]}
      />
      <CallSection
        eyebrow="TALK TO A SCHOOLS SPECIALIST"
        headingBefore="Ready to clear the"
        headingAccent="bursar's desk?"
        body="Speak to someone who has set up fee collection for schools just like yours. We'll walk you through the onboarding, show you the dashboard live, and have your first collection running within a week."
        phoneLabel="SCHOOLS TEAM"
        primaryLabel="Call us now"
        secondaryLabel="WhatsApp us"
      />
      <FaqSection
        eyebrow="SCHOOL FEES · FAQ"
        headingBefore="Questions bursars"
        headingAccent="actually ask us."
        subtext="Anything else? Drop us a line or call the schools team directly — we'll come back within one business day."
        items={[
          {
            q: "Can parents choose their own payment plan?",
            a: "Yes. During onboarding, parents select annual upfront, per-term, or smoothed monthly billing. The school sets which options are available and Recurv enforces the schedule automatically.",
          },
          {
            q: "How does Recurv handle sibling discounts and bursaries?",
            a: "Discount and bursary rules are configured once in the platform. Recurv applies them to every relevant invoice automatically — no manual recalculation each term.",
          },
          {
            q: "What happens when a debit order bounces?",
            a: "Recurv retries the collection at an intelligent time based on the parent's payment behaviour. Branded reminder messages go out before a balance compounds, and the bursar is only flagged when manual intervention is genuinely needed.",
          },
          {
            q: "Which school management systems does Recurv integrate with?",
            a: "Recurv integrates with d6, ADAM, and SACEE for paid-up status sync, and exports reconciliation files compatible with Sage, Pastel, and Xero.",
          },
          {
            q: "Is Recurv POPIA compliant?",
            a: "Yes. All personal and banking data is stored in South Africa on ISO 27001-aligned infrastructure. Banking details are tokenised on capture and never stored in plaintext.",
          },
          {
            q: "How long does it take to go live?",
            a: "Most schools complete the setup and first parent onboarding within five business days. Your dedicated onboarding specialist handles configuration and trains your finance office before go-live.",
          },
        ]}
      />
      <BlogSection
        eyebrow="SCHOOLS · FROM THE BLOG"
        headingBefore="What bursars are"
        headingAccent="reading right now."
        body="Practical guides on fee collection, arrears management, and school billing — written for the people who run the finance office."
        industries={["Schools"]}
        ctaLabel="All schools articles"
      />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
