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

    // Find the course
    const course = await prisma.course.findUnique({
      where: { slug: "executive-energy-system" },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ 
        error: "Course not found. Please run seed-course-2 first." 
      }, { status: 404 });
    }

    // Video URLs mapping (Lesson number -> Vimeo URL)
    const videoUrls: { [key: number]: string } = {
      1: "https://player.vimeo.com/video/1130296747/f5b1bd80d5?badge=0&autopause=0&player_id=0&app_id=58479",
      2: "https://player.vimeo.com/video/1138745027/524b88735b?badge=0&autopause=0&player_id=0&app_id=58479",
      3: "https://player.vimeo.com/video/1138748339/5c63088665?badge=0&autopause=0&player_id=0&app_id=58479",
      4: "https://player.vimeo.com/video/1138749400/9b3b0fb28f?badge=0&autopause=0&player_id=0&app_id=58479",
      5: "https://player.vimeo.com/video/1138750184/c424ba9650?badge=0&autopause=0&player_id=0&app_id=58479",
      6: "https://player.vimeo.com/video/1138750599/d0903f4318?badge=0&autopause=0&player_id=0&app_id=58479",
      7: "https://player.vimeo.com/video/1138751058/78b743134a?badge=0&autopause=0&player_id=0&app_id=58479",
      8: "https://player.vimeo.com/video/1138751605/0ad1ac3082?badge=0&autopause=0&player_id=0&app_id=58479",
      9: "https://player.vimeo.com/video/1138753391/d1242f342b?badge=0&autopause=0&player_id=0&app_id=58479",
      10: "https://player.vimeo.com/video/1138758043/adcad49484?badge=0&autopause=0&player_id=0&app_id=58479"
    };

    // Find the main module (Executive Wellness Protocols)
    const mainModule = course.modules.find(m => m.order === 1);
    
    if (!mainModule) {
      return NextResponse.json({ 
        error: "Main module not found" 
      }, { status: 404 });
    }

    // Update each lesson with the correct video URL
    const updates = [];
    for (const lesson of mainModule.lessons) {
      const lessonNumber = lesson.order;
      if (lessonNumber >= 1 && lessonNumber <= 10 && videoUrls[lessonNumber]) {
        const updated = await prisma.lesson.update({
          where: { id: lesson.id },
          data: { videoUrl: videoUrls[lessonNumber] }
        });
        updates.push({
          lessonNumber,
          title: lesson.title,
          updated: true
        });
      }
    }

    return NextResponse.json({ 
      success: true,
      message: `Updated ${updates.length} lessons with real Vimeo URLs`,
      updates
    });
    
  } catch (error: any) {
    console.error("Error updating course videos:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}
