import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug') || 'ai-resistant-skills'

    console.log('Testing course query for slug:', slug)

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      slug,
      found: !!course,
      course: course ? {
        id: course.id,
        slug: course.slug,
        title: course.title,
        isPublished: course.isPublished,
        modulesCount: course.modules.length,
        lessonsCount: course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      } : null
    })
  } catch (error: any) {
    console.error("Error testing course query:", error)
    return NextResponse.json(
      { 
        error: "Failed to query course",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

