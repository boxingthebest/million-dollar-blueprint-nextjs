"use client";

import { ArrowRight, Star, Check, ChevronDown, Heart, Brain, Zap, Moon, Dumbbell, Wind, Target, TrendingUp, Activity, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WellnessPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The High-Performance Mindset",
      duration: "5 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "The CEO as Elite Athlete framework from McKinsey",
        "Three-Horizon Performance Model for sustainable success",
        "How Satya Nadella transformed Microsoft ($300B to $3T market cap)",
        "The compounding advantage: why 1% improvements = 37% annual gains",
        "Key takeaway: Performance is a system, not an event"
      ]
    },
    {
      number: 2,
      title: "Sleep Optimization for Peak Performance",
      duration: "5 min",
      lessons: 1,
      icon: Moon,
      topics: [
        "The SLEEP Protocol: Strategic, Layered, Evidence-based, Engineered, Performance-focused",
        "Dr. Cheri Mah's NBA research: 9% shooting accuracy improvement",
        "How executives earning $140K more annually optimize sleep",
        "The 5-step sleep optimization system",
        "Key takeaway: Sleep is the ultimate performance enhancer"
      ]
    },
    {
      number: 3,
      title: "Nutrition for Cognitive & Physical Excellence",
      duration: "5 min",
      lessons: 1,
      icon: Activity,
      topics: [
        "The Metabolic Flexibility Matrix for executive performance",
        "Cristiano Ronaldo's nutrition protocol (6 meals, 3,200 calories)",
        "Cognitive performance nutrition: omega-3s, antioxidants, hydration",
        "The 5-step executive nutrition system",
        "Key takeaway: Food is fuel, not just calories"
      ]
    },
    {
      number: 4,
      title: "Stress Management & Resilience",
      duration: "5 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The 3-R Framework: Recognize, Reframe, Respond",
        "Stress Inoculation Protocol from Navy SEAL training",
        "How Goldman Sachs executives manage high-stakes pressure",
        "The HRV (Heart Rate Variability) optimization technique",
        "Key takeaway: Stress is inevitable, suffering is optional"
      ]
    },
    {
      number: 5,
      title: "Energy Mastery: The Executive's Secret Weapon",
      duration: "5 min",
      lessons: 1,
      icon: Zap,
      topics: [
        "The Energy Portfolio Model (like investment portfolio management)",
        "90-minute ultradian rhythms for peak productivity",
        "Jeff Bezos' decision-making schedule (high-stakes at 10am)",
        "The 4-quadrant energy optimization system",
        "Key takeaway: Manage energy, not just time"
      ]
    },
    {
      number: 6,
      title: "Advanced Recovery Protocols",
      duration: "5 min",
      lessons: 1,
      icon: Dumbbell,
      topics: [
        "Cold therapy, heat therapy, and compression therapy",
        "LeBron James' $1.5M annual recovery investment",
        "The Golden State Warriors' recovery system (3 championships in 4 years)",
        "Evidence-based recovery techniques for executives",
        "Key takeaway: Recovery is where growth happens"
      ]
    },
    {
      number: 7,
      title: "The Flow State: Accessing Peak Performance",
      duration: "5 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The Flow Activation Protocol: Challenge-Skill Balance",
        "500% productivity increase in flow state",
        "Google's flow protocol implementation",
        "The 4-step system to trigger flow on demand",
        "Key takeaway: Flow is trainable, not random"
      ]
    },
    {
      number: 8,
      title: "Building Unshakeable Resilience",
      duration: "5 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The 5 Pillars of Antifragility",
        "Novak Djokovic's mindfulness and mental training",
        "How resilience drives long-term success",
        "The Stress-Growth Curve optimization",
        "Key takeaway: Resilience is built through adversity"
      ]
    },
    {
      number: 9,
      title: "Breathwork & Nervous System Control",
      duration: "5 min",
      lessons: 1,
      icon: Wind,
      topics: [
        "The Breathwork Toolkit: Box Breathing, 4-7-8, Wim Hof Method",
        "Instant stress reduction and focus enhancement",
        "Navy SEAL tactical breathing techniques",
        "The 3-technique breathwork system",
        "Key takeaway: Control your breath, control your state"
      ]
    },
    {
      number: 10,
      title: "The Quantified Executive: Data-Driven Wellness",
      duration: "5 min",
      lessons: 1,
      icon: BarChart,
      topics: [
        "The Quantified Wellness System for executives",
        "Tracking HRV, sleep quality, cognitive performance, energy levels",
        "How data-driven optimization compounds over time",
        "The 4-metric executive dashboard",
        "Key takeaway: You can't improve what you don't measure"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course worth the investment?",
      answer: "A Harvard study of 4,000 executives found that those who optimized their wellness earned $140,000 more annually. Executive coaching programs charge $2,997-$4,997 for these protocols. You're getting the same systems for $197. The ROI is undeniable."
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
      question: "How is this different from other wellness courses?",
      answer: "This isn't generic wellness advice. These are specific, evidence-based protocols used by Fortune 100 executives at Amazon, Google, Goldman Sachs, and McKinsey. You're learning the exact systems that separate $100K employees from $1M+ executives."
    },
    {
      question: "Can I pay in installments?",
      answer: "Currently, we offer one-time payment only at founding member pricing. However, at $197, the course pays for itself quickly—most students report ROI within the first month."
    },
    {
      question: "Who is this course for?",
      answer: "This course is for ambitious professionals, managers, executives, and entrepreneurs who want to sustain peak performance without burning out. If you're working 60+ hour weeks and feeling exhausted, this is for you."
    },
    {
      question: "How long does it take to complete?",
      answer: "The course is designed to be completed at your own pace. With 10 lessons at ~5 minutes each, you can finish in under an hour. However, implementation is ongoing as you integrate these protocols into your life."
    },
    {
      question: "Will this work for my industry?",
      answer: "Yes! The protocols taught—sleep optimization, stress management, nutrition, recovery, and energy management—are universal. Our students come from tech, finance, healthcare, consulting, and more, all seeing remarkable results."
    }
  ];

  const benefits = [
    "Sleep like an elite athlete (Dr. Cheri Mah's protocol)",
    "Eat for cognitive performance (Cristiano Ronaldo's system)",
    "Manage stress like a Navy SEAL",
    "Recover like LeBron James ($1.5M annual investment)",
    "Access flow state on demand (Google's protocol)"
  ];

  const deliverables = [
    "The Executive Energy Assessment™",
    "The SLEEP Optimization Toolkit",
    "The Metabolic Flexibility Matrix",
    "The Stress Inoculation Protocol",
    "The Energy Portfolio Dashboard",
    "The Flow Activation Checklist",
    "The Breathwork Toolkit (3 techniques)",
    "The Quantified Wellness Tracker",
    "Real case studies from Fortune 100 executives",
    "Access to private community of high-performers"
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
              href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $197
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/hero-wellness-v2.jpg')] opacity-10 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              ⚡ Limited Founding Member Pricing - Ends Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Turn Burnout Into Breakthrough—
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                The Executive Energy System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              What Fortune 100 executives pay $2,997 for in executive coaching
            </p>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              A Harvard study of 4,000 executives found that those who optimized their wellness earned $140,000 more annually. Not by working harder—by working smarter. These are the exact protocols used at Amazon, Google, and Goldman Sachs to sustain peak performance for decades, not days.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">10</div>
                <div className="text-sm text-slate-400">Performance Protocols</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">50min</div>
                <div className="text-sm text-slate-400">Expert Training</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-1">$140K</div>
                <div className="text-sm text-slate-400">Avg Salary Increase</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">187</div>
                <div className="text-sm text-slate-400">Students Enrolled</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-emerald-500/50 transition-all"
              >
                Enroll Now - $197 <ArrowRight className="ml-2" />
              </a>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-500/10 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
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
              Why Do Executives Pay $2,997-$4,997 for These Wellness Protocols?
            </h2>
            <div className="text-lg md:text-xl text-slate-300 space-y-4 leading-relaxed">
              <p>
                Because they know something you don't: <strong className="text-white">Peak performance isn't about working harder—it's about engineering your body and mind like a high-performance system.</strong>
              </p>
              <p>
                The executives at Amazon, Google, and Goldman Sachs don't burn out. They don't crash at 3pm. They don't sacrifice their health for their career. Why? Because they've invested in <strong className="text-white">evidence-based wellness protocols</strong> that optimize sleep, nutrition, stress, energy, and recovery.
              </p>
              <p className="text-emerald-400 font-semibold text-2xl">
                This course gives you those protocols for $197.
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
              Watch this 50-second overview
            </p>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1129426955?badge=0&autopause=0&player_id=0&app_id=58479" 
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
                  title="The Executive Energy System - Turn Burnout Into Breakthrough"
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
                10 comprehensive lessons • 50 minutes of expert training • Lifetime access
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
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-emerald-400 font-semibold mb-1">Lesson {module.number}</div>
                        <div className="text-lg md:text-xl font-semibold text-white mb-1">{module.title}</div>
                        <div className="text-sm text-slate-400">{module.duration} • {module.lessons} video</div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
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
              <a
                href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all shadow-2xl"
              >
                Get Full Access Now - $197
              </a>
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

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                  <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-8 mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                You'll Learn To:
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8">
                <div className="text-slate-400 text-lg mb-2">Total Value:</div>
                <div className="text-slate-500 line-through text-3xl mb-2">$2,997</div>
                <div className="text-emerald-400 text-5xl md:text-6xl font-bold mb-2">$197</div>
                <div className="text-slate-400">One-time payment • Lifetime access</div>
              </div>

              <a
                href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all shadow-2xl mb-4"
              >
                Enroll Now - $197
              </a>
              <p className="text-slate-400 text-sm">30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/80 transition-all"
                  >
                    <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-5 border-t border-slate-700">
                      <p className="text-slate-300 mt-4 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Transformation Starts Now
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join 187 executives who've already invested in The Executive Energy System
            </p>
            <a
              href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-6 rounded-lg font-bold text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $197
            </a>
            <p className="text-slate-400 text-sm mt-6">
              ✓ 30-Day Money-Back Guarantee &nbsp;&nbsp; ✓ Lifetime Access &nbsp;&nbsp; ✓ Instant Access
            </p>
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

