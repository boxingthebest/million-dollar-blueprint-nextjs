import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Search for courses with "energy" or "wellness" or "executive" in the title
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: 'Energy', mode: 'insensitive' } },
          { title: { contains: 'Wellness', mode: 'insensitive' } },
          { title: { contains: 'Executive', mode: 'insensitive' } },
        ],
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

    return NextResponse.json({
      foundCourses: courses.length,
      courses: courses.map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        moduleCount: course.modules.length,
        lessonCount: course.modules.reduce((sum, m) => sum + m.lessons.length, 0),
        lessons: course.modules.flatMap(module =>
          module.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            hasVideo: !!lesson.videoUrl,
          }))
        ),
      })),
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
