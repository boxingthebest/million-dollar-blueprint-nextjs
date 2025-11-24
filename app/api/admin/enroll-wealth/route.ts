import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: 'dapenza@hotmail.com' }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find Wealth Building course
    const course = await prisma.course.findFirst({
      where: { slug: 'wealth' }
    });

    if (!course) {
      return NextResponse.json({ error: 'Wealth Building course not found' }, { status: 404 });
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    });

    if (existing) {
      return NextResponse.json({ message: 'User already enrolled in Wealth Building' });
    }

    // Enroll user
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User enrolled in Wealth Building successfully'
    });

  } catch (error) {
    console.error('Error enrolling user:', error);
    return NextResponse.json(
      { error: 'Failed to enroll user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
