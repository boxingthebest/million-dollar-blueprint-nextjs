import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Starting to add videos to courses...')

    // Executive Energy System videos
    const energyVideos = [
      { lessonTitle: 'The Executive Mindset Shift', videoUrl: 'https://vimeo.com/1130296747/f5b1bd80d5' },
      { lessonTitle: 'The Sleep Protocol', videoUrl: 'https://vimeo.com/1138745027/524b88735b' },
      { lessonTitle: 'The Nutrition Framework', videoUrl: 'https://vimeo.com/1138748339/5c63088665' },
      { lessonTitle: 'The Stress Management System', videoUrl: 'https://vimeo.com/1138749400/9b3b0fb28f' },
      { lessonTitle: 'The Energy Optimization Protocol', videoUrl: 'https://vimeo.com/1138750184/c424ba9650' },
      { lessonTitle: 'The Recovery & Regeneration System', videoUrl: 'https://vimeo.com/1138750599/d0903f4318' },
      { lessonTitle: 'The Flow State Formula', videoUrl: 'https://vimeo.com/1138751058/78b743134a' },
      { lessonTitle: 'The Resilience Framework', videoUrl: 'https://vimeo.com/1138751605/0ad1ac3082' },
      { lessonTitle: 'The Breathwork & Meditation Protocol', videoUrl: 'https://vimeo.com/1138753391/d1242f342b' },
      { lessonTitle: 'The Quantified Wellness System', videoUrl: 'https://vimeo.com/1138758043/adcad49484' },
    ]

    // AI-Resistant Skills videos
    const aiVideos = [
      { lessonTitle: 'Critical Thinking & Problem-Solving', videoUrl: 'https://vimeo.com/1129374864/8462d84da1' },
      { lessonTitle: 'Emotional Intelligence & Leadership', videoUrl: 'https://vimeo.com/1129414459/c3afffad25' },
      { lessonTitle: 'Creative Innovation', videoUrl: 'https://vimeo.com/1129414864/272f58a324' },
      { lessonTitle: 'Complex Communication', videoUrl: 'https://vimeo.com/1129415335/47efd8a1aa' },
      { lessonTitle: 'Strategic Decision-Making', videoUrl: 'https://vimeo.com/1129415686/b37c86e62c' },
      { lessonTitle: 'Adaptability & Learning Agility', videoUrl: 'https://vimeo.com/1129415885/7bba6f24bd' },
      { lessonTitle: 'Ethical Judgment', videoUrl: 'https://vimeo.com/1129416243/657cd05863' },
      { lessonTitle: 'Relationship Building', videoUrl: 'https://vimeo.com/1129417480/946e450263' },
      { lessonTitle: 'Systems Thinking', videoUrl: 'https://vimeo.com/1129417841/f4d6644de9' },
      { lessonTitle: 'Entrepreneurial Mindset', videoUrl: 'https://vimeo.com/1129418207/8f8000ae4f' },
    ]

    const results = {
      energySystem: [] as any[],
      aiResistant: [] as any[],
    }

    // Update Executive Energy System lessons
    for (const video of energyVideos) {
      try {
        const result = await prisma.lesson.updateMany({
          where: {
            title: video.lessonTitle,
          },
          data: {
            videoUrl: video.videoUrl,
          },
        })
        results.energySystem.push({ title: video.lessonTitle, updated: result.count })
      } catch (error) {
        results.energySystem.push({ title: video.lessonTitle, error: String(error) })
      }
    }

    // Update AI-Resistant Skills lessons
    for (const video of aiVideos) {
      try {
        const result = await prisma.lesson.updateMany({
          where: {
            title: video.lessonTitle,
          },
          data: {
            videoUrl: video.videoUrl,
          },
        })
        results.aiResistant.push({ title: video.lessonTitle, updated: result.count })
      } catch (error) {
        results.aiResistant.push({ title: video.lessonTitle, error: String(error) })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Videos added successfully',
      results,
    })
  } catch (error) {
    console.error('Error adding videos:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
