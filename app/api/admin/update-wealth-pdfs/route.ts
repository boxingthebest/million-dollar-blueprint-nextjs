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

    // Find Module 2 (Wealth Building Toolkit)
    const module2 = course.modules.find(m => m.order === 2);
    
    if (!module2) {
      return NextResponse.json({ error: 'Module 2 not found' }, { status: 404 });
    }

    // Update each PDF lesson with the real URLs
    const pdfUpdates = [
      {
        order: 1,
        title: 'The Complete Wealth Building Blueprint',
        description: '50+ page comprehensive guide with all frameworks and strategies',
        videoUrl: '/downloads/Doc1-New-The-Complete-Wealth-Building-Blueprint.pdf'
      },
      {
        order: 2,
        title: 'Wealth Framework Templates',
        description: 'Ready-to-use templates for portfolio tracking, FIRE calculations, and more',
        videoUrl: '/downloads/Doc2-Wealth-Building-Framework-Templates.pdf'
      },
      {
        order: 3,
        title: 'Progress Tracker',
        description: '90-day wealth building action tracker',
        videoUrl: '/downloads/Doc3-90-Day-Wealth-Building-Progress-Tracker.pdf'
      },
      {
        order: 4,
        title: 'Quick Reference Guide',
        description: 'Cheat sheets for all wealth building frameworks and formulas',
        videoUrl: '/downloads/Doc4-Wealth-Building-Quick-Reference-Guide.pdf'
      },
      {
        order: 5,
        title: 'Resource List',
        description: 'Curated books, tools, platforms, and communities for wealth builders',
        videoUrl: '/downloads/Doc5-Wealth-Building-Resource-List.pdf'
      }
    ];

    // Update each lesson
    for (const update of pdfUpdates) {
      const lesson = module2.lessons.find(l => l.order === update.order);
      if (lesson) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            title: update.title,
            description: update.description,
            videoUrl: update.videoUrl
          }
        });
      }
    }

    return NextResponse.json({ 
      message: 'Wealth Building PDFs updated successfully!',
      pdfsUpdated: pdfUpdates.length
    });
  } catch (error) {
    console.error('Error updating Wealth Building PDFs:', error);
    return NextResponse.json({ error: 'Failed to update PDFs' }, { status: 500 });
  }
}
