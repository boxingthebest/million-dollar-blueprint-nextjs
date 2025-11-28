
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("Attempting to seed Executive Presence Playbook...");
    const existingCourse = await prisma.course.findUnique({
      where: { slug: 'executive-presence-playbook' },
    });

    if (existingCourse) {
      console.log("Executive Presence Playbook already exists.");
      return NextResponse.json({ success: true, message: 'Executive Presence Playbook already exists', course: existingCourse });
    }
    const course = await prisma.course.create({
      data: {
        title: 'Executive Presence Playbook',
        slug: 'executive-presence-playbook',
        description: 'The exact strategies to command respect, influence decisions, and accelerate your career.',
        price: 27,
        published: true,
        modules: {
          create: [
            {
              title: 'Executive Presence Masterclasses',
              lessons: {
                create: [
                  {
                    title: 'The Goldman Sachs Framework',
                    videoUrl: 'https://vimeo.com/1141440345',
                    duration: 282,
                    order: 1,
                  },
                  {
                    title: 'The Strategic Pause Technique',
                    videoUrl: 'https://vimeo.com/1141442140',
                    duration: 279,
                    order: 2,
                  },
                  {
                    title: 'Salary Negotiation Mastery',
                    videoUrl: 'https://vimeo.com/1141443129',
                    duration: 288,
                    order: 3,
                  },
                  {
                    title: 'Executive Communication',
                    videoUrl: 'https://vimeo.com/1141459744',
                    duration: 301,
                    order: 4,
                  },
                  {
                    title: 'The Meeting Before the Meeting',
                    videoUrl: 'https://vimeo.com/1141460242',
                    duration: 299,
                    order: 5,
                  },
                  {
                    title: 'Breaking the $120K Ceiling',
                    videoUrl: 'https://vimeo.com/1141460954',
                    duration: 279,
                    order: 6,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Executive Presence Playbook created successfully', course });
  } catch (error) {
    console.error('Detailed error seeding Executive Presence Playbook:', JSON.stringify(error, null, 2));
    return NextResponse.json({ success: false, message: 'Error seeding Executive Presence Playbook' }, { status: 500 });
  }
}
