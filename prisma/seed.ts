import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create the free mini-course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-resistant-skills-free' },
    update: {},
    create: {
      slug: 'ai-resistant-skills-free',
      title: 'The 5 Skills A.I. Can\'t Replace',
      description: 'Master the five uniquely human skills that A.I. will never be able to replicate. Learn strategies used by Fortune 100 executives at Amazon, Google, McKinsey, and Goldman Sachs.',
      price: 0,
      isFree: true,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Introduction',
            description: 'Welcome to the course and overview of the 5 skills',
            order: 0,
            lessons: {
              create: [
                {
                  title: 'Welcome & Course Overview',
                  description: 'Introduction to the 5 Skills A.I. Can\'t Replace',
                  videoUrl: 'placeholder',
                  duration: 90,
                  order: 0,
                },
              ],
            },
          },
          {
            title: 'Strategic Thinking',
            description: 'Learn how to frame problems and make decisions like McKinsey consultants',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Strategic Thinking',
                  description: 'The ability to see patterns, anticipate consequences, and make decisions under uncertainty',
                  videoUrl: 'placeholder',
                  duration: 240,
                  order: 0,
                },
              ],
            },
          },
          {
            title: 'Emotional Intelligence',
            description: 'Master the skill that 40% of Fortune 100 boards require in CEO candidates',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Emotional Intelligence',
                  description: 'Reading people, building relationships, and navigating complex human dynamics',
                  videoUrl: 'placeholder',
                  duration: 240,
                  order: 0,
                },
              ],
            },
          },
          {
            title: 'Creative Problem-Solving',
            description: 'How Amazon, Google, and the world\'s most innovative companies solve impossible problems',
            order: 3,
            lessons: {
              create: [
                {
                  title: 'Creative Problem-Solving',
                  description: 'Making unexpected connections and reimagining solutions',
                  videoUrl: 'placeholder',
                  duration: 240,
                  order: 0,
                },
              ],
            },
          },
          {
            title: 'Executive Presence',
            description: 'The quality that gets you promoted and makes people want to follow you',
            order: 4,
            lessons: {
              create: [
                {
                  title: 'Executive Presence',
                  description: 'Gravitas, communication, and appearance that inspire confidence',
                  videoUrl: 'placeholder',
                  duration: 240,
                  order: 0,
                },
              ],
            },
          },
          {
            title: 'Adaptive Learning',
            description: 'The meta-skill that lets you learn faster than the world is changing',
            order: 5,
            lessons: {
              create: [
                {
                  title: 'Adaptive Learning',
                  description: 'How to learn faster than the world is changing',
                  videoUrl: 'placeholder',
                  duration: 240,
                  order: 0,
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Created course:', course.title)
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

