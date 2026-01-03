import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🌱 Seeding AI Side Hustle Course...')

    // Delete existing course data if it exists
    await prisma.lesson.deleteMany({
      where: {
        module: {
          course: {
            slug: 'ai-side-hustle'
          }
        }
      }
    })
    
    await prisma.module.deleteMany({
      where: {
        course: {
          slug: 'ai-side-hustle'
        }
      }
    })

    // Create or update the course
    const course = await prisma.course.upsert({
      where: { slug: 'ai-side-hustle' },
      update: {
        title: 'Start Your AI Side Hustle: Make $1K-$3K/Month',
        description: 'The exact system to land paying clients who need AI-powered content. No coding. No tech skills. Just a laptop and a proven system.',
        price: 4700, // $47.00 in cents
        isFree: false,
        isPublished: true,
        thumbnail: '/course-thumbnails/ai-side-hustle.jpg',
      },
      create: {
        slug: 'ai-side-hustle',
        title: 'Start Your AI Side Hustle: Make $1K-$3K/Month',
        description: 'The exact system to land paying clients who need AI-powered content. No coding. No tech skills. Just a laptop and a proven system.',
        price: 4700, // $47.00 in cents
        isFree: false,
        isPublished: true,
        thumbnail: '/course-thumbnails/ai-side-hustle.jpg',
      },
    })

    console.log(`✅ Course created: ${course.title}`)

    // Module 1: AI Side Hustle Mastery
    const module1 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'AI Side Hustle Mastery',
        description: 'The complete system to make $1K-$3K/month with AI services',
        order: 1,
        lessons: {
          create: [
            {
              title: 'The AI Side Hustle Opportunity',
              description: 'Discover the hidden market of millions of businesses that need AI help but don\'t know where to start. Learn why this is the perfect time to start your AI side hustle.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_1',
              duration: 420, // 7 minutes
              order: 1,
            },
            {
              title: '5 AI Services That Sell Right Now',
              description: 'The exact services clients are paying for today: social media content, blog posts, video scripts, email sequences, and presentations. Learn which one to start with.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_2',
              duration: 480, // 8 minutes
              order: 2,
            },
            {
              title: 'Setting Up Your Freelance Profile',
              description: 'Step-by-step guide to creating a profile that attracts paying clients on Fiverr and Upwork. Includes exact templates and sample creation strategies.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_3',
              duration: 480, // 8 minutes
              order: 3,
            },
            {
              title: 'Pricing Your Services for Profit',
              description: 'The 3-tier pricing framework that maximizes your income. Real numbers, psychology of pricing, and when to raise your rates.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_4',
              duration: 420, // 7 minutes
              order: 4,
            },
            {
              title: 'Landing Your First 3 Clients',
              description: 'Three proven strategies to get paying clients: the Fiverr flywheel, local business outreach (with exact scripts), and leveraging your network.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_5',
              duration: 540, // 9 minutes
              order: 5,
            },
            {
              title: 'Scaling to $3K/Month',
              description: 'The math of $3K/month, client retention strategies, systems that save time, and when to raise prices. Build a real business, not just gigs.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_6',
              duration: 480, // 8 minutes
              order: 6,
            },
            {
              title: 'BONUS: Building Long-Term Client Relationships',
              description: 'The secret to recurring revenue: how to keep clients for months and years. Communication strategies, adding unexpected value, and handling problems gracefully.',
              videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_BONUS',
              duration: 360, // 6 minutes
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
      message: 'AI Side Hustle course seeded successfully!',
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        price: course.price / 100,
        modules: 1,
        lessons: lessonCount,
        totalDuration: '~53 minutes'
      }
    })

  } catch (error) {
    console.error('❌ Error seeding AI Side Hustle course:', error)
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
