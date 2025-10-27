export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNewsletterVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingSubscriber) {
      if (existingSubscriber.verified) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        );
      } else {
        // Resend verification email
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        // Delete old token and create new one
        await prisma.emailVerificationToken.deleteMany({
          where: { email: email.toLowerCase() }
        });

        await prisma.emailVerificationToken.create({
          data: {
            email: email.toLowerCase(),
            token: hashedToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          }
        });

        const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://www.milliondollarblueprint.ai'}/newsletter/verify?token=${verificationToken}`;
        await sendNewsletterVerificationEmail(email, verificationUrl);

        return NextResponse.json(
          { message: 'Verification email resent! Please check your inbox.' },
          { status: 200 }
        );
      }
    }

    // Create new subscriber (unverified)
    await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        verified: false
      }
    });

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Store verification token (expires in 24 hours)
    await prisma.emailVerificationToken.create({
      data: {
        email: email.toLowerCase(),
        token: hashedToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://www.milliondollarblueprint.ai'}/newsletter/verify?token=${verificationToken}`;
    const emailResult = await sendNewsletterVerificationEmail(email, verificationUrl);

    if (!emailResult.success) {
      console.error('Failed to send newsletter verification email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Please check your email to confirm your subscription!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

