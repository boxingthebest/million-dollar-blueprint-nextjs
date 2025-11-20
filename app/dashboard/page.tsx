import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/LogoutButton"

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

  // If user is admin, redirect to admin dashboard
  if (user?.role === 'admin') {
    redirect('/admin/dashboard')
  }

  const enrolledCourses = user?.enrollments || []

  // Calculate overall stats
  const totalCourses = enrolledCourses.length
  const totalLessons = enrolledCourses.reduce((acc, enrollment) => 
    acc + enrollment.course.modules.reduce((modAcc, module) => modAcc + module.lessons.length, 0), 0)
  const completedLessons = enrolledCourses.reduce((acc, enrollment) =>
    acc + enrollment.course.modules.reduce((modAcc, module) =>
      modAcc + module.lessons.filter((lesson) => lesson.progress.some((p) => p.completed)).length, 0), 0)
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Calculate streak (simplified)
  const currentStreak = 5

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-cyan-950/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Blueprint Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(/dashboard-blueprint.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
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
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-xs text-slate-400">Current Streak</p>
                  <p className="text-sm font-bold text-orange-400">{currentStreak} days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">Student</p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 border-b border-cyan-500/20 overflow-hidden">
          {/* Hero Background Image */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(/student-success-hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-500/50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-500/50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/50"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full mb-6">
                <span className="text-cyan-400 font-semibold text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  LEARNING COMMAND CENTER
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Welcome Back, </span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {user?.name || 'Champion'}
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                {overallProgress === 0 
                  ? "Your transformation starts NOW! Take the first step today."
                  : overallProgress < 50
                  ? "You're building momentum! Keep pushing forward to your goals."
                  : overallProgress < 100
                  ? "Incredible progress! You're more than halfway to mastery."
                  : "You've achieved mastery! Now it's time to apply and teach others."}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-6 py-4">
                  <p className="text-3xl font-bold text-cyan-400">{totalCourses}</p>
                  <p className="text-sm text-slate-400">Courses</p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl px-6 py-4">
                  <p className="text-3xl font-bold text-purple-400">{completedLessons}</p>
                  <p className="text-sm text-slate-400">Lessons Done</p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-6 py-4">
                  <p className="text-3xl font-bold text-emerald-400">{overallProgress}%</p>
                  <p className="text-sm text-slate-400">Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {enrolledCourses.length === 0 ? (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-16 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Your Transformation?
                </h2>
                <p className="text-slate-300 text-lg mb-8">
                  You haven't enrolled in any courses yet. Choose your path to success and begin your journey today!
                </p>
                <Link
                  href="/"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg py-4 px-12 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transform hover:scale-105"
                >
                  Explore Courses →
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-8">Your Courses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => {
                  const course = enrollment.course
                  const courseLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
                  const courseCompleted = course.modules.reduce((acc, module) => 
                    acc + module.lessons.filter((lesson) => lesson.progress.some((p) => p.completed)).length, 0)
                  const courseProgress = courseLessons > 0 ? Math.round((courseCompleted / courseLessons) * 100) : 0

                  return (
                    <div 
                      key={course.id}
                      className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105"
                    >
                      {/* Course Image/Icon */}
                      <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative text-6xl">
                          {course.slug.includes('ai') ? '🤖' : 
                           course.slug.includes('energy') || course.slug.includes('wellness') ? '⚡' :
                           course.slug.includes('sales') ? '💼' :
                           course.slug.includes('leadership') ? '👑' :
                           course.slug.includes('marketing') ? '📱' :
                           course.slug.includes('wealth') ? '💰' : '📚'}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {course.title}
                        </h3>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-cyan-400 font-semibold">{courseProgress}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                              style={{ width: `${courseProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
                          <span>{course.modules.length} modules</span>
                          <span>{courseLessons} lessons</span>
                        </div>

                        <Link
                          href={`/learn/${course.slug}`}
                          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-center shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50"
                        >
                          {courseProgress === 0 ? 'Start Learning' : courseProgress === 100 ? 'Review Course' : 'Continue Learning'} →
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
