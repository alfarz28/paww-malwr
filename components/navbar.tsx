"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="w-full h-auto py-4 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 border-b border-white/5 relative z-10">
      <Link
        href="/"
        className="flex items-center gap-1 group font-mono font-bold text-lg whitespace-nowrap"
      >
        <span className="text-gray-500">~/</span>
        <span className="text-white group-hover:text-primary transition-colors">
          paww.malwr.id
        </span>
      </Link>

      <ul className="flex items-center gap-1 sm:gap-6 bg-white/5 px-2 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/5 backdrop-blur-md">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary/20 text-primary box-glow border border-primary/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
