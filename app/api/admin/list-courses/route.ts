import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                order: true,
                videoUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({
      success: true,
      count: courses.length,
      courses: courses.map(course => ({
        slug: course.slug,
        title: course.title,
        modules: course.modules.map(module => ({
          title: module.title,
          lessons: module.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.order,
            videoUrl: lesson.videoUrl,
            url: `/learn/${course.slug}/${lesson.id}`,
          })),
        })),
      })),
    });
  } catch (error: any) {
    console.error('Error listing courses:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list courses' },
      { status: 500 }
    );
  }
}
