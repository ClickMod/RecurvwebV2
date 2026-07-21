import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getIndustryBySlug,
  getAllIndustrySlugs,
  getBlogPostsForIndustry,
  segmentsToProps,
  strapiImageUrl,
} from "@/lib/strapi";
import { toSentenceCase } from "@/lib/text-format";
import { buildBreadcrumbListJsonLd, buildFaqPageJsonLd, getShareImageUrl, sanitizeTitle } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { iconSize } from "@/components/theme";
import { RichText } from "@/components/RichText";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { IndustryHeroSection } from "@/components/industries/IndustryHeroSection";
import { IndustryTrustedBySection } from "@/components/industries/IndustryTrustedBySection";
import { IndustryProblemsSection } from "@/components/industries/IndustryProblemsSection";
import { IndustrySolutionSection } from "@/components/industries/IndustrySolutionSection";
import { IndustryDashboardSection } from "@/components/industries/IndustryDashboardSection";
import { IndustryOnboardingSection } from "@/components/industries/IndustryOnboardingSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CallSection } from "@/components/sections/CallSection";
import { FaqSection } from "@/components/sections/FaqSection";

/**
 * Allow slugs that weren't pre-built to be rendered on first request (ISR).
 * A new industry created in Strapi appears on the frontend immediately after
 * the first visitor hits its URL — no redeploy needed.
 */
export const dynamicParams = true;

/**
 * Ensures a URL has a protocol so next/link doesn't treat bare domains
 * (e.g. "www.example.com") as relative paths.
 * Leaves relative paths (/...), anchors (#...), and mailto:/tel: untouched.
 */
function normalizeUrl(url: string | null | undefined, fallback = "/contactus"): string {
  if (!url) return fallback;
  if (
    url.startsWith("/") ||
    url.startsWith("#") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url;
  }
  return `https://${url}`;
}

// No explicit `export const revalidate` — uses tag-based on-demand ISR via
// the Strapi webhook at POST /api/revalidate, consistent with the blog route.

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllIndustrySlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const industry = await getIndustryBySlug(slug);
    if (!industry) return {};

    const seo = industry.seo;
    const title = sanitizeTitle(seo?.metaTitle ?? industry.industryName);
    const description =
      seo?.metaDescription ??
      (typeof industry.heroIntro === "string"
        ? industry.heroIntro.slice(0, 160)
        : Array.isArray(industry.heroIntro)
        ? industry.heroIntro
            .filter((b) => b.type === "paragraph")
            .slice(0, 1)
            .flatMap((b) => ("children" in b ? b.children : []))
            .map((c) => ("text" in c ? c.text : ""))
            .join("")
        : undefined) ??
      undefined;

    // Strapi metaSocial uses "Facebook" for Open Graph (plugin enum).
    const facebook = seo?.metaSocial?.find((s) => s.socialNetwork === "Facebook");
    const twitter = seo?.metaSocial?.find((s) => s.socialNetwork === "Twitter");

    const shareImage = getShareImageUrl({
      seo,
      heroImage: industry.heroImage,
      cardImage: industry.cardImage,
    });

    return {
      title,
      description: description || undefined,
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: facebook?.title ?? title,
        description: facebook?.description ?? description ?? undefined,
        images: [{ url: shareImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: twitter?.title ?? title,
        description: twitter?.description ?? description ?? undefined,
        images: [shareImage],
      },
    };
  } catch {
    return {};
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const [industry, blogPosts] = await Promise.all([
    getIndustryBySlug(slug),
    getBlogPostsForIndustry(slug).catch(() => []),
  ]);

  if (!industry) notFound();

  // ── Heading adapters ────────────────────────────────────────────────────────
  const heroHeading = segmentsToProps(industry.heroHeadline);
  const problemsHeading = segmentsToProps(industry.problemsHeading);
  const featuresHeading = segmentsToProps(industry.featuresHeading);
  const dashboardHeading = segmentsToProps(industry.dashboardHeading);
  const onboardingHeading = segmentsToProps(industry.onboardingHeading);
  const contactHeading = segmentsToProps(industry.contactHeading);
  const faqHeading = segmentsToProps(industry.faqHeading);

  // ── Trusted-by names ────────────────────────────────────────────────────────
  const trustedNames = industry.trustedNames
    ? industry.trustedNames
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean)
    : [];

  const faqItems =
    industry.faqItems?.map((f) => ({
      q: f.question,
      a: f.answer,
    })) ?? [];

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Industries", url: `${SITE_URL}/industries` },
    { name: industry.industryName, url: `${SITE_URL}/industries/${slug}` },
  ]);

  const faqJsonLd =
    faqItems.length > 0 ? buildFaqPageJsonLd(faqItems) : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <IndustryHeroSection
        industryName={industry.industryName}
        headingBefore={heroHeading.headingBefore}
        headingAccent={heroHeading.headingAccent}
        body={
          typeof industry.heroIntro === "string"
            ? industry.heroIntro
            : <RichText blocks={industry.heroIntro} />
        }
        primaryCta={{
          label: toSentenceCase(industry.heroPrimaryCta?.label ?? "Book a demo"),
          href: normalizeUrl(
            industry.heroPrimaryCta?.url,
            "https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv",
          ),
        }}
        secondaryCta={{
          label: toSentenceCase(industry.heroSecondaryCta?.label ?? "Talk to our team"),
          href: normalizeUrl(industry.heroSecondaryCta?.url),
        }}
        stats={(industry.heroStats ?? []).map((s) => ({
          label: s.value,
        }))}
        actualImage={
          industry.heroImage
            ? {
                url: strapiImageUrl(industry.heroImage.url) ?? industry.heroImage.url,
                width: industry.heroImage.width,
                height: industry.heroImage.height,
                alt: industry.heroImage.alternativeText ?? industry.industryName,
              }
            : undefined
        }
      />

      {/* ── Trusted-by strip ──────────────────────────────────────────────── */}
      {trustedNames.length > 0 && (
        <IndustryTrustedBySection names={trustedNames} />
      )}

      {/* ── Problems ──────────────────────────────────────────────────────── */}
      {industry.problems && industry.problems.length > 0 && (
        <IndustryProblemsSection
          eyebrow={industry.problemsEyebrow ?? ""}
          headingBefore={problemsHeading.headingBefore.join(" ")}
          headingAccent={problemsHeading.headingAccent}
          intro={industry.problemsIntro ?? ""}
          problems={industry.problems.map((p) => ({
            icon: (
              <DynamicIcon
                name={p.problemIcon}
                size={iconSize.card}
                color="currentColor"
                className="text-[var(--primary)]"
              />
            ),
            heading: p.problemTitle,
            description: p.problemDescription,
            fix: p.solutionDescription,
          }))}
        />
      )}

      {/* ── Features / solution ───────────────────────────────────────────── */}
      {industry.features && industry.features.length > 0 && (
        <IndustrySolutionSection
          eyebrow={industry.featuresEyebrow ?? undefined}
          headingBefore={featuresHeading.headingBefore.join(" ")}
          headingAccent={featuresHeading.headingAccent}
          intro={industry.featuresIntro ?? ""}
          features={industry.features.map((f) => ({
            icon: (
              <DynamicIcon
                name={f.featureIcon}
                size={iconSize.card}
                color="currentColor"
                className="text-[var(--primary)]"
              />
            ),
            heading: f.featureTitle,
            description: f.featureDescription,
          }))}
        />
      )}

      {/* ── Dashboard ─────────────────────────────────────────────────────── */}
      {industry.dashboardFeatures && industry.dashboardFeatures.length > 0 && (
        <IndustryDashboardSection
          eyebrow={industry.dashboardEyebrow ?? ""}
          headingBefore={dashboardHeading.headingBefore.join(" ")}
          headingAccent={dashboardHeading.headingAccent}
          body={industry.dashboardIntro ?? ""}
          bullets={industry.dashboardFeatures.map((d) => ({
            icon: (
              <DynamicIcon
                name={d.dashboardFeatureIcon}
                size={iconSize.compact}
                color="currentColor"
                className="text-[var(--primary)]"
              />
            ),
            heading: d.dashboardFeatureTitle,
            description: d.dashboardFeatureDescription,
          }))}
          ctaLabel={toSentenceCase(industry.dashboardCta?.label ?? "See the dashboard")}
          ctaHref={normalizeUrl(industry.dashboardCta?.url)}
        />
      )}

      {/* ── Onboarding steps ──────────────────────────────────────────────── */}
      {industry.onboardingSteps && industry.onboardingSteps.length > 0 && (
        <IndustryOnboardingSection
          eyebrow={industry.onboardingEyebrow ?? ""}
          headingBefore={onboardingHeading.headingBefore.join(" ")}
          headingAccent={onboardingHeading.headingAccent}
          ctaLabel={toSentenceCase(industry.onboardingCta?.label ?? "See a live onboarding")}
          ctaHref={normalizeUrl(industry.onboardingCta?.url)}
          steps={industry.onboardingSteps.map((s) => ({
            heading: s.stepTitle,
            description: s.stepDescription,
          }))}
        />
      )}

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <CallSection
        eyebrow={industry.contactEyebrow ?? undefined}
        headingBefore={contactHeading.headingBefore.join(" ") || undefined}
        headingAccent={contactHeading.headingAccent || undefined}
        body={industry.contactDescription ?? undefined}
        phoneLabel={industry.contactTeamLabel ?? undefined}
      />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <FaqSection
          eyebrow={industry.faqEyebrow ?? undefined}
          headingBefore={faqHeading.headingBefore.join(" ") || undefined}
          headingAccent={faqHeading.headingAccent || undefined}
          subtext={industry.faqIntro ?? undefined}
          items={faqItems}
        />
      )}

      {/* ── Blog — posts whose category.slug matches this industry slug ───── */}
      {blogPosts.length > 0 && (
        <BlogSection
          posts={blogPosts}
          eyebrow={`${industry.industryName.toUpperCase()} · FROM THE BLOG`}
          headingBefore="What operators are"
          headingAccent="reading right now."
          body={`Practical guides on collections, billing, and payment operations for ${industry.industryName.toLowerCase()} — written by the Recurv team.`}
          ctaLabel={`All ${industry.industryName.toLowerCase()} articles`}
          ctaHref={`/blog?category=${encodeURIComponent(slug)}`}
        />
      )}
    </main>
  );
}
