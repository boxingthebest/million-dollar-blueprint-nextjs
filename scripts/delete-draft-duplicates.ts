import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Deleting duplicate draft courses...\n')

  const draftsToDelete = [
    'sales-mastery',
    'leadership-influence',
    'digital-marketing-mastery',
    'wealth-building'
  ]

  for (const slug of draftsToDelete) {
    const deleted = await prisma.course.deleteMany({
      where: {
        slug: slug,
        isPublished: false
      }
    })
    
    if (deleted.count > 0) {
      console.log(`✅ Deleted draft course: ${slug} (${deleted.count} course(s))`)
    } else {
      console.log(`ℹ️  No draft course found with slug: ${slug}`)
    }
  }

  console.log('\n✨ Cleanup complete!')
  
  // Show remaining courses
  const remainingCourses = await prisma.course.findMany({
    select: {
      title: true,
      slug: true,
      isPublished: true,
      price: true
    },
    orderBy: {
      title: 'asc'
    }
  })

  console.log(`\n📚 Remaining Courses (${remainingCourses.length}):`)
  remainingCourses.forEach((course) => {
    const status = course.isPublished ? '✅' : '⚠️ '
    const price = `$${(course.price / 100).toFixed(2)}`
    console.log(`   ${status} ${course.title} (${course.slug}) - ${price}`)
  })
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

