"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// ───────────────────── Configure your nav links here ─────────────────────────
// `routes` is an array of path patterns that should activate this link.
// Supports exact matches ("/pricing") and prefix matches ("/docs/*").
const NAV_LINKS = [
  {
    label: "Features",
    href: "/features",
    routes: ["/features"],
  },
  {
    label: "Pricing",
    href: "/pricing",
    routes: ["/pricing"],
  },
  {
    label: "Docs",
    href: "/docs",
    routes: ["/docs", "/docs/*"],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route.endsWith("/*")) {
      const base = route.slice(0, -2);
      return pathname === base || pathname.startsWith(base + "/");
    }
    return pathname === route;
  });
}

export function Navbar() {
  const pathname = usePathname();
  const [floating, setFloating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = NAV_LINKS.findIndex((l) =>
    matchesRoute(pathname, l.routes),
  );
  const targetIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    const handleScroll = () => setFloating(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const target = linkRefs.current[targetIndex];
    const container = containerRef.current;
    if (!target || !container) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setPillStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  }, [targetIndex]);

  // Hide pill entirely when no active route and not hovering
  useEffect(() => {
    if (hoveredIndex === null && activeIndex === -1) {
      setPillStyle((s) => ({ ...s, opacity: 0 }));
    }
  }, [hoveredIndex, activeIndex]);

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center px-4">
      <nav
        className={cn(
          "w-full flex items-center justify-between h-12 transition-all duration-200 rounded-2xl mt-5",
          floating
            ? "bg-background/80 backdrop-blur-xl border border-border max-w-368 shadow-xl"
            : "bg-background max-w-352",
        )}
      >
        {/* Logo */}
        <a href="/" className="font-semibold text-base tracking-tight px-2">
          Acme
        </a>

        {/* Nav links */}
        <div
          ref={containerRef}
          className="hidden md:flex items-center relative gap-7"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Sliding pill background */}
          <span
            className="absolute inset-y-1 rounded-xl bg-muted transition-all duration-200 pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
            }}
          />

          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "relative z-10 text-sm px-3 py-2 rounded-xl transition-colors duration-150",
                i === targetIndex ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 px-2">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </a>
          <a
            href="#"
            className="text-sm bg-foreground text-background px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get started
          </a>
        </div>
      </nav>
    </div>
  );
}
