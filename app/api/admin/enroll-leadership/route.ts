import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const email = 'dapenza@hotmail.com'

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 })
    }

    // Find Leadership & Influence course
    const course = await prisma.course.findUnique({
      where: { slug: 'leadership' }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Leadership & Influence course not found'
      }, { status: 404 })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        message: 'Already enrolled in Leadership & Influence',
        enrollment: {
          id: existingEnrollment.id,
          user: email,
          course: course.title,
          createdAt: existingEnrollment.createdAt
        }
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
      message: 'Successfully enrolled in Leadership & Influence',
      enrollment: {
        id: enrollment.id,
        user: email,
        course: course.title,
        createdAt: enrollment.createdAt
      }
    })
  } catch (error) {
    console.error('❌ Error enrolling in Leadership:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
