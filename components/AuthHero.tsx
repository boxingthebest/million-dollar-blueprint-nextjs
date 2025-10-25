"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AuthHeroProps {
  type: 'signin' | 'signup'
}

export default function AuthHero({ type }: AuthHeroProps) {
  const isSignIn = type === 'signin'
  
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000)',
            filter: 'brightness(0.25)'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-900/95 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 py-16 w-full">
        {/* Logo */}
        <Link href="/" className="mb-12">
          <Image
            src="/logo-main-desktop.png"
            alt="Million Dollar Blueprint"
            width={250}
            height={125}
            className="h-20 w-auto object-contain hover:scale-105 transition-transform"
          />
        </Link>

        {/* Hero Content */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-xl">⚡</span>
            <span className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
              {isSignIn ? 'McKinsey-Level Education' : 'AI-Resistant Skills Training'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {isSignIn ? (
              <>
                <span className="text-white">Welcome Back to</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Your Transformation
                </span>
              </>
            ) : (
              <>
                <span className="text-white">Your Blueprint to</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  A Million-Dollar Future
                </span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {isSignIn 
              ? 'Continue mastering the insider strategies from the world\'s most successful companies. Learn from frameworks used at Amazon, Apple, Google, Goldman Sachs & McKinsey.'
              : 'Master the insider strategies from the world\'s most successful companies. Learn from advisors at Amazon, Apple, Google, Goldman Sachs & McKinsey who\'ve scaled businesses from $500K to $50B+.'
            }
          </p>

          {/* Trust Indicators */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300 text-lg">Fortune 100 Frameworks</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300 text-lg">Lifetime Access</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300 text-lg">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <div className="flex items-center gap-4">
              {/* Avatar Stack */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-slate-950 flex items-center justify-center text-white font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">500+ Students Enrolled</p>
                <p className="text-slate-400 text-sm">Join professionals transforming their careers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

