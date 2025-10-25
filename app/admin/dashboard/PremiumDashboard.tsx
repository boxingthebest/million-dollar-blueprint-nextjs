"use client"

import React from 'react'

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
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/20">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative p-8 md:p-12">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <div className="inline-block mb-4">
                <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/30">
                  Command Center
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                Platform Performance
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl">
                Real-time insights into your educational empire. Track revenue, student growth, and course performance.
              </p>
              
              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="text-sm font-medium text-slate-400 mb-2 tracking-wide">Total Revenue</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                      {formatCurrency(data.overview.totalRevenue)}
                    </div>
                    <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      Lifetime
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="text-sm font-medium text-slate-400 mb-2 tracking-wide">Active Students</div>
                    <div className="text-3xl font-bold text-white">
                      {formatNumber(data.overview.totalStudents)}
                    </div>
                    <div className="mt-2 text-xs text-cyan-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Enrolled
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                  <div className="relative">
                    <div className="text-sm font-medium text-slate-400 mb-2 tracking-wide">Total Enrollments</div>
                    <div className="text-3xl font-bold text-white">
                      {formatNumber(data.overview.totalEnrollments)}
                    </div>
                    <div className="mt-2 text-xs text-purple-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Courses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

