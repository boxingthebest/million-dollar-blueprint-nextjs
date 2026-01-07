import { prisma } from "@/lib/prisma";
import ApexChatbot from "@/components/ApexChatbot";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, FileText, Play, Shield, Zap } from "lucide-react";
import EnrollButton from "@/components/EnrollButton";

// Force dynamic rendering for all course pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  // Source of Truth Metadata for all 10 courses
  const courseMetadata: Record<string, { originalValue: string, dreamOutcome: string, priceIncrease: string, videoUrl: string }> = {
    "get-paid-train-ai": { 
      originalValue: "$197", 
      dreamOutcome: "Make $50-$200/hr training AI models", 
      priceIncrease: "$197",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/GetPaidtoTrainAIVSL.mp4"
    },
    "make-first-1k-ai": { 
      originalValue: "$491", 
      dreamOutcome: "Earn your first $1,000 this week", 
      priceIncrease: "$197",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/MakeFirst1kVSL.mp4"
    },
    "ai-side-hustle": { 
      originalValue: "$641", 
      dreamOutcome: "Build a $1K-$3K/mo recurring income", 
      priceIncrease: "$197",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/AISideHustleVSL.mp4"
    },
    "ai-resistant-skills": { 
      originalValue: "$888", 
      dreamOutcome: "Future-proof your career against AI", 
      priceIncrease: "$197",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/AIResistantSkillsVSL.mp4"
    },
    "executive-presence": { 
      originalValue: "$997", 
      dreamOutcome: "Command any room & influence leaders", 
      priceIncrease: "$997",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/ExecutivePresenceVSL.mp4"
    },
    "sales": { 
      originalValue: "$495", 
      dreamOutcome: "Close high-ticket deals like a pro", 
      priceIncrease: "$495",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/SalesVSL.mp4"
    },
    "leadership": { 
      originalValue: "$495", 
      dreamOutcome: "Lead teams at the Fortune 100 level", 
      priceIncrease: "$495",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/LeadershipVSL.mp4"
    },
    "marketing": { 
      originalValue: "$395", 
      dreamOutcome: "Scale brands with enterprise tactics", 
      priceIncrease: "$395",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/MarketingVSL.mp4"
    },
    "wealth": { 
      originalValue: "$395", 
      dreamOutcome: "Build wealth with Wall St. strategies", 
      priceIncrease: "$395",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/WealthVSL.mp4"
    },
    "wellness": { 
      originalValue: "$395", 
      dreamOutcome: "Sustain peak performance without burnout", 
      priceIncrease: "$395",
      videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/WellnessVSL.mp4"
    }
  };

  const meta = courseMetadata[course.slug] || { 
    originalValue: `$${(course.price * 4) / 100}`, 
    dreamOutcome: course.description, 
    priceIncrease: "$197",
    videoUrl: "https://customer-vsl-assets.s3.amazonaws.com/MillionDollarBlueprintVSL.mp4"
  };

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
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16 logo-glow" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">
              All Courses
            </Link>
            <Link
              href={`/auth/signup?course=${course.slug}`}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - <span className="line-through opacity-70 mr-1">${(course.price * 4) / 100}</span> ${course.price / 100}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
              
              <p className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
                {meta.dreamOutcome}
              </p>

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
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    <span className="text-sm line-through opacity-50 mr-1">{meta.originalValue}</span>
                    ${course.price / 100}
                  </div>
                  <div className="text-sm text-slate-400">Investment</div>
                </div>
              </div>
              
              {course.isPublished ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <EnrollButton courseSlug={course.slug} coursePrice={course.price} />
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
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video 
                  src={meta.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-slate-950 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Speed to Income</h3>
                <p className="text-slate-400">No fluff. No theory. Focus on the exact tasks companies are paying for right now.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Career Insurance</h3>
                <p className="text-slate-400">Future-proof your career against AI replacement. Become the person who manages the machines.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Founding Member</h3>
                <p className="text-slate-400">Get lifetime access to all future updates. As AI evolves, our curriculum evolves with it.</p>
              </div>
            </div>
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
                <EnrollButton 
                  courseSlug={course.slug} 
                  coursePrice={course.price}
                >
                  Start Learning Today - <span className="line-through opacity-70 mr-2">${(course.price * 4) / 100}</span> ${course.price / 100}
                </EnrollButton>
                <p className="text-orange-400 font-bold mt-4">⚠️ Founding Member Pricing Ends January 15th — Price increases to {meta.priceIncrease} after</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={150} height={45} className="h-10 w-auto opacity-80" />
          </div>
          <p className="text-slate-500 text-sm">© 2026 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>

      <ApexChatbot />
    </div>
  );
}
