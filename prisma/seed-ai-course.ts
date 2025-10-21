import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding AI-Resistant Skills Course...')

  // Create the course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-resistant-skills' },
    update: {},
    create: {
      slug: 'ai-resistant-skills',
      title: 'AI-Resistant Skills: Future-Proof Your Career',
      description: 'Master the 5 human skills AI will never replace. From the boardrooms of AWS & Goldman Sachs.',
      price: 19700, // $197.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/ai-resistant-skills.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  // Module 1: Foundation & Strategic Thinking
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 1: Foundation & Strategic Thinking',
      description: 'Understand the AI revolution and master strategic thinking frameworks',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Welcome & Course Overview',
            description: 'Introduction to the course, what you\'ll learn, and how to get the most value from this training.',
            videoUrl: 'PLACEHOLDER_VIDEO_1', // Replace with Synthesia video URL
            duration: 180, // 3 minutes in seconds
            order: 1,
          },
          {
            title: 'The AI Revolution: Why Traditional Skills Are Obsolete',
            description: 'Discover the seismic shift happening in the workforce and why 47% of jobs are at risk of automation. Learn which skills AI can replace and which it cannot.',
            videoUrl: 'PLACEHOLDER_VIDEO_2',
            duration: 240, // 4 minutes
            order: 2,
          },
          {
            title: 'Skill #1: Strategic Thinking - The Executive Framework',
            description: 'Learn the exact strategic thinking framework used by Fortune 100 executives to make million-dollar decisions. Includes the OODA Loop and First Principles Thinking.',
            videoUrl: 'PLACEHOLDER_VIDEO_3',
            duration: 300, // 5 minutes
            order: 3,
          },
          {
            title: 'Strategic Thinking in Action: Real-World Case Studies',
            description: 'See how Amazon, Apple, and Google executives apply strategic thinking to solve complex business problems. Practical examples you can use immediately.',
            videoUrl: 'PLACEHOLDER_VIDEO_4',
            duration: 240, // 4 minutes
            order: 4,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 1 created with 4 lessons`)

  // Module 2: Emotional Intelligence & Relationship Building
  const module2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 2: Emotional Intelligence & Relationship Building',
      description: 'Master the human connection skills that drive influence and leadership',
      order: 2,
      lessons: {
        create: [
          {
            title: 'Skill #2: Emotional Intelligence - The Leadership Advantage',
            description: 'Understand why EQ matters more than IQ in leadership. Learn the 4 pillars of emotional intelligence: self-awareness, self-management, social awareness, and relationship management.',
            videoUrl: 'PLACEHOLDER_VIDEO_5',
            duration: 240, // 4 minutes
            order: 1,
          },
          {
            title: 'Reading the Room: Advanced Social Awareness',
            description: 'Master the subtle art of reading body language, tone, and group dynamics. Learn techniques used by Goldman Sachs executives in high-stakes negotiations.',
            videoUrl: 'PLACEHOLDER_VIDEO_6',
            duration: 240, // 4 minutes
            order: 2,
          },
          {
            title: 'Skill #3: Relationship Building - The Strategic Network',
            description: 'Learn how to build authentic, strategic relationships that accelerate your career. Discover the networking frameworks used by McKinsey consultants.',
            videoUrl: 'PLACEHOLDER_VIDEO_7',
            duration: 300, // 5 minutes
            order: 3,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 2 created with 3 lessons`)

  // Module 3: Creative Problem-Solving & Adaptive Learning
  const module3 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 3: Creative Problem-Solving & Adaptive Learning',
      description: 'Unlock creative thinking and develop the meta-skill of continuous learning',
      order: 3,
      lessons: {
        create: [
          {
            title: 'Skill #4: Creative Problem-Solving - Think Like an Innovator',
            description: 'Learn the creative thinking frameworks used at Apple and Google. Master lateral thinking, design thinking, and the SCAMPER technique.',
            videoUrl: 'PLACEHOLDER_VIDEO_8',
            duration: 300, // 5 minutes
            order: 1,
          },
          {
            title: 'Breaking Through Mental Blocks',
            description: 'Discover proven techniques to overcome creative blocks and generate breakthrough ideas. Learn how to facilitate innovation in teams.',
            videoUrl: 'PLACEHOLDER_VIDEO_9',
            duration: 240, // 4 minutes
            order: 2,
          },
          {
            title: 'Skill #5: Adaptive Learning - The Meta-Skill',
            description: 'Master the skill of learning itself. Discover how to stay ahead of technological change through deliberate practice and continuous improvement.',
            videoUrl: 'PLACEHOLDER_VIDEO_10',
            duration: 300, // 5 minutes
            order: 3,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 3 created with 3 lessons`)

  // Module 4: Integration & Action Plan
  const module4 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Module 4: Integration & Your Action Plan',
      description: 'Bring it all together and create your personalized career transformation plan',
      order: 4,
      lessons: {
        create: [
          {
            title: 'Integrating All 5 Skills: Your Competitive Advantage',
            description: 'Learn how to combine all 5 AI-resistant skills into a powerful competitive advantage. See how top performers integrate these skills daily.',
            videoUrl: 'PLACEHOLDER_VIDEO_11',
            duration: 240, // 4 minutes
            order: 1,
          },
          {
            title: 'Your 90-Day Action Plan',
            description: 'Create your personalized action plan to implement these skills immediately. Includes specific exercises, milestones, and accountability frameworks.',
            videoUrl: 'PLACEHOLDER_VIDEO_12',
            duration: 300, // 5 minutes
            order: 2,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 4 created with 2 lessons`)

  // Resources can be added later through the admin interface
  console.log(`✅ Course structure complete - resources can be added later`)

  console.log('\n📊 Course Summary:')
  console.log(`   Title: ${course.title}`)
  console.log(`   Modules: 4`)
  console.log(`   Total Lessons: 12`)
  console.log(`   Total Duration: ~48 minutes`)
  console.log(`   Price: $${course.price / 100}`)
  console.log('\n✨ Seed completed successfully!')
  console.log('\n📝 Next Steps:')
  console.log('   1. Create 12 videos in Synthesia (3-5 min each)')
  console.log('   2. Update videoUrl fields with actual Synthesia URLs')
  console.log('   3. Upload course thumbnail to /public/course-thumbnails/')
  console.log('   4. Upload PDF resource to /public/resources/')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

