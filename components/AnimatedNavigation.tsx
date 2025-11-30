"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
  isPrimary?: boolean;
  isSecondary?: boolean;
}

export default function AnimatedNavigation() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { href: "#courses", label: "Courses" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 sticky top-0 z-50 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Image 
            src="/logo-transparent.png" 
            alt="Million Dollar Blueprint" 
            width={800} 
            height={365} 
            className="h-16 w-auto md:h-20 transition-all hover:scale-105 logo-glow-animated" 
            priority 
          />
        </div>
        
        <div className="flex gap-4 md:gap-6 items-center">
          {/* Animated Navigation Links */}
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              className="relative"
              onHoverStart={() => setHoveredLink(link.href)}
              onHoverEnd={() => setHoveredLink(null)}
            >
              {link.href.startsWith('#') ? (
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base hidden sm:inline"
                >
                  {link.label}
                </Link>
              )}
              

            </motion.div>
          ))}

          {/* Login Button */}
          <Link 
            href="/auth/signin"
            className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base"
          >
            Login
          </Link>

          {/* Get Started Button */}
          <Link 
            href="/bundle/flagship"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
