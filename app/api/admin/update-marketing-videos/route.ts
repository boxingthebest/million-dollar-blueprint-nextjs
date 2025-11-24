import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Digital Marketing course
    const course = await prisma.course.findFirst({
      where: { slug: 'marketing' },
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
      return NextResponse.json({ error: 'Digital Marketing course not found' }, { status: 404 });
    }

    // Find Module 1
    const module1 = course.modules.find(m => m.order === 1);
    
    if (!module1) {
      return NextResponse.json({ error: 'Module 1 not found' }, { status: 404 });
    }

    // Vimeo video URLs for all 10 lessons
    const videoUrls = [
      'https://vimeo.com/1139647563', // Lesson 1
      'https://vimeo.com/1139648310', // Lesson 2
      'https://vimeo.com/1139648726', // Lesson 3
      'https://vimeo.com/1139649353', // Lesson 4
      'https://vimeo.com/1139651015', // Lesson 5
      'https://vimeo.com/1139651575', // Lesson 6
      'https://vimeo.com/1139651952', // Lesson 7
      'https://vimeo.com/1139652274', // Lesson 8
      'https://vimeo.com/1139653488', // Lesson 9
      'https://vimeo.com/1139654565', // Lesson 10
    ];

    const lessons = module1.lessons;
    const updates = [];

    for (let i = 0; i < Math.min(10, lessons.length); i++) {
      const lesson = lessons[i];
      const vimeoUrl = videoUrls[i];
      
      // Extract video ID from Vimeo URL
      const vimeoId = vimeoUrl.split('/').pop();
      const embedUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`;
      
      updates.push(
        prisma.lesson.update({
          where: { id: lesson.id },
          data: { videoUrl: embedUrl }
        })
      );
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'Digital Marketing course videos updated successfully',
      updated: updates.length
    });

  } catch (error) {
    console.error('Error updating Digital Marketing videos:', error);
    return NextResponse.json(
      { error: 'Failed to update videos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
