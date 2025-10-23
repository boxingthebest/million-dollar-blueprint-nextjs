import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import LessonPlayer from "./LessonPlayer"

export default async function LessonPage({
  params,
}: {
  params: { courseSlug: string; lessonId: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { order: "asc" },
                include: {
                  lessons: {
                    orderBy: { order: "asc" },
                    include: {
                      progress: {
                        where: { userId: user.id },
                      },
                    },
                  },
                },
              },
            },
          },
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
      progress: {
        where: { userId: user.id },
      },
    },
  })

  if (!lesson) {
    notFound()
  }

  const course = lesson.module.course

  // Check if user is enrolled or is an admin
  const isAdmin = user.role === 'admin'
  
  if (!isAdmin) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    })

    if (!enrollment) {
      redirect(`/learn/${course.slug}`)
    }
  }

  // Find all lessons in order
  const allLessons = course.modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id)
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const isCompleted = lesson.progress.some((p) => p.completed)

  // Calculate overall progress
  const totalLessons = allLessons.length
  const completedLessons = allLessons.filter((l) => l.progress.some((p) => p.completed)).length
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="transition-opacity hover:opacity-80">
              <Image
                src="/logo-main-desktop.png"
                alt="Million Dollar Blueprint"
                width={200}
                height={100}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-6">
              {/* Course Progress */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Course Progress</p>
                  <p className="text-sm font-bold text-cyan-400">{progressPercentage}% Complete</p>
                </div>
                <div className="w-32 bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <Link
                href={`/learn/${course.slug}`}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Container */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Video */}
              <div className="aspect-video bg-black relative">
                <LessonPlayer
                  videoUrl={lesson.videoUrl}
                  lessonId={lesson.id}
                  userId={user.id}
                  isCompleted={isCompleted}
                />
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-semibold text-sm">Completed</span>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
                        Lesson {currentIndex + 1} of {totalLessons}
                      </span>
                      {isCompleted && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Complete
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{lesson.title}</h1>
                    {lesson.description && (
                      <p className="text-slate-400 text-lg leading-relaxed">{lesson.description}</p>
                    )}
                  </div>
                </div>

                {/* Motivational Message */}
                {!isCompleted && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                    <p className="text-cyan-400 font-semibold flex items-center gap-2">
                      <span className="text-2xl">💪</span>
                      <span>You're making progress! Every lesson brings you closer to your breakthrough.</span>
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-800 mt-8">
                  {previousLesson ? (
                    <Link
                      href={`/learn/${course.slug}/${previousLesson.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 font-semibold group"
                    >
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Lesson
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <Link
                      href={`/learn/${course.slug}/${nextLesson.id}`}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 font-bold shadow-lg shadow-cyan-500/30 group"
                    >
                      Next Lesson
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href={`/learn/${course.slug}`}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 font-bold shadow-lg shadow-green-500/30"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Complete Course
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Celebration */}
            {progressPercentage >= 25 && progressPercentage < 30 && (
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🎉</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">You're 25% There!</h3>
                    <p className="text-slate-300">Amazing progress! Keep up the momentum!</p>
                  </div>
                </div>
              </div>
            )}

            {progressPercentage >= 50 && progressPercentage < 55 && (
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🔥</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Halfway to Mastery!</h3>
                    <p className="text-slate-300">You're unstoppable! The finish line is in sight!</p>
                  </div>
                </div>
              </div>
            )}

            {progressPercentage >= 75 && progressPercentage < 80 && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">75% Complete!</h3>
                    <p className="text-slate-300">You're in the home stretch! Finish strong!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Course Content</h3>
                <p className="text-sm text-slate-400">{completedLessons} of {totalLessons} lessons complete</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-bold text-cyan-400">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="space-y-1">
                    <p className="text-sm font-semibold text-slate-300 mt-4 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                        {moduleIndex + 1}
                      </span>
                      {module.title}
                    </p>
                    {module.lessons.map((l) => {
                      const lessonCompleted = l.progress.some((p) => p.completed)
                      return (
                        <Link
                          key={l.id}
                          href={`/learn/${course.slug}/${l.id}`}
                          className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                            l.id === lesson.id
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 font-semibold border border-cyan-500/30"
                              : lessonCompleted
                              ? "text-green-400 hover:text-white hover:bg-slate-800 border border-transparent"
                              : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
                          }`}
                        >
                          {lessonCompleted ? (
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-current flex-shrink-0" />
                          )}
                          <span className="flex-1 truncate">{l.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

