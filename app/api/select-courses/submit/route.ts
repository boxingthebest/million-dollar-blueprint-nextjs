import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import bcrypt from 'bcryptjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia' as any,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, courseIds } = body;

    if (!sessionId || !courseIds || !Array.isArray(courseIds)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Invalid or unpaid session' }, { status: 400 });
    }

    const email = session.customer_details?.email;
    if (!email) {
      return NextResponse.json({ error: 'No email found in session' }, { status: 400 });
    }

    // Get pending selection
    const pending = await prisma.pendingCourseSelection.findUnique({
      where: { stripeSessionId: sessionId },
    });

    if (!pending) {
      return NextResponse.json({ error: 'Selection not found' }, { status: 404 });
    }

    if (pending.completed) {
      return NextResponse.json({ error: 'Courses already selected' }, { status: 400 });
    }

    // Validate course count for starter bundle
    if (pending.bundleType === 'starter' && courseIds.length !== 3) {
      return NextResponse.json({ error: 'Please select exactly 3 courses' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user with temporary password
      const tempPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      user = await prisma.user.create({
        data: {
          email,
          name: session.customer_details?.name || email.split('@')[0],
          password: hashedPassword,
          role: 'user',
        },
      });

      // TODO: Send welcome email with password reset link
      console.log(`New user created: ${email}, temp password: ${tempPassword}`);
    }

    // Determine which courses to enroll in
    let coursesToEnroll = courseIds;
    
    if (pending.bundleType === 'professional' || pending.bundleType === 'vip') {
      // Enroll in all courses
      const allCourses = await prisma.course.findMany({
        where: { isPublished: true },
        select: { id: true },
      });
      coursesToEnroll = allCourses.map(c => c.id);
    }

    // Create enrollments
    for (const courseId of coursesToEnroll) {
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          courseId,
        },
      });
    }

    // Mark selection as completed
    await prisma.pendingCourseSelection.update({
      where: { stripeSessionId: sessionId },
      data: {
        coursesSelected: courseIds,
        completed: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Courses enrolled successfully',
      userId: user.id,
    });
  } catch (error) {
    console.error('Error submitting course selection:', error);
    return NextResponse.json(
      { error: 'Failed to save selection. Please contact support.' },
      { status: 500 }
    );
  }
}

