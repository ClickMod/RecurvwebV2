// Homepage variation 04b — "Combined · White"
// Same assembled patterns as 04, but on a pure-white surface and
// re-typeset with Display Bold (03) header sizes. Theme is Studio Violet
// with bg forced to white and the muted band reduced to a barely-there tint.

const COMBINED_WHITE = {
  ...STUDIO,
  bg: '#FFFFFF',          // pure white page
  surface: '#FFFFFF',
  surfaceAlt: '#F6F5F0',  // whisper-light band tint (keeps section rhythm)
};

function CombinedWhiteButton(props) { return <StudioButton {...props} />; }

function CombinedWhiteHomepage() {
  const t = COMBINED_WHITE;

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>

      {/* ── Nav ──────────────────────────────────────────── */}
      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '22px 56px', borderBottom: `1px solid ${t.line}`,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: 'flex', gap: 28, justifyContent: 'center', fontSize: 14, color: t.ink }}>
          {[['Features', true], ['Industries', true], ['Pricing', false], ['Contact us', false]].map(([n, drop]) => (
            <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 450 }}>
              {n}
              {drop && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>}
            </span>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 14 }}>Sign in</span>
          <CombinedWhiteButton size="sm">Book a live demo</CombinedWhiteButton>
        </div>
      </header>

      {/* ── Hero (Carbon 2-col + system diagram, Display Bold scale) ──────── */}
      <section style={{ padding: '64px 56px 96px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 28 }}>
            RECURRING PAYMENTS · ZA
          </div>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 200, lineHeight: 0.88,
            letterSpacing: '-0.055em', margin: 0,
          }}>
            Money that<br />
            <span style={{ color: t.primary }}>arrives.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 540 }}>
            Recurv automates recurring revenue for South African businesses. Capture mandates,
            schedule collections, reconcile every rand — through one platform.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <CombinedWhiteButton size="lg">Book a live demo</CombinedWhiteButton>
            <CombinedWhiteButton size="lg" variant="secondary" icon={<span>→</span>}>Speak to sales</CombinedWhiteButton>
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
      <footer style={{ borderTop: `1px solid ${t.line}` }}>
        <div style={{
          padding: '24px 56px 32px', borderTop: `1px solid ${t.line}`,
          display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            <span>Privacy</span><span>Terms</span>
            <span className="mono">All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { CombinedWhiteHomepage, COMBINED_WHITE });
