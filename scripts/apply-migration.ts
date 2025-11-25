import { prisma } from '../lib/prisma'

async function main() {
  // Check if column exists
  const result = await prisma.$queryRaw`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'User' AND column_name = 'hasCompletedOnboarding'
  `
  
  console.log('Column check result:', result)
  
  if (Array.isArray(result) && result.length === 0) {
    console.log('Adding hasCompletedOnboarding column...')
    await prisma.$executeRaw`
      ALTER TABLE "User" ADD COLUMN "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false
    `
    console.log('Column added successfully!')
  } else {
    console.log('Column already exists')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
