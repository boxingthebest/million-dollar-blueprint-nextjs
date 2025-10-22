const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        title: true
      }
    });
    
    console.log('📚 Available courses:');
    courses.forEach(course => {
      console.log(`   - ${course.slug} (${course.title})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourses();
