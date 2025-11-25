import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetPassword() {
  try {
    // Use a simpler password without special characters
    const newPassword = 'Password123'
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    const user = await prisma.user.update({
      where: { email: 'dapenza@hotmail.com' },
      data: { 
        password: hashedPassword,
        emailVerified: new Date() // Ensure email is verified
      }
    })
    
    console.log('✅ Password reset successfully!')
    console.log('Email:', user.email)
    console.log('New password:', newPassword)
    console.log('Email verified:', user.emailVerified)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetPassword()

