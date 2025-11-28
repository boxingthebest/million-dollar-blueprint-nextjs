import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: 'executive-energy-system' },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    // Correct video URLs based on the actual Vimeo folder
    const correctVideoUrls = [
      'https://vimeo.com/1130296747', // Lesson 1: The High-Performance Mindset
      'https://vimeo.com/1138745027', // Lesson 2: Sleep Optimization for Peak Performance
      'https://vimeo.com/1138748339', // Lesson 3: Nutrition Strategies for Peak Performance
      'https://vimeo.com/1138749400', // Lesson 4: Exercise Protocols for Busy Executives
      'https://vimeo.com/1138750184', // Lesson 5: Stress Management & Resilience
      'https://vimeo.com/1138750599', // Lesson 6: Energy Management Systems
      'https://vimeo.com/1138751058', // Lesson 7: Cognitive Enhancement Strategies
      'https://vimeo.com/1138751605', // Lesson 8: Recovery & Regeneration Protocols
      'https://vimeo.com/1138753391', // Lesson 9: Longevity & Healthspan Optimization
      'https://vimeo.com/1138758043', // Lesson 10: Building Your Personal Wellness System
    ];

    let updatedCount = 0;

    // Update each lesson with the correct video URL
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        const lessonIndex = lesson.order - 1;
        if (lessonIndex >= 0 && lessonIndex < correctVideoUrls.length) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { videoUrl: correctVideoUrls[lessonIndex] },
          });
          updatedCount++;
          console.log(`Updated lesson ${lesson.order}: ${lesson.title} -> ${correctVideoUrls[lessonIndex]}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} lessons with correct video URLs`,
      updatedCount,
    });
  } catch (error) {
    console.error('Error fixing Executive Energy System videos:', error);
    return NextResponse.json({ success: false, message: 'Error updating videos' }, { status: 500 });
  }
}
