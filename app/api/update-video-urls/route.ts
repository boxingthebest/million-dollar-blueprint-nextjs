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

    // Vimeo player URLs with privacy hash parameter (for ReactPlayer embedding)
    const videoUrls = [
      'https://player.vimeo.com/video/1129374864?h=8462d84da1',
      'https://player.vimeo.com/video/1129414459?h=c3afffad25',
      'https://player.vimeo.com/video/1129414864?h=272f58a324',
      'https://player.vimeo.com/video/1129415335?h=47efd8a1aa',
      'https://player.vimeo.com/video/1129415686?h=b37c86e62c',
      'https://player.vimeo.com/video/1129415885?h=7bba6f24bd',
      'https://player.vimeo.com/video/1129416243?h=657cd05863',
      'https://player.vimeo.com/video/1129417480?h=946e450263',
      'https://player.vimeo.com/video/1129417841?h=f4d6644de9',
      'https://player.vimeo.com/video/1129418207?h=8f8000ae4f'
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

