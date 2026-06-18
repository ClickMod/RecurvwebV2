// Homepage direction 3 — Display Bold: type-led, maximalist, pill buttons.

const BOLD = {
  bg: '#FBFAF6',
  surface: '#FFFFFF',
  surfaceAlt: '#EFECE3',
  surfaceDeep: '#0A0712',
  ink: '#0A0712',
  inkSoft: '#5C5766',
  inkOnDeep: '#F6F5F0',
  inkOnDeepSoft: 'rgba(246,245,240,0.65)',
  primary: '#5C39F2',
  primaryHover: '#4929D5',
  onPrimary: '#FFFFFF',
  accent: '#D7CEFB',
  accentInk: '#2D1A8F',
  softTint: 'rgba(92,57,242,0.10)',
  success: '#1E7A4E',
  successBg: 'rgba(30,122,78,0.10)',
  warn: '#B45A1B',
  line: 'rgba(10,7,18,0.10)',
  lineStrong: 'rgba(10,7,18,0.20)',
  fontDisplay: '"Geist", system-ui, sans-serif',
  fontBody: '"Geist", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

function BoldButton({ children, variant = 'primary', size = 'md', icon, style: extraStyle, onClick }) {
  const t = BOLD;
  const sizes = { sm: { padding: '9px 18px', fontSize: 14 }, md: { padding: '13px 24px', fontSize: 15 }, lg: { padding: '16px 30px', fontSize: 16 } };
  const variants = {
    primary: { background: t.ink, color: t.inkOnDeep, border: `1.5px solid ${t.ink}` },
    accent: { background: t.primary, color: '#fff', border: `1.5px solid ${t.primary}` },
    secondary: { background: 'transparent', color: t.ink, border: `1.5px solid ${t.ink}` },
    ghost: { background: 'transparent', color: t.ink, border: '1.5px solid transparent' },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999,
      cursor: 'pointer', fontFamily: t.fontBody, fontWeight: 500, letterSpacing: '-0.01em',
      ...sizes[size], ...variants[variant], ...extraStyle,
    }}>
      {children}{icon && <span>{icon}</span>}
    </button>
  );
}

function BoldHomepage() {
  const t = BOLD;

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>

      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '24px 56px', borderBottom: `1px solid ${t.line}`,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center', fontSize: 14 }}>
          {[['Features', true], ['Industries', true], ['Pricing', false], ['Contact us', false]].map(([n, drop]) => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 450 }}>
              {n}{drop && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>}
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <BoldButton variant="ghost" size="sm">Sign in</BoldButton>
          <BoldButton variant="accent" size="sm">Book a demo →</BoldButton>
        </div>
      </header>

      <section style={{ padding: '40px 56px 0', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              ['PCI DSS L1', t.successBg, t.success],
              ['DebiCheck', t.softTint, t.primary],
              ['SARB registered', t.softTint, t.primary],
            ].map(([label, bg, color]) => (
              <span key={label} className="mono" style={{ fontSize: 11, padding: '6px 12px', borderRadius: 999, background: bg, color, letterSpacing: 1.2 }}>{label}</span>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
            EST. 2021 · CAPE TOWN, ZA
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 200, lineHeight: 0.86,
            letterSpacing: '-0.055em', margin: 0, color: t.ink,
          }}>
            Money<br />that <span style={{ color: t.primary }}>arrives.</span>
          </h1>
          <div style={{ position: 'absolute', right: 0, bottom: 0, maxWidth: 480 }}>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: t.inkSoft, margin: 0 }}>
              Recurv handles mandate capture, automated debit collections, and payment reconciliation for South African businesses. Stop chasing — start running.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <BoldButton variant="accent" size="lg" icon="→">Start collecting</BoldButton>
              <BoldButton variant="secondary" size="lg">See it live</BoldButton>
            </div>
          </div>
        </div>

        <div style={{ height: 480, marginTop: 40, position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
          <DashboardMock theme={t} />
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { icon: 'mandate', num: '01', t: 'Digital mandate capture', d: 'DebiCheck mandates signed in under 12 minutes. Zero paper. Works from a phone, kiosk, or email link.', stat: '12 min', sl: 'avg mandate time' },
            { icon: 'cycle', num: '02', t: 'Smart retry engine', d: 'Failed collections retry across an optimised window. WhatsApp nudges, not call-centre hassle.', stat: '+34%', sl: 'recovery lift' },
            { icon: 'graph', num: '03', t: 'Live reconciliation', d: 'Same-day settlement with automated matching against your subscriber ledger. No more Monday morning spreadsheets.', stat: '1 click', sl: 'board report' },
            { icon: 'plug', num: '04', t: 'Plug into anything', d: 'Open REST API, webhooks, and connectors for Xero, Sage, Jonas Club Software, and 40+ SA platforms.', stat: '40+', sl: 'integrations' },
          ].map((f, i) => (
            <div key={f.num} style={{
              padding: '40px 32px',
              borderRight: i < 3 ? `1px solid ${t.line}` : 'none',
            }}>
              <CarbonIcon name={f.icon} color={t.primary} size={44} />
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginTop: 24, marginBottom: 14 }}>{f.num}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 14 }}>{f.t}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{f.d}</div>
              <div style={{ marginTop: 24, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontFamily: t.fontDisplay, fontSize: 30, fontWeight: 700, color: t.primary, letterSpacing: '-0.03em' }}>{f.stat}</span>
                <span style={{ fontSize: 12, color: t.inkSoft }}>{f.sl}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${t.line}`, background: t.surfaceDeep }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 88, lineHeight: 0.9, letterSpacing: '-0.045em', margin: 0, color: t.inkOnDeep, maxWidth: 900 }}>
            The infrastructure<br />South Africa runs on.
          </h2>
          <BoldButton variant="secondary" size="lg" style={{ color: t.inkOnDeep, borderColor: 'rgba(246,245,240,0.3)', alignSelf: 'flex-end' }}>See the platform</BoldButton>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { tag: 'MANDATE', headline: 'R 2.4B+', sub: 'in mandates collected', detail: 'DebiCheck & NAEDO. Authenticated at source. All 8 SA banks.' },
            { tag: 'RETENTION', headline: '98.7%', sub: 'avg collection rate', detail: 'Smart retry windows reduce failure. WhatsApp nudges close the gap.' },
            { tag: 'CLIENTS', headline: '420+', sub: 'active businesses', detail: 'Golf clubs, medical practices, schools, and subscription brands.' },
          ].map((s) => (
            <div key={s.tag} style={{
              background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.12)',
              borderRadius: 12, padding: '36px 32px',
            }}>
              <div className="mono" style={{ fontSize: 10, color: 'rgba(246,245,240,0.45)', letterSpacing: 1.5, marginBottom: 20 }}>{s.tag}</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 64, fontWeight: 700, letterSpacing: '-0.04em', color: t.inkOnDeep, lineHeight: 1 }}>{s.headline}</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,240,0.55)', marginTop: 8 }}>{s.sub}</div>
              <div style={{ fontSize: 14, color: 'rgba(246,245,240,0.45)', marginTop: 16, lineHeight: 1.55 }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24 }}>INDUSTRIES</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 64, lineHeight: 0.93, letterSpacing: '-0.04em', margin: 0 }}>
              Built for how <span style={{ color: t.primary }}>your sector</span> collects.
            </h2>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.55, marginTop: 28 }}>
              Different industries have radically different billing patterns. Recurv adapts — not the other way around.
            </p>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Golf & country clubs', 'Tiered memberships, levies, green fees — one dashboard.'],
                ['Medical & dental practices', 'Gap cover, co-payment plans, and medical-aid top-ups.'],
                ['Sport & fitness clubs', 'Automatic membership renewal with self-service portal.'],
                ['Property & rentals', 'Rental collection, deposit management, and lease billing.'],
              ].map(([ind, desc]) => (
                <div key={ind} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  paddingBottom: 16, borderBottom: `1px solid ${t.line}`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 999, background: t.primary, marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{ind}</div>
                    <div style={{ fontSize: 14, color: t.inkSoft, marginTop: 4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <BoldButton variant="accent" size="lg" style={{ marginTop: 32 }}>See all industries →</BoldButton>
          </div>
          <div style={{ background: t.surfaceAlt, borderRadius: 16, overflow: 'hidden', height: 480 }}>
            <PhotoSlot label="Recurv dashboard on a tablet" tint={t.primary} ratio="3 / 4" variant="grid" rounded={0} />
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${t.line}` }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>WHAT THEY SAY</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 80, lineHeight: 0.92, letterSpacing: '-0.045em', margin: 0 }}>
            Built for people<br />who chase <span style={{ color: t.primary }}>results.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            { quote: 'Recurv recovered R 180k in outstanding subscriptions in our first 90 days. Our finance team got their Mondays back.', name: 'Francois du Plessis', title: 'GM, Westlake Golf Club' },
            { quote: 'We went from 78% to 96% collection rate within two billing cycles. The DebiCheck migration was handled end-to-end by Recurv's team.', name: 'Dr Naledi Khumalo', title: 'Practice Manager, Sandton Medics' },
          ].map((q) => (
            <div key={q.name} style={{
              background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, padding: '40px 36px',
            }}>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 28, color: t.ink }}>
                "{q.quote}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999, background: t.softTint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.fontDisplay, fontSize: 16, fontWeight: 700, color: t.primary,
                }}>{q.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{q.name}</div>
                  <div style={{ fontSize: 13, color: t.inkSoft }}>{q.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 56px', background: t.bg }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 160, lineHeight: 0.86, letterSpacing: '-0.055em', margin: 0 }}>
            Stop chasing.<br /><span style={{ color: t.primary }}>Start growing.</span>
          </h2>
          <p style={{ fontSize: 19, color: t.inkSoft, lineHeight: 1.55, marginTop: 32, maxWidth: 560, margin: '32px auto 0' }}>
            Most businesses are live in two weeks. Mandate migration included, no contract lock-in, SA-based support team.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center' }}>
            <BoldButton variant="accent" size="lg" icon="→">Book a demo</BoldButton>
            <BoldButton variant="secondary" size="lg">Talk to sales</BoldButton>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${t.line}`, padding: '32px 56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Logo color={t.ink} accent={t.primary} size={20} />
            <span>© 2026 Recurv.Tech Pty Ltd · 🇿🇦</span>
            <a href="https://clickmod.co.za/" target="_blank" rel="noopener noreferrer" style={{ color: t.inkSoft, textDecoration: 'none' }}>
              Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
            </a>
          </div>
          <span className="mono">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { BoldHomepage, BOLD, BoldButton });
