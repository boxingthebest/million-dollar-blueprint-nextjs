/* eslint-disable react/no-unescaped-entities */
"use client";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WealthPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

    const modules = [
    {
      number: 1,
      title: "The Wealth Mindset: From Earner to Builder",
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "Why your salary will never make you rich (but your system will)",
        "The \"4 Levels of Financial Freedom\" from Naval Ravikant",
        "How Warren Buffett thinks about wealth (compounding, not income)",
        "The psychology of delayed gratification and long-term thinking",
        "Key takeaway: Wealth isn't about making money. It's about keeping it."
      ]
    },
    {
      number: 2,
      title: "The All-Weather Portfolio (Ray Dalio)",
      duration: "10 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The asset allocation that survived every market crash since 1970",
        "30% stocks, 40% long-term bonds, 15% intermediate bonds, 7.5% gold, 7.5% commodities",
        "How Bridgewater's $140B fund uses this strategy",
        "Rebalancing and tax-loss harvesting",
        "Key takeaway: Diversification is the only free lunch in investing."
      ]
    },
    {
      number: 3,
      title: "Index Fund Investing: The Bogle Method",
      duration: "9 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Why 90% of active fund managers underperform the S&P 500",
        "The \"3-Fund Portfolio\" from Bogleheads (stocks, bonds, international)",
        "How to invest $1,000/month and retire a millionaire",
        "The power of low fees (0.03% vs 1% = $500K difference)",
        "Key takeaway: Boring wins. Complexity loses."
      ]
    },
    {
      number: 4,
      title: "Tax Optimization: Keeping What You Earn",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "The \"Tax Alpha\" strategy from ultra-high-net-worth individuals",
        "Roth IRA, 401(k), HSA, and backdoor Roth conversions",
        "How Peter Thiel turned a $2,000 Roth IRA into $5 billion",
        "Real estate tax advantages (depreciation, 1031 exchanges)",
        "Key takeaway: It's not what you make. It's what you keep."
      ]
    },
    {
      number: 5,
      title: "Building Passive Income Machines",
      duration: "9 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The \"4 Passive Income Streams\" from MJ DeMarco (The Millionaire Fastlane)",
        "Dividend investing: building a portfolio that pays you monthly",
        "Real estate: rental properties, REITs, and syndications",
        "Digital assets: online businesses, courses, and royalties",
        "Key takeaway: Trade time for money once. Get paid forever."
      ]
    },
    {
      number: 6,
      title: "Real Estate Wealth Building",
      duration: "8 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"BRRRR Method\": Buy, Rehab, Rent, Refinance, Repeat",
        "How to buy rental properties with little to no money down",
        "The \"1% Rule\" for cash-flowing properties",
        "Real estate syndications and crowdfunding (Fundrise, RealtyMogul)",
        "Key takeaway: Real estate has created 90% of millionaires."
      ]
    },
    {
      number: 7,
      title: "The Wealth Acceleration Formula",
      duration: "10 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Increase income, decrease expenses, invest the difference",
        "The \"Savings Rate\" equation: wealth = income - lifestyle",
        "How to increase your income 10x (not 10%)",
        "Side hustles, consulting, and entrepreneurship",
        "Key takeaway: You can't save your way to wealth. You have to earn it."
      ]
    },
    {
      number: 8,
      title: "Protecting Your Wealth: Risk Management",
      duration: "9 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "The \"3 Pillars of Wealth Protection\": insurance, estate planning, asset protection",
        "Life insurance, disability insurance, and umbrella policies",
        "Trusts, wills, and legacy planning",
        "How billionaires protect assets from lawsuits and creditors",
        "Key takeaway: Making money is hard. Keeping it is harder."
      ]
    },
    {
      number: 9,
      title: "The Psychology of Wealth: Avoiding Self-Sabotage",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Why 70% of lottery winners go broke (and how to avoid it)",
        "The \"Hedonic Treadmill\": why more money doesn't = more happiness",
        "Lifestyle inflation and the \"$100K trap\"",
        "Building wealth without sacrificing life (the \"Die With Zero\" philosophy)",
        "Key takeaway: Money is a tool, not a goal."
      ]
    },
    {
      number: 10,
      title: "The Path to Financial Independence (FIRE)",
      duration: "8 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The \"4% Rule\": how much you need to retire early",
        "FatFIRE, LeanFIRE, and CoastFIRE strategies",
        "How to retire in 10 years (not 40)",
        "Building a life you don't need to retire from",
        "Key takeaway: Financial independence isn't about quitting. It's about choosing."
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
            <Link href="/#courses" className="text-white hover:text-cyan-300 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
            <a 
              href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
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
            <div className="inline-block bg-green-500/20 text-purple-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 $247 • 412 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Your Salary Won't Make You Rich. Your System Will.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              The wealth architecture systems used by Ray Dalio, Warren Buffett, and Peter Thiel to build billion-dollar fortunes.
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $247
            </a>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: What You'll Learn</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1130648593?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  title="Wealth Building Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem: You Have Authority, But No Influence</h2>
              <p className="text-lg text-white leading-relaxed">
                You've been promoted. You have the title, the team, and the responsibility. But you feel like an imposter. Your voice isn't heard in meetings. Your ideas are overlooked. Your team is compliant, but not committed. You have authority, but you lack *influence*. In today's flat, fast-moving organizations, formal authority is a fragile and fleeting source of power. True leadership is the ability to influence without it.
              </p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Solution: Master Executive Presence</h2>
              <p className="text-lg text-white leading-relaxed">
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
              icon: <Brain className="h-12 w-12 text-cyan-300" />
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
                <p className="text-white">{item.description}</p>
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
              <div key={module.number} className="bg-slate-800/80 border border-slate-700 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-full">
                      <module.icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Module {module.number}: {module.title}</h3>
                      <p className="text-sm text-slate-200">{module.duration} • {module.lessons} lessons</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-slate-200 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                {openModule === module.number && (
                  <div className="p-6 border-t border-slate-700">
                    <ul className="space-y-3">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-emerald-400" />
                          <span className="text-white">{topic}</span>
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
                    <h3 className="text-center text-white text-2xl font-bold mb-4">Learn the frameworks used by:</h3>
          <p className="text-center text-slate-200 text-lg max-w-4xl mx-auto">
            <span className="text-cyan-300 font-semibold">Ray Dalio (Bridgewater)</span> • 
            <span className="text-cyan-300 font-semibold"> Warren Buffett (Berkshire Hathaway)</span> • 
            <span className="text-cyan-300 font-semibold"> Peter Thiel (Founders Fund)</span> • 
            <span className="text-cyan-300 font-semibold"> Vanguard advisors</span> • 
            <span className="text-cyan-300 font-semibold"> FIRE movement leaders</span>
          </p>
        </div>
      </section>

      {/* Benefits & Deliverables Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">After Completing This Course, You Will:</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-cyan-300 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Proprietary Frameworks & Tools</h3>
              <ul className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{deliverable}</span>
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
                  <ChevronDown className={`h-6 w-6 text-slate-200 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="pb-6">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Manage. Lead.</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Ready to unlock your leadership potential? Enroll now and get lifetime access to the frameworks that build empires.</p>
          <a
            href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $247
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center text-slate-200">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

