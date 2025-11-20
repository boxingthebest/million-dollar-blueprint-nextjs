import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Find all Dana accounts
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: 'dana', mode: 'insensitive' } },
          { email: { contains: 'penza', mode: 'insensitive' } },
          { name: { contains: 'Dana', mode: 'insensitive' } }
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

    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
