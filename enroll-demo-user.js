const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function enrollDemoUser() {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: 'demo@milliondollarblueprint.ai' }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    // Find course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' }
    });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        courseId: course.id
      }
    });

    console.log('✅ SUCCESS! Demo user enrolled in course!');
    console.log('');
    console.log('🎉 LOGIN CREDENTIALS:');
    console.log('   Email: demo@milliondollarblueprint.ai');
    console.log('   Password: TestPass123!');
    console.log('');
    console.log('📺 DIRECT LINKS:');
    console.log('   Login: https://milliondollarblueprint.ai/auth/signin');
    console.log('   Course: https://milliondollarblueprint.ai/learn/ai-resistant-skills');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

enrollDemoUser();
