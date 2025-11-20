import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting AI-Resistant Skills course update...\n');

  // Find all AI-Resistant Skills courses
  const courses = await prisma.course.findMany({
    where: {
      title: {
        contains: 'AI-Resistant Skills'
      }
    },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      }
    }
  });

  console.log(`Found ${courses.length} AI-Resistant Skills courses\n`);

  // Find and delete the Draft course (price $1.97)
  const draftCourse = courses.find(c => c.price === 1.97);
  if (draftCourse) {
    console.log(`Deleting draft course: ${draftCourse.title} (ID: ${draftCourse.id})`);
    await prisma.course.delete({
      where: { id: draftCourse.id }
    });
    console.log('✅ Draft course deleted\n');
  } else {
    console.log('No draft course found to delete\n');
  }

  // Find the Published course (price $197)
  const publishedCourse = courses.find(c => c.price === 197);
  
  if (!publishedCourse) {
    console.error('❌ Published course not found!');
    return;
  }

  console.log(`Updating published course: ${publishedCourse.title} (ID: ${publishedCourse.id})\n`);

  // Video URLs mapping - 11 videos total (1 bonus + 10 lessons)
  const videoUrls = [
    'https://vimeo.com/1129743307/a1f70f7a07', // Bonus: Executive Interview Secrets
    'https://vimeo.com/1129374864/8462d84da1', // Lesson 1
    'https://vimeo.com/1129414459/c3afffad25', // Lesson 2
    'https://vimeo.com/1129414864/272f58a324', // Lesson 3
    'https://vimeo.com/1129415335/47efd8a1aa', // Lesson 4
    'https://vimeo.com/1129415686/b37c86e62c', // Lesson 5
    'https://vimeo.com/1129415885/7bba6f24bd', // Lesson 6
    'https://vimeo.com/1129416243/657cd05863', // Lesson 7
    'https://vimeo.com/1129417480/946e450263', // Lesson 8
    'https://vimeo.com/1129417841/f4d6644de9', // Lesson 9
    'https://vimeo.com/1129418207/8f8000ae4f', // Lesson 10
  ];

  // Get all lessons from all modules
  const allLessons = publishedCourse.modules
    .flatMap(m => m.lessons)
    .sort((a, b) => a.order - b.order);

  console.log(`Found ${allLessons.length} lessons in published course`);
  console.log(`Have ${videoUrls.length} video URLs to assign\n`);

  // Update lessons with video URLs
  for (let i = 0; i < Math.min(videoUrls.length, allLessons.length); i++) {
    const lesson = allLessons[i];
    const videoUrl = `https://player.vimeo.com/video/${videoUrls[i].split('/')[3]}?badge=0&autopause=0&player_id=0&app_id=58479`;
    
    console.log(`Updating Lesson ${i + 1}: ${lesson.title}`);
    console.log(`  Video: ${videoUrls[i]}`);
    
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { videoUrl }
    });
    
    console.log(`  ✅ Updated\n`);
  }

  console.log('🎉 AI-Resistant Skills course updated successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
