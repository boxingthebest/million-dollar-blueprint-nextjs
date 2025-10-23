import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
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

    const body = await request.json()
    const { enrollInCourses = [], accountType = "basic" } = body

    // Generate random test account
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000)
    const testEmail = `demo${timestamp}${randomNum}@milliondollarblueprint.ai`
    const testPassword = `Demo${timestamp}!`
    const testName = `Demo User ${randomNum}`

    // Hash password
    const hashedPassword = await bcrypt.hash(testPassword, 10)

    // Create test user
    const testUser = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        name: testName,
        role: "user",
      },
    })

    // Enroll in specified courses
    let enrollments: Array<{
      id: string
      userId: string
      courseId: string
      createdAt: Date
      course: {
        id: string
        title: string
        slug: string
      }
    }> = []
    if (enrollInCourses.length > 0) {
      const enrollmentData = enrollInCourses.map((courseId: string) => ({
        userId: testUser.id,
        courseId,
      }))

      await prisma.enrollment.createMany({
        data: enrollmentData,
        skipDuplicates: true,
      })

      // Fetch created enrollments with course details
      enrollments = await prisma.enrollment.findMany({
        where: {
          userId: testUser.id,
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      })
    }

    // If "with-progress" type, mark some lessons as complete
    if (accountType === "with-progress" && enrollments.length > 0) {
      for (const enrollment of enrollments) {
        // Get first 3 lessons from the course
        const lessons = await prisma.lesson.findMany({
          where: {
            module: {
              courseId: enrollment.course.id,
            },
          },
          orderBy: [{ module: { order: "asc" } }, { order: "asc" }],
          take: 3,
        })

        // Mark them as completed
        if (lessons.length > 0) {
          await prisma.lessonProgress.createMany({
            data: lessons.map((lesson) => ({
              userId: testUser.id,
              lessonId: lesson.id,
              completed: true,
              watchedAt: new Date(),
            })),
            skipDuplicates: true,
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      account: {
        id: testUser.id,
        email: testEmail,
        password: testPassword,
        name: testName,
        enrollments: enrollments.map((e) => ({
          courseId: e.course.id,
          courseTitle: e.course.title,
          courseSlug: e.course.slug,
        })),
      },
      loginUrl: `${process.env.NEXTAUTH_URL || "https://www.milliondollarblueprint.ai"}/auth/signin`,
    })
  } catch (error) {
    console.error("Create test account error:", error)
    return NextResponse.json(
      { error: "Failed to create test account" },
      { status: 500 }
    )
  }
}

