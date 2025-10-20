import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const body = await request.json()
    const { courseId } = body

    if (!courseId) {
      return new NextResponse("Missing courseId", { status: 400 })
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json({ message: "Already enrolled" })
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
      },
    })

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error("ENROLLMENT_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

