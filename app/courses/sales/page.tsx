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
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "The Jordan Belfort Straight Line System (without the fraud)",
        "Why \"selling\" died in 2015 and what replaced it",
        "The 5 mental shifts of 7-figure earners at Salesforce",
        "How Marc Benioff built a $200B company on trust, not tactics",
        "Key takeaway: You're not a salesperson. You're a revenue architect."
      ]
    },
    {
      number: 2,
      title: "The MEDDPICC Enterprise Sales Framework",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition",
        "How Salesforce uses MEDDPICC to close $1M+ deals",
        "The \"Champion Development\" playbook from Oracle",
        "Navigating complex B2B sales cycles (6-18 months)",
        "Key takeaway: Enterprise sales is a science, not an art"
      ]
    },
    {
      number: 3,
      title: "SPIN Selling: The Question Framework",
      duration: "9 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Situation, Problem, Implication, Need-Payoff questions",
        "How to uncover needs prospects don't know they have",
        "The Google \"3-Layer Deep\" discovery technique",
        "Case study: How a SaaS rep closed a $500K deal with 12 questions",
        "Key takeaway: The best salespeople ask, they don't tell"
      ]
    },
    {
      number: 4,
      title: "The Challenger Sale 2.0",
      duration: "10 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Teach, Tailor, Take Control methodology",
        "How to challenge prospects' thinking (without being aggressive)",
        "The \"Commercial Teaching\" framework from CEB/Gartner",
        "Why solution selling is dead and insight selling won",
        "Key takeaway: Customers don't want solutions. They want insights."
      ]
    },
    {
      number: 5,
      title: "Building Your Predictive Pipeline",
      duration: "9 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The math behind a $1M quota: reverse-engineering success",
        "Lead Velocity Rate (LVR): the metric that predicts growth",
        "How to build a pipeline that never runs dry",
        "The \"3x Rule\": Why you need 3x pipeline coverage",
        "Key takeaway: Predictable revenue requires predictable pipeline"
      ]
    },
    {
      number: 6,
      title: "The Trusted Advisor Blueprint",
      duration: "8 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "How Goldman Sachs builds unshakeable client relationships",
        "The \"Trusted Advisor\" model from McKinsey",
        "Moving from vendor to strategic partner",
        "The 4 pillars of executive presence in sales",
        "Key takeaway: Trust is the ultimate competitive advantage"
      ]
    },
    {
      number: 7,
      title: "Negotiation Mastery: The Chris Voss Method",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Tactical empathy and mirroring from FBI hostage negotiation",
        "The \"No-Oriented Question\" technique",
        "How to anchor high and get to \"That's right\"",
        "The \"Give-Get\" negotiation matrix for enterprise deals",
        "Key takeaway: Never split the difference. Create value instead."
      ]
    },
    {
      number: 8,
      title: "Closing Techniques That Actually Work",
      duration: "9 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The assumptive close (used by top 1% of reps)",
        "Trial closes: testing commitment without pressure",
        "How to handle objections like a pro (price, timing, competition)",
        "The \"Puppy Dog Close\" from retail psychology",
        "Key takeaway: Closing isn't a moment. It's a process."
      ]
    },
    {
      number: 9,
      title: "The Science of Scale: Building a Sales Machine",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "How to hire A-players (the Amazon \"Bar Raiser\" method)",
        "Building a sales playbook that runs without you",
        "The metrics that actually matter: CAC, LTV, Win Rate, Cycle Time",
        "From individual contributor to VP of Sales",
        "Key takeaway: Systems scale. Heroics don't."
      ]
    },
    {
      number: 10,
      title: "The Future of Sales: AI-Resistant Skills",
      duration: "8 min",
      lessons: 1,
      icon: Star,
      topics: [
        "How AI is changing prospecting, qualification, and forecasting",
        "The skills that will be irreplaceable in 2030 (empathy, strategy, relationships)",
        "Building your personal brand as a sales leader",
        "The path to Chief Revenue Officer (CRO)",
        "Key takeaway: AI will replace salespeople. But not sales leaders."
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
      <nav className="bg-black border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-white hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
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
        <div className="absolute inset-0 bg-[url('/sales-mastery-hero-final.jpg')] bg-cover bg-center opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-500/20 text-orange-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 $247 • 253 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Stop Selling. Start Closing.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
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

      {/* Video Preview Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: What You'll Learn</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-slate-600">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1130648006?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  title="Sales Mastery Preview"
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
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Problem: You're Playing a Losing Game</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                You've been taught to sell. You've read the books, attended the seminars, and practiced your pitch. But you're still struggling to hit your numbers consistently. Why? Because you've been taught a system designed for the 99%, not the 1%. The traditional sales playbook is dead. In a world of automated outreach and AI-powered lead scoring, the only thing that separates you from the noise is your ability to architect a deal, not just sell a product.
              </p>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Solution: Become a Revenue Architect</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
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
              icon: <Brain className="h-20 w-20 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            }, {
              title: "The Trusted Advisor Blueprint",
              description: "The Goldman Sachs model for building unshakeable client relationships.",
              icon: <Heart className="h-20 w-20 text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            }, {
              title: "Predictive Pipeline Architecture",
              description: "How to build a sales pipeline that never runs dry.",
              icon: <TrendingUp className="h-20 w-20 text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            }, {
              title: "The Amazon \"Working Backwards\" Method",
              description: "How to close multi-million dollar deals by starting with the customer's press release.",
              icon: <Lightbulb className="h-20 w-20 text-white drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            }, {
              title: "The Google \"3-Layer Deep\" Discovery",
              description: "How to uncover needs your prospects don't even know they have.",
              icon: <Target className="h-20 w-20 text-white drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
            }].map((item, index) => (
              <div key={index} className="bg-black p-8 rounded-lg border-2 border-slate-800">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Complete Course Curriculum</h2>
          <div className="max-w-4xl mx-auto">
            {modules.map((module) => (
              <div key={module.number} className="bg-black border-2 border-slate-600 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-full shadow-lg shadow-cyan-500/50">
                      <module.icon className="h-14 w-14 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Module {module.number}: {module.title}</h3>
                      <p className="text-sm text-white">{module.duration} • {module.lessons} lessons</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-14 w-14 text-white transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                {openModule === module.number && (
                  <div className="p-6 border-t border-slate-600">
                    <ul className="space-y-3">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
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
          <p className="text-center text-white text-lg max-w-4xl mx-auto">
            <span className="text-cyan-400 font-semibold">Salesforce top performers</span> • 
            <span className="text-cyan-400 font-semibold"> Goldman Sachs advisors</span> • 
            <span className="text-cyan-400 font-semibold"> Oracle enterprise teams</span> • 
            <span className="text-cyan-400 font-semibold"> Google sales engineers</span> • 
            <span className="text-cyan-400 font-semibold"> FBI negotiators</span>
          </p>
        </div>
      </section>

      {/* Benefits & Deliverables Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">After Completing This Course, You Will:</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-14 w-14 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Proprietary Frameworks & Tools</h3>
              <ul className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-14 w-14 text-emerald-400 mt-1 flex-shrink-0" />
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
                  <ChevronDown className={`h-14 w-14 text-white transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
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
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

