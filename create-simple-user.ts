import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const testEmail = 'admin@test.com'
  const testPassword = 'password123'

  console.log('🔐 Creating simple test user...')

  // Hash password
  const hashedPassword = await bcrypt.hash(testPassword, 10)

  // Delete existing user if exists
  await prisma.user.deleteMany({
    where: { email: testEmail }
  })

  // Create user
  const user = await prisma.user.create({
    data: {
      email: testEmail,
      name: 'Admin User',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  })

  console.log(`✅ User created: ${user.email}`)

  // Find the AI-Resistant Skills course
  const course = await prisma.course.findUnique({
    where: { slug: 'ai-resistant-skills' },
  })

  if (course) {
    // Create enrollment
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
      },
    })
    console.log(`✅ Enrolled in: ${course.title}`)
  }

  console.log('\n📝 Login Credentials:')
  console.log(`   Email: ${testEmail}`)
  console.log(`   Password: ${testPassword}`)
  console.log('\n🌐 Login at: https://milliondollarblueprint.ai/auth/signin')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

