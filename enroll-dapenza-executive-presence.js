const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function enrollUser() {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: 'dapenza@hotmail.com' }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', user.email);

    // Find course
    const course = await prisma.course.findUnique({
      where: { slug: 'executive-presence' }
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
    console.log('🎉 SUCCESS! User enrolled in Executive Presence!');
    console.log('');
    console.log('📝 USER DETAILS:');
    console.log('   Email: dapenza@hotmail.com');
    console.log('');
    console.log('🎬 ACCESS YOUR COURSE:');
    console.log('   1. Go to: https://milliondollarblueprint.ai/auth/signin');
    console.log('   2. Login with your credentials');
    console.log('   3. Navigate to: https://milliondollarblueprint.ai/learn/executive-presence');
    console.log('   4. Start watching the 21 video modules!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

enrollUser();
