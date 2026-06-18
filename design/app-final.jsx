// Final designs — the selected pages, assembled into one canvas.

// Wraps the API & Docs page so its "Request API access" CTAs open the
// Contact artboard in fullscreen focus.
function ApiDocsArtboard() {
  const ctx = React.useContext(window.DCCtx);
  return <ApiDocsPage onContact={() => ctx && ctx.setFocus('final/contact')} />;
}

function FinalApp() {
  const HOMEPAGE_H = 5600;

  return (
    <DesignCanvas>
      <DCSection
        id="final"
        title="Final Designs · Recurv"
        subtitle="The selected pages. Open any artboard fullscreen to scroll the full page."
      >
        <DCArtboard id="final-copy" label="04 · Final copy — approved homepage copy" width={1440} height={HOMEPAGE_H + 1700}>
          <FinalCopyHomepage />
        </DCArtboard>
        <DCArtboard id="final-copy-v2" label="04 · v2 — adds Fully Configurable section" width={1440} height={HOMEPAGE_H + 3200}>
          <FinalCopyV2Homepage />
        </DCArtboard>
        <DCArtboard id="combined-white" label="04b · Combined White — Bold header scale" width={1440} height={HOMEPAGE_H + 1700}>
          <CombinedWhiteHomepage />
        </DCArtboard>
        <DCArtboard id="blog-index" label="05 · Blog index — all posts, filterable" width={1440} height={3320}>
          <BlogAllPage />
        </DCArtboard>
        <DCArtboard id="golf" label="06 · Industry page — Golf Clubs" width={1440} height={7700}>
          <GolfIndustryPage />
        </DCArtboard>
        <DCArtboard id="golf-blog" label="07 · Blog post — Golf renewals" width={1440} height={5800}>
          <BlogPostPage theme={COMBINED_WHITE} post={GOLF_FEATURED_POST} related={GOLF_RELATED} />
        </DCArtboard>
        <DCArtboard id="api-docs" label="09 · API & docs — plug into any platform" width={1440} height={4060}>
          <ApiDocsArtboard />
        </DCArtboard>
        <DCArtboard id="contact" label="08 · Contact us — Combined White" width={1440} height={4800}>
          <ContactPage />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FinalApp />);
