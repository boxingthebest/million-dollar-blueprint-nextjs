"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Infinity, Award, Star, Check } from "lucide-react";

const badges = [
  { icon: Shield, text: "30-Day Money-Back Guarantee", color: "text-green-400" },
  { icon: Infinity, text: "Lifetime Access to All Content", color: "text-cyan-400" },
  { icon: Award, text: "440+ Students Enrolled", color: "text-orange-400" },
  { icon: Star, text: "McKinsey-Level Quality", color: "text-purple-400" },
  { icon: Check, text: "22+ Years Elite Experience", color: "text-pink-400" }
];

export default function TrustBadgeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % badges.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentBadge = badges[currentIndex];
  const Icon = currentBadge.icon;

  return (
    <div className="relative h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 px-6 py-3 rounded-full"
        >
          <Icon className={`w-6 h-6 ${currentBadge.color}`} />
          <span className="text-white font-semibold text-sm md:text-base">
            {currentBadge.text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
