const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { 
      OR: [
        { title: { contains: 'Sales' } },
        { slug: 'sales' }
      ]
    },
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  });
  
  console.log(JSON.stringify(course, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
