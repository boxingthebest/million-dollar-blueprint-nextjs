import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Wealth Building course
    const course = await prisma.course.findFirst({
      where: { slug: 'wealth' },
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
      return NextResponse.json({ error: 'Wealth Building course not found' }, { status: 404 });
    }

    // Find Module 1 (Wealth Building Foundations)
    const module1 = course.modules.find(m => m.order === 1);
    
    if (!module1) {
      return NextResponse.json({ error: 'Module 1 not found' }, { status: 404 });
    }

    // Vimeo video URLs (we have 7 out of 10)
    const videoUrls = [
      'https://vimeo.com/1139907727', // Lesson 1
      'https://vimeo.com/1139859075', // Lesson 2
      'https://vimeo.com/1139859347', // Lesson 3
      'https://vimeo.com/1139907974', // Lesson 4
      'https://vimeo.com/1139859532', // Lesson 5
      null, // Lesson 6 - waiting
      null, // Lesson 7 - waiting
      null, // Lesson 8 - waiting
      'https://vimeo.com/1139908855', // Lesson 9
      'https://vimeo.com/1139858578', // Lesson 10
    ];

    const lessons = module1.lessons;
    const updates = [];

    for (let i = 0; i < Math.min(10, lessons.length); i++) {
      const lesson = lessons[i];
      const vimeoUrl = videoUrls[i];
      
      if (vimeoUrl) {
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
    }

    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: 'Wealth Building course videos updated successfully',
      updated: updates.length,
      pending: videoUrls.filter(url => url === null).length
    });

  } catch (error) {
    console.error('Error updating Wealth Building videos:', error);
    return NextResponse.json(
      { error: 'Failed to update videos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
