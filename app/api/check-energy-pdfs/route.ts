import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: { slug: 'executive-energy-system' },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const lessons = course.modules.flatMap(m => m.lessons)
    const pdfLessons = lessons.filter(l => l.type === 'pdf')

    return NextResponse.json({ 
      course: course.title,
      totalLessons: lessons.length,
      pdfLessons: pdfLessons.map(l => ({
        title: l.title,
        pdfUrl: l.pdfUrl,
        order: l.order
      }))
    }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
