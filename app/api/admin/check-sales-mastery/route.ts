import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: 'sales' },
      include: {
        modules: {
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
        message: 'Sales Mastery course not found'
      })
    }

    return NextResponse.json({
      success: true,
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: course.price / 100,
        isPublished: course.isPublished,
        moduleCount: course.modules.length,
        modules: course.modules.map(module => ({
          id: module.id,
          title: module.title,
          lessonCount: module.lessons.length,
          lessons: module.lessons.map(lesson => ({
            id: lesson.id,
            order: lesson.order,
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            duration: lesson.duration
          }))
        }))
      }
    })
  } catch (error) {
    console.error('Error checking Sales Mastery:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
