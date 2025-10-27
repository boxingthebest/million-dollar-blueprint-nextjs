import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Invalid or unpaid session' }, { status: 400 });
    }

    // Determine bundle type based on amount paid
    const amountPaid = session.amount_total! / 100; // Convert from cents
    let bundleType = 'starter';
    
    if (amountPaid >= 797) {
      bundleType = 'vip';
    } else if (amountPaid >= 597) {
      bundleType = 'professional';
    }

    // Check if selection already exists
    const existing = await prisma.pendingCourseSelection.findUnique({
      where: { stripeSessionId: sessionId },
    });

    if (existing && existing.completed) {
      return NextResponse.json({ error: 'Courses already selected for this purchase' }, { status: 400 });
    }

    // Create pending selection if it doesn't exist
    if (!existing) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to select

      await prisma.pendingCourseSelection.create({
        data: {
          email: session.customer_details?.email || '',
          stripeSessionId: sessionId,
          bundleType,
          coursesSelected: [],
          expiresAt,
        },
      });
    }

    // Fetch all published courses
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({
      courses,
      bundleType,
      email: session.customer_details?.email,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { error: 'Failed to verify session. Please contact support.' },
      { status: 500 }
    );
  }
}

