import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== 'admin') {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      )
    }

    // Get all courses
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                videoUrl: true,
                order: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      coursesCount: courses.length,
      courses: courses.map(course => ({
        id: course.id,
        slug: course.slug,
        title: course.title,
        isPublished: course.isPublished,
        modulesCount: course.modules.length,
        modules: course.modules.map(module => ({
          id: module.id,
          title: module.title,
          lessonsCount: module.lessons.length,
          lessons: module.lessons
        })),
        courseUrl: `https://milliondollarblueprint.ai/learn/${course.slug}`,
        firstLessonUrl: course.modules[0]?.lessons[0] 
          ? `https://milliondollarblueprint.ai/learn/${course.slug}/${course.modules[0].lessons[0].id}`
          : null
      }))
    })
  } catch (error: any) {
    console.error("Error checking database:", error)
    return NextResponse.json(
      { 
        error: "Failed to check database",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

