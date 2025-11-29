import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating Videos 7-21 with Vimeo IDs...\n')

  const updates = [
    { videoNumber: 7, vimeoId: '1141607107', title: 'The McKinsey Problem-Solving Blueprint' },
    { videoNumber: 8, vimeoId: '1141607526', title: 'The Amazon "Working Backwards" Blueprint' },
    { videoNumber: 9, vimeoId: '1141607761', title: 'The Google OKR Blueprint for Career Acceleration' },
    { videoNumber: 10, vimeoId: '1141608131', title: 'The Netflix Culture Blueprint for High-Performance Teams' },
    { videoNumber: 11, vimeoId: '1141608782', title: 'The Apple Innovation Blueprint (Deep Dive)' },
    { videoNumber: 12, vimeoId: '1141609074', title: 'The Strategic Networking Blueprint' },
    { videoNumber: 13, vimeoId: '1141609527', title: 'The Executive Writing Blueprint' },
    { videoNumber: 14, vimeoId: '1141611410', title: 'The Financial Acumen Blueprint for Non-Finance Leaders' },
    { videoNumber: 15, vimeoId: '1141611628', title: 'The 90-Day Leadership Transition Blueprint' },
    { videoNumber: 16, vimeoId: '1141611926', title: 'The Boardroom Presence Blueprint' },
    { videoNumber: 17, vimeoId: '1141612249', title: 'The Thought Leadership Blueprint' },
    { videoNumber: 18, vimeoId: '1141612565', title: 'The Wealth Generation Blueprint' },
    { videoNumber: 19, vimeoId: '1141612902', title: 'The Legacy Blueprint' },
    { videoNumber: 20, vimeoId: '1141613211', title: 'The Personal Energy Management Blueprint' },
    { videoNumber: 21, vimeoId: '1141613480', title: 'The Executive Presence Integration Blueprint' },
  ]

  // Find the Executive Presence course
  const course = await prisma.course.findFirst({
    where: {
      title: {
        contains: 'Executive Presence',
      },
    },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  if (!course) {
    console.error('Executive Presence course not found!')
    return
  }

  console.log(`Found course: ${course.title}`)
  console.log(`Course has ${course.modules.length} modules\n`)

  // Get all lessons sorted by order
  const allLessons = course.modules.flatMap(m => m.lessons).sort((a, b) => a.order - b.order)

  console.log(`Total lessons found: ${allLessons.length}\n`)

  // Update each video
  for (const update of updates) {
    // Find the lesson by order (video number corresponds to lesson order)
    const lesson = allLessons.find(l => l.order === update.videoNumber)

    if (!lesson) {
      console.log(`⚠️  Lesson ${update.videoNumber} not found, skipping...`)
      continue
    }

    const videoUrl = `https://player.vimeo.com/video/${update.vimeoId}`

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        videoUrl: videoUrl,
      },
    })

    console.log(`✅ Updated Video ${update.videoNumber}: ${update.title}`)
    console.log(`   Lesson ID: ${lesson.id}`)
    console.log(`   Video URL: ${videoUrl}\n`)
  }

  console.log('✅ All videos updated successfully!')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
