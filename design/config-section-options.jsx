// Configuration section option explorations — CfgOptionA through CfgOptionD.
// Renders ConfigOptionsApp into document.getElementById('root').

const CFG_THEME = COMBINED_WHITE;

// Option A — Tabbed config editor, technical/dense
function CfgOptionA({ theme: t = CFG_THEME }) {
  const [activeTab, setActiveTab] = React.useState('mandate');
  const tabs = [
    { id: 'mandate', label: 'Mandate rules' },
    { id: 'retry', label: 'Retry policy' },
    { id: 'notify', label: 'Notifications' },
    { id: 'banking', label: 'Banking details' },
  ];
  const inputStyle = { fontFamily: t.fontMono, fontSize: 13, padding: '10px 14px', border: `1px solid ${t.line}`, borderRadius: 6, color: t.ink, background: t.surface, width: '100%', boxSizing: 'border-box' };

  return (
    <section style={{ background: t.surfaceAlt, padding: '72px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>FULLY CONFIGURABLE</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1, letterSpacing: '-0.035em', margin: 0 }}>
            Every detail<br /><span style={{ color: t.primary }}>on your terms.</span>
          </h2>
          <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.6, marginTop: 20 }}>
            Set mandate rules, retry windows, notification copy, and banking details per membership tier — without calling your implementation team.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Mandate type: DebiCheck or NAEDO', 'Retry window: 1–14 days', 'WhatsApp, SMS, or email nudges', 'Per-tier billing amounts', 'Bank account per collection type'].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, color: t.ink }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: t.primary, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.line}`, padding: '0 20px' }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: '14px 16px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: t.fontBody, fontSize: 13, fontWeight: 500, color: activeTab === tab.id ? t.primary : t.inkSoft,
                borderBottom: activeTab === tab.id ? `2px solid ${t.primary}` : '2px solid transparent',
                marginBottom: -1,
              }}>{tab.label}</button>
            ))}
          </div>
          <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {activeTab === 'mandate' && (
              <>
                <div>
                  <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">MANDATE TYPE</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['DebiCheck (EAC)', 'NAEDO'].map((opt) => (
                      <div key={opt} style={{
                        flex: 1, padding: '12px 16px', border: `1.5px solid ${opt === 'DebiCheck (EAC)' ? t.primary : t.line}`,
                        borderRadius: 8, fontSize: 14, fontWeight: 500, textAlign: 'center',
                        background: opt === 'DebiCheck (EAC)' ? t.softTint : 'transparent', cursor: 'pointer',
                        color: opt === 'DebiCheck (EAC)' ? t.primary : t.inkSoft,
                      }}>{opt}</div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">FIRST COLLECTION DATE</label>
                    <input style={inputStyle} defaultValue="2026-02-01" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">COLLECTION AMOUNT (CENTS)</label>
                    <input style={inputStyle} defaultValue="249900" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">FREQUENCY</label>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span>Monthly</span>
                    <svg width="12" height="12" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" /></svg>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'retry' && (
              <>
                <div>
                  <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">RETRY WINDOW (DAYS)</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[1, 3, 5, 7, 14].map((d) => (
                      <div key={d} style={{
                        padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                        border: `1.5px solid ${d === 7 ? t.primary : t.line}`,
                        background: d === 7 ? t.softTint : 'transparent',
                        color: d === 7 ? t.primary : t.inkSoft,
                      }}>{d} days</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: t.inkSoft, display: 'block', marginBottom: 8 }} className="mono">RETRY STRATEGY</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Spread evenly', 'Front-loaded', 'Back-loaded'].map((s) => (
                      <div key={s} style={{ flex: 1, padding: '12px 10px', border: `1.5px solid ${s === 'Front-loaded' ? t.primary : t.line}`, borderRadius: 8, fontSize: 13, textAlign: 'center', cursor: 'pointer', color: s === 'Front-loaded' ? t.primary : t.inkSoft, background: s === 'Front-loaded' ? t.softTint : 'transparent' }}>{s}</div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {(activeTab === 'notify' || activeTab === 'banking') && (
              <div style={{ padding: '40px 0', textAlign: 'center', color: t.inkSoft, fontSize: 14 }}>
                Configuration fields for {activeTab} appear here.
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, paddingTop: 8, borderTop: `1px solid ${t.line}` }}>
              <CombinedWhiteButton variant="secondary" size="sm">Reset defaults</CombinedWhiteButton>
              <CombinedWhiteButton variant="accent" size="sm">Save configuration</CombinedWhiteButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Option B — Visual tile picker, consumer-friendly
function CfgOptionB({ theme: t = CFG_THEME }) {
  const [selected, setSelected] = React.useState('monthly');
  const tiers = [
    { id: 'monthly', label: 'Monthly', sub: 'Collect on the 1st of each month', price: 'R 249/mo', icon: 'schedule' },
    { id: 'weekly', label: 'Weekly', sub: 'Collect every Monday morning', price: 'R 60/wk', icon: 'cycle' },
    { id: 'custom', label: 'Custom', sub: 'Define your own billing calendar', price: 'You decide', icon: 'mandate' },
  ];

  return (
    <section style={{ background: t.bg, padding: '80px 56px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>FULLY CONFIGURABLE</div>
        <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, letterSpacing: '-0.035em', margin: 0 }}>
          Your collections. <span style={{ color: t.primary }}>Your rules.</span>
        </h2>
        <p style={{ fontSize: 18, color: t.inkSoft, lineHeight: 1.55, marginTop: 20, maxWidth: 580, margin: '20px auto 0' }}>
          Choose your billing frequency, set your retry window, and define your notification copy. No code required.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto 48px' }}>
        {tiers.map((tier) => (
          <div
            key={tier.id}
            onClick={() => setSelected(tier.id)}
            style={{
              border: `2px solid ${selected === tier.id ? t.primary : t.line}`,
              borderRadius: 12, padding: '28px 24px', cursor: 'pointer',
              background: selected === tier.id ? t.softTint : t.surface,
              display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start',
            }}
          >
            <CarbonIcon name={tier.icon} color={selected === tier.id ? t.primary : t.inkSoft} size={36} />
            <div>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: t.ink }}>{tier.label}</div>
              <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 6, lineHeight: 1.5 }}>{tier.sub}</div>
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 600, color: selected === tier.id ? t.primary : t.ink }}>{tier.price}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
        <CombinedWhiteButton variant="accent" size="lg" icon={<span>→</span>}>Set up my collections</CombinedWhiteButton>
        <CombinedWhiteButton variant="secondary" size="lg">See all options</CombinedWhiteButton>
      </div>
    </section>
  );
}

// Option C — Split screen: marketing copy left, live preview right
function CfgOptionC({ theme: t = CFG_THEME }) {
  const [retryDays, setRetryDays] = React.useState(7);
  const [mandateType, setMandateType] = React.useState('DebiCheck');

  return (
    <section style={{ background: t.bg, padding: '0 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 600 }}>
        <div style={{ padding: '80px 64px', background: t.surfaceAlt, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>FULLY CONFIGURABLE</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.97, letterSpacing: '-0.035em', margin: 0 }}>
            Every parameter,<br /><span style={{ color: t.primary }}>under your control.</span>
          </h2>
          <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
            Set mandate type, retry window, notification channel, and billing schedule without a developer. Changes apply to the next collection run.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['No-code configuration', 'Per-tier rules', 'Live preview before save', 'Applied next collection run'].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, color: t.ink }}>
                <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill={t.successBg} /><path d="M5 8l2 2 4-4" stroke={t.success} strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '56px 56px', display: 'flex', flexDirection: 'column', gap: 24, borderLeft: `1px solid ${t.line}`, justifyContent: 'center' }}>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 8 }}>LIVE CONFIGURATION PREVIEW</div>

          <div>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 10 }}>MANDATE TYPE</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['DebiCheck', 'NAEDO'].map((m) => (
                <button key={m} onClick={() => setMandateType(m)} style={{
                  flex: 1, padding: '12px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: t.fontBody, fontSize: 14, fontWeight: 500,
                  border: `1.5px solid ${mandateType === m ? t.primary : t.line}`,
                  background: mandateType === m ? t.softTint : t.surface,
                  color: mandateType === m ? t.primary : t.inkSoft,
                }}>{m}</button>
              ))}
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 10 }}>RETRY WINDOW · {retryDays} DAYS</div>
            <input type="range" min={1} max={14} value={retryDays} onChange={(e) => setRetryDays(+e.target.value)} style={{ width: '100%', accentColor: t.primary }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft, marginTop: 6 }}>
              <span>1 day</span><span>7 days</span><span>14 days</span>
            </div>
          </div>

          <div style={{ background: t.softTint, border: `1px solid rgba(79,51,217,0.15)`, borderRadius: 10, padding: '20px 20px' }}>
            <div className="mono" style={{ fontSize: 10, color: t.primary, letterSpacing: 1.5, marginBottom: 12 }}>CONFIGURATION SUMMARY</div>
            {[
              ['Mandate type', mandateType],
              ['Retry window', `${retryDays} days`],
              ['Estimated recovery lift', retryDays >= 7 ? '+34%' : '+18%'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: t.inkSoft }}>{k}</span>
                <span style={{ fontWeight: 600, color: t.ink }}>{v}</span>
              </div>
            ))}
          </div>

          <CombinedWhiteButton variant="accent" size="lg" icon={<span>→</span>} style={{ justifyContent: 'center' }}>Apply configuration</CombinedWhiteButton>
        </div>
      </div>
    </section>
  );
}

// Option D — Minimal code-centric, developer-first
function CfgOptionD({ theme: t = CFG_THEME }) {
  return (
    <section style={{ background: t.surfaceDeep, padding: '80px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24 }}>FULLY CONFIGURABLE</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.97, letterSpacing: '-0.035em', color: t.inkOnDeep, margin: 0 }}>
            API-first.<br /><span style={{ color: t.primary }}>Config by code.</span>
          </h2>
          <p style={{ fontSize: 16, color: t.inkOnDeepSoft, lineHeight: 1.6, marginTop: 24 }}>
            Every configuration option available via API and dashboard. Set mandate rules, retry policies, and notification templates in your deployment pipeline — or directly in the UI.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <CombinedWhiteButton size="lg" style={{ background: t.primary, color: '#fff', borderColor: t.primary }}>Read the docs →</CombinedWhiteButton>
            <CombinedWhiteButton size="lg" variant="ghost" style={{ color: t.inkOnDeep, borderColor: 'rgba(246,245,240,0.2)' }}>Request API access</CombinedWhiteButton>
          </div>
        </div>
        <div style={{ background: '#0A0712', borderRadius: 12, padding: '28px 28px', overflow: 'auto' }}>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(201,199,212,0.45)', letterSpacing: 1.5, marginBottom: 20 }}>
            CONFIGURE VIA API
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 13, lineHeight: 1.7, color: '#C9C7D4', whiteSpace: 'pre' }}>{`await recurv.schedules.update('sch_golf_full', {
  mandateType: 'debicheck',
  retryWindow: {
    days: 7,
    strategy: 'front-loaded',
  },
  notifications: {
    channels: ['whatsapp', 'sms'],
    firstAttempt: true,
    eachRetry: true,
  },
  billingDate: 'first-of-month',
});

// Response
{
  "id": "sch_golf_full",
  "status": "active",
  "retryWindow": { "days": 7 },
  "updatedAt": "2026-01-24T09:14:32Z"
}`}</div>
        </div>
      </div>
    </section>
  );
}

function ConfigOptionsApp() {
  const t = CFG_THEME;
  const [active, setActive] = React.useState('A');
  const options = [
    ['A', 'Tabbed config editor'],
    ['B', 'Visual tile picker'],
    ['C', 'Split screen preview'],
    ['D', 'Developer / API-first'],
  ];

  return (
    <div style={{ background: t.surfaceAlt, fontFamily: t.fontBody }}>
      <div style={{ padding: '24px 56px', borderBottom: `1px solid ${t.line}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>CONFIG SECTION OPTIONS ·</span>
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
      {active === 'A' && <CfgOptionA />}
      {active === 'B' && <CfgOptionB />}
      {active === 'C' && <CfgOptionC />}
      {active === 'D' && <CfgOptionD />}
    </div>
  );
}

if (document.getElementById('root')) {
  ReactDOM.createRoot(document.getElementById('root')).render(<ConfigOptionsApp />);
}

Object.assign(window, { CfgOptionA, CfgOptionB, CfgOptionC, CfgOptionD, ConfigOptionsApp });
