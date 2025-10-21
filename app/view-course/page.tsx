import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ViewCoursePage() {
  try {
    // First, get all courses to debug
    const allCourses = await prisma.course.findMany()
    
    const course = await prisma.course.findUnique({
      where: { slug: 'ai-resistant-skills' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    if (!course) {
      return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-4">Looking for slug: ai-resistant-skills</p>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Available Courses ({allCourses.length}):</h2>
            {allCourses.map(c => (
              <div key={c.id} className="mb-2">
                <span className="font-mono text-sm">{c.slug}</span> - {c.title}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-300 mb-8">{course.description}</p>
          
          <div className="grid gap-6">
            {course.modules.map((module, idx) => (
              <div key={module.id} className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                  Module {idx + 1}: {module.title}
                </h2>
                <p className="text-gray-400 mb-4">{module.description}</p>
                
                <div className="space-y-3">
                  {module.lessons.map((lesson, lessonIdx) => (
                    <div key={lesson.id} className="bg-gray-700 rounded p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Lesson {lessonIdx + 1}: {lesson.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>⏱️ {lesson.duration} minutes</span>
                        {lesson.videoUrl ? (
                          <span className="text-green-400">✓ Video Ready</span>
                        ) : (
                          <span className="text-yellow-400">⚠️ Video Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-blue-900 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Course Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">{course.modules.length}</div>
                <div className="text-gray-300">Modules</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                </div>
                <div className="text-gray-300">Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold">${course.price}</div>
                <div className="text-gray-300">Price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error Loading Course</h1>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
          {error.message}
        </pre>
      </div>
    )
  }
}

