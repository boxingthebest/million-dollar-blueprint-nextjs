import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: "If an account exists with that email, a password reset link has been sent.",
      })
    }

    // Delete any existing reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    })

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")

    // Create reset token in database (expires in 1 hour)
    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token: hashedToken,
        expires: new Date(Date.now() + 3600000), // 1 hour
      },
    })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || "https://www.milliondollarblueprint.ai"}/auth/reset-password?token=${resetToken}`

    // Send email
    const emailResult = await sendPasswordResetEmail(email, resetUrl)
    
    if (!emailResult.success) {
      console.error("Failed to send password reset email:", emailResult.error)
      // Delete the token since we couldn't send the email
      await prisma.passwordResetToken.deleteMany({
        where: { email: email.toLowerCase() },
      })
      return NextResponse.json(
        { error: "Failed to send reset email. Please try again or contact support." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: "If an account exists with that email, a password reset link has been sent.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

