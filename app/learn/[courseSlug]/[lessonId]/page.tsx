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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Image
                src="/logo-main-desktop.png"
                alt="Million Dollar Blueprint"
                width={200}
                height={100}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <Link
              href={`/learn/${course.slug}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Course
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
              {/* Video */}
              <div className="aspect-video bg-black">
                <LessonPlayer
                  videoUrl={lesson.videoUrl}
                  lessonId={lesson.id}
                  userId={user.id}
                  isCompleted={isCompleted}
                />
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
                {lesson.description && (
                  <p className="text-slate-400 mb-6">{lesson.description}</p>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  {previousLesson ? (
                    <Link
                      href={`/learn/${course.slug}/${previousLesson.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      ← Previous Lesson
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <Link
                      href={`/learn/${course.slug}/${nextLesson.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300"
                    >
                      Next Lesson →
                    </Link>
                  ) : (
                    <Link
                      href={`/learn/${course.slug}`}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Complete Course ✓
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Course Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Course Content</h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {course.modules.map((module) => (
                  <div key={module.id} className="space-y-1">
                    <p className="text-sm font-semibold text-slate-400 mt-4 mb-2">
                      {module.title}
                    </p>
                    {module.lessons.map((l) => (
                      <Link
                        key={l.id}
                        href={`/learn/${course.slug}/${l.id}`}
                        className={`block px-3 py-2 rounded text-sm transition-colors ${
                          l.id === lesson.id
                            ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        {l.title}
                      </Link>
                    ))}
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

