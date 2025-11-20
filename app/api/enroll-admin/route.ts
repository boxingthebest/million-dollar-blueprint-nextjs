import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Find admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@milliondollarblueprint.ai' },
    })

    if (!admin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 })
    }

    // Find AI-Resistant Skills course
    const aiCourse = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: 'ai-resistant-skills' },
          { title: { contains: 'AI-Resistant', mode: 'insensitive' } },
        ],
      },
    })

    // Find Executive Energy System course
    const energyCourse = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: 'executive-energy-system' },
          { title: { contains: 'Executive Energy', mode: 'insensitive' } },
        ],
      },
    })

    const enrollments = []

    // Enroll in AI-Resistant Skills
    if (aiCourse) {
      const existing = await prisma.purchase.findFirst({
        where: {
          userId: admin.id,
          courseId: aiCourse.id,
        },
      })

      if (!existing) {
        const enrollment = await prisma.purchase.create({
          data: {
            userId: admin.id,
            courseId: aiCourse.id,
          },
        })
        enrollments.push({ course: aiCourse.title, status: 'enrolled', id: enrollment.id })
      } else {
        enrollments.push({ course: aiCourse.title, status: 'already enrolled' })
      }
    }

    // Enroll in Executive Energy System
    if (energyCourse) {
      const existing = await prisma.purchase.findFirst({
        where: {
          userId: admin.id,
          courseId: energyCourse.id,
        },
      })

      if (!existing) {
        const enrollment = await prisma.purchase.create({
          data: {
            userId: admin.id,
            courseId: energyCourse.id,
          },
        })
        enrollments.push({ course: energyCourse.title, status: 'enrolled', id: enrollment.id })
      } else {
        enrollments.push({ course: energyCourse.title, status: 'already enrolled' })
      }
    }

    return NextResponse.json({
      success: true,
      adminEmail: admin.email,
      enrollments,
      message: 'Admin enrolled successfully. Visit /dashboard to see your courses.',
    })
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
