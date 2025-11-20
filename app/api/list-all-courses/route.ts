import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        isPublished: true,
        isFree: true,
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
      },
    })

    return NextResponse.json({
      totalCourses: courses.length,
      courses: courses.map(course => ({
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: course.isFree ? 'Free' : `$${(course.price / 100).toFixed(2)}`,
        status: course.isPublished ? 'Published' : 'Draft',
        modules: course._count.modules,
        students: course._count.enrollments,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
