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
