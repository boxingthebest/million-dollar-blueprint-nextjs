const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createSimpleTestUser() {
  try {
    // Simple password
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing user if exists
    await prisma.user.deleteMany({
      where: { email: 'test@test.com' }
    });

    // Create user
    const user = await prisma.user.create({
      data: {
        email: 'test@test.com',
        password: hashedPassword,
        name: 'Test User'
      }
    });

    console.log('✅ User created:');
    console.log('   Email: test@test.com');
    console.log('   Password: password123');
    console.log('');

    // Find course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' }
    });

    if (!course) {
      console.log('❌ Course not found');
      return;
    }

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id
      }
    });

    console.log('✅ Enrolled in course!');
    console.log('');
    console.log('🎉 LOGIN CREDENTIALS:');
    console.log('   Email: test@test.com');
    console.log('   Password: password123');
    console.log('');
    console.log('📺 LINKS:');
    console.log('   Login: https://milliondollarblueprint.ai/auth/signin');
    console.log('   Course: https://milliondollarblueprint.ai/learn/ai-resistant-skills');

    // Verify password works
    const testMatch = await bcrypt.compare('password123', hashedPassword);
    console.log('');
    console.log('✅ Password verification:', testMatch ? 'PASS' : 'FAIL');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createSimpleTestUser();
