"use client";

import { useEffect, useRef } from "react";
import { embedUrl, isPlayableUrl } from "@/components/demo/guided-demo-data";
import { theme as t } from "@/components/theme";

export function DemoVideoPlayer({
  src,
  title,
  mime = "video/mp4",
  autoPlay = false,
  rounded = true,
  onEnded,
  onPlay,
}: {
  src: string;
  title: string;
  mime?: string;
  autoPlay?: boolean;
  rounded?: boolean;
  onEnded?: () => void;
  onPlay?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const embedded = embedUrl(src);
  const file = isPlayableUrl(src) && !embedded;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    video.play().catch(() => {});
  }, [autoPlay, src]);

  return (
    <div
      className={`relative w-full overflow-hidden${rounded ? " rounded-xl" : ""}`}
      style={{ background: "#15122B" }}
    >
      {embedded ? (
        <iframe
          key={embedded}
          className="aspect-video w-full"
          src={embedded}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ border: 0 }}
        />
      ) : file ? (
        <video
          key={src}
          ref={videoRef}
          className="aspect-video w-full"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
          onEnded={onEnded}
          onPlay={onPlay}
        >
          <source src={src.includes("#") ? src : `${src}#t=0.001`} type={mime} />
        </video>
      ) : (
        <div
          className="flex aspect-video w-full items-center justify-center px-6 text-center"
          style={{ color: t.inkOnDeepSoft, fontSize: 15 }}
        >
          This walkthrough will play here.
        </div>
      )}
    </div>
  );
}
