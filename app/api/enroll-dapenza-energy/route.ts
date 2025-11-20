import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function enrollDapenzaInEnergy() {
  try {
    const user = await prisma.user.findFirst({
      where: { email: 'dapenza@hotmail.com' }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const course = await prisma.course.findFirst({
      where: { title: { contains: 'Executive Energy' } }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const existing = await prisma.enrollment.findFirst({
      where: { userId: user.id, courseId: course.id }
    })

    if (existing) {
      return NextResponse.json({ 
        message: 'Already enrolled',
        user: user.email,
        course: course.title
      })
    }

    const enrollment = await prisma.enrollment.create({
      data: { userId: user.id, courseId: course.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Enrolled!',
      user: user.email,
      course: course.title,
      enrollment
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return enrollDapenzaInEnergy()
}

export async function POST() {
  return enrollDapenzaInEnergy()
}
