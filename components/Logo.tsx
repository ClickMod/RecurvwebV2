import { theme } from './theme';

interface LogoProps {
  color?: string;
  accent?: string;
  size?: number;
}

export function Logo({ color = theme.ink, accent = theme.primary, size = 24 }: LogoProps) {
  const ih = size * 1.18;
  const iw = ih * (134 / 146);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.42, color }}>
      <span
        aria-label="Recurv logo mark"
        style={{
          display: 'block',
          width: iw,
          height: ih,
          flex: 'none',
          backgroundColor: accent,
          WebkitMaskImage: 'url(/recurv-mark-white.png)',
          maskImage: 'url(/recurv-mark-white.png)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
      <span style={{ fontWeight: 700, fontSize: size * 0.95, letterSpacing: '-0.03em' }}>Recurv</span>
    </div>
  );
}
