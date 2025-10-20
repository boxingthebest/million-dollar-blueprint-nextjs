import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { videoUrl, title, description, duration } = body

    const updateData: any = {}
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (duration !== undefined) updateData.duration = duration

    const lesson = await prisma.lesson.update({
      where: { id: params.lessonId },
      data: updateData,
    })

    return NextResponse.json(lesson)
  } catch (error) {
    console.error("UPDATE_LESSON_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

