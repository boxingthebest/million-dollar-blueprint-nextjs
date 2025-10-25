"use client"

import React from 'react'

interface StudentDashboardHeroProps {
  userName: string
  overallProgress: number
  totalCourses: number
  completedLessons: number
}

export default function StudentDashboardHero({ 
  userName, 
  overallProgress, 
  totalCourses,
  completedLessons 
}: StudentDashboardHeroProps) {
  
  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "Your million-dollar transformation begins today."
    if (progress < 25) return "Every lesson is a step closer to your breakthrough."
    if (progress < 50) return "You're building unstoppable momentum."
    if (progress < 75) return "Your future is taking shape. Keep going."
    if (progress < 100) return "You're almost there. Finish strong."
    return "You've mastered the blueprint. Now build your empire."
  }

  return (
    <div className="relative mb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000)',
            filter: 'brightness(0.3)'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950" />
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 backdrop-blur-sm mb-6">
            <span className="text-2xl">💎</span>
            <span className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
              Your Million-Dollar Journey
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Welcome Back, </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {userName.split(' ')[0] || 'Champion'}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-slate-200 font-semibold mb-4 max-w-3xl">
            Building Your Blueprint to Success
          </p>

          {/* Motivational Message */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
            {getMotivationalMessage(overallProgress)}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 items-center">
            {/* Progress Indicator */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{overallProgress}%</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Progress</p>
                  <p className="text-sm font-semibold text-white">Overall Completion</p>
                </div>
              </div>
            </div>

            {/* Courses Enrolled */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{totalCourses}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Courses</p>
                  <p className="text-sm font-semibold text-white">Active Learning</p>
                </div>
              </div>
            </div>

            {/* Lessons Completed */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{completedLessons}</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Lessons</p>
                  <p className="text-sm font-semibold text-white">Mastered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Fortune 100 Frameworks</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>McKinsey-Level Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
    </div>
  )
}

