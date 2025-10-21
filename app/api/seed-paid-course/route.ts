import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { secret } = await request.json()
    
    if (secret !== 'seed-course-2024') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Delete existing paid course if it exists
    const existing = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills-paid' }
    })
    
    if (existing) {
      await prisma.course.delete({
        where: { id: existing.id }
      })
    }

    // Create the paid course
    const course = await prisma.course.create({
      data: {
        slug: 'ai-resistant-skills-paid',
        title: 'AI-Resistant Skills: Future-Proof Your Career',
        description: 'Master the 5 human skills AI will never replace. From the boardrooms of AWS & Goldman Sachs.',
        price: 19700, // $197.00 in cents
        isFree: false,
        isPublished: true,
        thumbnail: '/course-thumbnails/ai-resistant-skills.jpg',
      },
    })

    // Module 1
    const module1 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Foundation & Strategic Thinking',
        description: 'Understand the AI revolution and master strategic thinking frameworks',
        order: 1,
      },
    })

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module1.id,
          title: 'Welcome & Course Overview',
          description: 'Introduction to the course, what you\'ll learn, and how to get the most value from this training.',
          videoUrl: 'PLACEHOLDER_VIDEO_1',
          duration: 3,
          order: 1,
        },
        {
          moduleId: module1.id,
          title: 'The AI Revolution: Why Traditional Skills Are Obsolete',
          description: 'Discover the seismic shift happening in the workforce and why 47% of jobs are at risk of automation.',
          videoUrl: 'PLACEHOLDER_VIDEO_2',
          duration: 4,
          order: 2,
        },
        {
          moduleId: module1.id,
          title: 'Skill #1: Strategic Thinking - The Executive Framework',
          description: 'Learn the exact strategic thinking framework used by Fortune 100 executives to make million-dollar decisions.',
          videoUrl: 'PLACEHOLDER_VIDEO_3',
          duration: 5,
          order: 3,
        },
        {
          moduleId: module1.id,
          title: 'Case Study: How McKinsey Consultants Frame Problems',
          description: 'Real-world example of strategic thinking in action at one of the world\'s top consulting firms.',
          videoUrl: 'PLACEHOLDER_VIDEO_4',
          duration: 4,
          order: 4,
        },
      ],
    })

    // Module 2
    const module2 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Emotional Intelligence & Relationship Building',
        description: 'Master the skill that 40% of Fortune 100 boards require in CEO candidates',
        order: 2,
      },
    })

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module2.id,
          title: 'Skill #2: Emotional Intelligence - Reading the Room',
          description: 'Learn the EQ framework used by Goldman Sachs to identify high-potential leaders.',
          videoUrl: 'PLACEHOLDER_VIDEO_5',
          duration: 5,
          order: 1,
        },
        {
          moduleId: module2.id,
          title: 'The Art of Influence Without Authority',
          description: 'How to build relationships and influence decisions when you don\'t have formal power.',
          videoUrl: 'PLACEHOLDER_VIDEO_6',
          duration: 4,
          order: 2,
        },
        {
          moduleId: module2.id,
          title: 'Case Study: How AWS Leaders Build Trust at Scale',
          description: 'Inside Amazon\'s leadership principles and how they create high-trust cultures.',
          videoUrl: 'PLACEHOLDER_VIDEO_7',
          duration: 4,
          order: 3,
        },
      ],
    })

    // Module 3
    const module3 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Creative Problem-Solving & Innovation',
        description: 'How the world\'s most innovative companies solve impossible problems',
        order: 3,
      },
    })

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module3.id,
          title: 'Skill #3: Creative Problem-Solving - Thinking Like Innovators',
          description: 'The creative problem-solving methods used by Apple, Google, and Tesla to reimagine industries.',
          videoUrl: 'PLACEHOLDER_VIDEO_8',
          duration: 5,
          order: 1,
        },
        {
          moduleId: module3.id,
          title: 'The Innovation Toolkit: Frameworks That Work',
          description: 'Practical frameworks for generating breakthrough ideas: SCAMPER, Design Thinking, and Lateral Thinking.',
          videoUrl: 'PLACEHOLDER_VIDEO_9',
          duration: 4,
          order: 2,
        },
        {
          moduleId: module3.id,
          title: 'Case Study: How Google Solves Impossible Problems',
          description: 'Inside Google X and how they use "moonshot thinking" to tackle the world\'s biggest challenges.',
          videoUrl: 'PLACEHOLDER_VIDEO_10',
          duration: 4,
          order: 3,
        },
      ],
    })

    // Module 4
    const module4 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Executive Presence & Adaptive Learning',
        description: 'Master the qualities that get you promoted and help you learn faster than the world changes',
        order: 4,
      },
    })

    await prisma.lesson.createMany({
      data: [
        {
          moduleId: module4.id,
          title: 'Skill #4: Executive Presence - Commanding the Room',
          description: 'The three pillars of executive presence: gravitas, communication, and appearance.',
          videoUrl: 'PLACEHOLDER_VIDEO_11',
          duration: 4,
          order: 1,
        },
        {
          moduleId: module4.id,
          title: 'Skill #5: Adaptive Learning - The Meta-Skill',
          description: 'How to learn faster than the world is changing using the methods of top performers.',
          videoUrl: 'PLACEHOLDER_VIDEO_12',
          duration: 5,
          order: 2,
        },
      ],
    })

    const totalLessons = await prisma.lesson.count({
      where: { module: { courseId: course.id } }
    })

    return NextResponse.json({
      success: true,
      course: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        modules: 4,
        lessons: totalLessons,
        price: course.price / 100
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

