import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, secret } = await request.json()
    
    // Simple secret check (you can change this)
    if (secret !== 'create-admin-2024') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: 'Admin User',
        password: hashedPassword,
        emailVerified: new Date(),
      },
    })

    // Find AI-Resistant Skills course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' }
    })

    // Enroll user in course
    if (course) {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'User created and enrolled',
      email: user.email,
      enrolledIn: course?.title
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

