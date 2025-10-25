import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/LogoutButton"
import FuturisticBackground from "@/app/components/FuturisticBackground"
import HeroSectionDivider from "@/app/components/HeroSectionDivider"

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

  // Calculate streak (simplified - you can enhance this)
  const currentStreak = 5 // This should be calculated from actual user activity

  // Motivational messages based on progress
  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "Your transformation starts NOW! Take the first step today."
    if (progress < 25) return "You've started your journey! Every lesson brings you closer to breakthrough."
    if (progress < 50) return "You're building momentum! Keep pushing forward to your goals."
    if (progress < 75) return "Incredible progress! You're more than halfway to mastery."
    if (progress < 100) return "You're so close! Finish strong and claim your transformation!"
    return "You've achieved mastery! Now it's time to apply and teach others."
  }

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Futuristic Animated Background */}
      <FuturisticBackground variant="student" />
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
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Welcome Back, {user?.name?.split(' ')[0] || 'Champion'}! 👋
          </h1>
          <p className="text-2xl text-slate-300 font-semibold mb-2">
            Your Transformation Journey
          </p>
          <p className="text-lg text-slate-400 max-w-3xl">
            {getMotivationalMessage(overallProgress)}
          </p>
        </div>

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
            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Overall Progress - Large Card */}
              <div className="lg:col-span-1 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-slate-400 text-sm font-semibold mb-6 uppercase tracking-wider">Overall Progress</h3>
                <div className="relative flex items-center justify-center mb-6">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-slate-800"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${overallProgress * 5.53} 553`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white">{overallProgress}%</span>
                    <span className="text-sm text-slate-400 mt-1">Complete</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-300 text-sm">
                    <span className="font-bold text-emerald-400">{completedLessons}</span> of{" "}
                    <span className="font-bold">{totalLessons}</span> lessons completed
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Total Courses */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{totalCourses}</p>
                  <p className="text-sm text-slate-400">Courses Enrolled</p>
                </div>

                {/* Lessons Completed */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{completedLessons}</p>
                  <p className="text-sm text-slate-400">Lessons Completed</p>
                </div>

                {/* Current Streak */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🔥</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{currentStreak}</p>
                  <p className="text-sm text-slate-400">Day Streak</p>
                </div>

                {/* Hours Learning */}
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{Math.round(completedLessons * 0.5)}</p>
                  <p className="text-sm text-slate-400">Hours Learning</p>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{Math.floor(completedLessons / 10)}</p>
                  <p className="text-sm text-slate-400">Achievements</p>
                </div>

                {/* Completion Rate */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{overallProgress}%</p>
                  <p className="text-sm text-slate-400">Completion Rate</p>
                </div>
              </div>
            </div>

            {/* My Courses Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Continue Your Journey</h2>
                  <p className="text-slate-400">Pick up where you left off and keep building momentum</p>
                </div>
                <Link
                  href="/"
                  className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Explore More Courses
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => {
                  const course = enrollment.course
                  const totalCourseLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
                  const completedCourseLessons = course.modules.reduce(
                    (acc, module) =>
                      acc + module.lessons.filter((lesson) => lesson.progress.some((p) => p.completed)).length,
                    0
                  )
                  const courseProgress = totalCourseLessons > 0 ? Math.round((completedCourseLessons / totalCourseLessons) * 100) : 0

                  return (
                    <Link
                      key={course.id}
                      href={`/learn/${course.slug}`}
                      className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:transform hover:scale-105"
                    >
                      {course.thumbnail && (
                        <div className="aspect-video bg-slate-800 relative overflow-hidden">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Progress Badge */}
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-bold text-white">{courseProgress}%</span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span className="font-semibold">Your Progress</span>
                            <span className="font-bold text-cyan-400">{courseProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                              style={{ width: `${courseProgress}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">
                            {completedCourseLessons} / {totalCourseLessons} lessons
                          </p>
                          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                            Continue
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Motivational CTA */}
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl p-1">
              <div className="bg-slate-900 rounded-xl p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Your Breakthrough is Closer Than You Think! 💪
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                  Every lesson you complete brings you one step closer to the life you deserve. Don't stop now—momentum is everything!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/50"
                  >
                    Explore More Courses
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

