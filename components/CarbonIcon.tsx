import { theme, iconSize } from './theme';

export type IconName =
  | 'mandate'
  | 'schedule'
  | 'wallet'
  | 'graph'
  | 'shield'
  | 'cycle'
  | 'plug'
  | 'bolt'
  | 'people'
  | 'lock'
  | 'split'
  | 'globe'
  | 'reconcile';

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

export function CarbonIcon({ name, color = theme.primary, size = iconSize.card }: IconProps) {
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
    case 'people':
      return (
        <svg {...props}>
          {/* front person */}
          <circle cx="19" cy="15" r="6" />
          <path d="M7 40c0-8 5-13 12-13s12 5 12 13" />
          {/* back person */}
          <circle cx="31" cy="14" r="5" />
          <path d="M29 27c1.5-0.5 3-0.5 4 0 5 2 8 7 8 13" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="12" y="22" width="24" height="18" rx="2" />
          <path d="M17 22v-6a7 7 0 0 1 14 0v6" />
          <circle cx="24" cy="31" r="2" fill={color} stroke="none" />
          <path d="M24 33v3" />
        </svg>
      );
    case 'split':
      return (
        <svg {...props}>
          <path d="M24 10v28" />
          <path d="M10 24h28" />
          <path d="M10 10l28 28M38 10L10 38" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="18" />
          <path d="M24 6c-5 6-8 12-8 18s3 12 8 18" />
          <path d="M24 6c5 6 8 12 8 18s-3 12-8 18" />
          <path d="M6 24h36" />
          <path d="M8 14h28M8 34h28" />
        </svg>
      );
    case 'reconcile':
      return (
        <svg {...props}>
          {/* Two input lines converging — reconciliation */}
          <path d="M4 14 L22 26" />
          <path d="M4 38 L22 26" />
          {/* Output shaft */}
          <path d="M22 26 h8" />
          {/* Checkmark — resolution */}
          <path d="M29 19 l6 8 11-13" strokeWidth={2.2} />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`CarbonIcon: icon "${_exhaustive}" is not implemented.`);
      }
      return (
        <svg {...props}>
          <rect x="8" y="8" width="32" height="32" strokeDasharray="4 3" />
          <text x="24" y="28" fontSize="8" textAnchor="middle" stroke="none" fill={color} fontFamily="monospace">
            {String(name).slice(0, 6)}
          </text>
        </svg>
      );
    }
  }
}
