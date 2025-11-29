import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    // Update Module 1 video lessons with correct URLs and titles
    const module1 = course.modules.find(m => m.order === 1);
    if (module1) {
      const videoLessons = [
        { order: 1, title: 'The Executive Intelligence Framework', videoUrl: 'https://vimeo.com/1129374864', duration: 600 },
        { order: 2, title: 'Systems Thinking Mastery', videoUrl: 'https://vimeo.com/1129414459', duration: 600 },
        { order: 3, title: 'The Goldman Sachs Relationship Framework', videoUrl: 'https://vimeo.com/1129414864', duration: 600 },
        { order: 4, title: 'Influence Without Authority', videoUrl: 'https://vimeo.com/1129415335', duration: 600 },
        { order: 5, title: 'The Apple Innovation Process', videoUrl: 'https://vimeo.com/1129415686', duration: 600 },
        { order: 6, title: 'First Principles Thinking', videoUrl: 'https://vimeo.com/1129415885', duration: 600 },
        { order: 7, title: "Amazon's Leadership Principles in Action", videoUrl: 'https://vimeo.com/1129416243', duration: 600 },
        { order: 8, title: 'Building Trust at Scale', videoUrl: 'https://vimeo.com/1129417480', duration: 600 },
        { order: 9, title: 'The 10X Learning System', videoUrl: 'https://vimeo.com/1129417841', duration: 600 },
        { order: 10, title: 'Your 90-Day Career Action Plan', videoUrl: 'https://vimeo.com/1129418207', duration: 600 },
      ];

      for (const lessonData of videoLessons) {
        const lesson = module1.lessons.find(l => l.order === lessonData.order);
        if (lesson) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              title: lessonData.title,
              videoUrl: lessonData.videoUrl,
              duration: lessonData.duration,
            },
          });
        }
      }
    }

    // Update Module 2 PDF lessons
    const module2 = course.modules.find(m => m.order === 2);
    if (module2) {
      // Delete all existing lessons
      await prisma.lesson.deleteMany({
        where: { moduleId: module2.id },
      });

      // Create 4 new PDF lessons
      const pdfLessons = [
        { 
          order: 1,
          title: 'Complete AI-Resistant Skills Blueprint', 
          videoUrl: '/downloads/Course1-Doc1-AI-Resistant-Skills.pdf',
          description: 'Your comprehensive guide to mastering AI-resistant skills',
          duration: 0
        },
        { 
          order: 2,
          title: '90-Day Progress Tracker', 
          videoUrl: '/downloads/Course1-Doc2-ProgressTracker-AI-Resistant-Skills.pdf',
          description: 'Track your progress and milestones',
          duration: 0
        },
        { 
          order: 3,
          title: 'Framework Templates & Worksheets', 
          videoUrl: '/downloads/Course1-Doc3-FRAMEWORK_TEMPLATES.pdf',
          description: 'Practical templates for implementing each framework',
          duration: 0
        },
        { 
          order: 4,
          title: 'Executive Interview Mastery', 
          videoUrl: '/downloads/Course1-Doc4-Executive-Interview-Mastery.pdf',
          description: 'Master executive-level interviews and land your dream role',
          duration: 0
        },
      ];

      for (const pdfData of pdfLessons) {
        await prisma.lesson.create({
          data: {
            moduleId: module2.id,
            title: pdfData.title,
            description: pdfData.description,
            videoUrl: pdfData.videoUrl,
            duration: pdfData.duration,
            order: pdfData.order,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'AI-Resistant Skills course completely fixed',
      videosUpdated: 10,
      pdfsUpdated: 4,
    });
  } catch (error) {
    console.error('Error fixing AI course:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
