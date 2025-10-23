const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkVideoUrl() {
  const lesson = await prisma.lesson.findFirst({
    where: { title: { contains: 'Critical Thinking' } },
    select: { id: true, title: true, videoUrl: true }
  });
  console.log('Lesson:', JSON.stringify(lesson, null, 2));
  await prisma.$disconnect();
}

checkVideoUrl().catch(console.error);
