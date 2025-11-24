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

    // Correct titles from actual Vimeo videos
    const correctTitles = [
      { order: 1, title: 'Lesson 1: The High-Performance Mindset' },
      { order: 2, title: 'Lesson 2: Sleep Optimization for Peak Performance' },
      { order: 3, title: 'Lesson 3: Nutrition for Cognitive & Physical Excellence' },
      { order: 4, title: 'Lesson 4: Stress Management & Resilience' },
      { order: 5, title: 'Lesson 5: Energy Mastery - The Executive\'s Secret Weapon' },
      { order: 6, title: 'Lesson 6: Advanced Recovery Protocols' },
      { order: 7, title: 'Lesson 7: The Flow State - Accessing Peak Performance' },
      { order: 8, title: 'Lesson 8: Building Unshakeable Resilience' },
      { order: 9, title: 'Lesson 9: Breathwork & Nervous System Control' },
      { order: 10, title: 'Lesson 10: The Quantified Executive - Data-Driven Wellness' }
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
