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
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
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
            <div className="flex items-center gap-6">
              <Link
                href="/admin/dashboard"
                className="text-cyan-400 font-semibold"
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
              <span className="text-slate-300">{session?.user?.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Overview of your platform performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Students */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Students</h3>
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{data.overview.totalStudents}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Revenue</h3>
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{formatCurrency(data.overview.totalRevenue)}</p>
          </div>

          {/* Total Enrollments */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Enrollments</h3>
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{data.overview.totalEnrollments}</p>
          </div>

          {/* Total Courses */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Total Courses</h3>
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{data.overview.totalCourses}</p>
            <p className="text-sm text-slate-400 mt-1">{data.overview.publishedCourses} published</p>
          </div>

          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-sm font-medium">Completion Rate</h3>
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-white">{data.overview.completionRate}%</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6 flex flex-col justify-center">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/dashboard/test-accounts"
                className="block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                Create Test Account
              </Link>
              <Link
                href="/admin"
                className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                Manage Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Course Performance</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Course</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Students</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Content</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.courseStats.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/courses/${course.id}`} className="text-white hover:text-cyan-400 font-medium">
                        {course.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.isPublished
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                      {course.isFree && (
                        <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                          Free
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-300">{course.enrollments}</td>
                    <td className="px-6 py-4 text-slate-300">
                      {course.modules} modules • {course.lessons} lessons
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {course.isFree ? "Free" : formatCurrency(course.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Students */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Students</h2>
            <Link
              href="/admin/dashboard/students"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Student</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Email</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Joined</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Enrollments</th>
                  <th className="text-left text-slate-400 font-medium px-6 py-4">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.recentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-white">{student.name || "N/A"}</td>
                    <td className="px-6 py-4 text-slate-300">{student.email}</td>
                    <td className="px-6 py-4 text-slate-300">{formatDate(student.createdAt)}</td>
                    <td className="px-6 py-4 text-slate-300">{student._count.enrollments}</td>
                    <td className="px-6 py-4 text-slate-300">{student._count.progress} lessons</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

