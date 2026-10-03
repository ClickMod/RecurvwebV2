"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { DemoVideoPlayer } from "@/components/demo/DemoVideoPlayer";
import { featureCategories, type FeatureVideo } from "@/components/demo/guided-demo-data";
import { trackDemoEvent } from "@/components/demo/demo-analytics";
import { theme as t } from "@/components/theme";

export function FeatureLibrary({ videos }: { videos: FeatureVideo[] }) {
  const categories = featureCategories(videos);
  const [category, setCategory] = useState("All");
  const played = useRef(new Set<string>());
  const visible = category === "All" ? videos : videos.filter((video) => video.category === category);

  function trackPlay(video: FeatureVideo) {
    if (played.current.has(video.id)) return;
    played.current.add(video.id);
    trackDemoEvent("feature_video_opened", {
      video_id: video.id,
      video_title: video.title,
      video_category: video.category,
    });
  }

  return (
    <section className="py-16 md:py-20" style={{ background: t.surfaceAlt, borderTop: `1px solid ${t.line}` }}>
      <Container>
      <div className="mb-8 max-w-[640px]">
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 500,
            fontSize: "var(--fs-h2-lg)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Want to explore more?
        </h2>
        <p className="mt-4" style={{ fontSize: 16, lineHeight: 1.6, color: t.inkSoft }}>
          Explore individual Recurv features at your own pace. This is optional. You do not need to watch these before you start.
        </p>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {categories.map((name) => {
          const selected = name === category;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={selected}
              className="min-h-11 shrink-0 rounded-full px-4 cursor-pointer focus-visible:outline focus-visible:outline-2"
              style={{
                border: `1px solid ${selected ? t.primary : t.lineStrong}`,
                background: selected ? t.softTint : t.surface,
                color: t.ink,
                fontFamily: t.fontBody,
                fontSize: 14,
                fontWeight: 500,
                outlineColor: t.primary,
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((video) => (
          <article
            key={video.id}
            className="overflow-hidden rounded-xl"
            style={{ border: `1px solid ${t.line}`, background: t.surface, fontFamily: t.fontBody }}
          >
            <DemoVideoPlayer src={video.videoUrl} title={video.title} rounded={false} onPlay={() => trackPlay(video)} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>{video.title}</div>
                <span className="mono shrink-0" style={{ fontSize: 12, color: t.inkSoft }}>{video.duration}</span>
              </div>
              <p className="mt-2 line-clamp-2" style={{ fontSize: 14, lineHeight: 1.5, color: t.inkSoft }}>
                {video.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      </Container>
    </section>
  );
}
