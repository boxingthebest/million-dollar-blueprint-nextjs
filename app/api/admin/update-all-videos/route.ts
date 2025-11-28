import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Video URL mappings from Vimeo
const courseVideoMappings: Record<string, Array<{ lessonNumber: number; videoUrl: string; title: string; isBonus?: boolean }>> = {
  'ai-resistant-skills': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1129374864', title: 'The Executive Intelligence Framework' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1129414459', title: 'Systems Thinking Mastery' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1129414824', title: 'The Goldman Sachs Relationship Framework' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1129415144', title: 'Influence Without Authority' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1129415414', title: 'The Apple Innovation Process' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1129415885', title: 'First Principles Thinking' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1129416093', title: 'Amazon\'s Leadership Principles in Action' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1129416368', title: 'Building Trust at Scale' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1129416625', title: 'The 10X Learning System' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1129416936', title: 'Your 90-Day Career Action Plan' },
  ],
  'executive-energy-system': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1138978464', title: 'The Executive Energy Framework' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1138978870', title: 'Sleep Optimization for Peak Performance' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1138979171', title: 'The Executive Nutrition Protocol' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1138979503', title: 'High-Performance Movement' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1138979794', title: 'Stress Management & Resilience' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1138980093', title: 'The Recovery Advantage' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1138980353', title: 'Mental Clarity & Focus Optimization' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1138980596', title: 'Building Sustainable Habits' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1138980851', title: 'The Energy Audit' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1138981119', title: 'Your 30-Day Energy Transformation' },
  ],
  'sales-mastery': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1139206134', title: 'The Revenue Architect\'s Mindset' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1139206584', title: 'The MEDDPICC Enterprise Sales Framework' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1139206924', title: 'SPIN Selling: The Question Framework' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1139207182', title: 'The Challenger Sale 2.0' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1139207453', title: 'Building Your Predictive Pipeline' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1139207693', title: 'The Trusted Advisor Blueprint' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1139207943', title: 'Negotiation Mastery: The Chris Voss Method' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1139208192', title: 'Closing Techniques That Actually Work' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1139208479', title: 'The Science of Scale: Building a Sales Machine' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1139208768', title: 'The Future of Sales: AI-Resistant Skills' },
  ],
  'leadership-influence': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1139435783', title: 'The Leadership Mindset Shift' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1139437295', title: 'Emotional Intelligence for Leaders' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1139437895', title: 'Building High-Performing Teams' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1139438594', title: 'Strategic Communication & Influence' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1139439499', title: 'Decision-Making Under Pressure' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1139459532', title: 'Conflict Resolution & Difficult Conversations' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1139460301', title: 'Delegation & Empowerment' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1139461940', title: 'Building Trust & Credibility' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1139463010', title: 'Change Management & Transformation' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1139463757', title: 'Your Leadership Legacy' },
  ],
  'digital-marketing-mastery': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1139647563', title: 'Growth Engineering vs. Traditional Marketing' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1139648310', title: 'The AARRR Pirate Metrics Framework' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1139648726', title: 'The Viral Loop: Engineering Word-of-Mouth' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1139649353', title: 'The Hook Model: Making Products Addictive' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1139651015', title: 'Content Marketing That Converts' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1139651575', title: 'Paid Acquisition: Facebook, Google, LinkedIn' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1139651952', title: 'Email Marketing & Marketing Automation' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1139652274', title: 'Conversion Rate Optimization (CRO)' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1139653488', title: 'Data-Driven Marketing & Analytics' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1139654565', title: 'The Future of Marketing: AI & Automation' },
  ],
  'wealth-building': [
    { lessonNumber: 1, videoUrl: 'https://vimeo.com/1139907727', title: 'The Wealth Mindset: From Earner to Builder' },
    { lessonNumber: 2, videoUrl: 'https://vimeo.com/1139859075', title: 'The All-Weather Portfolio (Ray Dalio)' },
    { lessonNumber: 3, videoUrl: 'https://vimeo.com/1139859347', title: 'Index Fund Investing: The Bogle Method' },
    { lessonNumber: 4, videoUrl: 'https://vimeo.com/1139907974', title: 'Tax Optimization: Keeping What You Earn' },
    { lessonNumber: 5, videoUrl: 'https://vimeo.com/1139859532', title: 'Building Passive Income Machines' },
    { lessonNumber: 6, videoUrl: 'https://vimeo.com/1139908147', title: 'Real Estate Wealth Building' },
    { lessonNumber: 7, videoUrl: 'https://vimeo.com/1139908322', title: 'The Wealth Acceleration Formula' },
    { lessonNumber: 8, videoUrl: 'https://vimeo.com/1139908441', title: 'Protecting Your Wealth: Risk Management' },
    { lessonNumber: 9, videoUrl: 'https://vimeo.com/1139908855', title: 'The Psychology of Wealth: Avoiding Self-Sabotage' },
    { lessonNumber: 10, videoUrl: 'https://vimeo.com/1139858578', title: 'The Path to Financial Independence (FIRE)' },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const { adminKey } = await request.json();

    // Simple admin key check
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: Record<string, any> = {};

    for (const [courseSlug, videos] of Object.entries(courseVideoMappings)) {
      console.log(`Processing course: ${courseSlug}`);

      // Find the course
      const course = await prisma.course.findUnique({
        where: { slug: courseSlug },
        include: { lessons: true },
      });

      if (!course) {
        results[courseSlug] = { error: 'Course not found' };
        continue;
      }

      const updates: any[] = [];

      // Update each lesson's video URL
      for (const videoData of videos) {
        const lesson = course.lessons.find(
          (l) => l.order === videoData.lessonNumber
        );

        if (lesson) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              videoUrl: videoData.videoUrl,
              title: videoData.title,
            },
          });
          updates.push({
            lessonNumber: videoData.lessonNumber,
            title: videoData.title,
            videoUrl: videoData.videoUrl,
          });
        }
      }

      results[courseSlug] = {
        success: true,
        updatedCount: updates.length,
        updates,
      };
    }

    return NextResponse.json({
      success: true,
      message: 'All video URLs updated successfully',
      results,
    });
  } catch (error: any) {
    console.error('Error updating video URLs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update video URLs' },
      { status: 500 }
    );
  }
}
