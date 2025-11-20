import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Find the wellness/energy course
    const course = await prisma.course.findFirst({
      where: {
        slug: 'wellness',
      },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const lessonTitles = course.modules.flatMap(module =>
      module.lessons.map(lesson => ({
        moduleTitle: module.title,
        lessonTitle: lesson.title,
        lessonId: lesson.id,
        hasVideo: !!lesson.videoUrl,
      }))
    )

    return NextResponse.json({
      courseTitle: course.title,
      lessonCount: lessonTitles.length,
      lessons: lessonTitles,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
