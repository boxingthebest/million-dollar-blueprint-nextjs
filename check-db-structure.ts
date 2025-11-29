import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              videoUrl: true,
              order: true,
            }
          }
        }
      }
    }
  })

  for (const course of courses) {
    console.log(`\n📚 ${course.title} (${course.slug})`)
    console.log(`   Modules: ${course.modules.length}`)
    
    for (const module of course.modules) {
      console.log(`\n   📂 Module ${module.order}: ${module.title}`)
      console.log(`      Lessons: ${module.lessons.length}`)
      
      for (const lesson of module.lessons.slice(0, 3)) {
        const urlType = lesson.videoUrl.includes('vimeo') ? '🎥 Video' : '📄 PDF'
        console.log(`      ${lesson.order}. ${urlType} - ${lesson.title}`)
        console.log(`         URL: ${lesson.videoUrl.substring(0, 60)}...`)
      }
      
      if (module.lessons.length > 3) {
        console.log(`      ... and ${module.lessons.length - 3} more`)
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
