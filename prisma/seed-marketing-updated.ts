import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Digital Marketing Mastery Course...')

  // Delete existing course if it exists
  await prisma.course.deleteMany({
    where: { slug: 'marketing' }
  })

  // Create the course
  const course = await prisma.course.create({
    data: {
      slug: 'marketing',
      title: 'Digital Marketing Mastery: The Blueprint for Scalable Growth',
      description: 'The data-driven growth frameworks used by Facebook, Netflix, and HubSpot to achieve exponential growth.',
      price: 19700, // $197.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/marketing.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Digital Marketing Mastery: Complete Training',
      description: 'Build a marketing engine that drives predictable, scalable growth',
      order: 1,
      lessons: {
        create: [
          {
            title: 'The Growth Marketing Mindset',
            description: 'Shift to a data-driven, experimental approach to growth. Master Pirate Metrics (AARRR), Growth Hacking Cycle, and 3 Levers of Growth used by Facebook to reach first billion users.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 720, // 12 minutes
            order: 1,
          },
          {
            title: 'Deep Customer Psychology & ICP Development',
            description: 'Develop deep understanding of ideal customer\'s pains, desires, and motivations. Master Jobs-to-be-Done (JTBD), Empathy Map, and 5 Levels of Customer Awareness from Netflix\'s playbook.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 2,
          },
          {
            title: 'Building a World-Class Content Engine',
            description: 'Create a content strategy that attracts ideal customers and positions you as authority. Learn Content-Market Fit, 10x Content Rule, and HubSpot\'s billion-dollar content marketing playbook.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 3,
          },
          {
            title: 'Mastering SEO & Organic Search',
            description: 'Drive sustainable flow of free, high-intent traffic. Master Keyword Strategy Framework, 3 Pillars of SEO, and Link Building System that helped Amazon dominate search results.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 4,
          },
          {
            title: 'Paid Advertising & Customer Acquisition',
            description: 'Build and scale profitable paid advertising campaigns. Learn Ad Copy Formula, 3 Levels of Ad Targeting, and Google\'s paid acquisition strategy for campaign scaling.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1020, // 17 minutes
            order: 5,
          },
          {
            title: 'The Art of Email Marketing & Automation',
            description: 'Build powerful email list and create automated sequences. Master 3 Types of Email Campaigns, Welcome Series Formula, and Apple\'s email marketing driving significant revenue.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 840, // 14 minutes
            order: 6,
          },
          {
            title: 'Building a Social Media Flywheel',
            description: 'Use social media to build community, drive engagement, generate leads. Learn Social Media Value Ladder, 80/20 Rule, and Nike\'s social media strategy to become global cultural icon.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 7,
          },
          {
            title: 'Conversion Rate Optimization (CRO) & A/B Testing',
            description: 'Use data and experimentation to optimize for maximum conversions. Master CRO Process, 5-Second Test, and Amazon\'s A/B testing culture generating billions in additional revenue.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 8,
          },
          {
            title: 'Building a Brand That Lasts',
            description: 'Build a brand people love, trust, and pay premium for. Learn Brand Archetype Framework, 3 Pillars of Memorable Brand, and Coca-Cola\'s timeless branding strategy.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 840, // 14 minutes
            order: 9,
          },
          {
            title: 'The CMO\'s Dashboard: Marketing Analytics & ROI',
            description: 'Track metrics that matter, measure ROI, communicate results to C-suite. Master 4 Key Marketing Metrics (CAC, LTV, Payback Period, Marketing ROI) and Procter & Gamble\'s CMO analytics dashboard.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 780, // 13 minutes
            order: 10,
          },
        ],
      },
    },
  })

  console.log(`✅ Module created with 10 lessons (150 minutes total)`)
  console.log('📊 Digital Marketing Mastery course created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

