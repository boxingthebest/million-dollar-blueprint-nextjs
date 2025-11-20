import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Find and delete the draft AI-Resistant Skills course
    const draftCourse = await prisma.course.findFirst({
      where: {
        title: 'AI-Resistant Skills: Future-Proof Your Career',
        status: 'DRAFT',
        price: 1.97
      }
    });

    if (!draftCourse) {
      return NextResponse.json({
        success: false,
        message: 'Draft course not found'
      });
    }

    // Delete the course (this will cascade delete modules and lessons)
    await prisma.course.delete({
      where: {
        id: draftCourse.id
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Draft course deleted successfully',
      deletedCourseId: draftCourse.id
    });
  } catch (error) {
    console.error('Error deleting draft course:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
