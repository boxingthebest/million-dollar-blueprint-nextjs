"use client";
import ApexChatbot from "@/components/ApexChatbot";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";

import { ArrowRight, Star, Check, ChevronDown, Zap, Users, Target, Crown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ExecutivePresencePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The Executive Presence Framework",
      duration: "12 min",
      lessons: 1,
      icon: Crown,
      topics: [
        "What is executive presence? The 3 pillars: gravitas, communication, appearance",
        "Why 95% of senior leaders have it (but only 5% of mid-level managers)",
        "The \"Halo Effect\": how first impressions shape your entire career",
        "How Satya Nadella transformed Microsoft's culture through presence",
        "Key takeaway: Authority is given. Presence is earned."
      ]
    },
    {
      number: 2,
      title: "Command the Room: Gravitas",
      duration: "15 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"Strategic Pause\" technique used by Fortune 100 CEOs",
        "How to project confidence without arrogance",
        "The power of silence: why pausing makes you more persuasive",
        "Body language secrets from FBI negotiators",
        "Key takeaway: Gravitas is not about talking more. It's about saying less, better."
      ]
    },
    {
      number: 3,
      title: "Executive Communication Mastery",
      duration: "14 min",
      lessons: 1,
      icon: Users,
      topics: [
        "The \"Pyramid Principle\" from McKinsey for C-suite presentations",
        "How to present to senior leaders (Jeff Bezos' 6-page memo rule)",
        "Storytelling frameworks from Pixar and TED Talks",
        "The psychology of persuasion (Cialdini's 6 principles)",
        "Key takeaway: Executives don't have time for details. Lead with the answer."
      ]
    },
    {
      number: 4,
      title: "Influence Without Authority",
      duration: "13 min",
      lessons: 1,
      icon: Zap,
      topics: [
        "How to lead cross-functional teams without being the boss",
        "The \"Give First\" philosophy from Brad Feld (Techstars)",
        "Building strategic relationships that open doors",
        "The art of \"managing up\": influencing your own manager",
        "Key takeaway: The best leaders don't need a title to lead."
      ]
    },
    {
      number: 5,
      title: "The Executive Appearance Code",
      duration: "10 min",
      lessons: 1,
      icon: Star,
      topics: [
        "Why appearance matters more than you think (Harvard study)",
        "The \"Dress for the Job You Want\" principle (and when it's wrong)",
        "How to build an executive wardrobe on any budget",
        "Grooming, posture, and presence: the details that matter",
        "Key takeaway: You're always on stage. Dress like it."
      ]
    },
    {
      number: 6,
      title: "Decision-Making Under Pressure",
      duration: "12 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"OODA Loop\" for decision-making under uncertainty",
        "How Navy SEALs make life-or-death decisions in seconds",
        "The \"10/10/10 Rule\" for evaluating tough choices",
        "Why great leaders make fewer, better decisions",
        "Key takeaway: Executives are paid to make hard calls. Fast."
      ]
    },
    {
      number: 7,
      title: "Building Your Executive Brand",
      duration: "11 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Your personal brand is your career currency",
        "How to position yourself as a thought leader (LinkedIn strategies)",
        "The \"Give First\" content strategy that builds authority",
        "How to get noticed by recruiters and decision-makers",
        "Key takeaway: If you're not building your brand, someone else is defining it for you."
      ]
    },
    {
      number: 8,
      title: "Navigating Office Politics Like a Pro",
      duration: "13 min",
      lessons: 1,
      icon: Users,
      topics: [
        "Why \"politics\" isn't a dirty word—it's how organizations work",
        "How to build alliances without being manipulative",
        "The \"Power Map\": identifying key stakeholders and influencers",
        "How to handle difficult personalities and toxic colleagues",
        "Key takeaway: You can't avoid politics. You can only play it well or poorly."
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course worth the investment?",
      answer: "A Harvard study found that executives with strong presence earn 40% more than their peers. Executive coaching programs charge $2,997-$4,997 for these frameworks. You're getting the same systems for $197. The ROI is undeniable."
    },
    {
      question: "How long does it take to complete?",
      answer: "The course is 1.5 hours of focused, actionable content. You can complete it in a weekend. But the real transformation happens when you apply these frameworks in your daily work. Most students see results within 30 days."
    },
    {
      question: "What if I'm not in a leadership role yet?",
      answer: "Perfect. This course is designed to help you GET into leadership. Executive presence is what separates high-performers from senior leaders. Start building it now, and you'll accelerate your path to promotion."
    },
    {
      question: "How is this different from other leadership courses?",
      answer: "This isn't generic advice about 'soft skills.' These are specific, proprietary frameworks used by executives at Amazon, Google, Goldman Sachs, and McKinsey. You're learning the exact methodologies that separate $100K employees from $1M+ executives."
    },
    {
      question: "Can I pay in installments?",
      answer: "Currently, we offer one-time payment only at founding member pricing. However, at $197, the course pays for itself quickly—most students report ROI within the first month."
    },
    {
      question: "What if I don't like the course?",
      answer: "We offer a 30-day money-back guarantee. If you don't see value, just email us and we'll refund you. No questions asked."
    }
  ];

  const highlights = [
    "Command any room with confidence",
    "Influence without authority",
    "Present to C-suite executives",
    "Navigate office politics like a pro",
    "Build your executive brand"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <FuturisticBackground />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              ⚡ $197 • 187 Students Enrolled • Only 47 Spots Left This Month
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Master <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Executive Presence</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6">
              Command Any Room. Influence Without Authority. Accelerate to Senior Leadership.
            </p>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-4xl mx-auto">
              What Fortune 100 executives pay $2,997 for in executive coaching. The exact frameworks used at Amazon, Google, and Goldman Sachs to build executive presence and influence.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">187</div>
                <div className="text-sm text-white">Students Enrolled</div>
              </div>
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">$140K</div>
                <div className="text-sm text-white">Avg Salary Increase</div>
              </div>
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">4.9/5</div>
                <div className="text-sm text-white">Student Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://buy.stripe.com/test_PLACEHOLDER"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-cyan-500/50 transition-all"
              >
                Enroll Now - $197 (Originally $395 • Save 50%) <ArrowRight className="ml-2" />
              </Link>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
              >
                View Curriculum
              </a>
            </div>
          </div>
        </div>
      </section>

      <HeroSectionDivider />

      {/* What You'll Learn Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What You'll Master
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-white text-lg font-semibold">{highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Complete Course Curriculum
          </h2>
          <p className="text-xl text-slate-400 mb-12 text-center">
            8 comprehensive modules • 1.5 hours of video • Lifetime access
          </p>
          
          <div className="space-y-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isOpen = openModule === module.number;
              
              return (
                <div
                  key={module.number}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : module.number)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-cyan-500/20 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-cyan-400 font-bold">Module {module.number}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 text-sm">{module.duration}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 text-sm">{module.lessons} lesson{module.lessons > 1 ? 's' : ''}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{module.title}</h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-slate-700">
                      <ul className="mt-4 space-y-2">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-300">
                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
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
              href="https://buy.stripe.com/test_PLACEHOLDER"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all shadow-2xl"
            >
              Get Full Access Now - $197
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              
              return (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-800/50 transition-all"
                  >
                    <h3 className="text-white font-semibold text-lg pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-slate-700">
                      <p className="mt-4 text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Command Executive Presence?
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8">
            AI is moving faster than anyone predicted. The time to build your executive presence is NOW.
          </p>
          <Link
            href="https://buy.stripe.com/test_PLACEHOLDER"
            className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-cyan-500/50 transition-all"
          >
            Enroll Now - Lock in $197 Pricing <ArrowRight className="ml-2" />
          </Link>
          <p className="text-white text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | Instant Access</p>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-600 to-blue-600 border-t-4 border-cyan-400 py-4 px-4 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">🔥 Limited Time: Save 50% Today</p>
            <p className="text-white text-sm">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
          <a
            href="https://buy.stripe.com/test_PLACEHOLDER"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap text-cyan-700 hover:bg-cyan-50"
          >
            Enroll Now - $197
          </a>
        </div>
      </div>

      <ApexChatbot />
    </div>
  );
}
