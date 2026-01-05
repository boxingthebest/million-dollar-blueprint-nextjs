export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const debugInfo: Record<string, unknown> = {}
  
  try {
    // Step 1: Check session
    debugInfo.step = "checking session"
    const session = await getServerSession(authOptions)
    debugInfo.hasSession = !!session
    debugInfo.sessionEmail = session?.user?.email || null

    if (!session?.user?.email) {
      return NextResponse.json({ 
        error: "Unauthorized", 
        debug: debugInfo 
      }, { status: 401 })
    }

    // Step 2: Check user role
    debugInfo.step = "checking user role"
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, role: true }
    })
    debugInfo.user = user

    if (user?.role !== "admin") {
      return NextResponse.json({ 
        error: "Forbidden", 
        debug: debugInfo 
      }, { status: 403 })
    }

    // Step 3: Simple counts
    debugInfo.step = "counting users"
    const totalUsers = await prisma.user.count()
    debugInfo.totalUsers = totalUsers

    debugInfo.step = "counting courses"
    const totalCourses = await prisma.course.count()
    debugInfo.totalCourses = totalCourses

    debugInfo.step = "counting enrollments"
    const totalEnrollments = await prisma.enrollment.count()
    debugInfo.totalEnrollments = totalEnrollments

    debugInfo.step = "complete"

    return NextResponse.json({
      success: true,
      debug: debugInfo,
      data: {
        totalUsers,
        totalCourses,
        totalEnrollments
      }
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json({
      error: "Dashboard debug failed",
      failedAt: debugInfo.step,
      errorMessage,
      errorStack,
      debug: debugInfo
    }, { status: 500 })
  }
}
