import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    // Delete the course (cascade will handle modules, lessons, enrollments)
    const deletedCourse = await prisma.course.delete({
      where: { id: courseId },
    })

    return NextResponse.json({
      success: true,
      message: `Course "${deletedCourse.title}" deleted successfully`,
      deletedCourse: {
        id: deletedCourse.id,
        title: deletedCourse.title,
        slug: deletedCourse.slug,
      },
    })
  } catch (error) {
    console.error('Delete course error:', error)
    return NextResponse.json({ 
      error: String(error),
      message: 'Failed to delete course'
    }, { status: 500 })
  }
}
