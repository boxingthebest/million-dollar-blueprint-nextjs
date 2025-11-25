import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function registerAndEnroll() {
  try {
    const email = 'dapenza@hotmail.com'
    const name = 'Dana Penza'
    const password = 'TempPassword123!' // You'll want to change this after logging in
    
    console.log('👤 Creating user account...')
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'user'
      }
    })
    
    console.log(`✅ User created: ${user.email}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Temporary Password: ${password}`)
    console.log('')
    
    // Get all courses
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true
      }
    })
    
    console.log(`📚 Enrolling in ${courses.length} courses...`)
    console.log('')
    
    // Enroll in each course
    for (const course of courses) {
      const enrollment = await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id
        }
      })
      console.log(`✅ Enrolled in: ${course.title}`)
    }
    
    console.log('')
    console.log('🎉 Registration and enrollment complete!')
    console.log('')
    console.log('📝 Login credentials:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log('')
    console.log('⚠️  Please change your password after logging in!')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

registerAndEnroll()

