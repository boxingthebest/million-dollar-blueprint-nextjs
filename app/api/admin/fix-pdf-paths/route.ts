import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Correct PDF mappings based on ACTUAL files in public/downloads
    const pdfMappings = {
      'ai-resistant-skills': [
        { title: 'Complete AI-Resistant Skills Blueprint', file: 'AI-Resistant-Skills.pdf' },
        { title: 'Framework Templates & Worksheets', file: 'AI-Resistant-Skills-Framework-Templates.pdf' },
        { title: '90-Day Progress Tracker', file: 'AI-Resistant-Skills-Progress-Tracker.pdf' },
        { title: 'Quick Reference Guide', file: 'AI-Resistant-Skills-Quick-Reference.pdf' },
        { title: 'Resource List & Further Learning', file: 'AI-Resistant-Skills-Resource-List.pdf' },
      ],
      'executive-energy-system': [
        { title: 'Complete Executive Energy System Guide', file: 'Executive-Energy-System-Guide.pdf' },
        { title: 'SLEEP Optimization Toolkit', file: 'SLEEP-Optimization-Toolkit.pdf' },
        { title: 'Executive Energy Assessment', file: 'Executive-Energy-Assessment.pdf' },
        { title: 'Quick Reference Guide', file: 'Executive-Energy-Quick-Reference.pdf' },
        { title: 'Metabolic Flexibility Matrix', file: 'Metabolic-Flexibility-Matrix.pdf' },
      ],
      'sales': [
        { title: 'Complete Sales Mastery Blueprint', file: 'Sales-Mastery-Blueprint.pdf' },
        { title: 'Framework Templates & Scripts', file: 'Sales-Mastery-Framework-Templates.pdf' },
        { title: '90-Day Progress Tracker', file: 'Sales-Mastery-Progress-Tracker.pdf' },
        { title: 'Quick Reference Guide', file: 'Sales-Mastery-Quick-Reference.pdf' },
        { title: 'Resource List & Tools', file: 'Sales-Mastery-Resource-List.pdf' },
      ],
      'leadership': [
        { title: 'Complete Leadership Executive Playbook', file: 'Leadership-Influence-Executive-Playbook.pdf' },
        { title: 'Framework Templates & Tools', file: 'Leadership-Influence-Framework-Templates.pdf' },
        { title: '90-Day Progress Tracker', file: 'Leadership-Influence-Progress-Tracker.pdf' },
        { title: 'Quick Reference Guide', file: 'Leadership-Influence-Quick-Reference.pdf' },
        { title: 'Resource List & Further Learning', file: 'Leadership-Influence-Resource-List.pdf' },
      ],
      'marketing': [
        { title: 'Complete Digital Marketing Blueprint', file: 'Digital-Marketing-Playbook.pdf' },
        { title: 'Framework Templates & Campaigns', file: 'Digital-Marketing-Framework-Templates.pdf' },
        { title: '90-Day Progress Tracker', file: 'Digital-Marketing-Progress-Tracker.pdf' },
        { title: 'Quick Reference Guide', file: 'Digital-Marketing-Quick-Reference.pdf' },
        { title: 'Resource List & Tools', file: 'Digital-Marketing-Resource-List.pdf' },
      ],
      'wealth': [
        { title: 'Complete Wealth Building Blueprint', file: 'Doc1-New-The-Complete-Wealth-Building-Blueprint.pdf' },
        { title: 'Framework Templates & Calculators', file: 'Doc2-Wealth-Building-Framework-Templates.pdf' },
        { title: '90-Day Progress Tracker', file: 'Doc3-90-Day-Wealth-Building-Progress-Tracker.pdf' },
        { title: 'Quick Reference Guide', file: 'Doc4-Wealth-Building-Quick-Reference-Guide.pdf' },
        { title: 'Resource List & Tools', file: 'Doc5-Wealth-Building-Resource-List.pdf' },
      ],
    };

    const results = [];

    for (const [courseSlug, pdfs] of Object.entries(pdfMappings)) {
      const course = await prisma.course.findUnique({
        where: { slug: courseSlug },
        include: {
          modules: {
            where: { order: 2 }, // Module 2 contains PDFs
            include: {
              lessons: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

      if (!course || course.modules.length === 0) {
        results.push({ course: courseSlug, status: 'not_found' });
        continue;
      }

      const module2 = course.modules[0];
      const lessons = module2.lessons;

      // Update each lesson with correct PDF path
      for (let i = 0; i < Math.min(lessons.length, pdfs.length); i++) {
        const lesson = lessons[i];
        const pdf = pdfs[i];
        
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            videoUrl: `/downloads/${pdf.file}`,
            title: pdf.title,
          },
        });
      }

      results.push({
        course: courseSlug,
        status: 'success',
        pdfsUpdated: Math.min(lessons.length, pdfs.length),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'PDF paths fixed for all courses',
      results,
    });
  } catch (error) {
    console.error('Error fixing PDF paths:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
