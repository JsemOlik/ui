"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="font-bold text-lg">MyApp</div>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Button>Login</Button>
      </div>
    </nav>
  );
}
