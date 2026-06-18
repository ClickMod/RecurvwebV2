import { theme } from './theme';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

export function CarbonIcon({ name, color = theme.primary, size = 48 }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'mandate':
      return (
        <svg {...props}>
          <rect x="10" y="6" width="22" height="32" />
          <path d="M14 14h14M14 20h14M14 26h8" />
          <path d="M28 32l4 4 8-8" stroke={color} strokeWidth={2} />
        </svg>
      );
    case 'schedule':
      return (
        <svg {...props}>
          <rect x="6" y="10" width="30" height="28" />
          <path d="M6 18h30" />
          <path d="M14 6v8M28 6v8" />
          <path d="M16 26h12" />
          <path d="M22 22l6 4-6 4" />
        </svg>
      );
    case 'wallet':
      return (
        <svg {...props}>
          <rect x="4" y="12" width="34" height="24" rx="2" />
          <path d="M4 18h34" />
          <circle cx="30" cy="27" r="2.5" />
        </svg>
      );
    case 'graph':
      return (
        <svg {...props}>
          <path d="M6 36h36" />
          <path d="M6 30l8-10 8 6 10-14 6 6" />
          <path d="M32 8h6v6" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M24 6l14 4v12c0 9-6 16-14 20-8-4-14-11-14-20V10z" />
          <path d="M16 22l6 6 12-12" strokeWidth={2} />
        </svg>
      );
    case 'cycle':
      return (
        <svg {...props}>
          <path d="M40 16a14 14 0 1 0 4 8" />
          <path d="M40 8v8h-8" />
        </svg>
      );
    case 'plug':
      return (
        <svg {...props}>
          <path d="M16 6v10M24 6v10" />
          <rect x="12" y="16" width="16" height="10" rx="2" />
          <path d="M20 26v6a4 4 0 0 0 4 4h10" />
          <circle cx="36" cy="36" r="2" fill={color} />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M26 4L10 26h10L18 44l18-24H24z" />
        </svg>
      );
    default:
      return <svg {...props}><rect x="8" y="8" width="32" height="32" /></svg>;
  }
}
