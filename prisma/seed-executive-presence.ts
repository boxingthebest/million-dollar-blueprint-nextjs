import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Executive Presence course...\n')

  // Create Executive Presence Course
  console.log('📦 Creating Course: Executive Presence')
  const course = await prisma.course.upsert({
    where: { slug: 'executive-presence' },
    update: {},
    create: {
      slug: 'executive-presence',
      title: 'Executive Presence',
      description: 'Master executive presence and influence without authority. From Fortune 100 leaders.',
      price: 39700, // $397.00
      isFree: false,
      isPublished: true,
      thumbnail: '/hero-executive-presence-futuristic.png',
    },
  })

  // Module 1: Foundation (Videos 1-6)
  console.log('📚 Creating Module 1: Foundation')
  await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 1: Foundation',
      description: 'Master the foundational frameworks of executive presence',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Video 1: The Goldman Sachs Framework',
            description: 'Command respect in any room with the 3-pillar system used at Goldman Sachs',
            videoUrl: 'https://player.vimeo.com/video/1141440345?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 1,
          },
          {
            title: 'Video 2: The Strategic Pause Technique',
            description: 'Control any conversation using silence as your secret weapon',
            videoUrl: 'https://player.vimeo.com/video/1141443129?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 2,
          },
          {
            title: 'Video 3: Salary Negotiation Mastery',
            description: 'The exact 3-step framework to negotiate $100K+ raises',
            videoUrl: 'https://player.vimeo.com/video/1141459744?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 3,
          },
          {
            title: 'Video 4: Executive Communication',
            description: 'Speak with authority and influence without needing a title',
            videoUrl: 'https://player.vimeo.com/video/1141460242?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 4,
          },
          {
            title: 'Video 5: The Meeting Before the Meeting',
            description: 'Amazon\'s insider strategy for winning decisions before they\'re made',
            videoUrl: 'https://player.vimeo.com/video/1141460954?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 5,
          },
          {
            title: 'Video 6: Breaking the $120K Ceiling (BONUS)',
            description: 'The mindset shifts required to reach $400K+',
            videoUrl: 'https://player.vimeo.com/video/1141607107?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 6,
          },
        ],
      },
    },
  })

  // Module 2: Fortune 100 Frameworks (Videos 7-11)
  console.log('📚 Creating Module 2: Fortune 100 Frameworks')
  await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 2: Fortune 100 Frameworks',
      description: 'Learn the exact frameworks used by McKinsey, Amazon, Google, Netflix, and Apple',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Video 7: The McKinsey Problem-Solving Blueprint',
            description: 'The exact problem-solving system used by elite consultants',
            videoUrl: 'https://player.vimeo.com/video/1141607526?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 1,
          },
          {
            title: 'Video 8: The Amazon "Working Backwards" Blueprint',
            description: 'The process Amazon uses to create world-changing products',
            videoUrl: 'https://player.vimeo.com/video/1141607761?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 2,
          },
          {
            title: 'Video 9: The Google OKR Blueprint for Career Acceleration',
            description: 'The OKR system Google uses for career acceleration',
            videoUrl: 'https://player.vimeo.com/video/1141608131?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 3,
          },
          {
            title: 'Video 10: The Netflix Culture Blueprint for High-Performance Teams',
            description: 'Build and lead high-performance teams using Netflix\'s culture principles',
            videoUrl: 'https://player.vimeo.com/video/1141608782?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 4,
          },
          {
            title: 'Video 11: The Apple Innovation Blueprint (Deep Dive)',
            description: 'Deep dive into Apple\'s innovation framework and "Think Different" philosophy',
            videoUrl: 'https://player.vimeo.com/video/1141609074?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 5,
          },
        ],
      },
    },
  })

  // Module 3: Executive Skills (Videos 12-16)
  console.log('📚 Creating Module 3: Executive Skills')
  await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 3: Executive Skills',
      description: 'Master the critical skills every executive needs to succeed',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Video 12: The Strategic Networking Blueprint',
            description: 'Strategic networking systems for executive-level relationships',
            videoUrl: 'https://player.vimeo.com/video/1141609527?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 1,
          },
          {
            title: 'Video 13: The Executive Writing Blueprint',
            description: 'Master executive-level written communication',
            videoUrl: 'https://player.vimeo.com/video/1141611410?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 2,
          },
          {
            title: 'Video 14: The Financial Acumen Blueprint for Non-Finance Leaders',
            description: 'Financial acumen for non-finance leaders',
            videoUrl: 'https://player.vimeo.com/video/1141611628?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 3,
          },
          {
            title: 'Video 15: The 90-Day Leadership Transition Blueprint',
            description: 'The leadership transition framework for new roles',
            videoUrl: 'https://player.vimeo.com/video/1141611926?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 4,
          },
          {
            title: 'Video 16: The Boardroom Presence Blueprint',
            description: 'Presence and influence in boardroom settings',
            videoUrl: 'https://player.vimeo.com/video/1141612249?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 5,
          },
        ],
      },
    },
  })

  // Module 4: Advanced Mastery (Videos 17-21)
  console.log('📚 Creating Module 4: Advanced Mastery')
  await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 4: Advanced Mastery',
      description: 'Advanced strategies for thought leadership, wealth, legacy, and sustained performance',
      order: 4,
      lessons: {
        create: [
          {
            title: 'Video 17: The Thought Leadership Blueprint',
            description: 'Build your reputation as an industry thought leader',
            videoUrl: 'https://player.vimeo.com/video/1141612565?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 1,
          },
          {
            title: 'Video 18: The Wealth Generation Blueprint',
            description: 'Wealth generation strategies for high earners',
            videoUrl: 'https://player.vimeo.com/video/1141612902?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 2,
          },
          {
            title: 'Video 19: The Legacy Blueprint',
            description: 'Create lasting impact and define your leadership legacy',
            videoUrl: 'https://player.vimeo.com/video/1141613211?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 3,
          },
          {
            title: 'Video 20: The Personal Energy Management Blueprint',
            description: 'Personal energy management for sustained high performance',
            videoUrl: 'https://player.vimeo.com/video/1141613480?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 4,
          },
          {
            title: 'Video 21: The Executive Presence Integration Blueprint',
            description: 'Integration of all frameworks into your daily leadership practice',
            videoUrl: 'https://player.vimeo.com/video/1141613480?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 5,
          },
        ],
      },
    },
  })

  // Module 5: Executive Presence Toolkit (5 PDFs)
  console.log('📚 Creating Module 5: Executive Presence Toolkit')
  await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 5: Executive Presence Toolkit',
      description: 'Downloadable resources, templates, and tools to implement what you\'ve learned',
      order: 5,
      lessons: {
        create: [
          {
            title: 'The Complete Framework Library',
            description: 'Your comprehensive executive presence framework guide',
            videoUrl: '/downloads/Executive-Presence-Framework-Library.pdf',
            duration: 0,
            order: 1,
          },
          {
            title: '90-Day Implementation Roadmap',
            description: 'Step-by-step roadmap to implement executive presence in 90 days',
            videoUrl: '/downloads/Executive-Presence-90-Day-Roadmap.pdf',
            duration: 0,
            order: 2,
          },
          {
            title: 'The $400K Playbook',
            description: 'The complete playbook for reaching $400K+ compensation',
            videoUrl: '/downloads/Executive-Presence-400K-Playbook.pdf',
            duration: 0,
            order: 3,
          },
          {
            title: 'Executive Communication Toolkit',
            description: 'Templates and scripts for executive-level communication',
            videoUrl: '/downloads/Executive-Presence-Communication-Toolkit.pdf',
            duration: 0,
            order: 4,
          },
          {
            title: 'Career Acceleration Workbook',
            description: 'Track your progress and accelerate your career',
            videoUrl: '/downloads/Executive-Presence-Career-Workbook.pdf',
            duration: 0,
            order: 5,
          },
        ],
      },
    },
  })

  console.log('✅ Executive Presence course seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
