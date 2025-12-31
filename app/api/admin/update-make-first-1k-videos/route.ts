import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the course
    const course = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Video URLs from Vimeo
    const videoUrls = {
      video1: 'https://player.vimeo.com/video/1150627260', // Welcome + The Simple Plan
      video2: 'https://player.vimeo.com/video/1150628797', // Your First $200 Service
      video3: 'https://player.vimeo.com/video/1150629825', // Finding Your First Client
      video4: 'https://player.vimeo.com/video/1150634048', // The Complete ChatGPT Workflow
      video5: 'https://player.vimeo.com/video/1150630996', // From $200 to $2,000
      video6: 'https://player.vimeo.com/video/1150631821', // Your 7-Day Action Plan
      bonus: 'https://player.vimeo.com/video/1150632375'   // The Bio Upgrade Method
    };

    // Update each lesson with the correct video URL
    const coreModule = course.modules.find(m => m.order === 1);
    const bonusModule = course.modules.find(m => m.order === 2);

    if (coreModule) {
      // Update core training lessons
      for (const lesson of coreModule.lessons) {
        let videoUrl = '';
        switch (lesson.order) {
          case 1: videoUrl = videoUrls.video1; break;
          case 2: videoUrl = videoUrls.video2; break;
          case 3: videoUrl = videoUrls.video3; break;
          case 4: videoUrl = videoUrls.video4; break;
          case 5: videoUrl = videoUrls.video5; break;
          case 6: videoUrl = videoUrls.video6; break;
        }
        
        if (videoUrl) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { videoUrl }
          });
        }
      }
    }

    if (bonusModule) {
      // Update bonus lesson
      const bonusLesson = bonusModule.lessons[0];
      if (bonusLesson) {
        await prisma.lesson.update({
          where: { id: bonusLesson.id },
          data: { videoUrl: videoUrls.bonus }
        });
      }
    }

    // Fetch updated course
    const updatedCourse = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    return NextResponse.json({ 
      message: 'All video URLs updated successfully!',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Error updating video URLs:', error);
    return NextResponse.json({ error: 'Failed to update video URLs' }, { status: 500 });
  }
}
