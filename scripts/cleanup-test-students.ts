import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupTestStudents() {
  try {
    console.log('🗑️  Starting cleanup of test student accounts...')
    
    // Email to keep
    const keepEmail = 'dapenza@hotmail.com'
    
    // Get all users except the one to keep and admins
    const usersToDelete = await prisma.user.findMany({
      where: {
        email: {
          not: keepEmail
        },
        role: {
          not: 'admin'
        }
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    })
    
    console.log(`\n📋 Found ${usersToDelete.length} student accounts to delete:`)
    usersToDelete.forEach(user => {
      console.log(`   - ${user.name} (${user.email})`)
    })
    
    console.log(`\n✅ Keeping: ${keepEmail}`)
    console.log(`\n🚀 Starting deletion process...\n`)
    
    for (const user of usersToDelete) {
      console.log(`Deleting ${user.email}...`)
      
      // Delete in correct order to avoid foreign key constraints
      
      // 1. Delete lesson progress
      const deletedProgress = await prisma.lessonProgress.deleteMany({
        where: { userId: user.id }
      })
      console.log(`   ✓ Deleted ${deletedProgress.count} lesson progress records`)
      
      // 2. Delete enrollments
      const deletedEnrollments = await prisma.enrollment.deleteMany({
        where: { userId: user.id }
      })
      console.log(`   ✓ Deleted ${deletedEnrollments.count} course enrollments`)
      
      // 3. Delete pending course selections
      const deletedPending = await prisma.pendingCourseSelection.deleteMany({
        where: { email: user.email }
      })
      console.log(`   ✓ Deleted ${deletedPending.count} pending selections`)
      
      // 4. Delete accounts (OAuth)
      const deletedAccounts = await prisma.account.deleteMany({
        where: { userId: user.id }
      })
      console.log(`   ✓ Deleted ${deletedAccounts.count} OAuth accounts`)
      
      // 5. Delete sessions
      const deletedSessions = await prisma.session.deleteMany({
        where: { userId: user.id }
      })
      console.log(`   ✓ Deleted ${deletedSessions.count} sessions`)
      
      // 6. Delete user
      await prisma.user.delete({
        where: { id: user.id }
      })
      console.log(`   ✓ Deleted user account\n`)
    }
    
    console.log(`\n✅ Cleanup complete!`)
    console.log(`   - Deleted: ${usersToDelete.length} students`)
    console.log(`   - Kept: ${keepEmail}`)
    
    // Verify remaining students
    const remainingStudents = await prisma.user.count({
      where: {
        role: {
          not: 'admin'
        }
      }
    })
    
    console.log(`\n📊 Remaining students in database: ${remainingStudents}`)
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

cleanupTestStudents()
  .then(() => {
    console.log('\n🎉 Script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error)
    process.exit(1)
  })

