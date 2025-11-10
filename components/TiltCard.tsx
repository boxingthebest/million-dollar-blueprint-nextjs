"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = "", intensity = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`tilt-card shine-effect ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.3s ease',
      }}
    >
      {children}
    </motion.div>
  );
}
