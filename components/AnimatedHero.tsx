"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import FloatingParticles from "./FloatingParticles";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedHero({ children, className = "" }: AnimatedHeroProps) {
  return (
    <section className={`relative overflow-hidden animated-gradient-bg ${className}`}>
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '1s'}} />
      
      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

// Animated heading component for hero sections
export function AnimatedHeading({ children, className = "", delay = 0.2 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

// Animated text component
export function AnimatedText({ children, className = "", delay = 0.4 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated CTA button
export function AnimatedCTA({ children, className = "", delay = 0.6, href, ...props }: { children: ReactNode; className?: string; delay?: number; href?: string; [key: string]: any }) {
  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      href={href}
      className={`magnetic-button ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
