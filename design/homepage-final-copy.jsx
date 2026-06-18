// Homepage — final approved copy (v1, without Fully Configurable section).
// Built on COMBINED_WHITE theme. Hero: "Stop chasing payments." at 78px.

function FinalCopyHomepage() {
  const t = COMBINED_WHITE;

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>

      <header style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
        padding: '22px 56px', borderBottom: `1px solid ${t.line}`,
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
          <CombinedWhiteButton size="sm">Book a live demo</CombinedWhiteButton>
        </div>
      </header>

      <section style={{ padding: '72px 56px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: '98.7% avg collection rate', bg: t.successBg, color: t.success },
              { label: 'DebiCheck mandates', bg: t.softTint, color: t.primary },
              { label: 'SARB & PASA registered', bg: t.softTint, color: t.primary },
            ].map((b) => (
              <span key={b.label} className="mono" style={{ fontSize: 10, padding: '5px 12px', borderRadius: 4, background: b.bg, color: b.color, letterSpacing: 1.5 }}>{b.label}</span>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>EST. 2021 · CAPE TOWN, ZA</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 78, lineHeight: 0.96,
              letterSpacing: '-0.04em', margin: 0,
            }}>
              Stop chasing payments.<br />
              <span style={{ color: t.primary }}>Start running your business.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 28, maxWidth: 540 }}>
              Recurv handles mandate capture, automated debit collections, and reconciliation — so your team can focus on the business, not the arrears list.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, alignItems: 'center' }}>
              <CombinedWhiteButton variant="accent" size="lg" icon={<span>→</span>}>Start collecting</CombinedWhiteButton>
              <CombinedWhiteButton variant="secondary" size="lg">See it in action</CombinedWhiteButton>
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
        <div style={{ paddingTop: 56, display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56, alignItems: 'end', marginBottom: 48 }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
            The complete<br /><span style={{ color: t.primary }}>collections stack.</span>
          </h2>
          <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
            From first mandate to final settlement — every step automated, every rand accounted for.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden' }}>
          {[
            { num: '01', icon: 'mandate', t: 'Digital mandate capture', d: 'Authenticated DebiCheck mandates, signed in minutes. From a phone, kiosk, email, or QR code. Zero paper.', stat: '12 min', sl: 'avg mandate capture' },
            { num: '02', icon: 'schedule', t: 'Flexible billing schedules', d: 'Monthly dues, once-off charges, and levy splits — all on their own calendar. Recurv keeps track so you don't have to.', stat: '6 billing types', sl: 'one dashboard' },
            { num: '03', icon: 'cycle', t: 'Smart retry engine', d: 'Failed debits retry across an optimised window. Members get an SMS or WhatsApp nudge, not a call from your office.', stat: '+34%', sl: 'vs manual follow-up' },
            { num: '04', icon: 'graph', t: 'Real-time reconciliation', d: 'Same-day settlement with automated matching. Your accounting system stays in sync without a spreadsheet in sight.', stat: '1 click', sl: 'board report' },
            { num: '05', icon: 'people', t: 'Member self-service portal', d: 'Members manage their own mandate, bank account, and payment history. Your staff gets their time back.', stat: '−68%', sl: 'finance support queries' },
            { num: '06', icon: 'plug', t: 'Open API & integrations', d: 'REST API, webhooks, and connectors for Xero, Sage, Jonas Club Software, and 40+ SA platforms.', stat: '40+', sl: 'pre-built connectors' },
          ].map((f, i) => (
            <div key={f.num} style={{
              padding: '36px 32px',
              borderRight: i % 3 < 2 ? `1px solid ${t.line}` : 'none',
              borderBottom: i < 3 ? `1px solid ${t.line}` : 'none',
              background: t.surface,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CarbonIcon name={f.icon} color={t.primary} size={40} />
                <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</span>
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 6 }}>{f.t}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{f.d}</div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px dashed ${t.line}`, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 600, color: t.primary, letterSpacing: '-0.02em' }}>{f.stat}</span>
                <span style={{ fontSize: 12, color: t.inkSoft }}>{f.sl}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{ background: t.surfaceDeep, borderRadius: 16, padding: '72px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.45)', letterSpacing: 1.5, marginBottom: 28 }}>CUSTOMER STORY</div>
            <p style={{ fontFamily: t.fontDisplay, fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', color: t.inkOnDeep, margin: 0 }}>
              "We recovered R 180k in outstanding subs in 90 days. Our finance team got their Mondays back."
            </p>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: 'rgba(79,51,217,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: 16, fontWeight: 700, color: t.inkOnDeep }}>FD</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.inkOnDeep }}>Francois du Plessis</div>
                <div style={{ fontSize: 13, color: t.inkOnDeepSoft }}>General Manager, Westlake Golf Club</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[['R 180k', 'recovered in 90 days'], ['−94%', 'admin time'], ['98.7%', 'collection rate'], ['12 min', 'mandate time']].map(([v, l]) => (
              <div key={l} style={{ background: 'rgba(246,245,240,0.08)', border: '1px solid rgba(246,245,240,0.12)', borderRadius: 10, padding: '24px 20px' }}>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em', color: t.inkOnDeep }}>{v}</div>
                <div style={{ fontSize: 13, color: t.inkOnDeepSoft, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, textAlign: 'center', marginBottom: 56 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>BUILT FOR YOUR INDUSTRY</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, letterSpacing: '-0.035em', margin: 0 }}>
            One platform. Every collection type.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${t.line}` }}>
          {[
            { icon: 'mandate', ind: 'Golf & clubs', d: 'Member dues, levies, and green fees.' },
            { icon: 'shield', ind: 'Medical', d: 'Gap cover, payment plans, co-payments.' },
            { icon: 'people', ind: 'Sport & fitness', d: 'Memberships, class-passes, renewals.' },
            { icon: 'globe', ind: 'Property', d: 'Rental, deposit, levy billing.' },
          ].map((f, i) => (
            <div key={f.ind} style={{
              padding: '36px 28px', borderRight: i < 3 ? `1px solid ${t.line}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <CarbonIcon name={f.icon} color={t.primary} size={40} />
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{f.ind}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{
          background: t.surfaceAlt, borderRadius: 16, padding: '72px 80px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center',
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24 }}>GET STARTED</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.035em', margin: 0 }}>
              Live in two weeks.<br /><span style={{ color: t.primary }}>Mandates included.</span>
            </h2>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.55, marginTop: 24 }}>
              No contract. No setup fees. We migrate your mandates, handle member communication, and register your collections with the banks. You just tell us when to switch.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 14 }}>
              <CombinedWhiteButton variant="accent" size="lg" icon={<span>→</span>}>Book a live demo</CombinedWhiteButton>
              <CombinedWhiteButton variant="secondary" size="lg">Talk to sales</CombinedWhiteButton>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['No setup fees', 'Per-transaction only.'], ['No contract', 'Month-to-month.'], ['SA-based team', '24/7 support from Cape Town.'], ['Migration included', 'We move your mandates.']].map(([t_, b]) => (
              <div key={t_} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: t.surface, border: `1px solid ${t.line}`, borderRadius: 10 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="10" cy="10" r="9" fill={t.successBg} />
                  <path d="M6 10l3 3 5-5" stroke={t.success} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t_}</div>
                  <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 4 }}>{b}</div>
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
            <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
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

Object.assign(window, { FinalCopyHomepage });
