const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check for admin users
  const admins = await prisma.user.findMany({
    where: { role: 'admin' },
    select: { id: true, email: true, role: true, password: true }
  });
  
  console.log('Admin users found:', admins.length);
  admins.forEach(a => {
    console.log(`- ${a.email} (role: ${a.role}, has password: ${!!a.password})`);
  });
  
  // Check for specific emails
  const emails = [
    'admin@milliondollarblueprint.ai',
    'admin@milliiondollarblueprint.ai',
    'dapenza@hotmail.com'
  ];
  
  for (const email of emails) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true, password: true }
    });
    if (user) {
      console.log(`Found: ${email} - role: ${user.role}, has password: ${!!user.password}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
