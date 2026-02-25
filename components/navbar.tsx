"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Sticky wrapper — always occupies the top of the page so content below
    // doesn't shift when the navbar transitions to "floating" mode.
    <div className="sticky top-0 z-50 w-full flex justify-center px-4 pt-0">
      <nav
        className={cn(
          // Base styles
          "w-full flex items-center justify-between px-6 h-14",
          "transition-all duration-300 ease-in-out",

          // Default (attached) state
          !scrolled && [
            "bg-background border-b border-border",
            "rounded-none shadow-none",
            "mt-0",
          ],

          // Scrolled (floating) state
          scrolled && [
            "bg-background/80 backdrop-blur-md",
            "border border-border",
            "rounded-2xl shadow-lg shadow-black/10",
            "mt-3 max-w-4xl",
          ],
        )}
      >
        {/* Logo / Brand */}
        <a href="/" className="font-semibold text-base tracking-tight">
          Acme
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Docs
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
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
