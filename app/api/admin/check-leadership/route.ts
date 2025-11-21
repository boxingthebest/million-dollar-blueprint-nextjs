import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: 'leadership' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Leadership & Influence course not found'
      }, { status: 404 })
    }

    const summary = {
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        price: course.price,
        isPublished: course.isPublished
      },
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        order: module.order,
        lessonCount: module.lessons.length,
        lessons: module.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          order: lesson.order
        }))
      }))
    }

    return NextResponse.json({
      success: true,
      ...summary
    })
  } catch (error) {
    console.error('❌ Error checking Leadership course:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
