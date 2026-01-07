import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🌱 Seeding AI Income Accelerator Course...')

    // Delete existing course data if it exists
    await prisma.lesson.deleteMany({
      where: {
        module: {
          course: {
            slug: 'ai-income-accelerator'
          }
        }
      }
    })
    
    await prisma.module.deleteMany({
      where: {
        course: {
          slug: 'ai-income-accelerator'
        }
      }
    })

    // Create or update the course
    const course = await prisma.course.upsert({
      where: { slug: 'ai-income-accelerator' },
      update: {
        title: 'The AI Income Accelerator™',
        description: 'The complete system to land paying AI clients and build a real income stream. 7 modules. Done-for-you templates. The "First Client" Guarantee™.',
        price: 9700, // $97.00 in cents
        isFree: false,
        isPublished: true,
        thumbnail: '/course-thumbnails/ai-income-accelerator.jpg',
      },
      create: {
        slug: 'ai-income-accelerator',
        title: 'The AI Income Accelerator™',
        description: 'The complete system to land paying AI clients and build a real income stream. 7 modules. Done-for-you templates. The "First Client" Guarantee™.',
        price: 9700, // $97.00 in cents
        isFree: false,
        isPublished: true,
        thumbnail: '/course-thumbnails/ai-income-accelerator.jpg',
      },
    })

    console.log(`✅ Course created: ${course.title}`)

    // Module 1: The AI Income Accelerator System
    const module1 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'The AI Income Accelerator System',
        description: 'The complete system to build your first $5K/month with AI services',
        order: 1,
        lessons: {
          create: [
            {
              title: 'Video 1 - The AI Income Opportunity',
              description: 'Discover the massive opportunity in AI services. Why businesses are desperate to pay for AI help and how you can position yourself to capture this demand.',
              videoUrl: 'https://player.vimeo.com/video/1152074282',
              duration: 600, // 10 minutes
              order: 1,
            },
            {
              title: 'Video 2 - The 5 High-Demand AI Services',
              description: 'The exact AI services that clients are paying $500-$2,000 for right now. Content creation, research reports, automation, and more.',
              videoUrl: 'https://player.vimeo.com/video/1152075444',
              duration: 720, // 12 minutes
              order: 2,
            },
            {
              title: 'Video 3 - The Client Acquisition System™',
              description: 'The proven system to find and land your first paying clients. Includes outreach scripts, proposal templates, and closing techniques.',
              videoUrl: 'https://player.vimeo.com/video/1152076047',
              duration: 900, // 15 minutes
              order: 3,
            },
            {
              title: 'Video 4 - Pricing for Profit',
              description: 'How to price your services for maximum profit. The psychology of pricing, value-based pricing, and when to raise your rates.',
              videoUrl: 'https://player.vimeo.com/video/1152076436',
              duration: 600, // 10 minutes
              order: 4,
            },
            {
              title: 'Video 5 - Delivering World-Class Results',
              description: 'How to deliver exceptional results that get you referrals and repeat business. Quality control, client communication, and exceeding expectations.',
              videoUrl: 'https://player.vimeo.com/video/1152076726',
              duration: 720, // 12 minutes
              order: 5,
            },
            {
              title: 'Video 6 - Scaling to $5K/Month',
              description: 'The roadmap from your first client to consistent $5K months. Systems, processes, and strategies for sustainable growth.',
              videoUrl: 'https://player.vimeo.com/video/1152077099',
              duration: 600, // 10 minutes
              order: 6,
            },
            {
              title: 'Video 7 - Building Recurring Revenue',
              description: 'How to convert one-time projects into monthly retainers. The secret to predictable income and long-term client relationships.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_7',
              duration: 600, // 10 minutes
              order: 7,
            },
          ],
        },
      },
    })

    // Get lesson count
    const lessonCount = await prisma.lesson.count({
      where: {
        module: {
          courseId: course.id
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'AI Income Accelerator course seeded successfully!',
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        price: course.price / 100,
        modules: 1,
        lessons: lessonCount,
        totalDuration: '~69 minutes'
      }
    })

  } catch (error) {
    console.error('❌ Error seeding AI Income Accelerator course:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed course',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
