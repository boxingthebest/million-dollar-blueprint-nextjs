import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listCourses() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        _count: {
          select: {
            modules: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    
    console.log(`\n📚 Total courses available: ${courses.length}\n`)
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`)
      console.log(`   ID: ${course.id}`)
      console.log(`   Slug: ${course.slug}`)
      console.log(`   Modules: ${course._count.modules}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listCourses()

