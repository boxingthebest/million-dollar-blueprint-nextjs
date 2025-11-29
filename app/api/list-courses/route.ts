import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        _count: {
          select: {
            modules: true,
          },
        },
      },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Error listing courses:', error)
    return NextResponse.json(
      { error: 'Failed to list courses', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
