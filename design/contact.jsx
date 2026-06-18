// Contact page — built on the new Recurv design system (Studio Violet on white).

function ContactPage() {
  const t = COMBINED_WHITE;

  const Field = ({ label, children, span = 1, optional }) => (
    <label style={{ gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: t.inkSoft, display: 'flex', justifyContent: 'space-between' }}>
        <span>{label.toUpperCase()}</span>
        {optional && <span style={{ color: t.inkSoft, opacity: 0.7 }}>OPTIONAL</span>}
      </span>
      {children}
    </label>
  );

  const inputStyle = {
    fontFamily: t.fontBody,
    fontSize: 15,
    padding: '14px 16px',
    background: t.surface,
    border: `1px solid ${t.line}`,
    borderRadius: 8,
    color: t.ink,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  const Select = ({ value }) => (
    <div style={{
      ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      cursor: 'pointer',
    }}>
      <span style={{ color: t.ink }}>{value}</span>
      <svg width="12" height="12" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>
    </div>
  );

  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody, width: 1440 }}>

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
          <StudioButton size="sm">Book a live demo</StudioButton>
        </div>
      </header>

      <section style={{ padding: '72px 56px 88px' }}>
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 28, display: 'flex', gap: 18 }}>
          <span>CONTACT</span><span>·</span><span>RECURV · ZA</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 132, lineHeight: 0.92,
              letterSpacing: '-0.05em', margin: 0,
            }}>
              Let's <span style={{ color: t.primary }}>talk.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 560 }}>
              Tell us where you collect, who you collect from, and what's not working today —
              and we'll come back with a plan, pricing, and a live demo within one business day.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 120px' }}>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, marginBottom: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>HOW CAN WE HELP?</div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, lineHeight: 1, letterSpacing: '-0.035em', margin: 0 }}>
                Three doors,<br /><span style={{ color: t.primary }}>one team behind them.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
                Routing your message to the right person up front means a faster, sharper reply.
                Pick the door that best matches your reason for getting in touch.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid ${t.line}` }}>
            {[
              {
                num: '01', icon: 'wallet', tag: 'SALES',
                t: 'Talk to sales',
                d: 'You\'re evaluating Recurv for your business, want pricing, or need a tailored demo for your team.',
                email: 'sales@recurv.tech', phone: '+27 21 200 4188', sla: 'Reply within 1 business day',
              },
              {
                num: '02', icon: 'shield', tag: 'SUPPORT',
                t: 'Customer support',
                d: 'You already run Recurv and need help with mandates, collections, reconciliation, or your dashboard.',
                email: 'help@recurv.tech', phone: '+27 21 200 4199', sla: 'Reply within 4 business hours',
              },
              {
                num: '03', icon: 'people', tag: 'PARTNERS & PRESS',
                t: 'Partnerships & press',
                d: 'You\'re a banking, accounting, or technology partner — or a journalist with questions about Recurv.',
                email: 'partners@recurv.tech', phone: '+27 21 200 4150', sla: 'Reply within 2 business days',
              },
            ].map((f, i) => (
              <div key={f.num} style={{
                padding: '36px 28px 32px',
                borderRight: i < 2 ? `1px solid ${t.line}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CarbonIcon name={f.icon} color={t.primary} size={40} />
                  <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num} · {f.tag}</span>
                </div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 4 }}>{f.t}</div>
                <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55 }}>{f.d}</div>
                <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px dashed ${t.line}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>{f.email}</div>
                  <div className="mono" style={{ fontSize: 12, color: t.inkSoft, letterSpacing: 0.5 }}>{f.phone}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <Dot color={t.success} size={6} />
                    <span style={{ fontSize: 12, color: t.inkSoft }}>{f.sla}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 120px' }}>
        <div style={{
          background: t.surface, border: `1px solid ${t.line}`, borderRadius: 16,
          display: 'grid', gridTemplateColumns: '1fr 1.35fr', overflow: 'hidden',
        }}>
          <div style={{
            background: t.surfaceAlt, padding: '56px 48px', borderRight: `1px solid ${t.line}`,
            display: 'flex', flexDirection: 'column', gap: 32,
          }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>GET A DEMO</div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                Tell us about your collections.
              </div>
              <p style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, marginTop: 18 }}>
                A 25-minute walkthrough with a recurring-revenue specialist.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['No slides — a live product demo against your billing pattern.'],
                ['Pricing on the call, not in a follow-up email.'],
                ['Talk to a specialist who\'s deployed Recurv in your industry.'],
              ].map(([line]) => (
                <div key={line} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 14, alignItems: 'start' }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 999, border: `2px solid ${t.primary}`, marginTop: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ width: 6, height: 6, background: t.primary, borderRadius: 999 }} />
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: t.ink }}>{line}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '56px 56px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <Field label="Full name">
                <input style={inputStyle} defaultValue="Thandi Ngwenya" />
              </Field>
              <Field label="Work email">
                <input style={inputStyle} defaultValue="thandi@royalct.golf" />
              </Field>
              <Field label="Company">
                <input style={inputStyle} defaultValue="Royal Cape Town Golf Club" />
              </Field>
              <Field label="Phone" optional>
                <input style={inputStyle} defaultValue="+27 82 514 0908" />
              </Field>
              <Field label="Industry" span={1}>
                <Select value="Golf & sport clubs" />
              </Field>
              <Field label="Monthly collections volume" span={1}>
                <Select value="R 1M – R 5M / month" />
              </Field>
              <Field label="What would you like to discuss?" span={2}>
                <textarea rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                  defaultValue={"We currently run member dues through two banks with weekly manual reconciliation."} />
              </Field>
            </div>

            <div style={{
              marginTop: 28, paddingTop: 24, borderTop: `1px solid ${t.line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: t.inkSoft, maxWidth: 420 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${t.lineStrong}`,
                  background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span>I agree to Recurv's <span style={{ color: t.ink, fontWeight: 500, borderBottom: `1px solid ${t.ink}` }}>privacy policy</span>.</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <StudioButton variant="secondary">Save for later</StudioButton>
                <StudioButton variant="accent" icon={<span>→</span>}>Book a live demo</StudioButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '64px 56px 32px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: t.inkSoft }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
            <a href="https://clickmod.co.za/" target="_blank" rel="noopener noreferrer" style={{ color: t.inkSoft, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
            </a>
          </div>
          <span className="mono">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { ContactPage });
