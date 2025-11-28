import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const results = [];

    // Course 2: Executive Energy System
    const energyCourse = await prisma.course.findUnique({
      where: { slug: 'executive-energy-system' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (energyCourse) {
      const energyVideos = [
        'https://vimeo.com/1138978464',
        'https://vimeo.com/1138978870',
        'https://vimeo.com/1138979171',
        'https://vimeo.com/1138979503',
        'https://vimeo.com/1138979794',
        'https://vimeo.com/1138980093',
        'https://vimeo.com/1138980353',
        'https://vimeo.com/1138980596',
        'https://vimeo.com/1138980851',
        'https://vimeo.com/1138981119',
      ];

      const mainModule = energyCourse.modules.find(m => !m.title.includes('Toolkit') && !m.title.includes('Download'));
      if (mainModule) {
        for (let i = 0; i < mainModule.lessons.length && i < energyVideos.length; i++) {
          await prisma.lesson.update({
            where: { id: mainModule.lessons[i].id },
            data: { videoUrl: energyVideos[i] },
          });
        }
        results.push({ course: 'Executive Energy System', updated: Math.min(mainModule.lessons.length, energyVideos.length) });
      }
    }

    // Course 3: Sales Mastery
    const salesCourse = await prisma.course.findUnique({
      where: { slug: 'sales' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (salesCourse) {
      const salesVideos = [
        'https://vimeo.com/1139206134',
        'https://vimeo.com/1139206584',
        'https://vimeo.com/1139206924',
        'https://vimeo.com/1139207182',
        'https://vimeo.com/1139207453',
        'https://vimeo.com/1139207693',
        'https://vimeo.com/1139207943',
        'https://vimeo.com/1139208192',
        'https://vimeo.com/1139208479',
        'https://vimeo.com/1139208768',
      ];

      const mainModule = salesCourse.modules.find(m => !m.title.includes('Toolkit') && !m.title.includes('Download'));
      if (mainModule) {
        for (let i = 0; i < mainModule.lessons.length && i < salesVideos.length; i++) {
          await prisma.lesson.update({
            where: { id: mainModule.lessons[i].id },
            data: { videoUrl: salesVideos[i] },
          });
        }
        results.push({ course: 'Sales Mastery', updated: Math.min(mainModule.lessons.length, salesVideos.length) });
      }
    }

    // Course 4: Leadership & Influence
    const leadershipCourse = await prisma.course.findUnique({
      where: { slug: 'leadership' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (leadershipCourse) {
      const leadershipVideos = [
        'https://vimeo.com/1139435783',
        'https://vimeo.com/1139437295',
        'https://vimeo.com/1139437895',
        'https://vimeo.com/1139438594',
        'https://vimeo.com/1139439499',
        'https://vimeo.com/1139459532',
        'https://vimeo.com/1139460301',
        'https://vimeo.com/1139461940',
        'https://vimeo.com/1139463010',
        'https://vimeo.com/1139463757',
      ];

      const mainModule = leadershipCourse.modules.find(m => !m.title.includes('Toolkit') && !m.title.includes('Download'));
      if (mainModule) {
        for (let i = 0; i < mainModule.lessons.length && i < leadershipVideos.length; i++) {
          await prisma.lesson.update({
            where: { id: mainModule.lessons[i].id },
            data: { videoUrl: leadershipVideos[i] },
          });
        }
        results.push({ course: 'Leadership & Influence', updated: Math.min(mainModule.lessons.length, leadershipVideos.length) });
      }
    }

    // Course 5: Digital Marketing
    const marketingCourse = await prisma.course.findUnique({
      where: { slug: 'marketing' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (marketingCourse) {
      const marketingVideos = [
        'https://vimeo.com/1139647563',
        'https://vimeo.com/1139648310',
        'https://vimeo.com/1139648726',
        'https://vimeo.com/1139649353',
        'https://vimeo.com/1139651015',
        'https://vimeo.com/1139651575',
        'https://vimeo.com/1139651952',
        'https://vimeo.com/1139652274',
        'https://vimeo.com/1139653488',
        'https://vimeo.com/1139654565',
      ];

      const mainModule = marketingCourse.modules.find(m => !m.title.includes('Toolkit') && !m.title.includes('Download'));
      if (mainModule) {
        for (let i = 0; i < mainModule.lessons.length && i < marketingVideos.length; i++) {
          await prisma.lesson.update({
            where: { id: mainModule.lessons[i].id },
            data: { videoUrl: marketingVideos[i] },
          });
        }
        results.push({ course: 'Digital Marketing', updated: Math.min(mainModule.lessons.length, marketingVideos.length) });
      }
    }

    // Course 6: Wealth Building
    const wealthCourse = await prisma.course.findUnique({
      where: { slug: 'wealth' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (wealthCourse) {
      const wealthVideos = [
        'https://vimeo.com/1139907727',
        'https://vimeo.com/1139859075',
        'https://vimeo.com/1139859347',
        'https://vimeo.com/1139907974',
        'https://vimeo.com/1139859532',
        'https://vimeo.com/1139908147',
        'https://vimeo.com/1139908322',
        'https://vimeo.com/1139908441',
        'https://vimeo.com/1139908855',
        'https://vimeo.com/1139858578',
      ];

      const mainModule = wealthCourse.modules.find(m => !m.title.includes('Toolkit') && !m.title.includes('Download'));
      if (mainModule) {
        for (let i = 0; i < mainModule.lessons.length && i < wealthVideos.length; i++) {
          await prisma.lesson.update({
            where: { id: mainModule.lessons[i].id },
            data: { videoUrl: wealthVideos[i] },
          });
        }
        results.push({ course: 'Wealth Building', updated: Math.min(mainModule.lessons.length, wealthVideos.length) });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Fixed video URLs for all courses',
      results,
    });
  } catch (error: any) {
    console.error('Error fixing all videos:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fix all videos' },
      { status: 500 }
    );
  }
}
