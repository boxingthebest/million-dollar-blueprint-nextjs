import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendVerificationEmail } from "@/lib/email"
import { signupRatelimit } from "@/lib/ratelimit-simple"
import { signupSchema } from "@/lib/validations/auth"
import { z } from "zod"

export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  try {
    // Rate limiting: 5 signups per minute per IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const { success, limit, reset, remaining } = signupRatelimit(ip)
    
    if (!success) {
      return new NextResponse("Too many signup attempts. Please try again later.", { 
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": new Date(reset).toISOString(),
        }
      })
    }

    const body = await request.json()
    
    // Validate input with Zod
    const validationResult = signupSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      return new NextResponse(errors, { status: 400 })
    }
    
    const { email, password, firstName, lastName } = validationResult.data

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with emailVerified = null (unverified)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`, // Full name for backward compatibility
        emailVerified: null // User must verify email
      }
    })

    // Generate verification token
    const crypto = await import('crypto')
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Store verification token (expires in 24 hours)
    await prisma.emailVerificationToken.create({
      data: {
        email: email,
        token: hashedToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    })

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'https://www.milliondollarblueprint.ai'}/auth/verify-email?token=${verificationToken}`
    sendVerificationEmail(email, verificationUrl).catch(error => {
      console.error('Failed to send verification email:', error)
    })

    return NextResponse.json({
      message: 'Account created! Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: false
      }
    })
  } catch (error) {
    console.error("SIGNUP_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

