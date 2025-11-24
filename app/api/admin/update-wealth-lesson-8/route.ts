import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find Wealth Building course
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

    const module1 = course.modules.find(m => m.order === 1);
    
    if (!module1) {
      return NextResponse.json({ error: 'Module 1 not found' }, { status: 404 });
    }

    // Get lesson 8 (order 8)
    const lesson8 = module1.lessons.find(l => l.order === 8);

    if (!lesson8) {
      return NextResponse.json({ 
        error: 'Lesson 8 not found',
        availableLessons: module1.lessons.map(l => ({ order: l.order, title: l.title }))
      }, { status: 404 });
    }

    // Update lesson 8 with Vimeo URL
    await prisma.lesson.update({
      where: { id: lesson8.id },
      data: {
        videoUrl: 'https://player.vimeo.com/video/1139908441?badge=0&autopause=0&player_id=0&app_id=58479'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Wealth Building lesson 8 updated successfully',
      lesson: {
        title: lesson8.title,
        order: lesson8.order
      }
    });

  } catch (error) {
    console.error('Error updating Wealth Building lesson 8:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
