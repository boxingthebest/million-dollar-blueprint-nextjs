import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@milliondollarblueprint.ai'
  const adminPassword = 'Admin123!'

  console.log('🔐 Creating admin user...')

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  // Delete existing user if exists
  await prisma.user.deleteMany({
    where: { email: adminEmail }
  })

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
    },
  })

  console.log(`✅ Admin user created: ${user.email}`)
  console.log(`   Role: ${user.role}`)

  console.log('\n📝 Login Credentials:')
  console.log(`   Email: ${adminEmail}`)
  console.log(`   Password: ${adminPassword}`)
  console.log('\n🌐 Login at: https://www.milliondollarblueprint.ai/auth/signin')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

