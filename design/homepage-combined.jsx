// Homepage direction 4 — Combined: Studio Violet patterns on paper (#F6F5F0) bg.

// COMBINED extends STUDIO — paper bg, same primary
const COMBINED = {
  bg: '#F6F5F0',
  surface: '#FFFFFF',
  surfaceAlt: '#EDEAE0',
  surfaceDeep: '#0F0E14',
  ink: '#0F0E14',
  inkSoft: '#5B5969',
  inkOnDeep: '#F6F5F0',
  inkOnDeepSoft: 'rgba(246,245,240,0.65)',
  primary: '#4F33D9',
  primaryHover: '#3D24BD',
  onPrimary: '#FFFFFF',
  accent: '#E2DCF7',
  accentInk: '#251878',
  softTint: 'rgba(79,51,217,0.08)',
  success: '#1E7A4E',
  successBg: 'rgba(30,122,78,0.10)',
  warn: '#B45A1B',
  line: 'rgba(15,14,20,0.10)',
  lineStrong: 'rgba(15,14,20,0.20)',
  fontDisplay: '"Geist", system-ui, sans-serif',
  fontBody: '"Geist", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

function CombinedButton({ children, variant = 'primary', size = 'md', icon, style: extra, onClick }) {
  const t = COMBINED;
  const sizes = { sm: { padding: '9px 18px', fontSize: 14 }, md: { padding: '13px 22px', fontSize: 15 }, lg: { padding: '16px 28px', fontSize: 16 } };
  const variants = {
    primary: { background: t.ink, color: t.inkOnDeep, border: `1.5px solid ${t.ink}` },
    accent: { background: t.primary, color: '#fff', border: `1.5px solid ${t.primary}` },
    secondary: { background: 'transparent', color: t.ink, border: `1.5px solid ${t.lineStrong}` },
    ghost: { background: 'transparent', color: t.ink, border: '1.5px solid transparent' },
  };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 8,
      cursor: 'pointer', fontFamily: t.fontBody, fontWeight: 500, letterSpacing: '-0.01em',
      ...sizes[size], ...variants[variant], ...extra,
    }}>
      {children}{icon && <span>{icon}</span>}
    </button>
  );
}

function CombinedHomepage() {
  const t = COMBINED;

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>

      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '22px 56px', borderBottom: `1px solid ${t.line}`,
        background: t.bg,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center', fontSize: 14 }}>
          {[['Features', true], ['Industries', true], ['Pricing', false], ['Contact us', false]].map(([n, drop]) => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 450 }}>
              {n}{drop && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>}
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>Sign in</span>
          <CombinedButton size="sm">Book a live demo</CombinedButton>
        </div>
      </header>

      <section style={{ padding: '72px 56px 80px', background: t.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              {[
                { label: '98.7% avg collection rate', color: t.successBg, ink: t.success },
                { label: 'DebiCheck mandates', color: t.softTint, ink: t.primary },
                { label: 'SARB & PASA registered', color: t.softTint, ink: t.primary },
              ].map((b) => (
                <span key={b.label} className="mono" style={{ fontSize: 10, padding: '5px 12px', borderRadius: 4, background: b.color, color: b.ink, letterSpacing: 1.5 }}>{b.label}</span>
              ))}
            </div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 120, lineHeight: 0.9,
              letterSpacing: '-0.05em', margin: 0,
            }}>
              Money<br />that <span style={{ color: t.primary }}>arrives.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 520 }}>
              Recurv handles mandate capture, automated debit collections, and reconciliation for South African businesses. Stop chasing payments — start running your business.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
              <CombinedButton variant="accent" size="lg" icon={<span>→</span>}>Start collecting</CombinedButton>
              <CombinedButton variant="secondary" size="lg">See it live</CombinedButton>
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 32 }}>
              {[['R 2.4B+', 'collected annually'], ['98.7%', 'avg collection rate'], ['420+', 'active businesses']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, letterSpacing: '-0.03em' }}>{v}</div>
                  <div style={{ fontSize: 12, color: t.inkSoft, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <DashboardMock theme={t} />
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 56, alignItems: 'end', marginBottom: 48 }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>
            How<br /><span style={{ color: t.primary }}>Recurv works.</span>
          </h2>
          <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
            Three steps from signup to settled collections. Most businesses are live within two weeks — including mandate migration.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden', background: t.surface }}>
          {[
            { num: '01', icon: 'mandate', t: 'Capture mandates', d: 'Your subscribers sign authenticated DebiCheck mandates digitally — from your website, a QR code, or an email link. Zero paper.' },
            { num: '02', icon: 'schedule', t: 'Set your schedule', d: 'Define billing amounts, frequencies, and retry windows per membership tier. Once-off or recurring. Recurv handles the calendar.' },
            { num: '03', icon: 'cycle', t: 'Collections run themselves', d: 'Failed debits retry intelligently. Members get SMS nudges. You get a daily reconciliation report and the money in your account.' },
          ].map((f, i) => (
            <div key={f.num} style={{
              padding: '40px 36px',
              borderRight: i < 2 ? `1px solid ${t.line}` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <CarbonIcon name={f.icon} color={t.primary} size={44} />
                <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num} / 03</span>
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>{f.t}</div>
              <div style={{ fontSize: 14.5, color: t.inkSoft, lineHeight: 1.65 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{ background: t.surfaceDeep, borderRadius: 16, padding: '72px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.45)', letterSpacing: 1.5, marginBottom: 28 }}>CUSTOMER STORY</div>
              <p style={{ fontFamily: t.fontDisplay, fontSize: 32, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', color: t.inkOnDeep, margin: 0 }}>
                "We recovered R 180,000 in outstanding subscriptions in the first 90 days. Our finance team got their Mondays back."
              </p>
              <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(79,51,217,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: 16, fontWeight: 700, color: t.inkOnDeep }}>FD</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.inkOnDeep }}>Francois du Plessis</div>
                  <div style={{ fontSize: 13, color: t.inkOnDeepSoft }}>General Manager, Westlake Golf Club</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { v: 'R 180k', l: 'recovered in 90 days' },
                { v: '−94%', l: 'admin time saved' },
                { v: '98.7%', l: 'collection rate' },
                { v: '12 min', l: 'mandate time' },
              ].map((s) => (
                <div key={s.l} style={{
                  background: 'rgba(246,245,240,0.08)', border: '1px solid rgba(246,245,240,0.12)',
                  borderRadius: 10, padding: '24px 20px',
                }}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: t.inkOnDeep }}>{s.v}</div>
                  <div style={{ fontSize: 13, color: t.inkOnDeepSoft, marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, letterSpacing: '-0.035em', margin: 0 }}>
            Built for<br /><span style={{ color: t.primary }}>your industry.</span>
          </h2>
          <CombinedButton variant="secondary">See all industries →</CombinedButton>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            { icon: 'mandate', ind: 'Golf & country clubs', d: 'Member dues, levies, and green fees — tiered billing with full DebiCheck mandate management.', stat: '600+ clubs' },
            { icon: 'shield', ind: 'Medical & dental', d: 'Gap cover top-ups, payment plans, and co-payment collection. POPIA-compliant by design.', stat: '280+ practices' },
            { icon: 'people', ind: 'Sport & fitness', d: 'Monthly memberships and class-pass billing with automatic renewal and self-service portal.', stat: '340+ facilities' },
            { icon: 'globe', ind: 'Property & rentals', d: 'Rental collection, deposit management, and maintenance levy billing from one platform.', stat: '190+ portfolios' },
          ].map((f) => (
            <div key={f.ind} style={{
              background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, padding: '32px 32px',
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start',
            }}>
              <CarbonIcon name={f.icon} color={t.primary} size={40} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{f.ind}</div>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 4, background: t.softTint, color: t.primary, letterSpacing: 1.5 }}>{f.stat}</span>
                </div>
                <div style={{ fontSize: 14.5, color: t.inkSoft, lineHeight: 1.6, marginTop: 12 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 56px', background: t.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24 }}>GET STARTED</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 72, lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0 }}>
              Ready to stop<br /><span style={{ color: t.primary }}>chasing?</span>
            </h2>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.55, marginTop: 28 }}>
              Most businesses are live within two weeks. No contract lock-in. SA-based support team. We handle the mandate migration.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
              <CombinedButton variant="accent" size="lg" icon={<span>→</span>}>Book a demo</CombinedButton>
              <CombinedButton variant="secondary" size="lg">Talk to sales</CombinedButton>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['No setup fees', 'Pay per transaction only — no upfront costs.'], ['Cancel anytime', 'No contracts. Month-to-month only.'], ['SA-based team', '24/7 support from Cape Town.'], ['Migration included', 'We move your mandates. You just tell us when.']].map(([title, body]) => (
              <div key={title} style={{
                display: 'flex', gap: 20, padding: '20px 24px',
                background: t.surface, border: `1px solid ${t.line}`, borderRadius: 10,
              }}>
                <div style={{ width: 20, height: 20, borderRadius: 999, background: t.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 5-5" stroke={t.success} strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
                  <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 4 }}>{body}</div>
                </div>
              </div>
            ))}
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

Object.assign(window, { CombinedHomepage, COMBINED, CombinedButton });
