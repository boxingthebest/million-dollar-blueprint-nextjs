import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, bundleType, courseIds } = body;

    if (!email || !bundleType || !courseIds || !Array.isArray(courseIds)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Validate course count for starter bundle
    if (bundleType === 'starter' && courseIds.length !== 3) {
      return NextResponse.json({ error: 'Please select exactly 3 courses' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          password: hashedPassword,
          role: 'user',
        },
      });
    } else {
      // Update existing user password
      user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    }

    // Determine which courses to enroll in
    let coursesToEnroll = courseIds;
    
    if (bundleType === 'professional' || bundleType === 'vip') {
      // Enroll in all courses
      const allCourses = await prisma.course.findMany({
        where: { isPublished: true },
        select: { id: true },
      });
      coursesToEnroll = allCourses.map(c => c.id);
    }

    // Delete existing enrollments for this user
    await prisma.enrollment.deleteMany({
      where: { userId: user.id },
    });

    // Create new enrollments
    for (const courseId of coursesToEnroll) {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Test account created successfully',
      userId: user.id,
      email: user.email,
      tempPassword,
      enrolledCount: coursesToEnroll.length,
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    return NextResponse.json(
      { error: 'Failed to create test account. Please try again.' },
      { status: 500 }
    );
  }
}

