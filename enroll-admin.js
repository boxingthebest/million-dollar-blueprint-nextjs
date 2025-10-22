const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function enrollAdmin() {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: 'admin@milliondollarblueprint.ai' }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', user.email);

    // Find course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' }
    });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    console.log('✅ Course found:', course.title);

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

    console.log('');
    console.log('🎉 SUCCESS! Admin user enrolled in course!');
    console.log('');
    console.log('📝 LOGIN CREDENTIALS:');
    console.log('   Email: admin@milliondollarblueprint.ai');
    console.log('   Password: Admin123!');
    console.log('');
    console.log('🎬 ACCESS YOUR COURSE:');
    console.log('   1. Go to: https://milliondollarblueprint.ai/auth/signin');
    console.log('   2. Login with the credentials above');
    console.log('   3. Navigate to: https://milliondollarblueprint.ai/learn/ai-resistant-skills');
    console.log('   4. Click any lesson to watch the video!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

enrollAdmin();
