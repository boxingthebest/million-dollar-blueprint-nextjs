import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Simple security check
    if (body.secret !== 'seed-course-final-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete existing paid course if it exists
    await prisma.course.deleteMany({
      where: {
        OR: [
          { slug: 'ai-resistant-skills-paid' },
          { slug: 'ai-resistant-skills' }
        ]
      }
    })

    // Create the paid course with McKinsey-level content
    const course = await prisma.course.create({
      data: {
        slug: 'ai-resistant-skills-paid',
        title: 'AI-Resistant Skills: Future-Proof Your Career',
        description: 'Master the 5 human skills AI will never replicate with proprietary frameworks from Fortune 100 executives. This isn\'t theory—these are battle-tested implementation strategies from Amazon, Apple, Google, Goldman Sachs, and McKinsey.',
        price: 197,
        isFree: false,
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        modules: {
          create: [
            // MODULE 1: Strategic Thinking Mastery
            {
              title: 'Strategic Thinking AI Can\'t Replicate',
              description: 'Master the executive-level strategic thinking frameworks used by Fortune 100 leaders to make billion-dollar decisions.',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'The Executive Intelligence Framework',
                    description: 'Learn the proprietary 4-quadrant framework used by McKinsey consultants to analyze complex business problems. Includes the Strategic Thinking Assessment™ tool and real case study from Amazon\'s AWS expansion strategy.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-1',
                    duration: 360,
                    order: 1
                  },
                  {
                    title: 'Systems Thinking for Complex Problems',
                    description: 'Master the interconnected thinking methodology used by Apple to revolutionize entire industries. Learn the 5-step Systems Analysis Process and apply it to your career decisions with measurable outcomes.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-2',
                    duration: 300,
                    order: 2
                  }
                ]
              }
            },
            // MODULE 2: Emotional Intelligence Mastery
            {
              title: 'Emotional Intelligence That Builds Empire',
              description: 'Develop the relationship-building and influence skills that separate executives from employees at Goldman Sachs and top investment banks.',
              order: 2,
              lessons: {
                create: [
                  {
                    title: 'The Goldman Sachs Relationship Framework',
                    description: 'Learn the exact 3-phase relationship-building system used by Goldman Sachs executives to build $100M+ client relationships. Includes the Emotional Intelligence Scorecard and networking templates.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-3',
                    duration: 330,
                    order: 3
                  },
                  {
                    title: 'Influence Without Authority',
                    description: 'Master the persuasion frameworks used by McKinsey consultants to influence C-suite executives. Learn the 4 Pillars of Executive Presence and the Stakeholder Influence Matrix with real-world applications.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-4',
                    duration: 330,
                    order: 4
                  }
                ]
              }
            },
            // MODULE 3: Creative Problem-Solving Mastery
            {
              title: 'Creative Problem-Solving That Drives Innovation',
              description: 'Apply the innovation methodologies used by Apple and Google to create breakthrough solutions that AI cannot replicate.',
              order: 3,
              lessons: {
                create: [
                  {
                    title: 'The Apple Innovation Process',
                    description: 'Learn Apple\'s proprietary 6-step innovation framework that created the iPhone, iPad, and Apple Watch. Includes the Innovation Idea Generator tool and case study of how Apple disrupted 5 industries simultaneously.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-5',
                    duration: 360,
                    order: 5
                  },
                  {
                    title: 'First Principles Thinking for Breakthrough Solutions',
                    description: 'Master Elon Musk\'s first principles methodology used at Tesla and SpaceX. Learn the 5-question framework to deconstruct any problem and rebuild innovative solutions. Includes implementation worksheet.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-6',
                    duration: 300,
                    order: 6
                  }
                ]
              }
            },
            // MODULE 4: Ethical Leadership Mastery
            {
              title: 'Ethical Leadership That Inspires Teams',
              description: 'Develop the integrity-based leadership approach used by Amazon and other Fortune 100 companies to build high-performing teams.',
              order: 4,
              lessons: {
                create: [
                  {
                    title: 'Amazon\'s Leadership Principles in Action',
                    description: 'Learn how Amazon\'s 16 Leadership Principles drive decision-making at every level. Includes the Leadership Decision Matrix and real case studies from AWS team scaling from 50 to 5,000 employees.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-7',
                    duration: 330,
                    order: 7
                  },
                  {
                    title: 'Building Trust at Scale',
                    description: 'Master the trust-building frameworks used by Google to maintain culture while scaling to 150,000+ employees. Learn the 4 Dimensions of Trust and the Team Performance Accelerator system.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-8',
                    duration: 300,
                    order: 8
                  }
                ]
              }
            },
            // MODULE 5: Adaptive Learning Mastery
            {
              title: 'Adaptive Learning That Keeps You Ahead',
              description: 'Implement the continuous learning systems used by top performers to stay ahead of AI and industry disruption.',
              order: 5,
              lessons: {
                create: [
                  {
                    title: 'The 10X Learning System',
                    description: 'Learn the accelerated learning methodology used by McKinsey consultants to master new industries in 30 days. Includes the Skill Acquisition Framework and the 90-Day Mastery Plan template.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-9',
                    duration: 330,
                    order: 9
                  },
                  {
                    title: 'Your AI-Resistant Career Action Plan',
                    description: 'Create your personalized 90-day implementation roadmap. Learn the Career Future-Proofing Matrix and receive your customized action plan with specific milestones, metrics, and accountability systems.',
                    videoUrl: 'https://placeholder-video-url.com/lesson-10',
                    duration: 360,
                    order: 10
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
    })

    // Count totals
    const moduleCount = course.modules.length
    const lessonCount = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)

    return NextResponse.json({
      success: true,
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        modules: moduleCount,
        lessons: lessonCount,
        price: course.price
      }
    })
  } catch (error) {
    console.error('Error seeding course:', error)
    return NextResponse.json({ error: 'Failed to seed course' }, { status: 500 })
  }
}

