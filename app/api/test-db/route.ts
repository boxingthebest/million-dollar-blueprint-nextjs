import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count()
    const courseCount = await prisma.course.count()
    
    // Check for specific user
    const testUser = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    })
    
    return NextResponse.json({
      success: true,
      database: 'connected',
      users: userCount,
      courses: courseCount,
      testUserExists: !!testUser,
      testUserHasPassword: !!testUser?.password,
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

