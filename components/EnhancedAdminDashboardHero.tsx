"use client"

import React from 'react'
import FadeIn from './animations/FadeIn'
import AnimatedCounter from './animations/AnimatedCounter'
import { StaggerContainer, StaggerItem } from './animations/StaggerContainer'

interface EnhancedAdminDashboardHeroProps {
  totalRevenue: number
  totalStudents: number
  totalCourses: number
}

export default function EnhancedAdminDashboardHero({ 
  totalRevenue, 
  totalStudents,
  totalCourses
}: EnhancedAdminDashboardHeroProps) {
  
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100)
  }

  return (
    <div className="relative mb-12 overflow-hidden rounded-3xl">
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-purple-950/50" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glowing orbs - animated */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated scan lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan" />
        </div>
      </div>

      {/* Futuristic HUD elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Badge with animation */}
          <FadeIn delay={0.1} direction="down">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/40 backdrop-blur-md mb-6 shadow-lg shadow-cyan-500/20">
              <span className="text-2xl animate-pulse">⚡</span>
              <span className="text-sm font-bold text-cyan-300 uppercase tracking-widest">
                Command Center
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </FadeIn>

          {/* Main Headline with gradient animation */}
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Your Educational </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Empire Dashboard
              </span>
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.3} direction="up">
            <p className="text-2xl md:text-3xl text-slate-200 font-semibold mb-4 max-w-3xl">
              Real-time insights into your Million Dollar Blueprint platform
            </p>
          </FadeIn>

          {/* Motivational Message */}
          <FadeIn delay={0.4} direction="up">
            <p className="text-lg md:text-xl text-cyan-100/80 mb-10 max-w-2xl">
              Track revenue, student growth, and course performance. Build the future of McKinsey-level education.
            </p>
          </FadeIn>

          {/* Enhanced Stats Bar with animations */}
          <StaggerContainer staggerDelay={0.15} className="flex flex-wrap gap-6 items-center">
            {/* Revenue */}
            <StaggerItem>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-md border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-500/70 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-300/80 uppercase tracking-wider font-semibold mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
                      <AnimatedCounter value={totalRevenue / 100} prefix="$" decimals={0} />
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Students */}
            <StaggerItem>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-blue-300/80 uppercase tracking-wider font-semibold mb-1">Active Students</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                      <AnimatedCounter value={totalStudents} decimals={0} />
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Courses */}
            <StaggerItem>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/70 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-purple-300/80 uppercase tracking-wider font-semibold mb-1">Total Courses</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
                      <AnimatedCounter value={totalCourses} decimals={0} />
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Value Props with icons */}
          <FadeIn delay={0.8} direction="up">
            <div className="mt-10 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-emerald-200 font-medium">McKinsey-Level Platform</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-200 font-medium">Fortune 100 Frameworks</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-purple-200 font-medium">Real-Time Analytics</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </div>
  )
}
