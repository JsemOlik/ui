"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Variants for the inner <nav> element (handles the background, border, and shape)
const navbarVariants = cva(
  "mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "w-full bg-background/0 px-8 py-4 border-transparent",
        floating:
          "max-w-5xl w-full bg-background/80 backdrop-blur-md border border-border shadow-sm rounded-full px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Variants for the outer <header> wrapper (handles the positioning and padding)
const navbarWrapperVariants = cva(
  "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "pt-0 px-0",
        floating: "pt-4 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface NavbarProps
  extends React.ComponentProps<"nav">, VariantProps<typeof navbarVariants> {
  /**
   * At what scroll position (in px) the navbar should detach and become floating.
   * Only applies when variant is "default".
   * @default 20
   */
  scrollThreshold?: number;
}

function Navbar({
  className,
  variant = "default",
  scrollThreshold = 20,
  ...props
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    // If the user explicitly wants it floating at all times, skip the scroll listener
    if (variant === "floating") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, variant]);

  // Determine which visual state to show based on props and scroll state
  const activeVariant =
    variant === "floating" || isScrolled ? "floating" : "default";

  return (
    <header className={cn(navbarWrapperVariants({ variant: activeVariant }))}>
      <nav
        data-slot="navbar"
        data-variant={activeVariant}
        className={cn(navbarVariants({ variant: activeVariant, className }))}
        {...props}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="size-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-black">
                P
              </span>
            </div>
            pyro
          </a>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About Us
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Button variant="default" className="rounded-full px-6">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}

export { Navbar, navbarVariants };
