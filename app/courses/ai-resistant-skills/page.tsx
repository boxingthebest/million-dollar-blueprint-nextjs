"use client";
import ApexChatbot from "@/components/ApexChatbot";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";

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
      title: "The Executive Intelligence Framework",
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "Why 47% of jobs will be automated by 2030 (Oxford study)",
        "The skills AI can't replace (yet): creativity, empathy, strategy, judgment",
        "How ChatGPT, Midjourney, and Copilot are changing work",
        "The \"Centaur Model\": humans + AI outperform both alone",
        "Key takeaway: AI won't replace you. Someone using AI will."
      ]
    },
    {
      number: 2,
      title: "The Systems Mastery Framework",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"5 Whys\" technique from Toyota for root-cause analysis",
        "How McKinsey consultants think strategically",
        "The \"OODA Loop\" for decision-making under uncertainty",
        "Systems thinking: seeing patterns, not just problems",
        "Key takeaway: AI can optimize. Humans strategize."
      ]
    },
    {
      number: 3,
      title: "The Trust Acceleration Formula",
      duration: "9 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "The \"4 Pillars of EQ\": self-awareness, self-management, social awareness, relationship management",
        "Why EQ predicts success better than IQ (Daniel Goleman research)",
        "How to read a room and influence without authority",
        "Empathy as a competitive advantage in leadership",
        "Key takeaway: Robots can't read emotions. You can."
      ]
    },
    {
      number: 4,
      title: "Influence Without Authority",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "The \"SCAMPER Method\" for creative thinking",
        "How Pixar uses \"Braintrust\" sessions for breakthrough ideas",
        "Design thinking from Stanford d.school",
        "Lateral thinking techniques from Edward de Bono",
        "Key takeaway: AI generates. Humans innovate."
      ]
    },
    {
      number: 5,
      title: "Creative Problem-Solving",
      duration: "9 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"Pyramid Principle\" from McKinsey for executive communication",
        "How to present to the C-suite (Jeff Bezos' 6-page memo rule)",
        "Storytelling frameworks from Pixar and TED Talks",
        "The psychology of persuasion (Cialdini's 6 principles)",
        "Key takeaway: AI can write. Humans persuade."
      ]
    },
    {
      number: 6,
      title: "Executive Communication (Pyramid Principle)",
      duration: "8 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "The \"Give First\" philosophy from Brad Feld (Techstars)",
        "How to build a network that opens doors",
        "The \"Dunbar Number\": why 150 relationships matter most",
        "LinkedIn strategies from top executives and investors",
        "Key takeaway: AI can't build trust. You can."
      ]
    },
    {
      number: 7,
      title: "The Value Creation Framework",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"Pre-Mortem\" technique from Gary Klein",
        "How Jeff Bezos makes \"Type 1\" vs \"Type 2\" decisions",
        "Avoiding cognitive biases (confirmation bias, sunk cost fallacy)",
        "The \"10/10/10 Rule\" for long-term thinking",
        "Key takeaway: AI predicts. Humans decide."
      ]
    },
    {
      number: 8,
      title: "The Probabilistic Thinking Framework",
      duration: "9 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The \"T-Shaped Professional\" model: deep expertise + broad skills",
        "How to learn anything in 20 hours (Josh Kaufman method)",
        "The \"Growth Mindset\" from Carol Dweck (Stanford)",
        "Building a personal learning system (Zettelkasten, Feynman Technique)",
        "Key takeaway: AI is static. Humans evolve."
      ]
    },
    {
      number: 9,
      title: "The Thought Leadership Framework",
      duration: "10 min",
      lessons: 1,
      icon: Star,
      topics: [
        "Why ethics is the ultimate competitive advantage",
        "The \"Stakeholder Capitalism\" model from Klaus Schwab (WEF)",
        "How Patagonia built a $3B company on values",
        "Navigating moral dilemmas in business",
        "Key takeaway: AI has no conscience. You do."
      ]
    },
    {
      number: 10,
      title: "The Career Resilience Framework",
      duration: "8 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The \"Barbell Strategy\": combine AI-proof skills with AI leverage",
        "How to position yourself as irreplaceable in your organization",
        "Building a personal brand as a thought leader",
        "The path to executive roles that AI can't touch (CEO, CPO, CRO)",
        "Key takeaway: The future belongs to those who adapt, not resist."
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
      <nav className="bg-black border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16 logo-glow" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-white hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden animated-gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/course-ai-skills.jpg')] opacity-10 bg-cover bg-center" />
        
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              ⚡ Limited Founding Member Pricing - Ends Soon
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
                Master the 10 Proprietary Frameworks AI Can't Replicate—
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 animate-gradient-text inline-block"
              >
                Future-Proof Your Career and Command Executive Pay
              </motion.span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-white mb-6">
              The 10 Proprietary Blueprints Used by Fortune 100 Executives to Stay Irreplaceable in the Age of AI Disruption.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              The World Economic Forum predicts 85 million jobs will be displaced by AI by 2025. But there are 5 human skills AI will never replicate. Master them, and you'll be irreplaceable. This isn't theory—these are the exact frameworks used by executives at the world's most successful companies to stay ahead of automation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">5</div>
                <div className="text-sm text-white">AI-Resistant Skills</div>
              </div>
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">3.5h</div>
                <div className="text-sm text-white">Expert Training</div>
              </div>
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">$85K</div>
                <div className="text-sm text-white">Avg Salary Increase</div>
              </div>
              <div className="bg-black/50 border-2 border-slate-700 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">253</div>
                <div className="text-sm text-white">Students Enrolled</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup?course=ai-resistant-skills-paid"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all"
              >
                Enroll Now - $197 (Originally $395 • Save 50%) <ArrowRight className="ml-2" />
              </Link>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center border-2 border-orange-400 text-orange-300 hover:bg-orange-500/10 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
              >
                See Full Curriculum
              </a>
            </div>

            <p className="text-white text-sm mt-6">
              ✓ 30-Day Money-Back Guarantee &nbsp;&nbsp; ✓ Lifetime Access &nbsp;&nbsp; ✓ Instant Access
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Most "AI-Proof" Career Advice Is Dangerously Wrong
            </h2>
            <div className="text-lg md:text-xl text-white space-y-4 leading-relaxed">
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
            <p className="text-lg md:text-xl text-white text-center mb-8">
              Watch this 45-second overview
            </p>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1129181469?badge=0&autopause=0&player_id=0&app_id=58479&playsinline=1&muted=0" 
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
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Complete Course Curriculum
              </h2>
              <p className="text-lg md:text-xl text-white">
                5 comprehensive modules • 3.5 hours of expert training • Lifetime access
              </p>
            </div>

            <div className="space-y-4">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.number} className="bg-black/50 border-2 border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                      className="w-full px-6 md:px-8 py-6 flex items-center gap-4 text-left hover:bg-black/80 transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-orange-400 font-semibold mb-1">Module {module.number}</div>
                        <div className="text-lg md:text-xl font-semibold text-white mb-1">{module.title}</div>
                        <div className="text-sm text-white">{module.duration} • {module.lessons} lessons</div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                    </button>
                    {openModule === module.number && (
                      <div className="px-6 md:px-8 pb-6 border-t border-slate-700">
                        <ul className="space-y-3 mt-4">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span className="text-white">{topic}</span>
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
              <p className="text-white text-sm mt-4">Or 3 payments of $69</p>
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
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{item}</span>
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
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-orange-500/50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                After Completing This Course, You Will:
              </h3>
              <ul className="space-y-3 max-w-2xl mx-auto">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 justify-center">
                    <Star className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-white text-lg">{benefit}</span>
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
                10 Proprietary Frameworks Certificate
                </p>
                <p className="text-white text-center text-sm md:text-base">
                  Demonstrating mastery in: Strategic Thinking, Emotional Intelligence, Creative Problem-Solving, Human Connection
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white text-sm mb-1">Certificate ID</p>
                  <p className="text-white font-mono text-xs">MDB-AI--XXXXX</p>
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
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-black/50 border-2 border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 md:px-8 py-6 flex justify-between items-center text-left hover:bg-black/80 transition-all"
                  >
                    <span className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 md:px-8 pb-6">
                      <p className="text-white leading-relaxed">{faq.answer}</p>
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
            <p className="text-white text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | Instant Access</p>
          </div>
        </div>
      </section>


      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-600 to-red-600 border-t-4 border-orange-400 shadow-2xl z-50 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">🔥 Limited Time: Save 50% Today</p>
            <p className="text-white text-sm">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
          <a
            href="https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap"
            style={{color: '#ea580c'}}
          >
            Enroll Now - $197
          </a>
        </div>
      </div>

      <ApexChatbot />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

