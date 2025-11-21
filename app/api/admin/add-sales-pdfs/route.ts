import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('📚 Adding PDF module to Sales Mastery course...')

    // Find the Sales Mastery course
    const course = await prisma.course.findUnique({
      where: { slug: 'sales' },
      include: { modules: true }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Sales Mastery course not found'
      }, { status: 404 })
    }

    // Check if Module 2 already exists
    const existingModule2 = course.modules.find(m => m.order === 2)
    if (existingModule2) {
      return NextResponse.json({
        success: false,
        message: 'Module 2 already exists. Delete it first if you want to recreate it.',
        moduleId: existingModule2.id
      })
    }

    // Create Module 2: Sales Mastery Toolkit with 5 PDF resources
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Sales Mastery Toolkit',
        description: 'Downloadable resources and bonus content to implement everything you\'ve learned',
        order: 2,
        lessons: {
          create: [
            {
              title: 'The Blueprint for High-Ticket Closing',
              description: 'Complete 50+ page workbook with frameworks, exercises, and implementation guides',
              videoUrl: '/downloads/Sales-Mastery-Blueprint.pdf',
              duration: 0,
              order: 1,
            },
            {
              title: 'Sales Framework Templates',
              description: 'Revenue Architecture Canvas, Pipeline Calculator, and Dashboard templates',
              videoUrl: '/downloads/Sales-Mastery-Framework-Templates.pdf',
              duration: 0,
              order: 2,
            },
            {
              title: 'Progress Tracker',
              description: 'Track your skill development and sales advancement over 90 days',
              videoUrl: '/downloads/Sales-Mastery-Progress-Tracker.pdf',
              duration: 0,
              order: 3,
            },
            {
              title: 'Quick Reference Guide',
              description: 'Ready-to-use templates for strategic thinking and decision-making',
              videoUrl: '/downloads/Sales-Mastery-Quick-Reference.pdf',
              duration: 0,
              order: 4,
            },
            {
              title: 'Resource List',
              description: 'Curated resources for continued learning and professional development',
              videoUrl: '/downloads/Sales-Mastery-Resource-List.pdf',
              duration: 0,
              order: 5,
            },
          ],
        },
      },
    })

    console.log(`✅ Module 2 created with 5 PDF resources`)

    return NextResponse.json({
      success: true,
      message: 'Sales Mastery Toolkit module added successfully with 5 PDFs',
      module: {
        id: module.id,
        title: module.title,
        order: module.order,
        resourceCount: 5
      },
      pdfs: [
        'The Blueprint for High-Ticket Closing',
        'Sales Framework Templates',
        'Progress Tracker',
        'Quick Reference Guide',
        'Resource List'
      ]
    })
  } catch (error) {
    console.error('❌ Error adding PDF module:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
