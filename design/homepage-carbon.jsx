// Homepage variation 02 — "Carbon Mono"
// Pure white, vivid violet accent, IBM-Carbon-style geometric illustrations,
// product/device photography. More technical, more dense, more information.

const CARBON = {
  key: 'carbon',
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F2EE',
  surfaceDeep: '#0C0B14',
  ink: '#0C0B14',
  inkSoft: '#5A5868',
  inkOnDeep: '#FFFFFF',
  inkOnDeepSoft: 'rgba(255,255,255,0.65)',
  primary: '#6841F0',
  primaryHover: '#5631E0',
  onPrimary: '#FFFFFF',
  softTint: 'rgba(104,65,240,0.07)',
  accent: '#D8CCFA',
  success: '#1E7A4E',
  successBg: 'rgba(30,122,78,0.10)',
  warn: '#B45A1B',
  line: 'rgba(12,11,20,0.10)',
  lineStrong: 'rgba(12,11,20,0.25)',
  fontDisplay: '"Geist", system-ui, sans-serif',
  fontBody: '"Geist", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

function CarbonButton({ children, variant = 'primary', size = 'md', icon }) {
  const t = CARBON;
  const sizes = { sm: { p: '9px 16px', f: 13 }, md: { p: '12px 22px', f: 14 }, lg: { p: '15px 28px', f: 15 } };
  const s = sizes[size];
  const styles = {
    primary: { background: t.primary, color: t.onPrimary, border: `1px solid ${t.primary}` },
    dark: { background: t.ink, color: t.surface, border: `1px solid ${t.ink}` },
    secondary: { background: 'transparent', color: t.ink, border: `1px solid ${t.lineStrong}` },
    ghost: { background: 'transparent', color: t.ink, border: 'none', padding: 0 },
  };
  return (
    <button style={{
      ...styles[variant], padding: variant === 'ghost' ? 0 : s.p, fontSize: s.f, borderRadius: 0,
      fontFamily: t.fontBody, fontWeight: 500, letterSpacing: '-0.005em',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
    }}>
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
}

// Large carbon-style hero illustration — abstract "recurring flow" geometry.
function CarbonHeroDiagram({ accent = '#6841F0' }) {
  return (
    <svg viewBox="0 0 560 560" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" stroke="rgba(12,11,20,0.06)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>
      <rect width="560" height="560" fill="url(#cgrid)" />
      {/* outer ring */}
      <circle cx="280" cy="280" r="220" stroke={accent} strokeWidth="1.5" fill="none" strokeDasharray="2 6" />
      {/* main loop */}
      <path d="M120 280 A 160 160 0 1 1 440 280 A 160 160 0 1 1 120 280Z" stroke={accent} strokeWidth="2" fill="none" />
      {/* nodes */}
      {[
        [280, 120, 'M'], [440, 280, 'S'], [280, 440, 'C'], [120, 280, 'R'],
      ].map(([x, y, lbl]) => (
        <g key={lbl}>
          <circle cx={x} cy={y} r="22" fill="#fff" stroke={accent} strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={accent} fontWeight="600">{lbl}</text>
        </g>
      ))}
      {/* corner labels */}
      <text x="280" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">MANDATE</text>
      <text x="480" y="284" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">SCHEDULE</text>
      <text x="280" y="490" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">COLLECT</text>
      <text x="80" y="284" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#0C0B14" letterSpacing="2">RECONCILE</text>
      {/* center pulse */}
      <circle cx="280" cy="280" r="60" fill={accent} opacity="0.10" />
      <circle cx="280" cy="280" r="40" fill={accent} />
      <text x="280" y="278" textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="14" fill="#fff" fontWeight="600">Recurv</text>
      <text x="280" y="294" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.7)" letterSpacing="1.5">CORE</text>
    </svg>
  );
}

function CarbonHomepage() {
  const t = CARBON;
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>
      {/* Nav */}
      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '20px 56px', borderBottom: `1px solid ${t.line}`,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: 'flex', gap: 30, justifyContent: 'center', fontSize: 14, color: t.ink }}>
          {['Products', 'Solutions', 'Industries', 'Pricing', 'Developers', 'Company'].map((n) => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {n}
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M2 3l2.5 3 2.5-3" stroke={t.inkSoft} strokeWidth="1.4" fill="none" /></svg>
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: t.ink }}>Sign in</span>
          <CarbonButton size="sm" variant="dark" icon={<span>→</span>}>Contact sales</CarbonButton>
        </div>
      </header>

      {/* Hero — diagram led */}
      <section style={{ padding: '64px 56px 88px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 28 }}>RECURRING PAYMENTS · ZA</div>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 92, lineHeight: 0.94,
            letterSpacing: '-0.045em', margin: 0,
          }}>
            Predictable recurring revenue, on rails.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 28, maxWidth: 540 }}>
            Recurv is the recurring payments API for South African businesses. Capture mandates,
            schedule collections, reconcile to the cent — through one API and one dashboard.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <CarbonButton size="lg" variant="dark">Talk to our team</CarbonButton>
            <CarbonButton size="lg" variant="secondary" icon={<span>→</span>}>Read the docs</CarbonButton>
          </div>
          <div className="mono" style={{ marginTop: 56, fontSize: 11, color: t.inkSoft, letterSpacing: 1, display: 'flex', gap: 24 }}>
            <span>PCI DSS L1</span><span>·</span><span>ISO 27001</span><span>·</span><span>SARB COMPLIANT</span>
          </div>
        </div>
        <div style={{ aspectRatio: '1', width: '100%' }}>
          <CarbonHeroDiagram accent={t.primary} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 56px 32px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
          <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
          <span className="mono">v3.2.1 · all systems operational</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { CarbonHomepage, CARBON, CarbonButton, CarbonHeroDiagram });
