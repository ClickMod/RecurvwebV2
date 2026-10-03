const STORAGE_KEY = "recurv-guided-demo-progress";

export interface DemoProgress {
  completedIds: string[];
  lastVideoId: string;
}

export function readDemoProgress(): DemoProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoProgress;
    if (!parsed || !Array.isArray(parsed.completedIds) || typeof parsed.lastVideoId !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeDemoProgress(progress: DemoProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
