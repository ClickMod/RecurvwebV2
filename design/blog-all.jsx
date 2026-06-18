// All Blog Posts page — filterable index of every Recurv article.

const BLOG_INDUSTRIES = [
  { key: 'all',        label: 'All articles' },
  { key: 'Golf',       label: 'Golf clubs' },
  { key: 'Medical',    label: 'Medical' },
  { key: 'Sport',      label: 'Sport clubs' },
  { key: 'Rentals',    label: 'Property & rentals' },
  { key: 'Compliance', label: 'Compliance' },
  { key: 'Platform',   label: 'Platform' },
];

function BlogAllPage() {
  const t = COMBINED_WHITE;
  const [sort, setSort] = React.useState('latest');
  const [industry, setIndustry] = React.useState('all');

  const counts = React.useMemo(() => {
    const c = { all: ALL_POSTS.length };
    for (const p of ALL_POSTS) c[p.industry] = (c[p.industry] || 0) + 1;
    return c;
  }, []);

  const filtered = React.useMemo(() => {
    let xs = industry === 'all' ? ALL_POSTS : ALL_POSTS.filter((p) => p.industry === industry);
    xs = [...xs].sort((a, b) => sort === 'latest' ? b.dateSort - a.dateSort : a.dateSort - b.dateSort);
    return xs;
  }, [sort, industry]);

  const showFeatured = industry === 'all' && sort === 'latest' && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

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
          <CombinedWhiteButton size="sm">Book a live demo</CombinedWhiteButton>
        </div>
      </header>

      <div style={{ padding: '20px 56px 0', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: t.inkSoft }}>
        <span>Resources</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: t.ink, fontWeight: 500 }}>Blog</span>
      </div>

      <section style={{ padding: '40px 56px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 80, alignItems: 'end' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 28 }}>
              THE RECURV BLOG
            </div>
            <h1 style={{
              fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 104, lineHeight: 0.94,
              letterSpacing: '-0.045em', margin: 0,
            }}>
              Field notes on<br />
              <span style={{ color: t.primary }}>recurring revenue.</span>
            </h1>
          </div>
          <div>
            <p style={{ fontSize: 18, color: t.inkSoft, lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
              Practical, vendor-neutral writing on debit orders, payment plans, mandate capture,
              and running a finance team across South Africa. Written by the people who build Recurv —
              and the operators using it.
            </p>
            <div className="mono" style={{ marginTop: 28, fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, display: 'flex', gap: 20 }}>
              <span>{ALL_POSTS.length} ARTICLES</span>
              <span>·</span>
              <span>UPDATED WEEKLY</span>
              <span>·</span>
              <span>RSS</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 56px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, background: t.surfaceAlt }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
          padding: '20px 0',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginRight: 8 }}>
              FILTER BY INDUSTRY
            </span>
            {BLOG_INDUSTRIES.map((ind) => {
              const active = industry === ind.key;
              const n = counts[ind.key] || 0;
              return (
                <button
                  key={ind.key}
                  onClick={() => setIndustry(ind.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
                    background: active ? t.ink : 'transparent',
                    color: active ? t.surface : t.ink,
                    border: `1px solid ${active ? t.ink : t.line}`,
                    fontSize: 13, fontWeight: 500, fontFamily: t.fontBody,
                    transition: 'all 120ms',
                  }}
                >
                  {ind.label}
                  <span className="mono" style={{
                    fontSize: 10, letterSpacing: 0.5,
                    color: active ? 'rgba(255,255,255,0.65)' : t.inkSoft,
                  }}>{String(n).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>SORT</span>
            <div style={{
              display: 'inline-flex', border: `1px solid ${t.line}`, borderRadius: 999, padding: 2,
              background: t.bg,
            }}>
              {[
                ['latest', 'Latest'],
                ['oldest', 'Oldest'],
              ].map(([k, label]) => {
                const active = sort === k;
                return (
                  <button
                    key={k}
                    onClick={() => setSort(k)}
                    style={{
                      padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
                      background: active ? t.ink : 'transparent',
                      color: active ? t.surface : t.ink,
                      border: 'none',
                      fontSize: 13, fontWeight: 500, fontFamily: t.fontBody,
                    }}
                  >{label}</button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div style={{
        padding: '20px 56px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
          SHOWING {String(filtered.length).padStart(2, '0')}
          {industry !== 'all' && <> · {BLOG_INDUSTRIES.find((i) => i.key === industry).label.toUpperCase()}</>}
          {' · '}
          {sort === 'latest' ? 'NEWEST FIRST' : 'OLDEST FIRST'}
        </div>
        {industry !== 'all' && (
          <button onClick={() => setIndustry('all')} style={{
            fontSize: 13, color: t.primary, background: 'none', border: 'none', cursor: 'pointer',
            fontWeight: 500, fontFamily: t.fontBody, padding: 0,
          }}>Clear filter ×</button>
        )}
      </div>

      {featured && (
        <section style={{ padding: '32px 56px 0' }}>
          <article style={{
            background: t.surface, border: `1px solid ${t.line}`, borderRadius: 16, overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0,
          }}>
            <PhotoSlot
              label={featured.imageDesc}
              caption={featured.category + ' · FEATURED'}
              tint={t.primary}
              bg={featured.imageBg}
              ratio="4 / 3"
              rounded={0}
              variant="spotlight"
            />
            <div style={{ padding: '48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="mono" style={{
                  fontSize: 10, padding: '4px 10px', borderRadius: 4,
                  background: t.primary, color: '#fff', letterSpacing: 1.5,
                }}>LATEST</span>
                <span className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
                  {featured.category} · {featured.readTime} MIN READ
                </span>
              </div>
              <h2 style={{
                fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, lineHeight: 1.05,
                letterSpacing: '-0.03em', margin: 0,
              }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                {featured.excerpt}
              </p>
              <div style={{
                marginTop: 12, paddingTop: 20, borderTop: `1px solid ${t.line}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 999, background: t.surfaceAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: t.fontDisplay, fontSize: 13, fontWeight: 600, color: t.primary,
                  }}>{featured.authorInitials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{featured.author}</div>
                    <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>{featured.date}</div>
                  </div>
                </div>
                <CombinedWhiteButton size="sm" icon={<span>→</span>}>Read article</CombinedWhiteButton>
              </div>
            </div>
          </article>
        </section>
      )}

      <section style={{ padding: '40px 56px 80px' }}>
        {rest.length === 0 ? (
          <div style={{
            padding: '80px 0', textAlign: 'center',
            border: `1px dashed ${t.line}`, borderRadius: 12, background: t.surface,
          }}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 12 }}>
              NO ARTICLES YET
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Nothing in this category — try another industry.
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {rest.map((p) => <BlogCard key={p.slug} theme={t} post={p} />)}
          </div>
        )}

        {rest.length > 0 && (
          <div style={{
            marginTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 24, borderTop: `1px solid ${t.line}`,
          }}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>
              PAGE 01 OF 01
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button disabled style={{
                padding: '10px 16px', borderRadius: 999, border: `1px solid ${t.line}`,
                background: 'transparent', color: t.inkSoft, fontFamily: t.fontBody, fontSize: 13,
                cursor: 'not-allowed',
              }}>← Previous</button>
              <button disabled style={{
                padding: '10px 16px', borderRadius: 999, border: `1px solid ${t.line}`,
                background: 'transparent', color: t.inkSoft, fontFamily: t.fontBody, fontSize: 13,
                cursor: 'not-allowed',
              }}>Next →</button>
            </div>
          </div>
        )}
      </section>

      <footer style={{ borderTop: `1px solid ${t.line}` }}>
        <div style={{
          padding: '72px 56px 56px',
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'end',
          borderBottom: `1px solid ${t.line}`,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>
              STAY IN THE LOOP
            </div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.98, letterSpacing: '-0.035em', margin: 0, maxWidth: 560 }}>
              Field notes on recurring revenue, <span style={{ color: t.primary }}>once a month.</span>
            </h2>
          </div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', padding: '0 18px',
                border: `1px solid ${t.lineStrong}`, borderRadius: 8, fontSize: 15, color: t.inkSoft, height: 52,
              }}>
                you@company.co.za
              </div>
              <CombinedWhiteButton size="lg">Subscribe</CombinedWhiteButton>
            </div>
            <div style={{ fontSize: 12.5, color: t.inkSoft, marginTop: 14, lineHeight: 1.5 }}>
              No spam. Unsubscribe anytime. Read by 2,400+ finance teams across South Africa.
            </div>
          </div>
        </div>

        <div style={{
          padding: '48px 56px 40px',
          display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 48,
        }}>
          <div>
            <Logo color={t.ink} accent={t.primary} />
            <p style={{ fontSize: 13.5, color: t.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 280 }}>
              Recurring revenue infrastructure for South African businesses.
            </p>
            <div style={{ marginTop: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
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
          <div style={{
            fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 286, lineHeight: 0.8,
            letterSpacing: '-0.05em', color: t.ink, whiteSpace: 'nowrap',
          }}>
            Recurv<span style={{ color: t.primary }}>.</span>
          </div>
        </div>

        <div style={{
          padding: '24px 56px 32px', borderTop: `1px solid ${t.line}`,
          display: 'flex', justifyContent: 'space-between', fontSize: 12, color: t.inkSoft,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
            <a href="https://clickmod.co.za/" target="_blank" rel="noopener noreferrer" title="Enterprise-grade product builders" style={{ color: t.inkSoft, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
            </a>
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

Object.assign(window, { BlogAllPage, BLOG_INDUSTRIES });
