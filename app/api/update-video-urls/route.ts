import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== 'admin') {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      )
    }

    console.log('🔄 Updating Course 1 video URLs...')

    // Find the course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!course || !course.modules[0]) {
      return NextResponse.json(
        { error: "Course or module not found" },
        { status: 404 }
      )
    }

    const module = course.modules[0]
    const lessons = module.lessons

    // Authenticated Vimeo URLs with privacy hashes (bypass domain restrictions)
    const videoUrls = [
      'https://vimeo.com/1129374864/8462d84da1',
      'https://vimeo.com/1129414459/c3afffad25',
      'https://vimeo.com/1129414864/272f58a324',
      'https://vimeo.com/1129415335/47efd8a1aa',
      'https://vimeo.com/1129415686/b37c86e62c',
      'https://vimeo.com/1129415885/7bba6f24bd',
      'https://vimeo.com/1129416243/657cd05863',
      'https://vimeo.com/1129417480/946e450263',
      'https://vimeo.com/1129417841/f4d6644de9',
      'https://vimeo.com/1129418207/8f8000ae4f'
    ]

    // Update each lesson with correct video URL
    const updates = []
    for (let i = 0; i < lessons.length && i < videoUrls.length; i++) {
      const lesson = lessons[i]
      const newUrl = videoUrls[i]
      
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl: newUrl }
      })
      
      updates.push({
        lesson: lesson.title,
        oldUrl: lesson.videoUrl,
        newUrl: newUrl
      })
      
      console.log(`✅ Updated: ${lesson.title}`)
    }

    return NextResponse.json({
      success: true,
      message: "All video URLs updated successfully!",
      updates: updates,
      courseUrl: `https://milliondollarblueprint.ai/learn/${course.slug}`
    })
  } catch (error: any) {
    console.error("Error updating video URLs:", error)
    return NextResponse.json(
      { 
        error: "Failed to update video URLs",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

