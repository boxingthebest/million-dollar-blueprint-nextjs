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
                  className="text-slate-300 hover:text-cyan-400 border-2 border-cyan-500/50 hover:border-cyan-400 px-4 md:px-6 py-2 rounded-lg transition-all font-semibold text-sm md:text-base relative z-10"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 border-2 border-cyan-500/50 hover:border-cyan-400 px-4 md:px-6 py-2 rounded-lg transition-all font-semibold text-sm md:text-base hidden sm:inline relative z-10"
                >
                  {link.label}
                </Link>
              )}
              
              {/* Shared Layout Animation Background */}
              {hoveredLink === link.href && (
                <motion.div
                  layoutId="navHighlight"
                  className="absolute inset-0 bg-cyan-500/10 rounded-lg border-2 border-cyan-400/50"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </motion.div>
          ))}

          {/* Login Button */}
          <Link 
            href="/auth/signin"
            className="bg-slate-800/80 hover:bg-slate-700 border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 px-4 md:px-6 py-2 rounded-lg font-bold transition-all text-sm md:text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
          >
            Login
          </Link>

          {/* Get Started Button */}
          <a 
            href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-2 border-cyan-500/30 hover:border-cyan-400/50 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base shadow-lg shadow-orange-500/20"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
