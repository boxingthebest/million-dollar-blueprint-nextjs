import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Find all courses with 'marketing' in slug or title
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { slug: { contains: 'marketing' } },
          { title: { contains: 'Marketing' } }
        ]
      },
      include: {
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                order: true
              }
            }
          }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    });

    return NextResponse.json({ 
      count: courses.length,
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        isPublished: c.isPublished,
        enrollmentCount: c._count.enrollments,
        moduleCount: c.modules.length,
        modules: c.modules.map(m => ({
          id: m.id,
          title: m.title,
          order: m.order,
          lessonCount: m.lessons.length,
          lessons: m.lessons.map(l => ({
            id: l.id,
            title: l.title,
            order: l.order
          }))
        }))
      }))
    });
  } catch (error) {
    console.error('Error listing marketing courses:', error);
    return NextResponse.json({ error: 'Failed to list courses' }, { status: 500 });
  }
}
