import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userEmail = 'dapenza@hotmail.com'
  const courseSlug = 'sales'

  console.log(`🔍 Finding user: ${userEmail}`)
  
  // Find the user
  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  })

  if (!user) {
    console.error(`❌ User not found: ${userEmail}`)
    process.exit(1)
  }

  console.log(`✅ Found user: ${user.name || user.email} (ID: ${user.id})`)

  // Find the Sales Mastery course
  console.log(`🔍 Finding course: ${courseSlug}`)
  
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug }
  })

  if (!course) {
    console.error(`❌ Course not found: ${courseSlug}`)
    process.exit(1)
  }

  console.log(`✅ Found course: ${course.title} (ID: ${course.id})`)

  // Check if already enrolled
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id
      }
    }
  })

  if (existingEnrollment) {
    console.log(`ℹ️  User is already enrolled in ${course.title}`)
    return
  }

  // Create enrollment
  console.log(`📝 Enrolling user in ${course.title}...`)
  
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: course.id
    }
  })

  console.log(`✅ Successfully enrolled!`)
  console.log(`   User: ${user.email}`)
  console.log(`   Course: ${course.title}`)
  console.log(`   Enrollment ID: ${enrollment.id}`)
  console.log(`   Created: ${enrollment.createdAt}`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
