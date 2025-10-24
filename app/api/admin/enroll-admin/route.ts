import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the admin user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all courses
    const courses = await prisma.course.findMany({
      select: { id: true, title: true, slug: true }
    });

    const enrollments = [];

    for (const course of courses) {
      // Check if already enrolled
      const existing = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id
          }
        }
      });

      if (existing) {
        enrollments.push({ 
          course: course.title, 
          status: "already enrolled" 
        });
        continue;
      }

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          enrolledAt: new Date()
        }
      });

      enrollments.push({ 
        course: course.title, 
        status: "enrolled" 
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Enrolled in ${courses.length} courses`,
      enrollments
    });
    
  } catch (error: any) {
    console.error("Error enrolling admin:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}

