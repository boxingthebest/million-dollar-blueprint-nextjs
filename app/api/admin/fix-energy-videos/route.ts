import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const energyCourse = await prisma.course.findUnique({
      where: { slug: 'executive-energy-system' },
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

    if (!energyCourse) {
      return NextResponse.json({ error: 'Energy course not found' }, { status: 404 });
    }

    const energyVideos = [
      'https://vimeo.com/1138978464',
      'https://vimeo.com/1138978870',
      'https://vimeo.com/1138979171',
      'https://vimeo.com/1138979503',
      'https://vimeo.com/1138979794',
      'https://vimeo.com/1138980093',
      'https://vimeo.com/1138980353',
      'https://vimeo.com/1138980596',
      'https://vimeo.com/1138980851',
      'https://vimeo.com/1138981119',
    ];

    // Find the module with the most lessons (the main one)
    const mainModule = energyCourse.modules.reduce((prev, current) => 
      (current.lessons.length > prev.lessons.length) ? current : prev
    );

    const updates = [];
    for (let i = 0; i < mainModule.lessons.length && i < energyVideos.length; i++) {
      const lesson = mainModule.lessons[i];
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl: energyVideos[i] },
      });
      updates.push({
        title: lesson.title,
        oldUrl: lesson.videoUrl,
        newUrl: energyVideos[i],
      });
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} Executive Energy System videos`,
      updates,
    });
  } catch (error: any) {
    console.error('Error fixing energy videos:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fix energy videos' },
      { status: 500 }
    );
  }
}
