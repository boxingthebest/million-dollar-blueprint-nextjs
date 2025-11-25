import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
    },
  })
  
  console.log('Courses in database:')
  courses.forEach(course => {
    console.log(`  - ${course.slug} (${course.title})`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
