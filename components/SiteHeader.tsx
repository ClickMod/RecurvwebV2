"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { theme as t } from "@/components/theme";
import type { StrapiIndustryNavItem } from "@/lib/strapi";

interface SiteHeaderProps {
  industryNavList: StrapiIndustryNavItem[];
}

export function SiteHeader({ industryNavList }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Image src="/primarylogo.png" alt="Recurv" width={160} height={48} style={{ width: 160, height: "auto" }} />
        </Link>

        {/* Desktop nav — hidden below md */}
        <nav className="hidden md:flex items-center justify-center gap-7" style={{ fontSize: 14, color: t.ink }}>
          {/* Industries dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="inline-flex items-center gap-1 cursor-pointer transition-[color,opacity] duration-[140ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70 bg-transparent border-0 p-0"
              style={{ fontSize: 14, fontWeight: 450, color: t.ink, fontFamily: "inherit" }}
              aria-expanded={industriesOpen}
              aria-haspopup="true"
              onClick={() => setIndustriesOpen((v) => !v)}
            >
              Industries
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                style={{ transform: industriesOpen ? "rotate(180deg)" : "none", transition: "transform 140ms" }}
              >
                <path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {industriesOpen && (
              <div
                className="absolute left-0 top-full mt-2 rounded-xl overflow-hidden"
                style={{
                  minWidth: 300,
                  background: "#fff",
                  border: `1px solid ${t.line}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                }}
              >
                <div className="py-1.5">
                  {industryNavList.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/industries/${item.slug}`}
                      style={{ textDecoration: "none", color: t.ink, display: "block" }}
                      className="px-4 py-2.5 transition-colors duration-100 hover:bg-[rgba(79,51,217,0.06)]"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <span style={{ fontSize: 13.5, fontWeight: 450 }}>{item.industryName}</span>
                    </Link>
                  ))}
                  <div style={{ borderTop: `1px solid ${t.line}` }} className="mt-1 pt-1">
                    <Link
                      href="/industries"
                      style={{ textDecoration: "none", color: t.primary, display: "block" }}
                      className="px-4 py-2.5 transition-colors duration-100 hover:bg-[rgba(79,51,217,0.06)]"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>All industries →</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

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
          <Button size="sm" variant="secondary" href="https://portal.recurv.tech/">Sign in</Button>
          <Button size="sm" href="https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv">Book a live demo</Button>
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
          {/* Mobile Industries accordion */}
          <div style={{ borderBottom: `1px solid ${t.line}` }}>
            <button
              className="w-full py-3 flex items-center justify-between bg-transparent border-0 p-0"
              style={{ fontSize: 16, fontWeight: 450, color: t.ink, fontFamily: "inherit", cursor: "pointer" }}
              onClick={() => setMobileIndustriesOpen((v) => !v)}
            >
              Industries
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                style={{ transform: mobileIndustriesOpen ? "rotate(180deg)" : "none", transition: "transform 140ms" }}
              >
                <path d="M2 4l3 3 3-3" stroke={t.inkSoft} strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            {mobileIndustriesOpen && (
              <div className="pb-2 flex flex-col gap-0.5">
                {industryNavList.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/industries/${item.slug}`}
                    style={{ textDecoration: "none", color: t.ink }}
                    className="py-2 pl-3 block hover:opacity-70 transition-opacity"
                    onClick={() => { setMenuOpen(false); setMobileIndustriesOpen(false); }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 400 }}>{item.industryName}</span>
                  </Link>
                ))}
                <Link
                  href="/industries"
                  style={{ textDecoration: "none", color: t.primary }}
                  className="py-2 pl-3 block"
                  onClick={() => { setMenuOpen(false); setMobileIndustriesOpen(false); }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>All industries →</span>
                </Link>
              </div>
            )}
          </div>

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
            <Button size="md" variant="secondary" className="w-full justify-center" href="https://portal.recurv.tech/">Sign in</Button>
            <Button size="md" className="w-full justify-center" href="https://clickmoddevptyltd.pipedrive.com/scheduler/1evWEpiG/clickmoddev-pty-ltd-recurv">Book a live demo</Button>
          </div>
        </div>
      )}
    </header>
  );
}
