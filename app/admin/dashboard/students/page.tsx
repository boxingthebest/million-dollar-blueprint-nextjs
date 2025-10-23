"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface Student {
  id: string
  name: string | null
  email: string | null
  createdAt: string
  enrollments: Array<{
    course: {
      id: string
      title: string
      slug: string
    }
  }>
  totalEnrollments: number
  totalLessons: number
  completedLessons: number
  progressPercentage: number
}

interface StudentsData {
  students: Student[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function StudentsPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<StudentsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }

    if (status === "authenticated") {
      fetchStudents()
    }
  }, [status, page])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(search && { search }),
      })

      const response = await fetch(`/api/admin/students?${params}`)
      if (response.ok) {
        const studentsData = await response.json()
        setData(studentsData)
      }
    } catch (error) {
      console.error("Failed to fetch students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchStudents()
  }

  const exportToCSV = () => {
    if (!data) return

    setExporting(true)
    
    // Create CSV content
    const headers = ["Name", "Email", "Joined Date", "Enrollments", "Completed Lessons", "Total Lessons", "Progress %"]
    const rows = data.students.map(student => [
      student.name || "N/A",
      student.email || "N/A",
      new Date(student.createdAt).toLocaleDateString(),
      student.totalEnrollments.toString(),
      student.completedLessons.toString(),
      student.totalLessons.toString(),
      student.progressPercentage.toString() + "%"
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `students-export-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setTimeout(() => setExporting(false), 1000)
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
  if (loading && !data) {
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
            <div className="h-12 bg-slate-800 rounded"></div>
            <div className="h-96 bg-slate-800 rounded"></div>
          </div>
        </main>
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
                className="text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/students"
                className="text-cyan-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Student Management
            </h1>
            <p className="text-slate-400 text-lg">
              {formatNumber(data?.pagination.total || 0)} total students registered
            </p>
          </div>
          <button
            onClick={exportToCSV}
            disabled={!data || data.students.length === 0 || exporting}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {exporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              Search
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setPage(1)
                  fetchStudents()
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Students Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden mb-8 backdrop-blur-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Student</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Email</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Joined</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Enrollments</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Progress</th>
                    <th className="text-left text-slate-400 font-semibold px-6 py-4 text-sm uppercase tracking-wider">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data?.students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {(student.name || student.email)?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <div className="text-white font-medium">{student.name || "N/A"}</div>
                            {student.enrollments.length > 0 && (
                              <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                                {student.enrollments.map((e) => e.course.title).join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{student.email}</td>
                      <td className="px-6 py-4 text-slate-300">{formatDate(student.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium border border-purple-500/30">
                          {student.totalEnrollments} {student.totalEnrollments === 1 ? "course" : "courses"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{student.completedLessons} / {student.totalLessons}</span>
                          <span className="text-xs text-slate-400">lessons completed</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden min-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 ease-out"
                              style={{ width: `${student.progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-slate-300 text-sm font-semibold w-12 text-right">
                            {student.progressPercentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data?.students.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-lg mb-2">
                    {search ? "No students found matching your search." : "No students yet."}
                  </p>
                  {search && (
                    <button
                      onClick={() => {
                        setSearch("")
                        setPage(1)
                        fetchStudents()
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Clear search and view all
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 px-4 font-medium">
                Page <span className="text-white">{page}</span> of <span className="text-white">{data.pagination.totalPages}</span>
              </span>
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === data.pagination.totalPages}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

