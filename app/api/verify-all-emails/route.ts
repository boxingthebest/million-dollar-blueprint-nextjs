import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Update all users to mark their emails as verified
    const result = await prisma.user.updateMany({
      where: {
        emailVerified: null
      },
      data: {
        emailVerified: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'All emails verified successfully!',
      usersUpdated: result.count,
      next_steps: 'You can now sign in with any of your accounts!'
    });
  } catch (error: any) {
    console.error('Error verifying emails:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

