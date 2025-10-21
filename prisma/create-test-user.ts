import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const testEmail = 'test@milliondollarblueprint.ai' // Change this to your email
  const testPassword = 'TestPassword123!' // Change this to your preferred password

  console.log('🔐 Creating test user with course access...')

  // Hash password
  const hashedPassword = await bcrypt.hash(testPassword, 10)

  // Create or update user
  const user = await prisma.user.upsert({
    where: { email: testEmail },
    update: {},
    create: {
      email: testEmail,
      name: 'Test User',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  })

  console.log(`✅ User created: ${user.email}`)

  // Find the AI-Resistant Skills course
  const course = await prisma.course.findUnique({
    where: { slug: 'ai-resistant-skills' },
  })

  if (!course) {
    console.error('❌ Course not found! Run seed-ai-course.ts first.')
    return
  }

  // Create enrollment
  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      courseId: course.id,
    },
  })

  console.log(`✅ Enrollment created for: ${course.title}`)
  console.log('\n📝 Login Credentials:')
  console.log(`   Email: ${testEmail}`)
  console.log(`   Password: ${testPassword}`)
  console.log('\n🌐 Login at: https://milliondollarblueprint.ai/auth/signin')
  console.log('\n🎓 Access course at: https://milliondollarblueprint.ai/learn/ai-resistant-skills')
  console.log('\n✨ You now have free access to the course!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

