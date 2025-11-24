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
    const correctLessons = [
      { order: 1, title: 'Lesson 1: The High-Performance Mindset', description: 'Master the mindset frameworks used by Fortune 100 executives' },
      { order: 2, title: 'Lesson 2: Sleep Optimization for Peak Performance', description: 'Optimize your sleep for peak performance' },
      { order: 3, title: 'Lesson 3: Nutrition for Cognitive & Physical Excellence', description: 'Fuel your body for sustained energy' },
      { order: 4, title: 'Lesson 4: Stress Management & Resilience', description: 'Master stress for peak performance' },
      { order: 5, title: 'Lesson 5: Energy Mastery - The Executive\\'s Secret Weapon', description: 'Maximize your daily energy levels' },
      { order: 6, title: 'Lesson 6: Advanced Recovery Protocols', description: 'Exercise protocols for busy executives' },
      { order: 7, title: 'Lesson 7: The Flow State - Accessing Peak Performance', description: 'Achieve more in less time' },
      { order: 8, title: 'Lesson 8: Building Unshakeable Resilience', description: 'Bounce back stronger from setbacks' },
      { order: 9, title: 'Lesson 9: Breathwork & Nervous System Control', description: 'Master breathing techniques for stress control' },
      { order: 10, title: 'Lesson 10: The Quantified Executive - Data-Driven Wellness', description: 'Build a foundation for long-term health' }
    ];

    const lessons = module1.lessons.filter(l => !l.pdfUrl); // Only get video lessons, not PDFs
    
    if (lessons.length < 10) {
      return NextResponse.json({ 
        error: 'Not enough lessons found',
        found: lessons.length,
        expected: 10
      }, { status: 400 });
    }

    // Update each lesson with correct title and description
    const updates = [];
    for (let i = 0; i < 10; i++) {
      const lesson = lessons[i];
      const correctData = correctLessons[i];
      
      updates.push(
        prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            title: correctData.title,
            description: correctData.description,
            order: correctData.order
          }
        })
      );
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'Executive Energy course rebuilt successfully',
      updated: updates.length
    });

  } catch (error) {
    console.error('Error rebuilding Executive Energy:', error);
    return NextResponse.json(
      { error: 'Failed to rebuild course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
