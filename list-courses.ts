import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  })
  
  console.log(`Found ${courses.length} course(s):\n`)
  
  courses.forEach(course => {
    console.log(`📚 ${course.title}`)
    console.log(`   Slug: ${course.slug}`)
    console.log(`   Price: $${course.price / 100}`)
    console.log(`   Free: ${course.isFree}`)
    console.log(`   Modules: ${course.modules.length}`)
    console.log(`   Lessons: ${course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}`)
    console.log('')
  })
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
