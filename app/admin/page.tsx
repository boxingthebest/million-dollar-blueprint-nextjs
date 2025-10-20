import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  // Get all courses
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

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
              <Link
                href="/dashboard"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Student View
              </Link>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">{session.user.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Course Admin</h1>
            <p className="text-slate-400">Manage your courses, modules, and lessons</p>
          </div>
          <Link
            href="/admin/courses/new"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            + New Course
          </Link>
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => {
            const totalLessons = course.modules.reduce(
              (acc, module) => acc + module.lessons.length,
              0
            )

            return (
              <div
                key={course.id}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.isPublished
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                      {course.isFree && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 mb-4">{course.description}</p>

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span>{course.modules.length} modules</span>
                      <span>{totalLessons} lessons</span>
                      <span>{course._count.enrollments} students</span>
                      {!course.isFree && (
                        <span className="text-cyan-400 font-semibold">
                          ${(course.price / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                  >
                    Edit Course
                  </Link>
                </div>
              </div>
            )
          })}

          {courses.length === 0 && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-12 text-center">
              <p className="text-slate-400 mb-4">No courses yet. Create your first course!</p>
              <Link
                href="/admin/courses/new"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                + Create Course
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

