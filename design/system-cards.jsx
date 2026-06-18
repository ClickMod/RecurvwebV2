// Design system spec sheet components — SystemCard, Swatch, TokenRow.
// Used in app.jsx to render per-direction spec artboards.

function Swatch({ color, name, hex, size = 64 }) {
  const t = COMBINED_WHITE;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 100 }}>
      <div style={{
        width: size, height: size, borderRadius: 8,
        background: color,
        border: `1px solid rgba(15,14,20,0.12)`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }} />
      <div style={{ fontSize: 13, fontWeight: 500, color: t.ink }}>{name}</div>
      <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1 }}>{hex}</div>
    </div>
  );
}

function TokenRow({ token, value, type }) {
  const t = COMBINED_WHITE;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr', gap: 16,
      padding: '12px 0', borderBottom: `1px solid ${t.line}`, alignItems: 'center',
    }}>
      <div className="mono" style={{ fontSize: 12, color: t.ink, letterSpacing: 0.5 }}>{token}</div>
      <div className="mono" style={{ fontSize: 12, color: t.primary }}>{value}</div>
      <div style={{ fontSize: 12, color: t.inkSoft }}>{type}</div>
    </div>
  );
}

function SystemCard({ theme: tt, name, hero, vibe, radius, palette, components }) {
  const t = tt || COMBINED_WHITE;

  const radiusMap = { sharp: '0px', soft: '8px', pill: '999px' };
  const borderRadius = radiusMap[radius] || '8px';

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, padding: '64px 56px', width: '100%' }}>

      <div style={{ marginBottom: 48 }}>
        <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>
          DESIGN SYSTEM SPEC · {name.toUpperCase()}
        </div>
        <div style={{
          fontFamily: t.fontDisplay, fontSize: 80, fontWeight: 500,
          lineHeight: 0.9, letterSpacing: '-0.045em', margin: 0,
        }}>{hero}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>VIBE &amp; POSITIONING</div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: t.ink, margin: 0 }}>{vibe}</p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>RADIUS TOKEN · <span style={{ color: t.primary }}>{radius} · {borderRadius}</span></div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
            {['sm', 'md', 'lg'].map((s) => (
              <div key={s} style={{
                padding: s === 'sm' ? '8px 16px' : s === 'md' ? '12px 22px' : '16px 28px',
                background: t.primary, color: '#fff',
                borderRadius, fontSize: s === 'sm' ? 13 : s === 'md' ? 14 : 15,
                fontFamily: t.fontBody, fontWeight: 500,
              }}>{s} button</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 20 }}>COLOUR PALETTE</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {palette.map((sw) => <Swatch key={sw.name} {...sw} />)}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 20 }}>TYPE SCALE</div>
          {[
            { label: 'Display / Hero', size: 48, weight: 500, sample: 'Money that arrives.' },
            { label: 'Heading 1', size: 32, weight: 500, sample: 'Stop chasing payments.' },
            { label: 'Heading 2', size: 24, weight: 500, sample: 'How Recurv works.' },
            { label: 'Body Large', size: 19, weight: 400, sample: 'Automated debit collections for South African businesses.' },
            { label: 'Body', size: 15, weight: 400, sample: 'Failed collections retry intelligently across your window.' },
            { label: 'Caption / Mono', size: 11, weight: 400, sample: 'PCI DSS L1 · ISO 27001 · SARB REGISTERED', mono: true },
          ].map((ts) => (
            <div key={ts.label} style={{ marginBottom: 20 }}>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 6 }}>{ts.label} · {ts.size}px / {ts.weight}</div>
              <div style={{
                fontFamily: ts.mono ? t.fontMono : t.fontDisplay,
                fontSize: ts.size, fontWeight: ts.weight,
                letterSpacing: ts.size >= 40 ? '-0.04em' : ts.size >= 24 ? '-0.025em' : 0,
                color: t.ink, lineHeight: 1.1,
              }}>{ts.sample}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 20 }}>COMPONENTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>BUTTONS</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                {components.buttons}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>BADGES &amp; LABELS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {components.badges}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>SPACING TOKENS</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                {[4, 8, 12, 16, 24, 32, 48, 64].map((sp) => (
                  <div key={sp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: sp / 2, height: sp / 2, background: t.primary, borderRadius: 2 }} />
                    <span className="mono" style={{ fontSize: 9, color: t.inkSoft }}>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>ICONS (CARBON GEOMETRIC)</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                {['mandate', 'schedule', 'wallet', 'graph', 'shield', 'cycle', 'plug', 'bolt', 'lock', 'globe', 'split', 'people'].map((icon) => (
                  <CarbonIcon key={icon} name={icon} color={t.primary} size={28} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 16 }}>KEY DESIGN TOKENS</div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr', gap: 16, paddingBottom: 10, borderBottom: `1px solid ${t.lineStrong}`, marginBottom: 4 }}>
            <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>TOKEN</span>
            <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>VALUE</span>
            <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>TYPE</span>
          </div>
          {[
            ['--color-bg', t.bg || '#F6F5F0', 'Colour'],
            ['--color-surface', t.surface || '#FFFFFF', 'Colour'],
            ['--color-primary', t.primary, 'Colour'],
            ['--color-ink', t.ink, 'Colour'],
            ['--color-ink-soft', t.inkSoft, 'Colour'],
            ['--font-display', 'Geist', 'Font family'],
            ['--font-mono', 'JetBrains Mono', 'Font family'],
            ['--radius-base', borderRadius, 'Border radius'],
            ['--spacing-page', '56px', 'Spacing'],
          ].map(([token, value, type]) => (
            <TokenRow key={token} token={token} value={value} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SystemCard, Swatch, TokenRow });
