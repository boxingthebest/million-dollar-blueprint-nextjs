import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    // Find the AI-Resistant Skills course
    const course = await prisma.course.findFirst({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          where: { title: 'Your Million Dollar Toolkit' },
          include: { lessons: true }
        }
      }
    })

    if (!course || course.modules.length === 0) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    const module = course.modules[0]

    // Check if bonus video already exists
    const existingBonus = module.lessons.find(l => 
      l.title.includes('Executive Interview Mastery Video')
    )

    if (existingBonus) {
      return NextResponse.json({ 
        success: true,
        message: 'Bonus video already exists',
        lessonId: existingBonus.id
      })
    }

    // Add the Synthesia bonus video as the 6th item in Module 7
    const bonusLesson = await prisma.lesson.create({
      data: {
        title: '🎁 BONUS VIDEO: Executive Interview Mastery',
        description: 'Watch this exclusive Synthesia-powered training on mastering executive interviews. Learn the frameworks and strategies that helped professionals land $200K+ roles.',
        videoUrl: 'https://share.synthesia.io/embeds/videos/4cc7308f-c42f-44a5-b85f-7b238b98c60a',
        duration: 5, // Approximate duration in minutes
        order: 6, // After the 5 PDF resources
        moduleId: module.id,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Bonus video added successfully!',
      lesson: {
        id: bonusLesson.id,
        title: bonusLesson.title,
        videoUrl: bonusLesson.videoUrl,
      },
      courseUrl: `https://milliondollarblueprint.ai/learn/${course.slug}`
    })

  } catch (error) {
    console.error('Error adding bonus video:', error)
    return NextResponse.json(
      { error: 'Failed to add bonus video' },
      { status: 500 }
    )
  }
}

