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

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }

    if (status === "authenticated") {
      fetchStudents()
    }
  }, [status, page, search])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading students...</div>
      </div>
    )
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
                className="text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard/students"
                className="text-cyan-400 font-semibold"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Student Management</h1>
            <p className="text-slate-400">
              {data?.pagination.total || 0} total students
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="flex-1 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Search
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("")
                  setPage(1)
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Students Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Student</th>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Email</th>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Joined</th>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Enrollments</th>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Progress</th>
                <th className="text-left text-slate-400 font-medium px-6 py-4">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data?.students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{student.name || "N/A"}</div>
                    {student.enrollments.length > 0 && (
                      <div className="text-xs text-slate-400 mt-1">
                        {student.enrollments.map((e) => e.course.title).join(", ")}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{student.email}</td>
                  <td className="px-6 py-4 text-slate-300">{formatDate(student.createdAt)}</td>
                  <td className="px-6 py-4 text-slate-300">{student.totalEnrollments}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {student.completedLessons} / {student.totalLessons} lessons
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                          style={{ width: `${student.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-slate-300 text-sm font-medium w-12">
                        {student.progressPercentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.students.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              {search ? "No students found matching your search." : "No students yet."}
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-slate-400 px-4">
              Page {page} of {data.pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === data.pagination.totalPages}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

