"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

interface Course {
  id: string
  title: string
  slug: string
  isPublished: boolean
  isFree: boolean
}

interface GeneratedAccount {
  id: string
  email: string
  password: string
  name: string
  enrollments: Array<{
    courseId: string
    courseTitle: string
    courseSlug: string
  }>
  loginUrl: string
}

export default function TestAccountsPage() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [accountType, setAccountType] = useState<"basic" | "with-progress">("basic")
  const [loading, setLoading] = useState(false)
  const [generatedAccount, setGeneratedAccount] = useState<GeneratedAccount | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }

    if (status === "authenticated") {
      fetchCourses()
    }
  }, [status])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/dashboard")
      if (response.ok) {
        const data = await response.json()
        const courseList = data.courseStats.map((c: any) => ({
          id: c.id,
          title: c.title,
          slug: c.title.toLowerCase().replace(/\s+/g, "-"),
          isPublished: c.isPublished,
          isFree: c.isFree,
        }))
        setCourses(courseList)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    }
  }

  const toggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    )
  }

  const selectAllCourses = () => {
    setSelectedCourses(courses.map((c) => c.id))
  }

  const deselectAllCourses = () => {
    setSelectedCourses([])
  }

  const generateAccount = async () => {
    setLoading(true)
    setGeneratedAccount(null)
    setCopied(false)

    try {
      const response = await fetch("/api/admin/create-test-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrollInCourses: selectedCourses,
          accountType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedAccount(data.account)
      } else {
        alert("Failed to create test account")
      }
    } catch (error) {
      console.error("Failed to generate account:", error)
      alert("Failed to create test account")
    } finally {
      setLoading(false)
    }
  }

  const copyCredentials = () => {
    if (!generatedAccount) return

    const text = `Test Account Credentials
Email: ${generatedAccount.email}
Password: ${generatedAccount.password}
Login URL: ${generatedAccount.loginUrl}

Enrolled Courses:
${generatedAccount.enrollments.map((e) => `- ${e.courseTitle}`).join("\n")}
`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
                className="text-slate-400 hover:text-white transition-colors"
              >
                Students
              </Link>
              <Link
                href="/admin/dashboard/test-accounts"
                className="text-cyan-400 font-semibold"
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Test Account Generator</h1>
          <p className="text-slate-400">
            Create demo accounts to share with potential customers or for testing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Account Type */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Account Type</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="basic"
                    checked={accountType === "basic"}
                    onChange={(e) => setAccountType(e.target.value as "basic")}
                    className="w-4 h-4 text-cyan-500"
                  />
                  <div>
                    <div className="text-white font-medium">Basic Account</div>
                    <div className="text-sm text-slate-400">
                      Fresh account with no progress
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="with-progress"
                    checked={accountType === "with-progress"}
                    onChange={(e) => setAccountType(e.target.value as "with-progress")}
                    className="w-4 h-4 text-cyan-500"
                  />
                  <div>
                    <div className="text-white font-medium">With Progress</div>
                    <div className="text-sm text-slate-400">
                      Account with some lessons completed
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Course Selection */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Enroll in Courses</h2>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllCourses}
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={deselectAllCourses}
                    className="text-sm text-slate-400 hover:text-slate-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {courses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-start gap-3 cursor-pointer hover:bg-slate-800/30 p-3 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourse(course.id)}
                      className="mt-1 w-4 h-4 text-cyan-500"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{course.title}</div>
                      <div className="flex gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            course.isPublished
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {course.isPublished ? "Published" : "Draft"}
                        </span>
                        {course.isFree && (
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
                {courses.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No courses available
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAccount}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Test Account"}
            </button>
          </div>

          {/* Generated Account Display */}
          <div>
            {generatedAccount ? (
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Account Created! ✅</h2>
                  <button
                    onClick={copyCredentials}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    {copied ? "Copied!" : "Copy All"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm font-medium block mb-1">
                      Email
                    </label>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white font-mono text-sm">
                      {generatedAccount.email}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-sm font-medium block mb-1">
                      Password
                    </label>
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white font-mono text-sm">
                      {generatedAccount.password}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 text-sm font-medium block mb-1">
                      Login URL
                    </label>
                    <a
                      href={generatedAccount.loginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-cyan-400 hover:text-cyan-300 font-mono text-sm break-all"
                    >
                      {generatedAccount.loginUrl}
                    </a>
                  </div>

                  {generatedAccount.enrollments.length > 0 && (
                    <div>
                      <label className="text-slate-400 text-sm font-medium block mb-2">
                        Enrolled Courses ({generatedAccount.enrollments.length})
                      </label>
                      <div className="space-y-2">
                        {generatedAccount.enrollments.map((enrollment) => (
                          <div
                            key={enrollment.courseId}
                            className="bg-slate-900/50 border border-slate-700 rounded-lg p-3"
                          >
                            <div className="text-white font-medium">
                              {enrollment.courseTitle}
                            </div>
                            <a
                              href={`${generatedAccount.loginUrl.replace("/auth/signin", "")}/courses/${enrollment.courseSlug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                              View Course →
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <p className="text-sm text-slate-400">
                    💡 <strong className="text-white">Tip:</strong> Share these credentials
                    with potential customers to give them a demo experience, or use them for
                    testing new features.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-12 text-center">
                <svg
                  className="w-16 h-16 text-slate-700 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="text-slate-400">
                  Configure your test account settings and click "Generate Test Account" to
                  create a new demo account.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

