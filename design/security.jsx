// Security & compliance page — PCI DSS, ISO 27001, POPIA, banking regulation overview.

const SECURITY_CERTS = [
  {
    badge: 'PCI DSS L1', icon: 'shield', title: 'PCI DSS Level 1',
    body: 'Recurv is certified at PCI DSS Level 1 — the highest standard for payment data security. Annual audits by a Qualified Security Assessor (QSA). Card data never touches your servers.',
    detail: 'Assessed annually by BDO SA',
  },
  {
    badge: 'ISO 27001', icon: 'lock', title: 'ISO/IEC 27001:2022',
    body: 'Our information security management system (ISMS) is certified to ISO/IEC 27001:2022. Covers our platform, infrastructure, and people practices.',
    detail: 'Certified by SGS South Africa',
  },
  {
    badge: 'POPIA', icon: 'globe', title: 'POPIA compliant',
    body: 'All personal information is processed in accordance with the Protection of Personal Information Act (POPIA). Data stored and processed in South Africa.',
    detail: 'Legal basis: contract + legitimate interest',
  },
  {
    badge: 'SARB', icon: 'bolt', title: 'SARB & PASA registered',
    body: 'Recurv operates as a registered Payment System Participant under SARB oversight and is an accredited PASA member. Our DebiCheck mandates comply fully with NPS Act requirements.',
    detail: 'PASA Membership No. 0042-2021',
  },
];

const INFRA_ITEMS = [
  { title: 'South Africa only', body: 'All customer and payment data is stored and processed within South Africa. No cross-border transfers without explicit consent and a lawful transfer basis.' },
  { title: 'Encrypted at rest & in transit', body: 'AES-256 encryption at rest. TLS 1.3 in transit. Field-level encryption for mandate and banking data.' },
  { title: 'Zero trust network', body: 'Private networking with identity-aware proxy. All access to production systems requires MFA and device attestation.' },
  { title: 'SOC 2 Type II (in progress)', body: 'We are completing our SOC 2 Type II audit with expected completion Q3 2026.' },
  { title: 'Annual penetration testing', body: 'External penetration tests conducted by an independent firm each year, plus continuous automated scanning.' },
  { title: '99.99% SLA uptime', body: 'Multi-zone redundancy on all critical services. Incident response team is on-call 24 / 7 / 365.' },
];

const BANK_REGS = [
  { num: '01', title: 'DebiCheck (EAC)', body: 'Recurv mandates use DebiCheck Authenticated Collections — the authenticated debit order standard mandated by SARB. Reduces fraud and disputed debits.' },
  { num: '02', title: 'NAEDO & AEDO', body: 'Full support for Non-Authenticated Early Debit Orders and Authenticated Early Debit Orders. We select the optimal type based on your business profile.' },
  { num: '03', title: 'Early debit windows', body: 'We submit to all four clearing windows. Your funds reach your bank account the same day for EDO submissions by 10:30.' },
  { num: '04', title: 'SARB NPS Act', body: 'Recurv's payment processing stack complies fully with the National Payment System Act, 78 of 1998, as amended.' },
];

function SecurityPage() {
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

      <section style={{ padding: '72px 56px 88px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 28 }}>SECURITY &amp; COMPLIANCE</div>
            <h1 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 100, lineHeight: 0.92, letterSpacing: '-0.045em', margin: 0 }}>
              Built for<br /><span style={{ color: t.primary }}>the CFO's</span><br />checklist.
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 520 }}>
              PCI DSS Level 1. ISO 27001. POPIA. SARB-registered. PASA-accredited. Everything your legal team will ask about, answered before they ask.
            </p>
            <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
              <CombinedWhiteButton size="lg" icon={<span>→</span>}>Download security overview</CombinedWhiteButton>
              <CombinedWhiteButton variant="secondary" size="lg">Contact security team</CombinedWhiteButton>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SECURITY_CERTS.map((c) => (
              <div key={c.badge} style={{
                background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12, padding: '20px 24px',
                display: 'flex', gap: 20, alignItems: 'flex-start',
              }}>
                <CarbonIcon name={c.icon} color={t.primary} size={32} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <span className="mono" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: t.softTint, color: t.primary, letterSpacing: 1.5 }}>{c.badge}</span>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</span>
                  </div>
                  <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{c.body}</div>
                  <div className="mono" style={{ fontSize: 11, color: t.inkSoft, marginTop: 10, letterSpacing: 0.5 }}>{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56, marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56, alignItems: 'end', marginBottom: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>INFRASTRUCTURE</div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>
                Data that stays<br /><span style={{ color: t.primary }}>in South Africa.</span>
              </h2>
            </div>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
              We deliberately restrict all payment and personal data to South African infrastructure.
              No US or European data centres. No CDN-cached credentials. Your customers' data is subject to SA law — full stop.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${t.line}`, borderRadius: 12, overflow: 'hidden' }}>
            {INFRA_ITEMS.map((item, i) => (
              <div key={item.title} style={{
                padding: '32px 28px',
                borderRight: i % 3 < 2 ? `1px solid ${t.line}` : 'none',
                borderBottom: i < 3 ? `1px solid ${t.line}` : 'none',
              }}>
                <div className="mono" style={{ fontSize: 10, color: t.primary, letterSpacing: 1.5, marginBottom: 12 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: '-0.015em', marginBottom: 12, lineHeight: 1.15 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px', borderTop: `1px solid ${t.line}` }}>
        <div style={{ paddingTop: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56, alignItems: 'end', marginBottom: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 16 }}>BANKING REGULATION</div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>
                SARB. PASA.<br /><span style={{ color: t.primary }}>NPS Act.</span>
              </h2>
            </div>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
              Recurv is built on South African banking rails from the ground up.
              Not an API wrapper on a foreign gateway. Real SA bank relationships, real mandate authentication, real regulatory compliance.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${t.line}` }}>
            {BANK_REGS.map((r, i) => (
              <div key={r.num} style={{
                padding: '36px 28px',
                borderRight: i < 3 ? `1px solid ${t.line}` : 'none',
              }}>
                <div className="mono" style={{ fontSize: 10, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 16 }}>{r.num}</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 14 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.6 }}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px 80px' }}>
        <div style={{ background: t.surfaceDeep, borderRadius: 16, padding: '72px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'rgba(246,245,240,0.5)', letterSpacing: 1.5, marginBottom: 24 }}>DATA LIFECYCLE</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1, letterSpacing: '-0.03em', color: t.inkOnDeep, margin: 0 }}>
              What we collect, how long we keep it, and when we delete it.
            </h2>
            <p style={{ fontSize: 16, color: t.inkOnDeepSoft, lineHeight: 1.55, marginTop: 20 }}>
              We apply a principle of minimum necessary data: we only store what is required to process collections and satisfy our banking and regulatory obligations.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid rgba(246,245,240,0.15)', borderRadius: 10, overflow: 'hidden' }}>
            {[
              ['Mandate data', 'Retained for 7 years (NPS Act). Deleted on mandate cancellation + 7 years.'],
              ['Payment records', 'Retained for 5 years (SARS). Deleted on expiry of retention period.'],
              ['Personal info (POPIA)', 'Retained while subscriber is active. Deleted within 30 days of cancellation request.'],
              ['Bank account numbers', 'Tokenised. Original numbers purged after mandate authentication.'],
            ].map(([cat, policy], i, arr) => (
              <div key={cat} style={{
                padding: '20px 24px', borderBottom: i < arr.length - 1 ? '1px solid rgba(246,245,240,0.10)' : 'none',
                display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.inkOnDeep }}>{cat}</div>
                <div style={{ fontSize: 13, color: t.inkOnDeepSoft, lineHeight: 1.5 }}>{policy}</div>
              </div>
            ))}
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

Object.assign(window, { SecurityPage });
