import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sendWelcomeEmail, sendAdminNewSignupNotification } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

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

    // Send admin notification (non-blocking)
    // Get admin email from environment variable or use default
    const adminEmail = process.env.ADMIN_EMAIL || "dapenza@hotmail.com"
    sendAdminNewSignupNotification(adminEmail, userName, userEmail).catch(error => {
      console.error("Failed to send admin notification:", error)
    })

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

