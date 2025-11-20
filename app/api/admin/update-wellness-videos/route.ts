export const dynamic = "force-dynamic"

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

    // Find the Executive Energy System course
    const course = await prisma.course.findFirst({
      where: { 
        OR: [
          { slug: "executive-energy-system" },
          { slug: "wellness" },
          { title: { contains: "Executive Energy" } }
        ]
      },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ 
        error: "Executive Energy System course not found" 
      }, { status: 404 });
    }

    // Video URLs for the 10 lessons
    const videoUrls = [
      "https://player.vimeo.com/video/1130296747/f5b1bd80d5?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138745027/524b88735b?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138748339/5c63088665?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138749400/9b3b0fb28f?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138750184/c424ba9650?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138750599/d0903f4318?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138751058/78b743134a?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138751605/0ad1ac3082?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138753391/d1242f342b?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1138758043/adcad49484?badge=0&autopause=0&player_id=0&app_id=58479"
    ];

    // Find the main module (should be the first one with video lessons)
    const videoModule = course.modules.find(m => 
      m.lessons.some(l => l.videoUrl && !l.videoUrl.includes('.pdf'))
    );
    
    if (!videoModule) {
      return NextResponse.json({ 
        error: "Video module not found" 
      }, { status: 404 });
    }

    // Get only video lessons (not PDFs)
    const videoLessons = videoModule.lessons
      .filter(l => !l.videoUrl || !l.videoUrl.includes('.pdf'))
      .sort((a, b) => a.order - b.order);

    const updates = [];
    
    // Update each video lesson
    for (let i = 0; i < Math.min(videoLessons.length, videoUrls.length); i++) {
      const lesson = videoLessons[i];
      const videoUrl = videoUrls[i];
      
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl }
      });
      
      updates.push({
        lessonId: lesson.id,
        title: lesson.title,
        order: lesson.order,
        videoUrl,
        updated: true
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Updated ${updates.length} video lessons`,
      courseId: course.id,
      courseTitle: course.title,
      updates
    });
    
  } catch (error: any) {
    console.error("Error updating wellness course videos:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}
