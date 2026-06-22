"use client";

/**
 * <Reveal> — scroll-triggered fade-up wrapper.
 *
 * Accessibility / print contract:
 *  - SSR/no-JS: element renders fully visible (no inline styles set by server).
 *  - prefers-reduced-motion: reduce → skip animation; stay visible.
 *  - @media print → no transform/opacity applied (browser ignores transitions).
 *  - Animation-hidden state is set by JS only, so content is NEVER trapped
 *    at opacity 0 in environments where JS hasn't run.
 *
 * Usage:
 *   <Reveal>…</Reveal>
 *   <Reveal delay={index * STAGGER}>…</Reveal>
 *   <Reveal className="h-full">…</Reveal>   // pass-through classes to the wrapper div
 */

import { useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { EASE, DURATION_REVEAL, TRAVEL } from "@/components/motion";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  children: ReactNode;
}

export function Reveal({ delay = 0, children, className = "", ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Gate: only animate when the user has not requested reduced motion.
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    // Set initial hidden state via JS (SSR output stays visible).
    el.style.opacity = "0";
    el.style.transform = `translateY(${TRAVEL}px)`;
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = `opacity ${DURATION_REVEAL}ms ${EASE} ${delay}ms, transform ${DURATION_REVEAL}ms ${EASE} ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            // Clean up will-change after animation completes.
            const cleanup = () => {
              el.style.willChange = "auto";
              el.removeEventListener("transitionend", cleanup);
            };
            el.addEventListener("transitionend", cleanup, { once: true });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`min-w-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
