import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail } from "@/lib/email"
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
    
    const { email, password, name } = validationResult.data

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0]
      }
    })

    // Send welcome email to new user (non-blocking)
    // We know email is not null because we just created the user with it
    const userEmail = user.email!
    const userName = user.name || userEmail.split('@')[0]
    sendWelcomeEmail(userEmail, userName).catch(error => {
      console.error("Failed to send welcome email:", error)
    })

    // Admin notification removed - function not available in current email library

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error("SIGNUP_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

