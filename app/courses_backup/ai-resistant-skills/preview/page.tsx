import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function CoursePreview() {
  const course = await prisma.course.findUnique({
    where: { slug: 'ai-resistant-skills' },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  })

  if (!course) {
    return <div>Course not found</div>
  }

  const totalDuration = course.modules.reduce(
    (acc, module) =>
      acc + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Image
              src="/logo-main-desktop.png"
              alt="Million Dollar Blueprint"
              width={200}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Course Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
              COURSE PREVIEW
            </span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              PUBLISHED
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {course.title}
          </h1>
          
          <p className="text-xl text-slate-300 mb-6">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{course.modules.length} Modules</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>
                {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.floor(totalDuration / 60)} minutes</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${(course.price / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
            >
              <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {module.title}
                    </h2>
                    {module.description && (
                      <p className="text-slate-400">{module.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">
                      {module.lessons.length} lessons
                    </div>
                    <div className="text-sm text-slate-400">
                      {Math.floor(
                        module.lessons.reduce((sum, l) => sum + l.duration, 0) / 60
                      )}{' '}
                      min
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-800">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="px-6 py-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <span className="text-cyan-400 font-semibold text-sm">
                          {lessonIndex + 1}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {lesson.title}
                        </h3>
                        
                        {lesson.description && (
                          <p className="text-slate-400 text-sm mb-3">
                            {lesson.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Video</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{Math.floor(lesson.duration / 60)} min</span>
                          </div>
                          
                          {lesson.videoUrl.includes('PLACEHOLDER') && (
                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs">
                              Video Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/30"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

