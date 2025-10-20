"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Lesson {
  id: string
  title: string
  description: string | null
  videoUrl: string
  duration: number
  order: number
}

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  isFree: boolean
  isPublished: boolean
  modules: Module[]
}

export default function CourseEditor({ course }: { course: Course }) {
  const router = useRouter()
  const [modules, setModules] = useState(course.modules)
  const [saving, setSaving] = useState(false)

  const updateLessonVideoUrl = async (lessonId: string, videoUrl: string) => {
    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl }),
      })

      if (response.ok) {
        // Update local state
        setModules((prev) =>
          prev.map((module) => ({
            ...module,
            lessons: module.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, videoUrl } : lesson
            ),
          }))
        )
        alert("Video URL updated successfully!")
      } else {
        alert("Failed to update video URL")
      }
    } catch (error) {
      console.error("Error updating video URL:", error)
      alert("Error updating video URL")
    }
  }

  return (
    <div className="space-y-8">
      {/* Course Info */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Course Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Title:</span>
            <p className="text-white font-semibold">{course.title}</p>
          </div>
          <div>
            <span className="text-slate-400">Slug:</span>
            <p className="text-white font-mono">{course.slug}</p>
          </div>
          <div>
            <span className="text-slate-400">Price:</span>
            <p className="text-white">
              {course.isFree ? "Free" : `$${(course.price / 100).toFixed(2)}`}
            </p>
          </div>
          <div>
            <span className="text-slate-400">Status:</span>
            <p className="text-white">
              {course.isPublished ? "Published" : "Draft"}
            </p>
          </div>
        </div>
      </div>

      {/* Modules and Lessons */}
      {modules.map((module, moduleIndex) => (
        <div
          key={module.id}
          className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800 bg-slate-800/30">
            <h3 className="text-xl font-bold text-white">
              Module {moduleIndex + 1}: {module.title}
            </h3>
            {module.description && (
              <p className="text-slate-400 mt-2">{module.description}</p>
            )}
          </div>

          <div className="divide-y divide-slate-800">
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Lesson {lessonIndex + 1}: {lesson.title}
                    </h4>
                    {lesson.description && (
                      <p className="text-slate-400 text-sm">{lesson.description}</p>
                    )}
                  </div>
                  <span className="text-sm text-slate-500">
                    {Math.floor(lesson.duration / 60)} min
                  </span>
                </div>

                {/* Video URL Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Video URL (Vimeo)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue={lesson.videoUrl}
                      placeholder="https://vimeo.com/..."
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      onBlur={(e) => {
                        if (e.target.value !== lesson.videoUrl) {
                          updateLessonVideoUrl(lesson.id, e.target.value)
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Current: {lesson.videoUrl === "placeholder" ? "No video" : lesson.videoUrl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

