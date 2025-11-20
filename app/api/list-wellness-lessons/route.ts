import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: {
        slug: 'wellness',
      },
      include: {
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                videoUrl: true,
                order: true,
              },
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
      return NextResponse.json({ error: 'Wellness course not found' }, { status: 404 })
    }

    const lessons = course.modules.flatMap(module =>
      module.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        hasVideo: !!lesson.videoUrl,
        videoUrl: lesson.videoUrl || null,
      }))
    )

    return NextResponse.json({
      courseTitle: course.title,
      totalLessons: lessons.length,
      lessons,
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
