import { theme as t } from "@/components/theme";

export function PlayPauseButton({
  playing,
  onClick,
  disabled = false,
  playLabel,
  pauseLabel,
}: {
  playing: boolean;
  onClick: () => void;
  disabled?: boolean;
  playLabel: string;
  pauseLabel: string;
}) {
  return (
    <>
      {!playing && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(15,14,20,0.28)" }}
        />
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={playing}
        className={`absolute top-1/2 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-opacity md:h-20 md:w-20 ${
          playing
            ? "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
            : ""
        }`}
        style={{
          background: t.primary,
          border: 0,
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.55 : undefined,
        }}
      >
        {playing ? (
          <span className="flex items-center gap-[5px]" aria-hidden="true">
            <span className="block h-4 w-[3px] rounded-[1px] md:h-5" style={{ background: t.onPrimary }} />
            <span className="block h-4 w-[3px] rounded-[1px] md:h-5" style={{ background: t.onPrimary }} />
          </span>
        ) : (
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: 0,
              height: 0,
              marginLeft: 4,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "16px solid #FFFFFF",
            }}
          />
        )}
      </button>
    </>
  );
}
