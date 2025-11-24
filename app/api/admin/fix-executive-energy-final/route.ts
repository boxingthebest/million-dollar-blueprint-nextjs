import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find Executive Energy course
    const course = await prisma.course.findFirst({
      where: { slug: 'executive-energy-system' },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Executive Energy course not found' }, { status: 404 });
    }

    const module1 = course.modules.find(m => m.order === 1);
    
    if (!module1) {
      return NextResponse.json({ error: 'Module 1 not found' }, { status: 404 });
    }

    // The correct mapping based on the actual video content
    // The videos are numbered Lesson 1, Lesson 2, etc. in the video itself
    // So we need to match the database titles to the video content
    const correctTitles = [
      { order: 1, title: 'Lesson 1: Welcome to The Executive Energy System™' },
      { order: 2, title: 'Lesson 2: Sleep Optimization for Peak Performance' },
      { order: 3, title: 'Lesson 3: The High-Performance Mindset' },
      { order: 4, title: 'Lesson 4: Sleep Architecture for Executives' },
      { order: 5, title: 'Lesson 5: Strategic Nutrition' },
      { order: 6, title: 'Lesson 6: Movement & Recovery' },
      { order: 7, title: 'Lesson 7: Stress Management' },
      { order: 8, title: 'Lesson 8: Energy Optimization' },
      { order: 9, title: 'Lesson 9: Focus & Productivity' },
      { order: 10, title: 'Lesson 10: Resilience Building' }
    ];

    const updates = [];
    const lessons = module1.lessons;

    for (const correctTitle of correctTitles) {
      const lesson = lessons.find(l => l.order === correctTitle.order);
      if (lesson && lesson.title !== correctTitle.title) {
        updates.push(
          prisma.lesson.update({
            where: { id: lesson.id },
            data: { title: correctTitle.title }
          })
        );
      }
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'Executive Energy course numbering fixed',
      updatesApplied: updates.length
    });

  } catch (error) {
    console.error('Error fixing Executive Energy:', error);
    return NextResponse.json(
      { error: 'Failed to fix course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
