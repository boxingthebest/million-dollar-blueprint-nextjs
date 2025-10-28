import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Run raw SQL to add the missing columns
    await prisma.$executeRaw`
      ALTER TABLE "User" 
      ADD COLUMN IF NOT EXISTS "firstName" TEXT,
      ADD COLUMN IF NOT EXISTS "lastName" TEXT;
    `

    // Verify the columns were added
    const testUser = await prisma.user.findFirst()
    
    return NextResponse.json({
      success: true,
      message: "Database migration completed successfully!",
      columns_added: ["firstName", "lastName"],
      test_query: "User table can now be queried with firstName and lastName",
      next_steps: "You can now sign up and sign in normally!"
    })
  } catch (error) {
    console.error("DATABASE_FIX_ERROR", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    return NextResponse.json({
      success: false,
      message: "Failed to run database migration",
      error: errorMessage,
      instructions: "Please contact support or check database permissions"
    }, { status: 500 })
  }
}

