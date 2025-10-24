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

    const coursesToCreate = [
      {
        title: "Sales Mastery",
        slug: "sales",
        description: "Master the art of selling with proven frameworks from top Fortune 100 sales executives.",
        price: 19700,
        thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
        modules: [
          {
            title: "Sales Fundamentals",
            description: "Core principles of effective selling",
            order: 1,
            lessons: [
              { title: "Introduction to Sales Mastery", description: "Overview of the program", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 300, order: 1 },
              { title: "The Psychology of Selling", description: "Understanding buyer behavior", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 2 },
              { title: "Building Rapport", description: "Connect with prospects authentically", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 3 },
              { title: "Needs Analysis", description: "Uncover true customer needs", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 4 },
              { title: "Value Proposition", description: "Communicate value effectively", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 5 }
            ]
          }
        ]
      },
      {
        title: "Leadership & Influence",
        slug: "leadership",
        description: "Develop executive-level leadership skills used by Fortune 100 leaders to inspire and influence teams.",
        price: 19700,
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        modules: [
          {
            title: "Leadership Essentials",
            description: "Core leadership principles and practices",
            order: 1,
            lessons: [
              { title: "Introduction to Leadership", description: "Overview of the program", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 300, order: 1 },
              { title: "Leadership Mindset", description: "Think like a Fortune 100 leader", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 2 },
              { title: "Influence Without Authority", description: "Lead across the organization", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 3 },
              { title: "Team Building", description: "Build high-performing teams", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 4 },
              { title: "Strategic Communication", description: "Communicate vision effectively", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 5 }
            ]
          }
        ]
      },
      {
        title: "Digital Marketing Mastery",
        slug: "marketing",
        description: "Master digital marketing strategies used by Fortune 100 companies to dominate their markets.",
        price: 19700,
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        modules: [
          {
            title: "Digital Marketing Fundamentals",
            description: "Core digital marketing principles",
            order: 1,
            lessons: [
              { title: "Introduction to Digital Marketing", description: "Overview of the program", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 300, order: 1 },
              { title: "Marketing Strategy", description: "Build a winning marketing strategy", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 2 },
              { title: "Content Marketing", description: "Create content that converts", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 3 },
              { title: "Social Media Marketing", description: "Leverage social platforms effectively", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 4 },
              { title: "Analytics & Optimization", description: "Measure and improve performance", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 5 }
            ]
          }
        ]
      },
      {
        title: "Wealth Building",
        slug: "wealth",
        description: "Build lasting wealth with strategies used by Fortune 100 executives and successful entrepreneurs.",
        price: 19700,
        thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
        modules: [
          {
            title: "Wealth Building Fundamentals",
            description: "Core principles of wealth creation",
            order: 1,
            lessons: [
              { title: "Introduction to Wealth Building", description: "Overview of the program", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 300, order: 1 },
              { title: "Wealth Mindset", description: "Think like the wealthy", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 2 },
              { title: "Investment Strategies", description: "Build a diversified portfolio", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 3 },
              { title: "Passive Income", description: "Create multiple income streams", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 4 },
              { title: "Wealth Protection", description: "Preserve and grow your wealth", videoUrl: "https://player.vimeo.com/video/PLACEHOLDER", duration: 600, order: 5 }
            ]
          }
        ]
      }
    ];

    const created = [];
    
    for (const courseData of coursesToCreate) {
      // Check if course already exists
      const existing = await prisma.course.findUnique({
        where: { slug: courseData.slug }
      });

      if (existing) {
        created.push({ slug: courseData.slug, status: "already exists", id: existing.id });
        continue;
      }

      // Create course with modules and lessons
      const course = await prisma.course.create({
        data: {
          title: courseData.title,
          slug: courseData.slug,
          description: courseData.description,
          price: courseData.price,
          isFree: false,
          isPublished: true,
          thumbnail: courseData.thumbnail,
          modules: {
            create: courseData.modules.map(module => ({
              title: module.title,
              description: module.description,
              order: module.order,
              lessons: {
                create: module.lessons.map(lesson => ({
                  title: lesson.title,
                  description: lesson.description,
                  videoUrl: lesson.videoUrl,
                  duration: lesson.duration,
                  order: lesson.order
                }))
              }
            }))
          }
        }
      });

      created.push({ slug: courseData.slug, status: "created", id: course.id });
    }

    return NextResponse.json({ 
      success: true,
      message: `Processed ${coursesToCreate.length} courses`,
      courses: created
    });
    
  } catch (error: any) {
    console.error("Error seeding courses:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}

