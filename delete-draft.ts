import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Searching for draft AI-Resistant Skills course...');
    
    // Find all courses with this title
    const courses = await prisma.course.findMany({
      where: {
        title: 'AI-Resistant Skills: Future-Proof Your Career'
      },
      select: {
        id: true,
        title: true,
        price: true,
        isPublished: true,
        slug: true
      }
    });

    console.log(`Found ${courses.length} courses with this title:`);
    courses.forEach((course, index) => {
      console.log(`\n${index + 1}. ID: ${course.id}`);
      console.log(`   Slug: ${course.slug}`);
      console.log(`   Price: $${course.price / 100}`);
      console.log(`   Published: ${course.isPublished}`);
    });

    // Find the draft course (unpublished)
    const draftCourse = courses.find(c => !c.isPublished);
    
    if (!draftCourse) {
      console.log('\nNo draft course found!');
      return;
    }

    console.log(`\n✓ Found draft course: ${draftCourse.id}`);
    console.log('Deleting draft course...');

    // Delete the course (cascade will delete modules and lessons)
    await prisma.course.delete({
      where: {
        id: draftCourse.id
      }
    });

    console.log('✓ Draft course deleted successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
