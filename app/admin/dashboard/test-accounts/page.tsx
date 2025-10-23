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
  const [copied, setCopied] = useState<string | null>(null)
  const [fetchingCourses, setFetchingCourses] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin")
    }

    if (status === "authenticated") {
      fetchCourses()
    }
  }, [status])

  const fetchCourses = async () => {
    setFetchingCourses(true)
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
    } finally {
      setFetchingCourses(false)
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
    setCopied(null)

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
        alert("Failed to create test account. Please try again.")
      }
    } catch (error) {
      console.error("Failed to generate account:", error)
      alert("Failed to create test account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAllCredentials = () => {
    if (!generatedAccount) return

    const text = `🎓 Million Dollar Blueprint - Test Account

📧 Email: ${generatedAccount.email}
🔑 Password: ${generatedAccount.password}
🔗 Login: ${generatedAccount.loginUrl}

📚 Enrolled Courses (${generatedAccount.enrollments.length}):
${generatedAccount.enrollments.map((e, i) => `${i + 1}. ${e.courseTitle}`).join("\n")}

---
Generated: ${new Date().toLocaleString()}
`

    navigator.clipboard.writeText(text)
    setCopied("all")
    setTimeout(() => setCopied(null), 2000)
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
                className="text-slate-400 hover:text-white transition-colors"
              >
                Students
              </Link>
              <Link
                href="/admin/dashboard/test-accounts"
                className="text-cyan-400 font-semibold relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400"
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
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Test Account Generator
          </h1>
          <p className="text-slate-400 text-lg">
            Create demo accounts instantly to share with potential customers or for testing purposes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Account Type */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Type
              </h2>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all hover:bg-slate-800/30 ${accountType === 'basic' ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-700'}">
                  <input
                    type="radio"
                    name="accountType"
                    value="basic"
                    checked={accountType === "basic"}
                    onChange={(e) => setAccountType(e.target.value as "basic")}
                    className="mt-1 w-5 h-5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">Basic Account</div>
                    <div className="text-sm text-slate-400">
                      Fresh account with no progress - perfect for first-time demos
                    </div>
                  </div>
                </label>
                <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all hover:bg-slate-800/30 ${accountType === 'with-progress' ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-700'}`}>
                  <input
                    type="radio"
                    name="accountType"
                    value="with-progress"
                    checked={accountType === "with-progress"}
                    onChange={(e) => setAccountType(e.target.value as "with-progress")}
                    className="mt-1 w-5 h-5 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                  />
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">With Progress</div>
                    <div className="text-sm text-slate-400">
                      Account with first 3 lessons completed - shows the learning experience
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Course Selection */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Enroll in Courses
                  <span className="text-sm font-normal text-slate-400">({selectedCourses.length} selected)</span>
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllCourses}
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={deselectAllCourses}
                    className="text-sm text-slate-400 hover:text-slate-300 font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {fetchingCourses ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all hover:bg-slate-800/30 ${
                        selectedCourses.includes(course.id)
                          ? "border-cyan-500 bg-cyan-500/5"
                          : "border-slate-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourse(course.id)}
                        className="mt-1 w-5 h-5 text-cyan-500 rounded focus:ring-cyan-500 focus:ring-offset-slate-900"
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">{course.title}</div>
                        <div className="flex gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              course.isPublished
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                          >
                            {course.isPublished ? "✓ Published" : "○ Draft"}
                          </span>
                          {course.isFree && (
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              Free
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                  {courses.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <svg className="w-12 h-12 mx-auto mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      No courses available yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Generate Button */}
            <button
              onClick={generateAccount}
              disabled={loading || fetchingCourses}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Account...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Generate Test Account
                </>
              )}
            </button>
          </div>

          {/* Generated Account Display */}
          <div>
            {generatedAccount ? (
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl">✅</span>
                    Account Created!
                  </h2>
                  <button
                    onClick={copyAllCredentials}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 text-sm font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied === "all" ? "Copied!" : "Copy All"}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="text-slate-400 text-sm font-semibold block mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white font-mono text-sm">
                        {generatedAccount.email}
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedAccount.email, "email")}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                      >
                        {copied === "email" ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-slate-400 text-sm font-semibold block mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white font-mono text-sm">
                        {generatedAccount.password}
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedAccount.password, "password")}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                      >
                        {copied === "password" ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Login URL */}
                  <div>
                    <label className="text-slate-400 text-sm font-semibold block mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Login URL
                    </label>
                    <div className="flex gap-2">
                      <a
                        href={generatedAccount.loginUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-cyan-400 hover:text-cyan-300 font-mono text-sm break-all transition-colors"
                      >
                        {generatedAccount.loginUrl}
                      </a>
                      <button
                        onClick={() => copyToClipboard(generatedAccount.loginUrl, "url")}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                      >
                        {copied === "url" ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Enrolled Courses */}
                  {generatedAccount.enrollments.length > 0 && (
                    <div>
                      <label className="text-slate-400 text-sm font-semibold block mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Enrolled Courses ({generatedAccount.enrollments.length})
                      </label>
                      <div className="space-y-2">
                        {generatedAccount.enrollments.map((enrollment, index) => (
                          <div
                            key={enrollment.courseId}
                            className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/30 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-slate-500 font-bold">#{index + 1}</span>
                                  <span className="text-white font-semibold">{enrollment.courseTitle}</span>
                                </div>
                                <a
                                  href={`${generatedAccount.loginUrl.replace("/auth/signin", "")}/courses/${enrollment.courseSlug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors"
                                >
                                  View Course
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="mt-6 p-5 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Pro Tips</h3>
                      <ul className="text-sm text-slate-400 space-y-1">
                        <li>• Share these credentials with potential customers for instant demos</li>
                        <li>• Use for testing new features before rolling them out</li>
                        <li>• Create multiple accounts to simulate different user scenarios</li>
                        <li>• Test accounts work exactly like regular accounts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Generate</h3>
                <p className="text-slate-400 mb-6 max-w-md">
                  Configure your test account settings on the left, then click "Generate Test Account" to create a new demo account instantly.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Instant creation
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure credentials
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Easy to share
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

