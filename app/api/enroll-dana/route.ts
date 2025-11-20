import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Find Dana Penza
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { contains: 'dana' } },
          { name: { contains: 'Dana' } }
        ]
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Dana not found' }, { status: 404 })
    }

    // Find Executive Energy System course
    const course = await prisma.course.findFirst({
      where: {
        title: { contains: 'Executive Energy' }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Executive Energy course not found' }, { status: 404 })
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id
      }
    })

    if (existing) {
      return NextResponse.json({ 
        message: 'Already enrolled',
        user: user.email,
        course: course.title
      })
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Enrolled successfully!',
      user: user.email,
      course: course.title,
      enrollment: enrollment
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
