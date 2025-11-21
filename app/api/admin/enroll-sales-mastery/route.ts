import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const userEmail = 'dapenza@hotmail.com'
    const courseSlug = 'sales'

    console.log(`🔍 Finding user: ${userEmail}`)
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: `User not found: ${userEmail}` },
        { status: 404 }
      )
    }

    console.log(`✅ Found user: ${user.name || user.email} (ID: ${user.id})`)

    // Find the Sales Mastery course
    console.log(`🔍 Finding course: ${courseSlug}`)
    
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: `Course not found: ${courseSlug}` },
        { status: 404 }
      )
    }

    console.log(`✅ Found course: ${course.title} (ID: ${course.id})`)

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
        message: `User is already enrolled in ${course.title}`,
        enrollment: existingEnrollment
      })
    }

    // Create enrollment
    console.log(`📝 Enrolling user in ${course.title}...`)
    
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    })

    console.log(`✅ Successfully enrolled!`)

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in Sales Mastery',
      enrollment: {
        id: enrollment.id,
        user: user.email,
        course: course.title,
        createdAt: enrollment.createdAt
      }
    })
  } catch (error) {
    console.error('❌ Error enrolling user:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
