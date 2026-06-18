// Shared primitives for the enterprise-fintech direction.
// White surfaces, violet accents, editorial photography placeholders,
// IBM-Carbon-style outlined geometric icons.

// ─── PhotoSlot ─────────────────────────────────────────────────────────
// Photography placeholder. Renders a tasteful duotone "real photo here" surface
// with a descriptive label so reviewers know what should land here.
function PhotoSlot({
  label = 'Editorial photograph',
  caption,
  tint = '#5B41E5',
  bg = '#1A1A1A',
  ratio = '4 / 3',
  rounded = 16,
  style,
  variant = 'gradient',   // gradient | grid | spotlight | flat
  children,
}) {
  const stripeBg = variant === 'grid'
    ? `repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 28px),
       repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 28px),
       linear-gradient(135deg, ${tint}25, ${bg})`
    : variant === 'spotlight'
    ? `radial-gradient(120% 80% at 30% 30%, ${tint}55, transparent 60%),
       radial-gradient(80% 60% at 80% 80%, ${tint}25, transparent 70%),
       ${bg}`
    : variant === 'flat'
    ? `${tint}`
    : `linear-gradient(135deg, ${tint}80, ${bg} 70%)`;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      background: stripeBg,
      borderRadius: rounded,
      overflow: 'hidden',
      color: '#fff',
      ...style,
    }}>
      {/* Soft film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} />
      {/* Corner ticks (like a contact sheet) */}
      {['tl','tr','bl','br'].map((c) => {
        const pos = {
          tl: { top: 12, left: 12, borderTop: '1px solid rgba(255,255,255,.3)', borderLeft: '1px solid rgba(255,255,255,.3)' },
          tr: { top: 12, right: 12, borderTop: '1px solid rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.3)' },
          bl: { bottom: 12, left: 12, borderBottom: '1px solid rgba(255,255,255,.3)', borderLeft: '1px solid rgba(255,255,255,.3)' },
          br: { bottom: 12, right: 12, borderBottom: '1px solid rgba(255,255,255,.3)', borderRight: '1px solid rgba(255,255,255,.3)' },
        }[c];
        return <div key={c} style={{ position: 'absolute', width: 12, height: 12, ...pos }} />;
      })}
      {/* Label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: 24, textAlign: 'center',
      }}>
        {children ? children : (
          <>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: 1.5,
              color: 'rgba(255,255,255,0.6)',
            }}>
              PLACEHOLDER · DROP IMAGE
            </div>
            <div style={{
              fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.9)',
              maxWidth: '85%', lineHeight: 1.35,
            }}>
              {label}
            </div>
            {caption && (
              <div style={{
                fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: 1,
                color: 'rgba(255,255,255,0.5)', marginTop: 4,
              }}>{caption}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── CarbonIcon ─────────────────────────────────────────────────────────
// Geometric outlined icons. Same stroke weight, same canvas. Single color.
function CarbonIcon({ name, color = '#5B41E5', size = 48 }) {
  const props = {
    width: size, height: size, viewBox: '0 0 48 48', fill: 'none',
    stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'mandate':  // signed doc
      return (
        <svg {...props}>
          <rect x="10" y="6" width="22" height="32" />
          <path d="M14 14h14M14 20h14M14 26h8" />
          <path d="M28 32l4 4 8-8" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'schedule':  // calendar with cycle arrow
      return (
        <svg {...props}>
          <rect x="6" y="10" width="30" height="28" />
          <path d="M6 18h30" />
          <path d="M14 6v8M28 6v8" />
          <path d="M16 26h12" />
          <path d="M22 22l6 4-6 4" />
        </svg>
      );
    case 'wallet':  // money / wallet
      return (
        <svg {...props}>
          <rect x="4" y="12" width="34" height="24" rx="2" />
          <path d="M4 18h34" />
          <circle cx="30" cy="27" r="2.5" />
        </svg>
      );
    case 'graph':  // chart trending up
      return (
        <svg {...props}>
          <path d="M6 36h36" />
          <path d="M6 30l8-10 8 6 10-14 6 6" />
          <path d="M32 8h6v6" />
        </svg>
      );
    case 'shield':  // shield with check
      return (
        <svg {...props}>
          <path d="M24 6l14 4v12c0 9-6 16-14 20-8-4-14-11-14-20V10z" />
          <path d="M16 22l6 6 12-12" strokeWidth="2" />
        </svg>
      );
    case 'cycle':  // circular arrows
      return (
        <svg {...props}>
          <path d="M40 16a14 14 0 1 0 4 8" />
          <path d="M40 8v8h-8" />
        </svg>
      );
    case 'people':  // group
      return (
        <svg {...props}>
          <circle cx="18" cy="16" r="6" />
          <path d="M6 38c2-7 6-10 12-10s10 3 12 10" />
          <circle cx="34" cy="14" r="4" />
          <path d="M30 26c4 0 8 2 10 10" />
        </svg>
      );
    case 'plug':  // integration
      return (
        <svg {...props}>
          <path d="M16 6v10M24 6v10" />
          <rect x="12" y="16" width="16" height="10" rx="2" />
          <path d="M20 26v6a4 4 0 0 0 4 4h10" />
          <circle cx="36" cy="36" r="2" fill={color} />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="10" y="20" width="28" height="20" rx="2" />
          <path d="M16 20v-6a8 8 0 0 1 16 0v6" />
          <circle cx="24" cy="30" r="2" fill={color} />
        </svg>
      );
    case 'bolt':
      return (
        <svg {...props}>
          <path d="M26 4L10 26h10L18 44l18-24H24z" />
        </svg>
      );
    case 'split':
      return (
        <svg {...props}>
          <path d="M6 24h12l8-12h16" />
          <path d="M6 24h12l8 12h16" />
          <path d="M38 6l4 6-4 6" />
          <path d="M38 30l4 6-4 6" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="18" />
          <path d="M6 24h36M24 6c5 6 5 30 0 36M24 6c-5 6-5 30 0 36" />
        </svg>
      );
    default:
      return <svg {...props}><rect x="8" y="8" width="32" height="32" /></svg>;
  }
}

// ─── Logo ──────────────────────────────────────────────────────────────
function Logo({ color = '#0E0E10', accent = '#5B41E5', size = 24, mark = 'fill' }) {
  // Real Recurv mark, extracted to a white-on-transparent PNG and tinted via CSS mask.
  const ih = size * 1.18;
  const iw = ih * (134 / 146);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.42, color }}>
      <span
        aria-label="Recurv logo mark"
        style={{
          display: 'block', width: iw, height: ih, flex: 'none',
          backgroundColor: mark === 'currentColor' ? color : accent,
          WebkitMaskImage: 'url(assets/recurv-mark-white.png)',
          maskImage: 'url(assets/recurv-mark-white.png)',
          WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain', maskSize: 'contain',
          WebkitMaskPosition: 'center', maskPosition: 'center',
        }}
      />
      <span style={{ fontWeight: 700, fontSize: size * 0.95, letterSpacing: '-0.03em' }}>Recurv</span>
    </div>
  );
}

function Dot({ color, size = 8, pulse = false }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <span style={{ width: size, height: size, borderRadius: 999, background: color, display: 'block' }} />
      {pulse && (
        <span style={{
          position: 'absolute', inset: 0, borderRadius: 999, border: `1.5px solid ${color}`,
          animation: 'recurvPulse 2s ease-out infinite', opacity: 0.6,
        }} />
      )}
    </span>
  );
}

if (typeof document !== 'undefined' && !document.getElementById('recurv-pulse-kf')) {
  const s = document.createElement('style');
  s.id = 'recurv-pulse-kf';
  s.textContent = '@keyframes recurvPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}';
  document.head.appendChild(s);
}

// ─── DashboardMock ─────────────────────────────────────────────────────
// Enterprise-grade dashboard placeholder. White-led, single accent color.
function DashboardMock({ theme }) {
  const t = theme;
  const rev = [140, 162, 158, 184, 196, 215, 232, 248, 264, 281, 305, 322];
  const max = Math.max(...rev);
  const min = Math.min(...rev);
  const points = rev.map((v, i) => {
    const x = (i / (rev.length - 1)) * 580 + 30;
    const y = 180 - ((v - min) / (max - min)) * 140 - 10;
    return [x, y];
  });
  const pathD = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1][0]} 180 L ${points[0][0]} 180 Z`;

  return (
    <div style={{
      background: t.surface,
      borderRadius: 12,
      boxShadow: `0 30px 80px -20px rgba(15,12,30,0.20), 0 2px 8px rgba(15,12,30,0.06)`,
      border: `1px solid ${t.line}`,
      overflow: 'hidden',
      color: t.ink,
      fontFamily: t.fontBody,
      width: '100%',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
        borderBottom: `1px solid ${t.line}`, background: t.surface,
      }}>
        <Logo color={t.ink} accent={t.primary} size={18} />
        <div style={{ marginLeft: 16, display: 'flex', gap: 22, fontSize: 12, color: t.inkSoft }}>
          <span style={{ color: t.ink, fontWeight: 600 }}>Overview</span>
          <span>Plans</span><span>Customers</span><span>Reports</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Dot color={t.success} pulse />
          <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 0.5 }}>LIVE · ZAR</span>
        </div>
      </div>

      <div style={{ padding: '24px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1, marginBottom: 6 }}>
              COLLECTED · MARCH 2026
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <span style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em' }}>
                R 2,412,608
              </span>
              <span style={{ fontSize: 13, color: t.success, fontWeight: 600 }}>↑ 12.4%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['1M', '3M', '12M', 'YTD'].map((p, i) => (
              <span key={p} className="mono" style={{
                fontSize: 11, padding: '5px 10px', borderRadius: 999,
                background: i === 2 ? t.ink : 'transparent',
                color: i === 2 ? t.surface : t.inkSoft,
                border: i === 2 ? 'none' : `1px solid ${t.line}`,
              }}>{p}</span>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 640 200" width="100%" height="170" preserveAspectRatio="none" style={{ marginTop: 14 }}>
          <defs>
            <linearGradient id={`grad-${t.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.primary} stopOpacity="0.18" />
              <stop offset="100%" stopColor={t.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="20" x2="620" y1={30 + i * 40} y2={30 + i * 40} stroke={t.line} strokeDasharray="2 4" />
          ))}
          <path d={areaD} fill={`url(#grad-${t.key})`} />
          <path d={pathD} stroke={t.primary} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 5 : 2.5}
              fill={i === points.length - 1 ? t.primary : t.primary}
              stroke={i === points.length - 1 ? t.surface : 'none'} strokeWidth={i === points.length - 1 ? 3 : 0} />
          ))}
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: t.line, marginTop: 14, border: `1px solid ${t.line}`, borderRadius: 8 }}>
          {[
            ['ACTIVE PLANS', '1,284', '+38 wk'],
            ['SUCCESS RATE', '98.6%', '+0.4 pt'],
            ['AVG. CYCLE', '28 days', 'unchanged'],
          ].map(([l, v, d], i) => (
            <div key={l} style={{ background: t.surface, padding: '14px 14px', borderRadius: i === 0 ? '8px 0 0 8px' : i === 2 ? '0 8px 8px 0' : 0 }}>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1 }}>{l}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, marginTop: 6, letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PhotoSlot, CarbonIcon, Logo, Dot, DashboardMock });
