import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
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

    // Update newsletter subscriber to verified
    const subscriber = await prisma.newsletterSubscriber.update({
      where: { email: verificationToken.email },
      data: { 
        verified: true,
        verifiedAt: new Date()
      },
    })

    // Delete used verification token
    await prisma.emailVerificationToken.delete({
      where: { token: hashedToken },
    })

    // TODO: Add to Mailchimp here
    // const mailchimpResult = await addToMailchimp(subscriber.email)
    // if (mailchimpResult.success) {
    //   await prisma.newsletterSubscriber.update({
    //     where: { email: subscriber.email },
    //     data: { mailchimpId: mailchimpResult.id }
    //   })
    // }

    console.log('Newsletter subscriber verified:', subscriber.email)

    return NextResponse.json({
      message: 'Newsletter subscription confirmed! Welcome aboard! 🎉',
      success: true
    })
  } catch (error) {
    console.error('Newsletter verification error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

