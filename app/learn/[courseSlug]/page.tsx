import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function CoursePage({ params }: { params: { courseSlug: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const course = await prisma.course.findUnique({
    where: { slug: params.courseSlug },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              progress: {
                where: { userId: user.id }
              }
            }
          }
        }
      },
      enrollments: {
        where: { userId: user.id }
      }
    }
  })

  if (!course) {
    notFound()
  }

  const isAdmin = user.role === 'admin'
  const isEnrolled = course.enrollments.length > 0 || isAdmin
  const firstLesson = course.modules[0]?.lessons[0]

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
              href="/dashboard"
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-slate-300 text-lg mb-8">{course.description}</p>

            {isEnrolled && firstLesson && (
              <Link
                href={`/learn/${course.slug}/${firstLesson.id}`}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                Continue Learning →
              </Link>
            )}
          </div>

          {/* Course Curriculum */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-6">Course Curriculum</h2>
            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div
                  key={module.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-slate-400 mt-2">{module.description}</p>
                    )}
                  </div>
                  <div className="divide-y divide-slate-800">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = lesson.progress.some(p => p.completed)
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${course.slug}/${lesson.id}`}
                          className="block p-4 hover:bg-slate-800/50 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {isCompleted ? '✓' : lessonIndex + 1}
                              </div>
                              <div>
                                <p className="text-white group-hover:text-cyan-400 transition-colors">
                                  {lesson.title}
                                </p>
                                {lesson.description && (
                                  <p className="text-sm text-slate-500">{lesson.description}</p>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-slate-500">
                              {Math.floor(lesson.duration / 60)} min
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

