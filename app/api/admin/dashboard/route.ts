import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Calculate date ranges for signup metrics
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Get total students
    const totalStudents = await prisma.user.count({
      where: { role: "user" },
    })

    // Get signup metrics
    const [signupsToday, signupsThisWeek, signupsThisMonth] = await Promise.all([
      prisma.user.count({
        where: {
          role: "user",
          createdAt: {
            gte: startOfToday,
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "user",
          createdAt: {
            gte: startOfWeek,
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "user",
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ])

    // Get total courses
    const totalCourses = await prisma.course.count()

    // Get published courses
    const publishedCourses = await prisma.course.count({
      where: { isPublished: true },
    })

    // Get total enrollments
    const totalEnrollments = await prisma.enrollment.count()

    // Get total revenue (from paid courses only)
    const paidEnrollments = await prisma.enrollment.findMany({
      include: {
        course: {
          select: {
            price: true,
            isFree: true,
          },
        },
      },
      where: {
        course: {
          isFree: false,
        },
      },
    })

    const totalRevenue = paidEnrollments.reduce(
      (sum, enrollment) => sum + enrollment.course.price,
      0
    )

    // Get detailed payment information (who has paid for courses)
    const paidEnrollmentsDetailed = await prisma.enrollment.findMany({
      where: {
        course: {
          isFree: false,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Get recent students (last 10)
    const recentStudents = await prisma.user.findMany({
      where: { role: "user" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: true,
        _count: {
          select: {
            enrollments: true,
            progress: true,
          },
        },
      },
    })

    // Get recent password-based students (last 10)
    const passwordStudents = await prisma.user.findMany({
      where: {
        role: "user",
        password: {
          not: null,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            progress: true,
          },
        },
      },
    })

    // Get paying students (students with paid enrollments)
    const payingStudents = await prisma.user.findMany({
      where: {
        role: "user",
        enrollments: {
          some: {
            course: {
              isFree: false,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            progress: true,
          },
        },
        enrollments: {
          where: {
            course: {
              isFree: false,
            },
          },
          include: {
            course: {
              select: {
                title: true,
                price: true,
              },
            },
          },
        },
      },
    })

    // Get course stats
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            enrollments: true,
            modules: true,
          },
        },
        modules: {
          include: {
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    })

    const courseStats = courses.map((course) => {
      const totalLessons = course.modules.reduce(
        (sum, module) => sum + module._count.lessons,
        0
      )

      return {
        id: course.id,
        title: course.title,
        enrollments: course._count.enrollments,
        modules: course._count.modules,
        lessons: totalLessons,
        isPublished: course.isPublished,
        isFree: course.isFree,
        price: course.price,
      }
    })

    // Get enrollment trends (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentEnrollments = await prisma.enrollment.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        createdAt: true,
        course: {
          select: {
            title: true,
            isFree: true,
          },
        },
      },
    })

    // Get completion stats
    const totalLessons = await prisma.lesson.count()
    const completedLessons = await prisma.lessonProgress.count({
      where: { completed: true },
    })

    const completionRate =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    // Calculate revenue by course
    const revenueByCourse = courseStats.map((course) => ({
      courseId: course.id,
      courseTitle: course.title,
      revenue: course.isFree ? 0 : course.enrollments * course.price,
      enrollments: course.enrollments,
    }))

    // Get signup trends (last 30 days)
    const signupTrends = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const count = await prisma.user.count({
        where: {
          role: "user",
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      })

      signupTrends.push({
        date: date.toISOString().split('T')[0],
        count,
      })
    }

    // Get revenue trends (last 30 days)
    const revenueTrends = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const enrollments = await prisma.enrollment.findMany({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate,
          },
          course: {
            isFree: false,
          },
        },
        include: {
          course: {
            select: {
              price: true,
            },
          },
        },
      })

      const revenue = enrollments.reduce((sum, e) => sum + e.course.price, 0)

      revenueTrends.push({
        date: date.toISOString().split('T')[0],
        revenue,
      })
    }

    // Get engagement metrics
    const activeStudentsLast7Days = await prisma.user.count({
      where: {
        role: "user",
        progress: {
          some: {
            updatedAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    })

    const activeStudentsLast30Days = await prisma.user.count({
      where: {
        role: "user",
        progress: {
          some: {
            updatedAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    })

    // Get recent activity (last 20 actions)
    const recentActivity: Array<{
      type: string
      user: string | null
      course?: string
      lesson?: string
      timestamp: Date
    }> = []
    
    // Recent enrollments for activity feed
    const recentEnrollmentsForActivity = await prisma.enrollment.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            title: true,
          },
        },
      },
    })

    recentEnrollmentsForActivity.forEach((enrollment) => {
      recentActivity.push({
        type: "enrollment",
        user: enrollment.user.name || enrollment.user.email,
        course: enrollment.course.title,
        timestamp: enrollment.createdAt,
      })
    })

    // Recent lesson completions for activity feed
    const recentCompletions = await prisma.lessonProgress.findMany({
      take: 10,
      where: { completed: true },
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        lesson: {
          select: {
            title: true,
            module: {
              select: {
                course: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    recentCompletions.forEach((completion) => {
      recentActivity.push({
        type: "completion",
        user: completion.user.name || completion.user.email,
        lesson: completion.lesson.title,
        course: completion.lesson.module.course.title,
        timestamp: completion.updatedAt,
      })
    })

    // Sort activity by timestamp
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    const limitedActivity = recentActivity.slice(0, 20)

    return NextResponse.json({
      overview: {
        totalStudents,
        totalCourses,
        publishedCourses,
        totalEnrollments,
        totalRevenue,
        completionRate: Math.round(completionRate * 10) / 10,
        signupsToday,
        signupsThisWeek,
        signupsThisMonth,
        activeStudentsLast7Days,
        activeStudentsLast30Days,
      },
      recentStudents,
      passwordStudents,
      payingStudents,
      courseStats,
      recentEnrollments,
      paidEnrollments: paidEnrollmentsDetailed,
      revenueByCourse,
      signupTrends,
      revenueTrends,
      recentActivity: limitedActivity,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}

