/* eslint-disable react/no-unescaped-entities */
"use client";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MarketingPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The Growth Mindset",
      duration: "45 min",
      lessons: 4,
      icon: Brain,
      topics: [
        "Why marketing is dead",
        "The 5 principles of growth engineering",
        "How to set and track growth goals",
        "Case study: How Dropbox grew 3900% in 15 months"
      ]
    },
    {
      number: 2,
      title: "Acquisition",
      duration: "42 min",
      lessons: 4,
      icon: Target,
      topics: [
        "The Bullseye Framework in action",
        "How to master paid acquisition (without breaking the bank)",
        "The art of content marketing that converts",
        "SEO for growth, not just rankings"
      ]
    },
    {
      number: 3,
      title: "Activation",
      duration: "48 min",
      lessons: 4,
      icon: Lightbulb,
      topics: [
        "The Hook Model explained",
        "How to design a world-class onboarding experience",
        "The psychology of user motivation",
        "Case study: How Airbnb hacked activation"
      ]
    },
    {
      number: 4,
      title: "Retention",
      duration: "38 min",
      lessons: 4,
      icon: Heart,
      topics: [
        "The science of building a loyal user base",
        "How to use email marketing to drive engagement",
        "The art of the cohort analysis",
        "Building a community that lasts"
      ]
    },
    {
      number: 5,
      title: "Revenue & Referral",
      duration: "37 min",
      lessons: 4,
      icon: TrendingUp,
      topics: [
        "How to price your product for growth",
        "The psychology of upselling and cross-selling",
        "How to build a referral engine that scales",
        "The path to a $100M+ valuation"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course for B2B or B2C?",
      answer: "Both. The principles of growth are universal and can be applied to any business model."
    },
    {
      question: "I'm not a marketer. Is this course for me?",
      answer: "If you're a founder, product manager, or anyone responsible for growth, this course is for you. We teach you how to think like a growth engineer, not just a marketer."
    },
    {
      question: "How much of a marketing budget do I need?",
      answer: "We'll teach you how to grow with a small budget (or no budget at all). Many of the strategies we teach are organic and rely on creativity, not cash."
    },
    {
      question: "Is this course up-to-date?",
      answer: "Yes. We update the course monthly with the latest growth strategies and tactics from Silicon Valley and beyond."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, a 30-day, no-questions-asked money-back guarantee. We're so confident in the value of this course that we'll take on all the risk."
    }
  ];

  const benefits = [
    "Think like a data-driven growth engineer",
    "Build a scalable, predictable growth engine",
    "Acquire and retain users at a fraction of the cost",
    "Master the art of conversion rate optimization",
    "Become a top 1% marketer"
  ];

  const deliverables = [
    "The Growth Engineering Canvas™",
    "The AARRR Pirate Metrics Dashboard",
    "The Bullseye Framework Calculator",
    "The Viral Loop Simulator",
    "50+ page workbook with real-world growth hacks",
    "Access to a private community of growth leaders"
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
            <a 
              href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $197
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('/course-marketing.jpg')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              📈 $197 • 312 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Stop Marketing. Start Engineering Growth.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              The data-driven growth hacking playbooks used by Airbnb, Dropbox, and Uber to acquire millions of users.
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $197
            </a>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem: You're Stuck in the Marketing Hamster Wheel</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                You're spending money on ads, posting on social media, and writing blog posts. But your growth has flatlined. You're stuck in a cycle of "more content, more ads, more everything" with diminishing returns. Why? Because you're a marketer, not a growth engineer. The old marketing playbook is obsolete. In a world of infinite noise, the only way to win is to build a growth engine, not just run campaigns.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Solution: Become a Growth Engineer</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                This isn't a course on how to use Facebook Ads or write a blog post. This is a masterclass in **growth engineering**. We've dissected the growth playbooks of the fastest-growing companies in history—Airbnb, Dropbox, Uber, and more—to give you a systematic approach to acquiring and retaining users at scale. You'll learn how to think like a growth hacker and build a marketing machine that runs on data, not just creativity.
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
              title: "The AARRR Pirate Metrics Framework",
              description: "How to measure what actually matters and build a full-funnel growth model.",
              icon: <TrendingUp className="h-12 w-12 text-emerald-400" />
            }, {
              title: "The Hook Model",
              description: "How to build products and marketing campaigns that are so engaging, they're addictive.",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }, {
              title: "The Bullseye Framework",
              description: "How to identify and dominate the one marketing channel that will drive 80% of your growth.",
              icon: <Target className="h-12 w-12 text-red-400" />
            }, {
              title: "The Viral Loop",
              description: "How to build virality into your product from day one.",
              icon: <Brain className="h-12 w-12 text-cyan-400" />
            }, {
              title: "The CRO Playbook",
              description: "How to systematically increase your conversion rates at every step of the funnel.",
              icon: <Lightbulb className="h-12 w-12 text-yellow-400" />
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
            <Image src="/logo-airbnb.png" alt="Airbnb" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-dropbox.png" alt="Dropbox" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-uber.png" alt="Uber" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-google.png" alt="Google" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-facebook.png" alt="Facebook" width={150} height={100} className="h-12 w-auto object-contain" />
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
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Market. Engineer Growth.</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Ready to build a growth engine? Enroll now and get lifetime access to the playbooks that build unicorns.</p>
          <a
            href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $197
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

