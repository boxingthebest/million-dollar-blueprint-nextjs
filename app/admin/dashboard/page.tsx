"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

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
  signupTrends: Array<{
    date: string
    count: number
  }>
  revenueTrends: Array<{
    date: string
    revenue: number
  }>
  recentActivity: Array<{
    type: string
    user: string | null
    course?: string
    lesson?: string
    timestamp: string
  }>
  recentStudents: Array<{
    id: string
    name: string | null
    email: string | null
    createdAt: string
    _count: {
      enrollments: number
      progress: number
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
  recentEnrollments: Array<{
    createdAt: string
    course: {
      title: string
      isFree: boolean
    }
  }>
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
  passwordStudents: Array<{
    id: string
    name: string | null
    email: string | null
    createdAt: string
    _count: {
      enrollments: number
      progress: number
    }
  }>
  payingStudents: Array<{
    id: string
    name: string | null
    email: string | null
    createdAt: string
    _count: {
      enrollments: number
      progress: number
    }
    enrollments: Array<{
      course: {
        title: string
        price: number
      }
    }>
  }>
  revenueByCourse: Array<{
    courseId: string
    courseTitle: string
    revenue: number
    enrollments: number
  }>
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }

    if (status === "authenticated") {
      fetchDashboardData()
    }
  }, [status])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const dashboardData = await response.json()
        setData(dashboardData)
        setError(null)
      } else {
        setError("Failed to load dashboard data")
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Image
                  src="/logo-main-desktop.png"
                  alt="Million Dollar Blueprint"
                  width={200}
                  height={100}
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-800 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">⚠️ {error || "Failed to load dashboard"}</div>
          <button
            onClick={fetchDashboardData}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/logo-main-desktop.png"
                alt="Million Dollar Blueprint"
                width={200}
                height={100}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className="text-cyan-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/students"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Students
              </Link>
              <Link
                href="/admin/dashboard/test-accounts"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Test Accounts
              </Link>
              <Link
                href="/admin"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Course Manager
              </Link>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {session?.user?.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-slate-300 hidden md:block">{session?.user?.email}</span>
                </div>
                <LogoutButton />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 text-lg">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Signup Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">New Signups</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Signups Today */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">Today</h3>
                  <p className="text-4xl font-bold text-white">{formatNumber(data.overview.signupsToday)}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-green-400">Last 24 hours</div>
            </div>

            {/* Signups This Week */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">This Week</h3>
                  <p className="text-4xl font-bold text-white">{formatNumber(data.overview.signupsThisWeek)}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-blue-400">New accounts</div>
            </div>

            {/* Signups This Month */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">This Month</h3>
                  <p className="text-4xl font-bold text-white">{formatNumber(data.overview.signupsThisMonth)}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-purple-400">New accounts</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Students */}
          <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Students</h3>
                <p className="text-4xl font-bold text-white">{formatNumber(data.overview.totalStudents)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/dashboard/students" className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                View all students →
              </Link>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Revenue</h3>
                <p className="text-4xl font-bold text-white">{formatCurrency(data.overview.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              From {data.overview.totalEnrollments} paid enrollments
            </div>
          </div>

          {/* Total Enrollments */}
          <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Enrollments</h3>
                <p className="text-4xl font-bold text-white">{formatNumber(data.overview.totalEnrollments)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              Across {data.overview.totalCourses} courses
            </div>
          </div>

          {/* Total Courses */}
          <div className="group bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Total Courses</h3>
                <p className="text-4xl font-bold text-white">{formatNumber(data.overview.totalCourses)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-400 font-medium">{data.overview.publishedCourses} published</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm text-slate-400">{data.overview.totalCourses - data.overview.publishedCourses} draft</span>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="group bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Completion Rate</h3>
                <p className="text-4xl font-bold text-white">{data.overview.completionRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-1000 ease-out"
                style={{ width: `${data.overview.completionRate}%` }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6 flex flex-col justify-center">
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/dashboard/test-accounts"
                className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 text-center shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                🧪 Create Test Account
              </Link>
              <Link
                href="/admin"
                className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                📚 Manage Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Revenue Visualization */}
        {data.revenueByCourse && data.revenueByCourse.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Revenue by Course</h2>
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-6">
              <div className="space-y-4">
                {data.revenueByCourse
                  .filter((course) => course.revenue > 0)
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((course) => {
                    const maxRevenue = Math.max(...data.revenueByCourse.map((c) => c.revenue))
                    const percentage = maxRevenue > 0 ? (course.revenue / maxRevenue) * 100 : 0

                    return (
                      <div key={course.courseId} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{course.courseTitle}</h3>
                            <p className="text-sm text-slate-400">{course.enrollments} enrollments</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-400">{formatCurrency(course.revenue)}</p>
                          </div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-1000 ease-out group-hover:from-emerald-400 group-hover:to-green-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
              {data.revenueByCourse.filter((c) => c.revenue > 0).length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No revenue data available yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* Student Segments */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Student Segments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password-Based Students */}
            {data.passwordStudents && data.passwordStudents.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Email/Password Signups
                  </h3>
                  <span className="text-2xl font-bold text-blue-400">{data.passwordStudents.length}</span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.passwordStudents.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                          {(student.name || student.email)?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="text-white font-medium">{student.name || "N/A"}</p>
                          <p className="text-sm text-slate-400">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">{student._count.enrollments} courses</p>
                        <p className="text-xs text-slate-500">{formatDate(student.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paying Students */}
            {data.payingStudents && data.payingStudents.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Paying Students
                  </h3>
                  <span className="text-2xl font-bold text-emerald-400">{data.payingStudents.length}</span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {data.payingStudents.slice(0, 5).map((student) => {
                    const totalSpent = student.enrollments.reduce((sum, e) => sum + e.course.price, 0)
                    return (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                            {(student.name || student.email)?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-white font-medium">{student.name || "N/A"}</p>
                            <p className="text-sm text-slate-400">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-400 font-bold">{formatCurrency(totalSpent)}</p>
                          <p className="text-xs text-slate-500">{student.enrollments.length} paid courses</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Payments */}
        {data.paidEnrollments && data.paidEnrollments.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Course Payments</h2>
                <p className="text-slate-400">Students who have purchased paid courses</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Total Payments</p>
                <p className="text-2xl font-bold text-emerald-400">{data.paidEnrollments.length}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Student</th>
                      <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Email</th>
                      <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Course</th>
                      <th className="text-right text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Amount</th>
                      <th className="text-right text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data.paidEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold">
                              {(enrollment.user.name || enrollment.user.email)?.[0]?.toUpperCase() || "?"}
                            </div>
                            <span className="text-white font-medium">{enrollment.user.name || "N/A"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{enrollment.user.email}</td>
                        <td className="px-6 py-4 text-white font-medium">{enrollment.course.title}</td>
                        <td className="px-6 py-4 text-right text-emerald-400 font-bold text-lg">
                          {formatCurrency(enrollment.course.price)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-400 text-sm">
                          {formatDate(enrollment.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Course Stats */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Course Performance</h2>
            <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Manage All →
            </Link>
          </div>

          {/* Visual Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {data.courseStats.map((course) => {
              // Assign icon based on course title keywords
              const getIconForCourse = (title: string) => {
                const lowerTitle = title.toLowerCase()
                if (lowerTitle.includes('ai') || lowerTitle.includes('skill')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                } else if (lowerTitle.includes('executive') || lowerTitle.includes('energy')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                } else if (lowerTitle.includes('sales') || lowerTitle.includes('mastery')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                } else if (lowerTitle.includes('leadership') || lowerTitle.includes('influence')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                } else if (lowerTitle.includes('digital') || lowerTitle.includes('marketing')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                } else if (lowerTitle.includes('wealth') || lowerTitle.includes('building')) {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                } else {
                  return (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                }
              }

              const revenue = course.isFree ? 0 : course.enrollments * course.price

              return (
                <div
                  key={course.id}
                  className="group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  {/* Status Badge */}
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

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    {getIconForCourse(course.title)}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Students</p>
                      <p className="text-2xl font-bold text-white">{formatNumber(course.enrollments)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-emerald-400">{formatCurrency(revenue)}</p>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      {course.modules}m
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.lessons}l
                    </span>
                    <span className="ml-auto text-lg font-bold text-white">
                      {course.isFree ? 'Free' : formatCurrency(course.price)}
                    </span>
                  </div>

                  {/* Edit Button */}
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Edit Course
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Detailed Table */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Course</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Students</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Content</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Price</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data.courseStats.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{course.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              course.isPublished
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                          >
                            {course.isPublished ? "✓ Published" : "○ Draft"}
                          </span>
                          {course.isFree && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              Free
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{course.enrollments}</span>
                          <span className="text-slate-400 text-sm">enrolled</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <div className="flex flex-col gap-1">
                          <span>{course.modules} modules</span>
                          <span className="text-sm text-slate-400">{course.lessons} lessons</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-semibold text-white">
                          {course.isFree ? "Free" : formatCurrency(course.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                          Edit
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.courseStats.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-slate-400 mb-4">No courses yet. Create your first course!</p>
                <Link
                  href="/admin/courses/new"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  + Create Course
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Recent Students</h2>
            <Link
              href="/admin/dashboard/students"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Student</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Email</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Joined</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Enrollments</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data.recentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {(student.name || student.email)?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="text-white font-medium">{student.name || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{student.email}</td>
                      <td className="px-6 py-4 text-slate-300">{formatDate(student.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium border border-purple-500/30">
                          {student._count.enrollments} courses
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{student._count.progress} lessons completed</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.recentStudents.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-slate-400">No students yet. They'll appear here once they sign up!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

