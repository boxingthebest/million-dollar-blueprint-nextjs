import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find Wealth Building course
    const course = await prisma.course.findFirst({
      where: { slug: 'wealth-building-blueprint' },
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

    // Get lessons 6 and 7 (order 6 and 7)
    const lesson6 = module1.lessons.find(l => l.order === 6);
    const lesson7 = module1.lessons.find(l => l.order === 7);

    if (!lesson6 || !lesson7) {
      return NextResponse.json({ 
        error: 'Lessons 6 or 7 not found',
        lesson6: !!lesson6,
        lesson7: !!lesson7
      }, { status: 404 });
    }

    // Update lesson 6 and 7 with Vimeo URLs
    await prisma.lesson.update({
      where: { id: lesson6.id },
      data: {
        videoUrl: 'https://player.vimeo.com/video/1139908147?badge=0&autopause=0&player_id=0&app_id=58479'
      }
    });

    await prisma.lesson.update({
      where: { id: lesson7.id },
      data: {
        videoUrl: 'https://player.vimeo.com/video/1139908322?badge=0&autopause=0&player_id=0&app_id=58479'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Wealth Building lessons 6 & 7 updated successfully',
      updated: 2
    });

  } catch (error) {
    console.error('Error updating Wealth Building:', error);
    return NextResponse.json(
      { error: 'Failed to update course', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
