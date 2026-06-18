import { ReactNode, CSSProperties } from 'react';
import { theme } from './theme';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', size = 'md', icon, style, onClick }: ButtonProps) {
  const sizes = {
    sm: { padding: '9px 16px', fontSize: 13 },
    md: { padding: '13px 22px', fontSize: 14 },
    lg: { padding: '16px 28px', fontSize: 15 },
  };
  const s = sizes[size];
  const variants: Record<string, CSSProperties> = {
    primary: { background: theme.ink, color: theme.surface, border: `1px solid ${theme.ink}` },
    accent: { background: theme.primary, color: theme.onPrimary, border: `1px solid ${theme.primary}` },
    secondary: { background: 'transparent', color: theme.ink, border: `1px solid ${theme.lineStrong}` },
    ghost: { background: 'transparent', color: theme.ink, border: 'none', padding: 0 },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        padding: variant === 'ghost' ? 0 : s.padding,
        fontSize: s.fontSize,
        borderRadius: 6,
        fontFamily: theme.fontBody,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
      {icon && <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
}
