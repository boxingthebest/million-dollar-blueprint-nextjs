"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function ScrollReveal({ 
  children, 
  className = "",
  id,
  delay = 0,
  direction = "up",
  duration = 0.6
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ 
        opacity: 0, 
        y: offset.y,
        x: offset.x
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: 0
      } : {
        opacity: 0,
        y: offset.y,
        x: offset.x
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
