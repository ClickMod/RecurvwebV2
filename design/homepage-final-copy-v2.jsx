// Homepage 04 v2 — FINAL COPY + FULLY CONFIGURABLE
// Copy of Final 04 with the new "Fully Configurable" collection-configuration
// section inserted between RECURV CORE and the UNIFIED DASHBOARD section.
// Everything else is identical to Final 04.

function FinalCopyV2Button(props) { return <StudioButton {...props} />; }

function FinalCopyV2Homepage() {
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
          <FinalCopyV2Button size="sm">Book a live demo</FinalCopyV2Button>
        </div>
      </header>

      {/* ── Hero ──────── */}
      <section style={{ padding: '64px 56px 96px', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 28 }}>
            PAYMENT COLLECTIONS · ZA
          </div>
          <h1 style={{
            fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 78, lineHeight: 0.98,
            letterSpacing: '-0.04em', margin: 0,
          }}>
            Stop chasing payments.<br />
            <span style={{ color: t.primary }}>Start running your business.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 560 }}>
            Recurv handles the full collection cycle — from payment authorisation to reconciliation —
            across membership dues, payment plans, rent, subscriptions, and more. One platform, less admin,
            every rand accounted for.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <FinalCopyV2Button size="lg">Book a live demo</FinalCopyV2Button>
            {/* Secondary CTA — border: t.lineStrong at rest → t.primary (purple) on hover */}
            <FinalCopyV2Button size="lg" variant="secondary" icon={<span>→</span>}>Speak to sales</FinalCopyV2Button>
          </div>
          <div className="mono" style={{ marginTop: 48, fontSize: 11, color: t.inkSoft, letterSpacing: 1, display: 'flex', gap: 24 }}>
            <span>PCI DSS L1</span><span>·</span><span>ISO 27001</span><span>·</span><span>SARB COMPLIANT</span>
          </div>
          <div className="mono" style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${t.line}`, fontSize: 11, color: t.primary, letterSpacing: 1.5, display: 'flex', gap: 16 }}>
            <span>AUTHORISE</span><span style={{ color: t.inkSoft }}>·</span>
            <span>SCHEDULE</span><span style={{ color: t.inkSoft }}>·</span>
            <span>COLLECT</span><span style={{ color: t.inkSoft }}>·</span>
            <span>RECONCILE</span>
          </div>
        </div>
        <div style={{ aspectRatio: '1', width: '100%' }}>
          <CarbonHeroDiagram accent={t.primary} />
        </div>
      </section>

      {/* ── Studio split intro + 5-up numbered feature row ──────────────── */}
      <section style={{ padding: '0 56px 120px' }}>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 64 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, marginBottom: 64 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>RECURV CORE</div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1.0, letterSpacing: '-0.035em', margin: 0 }}>
                Payment operations, built for <span style={{ color: t.primary }}>South African enterprise scale.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Recurv is the payment collection layer trusted by golf clubs, medical practices, sport unions, and
                property managers across the country. One platform handles authorisation capture, scheduling,
                collections, retries, and reconciliation — for any payment structure, at any volume, with the
                audit trail your accountant actually wants.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderTop: `1px solid ${t.line}` }}>
            {[
              { num: '01', icon: 'mandate', t: 'Cut the admin', d: 'Automate authorisation capture, payment scheduling, and bank reconciliation. What used to take your team hours happens in the background — with a single dashboard and complete audit-grade records.' },
              { num: '02', icon: 'wallet', t: 'Collect with confidence', d: 'Bank-grade rails with intelligent retry logic, automated reminders, and zero manual chasing. Whether you collect on the 1st, the 25th, or at the end of every term — Recurv handles it.' },
              { num: '03', icon: 'plug', t: 'Plug into any stack', d: 'Standalone dashboard, REST API, or both. Connect to Xero, Sage, and your existing CRM in minutes. No ripping out what already works.' },
              { num: '04', icon: 'shield', t: 'Secure by default', d: 'PCI DSS Level 1 certified. SARB-compliant rails. ISO-aligned data handling. Customer banking details are tokenised on capture and never stored in plaintext — by us, or by you.' },
              { num: '05', icon: 'graph', t: 'Built for insight', d: 'See exactly what\'s been collected, what\'s pending, and what needs attention. Forecast cashflow, monitor plan performance, and export a reconciled ledger in one click.' },
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

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 96, lineHeight: 0.94, letterSpacing: '-0.045em', margin: 0 }}>
              More revenue.<br /><span style={{ color: t.primary }}>Less admin.</span>
            </h2>
            <p style={{ fontSize: 19, color: t.inkSoft, lineHeight: 1.55, marginTop: 24, maxWidth: 540 }}>
              Connect with our team to see Recurv in action. We'll walk you through pricing, integrations,
              and a tailored setup for your industry — usually in 30 minutes or less.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <FinalCopyV2Button size="lg">Book a live demo</FinalCopyV2Button>
            {/* Secondary CTA — border: t.lineStrong at rest → t.primary (purple) on hover */}
            <FinalCopyV2Button size="lg" variant="secondary" icon={<span>→</span>}>Speak to sales</FinalCopyV2Button>
            <div style={{ marginTop: 12, fontSize: 13, color: t.inkSoft }}>
              Or email <span style={{ color: t.ink, fontWeight: 600 }}>sales@recurv.tech</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───── */}
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

Object.assign(window, { FinalCopyV2Homepage });
