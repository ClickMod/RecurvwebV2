"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { theme as t } from "@/components/theme";

const NAV_LINKS = ["Features", "Industries"] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-[100] backdrop-blur-[8px]"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderBottom: `1px solid ${t.line}`,
      }}
    >
      {/* Desktop + mobile top bar */}
      <div className="flex items-center justify-between gap-8 px-4 py-[22px] md:px-8 lg:px-14">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/primarylogo.png" alt="Recurv" width={160} height={48} style={{ width: 160, height: "auto" }} priority />
        </Link>

        {/* Desktop nav — hidden below md */}
        <nav className="hidden md:flex items-center justify-center gap-7" style={{ fontSize: 14, color: t.ink }}>
          {NAV_LINKS.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 cursor-pointer transition-[color,opacity] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
              style={{ fontWeight: 450 }}
            >
              {name}
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" />
              </svg>
            </span>
          ))}
          <Link href="/api-docs" style={{ textDecoration: "none", color: "inherit" }}>
            <span
              className="inline-flex items-center cursor-pointer transition-[color,opacity] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
              style={{ fontWeight: 450 }}
            >
              API Docs
            </span>
          </Link>
          <Link href="/contactus" style={{ textDecoration: "none", color: "inherit" }}>
            <span
              className="inline-flex items-center cursor-pointer transition-[color,opacity] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
              style={{ fontWeight: 450 }}
            >
              Contact us
            </span>
          </Link>
        </nav>

        {/* Desktop CTA — hidden below md */}
        <div className="hidden md:flex items-center gap-3.5">
          <Button size="sm" variant="secondary">Sign in</Button>
          <Button size="sm">Book a live demo</Button>
        </div>

        {/* Mobile hamburger — visible below md */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className="block w-5 h-[1.5px] transition-all duration-200"
            style={{
              background: t.ink,
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-[1.5px] transition-all duration-200"
            style={{
              background: t.ink,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-[1.5px] transition-all duration-200"
            style={{
              background: t.ink,
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu drawer — slides in below md */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col px-4 pb-6 gap-1"
          style={{ borderTop: `1px solid ${t.line}` }}
        >
          {NAV_LINKS.map((name) => (
            <span
              key={name}
              className="py-3 cursor-pointer flex items-center justify-between"
              style={{ fontSize: 16, fontWeight: 450, color: t.ink, borderBottom: `1px solid ${t.line}` }}
            >
              {name}
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" />
              </svg>
            </span>
          ))}
          <Link
            href="/api-docs"
            style={{ textDecoration: "none", color: t.ink, borderBottom: `1px solid ${t.line}` }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="py-3 flex" style={{ fontSize: 16, fontWeight: 450 }}>
              API Docs
            </span>
          </Link>
          <Link
            href="/contactus"
            style={{ textDecoration: "none", color: t.ink, borderBottom: `1px solid ${t.line}` }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="py-3 flex" style={{ fontSize: 16, fontWeight: 450 }}>
              Contact us
            </span>
          </Link>
          <div className="flex flex-col gap-3 pt-4">
            <span className="text-center cursor-pointer" style={{ fontSize: 14, color: t.ink }}>Sign in</span>
            <Button size="md">Book a live demo</Button>
          </div>
        </div>
      )}
    </header>
  );
}
