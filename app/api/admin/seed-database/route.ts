import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting database seed...');

    // Course 1: AI-Resistant Skills
    const aiCourse = await prisma.course.upsert({
      where: { slug: 'ai-resistant-skills' },
      update: {},
      create: {
        slug: 'ai-resistant-skills',
        title: '5 Skills AI Can\'t Replace',
        description: 'Master the executive skills that AI will never replace. Learn systems thinking, relationship building, and strategic influence.',
        price: 39700,
        isFree: false,
        isPublished: true,
        modules: {
          create: [
            {
              title: 'AI-Resistant Skills Module',
              description: 'Core executive skills for the AI age',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'The Executive Intelligence Framework',
                    description: 'Master the foundational framework for executive-level thinking',
                    videoUrl: 'https://vimeo.com/1129374864',
                    duration: 15,
                    order: 1,
                  },
                  {
                    title: 'Systems Thinking Mastery',
                    description: 'Learn to see the big picture and connect the dots',
                    videoUrl: 'https://vimeo.com/1129414459',
                    duration: 15,
                    order: 2,
                  },
                  {
                    title: 'The Goldman Sachs Relationship Framework',
                    description: 'Build strategic relationships that accelerate your career',
                    videoUrl: 'https://vimeo.com/1129414824',
                    duration: 15,
                    order: 3,
                  },
                  {
                    title: 'Influence Without Authority',
                    description: 'Lead and influence without formal power',
                    videoUrl: 'https://vimeo.com/1129415144',
                    duration: 15,
                    order: 4,
                  },
                  {
                    title: 'The Apple Innovation Process',
                    description: 'Think like Apple: innovation frameworks that work',
                    videoUrl: 'https://vimeo.com/1129415414',
                    duration: 15,
                    order: 5,
                  },
                  {
                    title: 'First Principles Thinking',
                    description: 'Break down complex problems like Elon Musk',
                    videoUrl: 'https://vimeo.com/1129415885',
                    duration: 15,
                    order: 6,
                  },
                  {
                    title: 'Amazon\'s Leadership Principles in Action',
                    description: 'Apply Amazon\'s proven leadership framework',
                    videoUrl: 'https://vimeo.com/1129416093',
                    duration: 15,
                    order: 7,
                  },
                  {
                    title: 'Building Trust at Scale',
                    description: 'Create trust across teams and organizations',
                    videoUrl: 'https://vimeo.com/1129416368',
                    duration: 15,
                    order: 8,
                  },
                  {
                    title: 'The 10X Learning System',
                    description: 'Accelerate your learning and skill development',
                    videoUrl: 'https://vimeo.com/1129416625',
                    duration: 15,
                    order: 9,
                  },
                  {
                    title: 'Your 90-Day Career Action Plan',
                    description: 'Create your personalized roadmap to executive success',
                    videoUrl: 'https://vimeo.com/1129416936',
                    duration: 15,
                    order: 10,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully (AI course only for now)',
      course: aiCourse.slug,
    });
  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
