import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: {
                    include: {
                      progress: {
                        where: {
                          userId: session.user.email ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id || "" : ""
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  const enrolledCourses = user?.enrollments || []

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
            <div className="flex items-center gap-4">
              <span className="text-slate-300">Welcome, {user?.name}</span>
              <Link
                href="/api/auth/signout"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
        <p className="text-slate-400 mb-8">Continue your learning journey</p>

        {enrolledCourses.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-12 text-center">
            <p className="text-slate-400 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((enrollment) => {
              const course = enrollment.course
              const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
              const completedLessons = course.modules.reduce(
                (acc, module) =>
                  acc + module.lessons.filter((lesson) => lesson.progress.some((p) => p.completed)).length,
                0
              )
              const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

              return (
                <Link
                  key={course.id}
                  href={`/learn/${course.slug}`}
                  className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  {course.thumbnail && (
                    <div className="aspect-video bg-slate-800 relative overflow-hidden">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      {completedLessons} of {totalLessons} lessons completed
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

