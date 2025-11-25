import { prisma } from '../lib/prisma'

async function main() {
  const user = await prisma.user.update({
    where: { email: 'dapenza@hotmail.com' },
    data: { hasCompletedOnboarding: true },
  })
  console.log('Updated user:', user.email, '- hasCompletedOnboarding:', user.hasCompletedOnboarding)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
