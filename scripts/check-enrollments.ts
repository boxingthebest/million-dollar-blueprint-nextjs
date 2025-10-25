import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('📊 Enrollment Report\n')
  console.log('=' .repeat(80))
  
  // Get all courses
  const courses = await prisma.course.findMany({
    include: {
      enrollments: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            }
          }
        }
      },
      _count: {
        select: {
          enrollments: true
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  })

  console.log(`\n📚 Total Courses: ${courses.length}\n`)

  // Display each course with enrollments
  courses.forEach((course) => {
    const priceDisplay = course.isFree ? 'FREE' : `$${(course.price / 100).toFixed(2)}`
    const status = course.isPublished ? '✅ Published' : '⚠️  Draft'
    
    console.log(`\n${'─'.repeat(80)}`)
    console.log(`📖 ${course.title}`)
    console.log(`   ${status} | ${priceDisplay} | ${course._count.enrollments} student(s) enrolled`)
    console.log(`   Slug: ${course.slug}`)
    
    if (course.enrollments.length > 0) {
      console.log(`\n   👥 Enrolled Students:`)
      course.enrollments.forEach((enrollment, index) => {
        console.log(`      ${index + 1}. ${enrollment.user.name || 'No name'} (${enrollment.user.email})`)
        console.log(`         Enrolled: ${enrollment.createdAt.toLocaleDateString()}`)
      })
    } else {
      console.log(`\n   ℹ️  No students enrolled yet`)
    }
  })

  console.log(`\n${'═'.repeat(80)}`)
  
  // Summary statistics
  const totalEnrollments = courses.reduce((sum, course) => sum + course._count.enrollments, 0)
  const publishedCourses = courses.filter(c => c.isPublished).length
  const paidCourses = courses.filter(c => !c.isFree).length
  const freeCourses = courses.filter(c => c.isFree).length
  
  console.log(`\n📊 Summary Statistics:`)
  console.log(`   Total Enrollments: ${totalEnrollments}`)
  console.log(`   Published Courses: ${publishedCourses}/${courses.length}`)
  console.log(`   Paid Courses: ${paidCourses}`)
  console.log(`   Free Courses: ${freeCourses}`)
  
  // Get unique users
  const allEnrollments = await prisma.enrollment.findMany({
    include: {
      user: true,
      course: true
    }
  })
  
  const uniqueUsers = new Set(allEnrollments.map(e => e.userId))
  console.log(`   Unique Students: ${uniqueUsers.size}`)
  
  // Show students with multiple enrollments
  const userEnrollmentCounts = new Map<string, { name: string, email: string, count: number, courses: string[] }>()
  
  allEnrollments.forEach(enrollment => {
    const userId = enrollment.userId
    if (!userEnrollmentCounts.has(userId)) {
      userEnrollmentCounts.set(userId, {
        name: enrollment.user.name || 'No name',
        email: enrollment.user.email || 'No email',
        count: 0,
        courses: []
      })
    }
    const userData = userEnrollmentCounts.get(userId)!
    userData.count++
    userData.courses.push(enrollment.course.title)
  })
  
  const multiCourseStudents = Array.from(userEnrollmentCounts.entries())
    .filter(([_, data]) => data.count > 1)
    .sort((a, b) => b[1].count - a[1].count)
  
  if (multiCourseStudents.length > 0) {
    console.log(`\n🎓 Students Enrolled in Multiple Courses:`)
    multiCourseStudents.forEach(([userId, data]) => {
      console.log(`\n   ${data.name} (${data.email})`)
      console.log(`   📚 ${data.count} courses:`)
      data.courses.forEach((course, index) => {
        console.log(`      ${index + 1}. ${course}`)
      })
    })
  }
  
  console.log(`\n${'═'.repeat(80)}\n`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

