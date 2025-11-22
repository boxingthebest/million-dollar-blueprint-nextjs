import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: 'dapenza@hotmail.com' }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the free AI course
    const course = await prisma.course.findFirst({
      where: { slug: 'ai-resistant-skills-free' }
    });

    if (!course) {
      return NextResponse.json({ error: 'Free AI course not found' }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    });

    if (existingEnrollment) {
      return NextResponse.json({ 
        message: 'User already enrolled in free AI course',
        enrollmentId: existingEnrollment.id
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    });

    return NextResponse.json({ 
      message: 'Successfully enrolled in free AI-Resistant Skills course!',
      enrollmentId: enrollment.id,
      courseTitle: course.title
    });
  } catch (error) {
    console.error('Error enrolling user:', error);
    return NextResponse.json({ error: 'Failed to enroll user' }, { status: 500 });
  }
}
