// Root app — three new homepage directions in the enterprise fintech family,
// each with its own design-system spec sheet.

function App() {
  const HOMEPAGE_H = 5600;
  const SYSTEM_H = 1480;

  return (
    <DesignCanvas>
      <DCSection
        id="homepages"
        title="Homepage Redesigns · Enterprise Fintech"
        subtitle="Three directions inspired by modern enterprise fintech websites — white surfaces, deep violet, editorial photography, geometric icons. Open any artboard fullscreen to scroll the full page."
      >
        <DCArtboard id="studio" label="01 · Studio Violet — editorial enterprise" width={1440} height={HOMEPAGE_H}>
          <StudioHomepage />
        </DCArtboard>
        <DCArtboard id="carbon" label="02 · Carbon Mono — technical, dense" width={1440} height={HOMEPAGE_H}>
          <CarbonHomepage />
        </DCArtboard>
        <DCArtboard id="bold" label="03 · Display Bold — type-led, maximalist" width={1440} height={HOMEPAGE_H + 800}>
          <BoldHomepage />
        </DCArtboard>
        <DCArtboard id="combined" label="04 · Combined — locked patterns assembled" width={1440} height={HOMEPAGE_H + 900}>
          <CombinedHomepage />
        </DCArtboard>
        <DCArtboard id="combined-white" label="04b · Combined White — Bold header scale" width={1440} height={HOMEPAGE_H + 1700}>
          <CombinedWhiteHomepage />
        </DCArtboard>
        <DCArtboard id="blog-index" label="05 · Blog index — all posts, filterable" width={1440} height={3200}>
          <BlogAllPage />
        </DCArtboard>
        <DCArtboard id="golf" label="06 · Industry page — Golf Clubs" width={1440} height={7700}>
          <GolfIndustryPage />
        </DCArtboard>
        <DCArtboard id="golf-blog" label="07 · Blog post — Golf renewals" width={1440} height={5800}>
          <BlogPostPage theme={COMBINED} post={GOLF_FEATURED_POST} related={GOLF_RELATED} />
        </DCArtboard>
        <DCArtboard id="contact" label="08 · Contact us — Studio Violet" width={1440} height={4800}>
          <ContactPage />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="systems"
        title="Design System Spec Sheets"
        subtitle="Tokens, type, components, and iconography per direction. Pick one and we'll build out the rest."
      >
        <DCArtboard id="studio-sys" label="01 · Studio Violet — system" width={1280} height={SYSTEM_H}>
          <SystemCard
            theme={STUDIO}
            name="Studio Violet"
            hero={<>Editorial. <span style={{ color: STUDIO.primary }}>Enterprise.</span></>}
            vibe="Off-white paper, deep enterprise violet, generous whitespace. Big bold geometric sans (Geist), JetBrains Mono accents, IBM-Carbon-style icons. Editorial photography of finance and operations teams as hero imagery. Reads as serious, trustworthy, and modern — without losing warmth."
            radius="soft"
            palette={[
              { name: 'Bg / Paper', color: STUDIO.bg, hex: '#F6F5F0' },
              { name: 'Surface', color: STUDIO.surface, hex: '#FFFFFF' },
              { name: 'Surface alt', color: STUDIO.surfaceAlt, hex: '#EDEAE0' },
              { name: 'Ink', color: STUDIO.ink, hex: '#0F0E14' },
              { name: 'Primary', color: STUDIO.primary, hex: '#4F33D9' },
              { name: 'Accent wash', color: STUDIO.accent, hex: '#E2DCF7' },
              { name: 'Success', color: STUDIO.success, hex: '#1E7A4E' },
              { name: 'Surface deep', color: STUDIO.surfaceDeep, hex: '#0F0E14' },
            ]}
            components={{
              buttons: (
                <>
                  <StudioButton>Contact sales</StudioButton>
                  <StudioButton variant="accent">Get started</StudioButton>
                  <StudioButton variant="secondary">See live demo</StudioButton>
                  <StudioButton size="sm">Sign in</StudioButton>
                </>
              ),
              badges: (
                <>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, background: STUDIO.softTint, color: STUDIO.primary, letterSpacing: 1.5 }}>NEW</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, background: STUDIO.successBg, color: STUDIO.success, letterSpacing: 1.5 }}>LIVE</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, border: `1px solid ${STUDIO.line}`, color: STUDIO.ink, letterSpacing: 1.5 }}>PCI DSS L1</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, border: `1px solid ${STUDIO.line}`, color: STUDIO.ink, letterSpacing: 1.5 }}>ISO 27001</span>
                </>
              ),
            }}
          />
        </DCArtboard>
        <DCArtboard id="carbon-sys" label="02 · Carbon Mono — system" width={1280} height={SYSTEM_H}>
          <SystemCard
            theme={CARBON}
            name="Carbon Mono"
            hero={<>Technical. <span style={{ color: CARBON.primary }}>Precise.</span></>}
            vibe="Pure white surfaces, vivid violet, sharp 0-radius corners. Heavy use of IBM-Carbon-style geometric icons and diagrams. Dense numbered feature grids, technical labels, monospace breadcrumbs. Reads as enterprise infrastructure first — Stripe-confident, no flourish."
            radius="sharp"
            palette={[
              { name: 'Bg / White', color: CARBON.bg, hex: '#FFFFFF' },
              { name: 'Surface alt', color: CARBON.surfaceAlt, hex: '#F4F2EE' },
              { name: 'Ink', color: CARBON.ink, hex: '#0C0B14' },
              { name: 'Ink soft', color: CARBON.inkSoft, hex: '#5A5868' },
              { name: 'Primary', color: CARBON.primary, hex: '#6841F0' },
              { name: 'Primary hover', color: CARBON.primaryHover, hex: '#5631E0' },
              { name: 'Accent wash', color: CARBON.accent, hex: '#D8CCFA' },
              { name: 'Surface deep', color: CARBON.surfaceDeep, hex: '#0C0B14' },
            ]}
            components={{
              buttons: (
                <>
                  <CarbonButton variant="dark">Contact sales</CarbonButton>
                  <CarbonButton>Talk to our team</CarbonButton>
                  <CarbonButton variant="secondary">Read the docs</CarbonButton>
                  <CarbonButton size="sm" variant="dark">Sign in</CarbonButton>
                </>
              ),
              badges: (
                <>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', background: CARBON.softTint, color: CARBON.primary, letterSpacing: 1.5 }}>NEW</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', background: CARBON.successBg, color: CARBON.success, letterSpacing: 1.5 }}>LIVE</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', border: `1px solid ${CARBON.line}`, color: CARBON.ink, letterSpacing: 1.5 }}>01 / 06</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', border: `1px solid ${CARBON.line}`, color: CARBON.ink, letterSpacing: 1.5 }}>PCI DSS L1</span>
                </>
              ),
            }}
          />
        </DCArtboard>
        <DCArtboard id="bold-sys" label="03 · Display Bold — system" width={1280} height={SYSTEM_H}>
          <SystemCard
            theme={BOLD}
            name="Display Bold"
            hero={<>Bold. <span style={{ color: BOLD.primary }}>Loud.</span></>}
            vibe="Pure white paper, electric violet, type that fills the screen. Display headlines up to 200px. Photography is rare but full-bleed when used. Pill buttons, soft mono accents. For a brand that wants to lead with confidence and copy — premium, but not quiet."
            radius="pill"
            palette={[
              { name: 'Bg / Paper', color: BOLD.bg, hex: '#FBFAF6' },
              { name: 'Surface', color: BOLD.surface, hex: '#FFFFFF' },
              { name: 'Surface alt', color: BOLD.surfaceAlt, hex: '#EFECE3' },
              { name: 'Ink', color: BOLD.ink, hex: '#0A0712' },
              { name: 'Primary', color: BOLD.primary, hex: '#5C39F2' },
              { name: 'Primary hover', color: BOLD.primaryHover, hex: '#4929D5' },
              { name: 'Accent wash', color: BOLD.accent, hex: '#D7CEFB' },
              { name: 'Surface deep', color: BOLD.surfaceDeep, hex: '#0A0712' },
            ]}
            components={{
              buttons: (
                <>
                  <BoldButton>Contact sales</BoldButton>
                  <BoldButton variant="accent">Get started</BoldButton>
                  <BoldButton variant="secondary">Get a demo</BoldButton>
                  <BoldButton size="sm">Sign in</BoldButton>
                </>
              ),
              badges: (
                <>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: BOLD.softTint, color: BOLD.primary, letterSpacing: 1.5 }}>NEW</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, background: BOLD.successBg, color: BOLD.success, letterSpacing: 1.5 }}>LIVE</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, border: `1px solid ${BOLD.line}`, color: BOLD.ink, letterSpacing: 1.5 }}>PCI DSS L1</span>
                  <span className="mono" style={{ fontSize: 10, padding: '4px 10px', borderRadius: 999, border: `1px solid ${BOLD.line}`, color: BOLD.ink, letterSpacing: 1.5 }}>ISO 27001</span>
                </>
              ),
            }}
          />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
