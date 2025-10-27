import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"
import crypto from "crypto"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Hash the token to compare with database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    // Find valid verification token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token: hashedToken },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      await prisma.emailVerificationToken.delete({
        where: { token: hashedToken },
      })
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Update user's emailVerified field
    const user = await prisma.user.update({
      where: { email: verificationToken.email },
      data: { emailVerified: new Date() },
    })

    // Delete used verification token
    await prisma.emailVerificationToken.delete({
      where: { token: hashedToken },
    })

    // Send welcome email now that email is verified
    const userName = user.name || user.email!.split('@')[0]
    sendWelcomeEmail(user.email!, userName).catch(error => {
      console.error('Failed to send welcome email:', error)
    })

    return NextResponse.json({
      message: 'Email verified successfully! You can now log in.',
      success: true
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

