"use client"

import React from 'react'

interface EnhancedDashboardProps {
  data: any
}

export default function EnhancedDashboard({ data }: EnhancedDashboardProps) {
  // Course icon and color mapping
  const getCourseStyle = (title: string) => {
    const lowerTitle = title.toLowerCase()
    
    if (lowerTitle.includes('sales')) {
      return {
        icon: '🎯',
        gradient: 'from-orange-500 to-red-600',
        bgGradient: 'from-orange-500/10 to-red-500/10',
        border: 'border-orange-500/30',
        hoverBorder: 'hover:border-orange-500/50',
        shadow: 'hover:shadow-orange-500/20',
        textColor: 'text-orange-400'
      }
    } else if (lowerTitle.includes('leadership')) {
      return {
        icon: '👑',
        gradient: 'from-purple-500 to-pink-600',
        bgGradient: 'from-purple-500/10 to-pink-500/10',
        border: 'border-purple-500/30',
        hoverBorder: 'hover:border-purple-500/50',
        shadow: 'hover:shadow-purple-500/20',
        textColor: 'text-purple-400'
      }
    } else if (lowerTitle.includes('marketing')) {
      return {
        icon: '📊',
        gradient: 'from-cyan-500 to-blue-600',
        bgGradient: 'from-cyan-500/10 to-blue-500/10',
        border: 'border-cyan-500/30',
        hoverBorder: 'hover:border-cyan-500/50',
        shadow: 'hover:shadow-cyan-500/20',
        textColor: 'text-cyan-400'
      }
    } else if (lowerTitle.includes('wealth')) {
      return {
        icon: '💰',
        gradient: 'from-green-500 to-emerald-600',
        bgGradient: 'from-green-500/10 to-emerald-500/10',
        border: 'border-green-500/30',
        hoverBorder: 'hover:border-green-500/50',
        shadow: 'hover:shadow-green-500/20',
        textColor: 'text-green-400'
      }
    } else if (lowerTitle.includes('energy') || lowerTitle.includes('executive')) {
      return {
        icon: '⚡',
        gradient: 'from-yellow-500 to-orange-600',
        bgGradient: 'from-yellow-500/10 to-orange-500/10',
        border: 'border-yellow-500/30',
        hoverBorder: 'hover:border-yellow-500/50',
        shadow: 'hover:shadow-yellow-500/20',
        textColor: 'text-yellow-400'
      }
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('skill')) {
      return {
        icon: '🧠',
        gradient: 'from-indigo-500 to-violet-600',
        bgGradient: 'from-indigo-500/10 to-violet-500/10',
        border: 'border-indigo-500/30',
        hoverBorder: 'hover:border-indigo-500/50',
        shadow: 'hover:shadow-indigo-500/20',
        textColor: 'text-indigo-400'
      }
    }
    
    // Default
    return {
      icon: '📚',
      gradient: 'from-slate-500 to-slate-600',
      bgGradient: 'from-slate-500/10 to-slate-600/10',
      border: 'border-slate-500/30',
      hoverBorder: 'hover:border-slate-500/50',
      shadow: 'hover:shadow-slate-500/20',
      textColor: 'text-slate-400'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-1">
        <div className="bg-slate-900 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-fade-in">
                Welcome to Command Center 🚀
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Your platform is growing! Here's your real-time performance overview.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <div className="text-sm text-slate-300">Total Revenue</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(data.overview.totalRevenue)}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <div className="text-sm text-slate-300">Active Students</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(data.overview.totalStudents)}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <div className="text-sm text-slate-300">Total Enrollments</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(data.overview.totalEnrollments)}</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-9xl animate-bounce-slow">📈</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Course Cards */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📚</span>
          Course Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.courseStats.map((course: any) => {
            const style = getCourseStyle(course.title)
            const revenue = course.isFree ? 0 : course.enrollments * course.price

            return (
              <div
                key={course.id}
                className={`group relative bg-gradient-to-br ${style.bgGradient} border ${style.border} ${style.hoverBorder} rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${style.shadow} hover:scale-105`}
              >
                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {course.isPublished ? (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                      ✓ Live
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Draft
                    </span>
                  )}
                  {course.isFree && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Free
                    </span>
                  )}
                </div>

                {/* Course Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {style.icon}
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem]">
                  {course.title}
                </h3>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Students</p>
                    <p className={`text-2xl font-bold ${style.textColor}`}>
                      {formatNumber(course.enrollments)}
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-slate-400 text-xs mb-1">Revenue</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {formatCurrency(revenue)}
                    </p>
                  </div>
                </div>

                {/* Content Info */}
                <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    📦 {course.modules} modules
                  </span>
                  <span className="flex items-center gap-1">
                    ▶️ {course.lessons} lessons
                  </span>
                </div>

                {/* Price Tag */}
                {!course.isFree && (
                  <div className="mt-4 text-center">
                    <span className={`text-lg font-bold ${style.textColor}`}>
                      {formatCurrency(course.price)}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Enrollment Details by Course */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span>👥</span>
          Student Enrollments by Course
        </h2>
        <div className="space-y-6">
          {data.courseStats.map((course: any) => {
            const style = getCourseStyle(course.title)
            
            return (
              <div
                key={course.id}
                className={`bg-gradient-to-br ${style.bgGradient} border ${style.border} rounded-xl p-6`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{style.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <p className={`text-sm ${style.textColor}`}>
                      {formatNumber(course.enrollments)} student{course.enrollments !== 1 ? 's' : ''} enrolled
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">
                      {formatCurrency(course.isFree ? 0 : course.enrollments * course.price)}
                    </div>
                    <div className="text-sm text-slate-400">Total Revenue</div>
                  </div>
                </div>
                
                {course.enrollments === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">📭</div>
                    <p>No students enrolled yet</p>
                  </div>
                ) : (
                  <div className="text-sm text-slate-300">
                    <p className="mb-2 font-semibold">Recent enrollments will appear here</p>
                    <div className="bg-black/20 rounded-lg p-4">
                      <p className="text-slate-400">
                        View detailed enrollment data in the Students section
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

