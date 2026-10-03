export interface GuidedDemoVideo {
  id: string;
  title: string;
  duration: string;
  description: string;
  /** Same-origin playback URL for the file uploaded in Strapi. */
  videoUrl: string;
  mime?: string;
}

export interface FeatureVideo {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  mime?: string;
}

export function featureCategories(videos: FeatureVideo[]): string[] {
  const names = new Set<string>();
  for (const video of videos) names.add(video.category);
  return ["All", ...names];
}

export function parseDuration(value: string): number {
  const [minutes = "0", seconds = "0"] = value.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export function aboutMinutes(videos: GuidedDemoVideo[]): number {
  if (videos.length === 0) return 0;
  const total = videos.reduce((sum, video) => sum + parseDuration(video.duration), 0);
  return Math.max(1, Math.round(total / 60));
}

export function isPlayableUrl(url: string): boolean {
  return Boolean(url) && url !== "PLACEHOLDER" && !url.startsWith("PLACEHOLDER");
}

export function embedUrl(src: string): string | null {
  if (!isPlayableUrl(src)) return null;
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "loom.com") {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.loom.com/embed/${id}` : null;
    }
    if (host.endsWith("heygen.com")) return src;
  } catch {
    return null;
  }
  return null;
}
