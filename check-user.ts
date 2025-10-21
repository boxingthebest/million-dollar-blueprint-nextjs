import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'test@milliondollarblueprint.ai' },
    include: {
      enrollments: {
        include: {
          course: true
        }
      }
    }
  })
  
  if (user) {
    console.log('✅ User found:', user.email)
    console.log('📧 Email verified:', user.emailVerified ? 'Yes' : 'No')
    console.log('🔒 Has password:', user.password ? 'Yes' : 'No')
    console.log('📚 Enrollments:', user.enrollments.length)
    if (user.enrollments.length > 0) {
      console.log('   Courses:', user.enrollments.map(e => e.course.title).join(', '))
    }
  } else {
    console.log('❌ User not found')
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
