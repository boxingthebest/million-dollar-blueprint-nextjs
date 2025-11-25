const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      price: true,
      isPublished: true,
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
  
  console.log('\n=== COURSES IN DATABASE ===\n')
  courses.forEach(course => {
    console.log(`Title: ${course.title}`)
    console.log(`Slug: ${course.slug}`)
    console.log(`Price: $${course.price / 100}`)
    console.log(`Published: ${course.isPublished}`)
    console.log(`ID: ${course.id}`)
    console.log('---')
  })
  console.log(`\nTotal courses: ${courses.length}\n`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
