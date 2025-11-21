import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Starting to add videos to Sales Mastery course...')

    // Sales Mastery videos - mapping lesson titles to Vimeo URLs
    const salesVideos = [
      { lessonTitle: 'The $10M+ Sales Mindset', videoUrl: 'https://player.vimeo.com/video/1139206134' },
      { lessonTitle: 'The Art of Prospecting & Pipeline Mastery', videoUrl: 'https://player.vimeo.com/video/1139206584' },
      { lessonTitle: 'Mastering the First 60 Seconds & Building Instant Credibility', videoUrl: 'https://player.vimeo.com/video/1139206924' },
      { lessonTitle: 'MEDDPICC - The Enterprise Sales Qualification System', videoUrl: 'https://player.vimeo.com/video/1139207182' },
      { lessonTitle: 'Discovery That Uncovers Deep Pain - SPIN & Challenger Approach', videoUrl: 'https://player.vimeo.com/video/1139207453' },
      { lessonTitle: 'The Value Proposition & Business Case That Makes You the Only Choice', videoUrl: 'https://player.vimeo.com/video/1139207693' },
      { lessonTitle: 'The Demo That Sells Itself', videoUrl: 'https://player.vimeo.com/video/1139207943' },
      { lessonTitle: 'Objection Handling That Builds Trust', videoUrl: 'https://player.vimeo.com/video/1139208192' },
      { lessonTitle: 'Closing & Negotiation - Strategies from the World\'s Best', videoUrl: 'https://player.vimeo.com/video/1139208479' },
      { lessonTitle: 'Building a Predictable Revenue Engine', videoUrl: 'https://player.vimeo.com/video/1139208768' },
    ]

    const results = {
      salesMastery: [] as any[],
    }

    // Update Sales Mastery lessons
    for (const video of salesVideos) {
      try {
        const result = await prisma.lesson.updateMany({
          where: {
            title: video.lessonTitle,
          },
          data: {
            videoUrl: video.videoUrl,
          },
        })
        results.salesMastery.push({ title: video.lessonTitle, updated: result.count })
        console.log(`✅ Updated: ${video.lessonTitle} - ${result.count} record(s)`)
      } catch (error) {
        results.salesMastery.push({ title: video.lessonTitle, error: String(error) })
        console.error(`❌ Error updating ${video.lessonTitle}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sales Mastery videos updated successfully',
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
