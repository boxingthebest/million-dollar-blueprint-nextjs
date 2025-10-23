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

    // Get total students
    const totalStudents = await prisma.user.count({
      where: { role: "user" },
    })

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
        _count: {
          select: {
            enrollments: true,
            progress: true,
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

    return NextResponse.json({
      overview: {
        totalStudents,
        totalCourses,
        publishedCourses,
        totalEnrollments,
        totalRevenue,
        completionRate: Math.round(completionRate * 10) / 10,
      },
      recentStudents,
      courseStats,
      recentEnrollments,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}

