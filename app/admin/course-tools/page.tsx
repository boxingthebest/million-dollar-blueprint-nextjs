"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  title: string
  slug: string
  price: number
  isPublished: boolean
  isFree: boolean
  modules: Module[]
  _count: {
    enrollments: number
  }
}

interface Module {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  videoUrl: string | null
  duration: number
  order: number
}

export default function CourseToolsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
    if (status === "authenticated") {
      fetchCourses()
    }
  }, [status, router])

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses")
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const enrollInCourse = async (courseId: string) => {
    setEnrolling(courseId)
    try {
      const res = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId })
      })
      
      if (res.ok) {
        alert("Successfully enrolled! You can now access this course from Student View.")
        fetchCourses()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to enroll")
      }
    } catch (error) {
      alert("Error enrolling in course")
    } finally {
      setEnrolling(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Course Admin Tools</h1>
          <p className="text-slate-400">Enroll yourself in courses and audit content</p>
        </div>

        <div className="space-y-6">
          {courses.map((course) => {
            const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0)
            const lessonsWithVideo = course.modules.reduce(
              (sum, mod) => sum + mod.lessons.filter(l => l.videoUrl).length, 
              0
            )
            const completionRate = totalLessons > 0 ? (lessonsWithVideo / totalLessons) * 100 : 0

            return (
              <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                      {course.isPublished ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
                          Draft
                        </span>
                      )}
                      {course.isFree && (
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-2">Slug: {course.slug}</p>
                    <p className="text-slate-400">Price: ${(course.price / 100).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => enrollInCourse(course.id)}
                    disabled={enrolling === course.id}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {enrolling === course.id ? "Enrolling..." : "Enroll Me"}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-slate-400 text-sm mb-1">Modules</div>
                    <div className="text-2xl font-bold text-white">{course.modules.length}</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-slate-400 text-sm mb-1">Lessons</div>
                    <div className="text-2xl font-bold text-white">{totalLessons}</div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-slate-400 text-sm mb-1">Videos</div>
                    <div className="text-2xl font-bold text-white">
                      {lessonsWithVideo}/{totalLessons}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="text-slate-400 text-sm mb-1">Complete</div>
                    <div className="text-2xl font-bold text-white">{completionRate.toFixed(0)}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {course.modules.map((module) => (
                    <div key={module.id} className="bg-slate-800/50 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">
                        Module {module.order}: {module.title}
                      </h3>
                      <div className="space-y-1">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">
                              {lesson.order}. {lesson.title}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-slate-400">{lesson.duration} min</span>
                              {lesson.videoUrl ? (
                                <span className="text-green-400">✓ Video</span>
                              ) : (
                                <span className="text-red-400">✗ No Video</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

