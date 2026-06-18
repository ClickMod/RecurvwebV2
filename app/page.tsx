"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { CarbonIcon } from "@/components/CarbonIcon";
import { CarbonHeroDiagram } from "@/components/CarbonHeroDiagram";
import { PhotoSlot } from "@/components/PhotoSlot";
import { DashboardMock } from "@/components/DashboardMock";
import { BlogCard } from "@/components/BlogCard";
import { LATEST_POSTS, ALL_POSTS } from "@/components/blogData";
import { theme as t } from "@/components/theme";

const FEATURES = [
  { num: "01", icon: "mandate", title: "Cut the admin", desc: "Automate authorisation capture, payment scheduling, and bank reconciliation. What used to take your team hours happens in the background — with a single dashboard and complete audit-grade records." },
  { num: "02", icon: "wallet", title: "Collect with confidence", desc: "Bank-grade rails with intelligent retry logic, automated reminders, and zero manual chasing. Whether you collect on the 1st, the 25th, or at the end of every term — Recurv handles it." },
  { num: "03", icon: "plug", title: "Plug into any stack", desc: "Standalone dashboard, REST API, or both. Connect to Xero, Sage, and your existing CRM in minutes. No ripping out what already works." },
  { num: "04", icon: "shield", title: "Secure by default", desc: "PCI DSS Level 1 certified. SARB-compliant rails. ISO-aligned data handling. Customer banking details are tokenised on capture and never stored in plaintext — by us, or by you." },
  { num: "05", icon: "graph", title: "Built for insight", desc: "See exactly what's been collected, what's pending, and what needs attention. Forecast cashflow, monitor plan performance, and export a reconciled ledger in one click." },
];

const COLLECTION_TYPES = [
  { icon: "bolt", title: "Once-off collection", desc: "Collect a single payment and close the instruction. Ideal for deposits, registration fees, or any charge that only needs to happen once.", use: "Deposit · registration fee" },
  { icon: "schedule", title: "Fixed-term collections", desc: "Set a defined number of collections — say, 10 monthly instalments — and Recurv stops automatically when the term ends.", use: "10 monthly instalments" },
  { icon: "cycle", title: "Ongoing collections", desc: "No end date. Collections continue until you cancel or the customer requests a stop. Built for memberships and subscriptions.", use: "Memberships · subscriptions" },
  { icon: "wallet", title: "Ad hoc fees", desc: "Add a once-off charge to any active collection — for a callout fee, admin cost, or event ticket — without disrupting the schedule. It collects once, then drops off.", use: "Callout · admin · event fee" },
  { icon: "graph", title: "Variable amounts", desc: "Collect a different amount each month. Set a variable rate and update it before each collection run. Useful for usage-based billing and levy adjustments.", use: "Levy adjustments · usage" },
];

const INDUSTRIES_COMPACT = [
  { h: "Golf & country clubs", collect: "Membership dues & green fees", clients: "47 clubs", vol: "R 4.2M", tint: "#3E6B47", bg: "#16241A" },
  { h: "Medical & dental", collect: "Patient payment plans", clients: "120 practices", vol: "R 6.8M", tint: "#3D5C8A", bg: "#141E2E" },
  { h: "Sport clubs & unions", collect: "Subs, term fees & event collections", clients: "80 codes", vol: "R 1.4M", tint: "#9A6B3E", bg: "#241A12" },
];

const STATS: [string, string][] = [
  ["R 2M+", "Collected monthly across the platform"],
  ["98.6%", "First-attempt collection success"],
  ["< 1 day", "Median time from signup to first live collection"],
  ["240+", "South African teams running Recurv"],
];

const FOOTER_LINKS: [string, string[]][] = [
  ["Product", ["Recurring payments", "Authorisation capture", "Self-service portal", "Dashboard", "API & docs"]],
  ["Solutions", ["Golf & sport", "Medical", "Property & rentals", "Subscriptions", "Payment plans"]],
  ["Company", ["About", "Careers", "Blog", "Contact", "Security"]],
  ["Resources", ["Calculator", "Guides", "Changelog", "Status", "Legal"]],
];

export default function Home() {
  return (
    <div style={{ background: t.bg, color: t.ink, fontFamily: t.fontBody }}>

      {/* ── Nav ──────────────────────────────────────────── */}
      <header style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 32,
        alignItems: "center",
        padding: "22px 56px",
        borderBottom: `1px solid ${t.line}`,
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
      }}>
        <Logo color={t.ink} accent={t.primary} />
        <nav style={{ display: "flex", gap: 28, justifyContent: "center", fontSize: 14, color: t.ink }}>
          {(["Features", "Industries", "Pricing", "Contact us"] as const).map((name, i) => (
            <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 450, cursor: "pointer" }}>
              {name}
              {i < 2 && (
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" />
                </svg>
              )}
            </span>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 14, cursor: "pointer" }}>Sign in</span>
          <Button size="sm">Book a live demo</Button>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ padding: "64px 56px 96px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 28 }}>
            PAYMENT COLLECTIONS · ZA
          </div>
          <h1 style={{
            fontFamily: t.fontDisplay,
            fontWeight: 500,
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            margin: 0,
          }}>
            Stop chasing payments.<br />
            <span style={{ color: t.primary }}>Start running your business.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: t.inkSoft, marginTop: 32, maxWidth: 560 }}>
            Recurv handles the full collection cycle — from payment authorisation to reconciliation —
            across membership dues, payment plans, rent, subscriptions, and more. One platform, less admin,
            every rand accounted for.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Button size="lg">Book a live demo</Button>
            <Button size="lg" variant="secondary" icon={<span>→</span>}>Speak to sales</Button>
          </div>
          <div className="mono" style={{ marginTop: 48, fontSize: 11, color: t.inkSoft, letterSpacing: 1, display: "flex", gap: 24 }}>
            <span>PCI DSS L1</span><span>·</span><span>ISO 27001</span><span>·</span><span>SARB COMPLIANT</span>
          </div>
          <div className="mono" style={{
            marginTop: 18, paddingTop: 18, borderTop: `1px solid ${t.line}`,
            fontSize: 11, color: t.primary, letterSpacing: 1.5, display: "flex", gap: 16,
          }}>
            <span>AUTHORISE</span><span style={{ color: t.inkSoft }}>·</span>
            <span>SCHEDULE</span><span style={{ color: t.inkSoft }}>·</span>
            <span>COLLECT</span><span style={{ color: t.inkSoft }}>·</span>
            <span>RECONCILE</span>
          </div>
        </div>
        <div style={{ aspectRatio: "1", width: "100%" }}>
          <CarbonHeroDiagram accent={t.primary} />
        </div>
      </section>

      {/* ── Recurv Core ─────────────────────────────────── */}
      <section style={{ padding: "0 56px 120px" }}>
        <div style={{ borderTop: `1px solid ${t.line}`, paddingTop: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 64 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>RECURV CORE</div>
              <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0 }}>
                Payment operations, built for{" "}
                <span style={{ color: t.primary }}>South African enterprise scale.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                Recurv is the payment collection layer trusted by golf clubs, medical practices, sport unions, and
                property managers across the country. One platform handles authorisation capture, scheduling,
                collections, retries, and reconciliation — for any payment structure, at any volume, with the
                audit trail your accountant actually wants.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderTop: `1px solid ${t.line}` }}>
            {FEATURES.map((f, i) => (
              <div key={f.num} style={{
                padding: "32px 24px",
                borderRight: i < 4 ? `1px solid ${t.line}` : "none",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}>
                <CarbonIcon name={f.icon} color={t.primary} size={44} />
                <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5 }}>{f.num}</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{f.title}</div>
                <div style={{ fontSize: 13.5, color: t.inkSoft, lineHeight: 1.55 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fully Configurable ──────────────────────────── */}
      <section style={{ padding: "96px 56px 120px", borderTop: `1px solid ${t.line}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, marginBottom: 56 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>FULLY CONFIGURABLE</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 48, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0 }}>
              Your billing model.<br /><span style={{ color: t.primary }}>Your rules.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
              Every business collects differently. Recurv is built around that reality — not against it.
              Configure exactly how and when you collect, per customer, per plan, with no workarounds required.
            </p>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${t.lineStrong}` }}>
          {COLLECTION_TYPES.map((c, i) => (
            <div key={c.title} style={{
              display: "grid",
              gridTemplateColumns: "64px 1.1fr 2fr 1fr",
              gap: 32,
              alignItems: "start",
              padding: "30px 8px",
              borderBottom: `1px solid ${t.line}`,
            }}>
              <div className="mono" style={{ fontSize: 13, color: t.primary, letterSpacing: 1, paddingTop: 6 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <CarbonIcon name={c.icon} color={t.primary} size={36} />
                <div style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05 }}>{c.title}</div>
              </div>
              <div style={{ fontSize: 15, color: t.inkSoft, lineHeight: 1.6, paddingTop: 4 }}>{c.desc}</div>
              <div style={{ paddingTop: 4 }}>
                <span className="mono" style={{
                  fontSize: 11, color: t.primary, letterSpacing: 1,
                  padding: "6px 12px", borderRadius: 999, border: `1px solid ${t.line}`,
                  background: t.softTint, display: "inline-block", lineHeight: 1.4,
                }}>
                  {c.use.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Two payment rails */}
        <div style={{
          marginTop: 64, background: t.surfaceDeep, color: t.inkOnDeep, borderRadius: 16,
          padding: "56px 48px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 64, alignItems: "center",
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5, marginBottom: 20 }}>TWO PAYMENT RAILS</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 44, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0 }}>
              Card or EFT debit order —<br /><span style={{ color: "#A89BF0" }}>your customer&rsquo;s choice.</span>
            </h2>
            <p style={{ fontSize: 16, color: t.inkOnDeepSoft, lineHeight: 1.6, marginTop: 22, maxWidth: 480 }}>
              Recurv runs on both card payment rails and EFT debit orders, so your customers can authorise
              collections the way that works for them. More options means fewer drop-offs at authorisation
              and a higher first-attempt success rate across your book.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "wallet", title: "Card payments", desc: "Fast authorisation, broad customer reach. Customers authorise via card — no bank branch required." },
              { icon: "mandate", title: "EFT Debit orders", desc: "The trusted South African standard. SARB-compliant debit order rails with DebiCheck support and intelligent retry logic." },
            ].map((r) => (
              <div key={r.title} style={{
                background: "rgba(246,245,240,0.05)",
                border: "1px solid rgba(246,245,240,0.14)",
                borderRadius: 12,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}>
                <CarbonIcon name={r.icon} color="#A89BF0" size={40} />
                <div style={{ fontFamily: t.fontDisplay, fontSize: 19, fontWeight: 500, letterSpacing: "-0.02em" }}>{r.title}</div>
                <div style={{ fontSize: 13.5, color: t.inkOnDeepSoft, lineHeight: 1.55 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unified Dashboard ───────────────────────────── */}
      <section style={{ padding: "0 56px 120px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>UNIFIED DASHBOARD</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0 }}>
              Every collection. Every customer.<br /><span style={{ color: t.primary }}>In one place.</span>
            </h2>
            <p style={{ fontSize: 17, color: t.inkSoft, lineHeight: 1.6, marginTop: 24 }}>
              Ditch the spreadsheets and the WhatsApp reminders. Recurv gives your finance team a single view
              of every payment plan, subscription, and collection run — with real-time data to spot problems
              early, forecast accurately, and act fast.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["Live cashflow tracking", "Watch revenue land as it happens, across every plan and customer."],
                ["Retry intelligence", "Failed collections are retried at the right time, for the right reason. Automatically."],
                ["Reconciled export", "One-click CSV that matches your bank statement, every time."],
              ].map(([h, d]) => (
                <div key={h} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 14 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 999,
                    border: `2px solid ${t.primary}`, marginTop: 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ width: 6, height: 6, background: t.primary, borderRadius: 999, display: "block" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{h}</div>
                    <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.55, marginTop: 2 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <Button variant="ghost" icon={<span>→</span>}>
                <span style={{ borderBottom: `1.5px solid ${t.ink}`, paddingBottom: 2 }}>Explore the dashboard</span>
              </Button>
            </div>
          </div>
          <div>
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────── */}
      <section style={{ padding: "80px 56px 100px", borderTop: `1px solid ${t.line}`, background: t.surfaceAlt }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 44 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>INDUSTRIES</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 1, letterSpacing: "-0.035em", margin: 0 }}>
              Built for every billing pattern,<br /><span style={{ color: t.primary }}>not just monthly debit orders.</span>
            </h2>
            <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.55, marginTop: 20, maxWidth: 560 }}>
              Membership dues, term fees, payment plans, or monthly rent — Recurv adapts
              to your billing cycle, not the other way around.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingBottom: 4 }}>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>R 30.6M COLLECTED / MONTH</div>
            <Button variant="secondary">All industries →</Button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.12fr 1fr", gap: 16, alignItems: "stretch" }}>
          {/* Featured tile — Property & Rentals */}
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 520 }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <PhotoSlot tint="#6E4A2A" bg="#241813" variant="spotlight" rounded={0} style={{ height: "100%", aspectRatio: "auto" }}>
                <span />
              </PhotoSlot>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,14,20,0.12) 0%, transparent 32%, rgba(15,14,20,0.55) 78%, rgba(15,14,20,0.82) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 32 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)" }}>TOWNHOUSE COMPLEX · DROP IMAGE</div>
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "#E9C9A6", marginBottom: 12 }}>HIGHEST VOLUME</div>
                <div style={{ fontFamily: t.fontDisplay, fontSize: 40, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>Property & rentals</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.5, margin: "14px 0 22px", maxWidth: 420 }}>
                  Rent collection, tenant onboarding & deposit management — automated end to end.
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>MONTHLY VOLUME</div>
                    <div style={{ fontFamily: t.fontDisplay, fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em", color: "#fff" }}>
                      R 18.2M<span style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}> /mo</span>
                    </div>
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>ACTIVE</div>
                    <div className="mono" style={{ fontSize: 15, color: "rgba(255,255,255,0.92)" }}>380 properties</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 14, fontWeight: 500, paddingBottom: 6, cursor: "pointer" }}>
                    See use case <span style={{ fontSize: 17 }}>→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three compact industry rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {INDUSTRIES_COMPACT.map((ind) => (
              <div key={ind.h} style={{
                flex: 1, display: "grid", gridTemplateColumns: "132px 1fr", gap: 20, alignItems: "center",
                background: t.surface, border: `1px solid ${t.line}`, borderRadius: 14, padding: 14,
              }}>
                <div style={{ position: "relative", alignSelf: "stretch", minHeight: 120 }}>
                  <div style={{ position: "absolute", inset: 0 }}>
                    <PhotoSlot tint={ind.tint} bg={ind.bg} variant="spotlight" rounded={10} style={{ height: "100%", aspectRatio: "auto" }}>
                      <span />
                    </PhotoSlot>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingRight: 8 }}>
                  <div style={{ fontFamily: t.fontDisplay, fontSize: 23, fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.05 }}>{ind.h}</div>
                  <div style={{ fontSize: 14, color: t.inkSoft, lineHeight: 1.4 }}>{ind.collect}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 10, paddingTop: 12, borderTop: `1px solid ${t.line}` }}>
                    <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: t.ink }}>
                      {ind.vol}<span style={{ fontSize: 12, color: t.inkSoft, fontWeight: 400 }}> /mo</span>
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 0.5 }}>{ind.clients}</div>
                    <div style={{ marginLeft: "auto", color: t.primary, fontSize: 17, cursor: "pointer" }}>→</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ────────────────────────────────────────── */}
      <section style={{ padding: "96px 56px 120px", borderTop: `1px solid ${t.line}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginBottom: 48 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>FROM THE BLOG</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 1, letterSpacing: "-0.035em", margin: 0, maxWidth: 820 }}>
              Field notes on payment operations —{" "}
              <span style={{ color: t.primary }}>written by the team.</span>
            </h2>
            <p style={{ fontSize: 16, color: t.inkSoft, lineHeight: 1.55, marginTop: 20, maxWidth: 640 }}>
              Practical, vendor-neutral writing on collections, payment plans, and running a finance team across South Africa.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <Button variant="secondary" icon={<span>→</span>}>View all articles</Button>
            <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1 }}>
              {ALL_POSTS.length} ARTICLES · UPDATED WEEKLY
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {LATEST_POSTS.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── Security ────────────────────────────────────── */}
      <section style={{ background: t.surfaceDeep, color: t.inkOnDeep, padding: "120px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5, marginBottom: 20 }}>SECURITY & COMPLIANCE</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 56, lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0 }}>
              PCI&nbsp;DSS Level&nbsp;1 +<br /><span style={{ color: "#A89BF0" }}>ISO&nbsp;27001 aligned.</span>
            </h2>
            <p style={{ fontSize: 17, color: t.inkOnDeepSoft, lineHeight: 1.6, marginTop: 24 }}>
              We take data protection seriously — encryption at rest and in transit, regular internal audits, and
              proactive monitoring. Customer banking details are tokenised on capture and never stored in
              plaintext — by us, or by you.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
              {[
                ["PCI DSS", "Level 1, the highest tier for payment data handling."],
                ["ISO 27001", "Information security management, aligned and audited."],
                ["SARB", "Compliant collection rails, operated locally in South Africa."],
              ].map(([h, d]) => (
                <div key={h} style={{ borderTop: "1px solid rgba(246,245,240,0.18)", paddingTop: 16 }}>
                  <div className="mono" style={{ fontSize: 11, color: "#A89BF0", letterSpacing: 1.5 }}>{h}</div>
                  <div style={{ fontSize: 13, color: t.inkOnDeepSoft, marginTop: 8, lineHeight: 1.55 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <PhotoSlot
            label="Security ops — server rack / lock close-up"
            caption="SECURE · ZA · 1200 × 900"
            tint={t.primary}
            bg="#08070F"
            ratio="4 / 3"
            rounded={12}
            variant="spotlight"
          />
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section style={{ padding: "88px 56px", background: t.surface, borderBottom: `1px solid ${t.line}` }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
          background: t.line, border: `1px solid ${t.line}`, borderRadius: 12, overflow: "hidden",
        }}>
          {STATS.map(([v, l]) => (
            <div key={l} style={{ background: t.surface, padding: "40px 32px" }}>
              <div style={{ fontFamily: t.fontDisplay, fontSize: 64, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 14, color: t.inkSoft, marginTop: 12, maxWidth: 220, lineHeight: 1.45 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "120px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
          <div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 96, lineHeight: 0.94, letterSpacing: "-0.045em", margin: 0 }}>
              More revenue.<br /><span style={{ color: t.primary }}>Less admin.</span>
            </h2>
            <p style={{ fontSize: 19, color: t.inkSoft, lineHeight: 1.55, marginTop: 24, maxWidth: 540 }}>
              Connect with our team to see Recurv in action. We&rsquo;ll walk you through pricing, integrations,
              and a tailored setup for your industry — usually in 30 minutes or less.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <Button size="lg">Book a live demo</Button>
            <Button size="lg" variant="secondary" icon={<span>→</span>}>Speak to sales</Button>
            <div style={{ marginTop: 12, fontSize: 13, color: t.inkSoft }}>
              Or email <span style={{ color: t.ink, fontWeight: 600 }}>sales@recurv.tech</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${t.line}` }}>
        {/* Newsletter */}
        <div style={{
          padding: "72px 56px 56px",
          display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "end",
          borderBottom: `1px solid ${t.line}`,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: t.primary, letterSpacing: 1.5, marginBottom: 20 }}>STAY IN THE LOOP</div>
            <h2 style={{ fontFamily: t.fontDisplay, fontWeight: 500, fontSize: 52, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, maxWidth: 560 }}>
              Payment operations insights,{" "}
              <span style={{ color: t.primary }}>once a month.</span>
            </h2>
          </div>
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
              <div style={{
                flex: 1, display: "flex", alignItems: "center", padding: "0 18px",
                border: `1px solid ${t.lineStrong}`, borderRadius: 8, fontSize: 15, color: t.inkSoft, height: 52,
              }}>
                you@company.co.za
              </div>
              <Button size="lg">Subscribe</Button>
            </div>
            <div style={{ fontSize: 12.5, color: t.inkSoft, marginTop: 14, lineHeight: 1.5 }}>
              No spam. Unsubscribe anytime. Read by 2,400+ finance teams across South Africa.
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div style={{ padding: "48px 56px 40px", display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 48 }}>
          <div>
            <Logo color={t.ink} accent={t.primary} />
            <p style={{ fontSize: 13.5, color: t.inkSoft, marginTop: 18, lineHeight: 1.6, maxWidth: 280 }}>
              Payment collection infrastructure for South African businesses.
            </p>
            <div style={{ marginTop: 22, display: "flex", gap: 8, alignItems: "center" }}>
              {["PCI DSS L1", "ISO 27001", "SARB"].map((b) => (
                <span key={b} className="mono" style={{ fontSize: 11, padding: "4px 8px", border: `1px solid ${t.line}`, borderRadius: 4, color: t.inkSoft }}>{b}</span>
              ))}
            </div>
          </div>
          {FOOTER_LINKS.map(([heading, items]) => (
            <div key={heading}>
              <div className="mono" style={{ fontSize: 11, color: t.inkSoft, letterSpacing: 1.5, marginBottom: 14 }}>{heading.toUpperCase()}</div>
              <ul style={{ padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: t.ink, cursor: "pointer" }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark */}
        <div style={{ padding: "8px 56px 0", overflow: "hidden" }}>
          <div style={{
            fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 286, lineHeight: 0.8,
            letterSpacing: "-0.05em", color: t.ink, whiteSpace: "nowrap",
          }}>
            Recurv<span style={{ color: t.primary }}>.</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "24px 56px 32px", borderTop: `1px solid ${t.line}`,
          display: "flex", justifyContent: "space-between", fontSize: 12, color: t.inkSoft,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span>© 2026 Recurv.Tech Pty Ltd · Cape Town · 🇿🇦</span>
            <a
              href="https://clickmod.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: t.inkSoft, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Powered by <span style={{ color: t.primary, fontWeight: 600 }}>Clickmod</span>
            </a>
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span className="mono">All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
