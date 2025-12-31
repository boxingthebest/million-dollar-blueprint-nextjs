export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST to enroll a specific user by email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ 
        error: "User not found",
        message: `No user found with email: ${email}`
      }, { status: 404 });
    }

    // Find the Make First $1K AI course
    const course = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' }
    });

    if (!course) {
      return NextResponse.json({ 
        error: "Course not found",
        message: "Make Your First $1K with AI course does not exist"
      }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    });

    if (existingEnrollment) {
      return NextResponse.json({ 
        success: true,
        message: `${email} is already enrolled in ${course.title}`,
        enrollment: existingEnrollment
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    });

    return NextResponse.json({ 
      success: true,
      message: `Successfully enrolled ${email} in ${course.title}`,
      enrollment
    });
    
  } catch (error: any) {
    console.error("Error enrolling user:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}

// GET to enroll both admin and dapenza@hotmail.com
export async function GET() {
  try {
    const emailsToEnroll = [
      'admin@milliondollarblueprint.ai',
      'dapenza@hotmail.com'
    ];

    // Find the Make First $1K AI course
    const course = await prisma.course.findFirst({
      where: { slug: 'make-first-1k-ai' }
    });

    if (!course) {
      return NextResponse.json({ 
        error: "Course not found",
        message: "Make Your First $1K with AI course does not exist"
      }, { status: 404 });
    }

    const results = [];

    for (const email of emailsToEnroll) {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (!user) {
        results.push({
          email,
          status: 'not found',
          message: `No user found with email: ${email}`
        });
        continue;
      }

      // Check if already enrolled
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id
          }
        }
      });

      if (existingEnrollment) {
        results.push({
          email,
          status: 'already enrolled',
          message: `Already enrolled in ${course.title}`
        });
        continue;
      }

      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id
        }
      });

      results.push({
        email,
        status: 'enrolled',
        message: `Successfully enrolled in ${course.title}`
      });
    }

    return NextResponse.json({ 
      success: true,
      course: course.title,
      results
    });
    
  } catch (error: any) {
    console.error("Error enrolling users:", error);
    return NextResponse.json({
      error: 'Database error',
      message: error.message
    }, { status: 500 });
  }
}
