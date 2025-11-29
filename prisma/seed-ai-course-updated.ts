import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding AI-Resistant Skills Course (Updated)...')

  // Delete existing course data
  await prisma.lesson.deleteMany({
    where: {
      module: {
        course: {
          slug: 'ai-resistant-skills'
        }
      }
    }
  })
  
  await prisma.module.deleteMany({
    where: {
      course: {
        slug: 'ai-resistant-skills'
      }
    }
  })

  // Create or update the course
  const course = await prisma.course.upsert({
    where: { slug: 'ai-resistant-skills' },
    update: {
      title: 'AI-Resistant Skills: Future-Proof Your Career',
      description: 'Master the 10 Proprietary Frameworks AI will never replace. From the boardrooms of Fortune 100 companies.',
      price: 19700, // $197.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/ai-resistant-skills.jpg',
    },
    create: {
      slug: 'ai-resistant-skills',
      title: 'AI-Resistant Skills: Future-Proof Your Career',
      description: 'Master the 10 Proprietary Frameworks AI will never replace. From the boardrooms of Fortune 100 companies.',
      price: 19700, // $197.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/ai-resistant-skills.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  // Module 1: AI-Resistant Skills Mastery
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'AI-Resistant Skills Mastery',
      description: '10 proprietary frameworks that will future-proof your career',
      order: 1,
      lessons: {
        create: [
          {
            title: 'LESSON 1: THE EXECUTIVE INTELLIGENCE FRAMEWORK: Strategic Thinking That Separates Executives from Employees',
            description: 'Master analytical frameworks that AI cannot replicate',
            videoUrl: 'https://player.vimeo.com/video/1141695044',
            duration: 600, // 10 minutes
            order: 1,
          },
          {
            title: 'LESSON 2: THE SYSTEMS MASTERY FRAMEWORK: How to See Connections AI Will Never Find',
            description: 'Develop human-centric leadership skills',
            videoUrl: 'https://player.vimeo.com/video/1141682660',
            duration: 600, // 10 minutes
            order: 2,
          },
          {
            title: 'LESSON 3: THE TRUST ACCELERATION FORMULA: Building Executive Relationships That Last Decades',
            description: 'Unlock breakthrough thinking and innovation',
            videoUrl: 'https://player.vimeo.com/video/1141682863',
            duration: 600, // 10 minutes
            order: 3,
          },
          {
            title: 'LESSON 4: THE STAKEHOLDER INFLUENCE MAP: How to Get Things Done When You Have Zero Formal Power',
            description: 'Master nuanced communication in complex scenarios',
            videoUrl: 'https://player.vimeo.com/video/1141704492',
            duration: 600, // 10 minutes
            order: 4,
          },
          {
            title: 'LESSON 5: THE INNOVATION SPRINT FRAMEWORK: How to Generate Breakthrough Ideas in Five Days',
            description: 'Think in rapidly changing environments',
            videoUrl: 'https://player.vimeo.com/video/1141699630',
            duration: 600, // 10 minutes
            order: 5,
          },
          {
            title: 'LESSON 6: THE PYRAMID PRINCIPLE: How to Present Ideas So Executives Say Yes',
            description: 'Navigate complex ethical dilemmas',
            videoUrl: 'https://player.vimeo.com/video/1141698757',
            duration: 600, // 10 minutes
            order: 6,
          },
          {
            title: 'LESSON 7: THE VALUE CREATION FRAMEWORK: How to Negotiate So Both Sides Win',
            description: 'Build authentic, professional relationships',
            videoUrl: 'https://player.vimeo.com/video/1141692740',
            duration: 600, // 10 minutes
            order: 7,
          },
          {
            title: 'LESSON 8: THE PROBABILISTIC THINKING FRAMEWORK: How to Make High-Stakes Decisions with Incomplete Information',
            description: 'See the big picture and interconnections',
            videoUrl: 'https://player.vimeo.com/video/1141693195',
            duration: 600, // 10 minutes
            order: 8,
          },
          {
            title: 'LESSON 9: THE THOUGHT LEADERSHIP FRAMEWORK: How to Position Yourself as the Expert in Your Field',
            description: 'Master the skill of learning itself',
            videoUrl: 'https://player.vimeo.com/video/1141683107',
            duration: 600, // 10 minutes
            order: 9,
          },
          {
            title: 'LESSON 10: THE CAREER RESILIENCE FRAMEWORK: How to Stay Valuable for the Next Twenty Years',
            description: 'Bring it all together and create your action plan',
            videoUrl: 'https://player.vimeo.com/video/1141686968',
            duration: 600, // 10 minutes
            order: 10,
          },
          {
            title: 'BONUS LESSON: EXECUTIVE INTERVIEW MASTERY: How to Win High-Stakes Interviews for Six-Figure Roles',
            description: 'Master executive-level interviews and land dream roles',
            videoUrl: 'https://player.vimeo.com/video/1141683411',
            duration: 600, // 10 minutes
            order: 11,
          },
        ],
      },
    },
  })

  console.log(`✅ Module 1 created with 11 lessons`)

  console.log('\n📊 Course Summary:')
  console.log(`   Title: ${course.title}`)
  console.log(`   Modules: 1`)
  console.log(`   Total Lessons: 11 (10 core + 1 bonus)`)
  console.log(`   Total Duration: ~110 minutes`)
  console.log(`   Price: $${course.price / 100}`)
  console.log('\n✨ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
