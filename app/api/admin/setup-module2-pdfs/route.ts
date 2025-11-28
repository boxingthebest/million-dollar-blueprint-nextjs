import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const coursePDFs = {
      'ai-resistant-skills': {
        moduleName: 'AI-Resistant Skills Toolkit',
        pdfs: [
          { title: 'Complete AI-Resistant Skills Blueprint', file: 'AI-Resistant-Skills-Playbook.pdf', description: 'Your comprehensive guide to mastering AI-resistant skills' },
          { title: 'Framework Templates & Worksheets', file: 'AI-Framework-Templates.pdf', description: 'Practical templates for implementing each framework' },
          { title: '90-Day Progress Tracker', file: 'ProgressTracker-AI-Resistant-Skills.pdf', description: 'Track your progress and milestones' },
          { title: 'Quick Reference Guide', file: 'AI-Quick-Reference.pdf', description: 'Quick access to key concepts and frameworks' },
          { title: 'Resource List & Further Learning', file: 'AI-Resource-List.pdf', description: 'Curated resources for continued growth' },
        ],
      },
      'executive-energy-system': {
        moduleName: 'Executive Wellness Toolkit',
        pdfs: [
          { title: 'Complete Executive Energy System Guide', file: 'Executive-Energy-System-Guide.pdf', description: 'Your comprehensive wellness optimization guide' },
          { title: 'SLEEP Optimization Toolkit', file: 'SLEEP-Optimization-Toolkit.pdf', description: 'Advanced sleep protocols for peak performance' },
          { title: 'Executive Energy Assessment', file: 'Executive-Energy-Assessment.pdf', description: 'Assess and track your energy levels' },
          { title: 'Quick Reference Guide', file: 'Executive-Energy-Quick-Reference.pdf', description: 'Quick access to wellness protocols' },
          { title: 'Metabolic Flexibility Matrix', file: 'Metabolic-Flexibility-Matrix.pdf', description: 'Optimize your metabolic health' },
        ],
      },
      'sales': {
        moduleName: 'Sales Mastery Toolkit',
        pdfs: [
          { title: 'Complete Sales Mastery Blueprint', file: 'Sales-Mastery-Blueprint.pdf', description: 'Your comprehensive sales training guide' },
          { title: 'Framework Templates & Scripts', file: 'Sales-Mastery-Framework-Templates.pdf', description: 'Proven scripts and templates for every scenario' },
          { title: '90-Day Progress Tracker', file: 'Sales-Mastery-Progress-Tracker.pdf', description: 'Track deals, metrics, and growth' },
          { title: 'Quick Reference Guide', file: 'Sales-Mastery-Quick-Reference.pdf', description: 'Quick access to frameworks and techniques' },
          { title: 'Resource List & Tools', file: 'Sales-Mastery-Resource-List.pdf', description: 'Essential tools and resources for sales professionals' },
        ],
      },
      'leadership': {
        moduleName: 'Leadership & Influence Toolkit',
        pdfs: [
          { title: 'Complete Leadership Executive Playbook', file: 'Leadership-Influence-Executive-Playbook.pdf', description: 'Your comprehensive leadership development guide' },
          { title: 'Framework Templates & Tools', file: 'Leadership-Influence-Framework-Templates.pdf', description: 'Practical tools for leadership situations' },
          { title: '90-Day Progress Tracker', file: 'Leadership-Influence-Progress-Tracker.pdf', description: 'Track your leadership development journey' },
          { title: 'Quick Reference Guide', file: 'Leadership-Influence-Quick-Reference.pdf', description: 'Quick access to leadership frameworks' },
          { title: 'Resource List & Further Learning', file: 'Leadership-Influence-Resource-List.pdf', description: 'Curated leadership resources' },
        ],
      },
      'marketing': {
        moduleName: 'Digital Marketing Toolkit',
        pdfs: [
          { title: 'Complete Digital Marketing Blueprint', file: 'Digital-Marketing-Mastery-Blueprint.pdf', description: 'Your comprehensive marketing strategy guide' },
          { title: 'Framework Templates & Campaigns', file: 'Digital-Marketing-Framework-Templates.pdf', description: 'Ready-to-use marketing templates' },
          { title: '90-Day Progress Tracker', file: 'Digital-Marketing-Progress-Tracker.pdf', description: 'Track campaigns and growth metrics' },
          { title: 'Quick Reference Guide', file: 'Digital-Marketing-Quick-Reference.pdf', description: 'Quick access to marketing frameworks' },
          { title: 'Resource List & Tools', file: 'Digital-Marketing-Resource-List.pdf', description: 'Essential marketing tools and platforms' },
        ],
      },
      'wealth': {
        moduleName: 'Wealth Building Toolkit',
        pdfs: [
          { title: 'Complete Wealth Building Blueprint', file: 'Wealth-Building-Blueprint.pdf', description: 'Your comprehensive wealth building guide' },
          { title: 'Framework Templates & Calculators', file: 'Wealth-Framework-Templates.pdf', description: 'Financial planning templates and tools' },
          { title: '90-Day Progress Tracker', file: 'Wealth-Progress-Tracker.pdf', description: 'Track your wealth building progress' },
          { title: 'Quick Reference Guide', file: 'Wealth-Quick-Reference.pdf', description: 'Quick access to wealth strategies' },
          { title: 'Resource List & Tools', file: 'Wealth-Resource-List.pdf', description: 'Essential wealth building resources' },
        ],
      },
    };

    const results = [];

    for (const [courseSlug, config] of Object.entries(coursePDFs)) {
      const course = await prisma.course.findUnique({
        where: { slug: courseSlug },
        include: { modules: true },
      });

      if (!course) {
        results.push({ course: courseSlug, status: 'not_found' });
        continue;
      }

      // Check if Module 2 already exists
      let module2 = course.modules.find(m => m.title.includes('Toolkit'));

      if (!module2) {
        // Create Module 2
        module2 = await prisma.module.create({
          data: {
            title: `Module 2: ${config.moduleName}`,
            description: 'Downloadable resources, templates, and tools to implement what you\'ve learned',
            order: 2,
            courseId: course.id,
          },
        });
      }

      // Delete existing lessons in Module 2 to avoid duplicates
      await prisma.lesson.deleteMany({
        where: { moduleId: module2.id },
      });

      // Create lessons for each PDF
      for (let i = 0; i < config.pdfs.length; i++) {
        const pdf = config.pdfs[i];
        await prisma.lesson.create({
          data: {
            title: pdf.title,
            description: pdf.description,
            videoUrl: `/downloads/${pdf.file}`, // Store PDF path as videoUrl for now
            duration: 0, // PDFs don't have duration
            order: i + 1,
            moduleId: module2.id,
          },
        });
      }

      results.push({
        course: courseSlug,
        status: 'success',
        pdfsAdded: config.pdfs.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Module 2 PDFs set up for all courses',
      results,
    });
  } catch (error) {
    console.error('Error setting up Module 2 PDFs:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
