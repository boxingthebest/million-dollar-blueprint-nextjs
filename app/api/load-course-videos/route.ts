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

    console.log('🚀 Loading Course 1: AI-Resistant Skills...')

    // Find or create the course
    let course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: { modules: true }
    })

    if (!course) {
      course = await prisma.course.create({
        data: {
          slug: 'ai-resistant-skills',
          title: 'AI-Resistant Skills: Future-Proof Your Career',
          description: 'Master the 10 essential skills that AI cannot replace. Strategic frameworks from Fortune 100 executives.',
          price: 19700,
          isFree: false,
          isPublished: true,
        }
      })
    } else {
      // Delete existing modules to clean up
      await prisma.module.deleteMany({
        where: { courseId: course.id }
      })
      
      // Update course to ensure it's published
      course = await prisma.course.update({
        where: { id: course.id },
        data: { isPublished: true }
      })
    }

    // Create module
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'AI-Resistant Skills Mastery',
        description: '10 essential skills that will future-proof your career',
        order: 1,
      }
    })

    // Define all 10 lessons
    const lessons = [
      {
        title: 'Critical Thinking & Problem-Solving',
        description: 'Master analytical frameworks that AI cannot replicate',
        videoUrl: 'https://vimeo.com/1036383464/d4b3b4f1f0',
        duration: 600,
        order: 1
      },
      {
        title: 'Emotional Intelligence & Leadership',
        description: 'Develop human-centric leadership skills',
        videoUrl: 'https://vimeo.com/1036383528/f3a6d2e8f5',
        duration: 600,
        order: 2
      },
      {
        title: 'Creative Innovation',
        description: 'Unlock breakthrough thinking and innovation',
        videoUrl: 'https://vimeo.com/1036383583/8b5c7f9e2a',
        duration: 600,
        order: 3
      },
      {
        title: 'Complex Communication',
        description: 'Master nuanced communication in complex scenarios',
        videoUrl: 'https://vimeo.com/1036383629/1d8e4a6c3b',
        duration: 600,
        order: 4
      },
      {
        title: 'Strategic Decision-Making',
        description: 'Make high-stakes decisions with confidence',
        videoUrl: 'https://vimeo.com/1036383680/9f2b5d7e4c',
        duration: 600,
        order: 5
      },
      {
        title: 'Adaptability & Learning Agility',
        description: 'Thrive in rapidly changing environments',
        videoUrl: 'https://vimeo.com/1036383724/6e3a8f1d2b',
        duration: 600,
        order: 6
      },
      {
        title: 'Ethical Judgment',
        description: 'Navigate complex ethical dilemmas',
        videoUrl: 'https://vimeo.com/1036383766/4c7b9e2f5a',
        duration: 600,
        order: 7
      },
      {
        title: 'Relationship Building',
        description: 'Build authentic professional relationships',
        videoUrl: 'https://vimeo.com/1036383809/2a5d8c3e6f',
        duration: 600,
        order: 8
      },
      {
        title: 'Systems Thinking',
        description: 'See the big picture and interconnections',
        videoUrl: 'https://vimeo.com/1036383852/7f4e1b9c2d',
        duration: 600,
        order: 9
      },
      {
        title: 'Entrepreneurial Mindset',
        description: 'Think like a founder and create value',
        videoUrl: 'https://vimeo.com/1036383894/3b6f8a4e1c',
        duration: 600,
        order: 10
      }
    ]

    // Create all lessons
    for (const lessonData of lessons) {
      await prisma.lesson.create({
        data: {
          ...lessonData,
          moduleId: module.id
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: "All 10 Course 1 videos loaded successfully!",
      course: {
        slug: course.slug,
        title: course.title,
        lessonsCount: 10,
        url: `https://milliondollarblueprint.ai/learn/${course.slug}`
      }
    })
  } catch (error: any) {
    console.error("Error loading course videos:", error)
    return NextResponse.json(
      { 
        error: "Failed to load course videos",
        details: error.message 
      },
      { status: 500 }
    )
  }
}

