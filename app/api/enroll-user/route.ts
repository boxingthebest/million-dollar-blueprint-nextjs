import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, courseSlug, secret } = body;

    // Security check
    if (secret !== 'admin-seed-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!email || !courseSlug) {
      return NextResponse.json({ error: 'Email and courseSlug required' }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find course
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: course.id
      }
    });

    return NextResponse.json({
      success: true,
      message: `User ${email} enrolled in ${course.title}`,
      enrollment: {
        userId: user.id,
        courseId: course.id,
        courseTitle: course.title,
        userEmail: email
      }
    });

  } catch (error: any) {
    console.error('Error enrolling user:', error);
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
