import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const updates = [];

    // 1. Fix Executive Energy System - Rename "Welcome" to "Lesson 1" and renumber all
    const execEnergy = await prisma.course.findFirst({
      where: { slug: 'executive-energy-system' },
      include: { modules: { include: { lessons: { orderBy: { order: 'asc' } } } } }
    });

    if (execEnergy && execEnergy.modules[0]) {
      const lessons = execEnergy.modules[0].lessons;
      const titleUpdates = [
        { order: 1, title: 'Lesson 1: Welcome to The Executive Energy System™' },
        { order: 2, title: 'Lesson 2: The High-Performance Mindset' },
        { order: 3, title: 'Lesson 3: Sleep Architecture for Executives' },
        { order: 4, title: 'Lesson 4: Strategic Nutrition' },
        { order: 5, title: 'Lesson 5: Movement & Recovery' },
        { order: 6, title: 'Lesson 6: Stress Management' },
        { order: 7, title: 'Lesson 7: Energy Optimization' },
        { order: 8, title: 'Lesson 8: Focus & Productivity' },
        { order: 9, title: 'Lesson 9: Resilience Building' },
        { order: 10, title: 'Lesson 10: Longevity Strategies' }
      ];

      for (const update of titleUpdates) {
        const lesson = lessons.find(l => l.order === update.order);
        if (lesson) {
          updates.push(
            prisma.lesson.update({
              where: { id: lesson.id },
              data: { title: update.title }
            })
          );
        }
      }
    }

    // 2. Fix AI-Resistant Skills - Ensure consistent numbering display
    // Note: The display numbers are handled in the frontend, but we can ensure lesson titles are consistent
    const aiSkills = await prisma.course.findFirst({
      where: { slug: 'ai-resistant-skills' },
      include: { modules: { include: { lessons: { orderBy: { order: 'asc' } } } } }
    });

    if (aiSkills && aiSkills.modules[0]) {
      const lessons = aiSkills.modules[0].lessons;
      // Lessons are already correctly titled, just ensuring order is correct
      for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].order !== i + 1) {
          updates.push(
            prisma.lesson.update({
              where: { id: lessons[i].id },
              data: { order: i + 1 }
            })
          );
        }
      }
    }

    // 3. Fix Leadership Module 2 resources - Ensure all have proper numbering
    const leadership = await prisma.course.findFirst({
      where: { slug: 'leadership' },
      include: { modules: { include: { resources: { orderBy: { order: 'asc' } } } } }
    });

    if (leadership && leadership.modules[1]) {
      const resources = leadership.modules[1].resources;
      for (let i = 0; i < resources.length; i++) {
        if (resources[i].order !== i + 1) {
          updates.push(
            prisma.resource.update({
              where: { id: resources[i].id },
              data: { order: i + 1 }
            })
          );
        }
      }
    }

    // Execute all updates
    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'All course numbering fixed successfully',
      updatesApplied: updates.length
    });

  } catch (error) {
    console.error('Error fixing lesson numbering:', error);
    return NextResponse.json(
      { error: 'Failed to fix numbering', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
