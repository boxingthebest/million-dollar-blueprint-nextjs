import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Sales Mastery Course (Updated with MEDDPICC)...')

  // Delete existing course if it exists to start fresh
  await prisma.course.deleteMany({
    where: { slug: 'sales' }
  })

  // Create the course
  const course = await prisma.course.create({
    data: {
      slug: 'sales',
      title: 'Sales Mastery: The Blueprint for High-Ticket Closing',
      description: 'Master MEDDPICC, SPIN & Challenger Sale - the exact frameworks used by Salesforce, MongoDB, and IBM to close multi-million dollar enterprise deals.',
      price: 24700, // $247.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/sales.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  // Since we're using 10 individual lessons (not modules), create a single module to hold them
  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Sales Mastery: Complete Training',
      description: 'Master the elite sales frameworks used by Fortune 100 companies',
      order: 1,
      lessons: {
        create: [
          {
            title: 'The $10M+ Sales Mindset',
            description: 'Reprogram your beliefs about selling, money, and value to develop the unshakable confidence of an elite closer. Learn the Abundance Framework, Value Equation, and 4 Pillars of Sales Confidence.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 720, // 12 minutes in seconds
            order: 1,
          },
          {
            title: 'The Art of Prospecting & Pipeline Mastery',
            description: 'Build a predictable pipeline using the Predictable Revenue model from Salesforce. Master ICP Framework, Aaron Ross\'s prospecting system, LinkedIn Executive Engagement, and SNAP Selling principles.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 2,
          },
          {
            title: 'Mastering the First 60 Seconds & Building Instant Credibility',
            description: 'Capture attention, build rapport, and establish authority in the first minute. Learn the Authority Jack, 3-Second Rule, Pattern Interrupt, and Executive Presence Framework.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 600, // 10 minutes
            order: 3,
          },
          {
            title: 'MEDDPICC - The Enterprise Sales Qualification System',
            description: 'Master the gold-standard qualification framework used by Salesforce, MongoDB, and elite SaaS companies. Learn all 8 components: Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1500, // 25 minutes
            order: 4,
          },
          {
            title: 'Discovery That Uncovers Deep Pain - SPIN & Challenger Approach',
            description: 'Go beyond surface-level needs using SPIN Selling (Neil Rackham) and Challenger Sale (CEB/Gartner). Master Situation, Problem, Implication, Need-Payoff questions plus Teach, Tailor, Take Control methodology.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1320, // 22 minutes
            order: 5,
          },
          {
            title: 'The Value Proposition & Business Case That Makes You the Only Choice',
            description: 'Craft compelling value propositions and business cases like McKinsey consultants. Learn UVP Formula, 3 Tiers of Value, McKinsey Business Case Framework, and Risk Reversal Framework.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 6,
          },
          {
            title: 'The Demo That Sells Itself',
            description: 'Deliver product demonstrations that are so compelling, prospects sell themselves. Master "Day in the Life" Demo, 80/20 Rule of Demos, Micro-Closing Technique, and Challenger Teaching Moments.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 7,
          },
          {
            title: 'Objection Handling That Builds Trust',
            description: 'Welcome objections as opportunities to build trust. Learn LAER Model, Price-to-Value Reframe, Objection Matrix, and Sandler Pain Funnel to handle any objection with confidence.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 8,
          },
          {
            title: 'Closing & Negotiation - Strategies from the World\'s Best',
            description: 'Master closing and negotiation without high-pressure tactics. Learn 3 Types of Closes, "If-Then" Close, Harvard Negotiation Project Framework, Power of the Pause, 3 Levers of Negotiation, and Post-Close Framework.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1200, // 20 minutes
            order: 9,
          },
          {
            title: 'Building a Predictable Revenue Engine',
            description: 'Build systems to scale sales success and create predictable revenue. Master Predictable Revenue Model (Aaron Ross), Sales Acceleration Formula (Mark Roberge), Sales Playbook, 4 Key Sales Metrics, and Flywheel Model.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 10,
          },
        ],
      },
    },
  })

  console.log(`✅ Module created with 10 lessons (210 minutes total)`)
  console.log('🎯 Sales Mastery course updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

