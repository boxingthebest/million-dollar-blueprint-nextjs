"use client";
import FuturisticBackground from "@/app/components/FuturisticBackground";
import HeroSectionDivider from "@/app/components/HeroSectionDivider";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AIResistantSkillsPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "Strategic Thinking AI Can't Replicate",
      duration: "45 min",
      lessons: 4,
      icon: Target,
      topics: [
        "The McKinsey MECE Framework for problem decomposition",
        "How to think like a $1M+ consultant in any situation",
        "The 3-step strategic analysis used at Goldman Sachs",
        "Case study: How strategic thinking saved a $500M deal"
      ]
    },
    {
      number: 2,
      title: "Emotional Intelligence That Builds Empire",
      duration: "42 min",
      lessons: 4,
      icon: Heart,
      topics: [
        "The Goldman Sachs Relationship Capital Framework",
        "Reading any room in 30 seconds (the Apple executive method)",
        "Building influence without authority",
        "The trust equation that closes $10M+ deals"
      ]
    },
    {
      number: 3,
      title: "Creative Problem-Solving That Drives Innovation",
      duration: "48 min",
      lessons: 5,
      icon: Lightbulb,
      topics: [
        "The Apple Design Thinking Protocol (used for iPhone, iPad)",
        "How Amazon approaches 'Day 1' thinking",
        "The Google '10x thinking' framework",
        "Generating breakthrough ideas on demand",
        "Case study: $1B product innovation process"
      ]
    },
    {
      number: 4,
      title: "Ethical Leadership That Inspires Teams",
      duration: "38 min",
      lessons: 4,
      icon: Star,
      topics: [
        "The Amazon Leadership Principles decoded",
        "Making decisions when there's no right answer",
        "Building psychological safety (Google's Project Aristotle)",
        "Leading through crisis with integrity"
      ]
    },
    {
      number: 5,
      title: "Adaptive Learning That Keeps You Ahead",
      duration: "37 min",
      lessons: 4,
      icon: TrendingUp,
      topics: [
        "The Google 'learning velocity' framework",
        "How McKinsey consultants master new industries in weeks",
        "Building a personal learning system",
        "Staying relevant in a rapidly changing world"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course worth the investment?",
      answer: "Our students report an average salary increase of $85,000+ within 6 months of completing the course. Many have been promoted, landed dream jobs, or started successful businesses. You're not just buying a course—you're investing in your irreplaceable future."
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access. Once you enroll, all course materials, including any future updates and additions, are yours forever."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with the course, simply email us within 30 days for a full refund—no questions asked."
    },
    {
      question: "How is this different from other 'AI-proof' courses?",
      answer: "This isn't generic advice about 'soft skills.' These are specific, proprietary frameworks used by executives at Amazon, Apple, Google, Goldman Sachs & McKinsey. You're learning the exact methodologies that separate $100K employees from $1M+ executives."
    },
    {
      question: "Can I pay in installments?",
      answer: "Currently, we offer one-time payment only at founding member pricing. However, at $197, the course pays for itself quickly—most students report ROI within the first month."
    },
    {
      question: "Who is this course for?",
      answer: "This course is for ambitious professionals, managers, executives, and entrepreneurs who want to future-proof their careers. If you're concerned about AI replacing your job, or you want to become irreplaceable in your organization, this is for you."
    },
    {
      question: "How long does it take to complete?",
      answer: "The course is designed to be completed at your own pace. Most students finish within 4-6 weeks, spending 2-3 hours per week. However, you can go faster or slower based on your schedule."
    },
    {
      question: "Will this work for my industry?",
      answer: "Yes! The skills taught—strategic thinking, emotional intelligence, creative problem-solving, ethical leadership, and adaptive learning—are universal. Our students come from tech, finance, healthcare, consulting, manufacturing, and more, all seeing remarkable results."
    }
  ];

  const benefits = [
    "Think strategically like a McKinsey consultant",
    "Build relationships like a Goldman Sachs executive",
    "Innovate like an Apple product manager",
    "Lead with integrity like an Amazon director",
    "Learn faster than 99% of professionals"
  ];

  const deliverables = [
    "The Executive Intelligence Assessment™",
    "The Strategic Thinking Toolkit (12 templates)",
    "The Emotional Intelligence Scorecard",
    "The Innovation Idea Generator",
    "The Leadership Decision Matrix",
    "50+ page Executive Workbook",
    "Real case studies from Fortune 100 companies",
    "Access to private community of high-achievers",
    "Monthly Q&A sessions with course advisors"
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Futuristic Animated Background */}
      <FuturisticBackground variant="enrollment" />
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
            <Link
              href="/auth/signup?course=ai-resistant-skills-paid"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $197
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/course-ai-skills.jpg')] opacity-10 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              ⚡ Limited Founding Member Pricing - Ends Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Master the 5 Skills AI Can't Replace—
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                And Command a Million-Dollar Career
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              McKinsey-level strategic frameworks for Fortune 100 career advancement
            </p>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              The World Economic Forum predicts 85 million jobs will be displaced by AI by 2025. But there are 5 human skills AI will never replicate. Master them, and you'll be irreplaceable. This isn't theory—these are the exact frameworks used by executives at the world's most successful companies to stay ahead of automation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">5</div>
                <div className="text-sm text-slate-400">AI-Resistant Skills</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">3.5h</div>
                <div className="text-sm text-slate-400">Expert Training</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">$85K</div>
                <div className="text-sm text-slate-400">Avg Salary Increase</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">253</div>
                <div className="text-sm text-slate-400">Students Enrolled</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup?course=ai-resistant-skills-paid"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
              >
                Enroll Now - $197 <ArrowRight className="ml-2" />
              </Link>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center border-2 border-orange-400 text-orange-300 hover:bg-orange-500/10 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
              >
                See Full Curriculum
              </a>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              ✓ 30-Day Money-Back Guarantee &nbsp;&nbsp; ✓ Lifetime Access &nbsp;&nbsp; ✓ Instant Access
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Most "AI-Proof" Career Advice Is Dangerously Wrong
            </h2>
            <div className="text-lg md:text-xl text-slate-300 space-y-4 leading-relaxed">
              <p>
                They tell you to "be creative" or "develop soft skills"—but that's too vague to be useful. The truth? Amazon, Google, and Goldman Sachs have identified <strong className="text-white">5 specific capabilities</strong> that separate executives from employees.
              </p>
              <p>
                These aren't soft skills—they're <strong className="text-white">strategic thinking frameworks</strong> that take years to develop... unless you learn them directly from those who've mastered them.
              </p>
              <p className="text-cyan-400 font-semibold text-2xl">
                This course gives you those frameworks in 3.5 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Trailer Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              See What You'll Learn
            </h2>
            <p className="text-lg md:text-xl text-slate-400 text-center mb-8">
              Watch this 45-second overview
            </p>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1129181469?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  title="AI-Resistant Skills: Master the 5 Skills AI Can't Replace"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Complete Course Curriculum
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                5 comprehensive modules • 3.5 hours of expert training • Lifetime access
              </p>
            </div>

            <div className="space-y-4">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.number} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                      className="w-full px-6 md:px-8 py-6 flex items-center gap-4 text-left hover:bg-slate-800/80 transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-orange-400 font-semibold mb-1">Module {module.number}</div>
                        <div className="text-lg md:text-xl font-semibold text-white mb-1">{module.title}</div>
                        <div className="text-sm text-slate-400">{module.duration} • {module.lessons} lessons</div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-orange-400 flex-shrink-0 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                    </button>
                    {openModule === module.number && (
                      <div className="px-6 md:px-8 pb-6 border-t border-slate-700">
                        <ul className="space-y-3 mt-4">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-300">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/auth/signup?course=ai-resistant-skills-paid"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
              >
                Get Full Access Now - $197 <ArrowRight className="ml-2" />
              </Link>
              <p className="text-slate-400 text-sm mt-4">Or 3 payments of $69</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              What You'll Get
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Proprietary Frameworks & Tools</h3>
                <ul className="space-y-3">
                  {deliverables.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Bonus Materials</h3>
                <ul className="space-y-3">
                  {deliverables.slice(5).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-pink-900/30 border-2 border-orange-500/50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                After Completing This Course, You Will:
              </h3>
              <ul className="space-y-3 max-w-2xl mx-auto">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 justify-center">
                    <Star className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-200 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 md:px-8 py-6 flex justify-between items-center text-left hover:bg-slate-800/80 transition-all"
                  >
                    <span className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-6 h-6 text-orange-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 md:px-8 pb-6">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Wait Until It's Too Late
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              AI is moving faster than anyone predicted. The time to future-proof your career is NOW.
            </p>
              <Link
                href="/auth/signup?course=ai-resistant-skills-paid"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
              >
                Enroll Now - Lock in $197 Pricing <ArrowRight className="ml-2" />
              </Link>
            <p className="text-white/90 text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | Instant Access</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

