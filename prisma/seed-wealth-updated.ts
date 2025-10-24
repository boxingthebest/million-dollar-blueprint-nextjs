import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Wealth Building Course...')

  // Delete existing course if it exists
  await prisma.course.deleteMany({
    where: { slug: 'wealth' }
  })

  // Create the course
  const course = await prisma.course.create({
    data: {
      slug: 'wealth',
      title: 'Wealth Building: The Blueprint for Financial Freedom',
      description: 'The investment strategies used by Warren Buffett, Yale Endowment, and Blackstone to build lasting wealth.',
      price: 19700, // $197.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/wealth.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Wealth Building: Complete Training',
      description: 'Build generational wealth using strategies of the top 1%',
      order: 1,
      lessons: {
        create: [
          {
            title: 'The Millionaire Mindset: How the Rich Think About Money',
            description: 'Reprogram your financial thermostat and adopt millionaire beliefs. Master Abundance vs. Scarcity Mindset, 4 Levers of Wealth Creation, and Warren Buffett\'s personal finance habits.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 840, // 14 minutes
            order: 1,
          },
          {
            title: 'The Art of a High-Income Career & Side Hustles',
            description: 'Maximize earning potential and build multiple income streams. Learn 5 High-Income Skills of the Future, Art of Salary Negotiation, and Google\'s "20% projects" turning into new businesses.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 2,
          },
          {
            title: 'The 7-Figure Investment Portfolio: Asset Allocation & Diversification',
            description: 'Build diversified portfolio aligned with risk tolerance and goals. Master 3 Buckets of Asset Allocation, Power of Compound Interest, and Yale Endowment\'s asset allocation strategy.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 3,
          },
          {
            title: 'Mastering the Stock Market: From Index Funds to Individual Stocks',
            description: 'Invest in stock market with confidence. Learn Boglehead Philosophy, 4 Pillars of Value Investing, and Peter Lynch\'s 29.2% annual return methodology at Fidelity\'s Magellan Fund.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1020, // 17 minutes
            order: 4,
          },
          {
            title: 'Real Estate Investing: From Your First Home to a Rental Empire',
            description: 'Invest in real estate for passive income, equity, and tax benefits. Master BRRRR Method, 1% Rule, House Hacking Strategy, and Blackstone\'s real estate empire playbook.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 5,
          },
          {
            title: 'Alternative Investments: The Secrets of the Super Rich',
            description: 'Explore alternative investments from private equity to crypto. Learn 3 Types of Alternative Investments, Asymmetric Risk/Reward Profile, and Andreessen Horowitz\'s venture capital success.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 6,
          },
          {
            title: 'Tax Strategies of the Wealthy: How to Legally Minimize Your Tax Bill',
            description: 'Learn legal tax strategies to minimize burden and accelerate wealth. Master 3 Types of Tax-Advantaged Accounts, Power of Tax-Loss Harvesting, and Apple\'s legal global tax minimization.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 840, // 14 minutes
            order: 7,
          },
          {
            title: 'Estate Planning & Generational Wealth',
            description: 'Protect assets and create plan to pass wealth to future generations. Learn 3 Essential Estate Planning Documents, Art of the Trust, and Rockefeller family preserving wealth for over a century.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 780, // 13 minutes
            order: 8,
          },
          {
            title: 'The Psychology of Wealth: Overcoming Your Limiting Beliefs',
            description: 'Identify and overcome psychological barriers to building wealth. Master 5 Money Scripts, Imposter Syndrome, and Jeff Bezos\'s mindset building Amazon to trillion-dollar company.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 720, // 12 minutes
            order: 9,
          },
          {
            title: 'The Blueprint for Financial Freedom: Your 10-Year Plan',
            description: 'Create personalized plan to achieve financial freedom in 10 years. Master Financial Freedom Number, 4 Stages of Financial Freedom, and Berkshire Hathaway\'s long-term vision and planning.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 10,
          },
        ],
      },
    },
  })

  console.log(`✅ Module created with 10 lessons (150 minutes total)`)
  console.log('💰 Wealth Building course created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

