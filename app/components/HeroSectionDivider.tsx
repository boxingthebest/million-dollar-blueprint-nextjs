"use client"

import React from 'react'

interface HeroSectionDividerProps {
  title?: string
  subtitle?: string
  variant?: 'admin' | 'student' | 'enrollment'
}

export default function HeroSectionDivider({ 
  title, 
  subtitle, 
  variant = 'admin' 
}: HeroSectionDividerProps) {
  const getColors = () => {
    switch (variant) {
      case 'admin':
        return {
          gradient: 'from-amber-500 via-orange-500 to-red-500',
          glow: 'shadow-amber-500/50',
          accent: 'bg-amber-500'
        }
      case 'student':
        return {
          gradient: 'from-cyan-500 via-blue-500 to-purple-500',
          glow: 'shadow-cyan-500/50',
          accent: 'bg-cyan-500'
        }
      case 'enrollment':
        return {
          gradient: 'from-pink-500 via-purple-500 to-indigo-500',
          glow: 'shadow-pink-500/50',
          accent: 'bg-pink-500'
        }
    }
  }

  const colors = getColors()

  if (!title) {
    // Simple animated divider without text
    return (
      <div className="relative py-12 overflow-hidden">
        {/* Animated gradient line */}
        <div className="relative h-px w-full">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-30`}></div>
          <div 
            className={`absolute h-full w-1/3 bg-gradient-to-r ${colors.gradient} ${colors.glow} shadow-lg`}
            style={{
              animation: 'slideAcross 3s ease-in-out infinite'
            }}
          ></div>
        </div>

        {/* Floating particles along the line */}
        <div className="absolute inset-0 flex items-center justify-around">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 ${colors.accent} rounded-full`}
              style={{
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>

        <style jsx>{`
          @keyframes slideAcross {
            0%, 100% { left: -33.333%; }
            50% { left: 100%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); opacity: 0.3; }
            50% { transform: translateY(-10px); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-5 blur-3xl`}></div>

      {/* Content */}
      <div className="relative text-center">
        {/* Top decorative line */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20"></div>
          <div className={`mx-4 w-2 h-2 ${colors.accent} rounded-full animate-pulse`}></div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

        {/* Title */}
        {title && (
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>
        )}

        {/* Bottom decorative elements */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${colors.accent}`}
              style={{
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
                opacity: 0.6 - i * 0.2
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 rounded-lg rotate-45 animate-spin-slow"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 border border-white/10 rounded-full animate-pulse"></div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

