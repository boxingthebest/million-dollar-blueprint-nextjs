import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Get AI-Resistant Skills course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          where: { order: 2 },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!course || course.modules.length === 0) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    const module2 = course.modules[0];

    // Delete all existing PDF lessons in Module 2
    await prisma.lesson.deleteMany({
      where: { moduleId: module2.id },
    });

    // Create 4 new PDF lessons with correct filenames
    const pdfs = [
      { 
        title: 'Complete AI-Resistant Skills Blueprint', 
        file: 'Course1-Doc1-AI-Resistant-Skills.pdf',
        description: 'Your comprehensive guide to mastering AI-resistant skills',
        order: 1
      },
      { 
        title: '90-Day Progress Tracker', 
        file: 'Course1-Doc2-ProgressTracker-AI-Resistant-Skills.pdf',
        description: 'Track your progress and milestones',
        order: 2
      },
      { 
        title: 'Framework Templates & Worksheets', 
        file: 'Course1-Doc3-FRAMEWORK_TEMPLATES.pdf',
        description: 'Practical templates for implementing each framework',
        order: 3
      },
      { 
        title: 'Executive Interview Mastery', 
        file: 'Course1-Doc4-Executive-Interview-Mastery.pdf',
        description: 'Master executive-level interviews and land your dream role',
        order: 4
      },
    ];

    for (const pdf of pdfs) {
      await prisma.lesson.create({
        data: {
          title: pdf.title,
          description: pdf.description,
          videoUrl: `/downloads/${pdf.file}`,
          duration: 0,
          order: pdf.order,
          moduleId: module2.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'AI-Resistant Skills PDFs updated successfully',
      pdfsCreated: pdfs.length,
    });
  } catch (error) {
    console.error('Error fixing AI PDFs:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
