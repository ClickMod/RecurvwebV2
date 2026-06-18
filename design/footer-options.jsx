// Footer option explorations — FooterA (current), FooterB (editorial wordmark), FooterC (dark inverted).
// Renders FooterReview into document.getElementById('footer-root').

const FOOTER_THEME = COMBINED_WHITE;

function FooterA({ theme: t = FOOTER_THEME }) {
  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.line}`, fontFamily: t.fontBody }}>
      <div style={{ padding: '72px 56px 56px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'end', borderBottom: `1px solid ${t.line}` }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>STAY IN THE LOOP</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.98, letterSpacing: '-0.035em', margin: 0, maxWidth: 560 }}>
            Field notes on recurring revenue, <span style={{ color: t.primary }}>once a month.</span>
          </h2>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 18px', border: `1px solid ${t.lineStrong}`, borderRadius: 8, fontSize: 15, color: t.inkSoft, height: 52 }}>
              you@company.co.za
            </div>
            <CombinedWhiteButton size="lg">Subscribe</CombinedWhiteButton>
          </div>
          <div style={{ fontSize: 12.5, color: t.inkSoft, marginTop: 14, lineHeight: 1.5 }}>
            No spam. Unsubscribe anytime. Read by 2,400+ finance teams.
          </div>
        </div>
      </div>

      <div style={{ padding: '48px 56px 40px', display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 48 }}>
        <div>
          <Logo color={t.ink} accent={t.primary} />
          <p style={{ fontSize: 13.5, color: t.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 280 }}>Recurring revenue infrastructure for South African businesses.</p>
          <div style={{ marginTop: 22, display: 'flex', gap: 8 }}>
            {['PCI DSS L1', 'ISO 27001', 'SARB'].map((b) => (
              <span key={b} className="mono" style={{ fontSize: 11, padding: '4px 8px', border: `1px solid ${t.line}`, borderRadius: 4, color: t.inkSoft }}>{b}</span>
            ))}
          </div>
        </div>
        {[
          ['Product', ['Recurring payments', 'Mandate capture', 'Self-service portal', 'Dashboard', 'API & docs']],
          ['Solutions', ['Golf & sport', 'Medical', 'Property & rentals', 'Subscriptions']],
          ['Company', ['About', 'Careers', 'Blog', 'Contact', 'Security']],
          ['Resources', ['Calculator', 'Guides', 'Changelog', 'Status', 'Legal']],
        ].map(([h, items]) => (
          <div key={h}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 14 }}>{h.toUpperCase()}</div>
            <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((it) => <li key={it} style={{ fontSize: 14, color: t.ink }}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 56px 0', overflow: 'hidden' }}>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 286, lineHeight: 0.8, letterSpacing: '-0.05em', color: t.ink, whiteSpace: 'nowrap' }}>
          Recurv<span style={{ color: t.primary }}>.</span>
        </div>
      </div>

      <div style={{ padding: '24px 56px 32px', borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
          <a href="https://clickmod.co.za/" target="_blank" rel="noopener noreferrer" style={{ color: t.inkSoft, textDecoration: 'none' }}>
            Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
          </a>
        </div>
        <div style={{ display: 'flex', gap: 22 }}><span>Privacy</span><span>Terms</span><span className="mono">All systems operational</span></div>
      </div>
    </footer>
  );
}

function FooterB({ theme: t = FOOTER_THEME }) {
  return (
    <footer style={{ background: t.surfaceAlt, borderTop: `1px solid ${t.line}`, fontFamily: t.fontBody }}>
      <div style={{ padding: '64px 56px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 40 }}>
        <div style={{ gridColumn: 'span 2' }}>
          <Logo color={t.ink} accent={t.primary} />
          <p style={{ fontSize: 15, color: t.inkSoft, marginTop: 20, lineHeight: 1.6, maxWidth: 320 }}>
            Recurring revenue infrastructure for South African businesses. Mandate capture to final settlement.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['PCI DSS L1', 'ISO 27001', 'SARB', 'POPIA'].map((b) => (
              <span key={b} className="mono" style={{ fontSize: 11, padding: '5px 10px', border: `1px solid ${t.line}`, borderRadius: 4, color: t.inkSoft, background: t.surface }}>{b}</span>
            ))}
          </div>
        </div>
        {[
          ['Product', ['Payments', 'Mandates', 'Portal', 'Dashboard', 'API']],
          ['Solutions', ['Golf clubs', 'Medical', 'Property', 'Fitness']],
          ['Company', ['About', 'Blog', 'Careers', 'Contact', 'Security']],
        ].map(([h, items]) => (
          <div key={h}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 16 }}>{h.toUpperCase()}</div>
            <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((it) => <li key={it} style={{ fontSize: 14, color: t.ink }}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 56px', marginTop: 48, overflow: 'hidden', borderTop: `1px solid ${t.line}` }}>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 220, lineHeight: 0.82, letterSpacing: '-0.06em', color: t.ink, whiteSpace: 'nowrap', opacity: 0.08, userSelect: 'none' }}>
          RECURV
        </div>
      </div>

      <div style={{ padding: '20px 56px 32px', borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
        <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
        <div style={{ display: 'flex', gap: 22 }}><span>Privacy</span><span>Terms</span><span className="mono">All systems operational</span></div>
      </div>
    </footer>
  );
}

function FooterC({ theme: t = FOOTER_THEME }) {
  const dark = t.surfaceDeep;
  const on = t.inkOnDeep;
  const onSoft = t.inkOnDeepSoft;
  const border = 'rgba(246,245,240,0.10)';

  return (
    <footer style={{ background: dark, borderTop: `1px solid ${border}`, fontFamily: t.fontBody }}>
      <div style={{ padding: '64px 56px 48px', display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: 48, borderBottom: `1px solid ${border}` }}>
        <div>
          <Logo color={on} accent={t.primary} />
          <p style={{ fontSize: 14, color: onSoft, marginTop: 20, lineHeight: 1.65, maxWidth: 280 }}>
            Recurring revenue infrastructure for South African businesses.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['PCI DSS L1', 'ISO 27001', 'SARB'].map((b) => (
              <span key={b} className="mono" style={{ fontSize: 10, padding: '4px 8px', border: `1px solid ${border}`, borderRadius: 4, color: onSoft, letterSpacing: 1 }}>{b}</span>
            ))}
          </div>
        </div>
        {[
          ['Product', ['Recurring payments', 'Mandate capture', 'Self-service portal', 'Dashboard', 'API & docs']],
          ['Solutions', ['Golf & sport', 'Medical', 'Property & rentals', 'Subscriptions']],
          ['Company', ['About', 'Careers', 'Blog', 'Contact', 'Security']],
          ['Resources', ['Calculator', 'Guides', 'Changelog', 'Status', 'Legal']],
        ].map(([h, items]) => (
          <div key={h}>
            <div className="mono" style={{ fontSize: 11, color: onSoft, letterSpacing: 1.5, marginBottom: 16, opacity: 0.6 }}>{h.toUpperCase()}</div>
            <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map((it) => <li key={it} style={{ fontSize: 14, color: on }}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ padding: '24px 56px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: onSoft }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
          <a href="https://clickmod.co.za/" target="_blank" rel="noopener noreferrer" style={{ color: onSoft, textDecoration: 'none' }}>
            Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
          </a>
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          <span>Privacy</span><span>Terms</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: t.success, display: 'inline-block' }} />
            <span className="mono" style={{ letterSpacing: 1 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterReview() {
  const t = COMBINED_WHITE;
  const [active, setActive] = React.useState('A');
  const options = [['A', 'Current: editorial wordmark'], ['B', 'Oversized wordmark watermark'], ['C', 'Inverted dark footer']];

  return (
    <div style={{ background: t.surfaceAlt, fontFamily: t.fontBody }}>
      <div style={{ padding: '32px 56px', borderBottom: `1px solid ${t.line}`, display: 'flex', gap: 16, alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>FOOTER OPTIONS ·</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {options.map(([key, label]) => (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: t.fontBody, fontSize: 13, fontWeight: 500,
              background: active === key ? t.ink : 'transparent',
              color: active === key ? t.inkOnDeep : t.ink,
              border: `1px solid ${active === key ? t.ink : t.line}`,
            }}>{key} · {label}</button>
          ))}
        </div>
      </div>
      {active === 'A' && <FooterA />}
      {active === 'B' && <FooterB />}
      {active === 'C' && <FooterC />}
    </div>
  );
}

if (document.getElementById('footer-root')) {
  ReactDOM.createRoot(document.getElementById('footer-root')).render(<FooterReview />);
}

Object.assign(window, { FooterA, FooterB, FooterC, FooterReview });
