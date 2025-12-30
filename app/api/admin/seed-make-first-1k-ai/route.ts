import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Check if course already exists
    const existingCourse = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' }
    });

    if (existingCourse) {
      return NextResponse.json({ 
        message: 'Make Your First $1K with AI course already exists',
        courseId: existingCourse.id
      });
    }

    // Placeholder video URLs (to be updated when videos are uploaded to Vimeo)
    const videoUrls = {
      module1: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE1', // Welcome + The Simple Plan
      module2: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE2', // Your First $200 Service
      module3: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE3', // Finding Your First Client
      module4: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE4', // The Complete ChatGPT Workflow
      module5: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE5', // From $200 to $2,000
      module6: 'https://player.vimeo.com/video/PLACEHOLDER_MODULE6', // Your 7-Day Action Plan
      bonus: 'https://player.vimeo.com/video/PLACEHOLDER_BONUS'      // The Bio Upgrade Method
    };

    // Create course with modules and lessons
    const course = await prisma.course.create({
      data: {
        title: 'Make Your First $1K with AI',
        slug: 'make-first-1k-ai',
        description: 'A step-by-step system to make your first $1,000 using AI tools like ChatGPT. Perfect for side hustlers looking to earn extra income.',
        price: 4700, // $47.00 in cents
        isPublished: true,
        isFree: false,
        modules: {
          create: [
            {
              title: 'Core Training',
              description: 'The complete system to make your first $1K with AI',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'Welcome + The Simple Plan',
                    description: 'Introduction to the course and the proven 3-step system that took me from $0 to $1K in just 2 weeks using AI.',
                    order: 1,
                    duration: 4, // ~2-4 min
                    videoUrl: videoUrls.module1
                  },
                  {
                    title: 'Your First $200 Service',
                    description: 'Learn the exact $200 LinkedIn bio optimization service that businesses pay for every day - and how to deliver it in under an hour.',
                    order: 2,
                    duration: 6, // ~3-6 min
                    videoUrl: videoUrls.module2
                  },
                  {
                    title: 'Finding Your First Client',
                    description: 'The simple outreach system to find clients who are actively looking for help - no cold calling, no awkward pitches.',
                    order: 3,
                    duration: 6, // ~3-6 min
                    videoUrl: videoUrls.module3
                  },
                  {
                    title: 'The Complete ChatGPT Workflow',
                    description: 'Copy-paste the exact prompts I use to deliver professional results in under 60 minutes - even if you\'ve never used ChatGPT before.',
                    order: 4,
                    duration: 7, // ~3-7 min
                    videoUrl: videoUrls.module4
                  },
                  {
                    title: 'From $200 to $2,000',
                    description: 'How to scale from one-off projects to recurring clients and premium packages worth $500-$2,000 each.',
                    order: 5,
                    duration: 5, // ~2-5 min
                    videoUrl: videoUrls.module5
                  },
                  {
                    title: 'Your 7-Day Action Plan',
                    description: 'The exact daily tasks to complete over the next week to land your first paying client.',
                    order: 6,
                    duration: 4, // ~2-4 min
                    videoUrl: videoUrls.module6
                  }
                ]
              }
            },
            {
              title: 'Bonus Content',
              description: 'Extra strategies to accelerate your results',
              order: 2,
              lessons: {
                create: [
                  {
                    title: 'The Bio Upgrade Method',
                    description: 'BONUS: How to approach professionals who already have bios and offer upgrades - turning "I already have one" into "Yes, let\'s improve it!"',
                    order: 1,
                    duration: 3, // ~3 min
                    videoUrl: videoUrls.bonus
                  }
                ]
              }
            }
          ]
        }
      },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    return NextResponse.json({ 
      message: 'Make Your First $1K with AI course created successfully!',
      courseId: course.id,
      course: course
    });
  } catch (error) {
    console.error('Error creating Make Your First $1K with AI course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// GET endpoint to check course status
export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' },
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
    });

    if (!course) {
      return NextResponse.json({ 
        exists: false,
        message: 'Course not found. Use POST to create it.'
      });
    }

    return NextResponse.json({ 
      exists: true,
      course: course
    });
  } catch (error) {
    console.error('Error checking course:', error);
    return NextResponse.json({ error: 'Failed to check course' }, { status: 500 });
  }
}
