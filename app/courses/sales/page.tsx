/* eslint-disable react/no-unescaped-entities */
"use client";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

export default function SalesMasteryPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The Revenue Architect's Mindset",
      duration: "45 min",
      lessons: 4,
      icon: Brain,
      topics: [
        "Why \"selling\" is obsolete",
        "The 5 mental shifts of a 7-figure earner",
        "How to think in systems, not tactics",
        "Case study: The deal that made a Salesforce AE a millionaire"
      ]
    },
    {
      number: 2,
      title: "Building Your Predictive Pipeline",
      duration: "42 min",
      lessons: 4,
      icon: TrendingUp,
      topics: [
        "The math behind a predictable pipeline",
        "How to reverse-engineer your quota",
        "The \"Lead Velocity\" framework",
        "Automating outreach without losing the human touch"
      ]
    },
    {
      number: 3,
      title: "Mastering the Deal",
      duration: "48 min",
      lessons: 4,
      icon: Target,
      topics: [
        "The art of the multi-threaded deal",
        "Navigating complex procurement processes",
        "The \"Give-Get\" negotiation matrix",
        "Closing techniques that actually work"
      ]
    },
    {
      number: 4,
      title: "The Science of Scale",
      duration: "38 min",
      lessons: 4,
      icon: Lightbulb,
      topics: [
        "How to build a sales process that runs itself",
        "Hiring and training a world-class sales team",
        "The metrics that actually matter",
        "From salesperson to sales leader"
      ]
    },
    {
      number: 5,
      title: "The Future of Sales",
      duration: "37 min",
      lessons: 4,
      icon: Star,
      topics: [
        "How AI is changing the sales landscape",
        "The skills that will be irreplaceable in 2030",
        "Building your personal brand as a sales leader",
        "The path to Chief Revenue Officer"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course for B2B or B2C?",
      answer: "Both. The frameworks are universal and have been applied to both business-to-business and business-to-consumer sales with massive success."
    },
    {
      question: "I'm not in tech sales. Will this work for me?",
      answer: "Yes. We have students from finance, real estate, professional services, and more who have used these frameworks to double their income."
    },
    {
      question: "How is this different from other sales courses?",
      answer: "We don't teach tactics. We teach systems. This is a course on thinking, not just doing. You'll learn the underlying architecture of sales, not just a few closing lines."
    },
    {
      question: "What if I'm just starting my sales career?",
      answer: "This course will give you a 10-year head start. You'll learn the frameworks that most salespeople never discover, even after decades in the field."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, a 30-day, no-questions-asked money-back guarantee. If you don't feel like you've gotten 10x the value, we'll refund you in full."
    }
  ];

  const benefits = [
    "Think strategically like a Chief Revenue Officer",
    "Build a predictable, scalable sales pipeline",
    "Close larger deals, faster",
    "Lead and inspire high-performing sales teams",
    "Become a trusted advisor to your clients"
  ];

  const deliverables = [
    "The Revenue Architecture Canvas™",
    "The Predictive Pipeline Calculator",
    "The Deal-Closing Checklist (32-point inspection)",
    "The Sales Leader's Dashboard",
    "50+ page workbook with real-world case studies",
    "Access to a private community of sales leaders"
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
              href="https://buy.stripe.com/6oU14mgxP5Qb5lOe0c08g03"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $247
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-900 to-red-900/20" />
        <div className="absolute inset-0 bg-[url('/course-sales.jpg')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-500/20 text-orange-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 $247 • 253 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Stop Selling. Start Closing.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              The counterintuitive sales frameworks used by Amazon, Google, and Goldman Sachs to dominate their markets.
            </p>
            <a
              href="https://buy.stripe.com/6oU14mgxP5Qb5lOe0c08g03"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem: You're Playing a Losing Game</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                You've been taught to sell. You've read the books, attended the seminars, and practiced your pitch. But you're still struggling to hit your numbers consistently. Why? Because you've been taught a system designed for the 99%, not the 1%. The traditional sales playbook is dead. In a world of automated outreach and AI-powered lead scoring, the only thing that separates you from the noise is your ability to architect a deal, not just sell a product.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Solution: Become a Revenue Architect</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                This isn't another course on "sales techniques." This is a masterclass in **revenue architecture**. We've reverse-engineered the proprietary sales and deal-making frameworks used by the world's most dominant companies—Amazon, Google, Goldman Sachs, and Salesforce—to give you a blueprint for predictable, scalable revenue growth. You won't just learn how to sell; you'll learn how to think like a Chief Revenue Officer.
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
              title: "The Challenger Sale 2.0",
              description: "How to teach, tailor, and take control of any sales conversation.",
              icon: <Brain className="h-12 w-12 text-cyan-400" />
            }, {
              title: "The Trusted Advisor Blueprint",
              description: "The Goldman Sachs model for building unshakeable client relationships.",
              icon: <Heart className="h-12 w-12 text-pink-400" />
            }, {
              title: "Predictive Pipeline Architecture",
              description: "How to build a sales pipeline that never runs dry.",
              icon: <TrendingUp className="h-12 w-12 text-emerald-400" />
            }, {
              title: "The Amazon \"Working Backwards\" Method",
              description: "How to close multi-million dollar deals by starting with the customer's press release.",
              icon: <Lightbulb className="h-12 w-12 text-yellow-400" />
            }, {
              title: "The Google \"3-Layer Deep\" Discovery",
              description: "How to uncover needs your prospects don't even know they have.",
              icon: <Target className="h-12 w-12 text-red-400" />
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
            <Image src="/logo-salesforce.png" alt="Salesforce" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-blackstone.png" alt="Blackstone" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-google.png" alt="Google" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-amazon.png" alt="Amazon" width={150} height={100} className="h-12 w-auto object-contain" />
            <Image src="/logo-mckinsey.png" alt="McKinsey" width={150} height={100} className="h-12 w-auto object-contain" />
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
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Hit Your Quota. Redefine It.</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Ready to become a revenue architect? Enroll now and get lifetime access to the frameworks that build empires.</p>
          <a
            href="https://buy.stripe.com/6oU14mgxP5Qb5lOe0c08g03"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-orange-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
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

