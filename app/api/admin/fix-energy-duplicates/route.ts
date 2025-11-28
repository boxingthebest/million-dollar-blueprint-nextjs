import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Get the Executive Energy System course
    const course = await prisma.course.findUnique({
      where: { slug: 'executive-energy-system' },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
    }

    // Find duplicate modules
    const module1Duplicates = course.modules.filter(m => m.title === 'Module 1: Executive Wellness Protocols');
    const module2Duplicates = course.modules.filter(m => m.title === 'Module 2: Executive Wellness Toolkit');

    // Delete the first Module 1 (the one with only 1 lesson)
    if (module1Duplicates.length > 1) {
      const moduleToDelete = module1Duplicates[0]; // First one has only 1 lesson
      await prisma.module.delete({
        where: { id: moduleToDelete.id },
      });
      console.log(`Deleted duplicate Module 1: ${moduleToDelete.id}`);
    }

    // Delete the first Module 2 (the one with 0 lessons)
    if (module2Duplicates.length > 1) {
      const emptyModule = module2Duplicates.find(m => m.lessons.length === 0);
      if (emptyModule) {
        await prisma.module.delete({
          where: { id: emptyModule.id },
        });
        console.log(`Deleted empty Module 2: ${emptyModule.id}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Cleaned up duplicate modules',
      deletedModules: {
        module1: module1Duplicates.length > 1 ? 1 : 0,
        module2: module2Duplicates.some(m => m.lessons.length === 0) ? 1 : 0,
      }
    });
  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
    return NextResponse.json({ success: false, message: 'Error cleaning up duplicates' }, { status: 500 });
  }
}
