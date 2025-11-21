import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('🔧 Fixing Leadership Module 1 to have 10 lessons...')

    // Find the Leadership course
    const course = await prisma.course.findUnique({
      where: { slug: 'leadership' },
      include: {
        modules: {
          where: { order: 1 },
          include: { lessons: true }
        }
      }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Leadership course not found'
      }, { status: 404 })
    }

    const module1 = course.modules[0]
    if (!module1) {
      return NextResponse.json({
        success: false,
        message: 'Module 1 not found'
      }, { status: 404 })
    }

    // Delete existing lessons in Module 1
    await prisma.lesson.deleteMany({
      where: { moduleId: module1.id }
    })

    // Create 10 new lessons
    const lessons = await prisma.lesson.createMany({
      data: [
        {
          moduleId: module1.id,
          title: 'The Leadership Mindset Shift',
          description: 'Master the four levels of leadership and learn how top 1% leaders think differently',
          videoUrl: 'PLACEHOLDER_VIDEO_1',
          duration: 300,
          order: 1,
        },
        {
          moduleId: module1.id,
          title: 'Emotional Intelligence for Leaders',
          description: 'Develop the EQ skills that separate good managers from great leaders',
          videoUrl: 'PLACEHOLDER_VIDEO_2',
          duration: 300,
          order: 2,
        },
        {
          moduleId: module1.id,
          title: 'Building High-Performing Teams',
          description: 'Learn the frameworks used by Google and Amazon to build world-class teams',
          videoUrl: 'PLACEHOLDER_VIDEO_3',
          duration: 300,
          order: 3,
        },
        {
          moduleId: module1.id,
          title: 'Strategic Communication & Influence',
          description: 'Master the art of persuasion and executive-level communication',
          videoUrl: 'PLACEHOLDER_VIDEO_4',
          duration: 300,
          order: 4,
        },
        {
          moduleId: module1.id,
          title: 'Decision-Making Under Pressure',
          description: 'Make high-stakes decisions with confidence using proven frameworks',
          videoUrl: 'PLACEHOLDER_VIDEO_5',
          duration: 300,
          order: 5,
        },
        {
          moduleId: module1.id,
          title: 'Conflict Resolution & Difficult Conversations',
          description: 'Navigate tough conversations and turn conflict into opportunity',
          videoUrl: 'PLACEHOLDER_VIDEO_6',
          duration: 300,
          order: 6,
        },
        {
          moduleId: module1.id,
          title: 'Delegation & Empowerment',
          description: 'Scale your impact by empowering others to lead',
          videoUrl: 'PLACEHOLDER_VIDEO_7',
          duration: 300,
          order: 7,
        },
        {
          moduleId: module1.id,
          title: 'Building Trust & Credibility',
          description: 'Establish yourself as a trusted leader people want to follow',
          videoUrl: 'PLACEHOLDER_VIDEO_8',
          duration: 300,
          order: 8,
        },
        {
          moduleId: module1.id,
          title: 'Change Management & Transformation',
          description: 'Lead organizational change like Fortune 100 executives',
          videoUrl: 'PLACEHOLDER_VIDEO_9',
          duration: 300,
          order: 9,
        },
        {
          moduleId: module1.id,
          title: 'Your Leadership Legacy',
          description: 'Create a lasting impact and develop future leaders',
          videoUrl: 'PLACEHOLDER_VIDEO_10',
          duration: 300,
          order: 10,
        },
      ]
    })

    console.log(`✅ Module 1 updated with 10 lessons`)

    return NextResponse.json({
      success: true,
      message: 'Module 1 updated successfully with 10 lessons',
      lessonCount: 10,
      lessons: [
        'The Leadership Mindset Shift',
        'Emotional Intelligence for Leaders',
        'Building High-Performing Teams',
        'Strategic Communication & Influence',
        'Decision-Making Under Pressure',
        'Conflict Resolution & Difficult Conversations',
        'Delegation & Empowerment',
        'Building Trust & Credibility',
        'Change Management & Transformation',
        'Your Leadership Legacy'
      ]
    })
  } catch (error) {
    console.error('❌ Error fixing Leadership lessons:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
