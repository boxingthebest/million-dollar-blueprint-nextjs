"use client";
import ApexChatbot from "@/components/ApexChatbot";
import FuturisticBackground from "@/components/FuturisticBackground";
// HeroSectionDivider removed for cleaner design
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp, Users, MessageSquare, Scale, Compass, Award, Zap, FileText, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AIResistantSkillsPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

    const modules = [
    {
      number: 1,
      title: "The Executive Intelligence Framework™",
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "The 4-part diagnostic tool for any business challenge",
        "Problem Definition through Second-Order Thinking",
        "The Five Whys Plus One technique for root-cause analysis",
        "Stakeholder Analysis using the Power-Interest Matrix",
        "Case Study: How Amazon used this to build AWS ($80B business)"
      ]
    },
    {
      number: 2,
      title: "The Systems Mastery Framework™",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The 5-step framework for seeing connections AI will never find",
        "How to map complex systems visually",
        "Identifying positive and negative feedback loops",
        "Finding leverage points where small changes create massive impact",
        "Case Study: Why Apple succeeded where Nokia failed (trillion-dollar difference)"
      ]
    },
    {
      number: 3,
      title: "The Trust Acceleration Formula™",
      duration: "9 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "The formula: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
        "Goldman Sachs' 3-phase relationship framework",
        "The Discovery Phase: Strategic listening techniques",
        "The Value-Add Phase: Give before you get principle",
        "Case Study: How Goldman Sachs maintains 50+ year client relationships"
      ]
    },
    {
      number: 4,
      title: "The Stakeholder Influence Map",
      duration: "10 min",
      lessons: 1,
      icon: Users,
      topics: [
        "How to get things done when you have zero formal power",
        "The 4 layers: Decision Ecosystem, Motivations, Coalitions, Reciprocity",
        "Mapping formal power vs informal influence",
        "Building coalitions before you need them",
        "Case Study: How I closed $8M deals at Amazon without being the decision maker"
      ]
    },
    {
      number: 5,
      title: "The Innovation Sprint Framework",
      duration: "11 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Google's 5-day framework for breakthrough ideas",
        "Day 1: Map the problem space with Critical Moment Analysis",
        "Day 2-3: Sketch solutions individually, then decide",
        "Day 4-5: Build realistic prototypes and test with users",
        "Case Study: How Google redesigned Gmail (1B+ users)"
      ]
    },
    {
      number: 6,
      title: "The Pyramid Principle",
      duration: "10 min",
      lessons: 1,
      icon: MessageSquare,
      topics: [
        "McKinsey's framework for executive communication",
        "Answer first, logic second, evidence third",
        "The MECE principle: Mutually Exclusive, Collectively Exhaustive",
        "The 30-second test for any presentation",
        "Case Study: How McKinsey won a $50M consulting engagement"
      ]
    },
    {
      number: 7,
      title: "The Value Creation Framework",
      duration: "12 min",
      lessons: 1,
      icon: Scale,
      topics: [
        "Harvard's framework for win-win negotiations",
        "Focus on interests, not positions (the orange example)",
        "Expand the pie before you divide it",
        "Develop your BATNA (Best Alternative)",
        "Case Study: Amazon's $50M retail partnership"
      ]
    },
    {
      number: 8,
      title: "The Probabilistic Thinking Framework",
      duration: "11 min",
      lessons: 1,
      icon: Target,
      topics: [
        "How poker champions and hedge fund managers make decisions",
        "Frame every decision as a bet with expected value",
        "Assign probabilities to outcomes (confidence intervals)",
        "Pre-mortems and pre-parades for risk assessment",
        "Case Study: How Jeff Bezos decided to launch AWS"
      ]
    },
    {
      number: 9,
      title: "The Thought Leadership Framework",
      duration: "10 min",
      lessons: 1,
      icon: Award,
      topics: [
        "How to position yourself as THE expert in your field",
        "The Positioning Statement Formula",
        "Building a content engine (30 pieces from 1 anchor)",
        "Strategic relationship building for visibility",
        "How I went from 0 to 10,000 followers in one year"
      ]
    },
    {
      number: 10,
      title: "The Career Resilience Framework",
      duration: "12 min",
      lessons: 1,
      icon: Compass,
      topics: [
        "The 5 pillars for staying valuable for the next 20 years",
        "T-Shaped Skills: Deep expertise + broad knowledge",
        "Building an AI-augmented workflow (Delegation Matrix)",
        "The Three Horizons Model for portfolio careers",
        "How to become the person AI can't replace"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course worth the investment?",
      answer: "Our students report significant career advancement after completing the course. Many have been promoted, landed better opportunities, or started successful businesses. You're not just buying a course—you're investing in your irreplaceable future."
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
      answer: "This isn't generic advice about 'soft skills.' These are specific, proprietary frameworks used by executives at top companies. You're learning the exact methodologies that help professionals advance to executive-level positions."
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
      answer: "The course is designed to be completed in 10 days—one lesson per day, about 10 minutes each. However, you can go faster or slower based on your schedule. Most students complete it within 2-4 weeks."
    },
    {
      question: "Will this work for my industry?",
      answer: "Yes! The skills taught—strategic thinking, emotional intelligence, creative problem-solving, negotiation, and executive communication—are universal. Our students come from tech, finance, healthcare, consulting, manufacturing, and more, all seeing remarkable results."
    }
  ];

  const benefits = [
    "Think strategically like a top consultant",
    "Build trust like a top relationship manager",
    "Innovate like a leading product designer",
    "Communicate like a Fortune 500 executive",
    "Negotiate like a Harvard-trained dealmaker"
  ];

  const deliverables = [
    "10 video lessons (~10 min each) with proprietary frameworks",
    "BONUS: Executive Interview Mastery video lesson",
    "5 downloadable PDF toolkits with templates & worksheets",
    "Complete Course Blueprints - All 10 frameworks reference guide",
    "Strategic Thinking Toolkit - Diagnosis & System Mapping",
    "Influence & Communication Blueprint - Commanding the Room",
    "Decision-Making Toolkit - Uncertainty & Risk frameworks",
    "Executive Interview Mastery Playbook",
    "Real case studies from leading companies",
    "Action steps after every lesson",
    "Lifetime access to all future updates"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">10 Frameworks</span> That Make You Irreplaceable in the Age of AI
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-8"
            >
              The strategic thinking, influence, and decision-making frameworks used by top executives at leading companies—skills AI will never replace.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>10 Video Lessons + Bonus</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>5 PDF Toolkits</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-cyan-400" />
                <span>30-Day Guarantee</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Link
                href="https://buy.stripe.com/dRmbJ02GZ2DZ7tW5tG08g0q"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105"
              >
                Enroll Now - $197 <ArrowRight className="ml-2" />
              </Link>
              <div className="text-slate-400">
                <span className="line-through">$397</span>
                <span className="text-orange-400 font-bold ml-2">50% OFF</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Social Proof Bar */}
      <section className="py-8 bg-black border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">250+</p>
              <p className="text-slate-400 text-sm">Students Enrolled</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">10</p>
              <p className="text-slate-400 text-sm">Frameworks Taught</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">22</p>
              <p className="text-slate-400 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">4.9/5</p>
              <p className="text-slate-400 text-sm">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
              85 Million Jobs Will Be Displaced by AI by 2025
            </h2>
            <p className="text-xl text-slate-300 mb-8 text-center">
              That's not a prediction. That's a World Economic Forum report.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ Skills AI Will Replace</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Data entry and basic analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Routine customer service
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Standard content creation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Repetitive decision-making
                  </li>
                </ul>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">✓ Skills AI Will Never Replace</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Strategic thinking & systems analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Building trust & relationships
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Influence without authority
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    High-stakes decision-making
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-xl text-white text-center font-semibold">
              The question isn't whether AI will change your industry.<br/>
              <span className="text-orange-400">The question is whether you'll be ready.</span>
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              10 Proprietary Frameworks in 10 Days
            </h2>
            <p className="text-xl text-slate-300 mb-12 text-center">
              The exact methodologies that McKinsey charges $50,000/week to teach
            </p>

            <div className="space-y-4">
              {modules.map((module, idx) => (
                <div key={idx} className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all">
                  <button
                    onClick={() => setOpenModule(openModule === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-cyan-400 text-sm font-semibold">Lesson {module.number}</p>
                        <h3 className="text-lg font-bold text-white">{module.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 text-sm hidden md:block">{module.duration}</span>
                      <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${openModule === idx ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {openModule === idx && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-700">
                      <ul className="space-y-2">
                        {module.topics.map((topic, topicIdx) => (
                          <li key={topicIdx} className="flex items-start gap-3 text-slate-300">
                            <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bonus Section */}
            <div className="mt-8 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-2 border-orange-500/50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-orange-400 text-sm font-semibold">BONUS LESSON</p>
                  <h3 className="text-lg font-bold text-white">Interview Mastery: The Meta-Skill</h3>
                </div>
              </div>
              <p className="text-slate-300">
                The one skill that ties everything together. Learn how to demonstrate all 10 frameworks in high-stakes interviews and presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              Everything You Get Today
            </h2>
            <p className="text-xl text-slate-300 mb-12 text-center">
              Instant access to the complete AI-Resistant Skills system
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-slate-900/50 border border-slate-700 rounded-xl p-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">{item}</p>
                </div>
              ))}
            </div>

            {/* PDF Toolkits Highlight */}
            <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">5 Downloadable PDF Toolkits</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-3">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Complete Course Blueprints</span>
                </div>
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-3">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Strategic Thinking Toolkit</span>
                </div>
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-3">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Influence & Communication Blueprint</span>
                </div>
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-3">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Decision-Making Toolkit</span>
                </div>
                <div className="bg-black/30 rounded-lg p-4 flex items-center gap-3">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Executive Interview Mastery Playbook</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="https://buy.stripe.com/dRmbJ02GZ2DZ7tW5tG08g0q"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105"
              >
                Get Instant Access - $197 <ArrowRight className="ml-2" />
              </Link>
              <p className="text-slate-400 mt-4">30-Day Money-Back Guarantee • Lifetime Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Instructor */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Learn From Someone Who's Been There
                </h2>
                <p className="text-slate-300 mb-6 text-lg">
                  I spent 22 years at Amazon and Goldman Sachs, working alongside executives who earn seven figures. I've seen entire departments automated. But I've also seen professionals who became <span className="text-cyan-400 font-semibold">more valuable</span> because they developed the right skills.
                </p>
                <p className="text-slate-300 mb-6 text-lg">
                  These aren't soft skills. They're <span className="text-orange-400 font-semibold">power skills</span>. They're the frameworks that top consulting firms teach to their clients. And I've packaged them into a course you can complete in 10 days.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-slate-800 rounded-lg px-4 py-2">
                    <p className="text-cyan-400 font-bold">Amazon</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg px-4 py-2">
                    <p className="text-cyan-400 font-bold">Goldman Sachs</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg px-4 py-2">
                    <p className="text-cyan-400 font-bold">22 Years</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-30" />
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-4">My Promise to You</h3>
                  <p className="text-slate-300">
                    These are the exact frameworks I used to close deals worth millions, advise Fortune 500 CEOs, and navigate three major technology disruptions. If they don't work for you, I'll give you a full refund. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              What Our Students Say
            </h2>
            <p className="text-xl text-slate-300 mb-12 text-center">
              Join 250+ professionals who are already future-proofing their careers
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/michael-chen.png"
                    alt="Michael Chen"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-cyan-400 w-20 h-20 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-bold">Michael Chen</h4>
                    <p className="text-cyan-400 text-sm">Senior Product Manager → VP of Product</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "Within 3 months of completing this course, I was promoted to VP. The frameworks for strategic thinking and stakeholder influence completely changed how I approach my work. The results exceeded my expectations."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-400/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/sarah-williams.png"
                    alt="Sarah Williams"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-purple-400 w-20 h-20 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-bold">Sarah Williams</h4>
                    <p className="text-purple-400 text-sm">Marketing Director at Fortune 500</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "I was terrified AI would make my marketing skills obsolete. This course taught me how to leverage AI while developing irreplaceable strategic capabilities. I'm now leading our company's AI transformation initiative."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-400/30 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/david-rodriguez.png"
                    alt="David Rodriguez"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-emerald-400 w-20 h-20 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-bold">David Rodriguez</h4>
                    <p className="text-emerald-400 text-sm">Tech Lead → CTO at Startup</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "As a developer, I thought coding was enough. This course opened my eyes to executive-level thinking. The Pyramid Principle transformed how I present to investors and stakeholders."
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">Join professionals who are advancing their careers with these frameworks</p>
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
                AI-Resistant Skills: 10 Proprietary Frameworks
                </p>
                <p className="text-white text-center text-sm md:text-base">
                  Demonstrating mastery in: Strategic Thinking, Systems Analysis, Trust Building, Influence, Innovation, Executive Communication, Negotiation, Decision-Making, Thought Leadership, Career Resilience
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white text-sm mb-1">Certificate ID</p>
                  <p className="text-white font-mono text-xs">MDB-AI-XXXXX</p>
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
                href="https://buy.stripe.com/dRmbJ02GZ2DZ7tW5tG08g0q"
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
            href="https://buy.stripe.com/dRmbJ02GZ2DZ7tW5tG08g0q"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap"
            style={{color: '#ea580c'}}
          >
            Enroll Now - $197
          </a>
        </div>
      </div>

      <ApexChatbot />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 pb-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2025 Million Dollar Blueprint. All rights reserved.</p>
          <p className="text-slate-600 text-xs mt-2">Questions? Email us at hello@milliondollarblueprint.ai</p>
        </div>
      </footer>
    </div>
  );
}
