/* eslint-disable react/no-unescaped-entities */
"use client";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LeadershipPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The Science of Power",
      duration: "45 min",
      lessons: 4,
      icon: Brain,
      topics: [
        "The 5 bases of power (and which one to use)",
        "How to project confidence (even when you don't feel it)",
        "The body language of a leader",
        "Case study: How a junior analyst became a CEO in 5 years"
      ]
    },
    {
      number: 2,
      title: "The Art of Charisma",
      duration: "42 min",
      lessons: 4,
      icon: Heart,
      topics: [
        "The 3 components of charisma: presence, warmth, and power",
        "How to develop a captivating communication style",
        "The art of active listening",
        "Building rapport with anyone, instantly"
      ]
    },
    {
      number: 3,
      title: "The Storyteller's Toolkit",
      duration: "48 min",
      lessons: 4,
      icon: Lightbulb,
      topics: [
        "The 5 stories every leader must be able to tell",
        "How to craft a compelling vision",
        "Using stories to inspire action and drive change",
        "Case study: The story that saved a failing company"
      ]
    },
    {
      number: 4,
      title: "The Influencer's Playbook",
      duration: "38 min",
      lessons: 4,
      icon: TrendingUp,
      topics: [
        "The 6 principles of persuasion",
        "How to build consensus and align stakeholders",
        "The art of the difficult conversation",
        "Navigating corporate politics with integrity"
      ]
    },
    {
      number: 5,
      title: "The Leader's Legacy",
      duration: "37 min",
      lessons: 4,
      icon: Star,
      topics: [
        "How to build a high-performing team",
        "The art of delegation and empowerment",
        "Mentoring the next generation of leaders",
        "Building a legacy that lasts"
      ]
    }
  ];

  const faqs = [
    {
      question: "I'm an introvert. Can I still be a great leader?",
      answer: "Yes. Some of the world's most influential leaders are introverts. We'll teach you how to leverage your natural strengths to become a powerful and respected leader."
    },
    {
      question: "I'm not in a formal leadership role. Is this course for me?",
      answer: "Yes. Leadership is a skill, not a title. This course will teach you how to lead from any position and influence those around you, whether you have a team or not."
    },
    {
      question: "How is this different from other leadership courses?",
      answer: "We focus on the practical, actionable techniques of influence, not just the theory of management. You'll get the specific frameworks used by leaders at the world's top companies."
    },
    {
      question: "What if I don't have a team?",
      answer: "You'll learn how to influence your peers, your boss, and your entire organization. The skills you learn in this course will make you a more effective and respected professional, no matter your role."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, a 30-day, no-questions-asked money-back guarantee. We're confident that this course will transform your career, and we're willing to prove it."
    }
  ];

  const benefits = [
    "Command any room with confidence and charisma",
    "Inspire and motivate your team to achieve the impossible",
    "Navigate complex corporate politics with ease",
    "Accelerate your career and become a sought-after leader",
    "Build a legacy of impact and influence"
  ];

  const deliverables = [
    "The Executive Presence Scorecard™",
    "The Influence & Persuasion Toolkit (20+ templates)",
    "The Storyteller's Framework",
    "The Difficult Conversation Planner",
    "50+ page workbook with real-world scenarios",
    "Access to a private community of senior leaders"
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
            <a 
              href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $247
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-pink-900/20" />
        <div className="absolute inset-0 bg-[url('/course-leadership.jpg')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-purple-500/20 text-purple-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              👑 $247 • 189 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Influence is the New Authority.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              The executive presence strategies used by leaders at McKinsey, the White House, and Navy SEALs.
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $247
            </a>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem: You Have Authority, But No Influence</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                You've been promoted. You have the title, the team, and the responsibility. But you feel like an imposter. Your voice isn't heard in meetings. Your ideas are overlooked. Your team is compliant, but not committed. You have authority, but you lack *influence*. In today's flat, fast-moving organizations, formal authority is a fragile and fleeting source of power. True leadership is the ability to influence without it.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Solution: Master Executive Presence</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                This isn't a course on management theory. This is a deep dive into the science and art of **executive presence**. We've decoded the specific verbal and non-verbal communication techniques, storytelling frameworks, and psychological triggers used by the world's most influential leaders—from McKinsey partners and White House speechwriters to Navy SEAL commanders. You'll learn how to command any room, inspire any team, and accelerate your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">What You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              title: "The Steve Jobs \"Reality Distortion Field\"",
              description: "How to create a vision so compelling that people will do anything to make it a reality.",
              icon: <Brain className="h-12 w-12 text-cyan-400" />
            }, {
              title: "The McKinsey 3-Layer Influence Model™",
              description: "A framework for persuading any audience, from the boardroom to the front lines.",
              icon: <TrendingUp className="h-12 w-12 text-emerald-400" />
            }, {
              title: "The White House \"Message Box\" Technique",
              description: "How to control the narrative in any high-stakes conversation.",
              icon: <Lightbulb className="h-12 w-12 text-yellow-400" />
            }, {
              title: "The Navy SEAL \"Laws of Combat\" for Corporate Politics",
              description: "How to navigate complex organizations and build powerful alliances.",
              icon: <Target className="h-12 w-12 text-red-400" />
            }, {
              title: "The Charisma Code",
              description: "The 3 elements of charisma and how to develop them.",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }].map((item, index) => (
              <div key={index} className="bg-slate-900 p-8 rounded-lg border border-slate-800">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Complete Course Curriculum</h2>
          <div className="max-w-4xl mx-auto">
            {modules.map((module) => (
              <div key={module.number} className="bg-slate-800/50 border border-slate-700 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-full">
                      <module.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Module {module.number}: {module.title}</h3>
                      <p className="text-sm text-slate-400">{module.duration} • {module.lessons} lessons</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                {openModule === module.number && (
                  <div className="p-6 border-t border-slate-700">
                    <ul className="space-y-3">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-emerald-400" />
                          <span className="text-slate-300">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-slate-400 text-lg mb-8">Trusted by professionals at</h3>
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            <Image src="/logo-mckinsey.png" alt="McKinsey" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-goldman-sachs.png" alt="Goldman Sachs" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-white-house.png" alt="White House" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-google.png" alt="Google" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-amazon.png" alt="Amazon" width={150} height={100} className="h-12 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Benefits & Deliverables Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">After Completing This Course, You Will:</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-slate-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Proprietary Frameworks & Tools</h3>
              <ul className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-slate-300">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-800">
                <button
                  className="w-full flex justify-between items-center py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                  <ChevronDown className={`h-6 w-6 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="pb-6">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Manage. Lead.</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Ready to unlock your leadership potential? Enroll now and get lifetime access to the frameworks that build empires.</p>
          <a
            href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $247
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

