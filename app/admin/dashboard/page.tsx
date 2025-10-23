"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface DashboardData {
  overview: {
    totalStudents: number
    totalCourses: number
    publishedCourses: number
    totalEnrollments: number
    totalRevenue: number
    completionRate: number
  }
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  {session?.user?.email?.[0].toUpperCase()}
                </div>
                <span className="text-slate-300 hidden md:block">{session?.user?.email}</span>
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

        {/* Course Stats */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Course Performance</h2>
            <Link href="/admin" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Manage All →
            </Link>
          </div>
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

