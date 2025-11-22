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

    // Find the Digital Marketing Toolkit module
    const toolkitModule = course.modules.find(m => m.title === 'Digital Marketing Toolkit');
    
    if (!toolkitModule) {
      return NextResponse.json({ error: 'Toolkit module not found' }, { status: 404 });
    }

    // Find the lessons to update
    const quickRefLesson = toolkitModule.lessons.find(l => l.title === 'Quick Reference Guide');
    const resourceListLesson = toolkitModule.lessons.find(l => l.title === 'Resource List');

    // Update Quick Reference Guide
    if (quickRefLesson) {
      await prisma.lesson.update({
        where: { id: quickRefLesson.id },
        data: {
          description: 'Cheat sheets and quick-reference templates for all growth frameworks',
          videoUrl: '/downloads/Doc4-Digital-Marketing-Quick-Reference-Guide.pdf'
        }
      });
    }

    // Update Resource List
    if (resourceListLesson) {
      await prisma.lesson.update({
        where: { id: resourceListLesson.id },
        data: {
          description: 'Curated tools, books, platforms, and communities for growth marketers',
          videoUrl: '/downloads/Doc5-Digital-Marketing-Resource-List.pdf'
        }
      });
    }

    return NextResponse.json({ 
      message: 'Digital Marketing PDFs updated successfully!',
      updated: {
        quickReference: quickRefLesson ? 'Updated' : 'Not found',
        resourceList: resourceListLesson ? 'Updated' : 'Not found'
      }
    });
  } catch (error) {
    console.error('Error updating Digital Marketing PDFs:', error);
    return NextResponse.json({ error: 'Failed to update PDFs' }, { status: 500 });
  }
}
