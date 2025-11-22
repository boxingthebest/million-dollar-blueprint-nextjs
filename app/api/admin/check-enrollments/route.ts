import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                isPublished: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all published courses
    const allCourses = await prisma.course.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true
      }
    });

    const enrolledCourseIds = user.enrollments.map(e => e.course.id);
    const missingCourses = allCourses.filter(c => !enrolledCourseIds.includes(c.id));

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name
      },
      enrollments: user.enrollments.map(e => ({
        courseTitle: e.course.title,
        courseSlug: e.course.slug,
        enrolledAt: e.createdAt
      })),
      missingCourses: missingCourses.map(c => ({
        title: c.title,
        slug: c.slug
      })),
      summary: {
        totalPublishedCourses: allCourses.length,
        enrolledCourses: user.enrollments.length,
        missingCourses: missingCourses.length
      }
    });
  } catch (error) {
    console.error('Error checking enrollments:', error);
    return NextResponse.json({ error: 'Failed to check enrollments' }, { status: 500 });
  }
}
