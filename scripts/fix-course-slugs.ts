import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courseMapping = [
  { title: "Get Paid to Train AI", slug: "get-paid-train-ai" },
  { title: "Make Your First $1K with AI", slug: "make-first-1k-ai" },
  { title: "Start Your AI Side Hustle", slug: "ai-side-hustle" },
  { title: "AI-Resistant Skills", slug: "ai-resistant-skills" },
  { title: "Executive Presence", slug: "executive-presence" },
  { title: "Sales Mastery", slug: "sales" },
  { title: "Leadership & Influence", slug: "leadership" },
  { title: "Digital Marketing Mastery", slug: "marketing" },
  { title: "Wealth Building", slug: "wealth" },
  { title: "The Executive Energy System™", slug: "wellness" }
];

async function main() {
  console.log('Starting course slug consistency check...');

  for (const mapping of courseMapping) {
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { title: { contains: mapping.title, mode: 'insensitive' } },
          { slug: mapping.slug }
        ]
      }
    });

    if (course) {
      if (course.slug !== mapping.slug) {
        console.log(`Updating slug for "${course.title}": ${course.slug} -> ${mapping.slug}`);
        await prisma.course.update({
          where: { id: course.id },
          data: { slug: mapping.slug }
        });
      } else {
        console.log(`Slug for "${course.title}" is already correct: ${course.slug}`);
      }
    } else {
      console.log(`Warning: Course "${mapping.title}" not found in database.`);
    }
  }

  console.log('Consistency check complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
