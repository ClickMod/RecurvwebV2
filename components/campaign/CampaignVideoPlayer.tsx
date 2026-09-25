"use client";

import { useRef, useState } from "react";
import { PlayPauseButton } from "@/components/PlayPauseButton";
import { theme as t } from "@/components/theme";

export function CampaignVideoPlayer({
  src,
  mime = "video/mp4",
  poster,
  label = "1-minute introduction to Recurv",
  onStarted,
  onCompleted,
}: {
  src?: string | null;
  mime?: string | null;
  poster?: string | null;
  label?: string;
  onStarted?: () => void;
  onCompleted?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [controlsOn, setControlsOn] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);

  function toggle() {
    const video = ref.current;
    if (!video || !src) return;
    if (video.paused) {
      setControlsOn(true);
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl"
      style={{ background: t.bg }}
    >
      <video
        ref={ref}
        className="block aspect-video w-full origin-center scale-[1.02]"
        playsInline
        preload="metadata"
        poster={poster || undefined}
        aria-label={label}
        controls={controlsOn}
        onPlay={() => {
          setPlaying(true);
          setControlsOn(true);
          if (started.current) return;
          started.current = true;
          onStarted?.();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          if (completed.current) return;
          completed.current = true;
          onCompleted?.();
        }}
      >
        {src ? <source src={src} type={mime || "video/mp4"} /> : null}
      </video>
      <PlayPauseButton
        playing={playing}
        onClick={toggle}
        disabled={!src}
        playLabel={src ? "Play introduction" : "Introduction video is not available yet"}
        pauseLabel="Pause introduction"
      />
    </div>
  );
}
