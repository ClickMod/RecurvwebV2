"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FeatureLibrary } from "@/components/demo/FeatureLibrary";
import { GuidedDemoSection } from "@/components/demo/GuidedDemoSection";
import { trackDemoEvent } from "@/components/demo/demo-analytics";
import { readDemoProgress, writeDemoProgress } from "@/components/demo/demo-progress";
import {
  aboutMinutes,
  type FeatureVideo,
  type GuidedDemoVideo,
} from "@/components/demo/guided-demo-data";
import { BOOK_DEMO_LABEL, BOOK_DEMO_URL, SIGN_UP_URL } from "@/lib/site-cta";
import { theme as t } from "@/components/theme";

const GUIDED_ID = "guided-demo";

function scrollToDemo() {
  document.getElementById(GUIDED_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AccountButton({ className, source }: { className?: string; source: string }) {
  return (
    <Button
      size="lg"
      href={SIGN_UP_URL}
      className={className}
      onClick={() => trackDemoEvent("create_account_clicked", { source })}
    >
      Create Your Account
    </Button>
  );
}

function BookButton({
  className,
  label = BOOK_DEMO_LABEL,
  source,
}: {
  className?: string;
  label?: string;
  source: string;
}) {
  return (
    <Button
      size="lg"
      variant="secondary"
      href={BOOK_DEMO_URL}
      className={className}
      onClick={() => trackDemoEvent("book_demo_clicked", { source })}
    >
      {label}
    </Button>
  );
}

export function GuidedDemoExperience({
  guidedVideos,
  featureVideos,
}: {
  guidedVideos: GuidedDemoVideo[];
  featureVideos: FeatureVideo[];
}) {
  const searchParams = useSearchParams();
  const videos = guidedVideos;
  const total = videos.length;
  const minutes = aboutMinutes(videos);
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [hasProgress, setHasProgress] = useState(false);
  const [autoPlayId, setAutoPlayId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = readDemoProgress();
      const fromQuery = searchParams.get("video");
      const fromHash = window.location.hash.replace("#", "");
      const requested = fromQuery || fromHash;
      const requestedVideo = videos.find((video) => video.id === requested);
      const savedVideo = videos.find((video) => video.id === saved?.lastVideoId);

      if (saved) {
        setCompletedIds(saved.completedIds.filter((id) => videos.some((video) => video.id === id)));
        setHasProgress(true);
      }
      const initial = requestedVideo?.id ?? savedVideo?.id ?? videos[0]?.id ?? "";
      if (initial) setActiveId(initial);
      if (requestedVideo) scrollToDemo();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [searchParams, videos]);

  function selectVideo(id: string, options?: { play?: boolean; started?: boolean }) {
    const index = videos.findIndex((video) => video.id === id);
    const video = videos[index];
    if (!video) return;
    setActiveId(id);
    setAutoPlayId(options?.play ? id : null);
    writeDemoProgress({ completedIds, lastVideoId: id });
    const url = new URL(window.location.href);
    url.searchParams.set("video", id);
    url.hash = "";
    window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`);
    trackDemoEvent(options?.started ? "demo_started" : "demo_video_selected", {
      video_id: video.id,
      video_title: video.title,
      video_position: index + 1,
      video_category: "guided",
    });
  }

  function completeVideo(id: string) {
    const video = videos.find((item) => item.id === id);
    const index = videos.findIndex((item) => item.id === id);
    if (!video || completedIds.includes(id)) return;
    const nextCompleted = [...completedIds, id];
    setCompletedIds(nextCompleted);
    writeDemoProgress({ completedIds: nextCompleted, lastVideoId: activeId });
    trackDemoEvent("demo_video_completed", {
      video_id: video.id,
      video_title: video.title,
      video_position: index + 1,
      video_category: "guided",
    });
    if (index === videos.length - 1) {
      trackDemoEvent("demo_completed", { video_id: video.id, video_title: video.title });
    }
  }

  const activeIndex = Math.max(0, videos.findIndex((video) => video.id === activeId));
  const onFinal = activeIndex === videos.length - 1;
  const position = activeIndex + 1;

  return (
    <>
      <section className="pt-8 pb-8 md:pt-12 md:pb-10">
        <Container>
          <div className="mono mb-4" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
            GUIDED PRODUCT DEMO
          </div>
          <h1
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 500,
              fontSize: "var(--fs-h2-xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            See Recurv in action
          </h1>
          <p className="mt-4 max-w-[640px] md:hidden" style={{ fontSize: 16, lineHeight: 1.55, color: t.inkSoft }}>
            See how Recurv simplifies collections and automated reconciliation.
          </p>
          <p className="mt-4 hidden max-w-[680px] md:block" style={{ fontSize: 18, lineHeight: 1.55, color: t.inkSoft }}>
            See how Recurv helps South African businesses simplify collections, automate reconciliation and reduce the administrative burden of managing incoming payments.
          </p>
          <p className="mono mt-4" style={{ fontSize: 12, letterSpacing: 0.6, color: t.inkSoft }}>
            {total > 0 ? `${total} short videos • About ${minutes} minutes` : "Videos are being added."}
          </p>
          {hasProgress ? (
            <p className="mt-3" style={{ fontSize: 15, color: t.ink }}>
              Welcome back. You&apos;re {position} of {total} videos through the demo.
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="min-h-11 w-full justify-center sm:w-auto"
              onClick={() => {
                const id = hasProgress ? activeId : videos[0]?.id;
                if (!id) return;
                selectVideo(id, { started: true });
                scrollToDemo();
              }}
            >
              {hasProgress ? "Continue Guided Demo" : "Start Guided Demo"}
            </Button>
            <BookButton className="min-h-11 w-full justify-center sm:w-auto" source="hero" />
          </div>
        </Container>
      </section>

      <Container>
        {videos.length > 0 ? (
          <GuidedDemoSection
            videos={videos}
            activeIndex={activeIndex}
            completedIds={completedIds}
            autoPlay={autoPlayId === activeId}
            onSelect={(id) => selectVideo(id, { play: true })}
            onComplete={completeVideo}
          />
        ) : null}

        <div className="mb-16 md:mb-20" style={{ borderTop: `1px solid ${t.line}` }}>
          <div className="grid grid-cols-1 items-end gap-6 pt-8 md:pt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <h2
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-h2-md)",
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                {onFinal ? "Ready to put Recurv to work?" : "Ready to get started?"}
              </h2>
              <p className="mt-3 max-w-[540px]" style={{ fontSize: 16, lineHeight: 1.6, color: t.inkSoft }}>
                {onFinal
                  ? "Create your account and start setting up your collections, or book a tailored demo and we'll show you how Recurv can work for your specific business."
                  : "Start simplifying your collections with Recurv."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <AccountButton className="min-h-11 w-full justify-center" source={onFinal ? "end_of_demo" : "guided_demo"} />
              <BookButton
                className="min-h-11 w-full justify-center"
                label={onFinal ? "Book a Tailored Demo" : BOOK_DEMO_LABEL}
                source={onFinal ? "end_of_demo" : "guided_demo"}
              />
            </div>
          </div>
        </div>
      </Container>

      {featureVideos.length > 0 ? <FeatureLibrary videos={featureVideos} /> : null}

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2
                style={{
                  fontFamily: t.fontDisplay,
                  fontWeight: 500,
                  fontSize: "var(--fs-h2-xl)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                  margin: 0,
                }}
              >
                Ready to simplify
                <br />
                <span style={{ color: t.primary }}>your collections?</span>
              </h2>
              <p className="mt-4 max-w-[540px]" style={{ fontSize: 17, lineHeight: 1.6, color: t.inkSoft }}>
                Get started with Recurv today or speak to us about your specific collection requirements.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <AccountButton className="min-h-11 w-full justify-center" source="final" />
              <BookButton className="min-h-11 w-full justify-center" source="final" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
