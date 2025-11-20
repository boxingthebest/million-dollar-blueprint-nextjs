import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Find Dana Penza user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { contains: 'dana' } },
          { name: { contains: 'Dana' } }
        ]
      },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      },
      enrollments: user.enrollments.map(e => ({
        courseTitle: e.course.title,
        courseSlug: e.course.slug,
        createdAt: e.createdAt
      }))
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
