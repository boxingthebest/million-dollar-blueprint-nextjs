import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""

    const skip = (page - 1) * limit

    // Build where clause
    const where = {
      role: "user",
      ...(search && {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { name: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    }

    // Get total count
    const totalStudents = await prisma.user.count({ where })

    // Get students with enrollments and progress
    const students = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
        progress: {
          where: {
            completed: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            progress: true,
          },
        },
      },
    })

    // Calculate progress for each student
    const studentsWithProgress = await Promise.all(
      students.map(async (student) => {
        const enrolledCourseIds = student.enrollments.map((e) => e.course.id)

        // Get total lessons in enrolled courses
        const totalLessons = await prisma.lesson.count({
          where: {
            module: {
              courseId: {
                in: enrolledCourseIds,
              },
            },
          },
        })

        const completedLessons = student.progress.length

        const progressPercentage =
          totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

        return {
          id: student.id,
          name: student.name,
          email: student.email,
          createdAt: student.createdAt,
          enrollments: student.enrollments,
          totalEnrollments: student._count.enrollments,
          totalLessons,
          completedLessons,
          progressPercentage: Math.round(progressPercentage * 10) / 10,
        }
      })
    )

    return NextResponse.json({
      students: studentsWithProgress,
      pagination: {
        page,
        limit,
        total: totalStudents,
        totalPages: Math.ceil(totalStudents / limit),
      },
    })
  } catch (error) {
    console.error("Students API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    )
  }
}

