import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Get AI-Resistant Skills course
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: { contains: 'ai-resistant' } },
          { title: { contains: 'AI-Resistant' } }
        ]
      },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!course) {
      return NextResponse.json({
        error: 'AI-Resistant Skills course not found in database'
      }, { status: 404 })
    }

    let totalLessons = 0
    const moduleDetails = course.modules.map((module, idx) => {
      totalLessons += module.lessons.length
      return {
        moduleNumber: idx + 1,
        title: module.title,
        lessonCount: module.lessons.length,
        lessons: module.lessons.map((lesson, lessonIdx) => ({
          lessonNumber: lessonIdx + 1,
          title: lesson.title,
          hasVideo: !!lesson.videoUrl,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration
        }))
      }
    })

    return NextResponse.json({
      course: {
        title: course.title,
        slug: course.slug,
        published: course.isPublished,
        price: course.price / 100
      },
      modules: {
        count: course.modules.length,
        details: moduleDetails
      },
      lessons: {
        total: totalLessons,
        expected: 10,
        complete: totalLessons === 10
      }
    })
    
  } catch (error: any) {
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 })
  }
}

