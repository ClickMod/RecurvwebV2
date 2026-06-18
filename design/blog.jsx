// Blog primitives — reusable across industry pages.
//
// Exports:
//   <BlogSection theme posts /> — 3-up grid with intro on a tagged industry page
//   <BlogPostPage theme post />  — full editorial article layout
//
// All posts are placeholders authored for the Recurv brand voice.

// ─── BlogCard ─────────────────────────────────────────────────────────
function BlogCard({ theme, post, size = 'md' }) {
  const t = theme;
  return (
    <article style={{
      background: t.surface, border: `1px solid ${t.line}`, borderRadius: 12,
      padding: 16, display: 'flex', flexDirection: 'column', gap: 18,
      height: '100%', boxSizing: 'border-box'
    }}>
      <PhotoSlot
        label={post.imageDesc}
        caption={post.category}
        tint={t.primary}
        bg={post.imageBg || '#1F3826'}
        ratio={size === 'lg' ? '16 / 9' : '4 / 3'}
        rounded={8}
        variant="gradient" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5 }}>
          {post.category} · {post.readTime} MIN READ
        </div>
        <h3 style={{
          fontFamily: t.fontDisplay, fontSize: size === 'lg' ? 26 : 22, fontWeight: 500,
          letterSpacing: '-0.025em', lineHeight: 1.15, margin: 0
        }}>{post.title}</h3>
        <p style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, margin: 0 }}>{post.excerpt}</p>
        <div style={{
          marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${t.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13
        }}>
          <span style={{ color: t.ink, fontWeight: 500 }}>{post.author}</span>
          <span className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>{post.date}</span>
        </div>
      </div>
    </article>);

}

// ─── BlogSection (used inside an industry page) ────────────────────────
function BlogSection({ theme, label, heading, accentLine, posts, ctaLabel = 'All articles' }) {
  const t = theme;
  return (
    <section style={{ padding: '0 56px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>{label}</div>
          <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 1, letterSpacing: '-0.035em', margin: 0, maxWidth: 800 }}>
            {heading} <span style={{ color: t.primary }}>{accentLine}</span>
          </h2>
        </div>
        <button style={{ padding: '13px 22px', fontSize: 14, borderRadius: 6, border: `1px solid rgba(15,14,20,0.20)`, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>{ctaLabel} <span>→</span></button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {posts.map((p) => <BlogCard key={p.slug} theme={t} post={p} />)}
      </div>
    </section>);

}

// ─── Sample posts ─────────────────────────────────────────────────────
const GOLF_POSTS = [
{
  slug: 'sub-renewals-without-spreadsheets',
  category: 'GOLF · OPERATIONS',
  readTime: 6,
  title: 'Running sub renewals without the spreadsheet panic',
  excerpt: 'Three habits we\'ve seen at the most efficient clubs — and the one that quietly kills cash flow every January.',
  author: 'Nomsa Khumalo',
  authorInitials: 'NK',
  date: '12 MAR 2026',
  imageDesc: 'Empty fairway, mist over the green',
  imageBg: '#1F3826'
},
{
  slug: 'debit-order-failure-rates',
  category: 'GOLF · FINANCE',
  readTime: 8,
  title: 'What a 1.4% debit order failure rate actually looks like',
  excerpt: 'Failed collections are the most-watched, least-understood number on a club balance sheet. Here\'s how we measure them — and what to ignore.',
  author: 'James Botha',
  authorInitials: 'JB',
  date: '04 MAR 2026',
  imageDesc: 'Close-up of receipt + tee on the bag drop',
  imageBg: '#1B2D1F'
},
{
  slug: 'pro-shop-recurring-revenue',
  category: 'GOLF · GROWTH',
  readTime: 5,
  title: 'The pro shop is your most overlooked recurring revenue line',
  excerpt: 'Locker rentals, range cards, junior coaching subscriptions — turning ad-hoc till sales into reliable monthly income.',
  author: 'Ayanda Dlamini',
  authorInitials: 'AD',
  date: '21 FEB 2026',
  imageDesc: 'Pro shop interior, warm afternoon light',
  imageBg: '#2A3826'
}];


const GOLF_FEATURED_POST = {
  slug: 'sub-renewals-without-spreadsheets',
  category: 'GOLF · OPERATIONS',
  readTime: 6,
  title: 'Running sub renewals without the spreadsheet panic',
  subtitle: 'Three habits we\'ve seen at the most efficient golf clubs — and the one quietly kills cash flow every January. A field guide for general managers and honorary treasurers.',
  author: 'Nomsa Khumalo',
  authorInitials: 'NK',
  authorTitle: 'Head of Customer · Recurv',
  dateLong: '12 March 2026',
  date: '12 MAR 2026',
  imageDesc: 'Empty fairway, mist over the green — wide editorial',
  imageBg: '#1F3826',
  tags: ['Golf', 'Operations', 'Subscriptions', 'ZA'],
  toc: [
  'The 1 January problem',
  'Habit 01 — Send the link, not the invoice',
  'Habit 02 — Default to monthly, not annual',
  'Habit 03 — Reconcile weekly, never quarterly',
  'The habit that kills cash flow',
  'What to measure instead'],
  body: [
  { type: 'p', text: 'Every January, a familiar message lands in the inbox of every club general manager in the country. It comes from the honorary treasurer, and it reads, in its entirety: "Subs?"' },
  { type: 'p', text: 'The answer to that one-word question is, for most clubs, a six-week-long spreadsheet exercise that consumes the front-of-house team, blocks tee-times, and ends — at best — with eighty-percent of subs collected by mid-February.' },
  { type: 'h2', text: 'The 1 January problem' },
  { type: 'p', text: 'Annual subs landing on a single calendar date is a holdover from when the club office ran on a paper ledger and a banker\'s box. The logic was sensible at the time: collect once, balance the books, get on with the year. In 2026, the logic is mostly inertia.' }]
};

const GOLF_RELATED = GOLF_POSTS.slice(1);

// ─── Cross-industry library ────────────────────────────────────────────
const ALL_POSTS = [
{
  slug: 'sub-renewals-without-spreadsheets',
  industry: 'Golf',
  category: 'GOLF · OPERATIONS',
  readTime: 6,
  title: 'Running sub renewals without the spreadsheet panic',
  excerpt: 'Three habits we\'ve seen at the most efficient clubs — and the one that quietly kills cash flow every January.',
  author: 'Nomsa Khumalo', authorInitials: 'NK',
  date: '12 MAR 2026', dateSort: 20260312,
  imageDesc: 'Empty fairway, mist over the green', imageBg: '#1F3826'
},
{
  slug: 'medical-payment-plans-that-work',
  industry: 'Medical',
  category: 'MEDICAL · BILLING',
  readTime: 7,
  title: 'Designing patient payment plans that actually get paid',
  excerpt: 'The line between a payment plan and a write-off is usually two SMS reminders. A practical guide for practice managers.',
  author: 'Dr. Lerato Mokoena', authorInitials: 'LM',
  date: '09 MAR 2026', dateSort: 20260309,
  imageDesc: 'Clinic reception desk, soft daylight', imageBg: '#1F2F4A'
},
{
  slug: 'rent-collection-by-the-1st',
  industry: 'Rentals',
  category: 'RENTALS · CASH FLOW',
  readTime: 5,
  title: 'How to collect rent on the 1st — without phoning anyone',
  excerpt: 'A debit-order playbook for property managers tired of chasing 380 tenants over WhatsApp every month.',
  author: 'Tariq Mahomed', authorInitials: 'TM',
  date: '02 MAR 2026', dateSort: 20260302,
  imageDesc: 'Townhouse complex, late afternoon', imageBg: '#2F1E1A'
},
{
  slug: 'sport-club-subs-monthly',
  industry: 'Sport',
  category: 'SPORT · GROWTH',
  readTime: 6,
  title: 'Why every sport club should move subs to monthly',
  excerpt: 'Annual subs concentrate failure risk into one batch. Monthly subs spread it across twelve — and double sign-ups.',
  author: 'James Botha', authorInitials: 'JB',
  date: '24 FEB 2026', dateSort: 20260224,
  imageDesc: 'Rugby field at first light', imageBg: '#3F2618'
},
{
  slug: 'debit-order-failure-rates',
  industry: 'Golf',
  category: 'GOLF · FINANCE',
  readTime: 8,
  title: 'What a 1.4% debit order failure rate actually looks like',
  excerpt: 'Failed collections are the most-watched, least-understood number on a club balance sheet. Here\'s how we measure them.',
  author: 'James Botha', authorInitials: 'JB',
  date: '18 FEB 2026', dateSort: 20260218,
  imageDesc: 'Receipt + tee on the bag drop', imageBg: '#1B2D1F'
},
{
  slug: 'pci-dss-explained-for-finance-teams',
  industry: 'Compliance',
  category: 'COMPLIANCE · SECURITY',
  readTime: 9,
  title: 'PCI DSS Level 1, explained for finance teams who don\'t care',
  excerpt: 'A jargon-free read on what PCI compliance actually means for your business — and what your platform is supposed to handle for you.',
  author: 'Sipho Adams', authorInitials: 'SA',
  date: '11 FEB 2026', dateSort: 20260211,
  imageDesc: 'Server rack, dim blue light', imageBg: '#0C1322'
}];


const LATEST_POSTS = [...ALL_POSTS].sort((a, b) => b.dateSort - a.dateSort);

Object.assign(window, {
  BlogSection, BlogCard,
  GOLF_POSTS, GOLF_FEATURED_POST, GOLF_RELATED,
  ALL_POSTS, LATEST_POSTS
});
