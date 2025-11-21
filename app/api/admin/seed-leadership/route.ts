import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('🎯 Creating Leadership & Influence course...')

    // Check if course already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: 'leadership' }
    })

    if (existingCourse) {
      return NextResponse.json({
        success: false,
        message: 'Leadership & Influence course already exists',
        courseId: existingCourse.id
      })
    }

    // Create the course with 2 modules
    const course = await prisma.course.create({
      data: {
        slug: 'leadership',
        title: 'Leadership & Influence: The Executive Playbook',
        description: 'Master the influence strategies used by leaders at McKinsey, the White House, and Navy SEALs to command any room and accelerate your career.',
        price: 247,
        isFree: false,
        isPublished: true,
        modules: {
          create: [
            // Module 1: Video Lessons
            {
              title: 'Leadership & Influence Mastery',
              description: '10 essential lessons on executive presence and strategic influence',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'The Leadership Mindset Shift',
                    description: 'Master the four levels of leadership and learn how top 1% leaders think differently',
                    videoUrl: 'PLACEHOLDER_VIDEO_1', // Will be replaced with Vimeo URL
                    duration: 300, // 5 minutes in seconds
                    order: 1,
                  },
                  {
                    title: 'Emotional Intelligence for Leaders',
                    description: 'Develop the EQ skills that separate good managers from great leaders',
                    videoUrl: 'PLACEHOLDER_VIDEO_2',
                    duration: 300,
                    order: 2,
                  },
                  {
                    title: 'Building High-Performing Teams',
                    description: 'Learn the frameworks used by Google and Amazon to build world-class teams',
                    videoUrl: 'PLACEHOLDER_VIDEO_3',
                    duration: 300,
                    order: 3,
                  },
                  {
                    title: 'Strategic Communication & Influence',
                    description: 'Master the art of persuasion and executive-level communication',
                    videoUrl: 'PLACEHOLDER_VIDEO_4',
                    duration: 300,
                    order: 4,
                  },
                  {
                    title: 'Decision-Making Under Pressure',
                    description: 'Make high-stakes decisions with confidence using proven frameworks',
                    videoUrl: 'PLACEHOLDER_VIDEO_5',
                    duration: 300,
                    order: 5,
                  },
                  {
                    title: 'Conflict Resolution & Difficult Conversations',
                    description: 'Navigate tough conversations and turn conflict into opportunity',
                    videoUrl: 'PLACEHOLDER_VIDEO_6',
                    duration: 300,
                    order: 6,
                  },
                  {
                    title: 'Delegation & Empowerment',
                    description: 'Scale your impact by empowering others to lead',
                    videoUrl: 'PLACEHOLDER_VIDEO_7',
                    duration: 300,
                    order: 7,
                  },
                  {
                    title: 'Building Trust & Credibility',
                    description: 'Establish yourself as a trusted leader people want to follow',
                    videoUrl: 'PLACEHOLDER_VIDEO_8',
                    duration: 300,
                    order: 8,
                  },
                  {
                    title: 'Change Management & Transformation',
                    description: 'Lead organizational change like Fortune 100 executives',
                    videoUrl: 'PLACEHOLDER_VIDEO_9',
                    duration: 300,
                    order: 9,
                  },
                  {
                    title: 'Your Leadership Legacy',
                    description: 'Create a lasting impact and develop future leaders',
                    videoUrl: 'PLACEHOLDER_VIDEO_10',
                    duration: 300,
                    order: 10,
                  },
                ],
              },
            },
            // Module 2: PDF Resources
            {
              title: 'Leadership Toolkit',
              description: 'Downloadable resources and bonus content to implement everything you\'ve learned',
              order: 2,
              lessons: {
                create: [
                  {
                    title: 'The Executive Playbook',
                    description: 'Complete 50+ page workbook with frameworks, exercises, and implementation guides',
                    videoUrl: '/downloads/Leadership-Influence-Executive-Playbook.pdf',
                    duration: 0,
                    order: 1,
                  },
                  {
                    title: 'Leadership Framework Templates',
                    description: 'Executive Presence Scorecard, Influence Toolkit, and Strategic Communication templates',
                    videoUrl: '/downloads/Leadership-Influence-Framework-Templates.pdf',
                    duration: 0,
                    order: 2,
                  },
                  {
                    title: 'Progress Tracker',
                    description: 'Track your leadership development and career advancement over 90 days',
                    videoUrl: '/downloads/Leadership-Influence-Progress-Tracker.pdf',
                    duration: 0,
                    order: 3,
                  },
                  {
                    title: 'Quick Reference Guide',
                    description: 'Ready-to-use templates for influence, persuasion, and decision-making',
                    videoUrl: '/downloads/Leadership-Influence-Quick-Reference.pdf',
                    duration: 0,
                    order: 4,
                  },
                  {
                    title: 'Resource List',
                    description: 'Curated resources for continued learning and professional development',
                    videoUrl: '/downloads/Leadership-Influence-Resource-List.pdf',
                    duration: 0,
                    order: 5,
                  },
                ],
              },
            },
          ],
        },
      },
    })

    console.log(`✅ Leadership & Influence course created successfully`)

    return NextResponse.json({
      success: true,
      message: 'Leadership & Influence course created with 10 lessons and 5 PDFs',
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        price: course.price,
      },
      modules: {
        module1: '10 video lessons (placeholder URLs - update with Vimeo links)',
        module2: '5 PDF resources'
      },
      nextSteps: [
        'Generate 10 videos in Synthesia',
        'Upload videos to Vimeo',
        'Update video URLs using the update-leadership-videos endpoint'
      ]
    })
  } catch (error) {
    console.error('❌ Error creating Leadership course:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
