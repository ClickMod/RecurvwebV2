import { ReactNode, CSSProperties } from 'react';
import Link from 'next/link';
import { theme } from './theme';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  /** When provided the button renders as a Next.js <Link> */
  href?: string;
}

// All color tokens referenced as CSS vars so hover: can override them without specificity conflicts.
const variantClasses: Record<string, string> = {
  primary:   'bg-[var(--ink)]          text-[var(--surface)]     border border-[var(--ink)]        hover:bg-[var(--primary)]       hover:border-[var(--primary)]    hover:-translate-y-px active:translate-y-0',
  accent:    'bg-[var(--primary)]      text-[var(--on-primary)]  border border-[var(--primary)]    hover:bg-[var(--primary-hover)] hover:border-[var(--primary-hover)] hover:-translate-y-px active:translate-y-0',
  secondary: 'bg-transparent           text-[var(--ink)]          border border-[var(--line-strong)] hover:border-[var(--primary)]   hover:-translate-y-px active:translate-y-0',
  ghost:     'bg-transparent           text-[var(--ink)]          border-0                          hover:text-[var(--primary)]',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-[9px] text-[13px]',
  md: 'px-[22px] py-[13px] text-[14px]',
  lg: 'px-7 py-4 text-[15px]',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  style,
  onClick,
  type = 'button',
  href,
}: ButtonProps) {
  const isGhost = variant === 'ghost';

  const sharedClassName = [
    'inline-flex items-center gap-[10px] whitespace-nowrap rounded-[6px] font-medium cursor-pointer',
    'transition-[background-color,border-color,color,transform] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    isGhost ? 'p-0' : sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ');

  const sharedStyle: CSSProperties = {
    fontFamily: theme.fontBody,
    letterSpacing: '-0.005em',
    textDecoration: 'none',
    ...style,
  };

  const content = (
    <>
      {children}
      {icon && <span aria-hidden="true" className="inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={sharedClassName}
          style={sharedStyle}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={sharedClassName} style={sharedStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={sharedClassName}
      style={sharedStyle}
    >
      {content}
    </button>
  );
}
