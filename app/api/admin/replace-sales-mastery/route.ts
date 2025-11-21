import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('🔄 Replacing Sales Mastery Course with complete version...')

    // Delete existing Sales Mastery course completely
    const existingCourse = await prisma.course.findUnique({
      where: { slug: 'sales' }
    })

    if (existingCourse) {
      console.log('🗑️  Deleting existing Sales Mastery course...')
      await prisma.course.delete({
        where: { slug: 'sales' }
      })
      console.log('✅ Old course deleted')
    }

    // Create the new complete course
    console.log('🌱 Creating new Sales Mastery course with 10 lessons...')
    
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

    // Create module with all 10 lessons and Vimeo videos
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
              videoUrl: 'https://player.vimeo.com/video/1139206134',
              duration: 300,
              order: 1,
            },
            {
              title: 'The Art of Prospecting & Pipeline Mastery',
              description: 'Build a predictable pipeline using the Predictable Revenue model from Salesforce. Master ICP Framework, Aaron Ross\'s prospecting system, LinkedIn Executive Engagement, and SNAP Selling principles.',
              videoUrl: 'https://player.vimeo.com/video/1139206584',
              duration: 300,
              order: 2,
            },
            {
              title: 'Mastering the First 60 Seconds & Building Instant Credibility',
              description: 'Capture attention, build rapport, and establish authority in the first minute. Learn the Authority Jack, 3-Second Rule, Pattern Interrupt, and Executive Presence Framework.',
              videoUrl: 'https://player.vimeo.com/video/1139206924',
              duration: 300,
              order: 3,
            },
            {
              title: 'MEDDPICC - The Enterprise Sales Qualification System',
              description: 'Master the gold-standard qualification framework used by Salesforce, MongoDB, and elite SaaS companies. Learn all 8 components: Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition.',
              videoUrl: 'https://player.vimeo.com/video/1139207182',
              duration: 300,
              order: 4,
            },
            {
              title: 'Discovery That Uncovers Deep Pain - SPIN & Challenger Approach',
              description: 'Go beyond surface-level needs using SPIN Selling (Neil Rackham) and Challenger Sale (CEB/Gartner). Master Situation, Problem, Implication, Need-Payoff questions plus Teach, Tailor, Take Control methodology.',
              videoUrl: 'https://player.vimeo.com/video/1139207453',
              duration: 300,
              order: 5,
            },
            {
              title: 'The Value Proposition & Business Case That Makes You the Only Choice',
              description: 'Craft compelling value propositions and business cases like McKinsey consultants. Learn UVP Formula, 3 Tiers of Value, McKinsey Business Case Framework, and Risk Reversal Framework.',
              videoUrl: 'https://player.vimeo.com/video/1139207693',
              duration: 300,
              order: 6,
            },
            {
              title: 'The Demo That Sells Itself',
              description: 'Deliver product demonstrations that are so compelling, prospects sell themselves. Master "Day in the Life" Demo, 80/20 Rule of Demos, Micro-Closing Technique, and Challenger Teaching Moments.',
              videoUrl: 'https://player.vimeo.com/video/1139207943',
              duration: 300,
              order: 7,
            },
            {
              title: 'Objection Handling That Builds Trust',
              description: 'Welcome objections as opportunities to build trust. Learn LAER Model, Price-to-Value Reframe, Objection Matrix, and Sandler Pain Funnel to handle any objection with confidence.',
              videoUrl: 'https://player.vimeo.com/video/1139208192',
              duration: 300,
              order: 8,
            },
            {
              title: 'Closing & Negotiation - Strategies from the World\'s Best',
              description: 'Master closing and negotiation without high-pressure tactics. Learn 3 Types of Closes, "If-Then" Close, Harvard Negotiation Project Framework, Power of the Pause, 3 Levers of Negotiation, and Post-Close Framework.',
              videoUrl: 'https://player.vimeo.com/video/1139208479',
              duration: 300,
              order: 9,
            },
            {
              title: 'Building a Predictable Revenue Engine',
              description: 'Build systems to scale sales success and create predictable revenue. Master Predictable Revenue Model (Aaron Ross), Sales Acceleration Formula (Mark Roberge), Sales Playbook, 4 Key Sales Metrics, and Flywheel Model.',
              videoUrl: 'https://player.vimeo.com/video/1139208768',
              duration: 300,
              order: 10,
            },
          ],
        },
      },
    })

    console.log(`✅ Module created with 10 lessons`)
    console.log('🎯 Sales Mastery course replaced successfully!')

    return NextResponse.json({
      success: true,
      message: 'Sales Mastery course replaced successfully with all 10 lessons and Vimeo videos',
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: '$' + (course.price / 100),
        lessonCount: 10,
        totalDuration: '50 minutes'
      },
      lessons: [
        '1. The $10M+ Sales Mindset',
        '2. The Art of Prospecting & Pipeline Mastery',
        '3. Mastering the First 60 Seconds & Building Instant Credibility',
        '4. MEDDPICC - The Enterprise Sales Qualification System',
        '5. Discovery That Uncovers Deep Pain - SPIN & Challenger Approach',
        '6. The Value Proposition & Business Case That Makes You the Only Choice',
        '7. The Demo That Sells Itself',
        '8. Objection Handling That Builds Trust',
        '9. Closing & Negotiation - Strategies from the World\'s Best',
        '10. Building a Predictable Revenue Engine'
      ]
    })
  } catch (error) {
    console.error('❌ Error replacing Sales Mastery:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
