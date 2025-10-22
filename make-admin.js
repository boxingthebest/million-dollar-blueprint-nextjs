const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    const user = await prisma.user.update({
      where: { email: 'admin@milliondollarblueprint.ai' },
      data: { role: 'admin' }
    });
    
    console.log('✅ User updated to admin role!');
    console.log('   Email:', user.email);
    console.log('   Role:', user.role);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
