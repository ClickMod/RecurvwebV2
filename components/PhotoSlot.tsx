import { CSSProperties, ReactNode } from 'react';
import { theme } from './theme';

interface PhotoSlotProps {
  label?: string;
  caption?: string;
  tint?: string;
  bg?: string;
  ratio?: string;
  rounded?: number;
  style?: CSSProperties;
  variant?: 'gradient' | 'grid' | 'spotlight' | 'flat';
  children?: ReactNode;
}

export function PhotoSlot({
  label = 'Editorial photograph',
  caption,
  tint = theme.primary,
  bg = '#1A1A1A',
  ratio = '4 / 3',
  rounded = 16,
  style,
  variant = 'gradient',
  children,
}: PhotoSlotProps) {
  const stripeBg =
    variant === 'grid'
      ? `repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 28px),
         repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 28px),
         linear-gradient(135deg, ${tint}25, ${bg})`
      : variant === 'spotlight'
      ? `radial-gradient(120% 80% at 30% 30%, ${tint}55, transparent 60%),
         radial-gradient(80% 60% at 80% 80%, ${tint}25, transparent 70%),
         ${bg}`
      : variant === 'flat'
      ? tint
      : `linear-gradient(135deg, ${tint}80, ${bg} 70%)`;

  const corners = ['tl', 'tr', 'bl', 'br'] as const;
  const cornerStyles: Record<string, CSSProperties> = {
    tl: { top: 12, left: 12, borderTop: '1px solid rgba(255,255,255,.3)', borderLeft: '1px solid rgba(255,255,255,.3)' },
    tr: { top: 12, right: 12, borderTop: '1px solid rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.3)' },
    bl: { bottom: 12, left: 12, borderBottom: '1px solid rgba(255,255,255,.3)', borderLeft: '1px solid rgba(255,255,255,.3)' },
    br: { bottom: 12, right: 12, borderBottom: '1px solid rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.3)' },
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        background: stripeBg,
        borderRadius: rounded,
        overflow: 'hidden',
        color: '#fff',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
      {corners.map((c) => (
        <div
          key={c}
          style={{ position: 'absolute', width: 12, height: 12, ...cornerStyles[c] }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 24,
          textAlign: 'center',
        }}
      >
        {children ?? (
          <>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: 1.5,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              PLACEHOLDER · DROP IMAGE
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '85%',
                lineHeight: 1.35,
              }}
            >
              {label}
            </div>
            {caption && (
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  letterSpacing: 1,
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: 4,
                }}
              >
                {caption}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
