import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if course already exists
    const existing = await prisma.course.findUnique({
      where: { slug: "executive-energy-system" }
    });

    if (existing) {
      return NextResponse.json({ 
        message: "Course already exists", 
        courseId: existing.id 
      });
    }

    // Create Course 2
    const course = await prisma.course.create({
      data: {
        title: "The Executive Energy System™",
        slug: "executive-energy-system",
        description: "What Fortune 100 executives pay $2,997 for in executive coaching. Yours for $197.",
        price: 19700,
        isFree: false,
        isPublished: true,
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
        modules: {
          create: [
            {
              title: "Executive Wellness Protocols",
              description: "10 evidence-based lessons on energy optimization",
              order: 1,
              lessons: {
                create: [
                  {
                    title: "Welcome to The Executive Energy System™",
                    description: "Introduction to the program and what to expect",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 300,
                    order: 0
                  },
                  {
                    title: "Lesson 1: The High-Performance Mindset",
                    description: "Master the mindset frameworks used by Fortune 100 executives",
                    videoUrl: "https://player.vimeo.com/video/1130296747?badge=0&autopause=0&player_id=0&app_id=58479",
                    duration: 600,
                    order: 1
                  },
                  {
                    title: "Lesson 2: Sleep Architecture for Executives",
                    description: "Optimize your sleep for peak performance",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 2
                  },
                  {
                    title: "Lesson 3: Strategic Nutrition",
                    description: "Fuel your body for sustained energy",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 3
                  },
                  {
                    title: "Lesson 4: Movement & Recovery",
                    description: "Exercise protocols for busy executives",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 4
                  },
                  {
                    title: "Lesson 5: Stress Management",
                    description: "Master stress for peak performance",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 5
                  },
                  {
                    title: "Lesson 6: Energy Optimization",
                    description: "Maximize your daily energy levels",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 6
                  },
                  {
                    title: "Lesson 7: Focus & Productivity",
                    description: "Achieve more in less time",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 7
                  },
                  {
                    title: "Lesson 8: Resilience Building",
                    description: "Bounce back stronger from setbacks",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 8
                  },
                  {
                    title: "Lesson 9: Longevity Strategies",
                    description: "Build a foundation for long-term health",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 9
                  },
                  {
                    title: "Lesson 10: Integration & Implementation",
                    description: "Put it all together for lasting results",
                    videoUrl: "https://player.vimeo.com/video/PLACEHOLDER",
                    duration: 600,
                    order: 10
                  }
                ]
              }
            },
            {
              title: "Executive Wellness Toolkit",
              description: "5 downloadable resources to support your journey",
              order: 2,
              lessons: {
                create: [
                  {
                    title: "Executive Energy Workbook",
                    description: "Complete workbook with all frameworks and exercises",
                    videoUrl: "/downloads/Executive-Energy-Workbook.pdf",
                    duration: 0,
                    order: 1
                  },
                  {
                    title: "90-Day Energy Tracker",
                    description: "Track your energy levels and progress",
                    videoUrl: "/downloads/Energy-Tracker.pdf",
                    duration: 0,
                    order: 2
                  },
                  {
                    title: "Meal Planning Templates",
                    description: "Executive-friendly meal plans and recipes",
                    videoUrl: "/downloads/Meal-Planning-Templates.pdf",
                    duration: 0,
                    order: 3
                  },
                  {
                    title: "Exercise Protocols",
                    description: "Time-efficient workout routines",
                    videoUrl: "/downloads/Exercise-Protocols.pdf",
                    duration: 0,
                    order: 4
                  },
                  {
                    title: "Resource Library",
                    description: "Curated resources for continued learning",
                    videoUrl: "/downloads/Resource-Library.pdf",
                    duration: 0,
                    order: 5
                  }
                ]
              }
            }
          ]
        }
      },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true,
      message: "Course 2 created successfully!",
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        modulesCount: course.modules.length,
        lessonsCount: course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      }
    });
    
  } catch (error: any) {
    console.error("Error seeding course:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}

