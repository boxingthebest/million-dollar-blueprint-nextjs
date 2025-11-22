import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    const audit = courses.map(course => ({
      id: course.id,
      title: course.title,
      slug: course.slug,
      isPublished: course.isPublished,
      price: course.price,
      enrollments: course._count.enrollments,
      moduleCount: course.modules.length,
      totalLessons: course.modules.reduce((sum, m) => sum + m.lessons.length, 0),
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        order: module.order,
        lessonCount: module.lessons.length,
        lessons: module.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          order: lesson.order,
          duration: lesson.duration,
          hasVideo: !!lesson.videoUrl,
          videoUrl: lesson.videoUrl,
          isPDF: lesson.videoUrl?.endsWith('.pdf') || false
        }))
      }))
    }));

    return NextResponse.json({ 
      totalCourses: courses.length,
      courses: audit
    }, { status: 200 });
  } catch (error) {
    console.error('Error auditing courses:', error);
    return NextResponse.json({ error: 'Failed to audit courses' }, { status: 500 });
  }
}
