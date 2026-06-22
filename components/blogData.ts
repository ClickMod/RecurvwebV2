export interface Post {
  slug: string;
  industry: string;
  category: string;
  readTime: number;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  dateSort: number;
  imageDesc: string;
  imageBg: string;
}

export type BodyBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'ul'; items: string[] };

export interface PostContent {
  slug: string;
  subtitle: string;
  authorTitle: string;
  dateLong: string;
  tags: string[];
  toc: string[];
  body: BodyBlock[];
}

export const POST_CONTENT: Record<string, PostContent> = {
  'sub-renewals-without-spreadsheets': {
    slug: 'sub-renewals-without-spreadsheets',
    subtitle: "Three habits we've seen at the most efficient golf clubs — and the one that quietly kills cash flow every January. A field guide for general managers and honorary treasurers.",
    authorTitle: 'Head of Customer · Recurv',
    dateLong: '12 March 2026',
    tags: ['Golf', 'Operations', 'Subscriptions', 'ZA'],
    toc: [
      'The 1 January problem',
      'Habit 01 — Send the link, not the invoice',
      'Habit 02 — Default to monthly, not annual',
      'Habit 03 — Reconcile weekly, never quarterly',
      'The habit that kills cash flow',
      'What to measure instead',
    ],
    body: [
      { type: 'p', text: "Every January, a familiar message lands in the inbox of every club general manager in the country. It comes from the honorary treasurer, and it reads, in its entirety: \"Subs?\"" },
      { type: 'p', text: "The answer to that one-word question is, for most clubs, a six-week-long spreadsheet exercise that consumes the front-of-house team, blocks tee-times, and ends — at best — with eighty-percent of subs collected by mid-February." },
      { type: 'h2', text: 'The 1 January problem' },
      { type: 'p', text: "Annual subs landing on a single calendar date is a holdover from when the club office ran on a paper ledger and a banker's box. The logic was sensible at the time: collect once, balance the books, get on with the year. In 2026, the logic is mostly inertia." },
      { type: 'p', text: "The problem is concentration risk. One batch date means one failure window. If a member's bank account is short on the 2nd of January — a date that coincides with holiday spending, bonus-cycle delays, and January's notoriously thin personal cash flow — you're chasing that payment for weeks." },
      { type: 'blockquote', text: "The clubs that run the tightest ship aren't necessarily the ones with the most members. They're the ones who've stopped treating collections as an annual event." },
      { type: 'h2', text: 'Habit 01 — Send the link, not the invoice' },
      { type: 'p', text: "The single highest-impact change a club can make is switching from invoice-based collection to mandate-based collection. An invoice is a request — it puts the action on the member. A debit-order mandate puts the action on the bank." },
      { type: 'p', text: "When a member is onboarded, send them a mandate capture link within the same 24 hours. Don't wait for the next billing cycle. Don't batch it with an annual welcome pack. The mandate should be captured before the member's first tee time." },
      { type: 'ul', items: [
        'Mandate capture rate drops below 60% when links are sent more than 7 days after signup.',
        'Same-day links convert at 84% on average across Recurv-managed clubs.',
        'A captured mandate reduces first-payment failure rate by 3–4× vs. EFT invoicing.',
      ]},
      { type: 'h2', text: 'Habit 02 — Default to monthly, not annual' },
      { type: 'p', text: "Annual billing looks better on paper (lower admin overhead, one payment, done). In practice, it concentrates failure risk into a single event and makes member churn invisible until it's too late." },
      { type: 'p', text: "Monthly billing spreads failure across twelve months. A January failure is recoverable — you retry in February. An annual payment failure means the member hasn't paid, and may not pay, for another 12 months. The conversation is harder, the debt is larger, and the relationship has already soured." },
      { type: 'h2', text: 'Habit 03 — Reconcile weekly, never quarterly' },
      { type: 'p', text: "Reconciliation anxiety is real. Many club offices batch their reconciliation to reduce the mental load — monthly, or worse, quarterly. The problem is that errors compound. A mandate that was captured incorrectly, a bank that changed its processing code, a member who changed banks — these surface in the data immediately but stay invisible until someone looks." },
      { type: 'p', text: "Clubs that reconcile weekly catch exceptions within a two-week window. Clubs that reconcile quarterly are routinely surprised by six-figure outstanding balances they didn't know existed." },
      { type: 'h2', text: 'The habit that kills cash flow' },
      { type: 'p', text: "The most damaging habit we see isn't a missing process — it's a verbal one. It's the GM who tells a member: \"Don't worry about January, just pay us when you can.\" The intention is good. The outcome is a category of debt the system doesn't track, the treasurer doesn't know about, and the club writes off three years later." },
      { type: 'p', text: "Every exception — every \"pay us when you can\" — should be logged, dated, and tracked to a payment date. If you can't enforce that internally, the answer is a formal payment plan with a mandate attached, not an informal verbal arrangement." },
      { type: 'h2', text: 'What to measure instead' },
      { type: 'p', text: "Stop measuring \"subs collected\" as a percentage of members. That number is a lagging indicator — it tells you what already happened. The numbers that matter are:" },
      { type: 'ul', items: [
        'Mandate capture rate (target: >90% within 48h of signup)',
        'First-run success rate (target: >92% per batch)',
        'Days-to-recover on failed collections (target: <14 days)',
        'Outstanding balance as % of annual revenue (target: <2%)',
      ]},
      { type: 'p', text: "If you're measuring these four numbers monthly, you'll know whether you have a structural problem before it becomes a January crisis." },
    ],
  },
  'medical-payment-plans-that-work': {
    slug: 'medical-payment-plans-that-work',
    subtitle: "The line between a payment plan and a write-off is usually two SMS reminders and a mandate. A practical walkthrough for practice managers and billing coordinators.",
    authorTitle: 'Medical Advisory · Recurv',
    dateLong: '09 March 2026',
    tags: ['Medical', 'Billing', 'Payment Plans', 'ZA'],
    toc: [
      'Why most payment plans fail',
      'The mandate-first approach',
      'Setting the right instalment amount',
      'Communication cadence that works',
      'When to escalate',
    ],
    body: [
      { type: 'p', text: "A payment plan that a patient signs but doesn't honour is not a payment plan — it's a politely worded write-off. Most medical practices have a stack of these." },
      { type: 'p', text: "The difference between a plan that gets paid and one that doesn't comes down to two things: how the mandate is captured, and how the first instalment is timed. Get both right, and payment plan completion rates routinely hit 80–85%." },
      { type: 'h2', text: 'Why most payment plans fail' },
      { type: 'p', text: "Traditional payment plans are document-based: the patient signs a promise-to-pay form, the billing coordinator files it, and then the chasing begins. The plan is contingent on the patient remembering to pay, having funds available, and navigating the EFT process every month. Each of those steps is a failure point." },
      { type: 'blockquote', text: "A payment plan secured by a debit mandate is collected. A payment plan secured by a signature is requested." },
      { type: 'h2', text: 'The mandate-first approach' },
      { type: 'p', text: "Capture the debit mandate before the patient leaves the consultation room. This is the single highest-impact change a practice can make. Mandate capture rates drop from 91% (at-consult) to 54% (post-discharge letter) to 22% (follow-up call a week later)." },
      { type: 'p', text: "The conversation doesn't need to be clinical. \"We can spread this over three months — I'll just send a link to your phone to set up the debit. It takes about 90 seconds\" is enough. The patient is still in the room, the context is active, and the friction is minimal." },
      { type: 'h2', text: 'Setting the right instalment amount' },
      { type: 'p', text: "The instalment that gets paid is better than the optimal instalment that doesn't. Practices consistently underperform on collections when they insist on a 3-month plan when a patient's budget allows for 6 months." },
      { type: 'ul', items: [
        'Ask what the patient can comfortably pay per month — don\'t present a take-it-or-leave-it figure.',
        'A longer plan with a mandate beats a shorter plan on a promise.',
        'Build in an automatic retry for failed instalments — most failures are timing, not intent.',
      ]},
      { type: 'h2', text: 'Communication cadence that works' },
      { type: 'p', text: "Send one reminder 3 days before each debit. Send a receipt immediately after. If a debit fails, notify the patient on the same day — not a week later. Early notification captures the \"I forgot to transfer funds\" cases before they become disputes." },
      { type: 'h2', text: 'When to escalate' },
      { type: 'p', text: "Two consecutive failed collections with no response to outreach warrants escalation. The threshold is firm — two strikes is enough to act. Practices that wait longer routinely find that the third and fourth months' debits also fail, and the gap is now five months of outstanding value rather than two." },
    ],
  },
  'rent-collection-by-the-1st': {
    slug: 'rent-collection-by-the-1st',
    subtitle: "A debit-order playbook for property managers who are tired of chasing 380 tenants over WhatsApp every month — and want to stop.",
    authorTitle: 'Property Partnerships · Recurv',
    dateLong: '02 March 2026',
    tags: ['Rentals', 'Cash Flow', 'Debit Orders', 'ZA'],
    toc: [
      'The WhatsApp rent-chase loop',
      'Building a mandate-first onboarding flow',
      'Handling bank account changes',
      'The 1st vs the 25th — timing your run date',
      'Failed collections: the recovery sequence',
    ],
    body: [
      { type: 'p', text: "The WhatsApp message goes out at 09:00 on the 1st. By midday, forty-three tenants have responded. By end of day, you've spoken to eleven of them personally. By the 5th, your outstanding rent list has thirty names on it. This is the rent-chase loop, and it's burning your team." },
      { type: 'h2', text: 'The WhatsApp rent-chase loop' },
      { type: 'p', text: "Manual rent collection is a labour problem disguised as a cash flow problem. The cash eventually arrives — usually by the 10th or 15th. But the cost of chasing it, the stress on the team, and the cash-flow gap it creates in the interim are real and measurable costs that don't appear on a P&L." },
      { type: 'blockquote', text: "The 15th-of-the-month rent payment is not a cash flow problem. It's a systems problem. And systems problems have systems solutions." },
      { type: 'h2', text: 'Building a mandate-first onboarding flow' },
      { type: 'p', text: "The mandate should be captured before the tenant receives the keys. Frame it simply: the debit goes off on the 1st, you'll get a notification, and that's your rent sorted for the tenancy. Most tenants are relieved — they'd rather not think about it either." },
      { type: 'ul', items: [
        'Capture the mandate as part of the lease signing process, not as a separate step.',
        'Use a digital mandate link rather than a paper NAEDO form — completion rates are 2× higher.',
        'Verify the bank account with a R1 verification debit before the first full collection.',
      ]},
      { type: 'h2', text: 'Handling bank account changes' },
      { type: 'p', text: "Bank account changes are the leading cause of debit order failure in residential property. A tenant switches banks, forgets to notify you, and the next debit bounces. Build a simple notification flow: when you receive a failed debit, the first message to the tenant is \"Has your banking changed?\" — not an accusation, just a question." },
      { type: 'h2', text: 'The 1st vs the 25th — timing your run date' },
      { type: 'p', text: "Salary credit dates vary. Running debits on the 1st catches the bulk of salaried employees and government workers. Running on the 25th catches end-of-month salary creditors. For a mixed portfolio, consider offering two run dates and letting tenants opt into their preferred date at onboarding." },
      { type: 'h2', text: 'Failed collections: the recovery sequence' },
      { type: 'p', text: "Failed collections should trigger an automatic sequence: SMS on the day of failure, retry on day 3, a second SMS on day 5, and a call flag on day 7. Most failures are resolved within the retry window — the sequence catches them before they require personal intervention." },
    ],
  },
  'sport-club-subs-monthly': {
    slug: 'sport-club-subs-monthly',
    subtitle: "Annual subs concentrate failure risk into one batch run. Monthly subs spread it across twelve months and routinely double sign-up conversion. Here's the arithmetic.",
    authorTitle: 'Growth · Recurv',
    dateLong: '24 February 2026',
    tags: ['Sport', 'Growth', 'Subscriptions', 'ZA'],
    toc: [
      'The annual subs fallacy',
      'Why monthly doubles conversion',
      'The failure-spread argument',
      'Cash flow smoothing in practice',
      'Migrating an existing base',
    ],
    body: [
      { type: 'p', text: "The club treasurer presents the annual subs model as efficient. One batch, one payment, one less thing to think about. The argument is internally coherent — until you look at what it costs in conversion and in failure risk." },
      { type: 'h2', text: 'The annual subs fallacy' },
      { type: 'p', text: "Annual subs feel administratively clean, but they create two structural problems: a conversion barrier and a concentration risk. The conversion barrier is simple — R6,000 up front is a harder ask than R500 per month. The concentration risk is more subtle — all of your collection risk lands in one batch, usually in January, which is the worst possible month for discretionary financial commitments." },
      { type: 'blockquote', text: "A member who signs up in March and pays monthly is worth more to the club than a member who signs up in January and fails their annual debit." },
      { type: 'h2', text: 'Why monthly doubles conversion' },
      { type: 'p', text: "Sport clubs that move from annual to monthly subs consistently report 40–60% increases in new member sign-ups within the first season. The price point becomes accessible. The commitment feels smaller. The psychological friction of \"R6,000\" disappears behind \"R500/month — cancel anytime.\"" },
      { type: 'p', text: "The \"cancel anytime\" clause deserves attention. Most clubs resist it, fearing churn. In practice, churn on monthly sport club subs is low — members leave because of life events (injury, relocation, schedule changes) not because they're looking for an exit clause." },
      { type: 'h2', text: 'The failure-spread argument' },
      { type: 'p', text: "If 5% of your members have a failed debit in any given month, monthly collection spreads that failure across twelve months. You're recovering a small number of failures per month, each within a 30-day window. Annual collection concentrates that same 5% failure rate into one January batch — and your recovery window is the entire following year." },
      { type: 'ul', items: [
        'Monthly failure rate of 5% = 5% of members to chase each month.',
        'Annual failure rate of 5% = 5% of members to chase across the whole year, but with 12× the outstanding balance.',
        'Annual failure hits harder per incident, is harder to recover, and damages relationships more.',
      ]},
      { type: 'h2', text: 'Cash flow smoothing in practice' },
      { type: 'p', text: "Monthly debit orders create a predictable revenue line. You know, within a few percent, what will arrive on the 1st of every month. That predictability makes expense planning, staffing, and capex decisions substantially easier. Annual subs create a feast-in-January, famine-in-November pattern that clubs routinely solve with overdraft facilities." },
      { type: 'h2', text: 'Migrating an existing base' },
      { type: 'p', text: "The objection we hear most is: \"Our existing members are already on annual.\" The answer is to offer conversion, not to force it. Send existing members the option to switch to monthly at a slightly lower annual equivalent — most will take it. Don't cancel their annual payment. Let the existing batch run while you build the monthly base alongside it." },
    ],
  },
  'debit-order-failure-rates': {
    slug: 'debit-order-failure-rates',
    subtitle: "Failed collections are the most-watched, least-understood number on a club balance sheet. Here's how to read them correctly — and what most clubs are measuring wrong.",
    authorTitle: 'Finance · Recurv',
    dateLong: '18 February 2026',
    tags: ['Golf', 'Finance', 'Debit Orders', 'ZA'],
    toc: [
      'What 1.4% actually means',
      'Gross vs net failure rate',
      'The retry effect',
      'Failure causes by category',
      'Benchmarks for South African clubs',
    ],
    body: [
      { type: 'p', text: "A 1.4% debit order failure rate sounds small. On a 600-member club running R2,400/month subscriptions, it's R20,160 of uncollected revenue — every month. Annualised, it's R241,920. That number belongs in your treasurer's report, not buried in a footnote." },
      { type: 'h2', text: 'What 1.4% actually means' },
      { type: 'p', text: "Failure rate is typically quoted as a percentage of total debits attempted. A 1.4% failure rate means that for every 1,000 debit attempts, 14 return unpaid. Those 14 returns arrive back within 2–3 business days, and the clock on recovery starts immediately." },
      { type: 'blockquote', text: "The failure rate is a leading indicator. The outstanding balance is a lagging one. Most clubs only look at the latter — after the damage is done." },
      { type: 'h2', text: 'Gross vs net failure rate' },
      { type: 'p', text: "Gross failure rate counts all initial failures. Net failure rate counts failures after retries. A club with a 4% gross failure rate and an 80% retry success rate has a net failure rate of 0.8%. These are very different numbers telling very different stories about collection health." },
      { type: 'p', text: "Always report net failure rate, but track gross failure rate separately. If your gross rate is rising but your net rate is stable, your retry strategy is compensating for a worsening underlying problem — which will eventually overwhelm your retry capacity." },
      { type: 'h2', text: 'The retry effect' },
      { type: 'p', text: "Most failed debits can be recovered within 5 business days. The retry window matters: a retry on day 2 catches members who had insufficient funds due to timing. A retry on day 5 catches members who received salary between the original run date and the retry. Day 10 is too late for most recoveries." },
      { type: 'ul', items: [
        'Day 2 retry recovers ~45% of failures in most portfolios.',
        'Day 5 retry recovers a further ~25%.',
        'Day 10+ retries recover less than 12%, with higher dispute rates.',
        'Retrying more than twice without a mandate update is rarely productive.',
      ]},
      { type: 'h2', text: 'Failure causes by category' },
      { type: 'p', text: "Failure reasons from NAEDO/DebiCheck returns are more informative than most clubs realise. \"Insufficient funds\" is the most common (typically 55–65% of failures) and the most recoverable. \"Invalid account\" indicates a bank change and requires a mandate update before retrying. \"Disputed\" is the most serious and warrants direct contact before any retry attempt." },
      { type: 'h2', text: 'Benchmarks for South African clubs' },
      { type: 'p', text: "Across the Recurv portfolio of golf and sport clubs, the median net failure rate sits at 1.4%. The top quartile achieves below 0.8%. The bottom quartile exceeds 3.5%. The differentiating factor is almost always mandate quality — clubs with high failure rates typically have an older mandate base with a high proportion of NAEDO mandates versus DebiCheck mandates, or mandates that haven't been re-verified after member bank changes." },
    ],
  },
  'pci-dss-explained': {
    slug: 'pci-dss-explained',
    subtitle: "A jargon-free read on what PCI DSS Level 1 compliance actually means for your business — and what your payments platform is supposed to be handling for you.",
    authorTitle: 'Security & Compliance · Recurv',
    dateLong: '11 February 2026',
    tags: ['Compliance', 'Security', 'PCI DSS', 'ZA'],
    toc: [
      'What PCI DSS actually is',
      'Level 1 vs Level 4 — why it matters',
      'What your platform should own',
      'What you still need to do',
      'The audit question',
    ],
    body: [
      { type: 'p', text: "PCI DSS — the Payment Card Industry Data Security Standard — is one of those acronyms that finance teams encounter once a year, usually when a vendor sends a compliance questionnaire. It sounds like an IT problem. It's actually a shared responsibility, and understanding where the line falls can save your business significant audit cost and liability." },
      { type: 'h2', text: 'What PCI DSS actually is' },
      { type: 'p', text: "PCI DSS is a set of 12 requirements governing how organisations that process, store, or transmit cardholder data must protect that data. It's maintained by the PCI Security Standards Council — a body formed by Visa, Mastercard, Amex, Discover, and JCB — and compliance is enforced through your acquiring bank." },
      { type: 'p', text: "Non-compliance doesn't automatically mean a fine, but it does mean that if you experience a breach, you bear the full cost of the incident, the forensic investigation, and any card-scheme penalties. For a business processing payments at scale, that exposure is material." },
      { type: 'blockquote', text: "PCI compliance is not a feature. It's the floor of responsible payment processing — and most of it should be handled by your platform, not your team." },
      { type: 'h2', text: 'Level 1 vs Level 4 — why it matters' },
      { type: 'p', text: "PCI DSS has four merchant levels based on annual transaction volume. Level 1 (>6 million transactions/year) requires an on-site assessment by a Qualified Security Assessor. Level 4 (fewer than 20,000 e-commerce transactions or 1 million transactions of any type) requires only a Self-Assessment Questionnaire." },
      { type: 'p', text: "Recurv operates as a Level 1 PCI DSS-compliant platform. This means the most demanding compliance requirements are met at the platform layer — and merchants using Recurv for payment processing inherit that compliance scope for the services they consume through our platform." },
      { type: 'h2', text: 'What your platform should own' },
      { type: 'ul', items: [
        'Cardholder data storage and tokenisation.',
        'Transmission security (TLS 1.2+ for all cardholder data in transit).',
        'Vulnerability management and patch cycles for payment infrastructure.',
        'Access controls and audit logging for systems that touch cardholder data.',
        'Annual QSA assessment or SAQ submission.',
      ]},
      { type: 'h2', text: 'What you still need to do' },
      { type: 'p', text: "Even on a Level 1-compliant platform, merchants retain responsibilities. The most common gaps we see: (1) employees with shared login credentials to payment dashboards; (2) cardholder data being emailed or stored in spreadsheets outside the platform; (3) no documented process for responding to a suspected breach. These are your responsibilities, regardless of your platform's compliance level." },
      { type: 'h2', text: 'The audit question' },
      { type: 'p', text: "When a customer or partner asks \"Are you PCI compliant?\", the correct answer is more nuanced than yes or no. You are compliant for the services handled by your platform. You are responsible for the scope outside the platform — and you should be able to describe that scope clearly. If you can't, that's the work to do." },
    ],
  },
};

export const ALL_POSTS: Post[] = [
  {
    slug: 'sub-renewals-without-spreadsheets',
    industry: 'Golf',
    category: 'GOLF · OPERATIONS',
    readTime: 6,
    title: 'Running sub renewals without the spreadsheet panic',
    excerpt: "Three habits we've seen at the most efficient clubs — and the one that quietly kills cash flow every January.",
    author: 'Nomsa Khumalo', authorInitials: 'NK',
    date: '12 MAR 2026', dateSort: 20260312,
    imageDesc: 'Empty fairway, mist over the green', imageBg: '#1F3826',
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
    imageDesc: 'Clinic reception desk, soft daylight', imageBg: '#1F2F4A',
  },
  {
    slug: 'rent-collection-by-the-1st',
    industry: 'Rentals',
    category: 'RENTALS · CASH FLOW',
    readTime: 5,
    title: 'How to collect rent on the 1st — without phoning anyone',
    excerpt: "A debit-order playbook for property managers tired of chasing 380 tenants over WhatsApp every month.",
    author: 'Tariq Mahomed', authorInitials: 'TM',
    date: '02 MAR 2026', dateSort: 20260302,
    imageDesc: 'Townhouse complex, late afternoon', imageBg: '#2F1E1A',
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
    imageDesc: 'Rugby field at first light', imageBg: '#3F2618',
  },
  {
    slug: 'debit-order-failure-rates',
    industry: 'Golf',
    category: 'GOLF · FINANCE',
    readTime: 8,
    title: "What a 1.4% debit order failure rate actually looks like",
    excerpt: "Failed collections are the most-watched, least-understood number on a club balance sheet. Here's how we measure them.",
    author: 'James Botha', authorInitials: 'JB',
    date: '18 FEB 2026', dateSort: 20260218,
    imageDesc: 'Receipt + tee on the bag drop', imageBg: '#1B2D1F',
  },
  {
    slug: 'pci-dss-explained',
    industry: 'Compliance',
    category: 'COMPLIANCE · SECURITY',
    readTime: 9,
    title: "PCI DSS Level 1, explained for finance teams who don't care",
    excerpt: "A jargon-free read on what PCI compliance actually means — and what your platform is supposed to handle for you.",
    author: 'Sipho Adams', authorInitials: 'SA',
    date: '11 FEB 2026', dateSort: 20260211,
    imageDesc: 'Server rack, dim blue light', imageBg: '#0C1322',
  },
];

export const LATEST_POSTS = [...ALL_POSTS].sort((a, b) => b.dateSort - a.dateSort);
