import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: { title: { contains: 'Executive Energy' } },
      include: { 
        modules: {
          include: { lessons: true }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Mapping of old titles to new titles and PDF URLs
    const lessonUpdates = {
      'Executive Energy Workbook': {
        title: 'The Executive Energy Assessment™',
        videoUrl: '/downloads/Executive-Energy-Assessment.pdf'
      },
      '90-Day Energy Tracker': {
        title: 'The Energy Portfolio Dashboard',
        videoUrl: '/downloads/Energy-Portfolio-Dashboard.pdf'
      },
      'Meal Planning Templates': {
        title: 'The Metabolic Flexibility Matrix',
        videoUrl: '/downloads/Metabolic-Flexibility-Matrix.pdf'
      },
      'Exercise Protocols': {
        title: 'The SLEEP Optimization Toolkit',
        videoUrl: '/downloads/SLEEP-Optimization-Toolkit.pdf'
      },
      'Resource Library': {
        title: 'The Stress Inoculation Protocol',
        videoUrl: '/downloads/Stress-Inoculation-Protocol.pdf'
      }
    };

    const allLessons = course.modules.flatMap(m => m.lessons);
    const updates = [];

    for (const lesson of allLessons) {
      const update = lessonUpdates[lesson.title];
      if (update) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            title: update.title,
            videoUrl: update.videoUrl
          }
        });
        updates.push({
          old: lesson.title,
          new: update.title,
          pdf: update.videoUrl
        });
      }
    }

    // Add the 6th lesson (Quick Reference Guide)
    const resourceModule = course.modules.find(m => m.title.includes('Resources'));
    if (resourceModule) {
      const existingQuickRef = allLessons.find(l => l.title.includes('Quick Reference'));
      if (!existingQuickRef) {
        await prisma.lesson.create({
          data: {
            moduleId: resourceModule.id,
            title: 'Executive Energy Quick Reference Guide',
            description: 'Your printable daily protocol checklist and core performance frameworks at a glance',
            videoUrl: '/downloads/Executive-Energy-Quick-Reference.pdf',
            duration: 0,
            order: 6
          }
        });
        updates.push({
          old: null,
          new: 'Executive Energy Quick Reference Guide',
          pdf: '/downloads/Executive-Energy-Quick-Reference.pdf'
        });
      }
    }

    return NextResponse.json({ 
      success: true,
      updates,
      message: `Updated ${updates.length} lessons`
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update lessons' }, { status: 500 });
  }
}
