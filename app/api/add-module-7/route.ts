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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user?.role !== 'admin') {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      )
    }

    console.log('🎁 Adding Module 7: Your Million Dollar Toolkit...')

    // Find the course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: { modules: true }
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    // Check if Module 7 already exists
    const existingModule = await prisma.module.findFirst({
      where: {
        courseId: course.id,
        title: 'Your Million Dollar Toolkit'
      }
    })

    if (existingModule) {
      return NextResponse.json({
        success: true,
        message: "Module 7 already exists!",
        module: existingModule
      })
    }

    // Create Module 7
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Your Million Dollar Toolkit',
        description: 'Downloadable resources and bonus content to implement everything you\'ve learned',
        order: 2,
      }
    })

    // Define the 5 downloadable resources
    const resources = [
      {
        title: 'AI-Resistant Skills Workbook',
        description: 'Complete 50+ page workbook with frameworks, exercises, and implementation guides',
        videoUrl: '/downloads/AI-Resistant-Skills.pdf',
        duration: 0,
        order: 1
      },
      {
        title: '90-Day Progress Tracker',
        description: 'Track your skill development and career advancement over 90 days',
        videoUrl: '/downloads/ProgressTracker-AI-Resistant-Skills.pdf',
        duration: 0,
        order: 2
      },
      {
        title: 'Framework Templates',
        description: 'Ready-to-use templates for strategic thinking and decision-making',
        videoUrl: '/downloads/FRAMEWORK_TEMPLATES.pdf',
        duration: 0,
        order: 3
      },
      {
        title: 'Resource List',
        description: 'Curated resources for continued learning and professional development',
        videoUrl: '/downloads/RESOURCE_LIST.pdf',
        duration: 0,
        order: 4
      },
      {
        title: '🎁 BONUS: Executive Interview Mastery',
        description: 'Land your dream executive role with insider interview strategies from Fortune 100 recruiters',
        videoUrl: '/downloads/Executive-Interview-Mastery.pdf',
        duration: 0,
        order: 5
      }
    ]

    // Create all resource "lessons"
    for (const resourceData of resources) {
      await prisma.lesson.create({
        data: {
          ...resourceData,
          moduleId: module.id
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: "Module 7: Your Million Dollar Toolkit added successfully!",
      module: {
        id: module.id,
        title: module.title,
        resourcesCount: 5,
      }
    })
  } catch (error: any) {
    console.error("Error adding Module 7:", error)
    return NextResponse.json(
      { 
        error: "Failed to add Module 7",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

