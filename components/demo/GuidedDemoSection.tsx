"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { DemoVideoPlayer } from "@/components/demo/DemoVideoPlayer";
import type { GuidedDemoVideo } from "@/components/demo/guided-demo-data";
import { theme as t } from "@/components/theme";

function statusLabel(completed: boolean, current: boolean) {
  if (current) return "Now playing";
  if (completed) return "Completed";
  return "Not watched";
}

function PlaylistRow({
  video,
  index,
  current,
  completed,
  onSelect,
}: {
  video: GuidedDemoVideo;
  index: number;
  current: boolean;
  completed: boolean;
  onSelect: (id: string) => void;
}) {
  const mark = current ? "●" : completed ? "✓" : "○";

  return (
    <button
      type="button"
      onClick={() => onSelect(video.id)}
      aria-current={current ? "true" : undefined}
      className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        border: `1px solid ${current ? t.primary : "transparent"}`,
        background: current ? t.softTint : "transparent",
        outlineColor: t.primary,
        fontFamily: t.fontBody,
      }}
    >
      <span aria-hidden="true" className="w-4 shrink-0 text-center" style={{ color: current || completed ? t.primary : t.inkSoft }}>
        {mark}
      </span>
      <span className="sr-only">{statusLabel(completed, current)}. </span>
      <span className="min-w-0 flex-1" style={{ fontSize: 14, fontWeight: current ? 600 : 450, color: t.ink }}>
        {video.title}
      </span>
      <span className="mono shrink-0" style={{ fontSize: 12, color: t.inkSoft }}>
        {video.duration}
      </span>
      <span className="sr-only"> Video {index + 1}</span>
    </button>
  );
}

export function GuidedDemoSection({
  videos,
  activeIndex,
  completedIds,
  autoPlay,
  onSelect,
  onComplete,
}: {
  videos: GuidedDemoVideo[];
  activeIndex: number;
  completedIds: string[];
  autoPlay: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const active = videos[activeIndex];
  const [playlistOpen, setPlaylistOpen] = useState(false);

  if (!active) return null;

  return (
    <section id="guided-demo" className="scroll-mt-24 pb-16 md:pb-20">
      <GuidedDemoStage
        key={active.id}
        videos={videos}
        active={active}
        activeIndex={activeIndex}
        next={videos[activeIndex + 1]}
        completedIds={completedIds}
        autoPlay={autoPlay}
        playlistOpen={playlistOpen}
        onPlaylistOpen={setPlaylistOpen}
        onSelect={onSelect}
        onComplete={onComplete}
      />
    </section>
  );
}

function GuidedDemoStage({
  videos,
  active,
  activeIndex,
  next,
  completedIds,
  autoPlay,
  playlistOpen,
  onPlaylistOpen,
  onSelect,
  onComplete,
}: {
  videos: GuidedDemoVideo[];
  active: GuidedDemoVideo;
  activeIndex: number;
  next?: GuidedDemoVideo;
  completedIds: string[];
  autoPlay: boolean;
  playlistOpen: boolean;
  onPlaylistOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const [upNext, setUpNext] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [replayKey, setReplayKey] = useState(0);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  });

  useEffect(() => {
    if (!upNext || secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [upNext, secondsLeft]);

  useEffect(() => {
    if (!upNext || secondsLeft > 0 || !next) return;
    onSelectRef.current(next.id);
  }, [upNext, secondsLeft, next]);

  const position = `${activeIndex + 1} of ${videos.length}`;
  const progress = ((activeIndex + 1) / videos.length) * 100;

  function handleEnded() {
    onComplete(active.id);
    if (next) setUpNext(true);
  }

  const playlist = (
    <div className="flex flex-col gap-1">
      {videos.map((video, index) => (
        <PlaylistRow
          key={video.id}
          video={video}
          index={index}
          current={video.id === active.id}
          completed={completedIds.includes(video.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)] lg:gap-12">
      <div className="min-w-0">
        <div className="relative">
          <DemoVideoPlayer
            key={`${active.videoUrl}-${replayKey}`}
            src={active.videoUrl}
            title={active.title}
            mime={active.mime}
            autoPlay={autoPlay || replayKey > 0}
            onEnded={handleEnded}
          />
          {upNext && next ? (
            <div
              className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-4 sm:p-6"
              style={{ background: "rgba(15,14,20,0.78)", color: t.inkOnDeep }}
            >
              <div className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkOnDeepSoft }}>
                UP NEXT
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: "var(--fs-h2-md)", fontWeight: 500, letterSpacing: "-0.03em" }}>
                {next.title}
              </div>
              <div style={{ fontSize: 14, color: t.inkOnDeepSoft }}>{next.duration}</div>
              <p style={{ fontSize: 14, color: t.inkOnDeepSoft }}>
                Playing next video in {secondsLeft} {secondsLeft === 1 ? "second" : "seconds"}…
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button size="md" variant="accent" className="w-full justify-center sm:w-auto" onClick={() => onSelect(next.id)}>
                  Play Next Video →
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                  style={{ color: t.inkOnDeep, borderColor: "rgba(246,245,240,0.35)" }}
                  onClick={() => {
                    setUpNext(false);
                    setReplayKey((value) => value + 1);
                  }}
                >
                  Replay
                </Button>
                <Button size="md" variant="ghost" className="w-full justify-center sm:w-auto" style={{ color: t.inkOnDeep }} onClick={() => setUpNext(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 lg:hidden">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="mono" style={{ fontSize: 12, letterSpacing: 1, color: t.inkSoft }}>{position}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: t.line }} aria-hidden="true">
            <div className="h-full" style={{ width: `${progress}%`, background: t.primary }} />
          </div>
        </div>

        <h2
          className="mt-8 md:mt-10"
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 500,
            fontSize: "var(--fs-h2-md)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {active.title}
        </h2>
        <p className="mt-3 max-w-[640px]" style={{ fontSize: 16, lineHeight: 1.6, color: t.inkSoft }}>
          {active.description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            size="md"
            variant="secondary"
            className="min-h-11 w-full justify-center sm:w-auto"
            disabled={activeIndex === 0}
            onClick={() => {
              const previous = videos[activeIndex - 1];
              if (previous) onSelect(previous.id);
            }}
          >
            ← Previous
          </Button>
          <Button
            size="md"
            className="min-h-11 w-full justify-center sm:w-auto"
            disabled={!next}
            onClick={() => {
              if (next) onSelect(next.id);
            }}
          >
            Next Video →
          </Button>
        </div>
      </div>

      <aside className="min-w-0" aria-label="Your demo">
        <div className="lg:hidden" style={{ borderTop: `1px solid ${t.line}` }}>
          <button
            type="button"
            className="flex min-h-11 w-full items-center justify-between gap-3 py-3 cursor-pointer"
            style={{ fontFamily: t.fontBody, background: "transparent", border: 0, color: t.ink }}
            aria-expanded={playlistOpen}
            onClick={() => onPlaylistOpen((open) => !open)}
          >
            <span className="mono" style={{ fontSize: 12, letterSpacing: 1.2 }}>
              YOUR DEMO — {position}
            </span>
            <span style={{ fontSize: 14, color: t.primary, fontWeight: 600 }}>
              {playlistOpen ? "Hide videos" : "View all videos"}
            </span>
          </button>
          {playlistOpen ? playlist : null}
        </div>

        <div
          className="hidden rounded-xl p-4 lg:block lg:p-5"
          style={{ border: `1px solid ${t.line}`, background: t.surface }}
        >
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <div className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft }}>
              YOUR DEMO
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{position}</div>
          </div>
          <div className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: t.line }} aria-hidden="true">
            <div className="h-full" style={{ width: `${progress}%`, background: t.primary }} />
          </div>
          {playlist}
        </div>
      </aside>
    </div>
  );
}
