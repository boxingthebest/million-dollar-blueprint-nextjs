import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Get AI-Resistant Skills course
    const aiCourse = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!aiCourse) {
      return NextResponse.json({ error: 'AI course not found' }, { status: 404 });
    }

    // Correct Vimeo video URLs from your account
    const correctVideoUrls = [
      'https://vimeo.com/1129374864', // Lesson 1
      'https://vimeo.com/1129414459', // Lesson 2
      'https://vimeo.com/1129414824', // Lesson 3
      'https://vimeo.com/1129415144', // Lesson 4
      'https://vimeo.com/1129415414', // Lesson 5
      'https://vimeo.com/1129415885', // Lesson 6
      'https://vimeo.com/1129416093', // Lesson 7
      'https://vimeo.com/1129416368', // Lesson 8
      'https://vimeo.com/1129416625', // Lesson 9
      'https://vimeo.com/1129416936', // Lesson 10
    ];

    // Find the main module (not the toolkit module)
    const mainModule = aiCourse.modules.find(m => m.title.includes('AI-Resistant Skills Mastery'));
    
    if (!mainModule) {
      return NextResponse.json({ error: 'Main module not found' }, { status: 404 });
    }

    // Update each lesson with correct video URL
    const updates = [];
    for (let i = 0; i < mainModule.lessons.length && i < correctVideoUrls.length; i++) {
      const lesson = mainModule.lessons[i];
      const update = await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl: correctVideoUrls[i] },
      });
      updates.push({
        title: lesson.title,
        oldUrl: lesson.videoUrl,
        newUrl: correctVideoUrls[i],
      });
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} lesson video URLs`,
      updates,
    });
  } catch (error: any) {
    console.error('Error fixing video URLs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fix video URLs' },
      { status: 500 }
    );
  }
}
