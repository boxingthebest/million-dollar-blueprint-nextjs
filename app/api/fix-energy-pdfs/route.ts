import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get the Executive Energy System course
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

    // Map of lesson titles to correct PDF filenames
    const pdfMapping: Record<string, string> = {
      'Executive Energy Workbook': 'Executive-Energy-Wellness-Protocols.pdf',
      '90-Day Energy Tracker': '90-Day-Energy-Tracker.pdf',
      'Meal Planning Templates': 'Strategic-Nutrition-Framework.pdf',
      'Exercise Protocols': 'Movement-Recovery-Protocol.pdf',
      'Lesson 1: The High-Performance Mindset': 'High-Performance-Morning-Routine.pdf',
      'Lesson 2: Sleep Architecture for Executives': 'Sleep-Architecture-Guide.pdf',
      'Lesson 3: Strategic Nutrition': 'Strategic-Nutrition-Framework.pdf',
      'Lesson 4: Movement & Recovery': 'Movement-Recovery-Protocol.pdf',
      'Lesson 5: Stress Management': 'Stress-Management-Toolkit.pdf',
      'Lesson 6: Energy Optimization': 'Energy-Optimization-Strategies.pdf',
      'Lesson 7: Focus & Productivity': 'Focus-Productivity-Mastery.pdf',
      'Lesson 8: Resilience Building': 'Resilience-Building-Framework.pdf',
      'Lesson 9: Longevity Strategies': 'Longevity-Strategy-Guide.pdf',
      'Resource Library': 'Executive-Habits-Checklist.pdf'
    };

    const updates = [];
    const allLessons = course.modules.flatMap(m => m.lessons);

    for (const lesson of allLessons) {
      const correctFilename = pdfMapping[lesson.title];
      if (correctFilename && lesson.pdfUrl) {
        const currentFilename = lesson.pdfUrl.split('/').pop();
        if (currentFilename !== correctFilename) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { pdfUrl: `/downloads/${correctFilename}` }
          });
          updates.push({
            lesson: lesson.title,
            old: currentFilename,
            new: correctFilename
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} PDF filenames`,
      updates
    });

  } catch (error) {
    console.error('Error fixing PDFs:', error);
    return NextResponse.json({ error: 'Failed to fix PDFs' }, { status: 500 });
  }
}
