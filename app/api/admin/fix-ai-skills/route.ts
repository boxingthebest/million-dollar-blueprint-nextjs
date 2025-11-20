import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find all AI-Resistant Skills courses
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: 'AI-Resistant Skills'
        }
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

    // Find the Draft course (price $1.97) and delete it
    const draftCourse = courses.find(c => c.price === 1.97);
    if (draftCourse) {
      await prisma.course.delete({
        where: { id: draftCourse.id }
      });
      console.log('Deleted draft AI-Resistant Skills course');
    }

    // Find the Published course (price $197)
    const publishedCourse = courses.find(c => c.price === 197 && c.status === 'PUBLISHED');
    
    if (!publishedCourse) {
      return NextResponse.json({ error: 'Published course not found' }, { status: 404 });
    }

    // Video URLs mapping - 11 videos total (1 bonus + 10 lessons)
    const videoUrls = [
      'https://vimeo.com/1129743307/a1f70f7a07', // Bonus: Executive Interview Secrets
      'https://vimeo.com/1129374864/8462d84da1', // Lesson 1
      'https://vimeo.com/1129414459/c3afffad25', // Lesson 2
      'https://vimeo.com/1129414864/272f58a324', // Lesson 3
      'https://vimeo.com/1129415335/47efd8a1aa', // Lesson 4
      'https://vimeo.com/1129415686/b37c86e62c', // Lesson 5
      'https://vimeo.com/1129415885/7bba6f24bd', // Lesson 6
      'https://vimeo.com/1129416243/657cd05863', // Lesson 7
      'https://vimeo.com/1129417480/946e450263', // Lesson 8
      'https://vimeo.com/1129417841/f4d6644de9', // Lesson 9
      'https://vimeo.com/1129418207/8f8000ae4f', // Lesson 10
    ];

    // Get all lessons from all modules
    const allLessons = publishedCourse.modules.flatMap(m => m.lessons).sort((a, b) => a.order - b.order);

    // Update lessons with video URLs
    const updates = [];
    for (let i = 0; i < Math.min(videoUrls.length, allLessons.length); i++) {
      const lesson = allLessons[i];
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
      message: 'AI-Resistant Skills course updated successfully',
      draftDeleted: draftCourse ? true : false,
      videosUpdated: updates.length
    });

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
