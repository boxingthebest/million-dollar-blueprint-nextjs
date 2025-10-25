import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log('\n📚 Courses in database:\n')
  courses.forEach(course => {
    console.log(`${course.isPublished ? '✓' : '○'} ${course.title}`)
    console.log(`   Slug: ${course.slug}`)
    console.log(`   URL: https://www.milliondollarblueprint.ai/courses/${course.slug}`)
    console.log('')
  })
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

