import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Find the Wealth Building course
    const course = await prisma.course.findFirst({
      where: { slug: 'wealth' },
      include: { modules: true }
    });

    if (!course) {
      return NextResponse.json({ error: 'Wealth Building course not found' }, { status: 404 });
    }

    // Find Module 2 (Wealth Building Toolkit)
    const module2 = course.modules.find(m => m.title === 'Wealth Building Toolkit');

    if (!module2) {
      return NextResponse.json({ error: 'Module 2 not found' }, { status: 404 });
    }

    // Update Module 2 resources with real PDF URLs
    const updatedModule = await prisma.module.update({
      where: { id: module2.id },
      data: {
        resources: [
          {
            title: 'The Complete Wealth Building Blueprint',
            description: 'Wall Street insider strategies for building generational wealth with frameworks from Ray Dalio, John Bogle, and Naval Ravikant',
            type: 'pdf',
            url: '/downloads/Doc1-New-The-Complete-Wealth-Building-Blueprint.pdf'
          },
          {
            title: 'Framework Templates',
            description: 'Ready-to-use templates: All-Weather Portfolio Tracker, FIRE Calculator, BRRRR Analyzer, and more',
            type: 'pdf',
            url: '/downloads/Doc2-Wealth-Building-Framework-Templates.pdf'
          },
          {
            title: '90-Day Progress Tracker',
            description: 'Structured action plan with weekly tasks, habit trackers, and milestone checkpoints',
            type: 'pdf',
            url: '/downloads/Doc3-90-Day-Wealth-Building-Progress-Tracker.pdf'
          },
          {
            title: 'Quick Reference Guide',
            description: 'Essential formulas, frameworks, and cheat sheets for FIRE, portfolio allocation, tax strategies, and real estate',
            type: 'pdf',
            url: '/downloads/Doc4-Wealth-Building-Quick-Reference-Guide.pdf'
          },
          {
            title: 'Resource List',
            description: 'Curated books, platforms (Vanguard, Fundrise), calculators, podcasts, and professional services',
            type: 'pdf',
            url: '/downloads/Doc5-Wealth-Building-Resource-List.pdf'
          }
        ]
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Wealth Building PDFs updated successfully',
      module: updatedModule
    });
  } catch (error) {
    console.error('Error updating Wealth Building PDFs:', error);
    return NextResponse.json({ error: 'Failed to update PDFs' }, { status: 500 });
  }
}
