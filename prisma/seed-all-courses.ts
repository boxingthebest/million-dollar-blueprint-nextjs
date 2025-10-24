import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding all 6 courses with complete structure...\n')

  // Course 2: The Executive Energy System™
  console.log('📦 Creating Course 2: The Executive Energy System™')
  const course2 = await prisma.course.upsert({
    where: { slug: 'executive-energy-system' },
    update: {},
    create: {
      slug: 'executive-energy-system',
      title: 'The Executive Energy System™',
      description: 'Master the wellness protocols used by Fortune 100 executives to optimize performance, energy, and longevity. Evidence-based strategies for peak cognitive and physical performance.',
      price: 19700, // $197.00
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/executive-energy-system.jpg',
    },
  })

  // Module 1: Video Lessons
  await prisma.module.create({
    data: {
      courseId: course2.id,
      title: 'Module 1: Executive Wellness Protocols',
      description: '10 essential wellness protocols for peak executive performance',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Lesson 1: The High-Performance Mindset',
            description: 'Master the mindset frameworks used by Fortune 100 executives to optimize performance and energy.',
            videoUrl: 'https://player.vimeo.com/video/1130296747?badge=0&autopause=0&player_id=0&app_id=58479',
            duration: 300,
            order: 1,
          },
          {
            title: 'Lesson 2: Sleep Optimization for Executives',
            description: 'Science-backed sleep protocols used by top performers to maximize recovery and cognitive function.',
            videoUrl: 'PLACEHOLDER_VIDEO_2',
            duration: 300,
            order: 2,
          },
          {
            title: 'Lesson 3: Nutrition Strategies for Peak Performance',
            description: 'Evidence-based nutrition frameworks that Fortune 100 executives use to maintain energy and focus.',
            videoUrl: 'PLACEHOLDER_VIDEO_3',
            duration: 300,
            order: 3,
          },
          {
            title: 'Lesson 4: Exercise Protocols for Busy Executives',
            description: 'Time-efficient fitness strategies that deliver maximum results with minimal time investment.',
            videoUrl: 'PLACEHOLDER_VIDEO_4',
            duration: 300,
            order: 4,
          },
          {
            title: 'Lesson 5: Stress Management & Resilience',
            description: 'Advanced stress management techniques used in high-pressure Fortune 100 environments.',
            videoUrl: 'PLACEHOLDER_VIDEO_5',
            duration: 300,
            order: 5,
          },
          {
            title: 'Lesson 6: Energy Management Systems',
            description: 'Learn how to manage your energy (not just time) for sustained high performance.',
            videoUrl: 'PLACEHOLDER_VIDEO_6',
            duration: 300,
            order: 6,
          },
          {
            title: 'Lesson 7: Cognitive Enhancement Strategies',
            description: 'Proven methods to enhance focus, memory, and decision-making capacity.',
            videoUrl: 'PLACEHOLDER_VIDEO_7',
            duration: 300,
            order: 7,
          },
          {
            title: 'Lesson 8: Recovery & Regeneration Protocols',
            description: 'Advanced recovery strategies that top executives use to maintain peak performance.',
            videoUrl: 'PLACEHOLDER_VIDEO_8',
            duration: 300,
            order: 8,
          },
          {
            title: 'Lesson 9: Longevity & Healthspan Optimization',
            description: 'Science-based strategies to extend both lifespan and healthspan for long-term success.',
            videoUrl: 'PLACEHOLDER_VIDEO_9',
            duration: 300,
            order: 9,
          },
          {
            title: 'Lesson 10: Building Your Personal Wellness System',
            description: 'Create your customized executive wellness system for sustainable high performance.',
            videoUrl: 'PLACEHOLDER_VIDEO_10',
            duration: 300,
            order: 10,
          },
        ],
      },
    },
  })

  // Module 2: PDF Downloads
  await prisma.module.create({
    data: {
      courseId: course2.id,
      title: 'Module 2: Executive Wellness Toolkit',
      description: 'Downloadable resources and tools for implementing your wellness protocols',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Download 1: Executive Sleep Optimization Guide',
            description: 'Complete guide with templates and tracking tools for optimizing your sleep.',
            videoUrl: 'PLACEHOLDER_PDF_1',
            duration: 0,
            order: 1,
          },
          {
            title: 'Download 2: High-Performance Nutrition Plan',
            description: 'Meal plans, recipes, and nutrition tracking templates.',
            videoUrl: 'PLACEHOLDER_PDF_2',
            duration: 0,
            order: 2,
          },
          {
            title: 'Download 3: Executive Fitness Protocol',
            description: 'Complete workout plans designed for busy executives.',
            videoUrl: 'PLACEHOLDER_PDF_3',
            duration: 0,
            order: 3,
          },
          {
            title: 'Download 4: Stress Management Toolkit',
            description: 'Practical tools and exercises for managing stress and building resilience.',
            videoUrl: 'PLACEHOLDER_PDF_4',
            duration: 0,
            order: 4,
          },
          {
            title: 'Download 5: Personal Wellness System Builder',
            description: 'Templates and frameworks to build your customized wellness system.',
            videoUrl: 'PLACEHOLDER_PDF_5',
            duration: 0,
            order: 5,
          },
        ],
      },
    },
  })

  console.log('✅ Course 2 created with 2 modules and 15 lessons\n')

  // Course 3: Sales Mastery
  console.log('📦 Creating Course 3: Sales Mastery')
  const course3 = await prisma.course.upsert({
    where: { slug: 'sales-mastery' },
    update: {},
    create: {
      slug: 'sales-mastery',
      title: 'Sales Mastery',
      description: 'The exact sales frameworks used to scale companies from $500K to $50B+. Close high-ticket deals with Fortune 100 strategies.',
      price: 24700, // $247.00
      isFree: false,
      isPublished: false,
      thumbnail: '/course-thumbnails/sales-mastery.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: course3.id,
      title: 'Module 1: Foundation',
      description: 'Coming soon - Sales fundamentals and frameworks',
      order: 1,
      lessons: {
        create: [],
      },
    },
  })

  console.log('✅ Course 3 created (placeholder)\n')

  // Course 4: Leadership & Influence
  console.log('📦 Creating Course 4: Leadership & Influence')
  const course4 = await prisma.course.upsert({
    where: { slug: 'leadership-influence' },
    update: {},
    create: {
      slug: 'leadership-influence',
      title: 'Leadership & Influence',
      description: 'Fortune 100 leadership strategies for executive presence and influence. Command any room with proven frameworks.',
      price: 24700, // $247.00
      isFree: false,
      isPublished: false,
      thumbnail: '/course-thumbnails/leadership-influence.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: course4.id,
      title: 'Module 1: Foundation',
      description: 'Coming soon - Leadership fundamentals and frameworks',
      order: 1,
      lessons: {
        create: [],
      },
    },
  })

  console.log('✅ Course 4 created (placeholder)\n')

  // Course 5: Digital Marketing Mastery
  console.log('📦 Creating Course 5: Digital Marketing Mastery')
  const course5 = await prisma.course.upsert({
    where: { slug: 'digital-marketing-mastery' },
    update: {},
    create: {
      slug: 'digital-marketing-mastery',
      title: 'Digital Marketing Mastery',
      description: 'Enterprise-level digital marketing tactics that drive real revenue. Grow your brand online with proven strategies.',
      price: 19700, // $197.00
      isFree: false,
      isPublished: false,
      thumbnail: '/course-thumbnails/digital-marketing-mastery.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: course5.id,
      title: 'Module 1: Foundation',
      description: 'Coming soon - Digital marketing fundamentals and frameworks',
      order: 1,
      lessons: {
        create: [],
      },
    },
  })

  console.log('✅ Course 5 created (placeholder)\n')

  // Course 6: Wealth Building
  console.log('📦 Creating Course 6: Wealth Building')
  const course6 = await prisma.course.upsert({
    where: { slug: 'wealth-building' },
    update: {},
    create: {
      slug: 'wealth-building',
      title: 'Wealth Building',
      description: 'Build lasting wealth with strategies from Wall Street insiders. Financial intelligence for long-term success.',
      price: 19700, // $197.00
      isFree: false,
      isPublished: false,
      thumbnail: '/course-thumbnails/wealth-building.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: course6.id,
      title: 'Module 1: Foundation',
      description: 'Coming soon - Wealth building fundamentals and frameworks',
      order: 1,
      lessons: {
        create: [],
      },
    },
  })

  console.log('✅ Course 6 created (placeholder)\n')

  // Summary
  const allCourses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  })

  console.log('\n📊 Complete Course Summary:')
  console.log('=' .repeat(60))
  allCourses.forEach((course, index) => {
    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
    console.log(`\n${index + 1}. ${course.title}`)
    console.log(`   Slug: ${course.slug}`)
    console.log(`   Price: $${course.price / 100}`)
    console.log(`   Status: ${course.isPublished ? 'Published' : 'Draft'}`)
    console.log(`   Modules: ${course.modules.length}`)
    console.log(`   Lessons: ${totalLessons}`)
  })

  console.log('\n' + '='.repeat(60))
  console.log('✨ All courses seeded successfully!')
  console.log('\n📝 Next Steps:')
  console.log('   1. Create dynamic course page: /app/courses/[slug]/page.tsx')
  console.log('   2. Push to GitHub')
  console.log('   3. Deploy to Vercel')
  console.log('   4. Add content through admin panel')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

