// Recurv Design System — extracted from page 04b "Combined · White".
// Studio Violet on a pure-white surface, Geist + JetBrains Mono, Carbon-style
// outlined icons.

const DS = {
  ...STUDIO,
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F6F5F0',
  violetSoft: '#A89BF0',
};

const PAGE = 1280;
const GUTTER = 72;

function Block({ no, label, title, intro, children, alt }) {
  const t = DS;
  return (
    <section style={{
      padding: `96px ${GUTTER}px`,
      borderTop: `1px solid ${t.line}`,
      background: alt ? t.surfaceAlt : t.surface,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 64 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
            {no} — {label}
          </div>
          <h2 style={{
            fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 40, lineHeight: 1.0,
            letterSpacing: '-0.035em', margin: '18px 0 0',
          }}>{title}</h2>
          {intro && (
            <p style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, marginTop: 18, maxWidth: 280 }}>
              {intro}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Swatch({ color, name, token, hex, on, note, border }) {
  const t = DS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        background: color, height: 96, borderRadius: 10,
        border: border ? `1px solid ${t.line}` : 'none',
        display: 'flex', alignItems: 'flex-end', padding: 12,
      }}>
        {on && <span style={{ color: on, fontFamily: t.fontMono, fontSize: 11 }}>Aa</span>}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
        <div className="mono" style={{ fontSize: 10.5, color: t.inkSoft, marginTop: 4 }}>{hex}</div>
        <div className="mono" style={{ fontSize: 10.5, color: t.primary, marginTop: 2 }}>{token}</div>
        {note && <div style={{ fontSize: 11.5, color: t.inkSoft, marginTop: 6, lineHeight: 1.45 }}>{note}</div>}
      </div>
    </div>
  );
}

function DesignSystemDoc() {
  const t = DS;

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: PAGE }}>
      <header style={{ padding: `56px ${GUTTER}px 0` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo color={t.ink} accent={t.primary} />
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>RECURV · DESIGN SYSTEM · v01 · 2026</div>
        </div>
      </header>

      <section style={{ padding: `72px ${GUTTER}px 88px` }}>
        <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 28 }}>SOURCE · PAGE 04B — COMBINED · WHITE</div>
        <h1 style={{
          fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 132, lineHeight: 0.86,
          letterSpacing: '-0.055em', margin: 0,
        }}>
          Studio Violet,<br /><span style={{ color: t.primary }}>on white.</span>
        </h1>
      </section>

      <Block no="01" label="COLOR" title="One accent, three surfaces."
        intro="Restraint is the rule. A single violet does all the accent work; everything else is ink, white and barely-there warm tint.">
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 18 }}>CORE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <Swatch color={t.primary} name="Primary violet" token="--primary" hex="#4F33D9" on="#fff" note="Accent text, links, key actions." />
          <Swatch color={t.ink} name="Ink" token="--ink" hex="#0F0E14" on="#fff" note="Headings, body, default buttons." />
          <Swatch color={t.inkSoft} name="Ink soft" token="--ink-soft" hex="#5B5969" on="#fff" note="Secondary copy, metadata." />
          <Swatch color={t.surface} name="Surface" token="--surface" hex="#FFFFFF" border note="The page. Pure white." />
        </div>
      </Block>

      <Block no="02" label="TYPOGRAPHY" title="Geist, set big and tight." alt
        intro="Display and body are one family — Geist. JetBrains Mono carries every label and status.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ border: `1px solid ${t.line}`, borderRadius: 12, padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 16 }}>DISPLAY / BODY · GEIST</div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 88, fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 0.92 }}>Aa</div>
          </div>
          <div style={{ border: `1px solid ${t.line}`, borderRadius: 12, padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 16 }}>MONO · JETBRAINS MONO</div>
            <div className="mono" style={{ fontSize: 88, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.92 }}>Aa</div>
          </div>
        </div>
      </Block>

      <Block no="03" label="ICONOGRAPHY" title="One stroke, one canvas."
        intro="Outlined geometric icons on a 48px canvas, 1.6px stroke, round joins, single color.">
        <div style={{
          background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, padding: '32px 28px',
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 28,
        }}>
          {['mandate', 'schedule', 'wallet', 'graph', 'shield', 'cycle', 'people', 'plug', 'lock', 'bolt', 'split', 'globe'].map((n) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <CarbonIcon name={n} color={t.primary} size={40} />
              <div className="mono" style={{ fontSize: 9.5, color: t.inkSoft, letterSpacing: 0.5 }}>{n}</div>
            </div>
          ))}
        </div>
      </Block>

      <footer style={{ borderTop: `1px solid ${t.line}`, padding: `28px ${GUTTER}px 40px`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: t.inkSoft }}>
        <span>Recurv Design System · derived from page 04b "Combined · White" · © 2026</span>
        <div className="mono">GEIST · JETBRAINS MONO · #4F33D9</div>
      </footer>
    </div>
  );
}

Object.assign(window, { DesignSystemDoc, DS });
