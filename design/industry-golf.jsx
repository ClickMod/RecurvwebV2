// Golf industry landing page — full-page layout with hero, features, social proof, pricing, FAQ, and blog.

const GOLF_FEATURES = [
  {
    icon: 'mandate', num: '01', title: 'Digital mandate capture',
    body: 'Members sign a DebiCheck or NAEDO mandate online — from your pro shop terminal, an email link, or a QR code on the 18th hole. No paper. No clinic fees.',
    stat: '12 min', statLabel: 'avg mandate capture time',
  },
  {
    icon: 'schedule', num: '02', title: 'Subscription schedule builder',
    body: 'Monthly dues, levies, and locker fees each run on their own schedule with their own retry window. Green fees and cart hire run as once-off charges. One platform.',
    stat: '6 billing types', statLabel: 'managed from one dashboard',
  },
  {
    icon: 'cycle', num: '03', title: 'Automated retry + escalation',
    body: 'Failed collections retry intelligently across your retry window. Members get an SMS or WhatsApp nudge, not a call from the club manager.',
    stat: '↑ 34%', statLabel: 'recovery vs manual follow-up',
  },
  {
    icon: 'graph', num: '04', title: 'Revenue analytics',
    body: 'Monthly collection rate, outstanding balances, and retention by membership tier. Export to Excel for your board pack or connect your accounting system via API.',
    stat: '1 click', statLabel: 'board report export',
  },
  {
    icon: 'people', num: '05', title: 'Member self-service portal',
    body: 'Members view their mandate, update their bank account, and see payment history — without calling the club office. Your staff keeps their Tuesdays.',
    stat: '−68%', statLabel: 'finance support queries',
  },
  {
    icon: 'plug', num: '06', title: 'Club system integrations',
    body: 'Connect to Jonas Club Software, Xero, Sage, and all major SA banks via our open API. Two-way sync means your membership database and finance system stay in lockstep.',
    stat: '40+ integrations', statLabel: 'pre-built connectors',
  },
];

const GOLF_TESTIMONIAL = {
  quote: 'Before Recurv, our membership secretary spent every second Monday chasing failed debits. Now she runs one report, approves the retry list, and it's done in 20 minutes. We've recovered R 180,000 in outstanding subscriptions we would have written off.',
  name: 'Francois du Plessis',
  title: 'General Manager, Westlake Golf Club, Cape Town',
  stat1: 'R 180k', stat1Label: 'recovered in first 90 days',
  stat2: '−94%', stat2Label: 'finance admin time per month',
  stat3: '98.7%', stat3Label: 'collection rate on active mandates',
};

const GOLF_PRICING = [
  {
    tier: 'Starter', price: 'R 1,490', unit: '/mo', members: 'Up to 300 members',
    features: ['Unlimited mandates', '3 billing schedules', 'Email + SMS notifications', 'Standard reporting', 'Xero integration'],
    cta: 'Start free trial',
  },
  {
    tier: 'Club Pro', price: 'R 3,290', unit: '/mo', members: 'Up to 1 500 members',
    features: ['Everything in Starter', 'Unlimited billing schedules', 'WhatsApp notifications', 'Advanced analytics', 'All integrations', 'Dedicated account manager'],
    cta: 'Book a demo', highlight: true,
  },
  {
    tier: 'Enterprise', price: 'Custom', unit: '', members: 'Multi-course groups',
    features: ['Everything in Club Pro', 'Multi-club dashboard', 'Custom SLAs', 'On-site onboarding', 'Custom integrations', 'Priority support'],
    cta: 'Contact sales',
  },
];

const GOLF_FAQ = [
  ['How long does mandate migration take?', 'We migrate your existing EFT mandates to Recurv DebiCheck format in batches. For a club of 600 members, the full migration takes 7–10 working days with zero service interruption.'],
  ['Do members need to re-sign their mandates?', 'DebiCheck requires an authentication step, so members confirm via USSD or internet banking — a 60-second process. We handle the communication campaign for you.'],
  ['Which banks do you support?', 'All major South African banks: Standard Bank, FNB, Nedbank, ABSA, Capitec, Investec, and TymeBank. Real-time mandate authentication and same-day settlement are available on all banks.'],
  ['Can we run separate billing for country members vs city members?', 'Yes — you can define unlimited membership tiers, each with its own billing schedule, amount, and retry policy. The dashboard shows collections and outstanding by tier.'],
  ['How does Recurv handle POPIA?', 'Recurv is fully POPIA-compliant. All member payment data is stored and processed in South Africa. We provide a data processing addendum and a member consent flow that satisfies the POPIA requirements for debit order collection.'],
];

function GolfIndustryPage() {
  const t = COMBINED_WHITE;
  const [openFaq, setOpenFaq] = React.useState(null);

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

      <div style={{ padding: '20px 56px 0', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: t.inkSoft }}>
        <span>Industries</span><span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: t.ink, fontWeight: 500 }}>Golf clubs</span>
      </div>

      <section style={{ padding: '56px 56px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24, display: 'flex', gap: 16 }}>
              <span>GOLF &amp; COUNTRY CLUBS</span><span>·</span><span>SOUTH AFRICA</span>
            </div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 88, lineHeight: 0.94,
              letterSpacing: '-0.045em', margin: 0,
            }}>
              Memberships<br />that <span style={{ color: t.primary }}>collect<br />themselves.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 28, maxWidth: 540 }}>
              Stop chasing failed debits. Recurv handles mandate capture, automated collections, and
              member communication so your club secretary can focus on the members — not the spreadsheets.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 14, alignItems: 'center' }}>
              <CombinedWhiteButton size="lg" icon={<span>→</span>}>Book a demo for golf clubs</CombinedWhiteButton>
              <CombinedWhiteButton variant="secondary" size="lg">See pricing</CombinedWhiteButton>
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 28 }}>
              {[['98.7%', 'avg collection rate'], ['12 min', 'mandate capture'], ['+34%', 'failed debit recovery']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 600, letterSpacing: '-0.03em', color: t.ink }}>{v}</div>
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
        <div style={{ paddingTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>
            Everything a club needs — <span style={{ color: t.primary }}>nothing it doesn't.</span>
          </h2>
          <div style={{ fontSize: 14, color: t.inkSoft, maxWidth: 340, textAlign: 'right' }}>
            Built specifically for multi-tier membership organisations with complex billing patterns.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden' }}>
          {GOLF_FEATURES.map((f, i) => (
            <div key={f.num} style={{
              padding: '36px 32px', borderRight: i % 3 < 2 ? `1px solid ${t.line}` : 'none',
              borderBottom: i < 3 ? `1px solid ${t.line}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CarbonIcon name={f.icon} color={t.primary} size={40} />
                <span className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</span>
              </div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 6 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{f.body}</div>
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px dashed ${t.line}`, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', color: t.primary }}>{f.stat}</span>
                <span style={{ fontSize: 12, color: t.inkSoft }}>{f.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{ background: t.surfaceAlt, borderRadius: 16, padding: '64px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <PhotoSlot label="Golf club finance team at Westlake" tint="#1E7A4E" ratio="1 / 1" variant="spotlight" rounded={8} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>CUSTOMER STORY</div>
            <p style={{ fontFamily: t.fontDisplay, fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0, color: t.ink }}>
              "{GOLF_TESTIMONIAL.quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8, borderTop: `1px solid ${t.line}` }}>
              <div style={{
                width: 48, height: 48, borderRadius: 999, background: t.softTint,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.fontDisplay, fontSize: 18, fontWeight: 700, color: t.primary,
              }}>FD</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{GOLF_TESTIMONIAL.name}</div>
                <div style={{ fontSize: 13, color: t.inkSoft }}>{GOLF_TESTIMONIAL.title}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 10, overflow: 'hidden', background: t.surface }}>
              {[[GOLF_TESTIMONIAL.stat1, GOLF_TESTIMONIAL.stat1Label], [GOLF_TESTIMONIAL.stat2, GOLF_TESTIMONIAL.stat2Label], [GOLF_TESTIMONIAL.stat3, GOLF_TESTIMONIAL.stat3Label]].map(([v, l], i) => (
                <div key={l} style={{
                  padding: '20px 16px', borderRight: i < 2 ? `1px solid ${t.line}` : 'none', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 600, color: t.primary, letterSpacing: '-0.02em' }}>{v}</div>
                  <div style={{ fontSize: 11, color: t.inkSoft, marginTop: 4, lineHeight: 1.3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, textAlign: 'center', marginBottom: 48 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>PRICING</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, letterSpacing: '-0.035em', margin: 0 }}>
            Transparent pricing.<br />No surprises on your statement.
          </h2>
          <p style={{ fontSize: 17, color: t.inkSoft, marginTop: 20, lineHeight: 1.55 }}>
            Per-transaction fee of 0.45% (min R 4.50) applies across all plans. No setup fees.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {GOLF_PRICING.map((p) => (
            <div key={p.tier} style={{
              border: p.highlight ? `2px solid ${t.primary}` : `1px solid ${t.line}`,
              borderRadius: 16, padding: '36px 32px',
              background: p.highlight ? t.softTint : t.surface,
              display: 'flex', flexDirection: 'column', gap: 20, position: 'relative',
            }}>
              {p.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: t.primary, color: '#fff', fontSize: 11, padding: '4px 14px',
                  borderRadius: 999, fontWeight: 600, letterSpacing: 1,
                }} className="mono">MOST POPULAR</div>
              )}
              <div>
                <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>{p.tier.toUpperCase()}</div>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: t.fontDisplay, fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em' }}>{p.price}</span>
                  <span style={{ fontSize: 15, color: t.inkSoft }}>{p.unit}</span>
                </div>
                <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 6 }}>{p.members}</div>
              </div>
              <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 2, flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="7" fill={t.successBg} />
                      <path d="M5 8l2 2 4-4" stroke={t.success} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto' }}>
                <CombinedWhiteButton
                  variant={p.highlight ? 'primary' : 'secondary'}
                  size="lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                >{p.cta}</CombinedWhiteButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              Questions clubs always ask.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {GOLF_FAQ.map(([q, a], i) => (
              <div key={q} style={{ borderTop: `1px solid ${t.line}`, padding: '24px 0' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: t.fontBody,
                    textAlign: 'left', gap: 24,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 500, color: t.ink }}>{q}</span>
                  <span style={{ fontSize: 20, color: t.primary, flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, marginTop: 14 }}>{a}</div>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 20 }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <BlogSection theme={t} posts={GOLF_POSTS} Button={CombinedWhiteButton} />
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{
          background: t.surfaceDeep, borderRadius: 16, padding: '80px 72px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center',
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.5)', letterSpacing: 1.5, marginBottom: 24 }}>GET STARTED</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 0.96, letterSpacing: '-0.035em', color: t.inkOnDeep, margin: 0 }}>
              Ready to stop chasing payments?
            </h2>
            <p style={{ fontSize: 17, color: t.inkOnDeepSoft, lineHeight: 1.55, marginTop: 24, maxWidth: 440 }}>
              Most clubs are live within 2 weeks. We handle the migration, member communication, and bank registration — you just tell us when to switch.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <CombinedWhiteButton size="lg" icon={<span>→</span>} style={{ background: t.primary, color: '#fff', borderColor: t.primary }}>
              Book a golf club demo
            </CombinedWhiteButton>
            <CombinedWhiteButton size="lg" variant="ghost" style={{ color: t.inkOnDeep, borderColor: 'rgba(246,245,240,0.2)' }}>
              Download the club guide
            </CombinedWhiteButton>
            <div style={{ fontSize: 13, color: t.inkOnDeepSoft, lineHeight: 1.5 }}>
              No contract. Cancel anytime. SA-based support team.
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${t.line}`, padding: '48px 56px 32px' }}>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
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

Object.assign(window, { GolfIndustryPage });
