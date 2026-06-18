// Homepage variation 01 — "Studio Violet"
// Off-white surface, deep enterprise violet, editorial portrait photography,
// numbered features with carbon-style icons. Modern enterprise fintech.

const STUDIO = {
  key: 'studio',
  bg: '#F6F5F0',            // off-white, very subtle warmth
  surface: '#FFFFFF',
  surfaceAlt: '#EDEAE0',
  surfaceDeep: '#0F0E14',
  ink: '#0F0E14',
  inkSoft: '#5B5969',
  inkOnDeep: '#F6F5F0',
  inkOnDeepSoft: 'rgba(246,245,240,0.65)',
  primary: '#4F33D9',        // deep enterprise violet
  primaryHover: '#3D24BD',
  onPrimary: '#FFFFFF',
  softTint: 'rgba(79,51,217,0.08)',
  accent: '#E2DCF7',         // pale violet wash
  success: '#1E7A4E',
  successBg: 'rgba(30,122,78,0.10)',
  warn: '#B45A1B',
  line: 'rgba(15,14,20,0.10)',
  lineStrong: 'rgba(15,14,20,0.20)',
  fontDisplay: '"Geist", system-ui, sans-serif',
  fontBody: '"Geist", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

function StudioButton({ children, variant = 'primary', size = 'md', icon }) {
  const t = STUDIO;
  const sizes = { sm: { p: '9px 16px', f: 13 }, md: { p: '13px 22px', f: 14 }, lg: { p: '16px 28px', f: 15 } };
  const s = sizes[size];
  const styles = {
    primary: { background: t.ink, color: t.surface, border: `1px solid ${t.ink}` },
    accent: { background: t.primary, color: t.onPrimary, border: `1px solid ${t.primary}` },
    secondary: { background: 'transparent', color: t.ink, border: `1px solid ${t.lineStrong}` },
    ghost: { background: 'transparent', color: t.ink, border: 'none', padding: 0 },
  };
  return (
    <button style={{
      ...styles[variant],
      padding: variant === 'ghost' ? 0 : s.p, fontSize: s.f, borderRadius: 6,
      fontFamily: t.fontBody, fontWeight: 500, letterSpacing: '-0.005em',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
    }}>
      {children}
      {icon && <span aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>}
    </button>
  );
}

function StudioHomepage() {
  const t = STUDIO;
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>
      {/* Nav */}
      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '22px 56px', borderBottom: `1px solid ${t.line}`,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center', fontSize: 14, color: t.ink }}>
          {[
            ['Products', true], ['Solutions', true], ['Industries', true], ['Pricing', false], ['Company', true], ['Docs', false],
          ].map(([n, drop]) => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: t.ink, fontWeight: 450 }}>
              {n}
              {drop && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>}
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: t.ink }}>Sign in</span>
          <StudioButton size="sm">Contact sales</StudioButton>
        </div>
      </header>

      {/* Pre-hero label */}
      <div style={{ padding: '40px 56px 0' }}>
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
          PRODUCT / RECURRING PAYMENTS
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '24px 56px 96px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'end' }}>
        <div>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 88, lineHeight: 0.96,
            letterSpacing: '-0.04em', margin: 0,
          }}>
            Simple, reliable<br /> recurring payments.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: t.inkSoft, marginTop: 32, maxWidth: 620, fontWeight: 400 }}>
            Collect recurring revenue from members, patients, tenants and clients via
            automated debit orders. Recurv works with any South African bank, integrates
            with your existing finance stack, and gives you the dashboard you've been missing.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            <StudioButton size="lg">Talk to our team</StudioButton>
            <StudioButton size="lg" variant="secondary" icon={<span>→</span>}>See live demo</StudioButton>
          </div>
        </div>
        <PhotoSlot
          label="Editorial portrait — finance manager / business owner"
          caption="HERO · 1200 × 1500"
          tint={t.primary}
          bg="#1A1530"
          ratio="4 / 5"
          rounded={12}
          variant="spotlight"
        />
      </section>

      {/* Sub-hero block: built for enterprise scale */}
      <section style={{ padding: '0 56px 120px' }}>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 64 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, marginBottom: 64 }}>
            <div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1.0, letterSpacing: '-0.035em', margin: 0 }}>
                Recurring revenue, built for South African enterprise scale.
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Recurv is the recurring-revenue layer used by golf clubs, medical practices, sport unions and
                property managers across the country. One platform handles mandate capture, scheduling,
                collections, retries and reconciliation — at any volume, with the audit trail your accountant wants.
              </p>
            </div>
          </div>

          {/* 5 numbered features with carbon icons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderTop: `1px solid ${t.line}` }}>
            {[
              { num: '01', icon: 'mandate', t: 'Reduce admin burden', d: 'Automate mandate capture, scheduling and reconciliation. Manage everything from a single dashboard, with audit-grade records.' },
              { num: '02', icon: 'wallet', t: 'Collect with confidence', d: 'Bank-grade debit order rails with intelligent retry logic, automated reminders and zero manual chasing.' },
              { num: '03', icon: 'plug', t: 'Plug into any stack', d: 'Stand-alone dashboard, REST API, or both. Sync with Xero, Sage and your existing CRM in minutes.' },
              { num: '04', icon: 'shield', t: 'Secure by default', d: 'PCI DSS Level 1 certified. SARB-compliant rails. ISO-aligned data handling. No customer card data ever touches your servers.' },
              { num: '05', icon: 'graph', t: 'Built for insight', d: 'Forecast recurring revenue, monitor per-plan performance and export reconciled ledgers in a click.' },
            ].map((f, i) => (
              <div key={f.num} style={{
                padding: '32px 24px', borderRight: i < 4 ? `1px solid ${t.line}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <CarbonIcon name={f.icon} color={t.primary} size={44} />
                <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{f.t}</div>
                <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 56px 32px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
          <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
          <span className="mono">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { StudioHomepage, STUDIO, StudioButton });
