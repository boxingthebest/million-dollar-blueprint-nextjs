import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('📚 Adding PDF module to Leadership & Influence course...')

    // Find the Leadership course
    const course = await prisma.course.findUnique({
      where: { slug: 'leadership' },
      include: { modules: true }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Leadership & Influence course not found'
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

    // Create Module 2: Leadership Toolkit with 5 PDF resources
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Leadership Toolkit',
        description: 'Downloadable resources and bonus content to implement everything you\'ve learned',
        order: 2,
        lessons: {
          create: [
            {
              title: 'The Executive Playbook',
              description: 'Complete 50+ page workbook with frameworks, exercises, and implementation guides',
              videoUrl: '/downloads/Leadership-Influence-Executive-Playbook.pdf',
              duration: 0,
              order: 1,
            },
            {
              title: 'Leadership Framework Templates',
              description: 'Executive Presence Scorecard, Influence Toolkit, and Strategic Communication templates',
              videoUrl: '/downloads/Leadership-Influence-Framework-Templates.pdf',
              duration: 0,
              order: 2,
            },
            {
              title: 'Progress Tracker',
              description: 'Track your leadership development and career advancement over 90 days',
              videoUrl: '/downloads/Leadership-Influence-Progress-Tracker.pdf',
              duration: 0,
              order: 3,
            },
            {
              title: 'Quick Reference Guide',
              description: 'Ready-to-use templates for influence, persuasion, and decision-making',
              videoUrl: '/downloads/Leadership-Influence-Quick-Reference.pdf',
              duration: 0,
              order: 4,
            },
            {
              title: 'Resource List',
              description: 'Curated resources for continued learning and professional development',
              videoUrl: '/downloads/Leadership-Influence-Resource-List.pdf',
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
      message: 'Leadership Toolkit module added successfully with 5 PDFs',
      module: {
        id: module.id,
        title: module.title,
        order: module.order,
        resourceCount: 5
      },
      pdfs: [
        'The Executive Playbook',
        'Leadership Framework Templates',
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
