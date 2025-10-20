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
    const { lessonId, completed } = body

    if (!lessonId) {
      return new NextResponse("Missing lessonId", { status: 400 })
    }

    // Upsert lesson progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: {
        completed,
        watchedAt: completed ? new Date() : null,
      },
      create: {
        userId: user.id,
        lessonId,
        completed,
        watchedAt: completed ? new Date() : null,
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error("LESSON_PROGRESS_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

