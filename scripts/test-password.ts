import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testPassword() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'dapenza@hotmail.com' }
    })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    const testPassword = 'TempPassword123!'
    const isMatch = await bcrypt.compare(testPassword, user.password!)
    
    console.log('User email:', user.email)
    console.log('Email verified:', user.emailVerified)
    console.log('Password hash:', user.password)
    console.log('Test password:', testPassword)
    console.log('Password match:', isMatch)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPassword()

