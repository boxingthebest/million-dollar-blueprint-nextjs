import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Check if course already exists
    const existingCourse = await prisma.course.findFirst({
      where: { slug: 'wealth' }
    });

    if (existingCourse) {
      return NextResponse.json({ 
        message: 'Wealth Building course already exists',
        courseId: existingCourse.id
      });
    }

    // Placeholder video URLs (to be updated when videos are uploaded to Vimeo)
    const videoUrls = [
      'https://player.vimeo.com/video/PLACEHOLDER1', // Lesson 1: The Wealth Mindset
      'https://player.vimeo.com/video/PLACEHOLDER2', // Lesson 2: All-Weather Portfolio
      'https://player.vimeo.com/video/PLACEHOLDER3', // Lesson 3: Index Fund Investing
      'https://player.vimeo.com/video/PLACEHOLDER4', // Lesson 4: Tax Optimization
      'https://player.vimeo.com/video/PLACEHOLDER5', // Lesson 5: Passive Income Machines
      'https://player.vimeo.com/video/PLACEHOLDER6', // Lesson 6: Real Estate Wealth
      'https://player.vimeo.com/video/PLACEHOLDER7', // Lesson 7: Wealth Acceleration Formula
      'https://player.vimeo.com/video/PLACEHOLDER8', // Lesson 8: Protecting Your Wealth
      'https://player.vimeo.com/video/PLACEHOLDER9', // Lesson 9: Psychology of Wealth
      'https://player.vimeo.com/video/PLACEHOLDER10' // Lesson 10: FIRE
    ];

    // Create course with modules and lessons
    const course = await prisma.course.create({
      data: {
        title: 'Wealth Building: Wall Street Insider Strategies',
        slug: 'wealth',
        description: 'Master the wealth-building strategies used by Wall Street insiders, from Ray Dalio\'s All-Weather Portfolio to the FIRE movement',
        price: 247,
        isPublished: true,
        modules: {
          create: [
            {
              title: 'Wealth Building Masterclass',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'The Wealth Mindset: From Earner to Builder',
                    description: 'Learn Naval Ravikant\'s 4 types of leverage and Warren Buffett\'s compounding principles to shift from earning to building wealth',
                    order: 1,
                    duration: 5,
                    videoUrl: videoUrls[0]
                  },
                  {
                    title: 'The All-Weather Portfolio (Ray Dalio)',
                    description: 'Master Ray Dalio\'s Bridgewater Associates framework for building a portfolio that performs in all economic environments',
                    order: 2,
                    duration: 5,
                    videoUrl: videoUrls[1]
                  },
                  {
                    title: 'Index Fund Investing: The Bogle Method',
                    description: 'Learn John Bogle\'s 3-Fund Portfolio strategy and why 90% of active funds underperform simple index investing',
                    order: 3,
                    duration: 5,
                    videoUrl: videoUrls[2]
                  },
                  {
                    title: 'Tax Optimization: Keeping What You Earn',
                    description: 'Master Tax Alpha strategies including Roth IRAs, HSAs, backdoor conversions, and real estate tax advantages',
                    order: 4,
                    duration: 5,
                    videoUrl: videoUrls[3]
                  },
                  {
                    title: 'Building Passive Income Machines',
                    description: 'Learn MJ DeMarco\'s 4 pillars of passive income: rental systems, content systems, distribution systems, and investment systems',
                    order: 5,
                    duration: 5,
                    videoUrl: videoUrls[4]
                  },
                  {
                    title: 'Real Estate Wealth Building',
                    description: 'Master the BRRRR method, 1% Rule, and real estate crowdfunding platforms to build wealth through property',
                    order: 6,
                    duration: 5,
                    videoUrl: videoUrls[5]
                  },
                  {
                    title: 'The Wealth Acceleration Formula',
                    description: 'Learn why you can\'t save your way to wealth and how to accelerate income through 10x thinking',
                    order: 7,
                    duration: 5,
                    videoUrl: videoUrls[6]
                  },
                  {
                    title: 'Protecting Your Wealth: Risk Management',
                    description: 'Master the 3 pillars of wealth protection: insurance, estate planning, and asset protection structures',
                    order: 8,
                    duration: 5,
                    videoUrl: videoUrls[7]
                  },
                  {
                    title: 'The Psychology of Wealth: Avoiding Self-Sabotage',
                    description: 'Learn about the Hedonic Treadmill, lifestyle inflation, and Bill Perkins\' "Die With Zero" philosophy',
                    order: 9,
                    duration: 5,
                    videoUrl: videoUrls[8]
                  },
                  {
                    title: 'The Path to Financial Independence (FIRE)',
                    description: 'Master the 4% Rule and learn about LeanFIRE, FatFIRE, and CoastFIRE strategies for early retirement',
                    order: 10,
                    duration: 5,
                    videoUrl: videoUrls[9]
                  }
                ]
              }
            },
            {
              title: 'Wealth Building Toolkit',
              order: 2,
              lessons: {
                create: [
                  {
                    title: 'The Complete Wealth Building Blueprint',
                    description: '50+ page workbook with frameworks, templates, and exercises (Coming Soon)',
                    order: 1,
                    duration: 0,
                    videoUrl: '/downloads/Wealth-Building-Blueprint.pdf'
                  },
                  {
                    title: 'Wealth Framework Templates',
                    description: 'Ready-to-use templates for portfolio allocation, FIRE calculations, and wealth tracking (Coming Soon)',
                    order: 2,
                    duration: 0,
                    videoUrl: '/downloads/Wealth-Framework-Templates.pdf'
                  },
                  {
                    title: 'Wealth Progress Tracker',
                    description: '90-day wealth building progress tracker (Coming Soon)',
                    order: 3,
                    duration: 0,
                    videoUrl: '/downloads/Wealth-Progress-Tracker.pdf'
                  },
                  {
                    title: 'Wealth Quick Reference Guide',
                    description: 'Cheat sheets and quick-reference templates for all wealth frameworks (Coming Soon)',
                    order: 4,
                    duration: 0,
                    videoUrl: '/downloads/Wealth-Quick-Reference.pdf'
                  },
                  {
                    title: 'Wealth Resource List',
                    description: 'Curated tools, books, platforms, and communities for wealth builders (Coming Soon)',
                    order: 5,
                    duration: 0,
                    videoUrl: '/downloads/Wealth-Resource-List.pdf'
                  }
                ]
              }
            }
          ]
        }
      }
    });

    return NextResponse.json({ 
      message: 'Wealth Building course created successfully!',
      courseId: course.id
    });
  } catch (error) {
    console.error('Error creating Wealth Building course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
