const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'demo@milliondollarblueprint.ai' },
      include: {
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Name:', user.name);
    console.log('   Has password:', !!user.password);
    console.log('   Enrollments:', user.enrollments.length);
    
    if (user.enrollments.length > 0) {
      console.log('   Enrolled in:', user.enrollments[0].course.title);
    }

    // Test password
    const testPassword = 'TestPass123!';
    const passwordMatch = await bcrypt.compare(testPassword, user.password);
    console.log('   Password "TestPass123!" matches:', passwordMatch);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyUser();
