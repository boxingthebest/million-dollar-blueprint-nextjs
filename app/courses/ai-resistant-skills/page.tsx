import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/LogoutButton"
import { Brain, Zap, TrendingUp, Crown, Megaphone, DollarSign, BookOpen, Flame, Star, Trophy, Target, Rocket } from "lucide-react"

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

  // Get course icon
  const getCourseIcon = (slug: string) => {
    if (slug.includes('ai')) return Brain
    if (slug.includes('energy') || slug.includes('wellness')) return Zap
    if (slug.includes('sales')) return TrendingUp
    if (slug.includes('leadership')) return Crown
    if (slug.includes('marketing')) return Megaphone
    if (slug.includes('wealth')) return DollarSign
    return BookOpen
  }

  // Get course icon color
  const getCourseIconColor = (slug: string) => {
    if (slug.includes('ai')) return 'text-cyan-400'
    if (slug.includes('energy') || slug.includes('wellness')) return 'text-yellow-400'
    if (slug.includes('sales')) return 'text-emerald-400'
    if (slug.includes('leadership')) return 'text-purple-400'
    if (slug.includes('marketing')) return 'text-pink-400'
    if (slug.includes('wealth')) return 'text-orange-400'
    return 'text-blue-400'
  }

  // Get course background gradient
  const getCourseGradient = (slug: string) => {
    if (slug.includes('ai')) return 'from-cyan-500/20 to-blue-500/20'
    if (slug.includes('energy') || slug.includes('wellness')) return 'from-yellow-500/20 to-orange-500/20'
    if (slug.includes('sales')) return 'from-emerald-500/20 to-green-500/20'
    if (slug.includes('leadership')) return 'from-purple-500/20 to-indigo-500/20'
    if (slug.includes('marketing')) return 'from-pink-500/20 to-rose-500/20'
    if (slug.includes('wealth')) return 'from-orange-500/20 to-red-500/20'
    return 'from-blue-500/20 to-cyan-500/20'
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-cyan-950/20"></div>