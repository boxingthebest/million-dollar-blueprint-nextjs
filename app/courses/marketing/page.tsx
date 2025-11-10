/* eslint-disable react/no-unescaped-entities */
"use client";
import FuturisticBackground from "@/components/FuturisticBackground";
import FloatingParticles from "@/components/FloatingParticles";
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";
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
      title: "Growth Engineering vs. Traditional Marketing",
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "Why \"marketing\" is dead and \"growth engineering\" replaced it",
        "The mindset shift from campaigns to systems",
        "How Airbnb grew from $0 to $31B without traditional marketing",
        "The \"T-Shaped Marketer\" model from Buffer",
        "Key takeaway: Marketing is no longer creative. It's scientific."
      ]
    },
    {
      number: 2,
      title: "The AARRR Pirate Metrics Framework",
      duration: "10 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Acquisition, Activation, Retention, Referral, Revenue",
        "How to diagnose growth bottlenecks in your funnel",
        "The metrics that actually predict sustainable growth",
        "Case study: How Dropbox used referrals to grow 3900% in 15 months",
        "Key takeaway: You can't fix what you don't measure."
      ]
    },
    {
      number: 3,
      title: "The Viral Loop: Engineering Word-of-Mouth",
      duration: "9 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"K-Factor\": measuring virality mathematically",
        "How Uber, Airbnb, and PayPal engineered viral growth",
        "The \"Double-Sided Incentive\" model from Dropbox",
        "Building network effects into your product",
        "Key takeaway: The best marketing doesn't feel like marketing."
      ]
    },
    {
      number: 4,
      title: "The Hook Model: Making Products Addictive",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Trigger, Action, Variable Reward, Investment (Nir Eyal framework)",
        "How Instagram, TikTok, and Slack create habit-forming products",
        "The psychology of dopamine and behavioral loops",
        "Ethical persuasion vs. manipulation",
        "Key takeaway: Retention beats acquisition. Every time."
      ]
    },
    {
      number: 5,
      title: "Content Marketing That Converts",
      duration: "9 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The \"Skyscraper Technique\" from Backlinko (10x content)",
        "How HubSpot built a $30B company on content marketing",
        "SEO fundamentals: keywords, backlinks, and domain authority",
        "The \"Jobs to Be Done\" framework for content strategy",
        "Key takeaway: Content is king. But distribution is queen."
      ]
    },
    {
      number: 6,
      title: "Paid Acquisition: Facebook, Google, LinkedIn",
      duration: "8 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"CAC < LTV\" rule for profitable growth",
        "How to run profitable Facebook and Google Ads campaigns",
        "The \"Ladder of Awareness\" for targeting (Eugene Schwartz)",
        "A/B testing frameworks from Optimizely and VWO",
        "Key takeaway: Paid ads are a tax on companies that can't do organic."
      ]
    },
    {
      number: 7,
      title: "Email Marketing & Marketing Automation",
      duration: "10 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "Why email has 40x ROI compared to social media",
        "The \"Welcome Series\" framework that converts 50%+ of subscribers",
        "Marketing automation with HubSpot, Marketo, and ActiveCampaign",
        "Segmentation and personalization at scale",
        "Key takeaway: The money is in the list. And the follow-up."
      ]
    },
    {
      number: 8,
      title: "Conversion Rate Optimization (CRO)",
      duration: "9 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The \"LIFT Model\" for conversion optimization (WiderFunnel)",
        "How to run A/B tests that actually matter",
        "Landing page psychology: headlines, CTAs, social proof",
        "Case study: How Booking.com tests 1,000+ experiments per year",
        "Key takeaway: A 1% conversion lift = millions in revenue."
      ]
    },
    {
      number: 9,
      title: "Data-Driven Marketing & Analytics",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Google Analytics 4: tracking the customer journey",
        "Building a marketing dashboard (the 5 metrics that matter)",
        "Attribution modeling: first-touch, last-touch, multi-touch",
        "How Netflix uses data to drive $30B in revenue",
        "Key takeaway: Intuition is great. Data is better."
      ]
    },
    {
      number: 10,
      title: "The Future of Marketing: AI & Automation",
      duration: "8 min",
      lessons: 1,
      icon: Star,
      topics: [
        "How AI is changing SEO, content, and paid ads",
        "The skills that will be irreplaceable in 2030 (strategy, creativity, empathy)",
        "Building a personal brand as a marketing leader",
        "The path to Chief Marketing Officer (CMO)",
        "Key takeaway: AI will replace marketers. But not marketing strategists."
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
      <nav className="bg-black border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-white hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden animated-gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('/course-marketing.jpg')] bg-cover bg-center opacity-10" />
        
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              📈 $197 • 312 Students Enrolled • Only 47 Spots Left This Month
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Stop Marketing. Start Engineering Growth.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              The data-driven growth hacking playbooks used by Airbnb, Dropbox, and Uber to acquire millions of users.
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $197 (Originally $395 • Save 50%)
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
                  src="https://player.vimeo.com/video/1130648338?badge=0&autopause=0&player_id=0&app_id=58479&playsinline=1&muted=0" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  title="Digital Marketing Mastery Preview"
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Problem: You're Stuck in the Marketing Hamster Wheel</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                You're spending money on ads, posting on social media, and writing blog posts. But your growth has flatlined. You're stuck in a cycle of "more content, more ads, more everything" with diminishing returns. Why? Because you're a marketer, not a growth engineer. The old marketing playbook is obsolete. In a world of infinite noise, the only way to win is to build a growth engine, not just run campaigns.
              </p>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Solution: Become a Growth Engineer</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
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
              icon: <TrendingUp className="h-20 w-20 text-cyan-400" />
            }, {
              title: "The Hook Model",
              description: "How to build products and marketing campaigns that are so engaging, they're addictive.",
              icon: <Heart className="h-20 w-20 text-cyan-400" />
            }, {
              title: "The Bullseye Framework",
              description: "How to identify and dominate the one marketing channel that will drive 80% of your growth.",
              icon: <Target className="h-20 w-20 text-cyan-400" />
            }, {
              title: "The Viral Loop",
              description: "How to build virality into your product from day one.",
              icon: <Brain className="h-20 w-20 text-cyan-400" />
            }, {
              title: "The CRO Playbook",
              description: "How to systematically increase your conversion rates at every step of the funnel.",
              icon: <Lightbulb className="h-20 w-20 text-cyan-400" />
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
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-full shadow-lg shadow-cyan-500/50">
                      <module.icon className="h-14 w-14 text-cyan-400" />
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
                          <Check className="h-5 w-5 text-cyan-400" />
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
            <span className="text-cyan-400 font-semibold">Airbnb growth teams</span> • 
            <span className="text-cyan-400 font-semibold"> Dropbox viral engineers</span> • 
            <span className="text-cyan-400 font-semibold"> HubSpot marketers</span> • 
            <span className="text-cyan-400 font-semibold"> Netflix data scientists</span> • 
            <span className="text-cyan-400 font-semibold"> Google Ads specialists</span>
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
                    <Check className="h-14 w-14 text-cyan-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Professional Certificate Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Earn Your Professional Certificate</h2>
            <p className="text-xl text-white text-center mb-12 max-w-3xl mx-auto">
              Upon completion, receive a verified certificate you can share with employers, add to your LinkedIn profile, and showcase your expertise.
            </p>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">Certificate of Completion</h3>
                </div>
                <p className="text-white text-lg">Million Dollar Blueprint</p>
              </div>
              
              <div className="border-t-2 border-b-2 border-cyan-400/30 py-8 mb-8">
                <p className="text-white text-sm text-center mb-2">This certifies that</p>
                <p className="text-3xl md:text-4xl font-bold text-white text-center mb-4">[Your Name]</p>
                <p className="text-white text-sm text-center mb-2">has successfully completed</p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-4">
                  Digital Marketing Mastery Certificate
                </p>
                <p className="text-white text-center text-sm md:text-base">
                  Demonstrating mastery in: Growth Engineering, AARRR Metrics, Viral Marketing, Conversion Optimization
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white text-sm mb-1">Certificate ID</p>
                  <p className="text-white font-mono text-xs">MDB-MAR-XXXXX</p>
                </div>
                <div>
                  <p className="text-white text-sm mb-1">Issued Date</p>
                  <p className="text-white font-semibold">Upon Completion</p>
                </div>
                <div>
                  <p className="text-white text-sm mb-1">Verification</p>
                  <p className="text-cyan-400 font-semibold">Blockchain Verified</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-cyan-400" />
                  <span>Add to LinkedIn</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-cyan-400" />
                  <span>Download PDF</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-cyan-400" />
                  <span>Share on Social Media</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-black/30 border border-cyan-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">🎓</div>
                <h4 className="text-white font-bold mb-2">Career Advancement</h4>
                <p className="text-white text-sm">Show employers your commitment to professional development</p>
              </div>
              <div className="bg-black/30 border border-purple-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-white font-bold mb-2">Verified Credentials</h4>
                <p className="text-white text-sm">Blockchain-verified certificates with unique IDs</p>
              </div>
              <div className="bg-black/30 border border-emerald-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="text-white font-bold mb-2">LinkedIn Ready</h4>
                <p className="text-white text-sm">One-click integration with your LinkedIn profile</p>
              </div>
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
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Market. Engineer Growth.</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Ready to build a growth engine? Enroll now and get lifetime access to the playbooks that build unicorns.</p>
          <a
            href="https://buy.stripe.com/00w14mepHbav5lO9JW08g05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $197 (Originally $395 • Save 50%)
          </a>
        </div>
      </section>


      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 border-t-4 border-cyan-400 shadow-2xl z-50 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">🔥 Limited Time: Save 50% Today</p>
            <p className="text-white text-sm">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
          <a
            href="https://buy.stripe.com/00w14mepHbav5lO9JW08g05"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap text-cyan-600 hover:bg-cyan-50"
          >
            Enroll Now - $197
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

