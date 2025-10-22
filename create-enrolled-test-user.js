const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createEnrolledTestUser() {
  try {
    console.log('🔧 Creating test user with course enrollment...\n');

    // Hash password
    const hashedPassword = await bcrypt.hash('TestPass123!', 10);

    // Create or update user
    const user = await prisma.user.upsert({
      where: { email: 'demo@milliondollarblueprint.ai' },
      update: {
        password: hashedPassword,
        name: 'Demo User'
      },
      create: {
        email: 'demo@milliondollarblueprint.ai',
        password: hashedPassword,
        name: 'Demo User'
      }
    });

    console.log('✅ User created/updated:');
    console.log('   Email: demo@milliondollarblueprint.ai');
    console.log('   Password: TestPass123!');
    console.log('   User ID:', user.id);
    console.log('');

    // Find the course
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills-paid' }
    });

    if (!course) {
      console.log('❌ Course not found with slug: ai-resistant-skills-paid');
      return;
    }

    console.log('✅ Course found:', course.title);
    console.log('');

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

    console.log('✅ Enrollment created!');
    console.log('');
    console.log('🎉 SUCCESS! You can now login with:');
    console.log('   Email: demo@milliondollarblueprint.ai');
    console.log('   Password: TestPass123!');
    console.log('');
    console.log('   Login URL: https://milliondollarblueprint.ai/auth/signin');
    console.log('   Course URL: https://milliondollarblueprint.ai/learn/ai-resistant-skills-paid');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createEnrolledTestUser();
