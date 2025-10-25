"use client"

import React from 'react'
import AdminDashboardHero from '@/components/AdminDashboardHero'

interface PremiumDashboardProps {
  data: any
}

export default function PremiumDashboard({ data }: PremiumDashboardProps) {
  // Course styling with premium McKinsey-inspired colors
  const getCourseStyle = (title: string) => {
    const lowerTitle = title.toLowerCase()
    
    if (lowerTitle.includes('sales')) {
      return {
        icon: '🎯',
        gradient: 'from-amber-600 via-orange-500 to-red-600',
        bgGradient: 'from-amber-900/20 via-orange-900/20 to-red-900/20',
        border: 'border-amber-500/40',
        hoverBorder: 'hover:border-amber-400/60',
        shadow: 'hover:shadow-amber-500/30',
        textColor: 'text-amber-400',
        accentColor: 'bg-amber-500'
      }
    } else if (lowerTitle.includes('leadership')) {
      return {
        icon: '👑',
        gradient: 'from-purple-600 via-violet-500 to-fuchsia-600',
        bgGradient: 'from-purple-900/20 via-violet-900/20 to-fuchsia-900/20',
        border: 'border-purple-500/40',
        hoverBorder: 'hover:border-purple-400/60',
        shadow: 'hover:shadow-purple-500/30',
        textColor: 'text-purple-400',
        accentColor: 'bg-purple-500'
      }
    } else if (lowerTitle.includes('marketing')) {
      return {
        icon: '📊',
        gradient: 'from-cyan-600 via-blue-500 to-indigo-600',
        bgGradient: 'from-cyan-900/20 via-blue-900/20 to-indigo-900/20',
        border: 'border-cyan-500/40',
        hoverBorder: 'hover:border-cyan-400/60',
        shadow: 'hover:shadow-cyan-500/30',
        textColor: 'text-cyan-400',
        accentColor: 'bg-cyan-500'
      }
    } else if (lowerTitle.includes('wealth')) {
      return {
        icon: '💰',
        gradient: 'from-emerald-600 via-green-500 to-teal-600',
        bgGradient: 'from-emerald-900/20 via-green-900/20 to-teal-900/20',
        border: 'border-emerald-500/40',
        hoverBorder: 'hover:border-emerald-400/60',
        shadow: 'hover:shadow-emerald-500/30',
        textColor: 'text-emerald-400',
        accentColor: 'bg-emerald-500'
      }
    } else if (lowerTitle.includes('energy') || lowerTitle.includes('executive')) {
      return {
        icon: '⚡',
        gradient: 'from-yellow-600 via-amber-500 to-orange-600',
        bgGradient: 'from-yellow-900/20 via-amber-900/20 to-orange-900/20',
        border: 'border-yellow-500/40',
        hoverBorder: 'hover:border-yellow-400/60',
        shadow: 'hover:shadow-yellow-500/30',
        textColor: 'text-yellow-400',
        accentColor: 'bg-yellow-500'
      }
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('skill')) {
      return {
        icon: '🧠',
        gradient: 'from-indigo-600 via-blue-500 to-violet-600',
        bgGradient: 'from-indigo-900/20 via-blue-900/20 to-violet-900/20',
        border: 'border-indigo-500/40',
        hoverBorder: 'hover:border-indigo-400/60',
        shadow: 'hover:shadow-indigo-500/30',
        textColor: 'text-indigo-400',
        accentColor: 'bg-indigo-500'
      }
    }
    
    return {
      icon: '📚',
      gradient: 'from-slate-600 via-slate-500 to-slate-600',
      bgGradient: 'from-slate-900/20 via-slate-800/20 to-slate-900/20',
      border: 'border-slate-500/40',
      hoverBorder: 'hover:border-slate-400/60',
      shadow: 'hover:shadow-slate-500/30',
      textColor: 'text-slate-400',
      accentColor: 'bg-slate-500'
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
      {/* Premium Hero Section with Background Image */}
      <AdminDashboardHero 
        totalRevenue={data.overview.totalRevenue}
        totalStudents={data.overview.totalStudents}
        totalCourses={data.overview.totalCourses}
      />

      {/* Premium Course Cards */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Course Portfolio</h2>
            <p className="text-slate-400">McKinsey-level frameworks driving measurable results</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.courseStats.map((course: any) => {
            const style = getCourseStyle(course.title)
            const revenue = course.isFree ? 0 : course.enrollments * course.price

            return (
              <div
                key={course.id}
                className={`group relative bg-gradient-to-br ${style.bgGradient} backdrop-blur-sm rounded-2xl p-6 border ${style.border} ${style.hoverBorder} transition-all duration-500 hover:shadow-2xl ${style.shadow} hover:scale-[1.02] overflow-hidden`}
              >
                {/* Accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient}`}></div>
                
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Status Badges */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {style.icon}
                  </div>
                  <div className="flex gap-2">
                    {course.isPublished ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ● Live
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        ○ Draft
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="relative text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem] leading-tight">
                  {course.title}
                </h3>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Students</p>
                    <p className={`text-2xl font-bold ${style.textColor}`}>
                      {formatNumber(course.enrollments)}
                    </p>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/5">
                    <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Revenue</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                      {formatCurrency(revenue)}
                    </p>
                  </div>
                </div>

                {/* Content Info */}
                <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    {course.modules} modules
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    {course.lessons} lessons
                  </span>
                </div>

                {/* Price Tag */}
                {!course.isFree && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Price Point</span>
                      <span className={`text-lg font-bold ${style.textColor}`}>
                        {formatCurrency(course.price)}
                      </span>
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

