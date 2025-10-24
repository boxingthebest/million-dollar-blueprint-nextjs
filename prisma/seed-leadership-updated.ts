import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Leadership & Influence Course...')

  // Delete existing course if it exists
  await prisma.course.deleteMany({
    where: { slug: 'leadership' }
  })

  // Create the course
  const course = await prisma.course.create({
    data: {
      slug: 'leadership',
      title: 'Leadership & Influence: Command Any Room',
      description: 'The executive presence frameworks used by Microsoft, PepsiCo, and Amazon to develop world-class leaders.',
      price: 24700, // $247.00 in cents
      isFree: false,
      isPublished: true,
      thumbnail: '/course-thumbnails/leadership.jpg',
    },
  })

  console.log(`✅ Course created: ${course.title}`)

  const module = await prisma.module.create({
    data: {
      courseId: course.id,
      title: 'Leadership & Influence: Complete Training',
      description: 'Master executive presence and influence like Fortune 100 leaders',
      order: 1,
      lessons: {
        create: [
          {
            title: 'The 3 Pillars of Executive Presence',
            description: 'Understand and develop the core components of executive presence: Gravitas, Communication, and Appearance. Learn from Satya Nadella\'s transformation of Microsoft\'s culture.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 900, // 15 minutes
            order: 1,
          },
          {
            title: 'The Art of Strategic Storytelling',
            description: 'Use storytelling to connect with, persuade, and inspire. Master 3-Act Story Structure, Data-Driven Narrative, and the 5 stories every leader must tell. Learn Amazon\'s "working backwards" process.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 2,
          },
          {
            title: 'Mastering Body Language & Non-Verbal Cues',
            description: 'Read and use body language to build rapport, project confidence, and influence. Learn Power of Posture, 3 Gestures of Influence, and Reading the Room from Indra Nooyi\'s playbook.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 3,
          },
          {
            title: 'The Art of Active Listening',
            description: 'Listen with intent, understand unspoken needs, and build deeper relationships. Master 4 Levels of Listening, Power of the Pause, and Reflective Listening from Google\'s Project Aristotle.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 840, // 14 minutes
            order: 4,
          },
          {
            title: 'How to Run Meetings That Get Results',
            description: 'Plan, lead, and follow up on meetings that drive action. Learn Amazon\'s 6-Pager framework, 3 Roles in Every Meeting, and Action-Oriented Close from Apple\'s meeting culture.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1200, // 20 minutes
            order: 5,
          },
          {
            title: 'Giving Feedback That Motivates Change',
            description: 'Give and receive feedback that builds trust and improves performance. Master Radical Candor Framework, Situation-Behavior-Impact Model, and Netflix\'s feedback culture.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1020, // 17 minutes
            order: 6,
          },
          {
            title: 'Leading Through Crisis & Uncertainty',
            description: 'Lead with resilience, communicate with clarity, and inspire confidence in crisis. Learn 3 Cs of Crisis Leadership, Crisis Communication Playbook, and Johnson & Johnson\'s Tylenol crisis gold standard.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1140, // 19 minutes
            order: 7,
          },
          {
            title: 'The Art of Delegation & Empowerment',
            description: 'Delegate effectively, empower your team, and scale your impact. Master 7 Levels of Delegation, Trust & Verify Model, and Warren Buffett\'s delegation model at Berkshire Hathaway.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 960, // 16 minutes
            order: 8,
          },
          {
            title: 'Building Your Professional Network',
            description: 'Build a powerful network of allies, mentors, and sponsors. Learn 5/50/100 Rule, Art of the Informational Interview, and Goldman Sachs partners\' networking strategies.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1080, // 18 minutes
            order: 9,
          },
          {
            title: 'The Leader\'s Legacy',
            description: 'Define your leadership philosophy and create a plan for lasting impact. Master Leadership Manifesto, 3 Levels of Impact, Mentorship Mindset, and Jack Welch\'s leadership legacy at GE.',
            videoUrl: 'https://player.vimeo.com/video/PLACEHOLDER',
            duration: 1020, // 17 minutes
            order: 10,
          },
        ],
      },
    },
  })

  console.log(`✅ Module created with 10 lessons (180 minutes total)`)
  console.log('👑 Leadership & Influence course created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

