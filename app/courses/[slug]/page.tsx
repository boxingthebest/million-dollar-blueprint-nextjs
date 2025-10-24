import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, FileText, Play } from "lucide-react";

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });

  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
  });

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} | Million Dollar Blueprint`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
      enrollments: true,
    },
  });

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const totalDuration = course.modules.reduce(
    (sum, module) => sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration, 0),
    0
  );
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">
              All Courses
            </Link>
            <Link
              href={`/auth/signup?course=${course.slug}`}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - ${course.price / 100}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {!course.isPublished && (
              <div className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                🚧 Coming Soon - Course Under Development
              </div>
            )}
            
            {course.isPublished && (
              <div className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                ✅ Live & Enrolling Now
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              {course.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{course.modules.length}</div>
                <div className="text-sm text-slate-400">Modules</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{totalLessons}</div>
                <div className="text-sm text-slate-400">Lessons</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">
                  {hours > 0 ? `${hours}h` : `${minutes}m`}
                </div>
                <div className="text-sm text-slate-400">Content</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">${course.price / 100}</div>
                <div className="text-sm text-slate-400">Investment</div>
              </div>
            </div>
            
            {course.isPublished ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/auth/signup?course=${course.slug}`}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
                >
                  Enroll Now - ${course.price / 100} <ArrowRight className="ml-2" />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center border-2 border-orange-400 text-orange-300 hover:bg-orange-500/10 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
                >
                  See Full Curriculum
                </a>
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">Course Coming Soon</h3>
                <p className="text-slate-300 mb-4">
                  This course is currently under development. Check back soon for updates!
                </p>
                <Link
                  href="/#courses"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  View Available Courses <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            )}

            <p className="text-slate-400 text-sm mt-6">
              ✓ 30-Day Money-Back Guarantee &nbsp;&nbsp; ✓ Lifetime Access &nbsp;&nbsp; ✓ Instant Access
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      {course.isPublished && course.modules.length > 0 && (
        <section id="curriculum" className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Complete Curriculum
              </h2>
              <p className="text-slate-300 text-lg mb-12">
                Everything you need to master {course.title.toLowerCase()}
              </p>

              <div className="space-y-4">
                {course.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {module.title}
                          </h3>
                          {module.description && (
                            <p className="text-slate-400">{module.description}</p>
                          )}
                        </div>
                        <div className="text-sm text-slate-400 whitespace-nowrap ml-4">
                          {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                        </div>
                      </div>

                      {module.lessons.length > 0 && (
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg"
                            >
                              {lesson.duration > 0 ? (
                                <Play className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              ) : (
                                <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                              <span className="text-slate-200 flex-1">{lesson.title}</span>
                              {lesson.duration > 0 && (
                                <span className="text-sm text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {Math.floor(lesson.duration / 60)}min
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href={`/auth/signup?course=${course.slug}`}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
                >
                  Start Learning Today - ${course.price / 100} <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              What You'll Get
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Lifetime Access</h3>
                  <p className="text-slate-400">
                    Access all course materials forever, including future updates
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Expert Instruction</h3>
                  <p className="text-slate-400">
                    Learn from frameworks used by Fortune 100 executives
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Practical Tools</h3>
                  <p className="text-slate-400">
                    Downloadable templates, worksheets, and resources
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">30-Day Guarantee</h3>
                  <p className="text-slate-400">
                    Full refund if you're not completely satisfied
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {course.isPublished && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join hundreds of professionals transforming their careers
              </p>
              <Link
                href={`/auth/signup?course=${course.slug}`}
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
              >
                Enroll Now - ${course.price / 100} <ArrowRight className="ml-2" />
              </Link>
              <p className="text-slate-400 text-sm mt-6">
                30-Day Money-Back Guarantee • Secure Payment • Instant Access
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

