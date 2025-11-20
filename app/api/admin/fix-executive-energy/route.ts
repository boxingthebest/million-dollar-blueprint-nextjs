import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Executive Energy System course
    const course = await prisma.course.findFirst({
      where: {
        slug: 'executive-energy-system'
      },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Find Module 1 (Executive Wellness Protocols)
    const module1 = course.modules.find(m => m.order === 1);
    
    if (!module1) {
      return NextResponse.json({ error: 'Module 1 not found' }, { status: 404 });
    }

    // Video URLs mapping
    const videoUrls = [
      'https://vimeo.com/1130296747/f5b1bd80d5', // Lesson 1: The High-Performance Mindset
      'https://vimeo.com/1138745027/524b88735b', // Lesson 2: Sleep Optimization
      'https://vimeo.com/1138748339/5c63088665', // Lesson 3: Nutrition
      'https://vimeo.com/1138749400/9b3b0fb28f', // Lesson 4: Stress Management
      'https://vimeo.com/1138750184/c424ba9650', // Lesson 5: Energy Mastery
      'https://vimeo.com/1138750599/d0903f4318', // Lesson 6: Advanced Recovery
      'https://vimeo.com/1138751058/78b743134a', // Lesson 7: Flow State
      'https://vimeo.com/1138751605/0ad1ac3082', // Lesson 8: Building Resilience
      'https://vimeo.com/1138753391/d1242f342b', // Lesson 9: Breathwork
      'https://vimeo.com/1138758043/adcad49484', // Lesson 10: Quantified Executive
    ];

    // Get all lessons in Module 1
    const lessons = module1.lessons;

    // Delete Lesson 11 if it exists
    if (lessons.length > 10) {
      const lesson11 = lessons[10]; // 0-indexed, so index 10 is the 11th lesson
      await prisma.lesson.delete({
        where: { id: lesson11.id }
      });
      console.log('Deleted Lesson 11');
    }

    // Update the first 10 lessons with correct video URLs
    const updates = [];
    for (let i = 0; i < Math.min(10, lessons.length); i++) {
      const lesson = lessons[i];
      const update = prisma.lesson.update({
        where: { id: lesson.id },
        data: {
          videoUrl: `https://player.vimeo.com/video/${videoUrls[i].split('/')[3]}?badge=0&autopause=0&player_id=0&app_id=58479`
        }
      });
      updates.push(update);
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'Executive Energy System course updated successfully',
      updated: updates.length,
      deleted: lessons.length > 10 ? 1 : 0
    });

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
