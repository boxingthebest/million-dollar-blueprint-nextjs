import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ViewCoursePage() {
  try {
    // First, get all courses to debug
    const allCourses = await prisma.course.findMany()
    
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills-paid' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!course) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="text-gray-400 mb-4">Looking for slug: ai-resistant-skills-paid</p>
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Available Courses ({allCourses.length}):</h2>
              {allCourses.map(c => (
                <div key={c.id} className="mb-2">
                  <span className="font-mono text-sm">{c.slug}</span> - {c.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header */}
        <div className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Course Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {course.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{course.description}</p>
            
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">📚</span>
                <span className="text-gray-400">{course.modules.length} Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">🎥</span>
                <span className="text-gray-400">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">⏱️</span>
                <span className="text-gray-400">
                  {course.modules.reduce((acc, m) => 
                    acc + m.lessons.reduce((sum, l) => sum + l.duration, 0), 0
                  )} minutes total
                </span>
              </div>
            </div>
          </div>
          
          {/* Course Content */}
          <div className="grid gap-8">
            {course.modules.map((module, idx) => (
              <div key={module.id} className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all">
                <div className="mb-6">
                  <div className="text-cyan-400 text-sm font-semibold mb-2">MODULE {idx + 1}</div>
                  <h2 className="text-3xl font-bold mb-3">{module.title}</h2>
                  <p className="text-gray-400">{module.description}</p>
                </div>
                
                <div className="space-y-3">
                  {module.lessons.map((lesson, lessonIdx) => (
                    <Link
                      key={lesson.id}
                      href={`/learn/${course.slug}/${lesson.id}`}
                      className="block bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-cyan-500/50 hover:bg-slate-800 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-cyan-400 font-semibold text-sm">
                              Lesson {lessonIdx + 1}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400 text-sm">
                              {lesson.duration} minutes
                            </span>
                            {lesson.videoUrl ? (
                              <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">
                                ✓ Video Ready
                              </span>
                            ) : (
                              <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded">
                                ⚠️ Coming Soon
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{lesson.description}</p>
                        </div>
                        <div className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Course Info Card */}
          <div className="mt-12 p-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Course Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-900/50 rounded-lg">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{course.modules.length}</div>
                <div className="text-gray-300">Comprehensive Modules</div>
              </div>
              <div className="text-center p-6 bg-slate-900/50 rounded-lg">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                </div>
                <div className="text-gray-300">Expert-Led Lessons</div>
              </div>
              <div className="text-center p-6 bg-slate-900/50 rounded-lg">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {course.modules.reduce((acc, m) => 
                    acc + m.lessons.reduce((sum, l) => sum + l.duration, 0), 0
                  )}m
                </div>
                <div className="text-gray-300">Total Duration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading Course</h1>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {error.message}
          </pre>
        </div>
      </div>
    )
  }
}

