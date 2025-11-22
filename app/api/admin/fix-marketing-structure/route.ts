import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Digital Marketing course
    const course = await prisma.course.findFirst({
      where: { slug: 'marketing' },
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

    // Vimeo video URLs for Digital Marketing
    const videoUrls = [
      'https://player.vimeo.com/video/1034959562',
      'https://player.vimeo.com/video/1034959661',
      'https://player.vimeo.com/video/1034959724',
      'https://player.vimeo.com/video/1034959792',
      'https://player.vimeo.com/video/1034959842',
      'https://player.vimeo.com/video/1034959892',
      'https://player.vimeo.com/video/1034959944',
      'https://player.vimeo.com/video/1034959992',
      'https://player.vimeo.com/video/1034960042',
      'https://player.vimeo.com/video/1034960102'
    ];

    // Create new modules with correct structure
    await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Growth Engineering Masterclass',
        order: 1,
        lessons: {
          create: [
            {
              title: 'Growth Engineering vs. Traditional Marketing',
              description: 'Why traditional marketing is dead and how growth engineering builds unicorns',
              order: 1,
              duration: 8,
              videoUrl: videoUrls[0]
            },
            {
              title: 'The AARRR Pirate Metrics Framework',
              description: 'Master the 5-stage funnel used by Airbnb, Uber, and Dropbox to optimize every step of the customer journey',
              order: 2,
              duration: 10,
              videoUrl: videoUrls[1]
            },
            {
              title: 'The Viral Loop: Engineering Word-of-Mouth',
              description: 'Learn how to engineer viral growth like Dropbox, Hotmail, and PayPal through exponential user referrals',
              order: 3,
              duration: 9,
              videoUrl: videoUrls[2]
            },
            {
              title: 'The Hook Model: Making Products Addictive',
              description: 'Master Nir Eyal\'s Hook Model to create habit-forming products using the 4-step cycle used by Facebook and Instagram',
              order: 4,
              duration: 10,
              videoUrl: videoUrls[3]
            },
            {
              title: 'Content Marketing That Converts',
              description: 'Build a content marketing engine that drives qualified leads and revenue using HubSpot\'s proven playbook',
              order: 5,
              duration: 9,
              videoUrl: videoUrls[4]
            },
            {
              title: 'Paid Acquisition: Facebook, Google, LinkedIn',
              description: 'Master paid advertising across the three most powerful platforms and scale customer acquisition profitably',
              order: 6,
              duration: 8,
              videoUrl: videoUrls[5]
            },
            {
              title: 'Email Marketing & Marketing Automation',
              description: 'Build automated email sequences that nurture leads and drive conversions on autopilot',
              order: 7,
              duration: 10,
              videoUrl: videoUrls[6]
            },
            {
              title: 'Conversion Rate Optimization (CRO)',
              description: 'Systematically increase conversion rates at every funnel stage using A/B testing and behavioral psychology',
              order: 8,
              duration: 9,
              videoUrl: videoUrls[7]
            },
            {
              title: 'Data-Driven Marketing & Analytics',
              description: 'Master Google Analytics, cohort analysis, and attribution modeling to make data-driven decisions',
              order: 9,
              duration: 10,
              videoUrl: videoUrls[8]
            },
            {
              title: 'The Future of Marketing: AI & Automation',
              description: 'Leverage AI tools and marketing automation to 10x your output and stay ahead of the competition',
              order: 10,
              duration: 8,
              videoUrl: videoUrls[9]
            }
          ]
        }
      }
    });

    await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Digital Marketing Toolkit',
        order: 2,
        lessons: {
          create: [
            {
              title: 'The Growth Engineering Playbook',
              description: '50+ page workbook with frameworks, templates, and exercises',
              order: 1,
              duration: 0,
              videoUrl: '/downloads/Digital-Marketing-Playbook.pdf'
            },
            {
              title: 'Marketing Framework Templates',
              description: 'Ready-to-use templates for AARRR metrics, viral loops, and growth experiments',
              order: 2,
              duration: 0,
              videoUrl: '/downloads/Digital-Marketing-Framework-Templates.pdf'
            },
            {
              title: 'Progress Tracker',
              description: '90-day marketing skill development tracker',
              order: 3,
              duration: 0,
              videoUrl: '/downloads/Digital-Marketing-Progress-Tracker.pdf'
            },
            {
              title: 'Quick Reference Guide',
              description: 'Cheat sheets and quick-reference templates for all growth frameworks',
              order: 4,
              duration: 0,
              videoUrl: '/downloads/Doc4-Digital-Marketing-Quick-Reference-Guide.pdf'
            },
            {
              title: 'Resource List',
              description: 'Curated tools, books, platforms, and communities for growth marketers',
              order: 5,
              duration: 0,
              videoUrl: '/downloads/Doc5-Digital-Marketing-Resource-List.pdf'
            }
          ]
        }
      }
    });

    return NextResponse.json({ 
      message: 'Digital Marketing course structure fixed successfully!',
      courseId: course.id,
      modulesCreated: 2,
      lessonsCreated: 15
    });
  } catch (error) {
    console.error('Error fixing Digital Marketing structure:', error);
    return NextResponse.json({ error: 'Failed to fix course structure' }, { status: 500 });
  }
}
