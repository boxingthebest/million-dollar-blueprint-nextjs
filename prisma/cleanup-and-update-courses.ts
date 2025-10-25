import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Starting cleanup and course updates...\n')

  // Step 1: Delete the draft AI-Resistant Skills course ($1.97)
  console.log('🗑️  Deleting draft AI-Resistant Skills course...')
  const deletedDraft = await prisma.course.deleteMany({
    where: {
      title: 'AI-Resistant Skills: Future-Proof Your Career',
      price: 197, // $1.97 in cents
    }
  })
  console.log(`✅ Deleted ${deletedDraft.count} draft course(s)\n`)

  // Step 2: Update Sales Mastery
  console.log('🎯 Updating Sales Mastery Course...')
  await prisma.course.deleteMany({ where: { slug: 'sales' } })
  
  const salesCourse = await prisma.course.create({
    data: {
      slug: 'sales',
      title: 'Sales Mastery: The Blueprint for High-Ticket Closing',
      description: 'Master MEDDPICC, SPIN & Challenger Sale - the exact frameworks used by Salesforce, MongoDB, and IBM to close multi-million dollar enterprise deals.',
      price: 24700, // $247.00
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/sales.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: salesCourse.id,
      title: 'Sales Mastery: Complete Training',
      description: 'Master the elite sales frameworks used by Fortune 100 companies',
      order: 1,
      lessons: {
        create: [
          { title: 'The $10M+ Sales Mindset', description: 'Reprogram your beliefs about selling, money, and value to develop the unshakable confidence of an elite closer.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 720, order: 1 },
          { title: 'The Art of Prospecting & Pipeline Mastery', description: 'Build a predictable pipeline using the Predictable Revenue model from Salesforce.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 2 },
          { title: 'Mastering the First 60 Seconds & Building Instant Credibility', description: 'Capture attention, build rapport, and establish authority in the first minute.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 600, order: 3 },
          { title: 'MEDDPICC - The Enterprise Sales Qualification System', description: 'Master the gold-standard qualification framework used by Salesforce, MongoDB, and elite SaaS companies.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1500, order: 4 },
          { title: 'Discovery That Uncovers Deep Pain - SPIN & Challenger Approach', description: 'Go beyond surface-level needs using SPIN Selling and Challenger Sale methodologies.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1320, order: 5 },
          { title: 'The Value Proposition & Business Case That Makes You the Only Choice', description: 'Craft compelling value propositions and business cases like McKinsey consultants.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 6 },
          { title: 'The Demo That Sells Itself', description: 'Deliver product demonstrations that are so compelling, prospects sell themselves.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 7 },
          { title: 'Objection Handling That Builds Trust', description: 'Welcome objections as opportunities to build trust using proven frameworks.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 8 },
          { title: 'Closing & Negotiation - Strategies from the World\'s Best', description: 'Master closing and negotiation without high-pressure tactics.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1200, order: 9 },
          { title: 'Building a Predictable Revenue Engine', description: 'Build systems to scale sales success and create predictable revenue.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 10 },
        ],
      },
    },
  })
  console.log('✅ Sales Mastery updated: $247, 10 lessons\n')

  // Step 3: Update Leadership & Influence
  console.log('👑 Updating Leadership & Influence Course...')
  await prisma.course.deleteMany({ where: { slug: 'leadership' } })
  
  const leadershipCourse = await prisma.course.create({
    data: {
      slug: 'leadership',
      title: 'Leadership & Influence: Command Any Room',
      description: 'The executive presence frameworks used by Microsoft, PepsiCo, and Amazon to develop world-class leaders.',
      price: 24700, // $247.00
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/leadership.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: leadershipCourse.id,
      title: 'Leadership & Influence: Complete Training',
      description: 'Master executive presence and influence like Fortune 100 leaders',
      order: 1,
      lessons: {
        create: [
          { title: 'The 3 Pillars of Executive Presence', description: 'Understand and develop the core components of executive presence: Gravitas, Communication, and Appearance.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 1 },
          { title: 'The Art of Strategic Storytelling', description: 'Use storytelling to connect with, persuade, and inspire your audience.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 2 },
          { title: 'Mastering Body Language & Non-Verbal Cues', description: 'Read and use body language to build rapport, project confidence, and influence.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 3 },
          { title: 'The Art of Active Listening', description: 'Listen with intent, understand unspoken needs, and build deeper relationships.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 840, order: 4 },
          { title: 'How to Run Meetings That Get Results', description: 'Plan, lead, and follow up on meetings that drive action.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1200, order: 5 },
          { title: 'Giving Feedback That Motivates Change', description: 'Give and receive feedback that builds trust and improves performance.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1020, order: 6 },
          { title: 'Leading Through Crisis & Uncertainty', description: 'Lead with resilience, communicate with clarity, and inspire confidence in crisis.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1140, order: 7 },
          { title: 'The Art of Delegation & Empowerment', description: 'Delegate effectively, empower your team, and scale your impact.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 8 },
          { title: 'Building Your Professional Network', description: 'Build a powerful network of allies, mentors, and sponsors.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 9 },
          { title: 'The Leader\'s Legacy', description: 'Define your leadership philosophy and create a plan for lasting impact.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1020, order: 10 },
        ],
      },
    },
  })
  console.log('✅ Leadership & Influence updated: $247, 10 lessons\n')

  // Step 4: Update Digital Marketing Mastery
  console.log('📊 Updating Digital Marketing Mastery Course...')
  await prisma.course.deleteMany({ where: { slug: 'marketing' } })
  
  const marketingCourse = await prisma.course.create({
    data: {
      slug: 'marketing',
      title: 'Digital Marketing Mastery: The Blueprint for Scalable Growth',
      description: 'The data-driven growth frameworks used by Facebook, Netflix, and HubSpot to achieve exponential growth.',
      price: 19700, // $197.00
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/marketing.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: marketingCourse.id,
      title: 'Digital Marketing Mastery: Complete Training',
      description: 'Build a marketing engine that drives predictable, scalable growth',
      order: 1,
      lessons: {
        create: [
          { title: 'The Growth Marketing Mindset', description: 'Shift to a data-driven, experimental approach to growth.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 720, order: 1 },
          { title: 'Deep Customer Psychology & ICP Development', description: 'Develop deep understanding of ideal customer\'s pains, desires, and motivations.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 2 },
          { title: 'Building a World-Class Content Engine', description: 'Create a content strategy that attracts ideal customers and positions you as authority.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 3 },
          { title: 'Mastering SEO & Organic Search', description: 'Drive sustainable flow of free, high-intent traffic.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 4 },
          { title: 'Paid Advertising & Customer Acquisition', description: 'Build and scale profitable paid advertising campaigns.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1020, order: 5 },
          { title: 'The Art of Email Marketing & Automation', description: 'Build powerful email list and create automated sequences.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 840, order: 6 },
          { title: 'Building a Social Media Flywheel', description: 'Use social media to build community, drive engagement, generate leads.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 7 },
          { title: 'Conversion Rate Optimization (CRO) & A/B Testing', description: 'Use data and experimentation to optimize for maximum conversions.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 8 },
          { title: 'Building a Brand That Lasts', description: 'Build a brand people love, trust, and pay premium for.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 840, order: 9 },
          { title: 'The CMO\'s Dashboard: Marketing Analytics & ROI', description: 'Track metrics that matter, measure ROI, communicate results to C-suite.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 780, order: 10 },
        ],
      },
    },
  })
  console.log('✅ Digital Marketing Mastery updated: $197, 10 lessons\n')

  // Step 5: Update Wealth Building
  console.log('💰 Updating Wealth Building Course...')
  await prisma.course.deleteMany({ where: { slug: 'wealth' } })
  
  const wealthCourse = await prisma.course.create({
    data: {
      slug: 'wealth',
      title: 'Wealth Building: The Blueprint for Financial Freedom',
      description: 'The investment strategies used by Warren Buffett, Yale Endowment, and Blackstone to build lasting wealth.',
      price: 19700, // $197.00
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/wealth.jpg',
    },
  })

  await prisma.module.create({
    data: {
      courseId: wealthCourse.id,
      title: 'Wealth Building: Complete Training',
      description: 'Build generational wealth using strategies of the top 1%',
      order: 1,
      lessons: {
        create: [
          { title: 'The Millionaire Mindset: How the Rich Think About Money', description: 'Reprogram your financial thermostat and adopt millionaire beliefs.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 840, order: 1 },
          { title: 'The Art of a High-Income Career & Side Hustles', description: 'Maximize earning potential and build multiple income streams.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 2 },
          { title: 'The 7-Figure Investment Portfolio: Asset Allocation & Diversification', description: 'Build diversified portfolio aligned with risk tolerance and goals.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1080, order: 3 },
          { title: 'Mastering the Stock Market: From Index Funds to Individual Stocks', description: 'Invest in stock market with confidence.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 1020, order: 4 },
          { title: 'Real Estate Investing: From Your First Home to a Rental Empire', description: 'Invest in real estate for passive income, equity, and tax benefits.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 960, order: 5 },
          { title: 'Alternative Investments: The Secrets of the Super Rich', description: 'Explore alternative investments from private equity to crypto.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 6 },
          { title: 'Tax Strategies of the Wealthy: How to Legally Minimize Your Tax Bill', description: 'Learn legal tax strategies to minimize burden and accelerate wealth.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 840, order: 7 },
          { title: 'Estate Planning & Generational Wealth', description: 'Protect assets and create plan to pass wealth to future generations.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 780, order: 8 },
          { title: 'The Psychology of Wealth: Overcoming Your Limiting Beliefs', description: 'Identify and overcome psychological barriers to building wealth.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 720, order: 9 },
          { title: 'The Blueprint for Financial Freedom: Your 10-Year Plan', description: 'Create personalized plan to achieve financial freedom in 10 years.', videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER', duration: 900, order: 10 },
        ],
      },
    },
  })
  console.log('✅ Wealth Building updated: $197, 10 lessons\n')

  console.log('✨ All courses updated successfully!')
  console.log('\n📊 Summary:')
  console.log('- Deleted draft AI-Resistant Skills course')
  console.log('- Sales Mastery: $247, 10 lessons')
  console.log('- Leadership & Influence: $247, 10 lessons')
  console.log('- Digital Marketing Mastery: $197, 10 lessons')
  console.log('- Wealth Building: $197, 10 lessons')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

