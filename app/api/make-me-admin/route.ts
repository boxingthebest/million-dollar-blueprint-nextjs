import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Update the logged-in user to admin role
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { role: "admin" },
    })

    return NextResponse.json({
      success: true,
      message: "You are now an admin!",
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    console.error("Error making user admin:", error)
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    )
  }
}

