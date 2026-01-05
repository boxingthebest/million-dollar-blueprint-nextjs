"use client"

import { useMemo } from "react"

interface DashboardData {
  overview: {
    totalStudents: number
    totalCourses: number
    publishedCourses: number
    totalEnrollments: number
    totalRevenue: number
    completionRate: number
    signupsToday: number
    signupsThisWeek: number
    signupsThisMonth: number
    activeStudentsLast7Days: number
    activeStudentsLast30Days: number
  }
  paidEnrollments: Array<{
    id: string
    createdAt: string
    user: {
      id: string
      name: string | null
      email: string | null
    }
    course: {
      id: string
      title: string
      price: number
    }
  }>
  courseStats: Array<{
    id: string
    title: string
    enrollments: number
    modules: number
    lessons: number
    isPublished: boolean
    isFree: boolean
    price: number
  }>
  revenueTrends: Array<{
    date: string
    revenue: number
  }>
}

interface CleanDashboardProps {
  data: DashboardData
}

export default function CleanDashboard({ data }: CleanDashboardProps) {
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getInitials = (name: string | null, email: string | null) => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return "?"
  }

  // Calculate today's revenue
  const todayRevenue = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return data.paidEnrollments
      .filter(e => e.createdAt.startsWith(today))
      .reduce((sum, e) => sum + e.course.price, 0)
  }, [data.paidEnrollments])

  // Calculate this week's revenue
  const weekRevenue = useMemo(() => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return data.paidEnrollments
      .filter(e => new Date(e.createdAt) >= weekAgo)
      .reduce((sum, e) => sum + e.course.price, 0)
  }, [data.paidEnrollments])

  return (
    <div className="space-y-8">
      {/* Hero Stats - Big Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
              <p className="text-5xl font-bold text-white mt-2">{formatCurrency(data.overview.totalRevenue)}</p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-slate-400">Today: <span className="text-emerald-400 font-semibold">{formatCurrency(todayRevenue)}</span></span>
                <span className="text-slate-400">This Week: <span className="text-emerald-400 font-semibold">{formatCurrency(weekRevenue)}</span></span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Paid Students */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6">
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Paid Students</p>
          <p className="text-4xl font-bold text-white mt-2">{data.paidEnrollments.length}</p>
          <p className="text-slate-400 text-sm mt-2">Lifetime customers</p>
        </div>

        {/* Total Students */}
        <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-purple-500/30 rounded-2xl p-6">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-wide">Total Students</p>
          <p className="text-4xl font-bold text-white mt-2">{data.overview.totalStudents}</p>
          <p className="text-slate-400 text-sm mt-2">+{data.overview.signupsToday} today</p>
        </div>
      </div>

      {/* Recent Sales - The Money Feed */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-xl font-bold text-white">Recent Sales</h2>
          </div>
          <span className="text-slate-400 text-sm">{data.paidEnrollments.length} total sales</span>
        </div>
        
        {data.paidEnrollments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-slate-400">No sales yet. Your first sale is coming!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {data.paidEnrollments.slice(0, 10).map((enrollment) => (
              <div key={enrollment.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(enrollment.user.name, enrollment.user.email)}
                  </div>
                  
                  {/* Details */}
                  <div>
                    <p className="text-white font-semibold">
                      {enrollment.user.name || enrollment.user.email?.split("@")[0] || "Unknown"}
                    </p>
                    <p className="text-slate-400 text-sm">{enrollment.user.email}</p>
                  </div>
                </div>

                {/* Course & Price */}
                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-lg">{formatCurrency(enrollment.course.price)}</p>
                  <p className="text-slate-400 text-sm">{enrollment.course.title}</p>
                </div>

                {/* Time */}
                <div className="text-slate-500 text-sm w-20 text-right">
                  {formatDate(enrollment.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Course Performance */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Course Performance</h2>
        </div>
        <div className="divide-y divide-slate-700/50">
          {data.courseStats
            .filter(course => !course.isFree)
            .sort((a, b) => (b.enrollments * b.price) - (a.enrollments * a.price))
            .map((course) => (
              <div key={course.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${course.isPublished ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                  <div>
                    <p className="text-white font-medium">{course.title}</p>
                    <p className="text-slate-400 text-sm">{course.modules} modules • {course.lessons} lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-white font-semibold">{course.enrollments}</p>
                    <p className="text-slate-500 text-xs">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-cyan-400 font-semibold">{formatCurrency(course.price)}</p>
                    <p className="text-slate-500 text-xs">Price</p>
                  </div>
                  <div className="text-center min-w-[80px]">
                    <p className="text-emerald-400 font-bold">{formatCurrency(course.enrollments * course.price)}</p>
                    <p className="text-slate-500 text-xs">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{data.overview.signupsToday}</p>
          <p className="text-slate-400 text-sm">Signups Today</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{data.overview.signupsThisWeek}</p>
          <p className="text-slate-400 text-sm">Signups This Week</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{data.overview.activeStudentsLast7Days}</p>
          <p className="text-slate-400 text-sm">Active (7 days)</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{data.overview.completionRate}%</p>
          <p className="text-slate-400 text-sm">Completion Rate</p>
        </div>
      </div>
    </div>
  )
}
