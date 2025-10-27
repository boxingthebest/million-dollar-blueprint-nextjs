"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 500) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Premium Gradient Background - Orange to Pink to Purple */}
      <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-2xl">
        {/* Top border glow effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-pink-300 to-purple-400 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Side - Compelling Text Content */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-2xl">🎓</span>
                <p className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">
                  Start Your Transformation Today
                </p>
              </div>
              <p className="text-white/95 text-base font-medium">
                Founding member pricing available • 30-day money-back guarantee
              </p>
            </div>

            {/* Right Side - CTA Button and Close */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Premium CTA Button */}
              <Link
                href="/auth/signup"
                className="group relative bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50 transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              {/* Close Button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/90 hover:text-white transition-all duration-200 p-2.5 hover:bg-white/20 rounded-lg backdrop-blur-sm"
                aria-label="Dismiss banner"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom subtle shadow for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10"></div>
      </div>
    </div>
  )
}

