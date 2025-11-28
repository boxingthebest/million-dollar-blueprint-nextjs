import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Course 1: AI-Resistant Skills
  const aiCourse = await prisma.course.upsert({
    where: { slug: 'ai-resistant-skills' },
    update: {},
    create: {
      slug: 'ai-resistant-skills',
      title: '5 Skills AI Can\'t Replace',
      description: 'Master the executive skills that AI will never replace. Learn systems thinking, relationship building, and strategic influence.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'AI-Resistant Skills Module',
            description: 'Core executive skills for the AI age',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'The Executive Intelligence Framework',
                  description: 'Master the foundational framework for executive-level thinking',
                  videoUrl: 'https://vimeo.com/1129374864',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'Systems Thinking Mastery',
                  description: 'Learn to see the big picture and connect the dots',
                  videoUrl: 'https://vimeo.com/1129414459',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'The Goldman Sachs Relationship Framework',
                  description: 'Build strategic relationships that accelerate your career',
                  videoUrl: 'https://vimeo.com/1129414824',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'Influence Without Authority',
                  description: 'Lead and influence without formal power',
                  videoUrl: 'https://vimeo.com/1129415144',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'The Apple Innovation Process',
                  description: 'Think like Apple: innovation frameworks that work',
                  videoUrl: 'https://vimeo.com/1129415414',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'First Principles Thinking',
                  description: 'Break down complex problems like Elon Musk',
                  videoUrl: 'https://vimeo.com/1129415885',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'Amazon\'s Leadership Principles in Action',
                  description: 'Apply Amazon\'s proven leadership framework',
                  videoUrl: 'https://vimeo.com/1129416093',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Building Trust at Scale',
                  description: 'Create trust across teams and organizations',
                  videoUrl: 'https://vimeo.com/1129416368',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'The 10X Learning System',
                  description: 'Accelerate your learning and skill development',
                  videoUrl: 'https://vimeo.com/1129416625',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'Your 90-Day Career Action Plan',
                  description: 'Create your personalized roadmap to executive success',
                  videoUrl: 'https://vimeo.com/1129416936',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Course 2: Executive Energy System
  const energyCourse = await prisma.course.upsert({
    where: { slug: 'executive-energy-system' },
    update: {},
    create: {
      slug: 'executive-energy-system',
      title: 'The Executive Energy System™',
      description: 'Optimize your energy, health, and performance for sustained executive success.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Executive Energy Module',
            description: 'Peak performance through energy optimization',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'The Executive Energy Framework',
                  description: 'Foundation for sustainable high performance',
                  videoUrl: 'https://vimeo.com/1138978464',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'Sleep Optimization for Peak Performance',
                  description: 'Master the science of executive-level sleep',
                  videoUrl: 'https://vimeo.com/1138978870',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'The Executive Nutrition Protocol',
                  description: 'Fuel your body for mental clarity and energy',
                  videoUrl: 'https://vimeo.com/1138979171',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'High-Performance Movement',
                  description: 'Exercise strategies for busy executives',
                  videoUrl: 'https://vimeo.com/1138979503',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'Stress Management & Resilience',
                  description: 'Build unshakeable mental resilience',
                  videoUrl: 'https://vimeo.com/1138979794',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'The Recovery Advantage',
                  description: 'Strategic recovery for sustained performance',
                  videoUrl: 'https://vimeo.com/1138980093',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'Mental Clarity & Focus Optimization',
                  description: 'Sharpen your cognitive edge',
                  videoUrl: 'https://vimeo.com/1138980353',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Building Sustainable Habits',
                  description: 'Create habits that stick for life',
                  videoUrl: 'https://vimeo.com/1138980596',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'The Energy Audit',
                  description: 'Identify and eliminate energy drains',
                  videoUrl: 'https://vimeo.com/1138980851',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'Your 30-Day Energy Transformation',
                  description: 'Implement your personalized energy system',
                  videoUrl: 'https://vimeo.com/1138981119',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Course 3: Sales Mastery
  const salesCourse = await prisma.course.upsert({
    where: { slug: 'sales-mastery' },
    update: {},
    create: {
      slug: 'sales-mastery',
      title: 'Sales Mastery',
      description: 'Master enterprise sales frameworks used by top performers at Fortune 500 companies.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Sales Mastery Module',
            description: 'Enterprise sales frameworks and strategies',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'The Revenue Architect\'s Mindset',
                  description: 'Think like a top 1% sales performer',
                  videoUrl: 'https://vimeo.com/1139206134',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'The MEDDPICC Enterprise Sales Framework',
                  description: 'Master the gold standard of enterprise sales',
                  videoUrl: 'https://vimeo.com/1139206584',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'SPIN Selling: The Question Framework',
                  description: 'Ask questions that close deals',
                  videoUrl: 'https://vimeo.com/1139206924',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'The Challenger Sale 2.0',
                  description: 'Challenge customers to think differently',
                  videoUrl: 'https://vimeo.com/1139207182',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'Building Your Predictive Pipeline',
                  description: 'Create a revenue machine that scales',
                  videoUrl: 'https://vimeo.com/1139207453',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'The Trusted Advisor Blueprint',
                  description: 'Become the go-to expert in your space',
                  videoUrl: 'https://vimeo.com/1139207693',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'Negotiation Mastery: The Chris Voss Method',
                  description: 'FBI negotiation tactics for business',
                  videoUrl: 'https://vimeo.com/1139207943',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Closing Techniques That Actually Work',
                  description: 'Close deals without being pushy',
                  videoUrl: 'https://vimeo.com/1139208192',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'The Science of Scale: Building a Sales Machine',
                  description: 'Scale your sales process systematically',
                  videoUrl: 'https://vimeo.com/1139208479',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'The Future of Sales: AI-Resistant Skills',
                  description: 'Stay ahead in the age of AI',
                  videoUrl: 'https://vimeo.com/1139208768',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Course 4: Leadership & Influence
  const leadershipCourse = await prisma.course.upsert({
    where: { slug: 'leadership-influence' },
    update: {},
    create: {
      slug: 'leadership-influence',
      title: 'Leadership & Influence',
      description: 'Develop the leadership skills to inspire teams and drive organizational change.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Leadership & Influence Module',
            description: 'Executive leadership and influence mastery',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'The Leadership Mindset Shift',
                  description: 'Transform from manager to leader',
                  videoUrl: 'https://vimeo.com/1139435783',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'Emotional Intelligence for Leaders',
                  description: 'Lead with EQ, not just IQ',
                  videoUrl: 'https://vimeo.com/1139437295',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'Building High-Performing Teams',
                  description: 'Create teams that deliver exceptional results',
                  videoUrl: 'https://vimeo.com/1139437895',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'Strategic Communication & Influence',
                  description: 'Communicate with impact and influence',
                  videoUrl: 'https://vimeo.com/1139438594',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'Decision-Making Under Pressure',
                  description: 'Make better decisions faster',
                  videoUrl: 'https://vimeo.com/1139439499',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'Conflict Resolution & Difficult Conversations',
                  description: 'Navigate conflict with confidence',
                  videoUrl: 'https://vimeo.com/1139459532',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'Delegation & Empowerment',
                  description: 'Scale yourself through others',
                  videoUrl: 'https://vimeo.com/1139460301',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Building Trust & Credibility',
                  description: 'Earn trust and respect as a leader',
                  videoUrl: 'https://vimeo.com/1139461940',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'Change Management & Transformation',
                  description: 'Lead organizational change successfully',
                  videoUrl: 'https://vimeo.com/1139463010',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'Your Leadership Legacy',
                  description: 'Define and build your leadership legacy',
                  videoUrl: 'https://vimeo.com/1139463757',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Course 5: Digital Marketing Mastery
  const marketingCourse = await prisma.course.upsert({
    where: { slug: 'digital-marketing-mastery' },
    update: {},
    create: {
      slug: 'digital-marketing-mastery',
      title: 'Digital Marketing Mastery',
      description: 'Master growth engineering and data-driven marketing strategies that scale.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Digital Marketing Module',
            description: 'Growth engineering and marketing mastery',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Growth Engineering vs. Traditional Marketing',
                  description: 'Think like a growth engineer, not a marketer',
                  videoUrl: 'https://vimeo.com/1139647563',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'The AARRR Pirate Metrics Framework',
                  description: 'Measure what matters for growth',
                  videoUrl: 'https://vimeo.com/1139648310',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'The Viral Loop: Engineering Word-of-Mouth',
                  description: 'Create products that sell themselves',
                  videoUrl: 'https://vimeo.com/1139648726',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'The Hook Model: Making Products Addictive',
                  description: 'Build habit-forming products',
                  videoUrl: 'https://vimeo.com/1139649353',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'Content Marketing That Converts',
                  description: 'Create content that drives revenue',
                  videoUrl: 'https://vimeo.com/1139651015',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'Paid Acquisition: Facebook, Google, LinkedIn',
                  description: 'Master paid advertising at scale',
                  videoUrl: 'https://vimeo.com/1139651575',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'Email Marketing & Marketing Automation',
                  description: 'Build automated revenue machines',
                  videoUrl: 'https://vimeo.com/1139651952',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Conversion Rate Optimization (CRO)',
                  description: 'Turn more visitors into customers',
                  videoUrl: 'https://vimeo.com/1139652274',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'Data-Driven Marketing & Analytics',
                  description: 'Make decisions based on data, not opinions',
                  videoUrl: 'https://vimeo.com/1139653488',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'The Future of Marketing: AI & Automation',
                  description: 'Leverage AI to 10x your marketing',
                  videoUrl: 'https://vimeo.com/1139654565',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Course 6: Wealth Building
  const wealthCourse = await prisma.course.upsert({
    where: { slug: 'wealth-building' },
    update: {},
    create: {
      slug: 'wealth-building',
      title: 'Wealth Building',
      description: 'Build lasting wealth through proven investment strategies and financial planning.',
      price: 39700,
      isFree: false,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Wealth Building Module',
            description: 'Financial independence and wealth creation',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'The Wealth Mindset: From Earner to Builder',
                  description: 'Shift from earning to building wealth',
                  videoUrl: 'https://vimeo.com/1139907727',
                  duration: 15,
                  order: 1,
                },
                {
                  title: 'The All-Weather Portfolio (Ray Dalio)',
                  description: 'Build a portfolio that works in any economy',
                  videoUrl: 'https://vimeo.com/1139859075',
                  duration: 15,
                  order: 2,
                },
                {
                  title: 'Index Fund Investing: The Bogle Method',
                  description: 'Simple, proven wealth building through index funds',
                  videoUrl: 'https://vimeo.com/1139859347',
                  duration: 15,
                  order: 3,
                },
                {
                  title: 'Tax Optimization: Keeping What You Earn',
                  description: 'Legal strategies to minimize taxes',
                  videoUrl: 'https://vimeo.com/1139907974',
                  duration: 15,
                  order: 4,
                },
                {
                  title: 'Building Passive Income Machines',
                  description: 'Create income streams that work while you sleep',
                  videoUrl: 'https://vimeo.com/1139859532',
                  duration: 15,
                  order: 5,
                },
                {
                  title: 'Real Estate Wealth Building',
                  description: 'Build wealth through strategic real estate',
                  videoUrl: 'https://vimeo.com/1139908147',
                  duration: 15,
                  order: 6,
                },
                {
                  title: 'The Wealth Acceleration Formula',
                  description: 'Compound your wealth faster',
                  videoUrl: 'https://vimeo.com/1139908322',
                  duration: 15,
                  order: 7,
                },
                {
                  title: 'Protecting Your Wealth: Risk Management',
                  description: 'Protect what you\'ve built',
                  videoUrl: 'https://vimeo.com/1139908441',
                  duration: 15,
                  order: 8,
                },
                {
                  title: 'The Psychology of Wealth: Avoiding Self-Sabotage',
                  description: 'Master the mental game of wealth',
                  videoUrl: 'https://vimeo.com/1139908855',
                  duration: 15,
                  order: 9,
                },
                {
                  title: 'The Path to Financial Independence (FIRE)',
                  description: 'Achieve financial freedom faster',
                  videoUrl: 'https://vimeo.com/1139858578',
                  duration: 15,
                  order: 10,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Created courses:', {
    aiCourse: aiCourse.slug,
    energyCourse: energyCourse.slug,
    salesCourse: salesCourse.slug,
    leadershipCourse: leadershipCourse.slug,
    marketingCourse: marketingCourse.slug,
    wealthCourse: wealthCourse.slug,
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
