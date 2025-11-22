import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Wealth Building course
    const course = await prisma.course.findFirst({
      where: { slug: 'wealth' },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Delete all existing modules and lessons
    await prisma.lesson.deleteMany({
      where: {
        module: {
          courseId: course.id
        }
      }
    });

    await prisma.module.deleteMany({
      where: { courseId: course.id }
    });

    // Placeholder video URLs (to be replaced when videos are uploaded)
    const placeholderUrl = 'https://player.vimeo.com/video/PLACEHOLDER';

    // Create Module 1: Wealth Building Masterclass (10 video lessons)
    await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Wealth Building Masterclass',
        order: 1,
        lessons: {
          create: [
            {
              title: 'The Wealth Mindset: From Scarcity to Abundance',
              description: 'Transform your relationship with money and adopt the mindset of the ultra-wealthy',
              order: 1,
              duration: 9,
              videoUrl: placeholderUrl
            },
            {
              title: 'The All-Weather Portfolio: Ray Dalio\'s Approach',
              description: 'Build a resilient investment portfolio that thrives in any economic environment',
              order: 2,
              duration: 10,
              videoUrl: placeholderUrl
            },
            {
              title: 'The Bogle Method: Index Fund Investing',
              description: 'Master John Bogle\'s passive investing strategy that beats 95% of active managers',
              order: 3,
              duration: 9,
              videoUrl: placeholderUrl
            },
            {
              title: 'Tax Optimization: Keeping More of What You Earn',
              description: 'Legal strategies to minimize taxes and maximize wealth accumulation',
              order: 4,
              duration: 10,
              videoUrl: placeholderUrl
            },
            {
              title: 'Passive Income Streams: Building Wealth While You Sleep',
              description: 'Create multiple income streams that generate cash flow without active work',
              order: 5,
              duration: 9,
              videoUrl: placeholderUrl
            },
            {
              title: 'Real Estate Investing: The BRRRR Method',
              description: 'Buy, Rehab, Rent, Refinance, Repeat - build a real estate empire with minimal capital',
              order: 6,
              duration: 10,
              videoUrl: placeholderUrl
            },
            {
              title: 'Wealth Acceleration: The Fastlane Approach',
              description: 'MJ DeMarco\'s framework for building wealth rapidly through entrepreneurship',
              order: 7,
              duration: 9,
              videoUrl: placeholderUrl
            },
            {
              title: 'Protecting Your Wealth: Asset Protection & Estate Planning',
              description: 'Safeguard your assets from lawsuits, taxes, and creditors',
              order: 8,
              duration: 10,
              videoUrl: placeholderUrl
            },
            {
              title: 'The Psychology of Wealth: Behavioral Finance',
              description: 'Avoid the cognitive biases that destroy wealth and make better financial decisions',
              order: 9,
              duration: 9,
              videoUrl: placeholderUrl
            },
            {
              title: 'Financial Independence & Early Retirement (FIRE)',
              description: 'Calculate your FIRE number and create a roadmap to financial freedom',
              order: 10,
              duration: 10,
              videoUrl: placeholderUrl
            }
          ]
        }
      }
    });

    // Create Module 2: Wealth Building Toolkit (5 PDF resources)
    await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Wealth Building Toolkit',
        order: 2,
        lessons: {
          create: [
            {
              title: 'The Complete Wealth Building Blueprint',
              description: '50+ page comprehensive guide with all frameworks and strategies (Coming Soon)',
              order: 1,
              duration: 0,
              videoUrl: '/downloads/Wealth-Building-Blueprint-PLACEHOLDER.pdf'
            },
            {
              title: 'Wealth Framework Templates',
              description: 'Ready-to-use templates for portfolio tracking, FIRE calculations, and more (Coming Soon)',
              order: 2,
              duration: 0,
              videoUrl: '/downloads/Wealth-Framework-Templates-PLACEHOLDER.pdf'
            },
            {
              title: 'Progress Tracker',
              description: '90-day wealth building action tracker (Coming Soon)',
              order: 3,
              duration: 0,
              videoUrl: '/downloads/Wealth-Progress-Tracker-PLACEHOLDER.pdf'
            },
            {
              title: 'Quick Reference Guide',
              description: 'Cheat sheets for all wealth building frameworks and formulas (Coming Soon)',
              order: 4,
              duration: 0,
              videoUrl: '/downloads/Wealth-Quick-Reference-PLACEHOLDER.pdf'
            },
            {
              title: 'Resource List',
              description: 'Curated books, tools, platforms, and communities for wealth builders (Coming Soon)',
              order: 5,
              duration: 0,
              videoUrl: '/downloads/Wealth-Resource-List-PLACEHOLDER.pdf'
            }
          ]
        }
      }
    });

    return NextResponse.json({ 
      message: 'Wealth Building course structure fixed successfully!',
      courseId: course.id,
      modulesCreated: 2,
      lessonsCreated: 15
    });
  } catch (error) {
    console.error('Error fixing Wealth Building structure:', error);
    return NextResponse.json({ error: 'Failed to fix course structure' }, { status: 500 });
  }
}
