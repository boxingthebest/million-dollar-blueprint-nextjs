import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: { title: { contains: 'Executive Energy' } },
      include: { 
        modules: {
          include: { lessons: true }
        }
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const lessons = course.modules.flatMap(m => m.lessons).map(l => ({
      id: l.id,
      title: l.title,
      videoUrl: l.videoUrl
    }));

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to list lessons' }, { status: 500 });
  }
}
