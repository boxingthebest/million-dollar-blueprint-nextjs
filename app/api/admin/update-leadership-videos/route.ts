import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { videos } = body

    if (!videos || !Array.isArray(videos) || videos.length !== 10) {
      return NextResponse.json({
        success: false,
        message: 'Please provide exactly 10 Vimeo video URLs in the videos array'
      }, { status: 400 })
    }

    console.log('🎬 Updating Leadership & Influence videos...')

    // Find the course
    const course = await prisma.course.findUnique({
      where: { slug: 'leadership' },
      include: {
        modules: {
          where: { order: 1 }, // Module 1 contains the video lessons
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Leadership & Influence course not found'
      }, { status: 404 })
    }

    const module1 = course.modules[0]
    if (!module1 || module1.lessons.length !== 10) {
      return NextResponse.json({
        success: false,
        message: 'Module 1 should have exactly 10 lessons'
      }, { status: 400 })
    }

    // Update each lesson with its corresponding Vimeo URL
    const updates = []
    for (let i = 0; i < 10; i++) {
      const lesson = module1.lessons[i]
      const vimeoUrl = videos[i]

      const updated = await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl: vimeoUrl }
      })

      updates.push({
        lesson: i + 1,
        title: lesson.title,
        oldUrl: lesson.videoUrl,
        newUrl: vimeoUrl,
        updated: true
      })
    }

    console.log(`✅ Updated all 10 Leadership & Influence videos`)

    return NextResponse.json({
      success: true,
      message: 'All 10 Leadership & Influence videos updated successfully',
      updates
    })
  } catch (error) {
    console.error('❌ Error updating Leadership videos:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
