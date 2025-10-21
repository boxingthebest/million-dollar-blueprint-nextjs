import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"

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

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    if (!enrollment) {
      return new NextResponse("Not enrolled in this course", { status: 403 })
    }

    // Get course with all modules and lessons
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: {
                  where: { userId: user.id },
                },
              },
            },
          },
        },
      },
    })

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // Check if all lessons are completed
    const allLessons = course.modules.flatMap((m) => m.lessons)
    const completedLessons = allLessons.filter((l) =>
      l.progress.some((p) => p.completed)
    )

    if (completedLessons.length < allLessons.length) {
      return new NextResponse(
        `Course not completed. ${completedLessons.length}/${allLessons.length} lessons completed.`,
        { status: 400 }
      )
    }

    // Check if certificate already exists
    const existingCertificate = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    })

    if (existingCertificate) {
      return NextResponse.json(existingCertificate)
    }

    // Generate unique certificate ID
    const certificateId = nanoid(16)
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify/${certificateId}`

    // Create certificate record
    const certificate = await prisma.certificate.create({
      data: {
        userId: user.id,
        courseId,
        certificateId,
        verificationUrl,
        completionDate: new Date(),
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error("CERTIFICATE_GENERATION_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

