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

    // Find the AI-Resistant Skills course (the published one at $197)
    const course = await prisma.course.findFirst({
      where: { 
        AND: [
          { 
            OR: [
              { slug: "ai-resistant-skills" },
              { title: { contains: "AI-Resistant Skills" } }
            ]
          },
          { price: 197 },
          { isPublished: true }
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
        error: "AI-Resistant Skills course not found" 
      }, { status: 404 });
    }

    // Video URLs for the 10 main lessons
    const lessonVideoUrls = [
      "https://player.vimeo.com/video/1129374864/8462d84da1?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129414459/c3afffad25?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129414864/272f58a324?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129415335/47efd8a1aa?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129415686/b37c86e62c?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129415885/7bba6f24bd?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129416243/657cd05863?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129417480/946e450263?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129417841/f4d6644de9?badge=0&autopause=0&player_id=0&app_id=58479",
      "https://player.vimeo.com/video/1129418207/8f8000ae4f?badge=0&autopause=0&player_id=0&app_id=58479"
    ];

    // Bonus video (Executive Interview Secrets)
    const bonusVideoUrl = "https://player.vimeo.com/video/1129743307/a1f70f7a07?badge=0&autopause=0&player_id=0&app_id=58479";

    // Find the main module with video lessons
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
    
    // Update the 10 main lessons
    for (let i = 0; i < Math.min(videoLessons.length, lessonVideoUrls.length); i++) {
      const lesson = videoLessons[i];
      const videoUrl = lessonVideoUrls[i];
      
      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { videoUrl }
      });
      
      updates.push({
        lessonId: lesson.id,
        title: lesson.title,
        order: lesson.order,
        videoUrl,
        type: 'main_lesson',
        updated: true
      });
    }

    // Check if there's a bonus/overview lesson and update it
    const bonusLesson = videoLessons.find(l => 
      l.title.toLowerCase().includes('bonus') || 
      l.title.toLowerCase().includes('overview') ||
      l.title.toLowerCase().includes('interview')
    );

    if (bonusLesson) {
      await prisma.lesson.update({
        where: { id: bonusLesson.id },
        data: { videoUrl: bonusVideoUrl }
      });
      
      updates.push({
        lessonId: bonusLesson.id,
        title: bonusLesson.title,
        videoUrl: bonusVideoUrl,
        type: 'bonus',
        updated: true
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Updated ${updates.length} lessons (${updates.filter(u => u.type === 'main_lesson').length} main + ${updates.filter(u => u.type === 'bonus').length} bonus)`,
      courseId: course.id,
      courseTitle: course.title,
      updates
    });
    
  } catch (error: any) {
    console.error("Error updating AI-Resistant Skills videos:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}
