// API & Developer Docs page — syntax-highlighted code blocks, capability grid.

const API_ENDPOINTS = [
  {
    method: 'POST', path: '/v1/mandates',
    desc: 'Create a DebiCheck or NAEDO mandate for a subscriber.',
    body: `{
  "subscriber_id": "sub_9fKn2xM",
  "account": {
    "bank_code": "632005",
    "account_number": "••••••7821",
    "account_type": "cheque"
  },
  "collection_amount": 249900,
  "frequency": "monthly",
  "first_collection_date": "2026-02-01"
}`,
    response: `{
  "id": "mnd_4R7GhpQw",
  "status": "pending_authentication",
  "auth_channel": "debicheck",
  "auth_expires_at": "2026-01-25T18:00:00Z"
}`,
  },
  {
    method: 'GET', path: '/v1/mandates/{id}',
    desc: 'Retrieve a mandate and its current authentication status.',
    body: null,
    response: `{
  "id": "mnd_4R7GhpQw",
  "status": "authenticated",
  "subscriber_id": "sub_9fKn2xM",
  "collection_amount": 249900,
  "frequency": "monthly",
  "authenticated_at": "2026-01-24T09:14:32Z"
}`,
  },
  {
    method: 'POST', path: '/v1/collections',
    desc: 'Trigger a once-off or scheduled collection run against an active mandate.',
    body: `{
  "mandate_id": "mnd_4R7GhpQw",
  "amount": 249900,
  "reference": "INV-2026-0041",
  "collection_date": "2026-02-01"
}`,
    response: `{
  "id": "col_7TpXvNm1",
  "status": "queued",
  "mandate_id": "mnd_4R7GhpQw",
  "amount": 249900,
  "collection_date": "2026-02-01",
  "estimated_settlement": "2026-02-01T15:30:00Z"
}`,
  },
  {
    method: 'GET', path: '/v1/collections/{id}',
    desc: 'Get the real-time status of a collection, including settlement and failure reasons.',
    body: null,
    response: `{
  "id": "col_7TpXvNm1",
  "status": "settled",
  "amount": 249900,
  "settled_at": "2026-02-01T15:28:14Z",
  "net_amount": 248773,
  "fee": 1127
}`,
  },
];

const API_CAPABILITIES = [
  { icon: 'mandate', title: 'Mandates API', desc: 'Create, authenticate, update, and cancel DebiCheck/NAEDO mandates programmatically.' },
  { icon: 'schedule', title: 'Schedules API', desc: 'Build custom billing schedules with flexible frequencies, amounts, and retry windows.' },
  { icon: 'cycle', title: 'Collections API', desc: 'Trigger once-off or recurring collections, track status, and handle failures.' },
  { icon: 'graph', title: 'Reporting API', desc: 'Pull collection reports, settlement summaries, and subscriber analytics in real time.' },
  { icon: 'people', title: 'Subscribers API', desc: 'Manage subscriber records, payment methods, and communication preferences.' },
  { icon: 'plug', title: 'Webhooks', desc: 'Receive real-time events for mandate status changes, collections, and failures.' },
];

const METHOD_COLORS = {
  GET: '#1E7A4E',
  POST: '#4F33D9',
  PUT: '#B45A1B',
  DELETE: '#C0392B',
};

function CodeBlock({ code, language = 'json' }) {
  const t = COMBINED_WHITE;
  return (
    <div style={{
      background: '#0F0E14', borderRadius: 8, padding: '20px 24px',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 13, lineHeight: 1.65, color: '#C9C7D4', overflow: 'auto',
      whiteSpace: 'pre',
    }}>
      {code}
    </div>
  );
}

// ── TerminalHeroCard ──────────────────────────────────────────────────────────
// Animated macOS-style terminal card: types a cURL request → sends → 201 response.
const TC = {
  kw:  '#A89BF0',
  str: '#9BE7C4',
  num: '#F4C77B',
  txt: '#EDEAE0',
  pun: 'rgba(246,245,240,0.70)',
  dim: 'rgba(246,245,240,0.40)',
};

const THC_REQUEST = [
  [ ['curl', TC.kw], [' -X ', TC.txt], ['POST', TC.kw], [' \\', TC.pun] ],
  [ ['  https://api.recurv.tech/v1/mandates', TC.str], [' \\', TC.pun] ],
  [ ['  -H ', TC.kw], ['"Authorization: Bearer sk_live_••••"', TC.str], [' \\', TC.pun] ],
  [ ['  -H ', TC.kw], ['"Content-Type: application/json"', TC.str], [' \\', TC.pun] ],
  [ ['  -d ', TC.kw], ["'{", TC.pun] ],
  [ ['    ', TC.txt], ['"customer"', TC.txt], [': ', TC.pun], ['"sub_9fKn2xM"', TC.str], [',', TC.pun] ],
  [ ['    ', TC.txt], ['"amount"', TC.txt],   [': ', TC.pun], ['49900', TC.num],          [',', TC.pun] ],
  [ ['    ', TC.txt], ['"cadence"', TC.txt],  [': ', TC.pun], ['"monthly"', TC.str]                     ],
  [ ["  }'", TC.pun] ],
];

const THC_RESPONSE = [
  [],
  [ ['# 201 Created', TC.dim] ],
  [ ['{', TC.pun] ],
  [ ['  ', TC.txt], ['"id"', TC.txt],     [': ', TC.pun], ['"mnd_3kQ9z"', TC.str], [',', TC.pun] ],
  [ ['  ', TC.txt], ['"status"', TC.txt], [': ', TC.pun], ['"active"', TC.str]                    ],
  [ ['}', TC.pun] ],
];

const THC_TOTAL = THC_REQUEST.reduce(
  (s, line) => s + line.reduce((ls, [t]) => ls + t.length, 0), 0
);

function thcCaretLine(count) {
  let rem = count;
  for (let i = 0; i < THC_REQUEST.length; i++) {
    const len = THC_REQUEST[i].reduce((s, [t]) => s + t.length, 0);
    if (rem <= len) return i;
    rem -= len;
  }
  return THC_REQUEST.length - 1;
}

function thcVisibleReq(count) {
  let rem = count;
  return THC_REQUEST.map((tokens) => {
    if (rem <= 0) return [];
    const out = [];
    for (const [text, color] of tokens) {
      if (rem >= text.length) { out.push([text, color]); rem -= text.length; }
      else if (rem > 0)       { out.push([text.slice(0, rem), color]); rem = 0; }
    }
    return out;
  });
}

function TerminalHeroCard() {
  const reducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const [phase, setPhase]         = React.useState(reducedMotion ? 'response' : 'typing');
  const [charCount, setCharCount] = React.useState(reducedMotion ? THC_TOTAL : 0);
  const [respVis, setRespVis]     = React.useState(!!reducedMotion);
  const [caretOn, setCaretOn]     = React.useState(true);

  // State machine
  React.useEffect(() => {
    if (reducedMotion) return;
    const timers = [];
    if (phase === 'typing') {
      if (charCount < THC_TOTAL) {
        timers.push(setTimeout(() => setCharCount(c => Math.min(c + 2, THC_TOTAL)), 22));
      } else {
        timers.push(setTimeout(() => setPhase('sending'), 200));
      }
    } else if (phase === 'sending') {
      timers.push(setTimeout(() => { setPhase('response'); setRespVis(true); }, 780));
    } else if (phase === 'response') {
      timers.push(setTimeout(() => setRespVis(false), 2800));
      timers.push(setTimeout(() => { setPhase('typing'); setCharCount(0); }, 3350));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase, charCount, reducedMotion]);

  // Caret blink
  React.useEffect(() => {
    if (reducedMotion || phase !== 'typing') return;
    const id = setInterval(() => setCaretOn(v => !v), 530);
    return () => clearInterval(id);
  }, [phase, reducedMotion]);

  const visReq    = phase === 'typing' ? thcVisibleReq(charCount) : THC_REQUEST;
  const caretLine = phase === 'typing' ? thcCaretLine(charCount)  : -1;

  return (
    <div style={{
      background: '#15122B',
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace',
    }}>
      <style>{`@keyframes thc-spin { to { transform: rotate(360deg); } }`}</style>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '13px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.025)',
      }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }} />
          ))}
        </div>

        <span style={{
          flex: 1, textAlign: 'center',
          fontSize: 11.5, color: 'rgba(246,245,240,0.42)', letterSpacing: 0.2,
        }}>
          create a debit-order mandate
        </span>

        {/* Status pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, minWidth: 130, justifyContent: 'flex-end' }}>
          {phase === 'typing' && (
            <>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: 'rgba(168,155,240,0.55)' }} />
              <span style={{ fontSize: 10, color: 'rgba(246,245,240,0.32)', letterSpacing: 0.9 }}>READY</span>
            </>
          )}
          {phase === 'sending' && (
            <>
              <div style={{
                width: 10, height: 10, borderRadius: 999, flexShrink: 0,
                border: '1.5px solid #FEBC2E', borderTopColor: 'transparent',
                animation: 'thc-spin 0.65s linear infinite',
              }} />
              <span style={{ fontSize: 10, color: '#FEBC2E', letterSpacing: 0.9 }}>SENDING…</span>
            </>
          )}
          {phase === 'response' && (
            <>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: '#28C840', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#28C840', letterSpacing: 0.9 }}>201 CREATED · 142 ms</span>
            </>
          )}
        </div>
      </div>

      {/* Code body */}
      <pre style={{
        margin: 0, padding: '18px 0 22px',
        display: 'flex', flexDirection: 'column',
        fontSize: 12.5, lineHeight: 1.72, color: TC.txt, overflowX: 'auto',
      }}>
        {/* Request rows */}
        {THC_REQUEST.map((_, i) => {
          const visible  = visReq[i];
          const hasChars = visible && visible.length > 0;
          const isCaret  = i === caretLine;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline',
              minHeight: '1.72em', paddingLeft: 20, paddingRight: 20,
            }}>
              <span style={{
                width: 22, minWidth: 22, fontSize: 11, textAlign: 'right',
                marginRight: 18, flexShrink: 0, userSelect: 'none',
                color: 'rgba(246,245,240,0.18)',
                opacity: hasChars || isCaret ? 1 : 0,
              }}>
                {i + 1}
              </span>
              <span>
                {visible && visible.map(([text, color], ti) => (
                  <span key={ti} style={{ color }}>{text}</span>
                ))}
                {isCaret && (
                  <span style={{
                    display: 'inline-block', width: 7, height: '0.85em',
                    background: caretOn ? TC.kw : 'transparent',
                    verticalAlign: 'text-bottom', marginLeft: 1,
                  }} />
                )}
              </span>
            </div>
          );
        })}

        {/* Response rows — always rendered, height reserved, opacity animated */}
        {THC_RESPONSE.map((tokens, i) => (
          <div key={`r${i}`} style={{
            display: 'flex', alignItems: 'baseline',
            minHeight: '1.72em', paddingLeft: 20, paddingRight: 20,
            opacity: respVis ? 1 : 0,
            transform: respVis ? 'translateY(0)' : 'translateY(6px)',
            transition: reducedMotion
              ? 'none'
              : `opacity 0.45s ease ${i * 0.055}s, transform 0.45s ease ${i * 0.055}s`,
          }}>
            <span style={{
              width: 22, minWidth: 22, fontSize: 11, textAlign: 'right',
              marginRight: 18, flexShrink: 0, userSelect: 'none',
              color: 'rgba(246,245,240,0.18)',
              opacity: tokens.length > 0 ? 1 : 0,
            }}>
              {THC_REQUEST.length + i + 1}
            </span>
            <span>
              {tokens.map(([text, color], ti) => (
                <span key={ti} style={{ color }}>{text}</span>
              ))}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

function ApiDocsPage({ onContact }) {
  const t = COMBINED_WHITE;
  const [activeEndpoint, setActiveEndpoint] = React.useState(0);
  const ep = API_ENDPOINTS[activeEndpoint];

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 24 }}>API &amp; DEVELOPER DOCS</div>
            <h1 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 80, lineHeight: 0.94, letterSpacing: '-0.045em', margin: 0 }}>
              Plug into<br /><span style={{ color: t.primary }}>any platform.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 28, maxWidth: 520 }}>
              A clean REST API, webhooks, and pre-built connectors for Xero, Sage, Jonas Club Software, and 40+ other SA platforms. Ship integrations in days, not months.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <CombinedWhiteButton size="lg" icon={<span>→</span>}>Read the docs</CombinedWhiteButton>
              <CombinedWhiteButton variant="secondary" size="lg" onClick={onContact}>Request API access</CombinedWhiteButton>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[['REST / JSON', null], ['Webhooks', null], ['OpenAPI 3.1', null], ['SDKs: Node · Python · PHP', null]].map(([label]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 999, background: t.primary }} />
                  <span style={{ fontSize: 13, color: t.inkSoft }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <TerminalHeroCard />
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, marginBottom: 40 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>API CAPABILITIES</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>
            Everything you need — <span style={{ color: t.primary }}>nothing you don't.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden' }}>
          {API_CAPABILITIES.map((cap, i) => (
            <div key={cap.title} style={{
              padding: '32px 28px',
              borderRight: i % 3 < 2 ? `1px solid ${t.line}` : 'none',
              borderBottom: i < 3 ? `1px solid ${t.line}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <CarbonIcon name={cap.icon} color={t.primary} size={36} />
              <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em' }}>{cap.title}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{cap.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56 }}>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>ENDPOINT EXPLORER</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0, marginBottom: 40 }}>
            REST API reference.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${t.line}`, borderRadius: 10, overflow: 'hidden' }}>
              {API_ENDPOINTS.map((ep, i) => (
                <button
                  key={ep.path}
                  onClick={() => setActiveEndpoint(i)}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 20px',
                    background: activeEndpoint === i ? t.softTint : t.surface,
                    borderBottom: i < API_ENDPOINTS.length - 1 ? `1px solid ${t.line}` : 'none',
                    border: 'none', cursor: 'pointer', fontFamily: t.fontBody, textAlign: 'left',
                    borderLeft: activeEndpoint === i ? `3px solid ${t.primary}` : '3px solid transparent',
                  }}
                >
                  <span className="mono" style={{ fontSize: 10, letterSpacing: 1, color: METHOD_COLORS[ep.method], marginTop: 2, fontWeight: 700 }}>{ep.method}</span>
                  <span className="mono" style={{ fontSize: 12, color: t.ink, lineHeight: 1.4 }}>{ep.path}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span className="mono" style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 4, letterSpacing: 1.5, fontWeight: 700,
                    background: `${METHOD_COLORS[ep.method]}15`, color: METHOD_COLORS[ep.method],
                  }}>{ep.method}</span>
                  <span className="mono" style={{ fontSize: 14, color: t.ink }}>{ep.path}</span>
                </div>
                <div style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6 }}>{ep.desc}</div>
              </div>

              {ep.body && (
                <div>
                  <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 10 }}>REQUEST BODY</div>
                  <CodeBlock code={ep.body} />
                </div>
              )}

              <div>
                <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 10 }}>RESPONSE</div>
                <CodeBlock code={ep.response} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{
          background: t.surfaceDeep, borderRadius: 16, padding: '64px 72px',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center',
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.5)', letterSpacing: 1.5, marginBottom: 20 }}>API ACCESS</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.98, letterSpacing: '-0.035em', color: t.inkOnDeep, margin: 0 }}>
              Ready to build? <span style={{ color: t.primary }}>Let's talk.</span>
            </h2>
            <p style={{ fontSize: 17, color: t.inkOnDeepSoft, marginTop: 20, lineHeight: 1.55, maxWidth: 600 }}>
              API keys are issued after a 20-minute technical scoping call with our integration team. We'll size the rate limits, data model, and webhook payload structure to your platform.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 240 }}>
            <CombinedWhiteButton size="lg" icon={<span>→</span>} onClick={onContact}
              style={{ background: t.primary, color: '#fff', borderColor: t.primary, justifyContent: 'center' }}>
              Request API access
            </CombinedWhiteButton>
            <CombinedWhiteButton size="lg" variant="ghost"
              style={{ color: t.inkOnDeep, borderColor: 'rgba(246,245,240,0.2)', justifyContent: 'center' }}>
              View OpenAPI spec
            </CombinedWhiteButton>
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

Object.assign(window, { ApiDocsPage, TerminalHeroCard });
