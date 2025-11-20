import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function enrollDanaInAI() {
  try {
    // Find Dana Penza
    const user = await prisma.user.findFirst({
      where: {
        email: 'penzadp@amazon.com'
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Dana not found' }, { status: 404 })
    }

    // Find AI-Resistant Skills course
    const course = await prisma.course.findFirst({
      where: {
        title: { contains: 'AI-Resistant Skills' }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'AI-Resistant Skills course not found' }, { status: 404 })
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

export async function GET() {
  return enrollDanaInAI()
}

export async function POST() {
  return enrollDanaInAI()
}
