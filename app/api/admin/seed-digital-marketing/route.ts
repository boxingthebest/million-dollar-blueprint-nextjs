import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Check if course already exists
    const existingCourse = await prisma.course.findFirst({
      where: { slug: 'marketing' }
    });

    if (existingCourse) {
      return NextResponse.json({ 
        message: 'Digital Marketing Mastery course already exists',
        courseId: existingCourse.id
      });
    }

    // Vimeo video URLs
    const videoUrls = [
      'https://player.vimeo.com/video/1139647563',
      'https://player.vimeo.com/video/1139648310',
      'https://player.vimeo.com/video/1139648726',
      'https://player.vimeo.com/video/1139649353',
      'https://player.vimeo.com/video/1139651015',
      'https://player.vimeo.com/video/1139651575',
      'https://player.vimeo.com/video/1139651952',
      'https://player.vimeo.com/video/1139652274',
      'https://player.vimeo.com/video/1139653488',
      'https://player.vimeo.com/video/1139654565'
    ];

    // Create course with modules and lessons
    const course = await prisma.course.create({
      data: {
        title: 'Digital Marketing Mastery: The Growth Engineering Playbook',
        slug: 'marketing',
        description: 'Master growth engineering, viral loops, and data-driven marketing strategies used by Silicon Valley\'s fastest-growing companies',
        price: 247,
        isPublished: true,
        modules: {
          create: [
            {
              title: 'Digital Marketing Mastery: Complete Training',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'Growth Engineering vs. Traditional Marketing',
                    description: 'Discover why traditional marketing is dead and how growth engineering is revolutionizing customer acquisition',
                    order: 1,
                    duration: 5,
                    videoUrl: videoUrls[0]
                  },
                  {
                    title: 'The AARRR Pirate Metrics Framework',
                    description: 'Master the AARRR framework (Acquisition, Activation, Retention, Revenue, Referral) used by Silicon Valley\'s fastest-growing companies',
                    order: 2,
                    duration: 5,
                    videoUrl: videoUrls[1]
                  },
                  {
                    title: 'The Viral Loop: Engineering Word-of-Mouth',
                    description: 'Learn how to engineer viral growth like Dropbox, Hotmail, and PayPal through exponential user referrals',
                    order: 3,
                    duration: 5,
                    videoUrl: videoUrls[2]
                  },
                  {
                    title: 'The Hook Model: Making Products Addictive',
                    description: 'Master Nir Eyal\'s Hook Model to create habit-forming products using the 4-step cycle used by Facebook and Instagram',
                    order: 4,
                    duration: 5,
                    videoUrl: videoUrls[3]
                  },
                  {
                    title: 'Content Marketing That Converts',
                    description: 'Build a content marketing engine that drives qualified leads and revenue using HubSpot\'s proven playbook',
                    order: 5,
                    duration: 5,
                    videoUrl: videoUrls[4]
                  },
                  {
                    title: 'Paid Acquisition: Facebook, Google, LinkedIn',
                    description: 'Master paid advertising across the three most powerful platforms and scale customer acquisition profitably',
                    order: 6,
                    duration: 5,
                    videoUrl: videoUrls[5]
                  },
                  {
                    title: 'Email Marketing & Marketing Automation',
                    description: 'Build automated email sequences that nurture leads and drive revenue on autopilot',
                    order: 7,
                    duration: 5,
                    videoUrl: videoUrls[6]
                  },
                  {
                    title: 'Conversion Rate Optimization (CRO)',
                    description: 'Double your conversion rates using data-driven CRO strategies, A/B testing, and landing page optimization',
                    order: 8,
                    duration: 5,
                    videoUrl: videoUrls[7]
                  },
                  {
                    title: 'Data-Driven Marketing & Analytics',
                    description: 'Build a data-driven marketing operation that makes decisions based on metrics, not opinions',
                    order: 9,
                    duration: 5,
                    videoUrl: videoUrls[8]
                  },
                  {
                    title: 'The Future of Marketing: AI & Automation',
                    description: 'Prepare for the AI-powered future of marketing with machine learning, predictive analytics, and automation',
                    order: 10,
                    duration: 5,
                    videoUrl: videoUrls[9]
                  }
                ]
              }
            },
            {
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
                    description: 'Cheat sheets and quick-reference templates (Coming Soon)',
                    order: 4,
                    duration: 0,
                    videoUrl: '/downloads/Digital-Marketing-Quick-Reference.pdf'
                  },
                  {
                    title: 'Resource List',
                    description: 'Curated resources for continued learning (Coming Soon)',
                    order: 5,
                    duration: 0,
                    videoUrl: '/downloads/Digital-Marketing-Resource-List.pdf'
                  }
                ]
              }
            }
          ]
        }
      }
    });

    return NextResponse.json({ 
      message: 'Digital Marketing Mastery course created successfully!',
      courseId: course.id
    });
  } catch (error) {
    console.error('Error creating Digital Marketing course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
