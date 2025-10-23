const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkCourseContent() {
  try {
    // Get AI-Resistant Skills course
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: { contains: 'ai-resistant' } },
          { title: { contains: 'AI-Resistant' } }
        ]
      },
      include: {
        modules: {
          include: {
            lessons: true
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!course) {
      console.log('❌ AI-Resistant Skills course not found in database')
      return
    }

    console.log('\n📚 COURSE:', course.title)
    console.log('Slug:', course.slug)
    console.log('Published:', course.isPublished)
    console.log('Price: $' + (course.price / 100))
    console.log('\n📦 MODULES:', course.modules.length)
    
    let totalLessons = 0
    course.modules.forEach((module, idx) => {
      console.log(`\nModule ${idx + 1}: ${module.title}`)
      console.log(`  Lessons: ${module.lessons.length}`)
      totalLessons += module.lessons.length
      
      module.lessons.forEach((lesson, lessonIdx) => {
        console.log(`    ${lessonIdx + 1}. ${lesson.title}`)
        console.log(`       Video: ${lesson.videoUrl ? '✅' : '❌'}`)
        console.log(`       Duration: ${lesson.duration} min`)
      })
    })
    
    console.log(`\n📊 TOTAL LESSONS: ${totalLessons}`)
    console.log(`Expected: 10`)
    console.log(`Status: ${totalLessons === 10 ? '✅ COMPLETE' : '⚠️  MISSING ' + (10 - totalLessons) + ' lessons'}`)
    
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkCourseContent()
