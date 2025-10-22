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

    // First, try to run the migration using raw SQL
    try {
      await prisma.$executeRaw`
        ALTER TABLE "User" 
        ADD COLUMN IF NOT EXISTS "role" TEXT DEFAULT 'user'
      `
    } catch (migrationError) {
      console.log("Migration may have already run:", migrationError)
    }

    // Now update the user to admin
    const updatedUser = await prisma.$executeRaw`
      UPDATE "User" 
      SET "role" = 'admin' 
      WHERE "email" = ${session.user.email}
    `

    // Fetch the updated user to confirm
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    return NextResponse.json({
      success: true,
      message: "Migration applied and you are now an admin!",
      user: {
        email: user?.email,
        name: user?.name,
        role: user?.role || "admin",
      },
    })
  } catch (error: any) {
    console.error("Error setting up admin:", error)
    return NextResponse.json(
      { 
        error: "Failed to setup admin",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

