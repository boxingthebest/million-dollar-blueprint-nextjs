import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('📚 Adding PDF module to AI-Resistant Skills course...')

    // Find the AI-Resistant Skills course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: { modules: true }
    })

    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'AI-Resistant Skills course not found'
      }, { status: 404 })
    }

    // Check if Module 2 already exists
    const existingModule2 = course.modules.find(m => m.order === 2)
    if (existingModule2) {
      // Delete existing Module 2 and recreate
      await prisma.module.delete({
        where: { id: existingModule2.id }
      })
      console.log('Deleted existing Module 2')
    }

    // Create Module 2: AI-Resistant Skills Toolkit with 5 PDF resources
    const module = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'AI-Resistant Skills Toolkit',
        description: 'Downloadable resources, workbooks, and tools to implement your AI-resistant skills',
        order: 2,
        lessons: {
          create: [
            {
              title: 'Master Framework Guide',
              description: 'Your comprehensive guide to mastering all 10 proprietary frameworks that AI will never replace',
              videoUrl: '/downloads/AI-Resistant-Skills-Master-Framework-Guide.pdf',
              duration: 0,
              order: 1,
            },
            {
              title: 'Strategic Thinking Toolkit',
              description: 'Diagnosis and system mapping tools for executive-level strategic thinking',
              videoUrl: '/downloads/AI-Resistant-Skills-Strategic-Thinking-Toolkit.pdf',
              duration: 0,
              order: 2,
            },
            {
              title: 'Influence & Communication Blueprint',
              description: 'Master the art of commanding the room and influencing without authority',
              videoUrl: '/downloads/AI-Resistant-Skills-Influence-Communication-Blueprint.pdf',
              duration: 0,
              order: 3,
            },
            {
              title: 'Decision-Making Toolkit',
              description: 'Navigate uncertainty and risk with probabilistic thinking frameworks',
              videoUrl: '/downloads/AI-Resistant-Skills-Decision-Making-Toolkit.pdf',
              duration: 0,
              order: 4,
            },
            {
              title: 'Executive Interview Mastery Playbook',
              description: 'Win high-stakes interviews for six-figure roles with proven frameworks',
              videoUrl: '/downloads/AI-Resistant-Skills-Executive-Interview-Mastery.pdf',
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
      message: 'AI-Resistant Skills Toolkit module added successfully with 5 PDFs',
      module: {
        id: module.id,
        title: module.title,
        order: module.order,
        resourceCount: 5
      },
      pdfs: [
        'Master Framework Guide',
        'Strategic Thinking Toolkit',
        'Influence & Communication Blueprint',
        'Decision-Making Toolkit',
        'Executive Interview Mastery Playbook'
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
