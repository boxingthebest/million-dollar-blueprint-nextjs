const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pdfMapping = {
  'Executive Energy Workbook': '90-Day-Energy-Tracker.pdf',
  '90-Day Energy Tracker': '90-Day-Energy-Tracker.pdf',
  'Meal Planning Templates': 'Strategic-Nutrition-Framework.pdf',
  'Exercise Protocols': 'Movement-Recovery-Protocol.pdf',
  'Lesson 1: The High-Performance Mindset': 'High-Performance-Morning-Routine.pdf',
  'Lesson 2: Sleep Architecture for Executives': 'Sleep-Architecture-Guide.pdf',
  'Lesson 3: Strategic Nutrition': 'Strategic-Nutrition-Framework.pdf',
  'Lesson 4: Movement & Recovery': 'Movement-Recovery-Protocol.pdf',
  'Lesson 5: Stress Management': 'Stress-Management-Toolkit.pdf',
  'Lesson 6: Energy Optimization': 'Energy-Optimization-Strategies.pdf',
  'Lesson 7: Focus & Productivity': 'Focus-Productivity-Mastery.pdf',
  'Lesson 8: Resilience Building': 'Resilience-Building-Framework.pdf',
  'Lesson 9: Longevity Strategies': 'Longevity-Strategy-Guide.pdf',
  'Resource Library': 'Executive-Habits-Checklist.pdf'
};

async function fixPDFs() {
  try {
    const course = await prisma.course.findFirst({
      where: { title: { contains: 'Executive Energy' } },
      include: { 
        modules: {
          include: { lessons: true }
        }
      }
    });

    if (!course) {
      console.log('Course not found');
      return;
    }

    const allLessons = course.modules.flatMap(m => m.lessons);
    let updated = 0;

    for (const lesson of allLessons) {
      const correctFilename = pdfMapping[lesson.title];
      if (correctFilename) {
        const newUrl = `/downloads/${correctFilename}`;
        if (lesson.pdfUrl !== newUrl) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { pdfUrl: newUrl }
          });
          console.log(`✓ Updated: ${lesson.title} -> ${correctFilename}`);
          updated++;
        }
      }
    }

    console.log(`\n✅ Updated ${updated} PDF URLs`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPDFs();
