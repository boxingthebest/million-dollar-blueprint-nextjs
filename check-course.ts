import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: 'ai-resistant-skills' },
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  })
  
  if (course) {
    console.log('✅ Course found:', course.title)
    console.log('📊 Modules:', course.modules.length)
    console.log('📚 Total Lessons:', course.modules.reduce((acc, m) => acc + m.lessons.length, 0))
  } else {
    console.log('❌ Course not found')
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
