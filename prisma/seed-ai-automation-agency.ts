import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding AI Automation Agency Blueprint Course...')

  // Delete existing course data if it exists
  await prisma.lesson.deleteMany({
    where: {
      module: {
        course: {
          slug: 'ai-automation-agency'
        }
      }
    }
  })
  
  await prisma.module.deleteMany({
    where: {
      course: {
        slug: 'ai-automation-agency'
      }
    }
  })

  // Create or update the course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-automation-agency' },
    update: {
      title: 'AI Automation Agency Blueprint™',
      description: 'The complete system to land $5K-$10K+ clients and scale to six figures. 7 modules. Done-for-you templates. 30-day guarantee.',
      price: 29700, // $297.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/ai-automation-agency.jpg',
    },
    create: {
      slug: 'ai-automation-agency',
      title: 'AI Automation Agency Blueprint™',
      description: 'The complete system to land $5K-$10K+ clients and scale to six figures. 7 modules. Done-for-you templates. 30-day guarantee.',
      price: 29700, // $297.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/ai-automation-agency.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  // Module 1: Core Training
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Core Training: Build Your Agency',
      description: 'The 7 core modules to build, launch, and scale your AI automation agency',
      order: 1,
      lessons: {
        create: [
          {
            title: 'Module 1 - The Agency Opportunity',
            description: 'Why AI automation agencies are the fastest-growing business model in 2025. The $47B market opportunity and why businesses are desperate to pay premium prices for AI solutions.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_1',
            duration: 480, // 8 minutes
            order: 1,
          },
          {
            title: 'Module 2 - The 5 High-Ticket AI Services',
            description: 'The exact 5 AI automation services that command $2,000-$10,000+ per project. Why these services sell themselves and how to position them for maximum profit.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_2',
            duration: 720, // 12 minutes
            order: 2,
          },
          {
            title: 'Module 3 - The Agency Positioning System™',
            description: 'How to position yourself as the go-to AI automation expert in your niche. The Authority Stack™ that makes clients chase YOU instead of the other way around.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_3',
            duration: 600, // 10 minutes
            order: 3,
          },
          {
            title: 'Module 4 - The $10K Client Acquisition Engine™',
            description: 'The exact outreach scripts, proposal templates, and closing techniques that land $5K-$10K+ clients. Includes the Dream 100 method for targeting high-value prospects.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_4',
            duration: 900, // 15 minutes
            order: 4,
          },
          {
            title: 'Module 5 - The Premium Pricing Framework',
            description: 'How to confidently charge $3,000-$10,000+ per project. The value-based pricing model that eliminates price objections and positions you as premium.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_5',
            duration: 600, // 10 minutes
            order: 5,
          },
          {
            title: 'Module 6 - The Delivery & Fulfillment System',
            description: 'How to deliver world-class results using AI tools—even if you\'re not technical. The exact workflows, templates, and SOPs used by 6-figure agencies.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_6',
            duration: 720, // 12 minutes
            order: 6,
          },
          {
            title: 'Module 7 - Scaling to $20K+/Month',
            description: 'The roadmap from solo operator to agency owner. How to build recurring revenue, hire contractors, and scale to $20K-$50K/month and beyond.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_7',
            duration: 600, // 10 minutes
            order: 7,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 1 (Core Training) created with 7 lessons`)

  // Module 2: Bonus Content
  const module2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Bonus Modules',
      description: 'Additional resources to accelerate your agency growth',
      order: 2,
      lessons: {
        create: [
          {
            title: 'BONUS - The AI Tool Stack',
            description: 'The exact AI tools and software stack used by top agencies. Setup guides, best practices, and insider tips to maximize efficiency.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_BONUS_1',
            duration: 480, // 8 minutes
            order: 1,
          },
          {
            title: 'BONUS - Client Onboarding Templates',
            description: 'Done-for-you contracts, onboarding documents, and project management templates. Just fill in the blanks and look like a pro.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_BONUS_2',
            duration: 360, // 6 minutes
            order: 2,
          },
          {
            title: 'BONUS - The Retainer Conversion Script',
            description: 'How to convert one-time projects into $2K-$5K/month retainer clients. The exact script that creates predictable recurring revenue.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER_BONUS_3',
            duration: 300, // 5 minutes
            order: 3,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 2 (Bonus) created with 3 lessons`)

  console.log('\n📊 Course Summary:')
  console.log(`   Title: ${course.title}`)
  console.log(`   Modules: 2 (Core + Bonus)`)
  console.log(`   Total Lessons: 10 (7 core + 3 bonus)`)
  console.log(`   Total Duration: ~96 minutes`)
  console.log(`   Price: $${course.price / 100}`)
  console.log('\n✨ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
