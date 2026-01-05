"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target, Shield, TrendingUp, Brain, Heart, Lightbulb, MessageSquare, Scale, Compass, Award, Download, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AIResistantSkillsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [notification, setNotification] = useState<{ name: string; location: string } | null>(null);

  // Sticky bar appears after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Social proof notifications
  useEffect(() => {
    const names = [
      { name: "Jennifer M.", location: "California" },
      { name: "Robert T.", location: "Texas" },
      { name: "Amanda R.", location: "New York" },
      { name: "Daniel K.", location: "Florida" },
      { name: "Michelle L.", location: "Illinois" },
      { name: "Christopher P.", location: "Arizona" },
      { name: "Lauren S.", location: "Colorado" },
      { name: "Andrew W.", location: "Georgia" },
    ];

    const showNotification = () => {
      const randomPerson = names[Math.floor(Math.random() * names.length)];
      setNotification(randomPerson);
      setTimeout(() => setNotification(null), 4000);
    };

    // Show first notification after 15 seconds
    const initialTimeout = setTimeout(showNotification, 15000);
    
    // Then show every 45-90 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 45000 + 45000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleCheckout = () => {
    setIsLoading(true);
    window.location.href = 'https://buy.stripe.com/9B614m4P7guPfasdTb08g0s';
  };

  const modules = [
    {
      number: 1,
      title: "The Executive Intelligence Framework™",
      duration: "8 min",
      icon: Brain,
      description: "The 4-part diagnostic tool for any business challenge. Second-order thinking, root-cause analysis, and stakeholder mapping. Case Study: How Amazon built AWS ($80B business).",
    },
    {
      number: 2,
      title: "The Systems Mastery Framework™",
      duration: "10 min",
      icon: Target,
      description: "See connections AI will never find. Map complex systems, identify feedback loops, and find leverage points. Case Study: Why Apple succeeded where Nokia failed.",
    },
    {
      number: 3,
      title: "The Trust Acceleration Formula™",
      duration: "9 min",
      icon: Heart,
      description: "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Goldman Sachs' 3-phase relationship framework. Case Study: 50+ year client relationships.",
    },
    {
      number: 4,
      title: "The Stakeholder Influence Map",
      duration: "10 min",
      icon: Users,
      description: "Get things done with zero formal power. Map decision ecosystems, build coalitions, create reciprocity. Case Study: How I closed $8M deals at Amazon.",
    },
    {
      number: 5,
      title: "The Innovation Sprint Framework",
      duration: "11 min",
      icon: Lightbulb,
      description: "Google's 5-day framework for breakthrough ideas. Problem mapping, solution sketching, prototyping, and user testing. Case Study: How Google redesigned Gmail.",
    },
    {
      number: 6,
      title: "The Pyramid Principle",
      duration: "10 min",
      icon: MessageSquare,
      description: "McKinsey's framework for executive communication. Answer first, logic second, evidence third. The MECE principle. Case Study: $50M consulting engagement.",
    },
    {
      number: 7,
      title: "The Value Creation Framework",
      duration: "12 min",
      icon: Scale,
      description: "Harvard's framework for win-win negotiations. Focus on interests, expand the pie, develop your BATNA. Case Study: Amazon's $50M retail partnership.",
    },
    {
      number: 8,
      title: "The Probabilistic Thinking Framework",
      duration: "11 min",
      icon: Target,
      description: "How poker champions and hedge fund managers decide. Expected value, confidence intervals, pre-mortems. Case Study: How Bezos decided to launch AWS.",
    },
    {
      number: 9,
      title: "The Thought Leadership Framework",
      duration: "10 min",
      icon: Award,
      description: "Position yourself as THE expert. The positioning statement formula, content engine strategy, strategic networking. How I went from 0 to 10K followers.",
    },
    {
      number: 10,
      title: "The Career Resilience Framework",
      duration: "12 min",
      icon: Compass,
      description: "Stay valuable for the next 20 years. T-shaped skills, AI-augmented workflows, portfolio careers. Become the person AI can't replace.",
    },
  ];

  const bonusModule = {
    title: "Executive Interview Mastery",
    duration: "15 min",
    description: "The exact frameworks to ace executive-level interviews. How to answer 'Tell me about yourself,' handle case studies, and negotiate offers. Used by candidates landing $300K+ roles.",
  };

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
      question: "Who is this course for?",
      answer: "This course is for ambitious professionals, managers, executives, and entrepreneurs who want to future-proof their careers. If you're concerned about AI replacing your job, or you want to become irreplaceable in your organization, this is for you."
    },
  ];

  const testimonials = [
    {
      name: "David L.",
      location: "San Francisco, CA",
      result: "Promoted to Director",
      quote: "The stakeholder influence framework changed how I operate. Within 3 months of applying these principles, I was promoted to Director. These aren't soft skills—they're power skills.",
      rating: 5,
    },
    {
      name: "Sarah K.",
      location: "New York, NY",
      result: "$40K salary increase",
      quote: "Used the negotiation framework in my annual review. Got a $40K raise plus equity. The ROI on this course is insane.",
      rating: 5,
    },
    {
      name: "Michael T.",
      location: "Austin, TX",
      result: "Landed VP role",
      quote: "The executive communication module alone was worth 10x the price. I went from senior manager to VP in 6 months. These frameworks work.",
      rating: 5,
    },
  ];

  const benefits = [
    "10 proprietary frameworks from top companies",
    "Real case studies from Amazon, Google, McKinsey",
    "5 downloadable PDF toolkits with templates",
    "Executive Interview Mastery bonus module",
    "Lifetime access + future updates",
    "30-day money-back guarantee",
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FuturisticBackground variant="enrollment" />
      
      {/* Urgency Banner - Top */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 text-center text-sm md:text-base font-semibold">
        🔥 LAUNCH SALE: <span className="font-bold">$888 → $47</span> (95% OFF) — <span className="underline">Ends January 12th at Midnight</span>
      </div>

      {/* Social Proof Notification Popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-purple-500"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-sm">{notification.name} from {notification.location}</p>
                <p className="text-slate-500 text-xs">just enrolled in the course!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom CTA Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-slate-700 py-3 px-4"
          >
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-white font-bold">$888 Value → Just $47</p>
                <p className="text-slate-400 text-sm">100% Risk-Free Guarantee</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-right hidden sm:block">
                  <span className="text-slate-400 line-through text-sm">$197</span>
                  <span className="text-purple-400 font-bold text-xl ml-2">$47</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Become Irreplaceable — $47 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="bg-black border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16 logo-glow" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-white hover:text-purple-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/course-ai-skills.jpg')] opacity-5 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-bold">
                🎯 10 Executive Frameworks
              </span>
              <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">
                ⭐ 127+ students enrolled
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              AI-Resistant Skills:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Become Irreplaceable</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-6"
            >
              The 10 executive frameworks that AI can't replicate. Strategic thinking, emotional intelligence, and leadership skills from Amazon, Google, McKinsey, and Goldman Sachs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>10 Video Modules ($497 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Download className="w-5 h-5 text-purple-400" />
                <span>5 PDF Toolkits ($197 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-5 h-5 text-purple-400" />
                <span>Bonus: Interview Mastery ($97 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>100% Risk-Free Guarantee</span>
              </div>
            </motion.div>

            {/* PRIMARY CTA - Above the fold */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <p className="text-purple-400 text-sm mb-1 font-bold">$888 VALUE → Just $47</p>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 line-through text-xl">$197</span>
                    <span className="text-purple-400 font-bold text-4xl">$47</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm font-bold">SAVE 95%</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Processing..." : (
                    <>
                      Become Irreplaceable <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">
                100% Risk-Free: 30-day money-back guarantee. No questions asked.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-black border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">10</p>
              <p className="text-slate-400 text-sm">Executive Frameworks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">5</p>
              <p className="text-slate-400 text-sm">PDF Toolkits</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">~2hrs</p>
              <p className="text-slate-400 text-sm">Total Runtime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-purple-400">Lifetime</p>
              <p className="text-slate-400 text-sm">Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Video Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              See What You'll Learn
            </h2>
            <p className="text-slate-400 text-center mb-8 text-lg">
              Watch this quick overview
            </p>
            <div className="shadow-2xl border border-slate-700 rounded-xl overflow-hidden">
              <LazyVimeoPlayer
                videoId="1148769094"
                title="AI-Resistant Skills Course Overview"
              />
            </div>
            
            {/* CTA After Video */}
            <div className="mt-8 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Yes, I Want This — $47 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Real Results from Real Professionals
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              These frameworks are changing careers
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-slate-400 text-sm">{testimonial.location}</p>
                    <p className="text-purple-400 font-bold mt-1">{testimonial.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Curriculum */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              The 10 Frameworks
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              Each module is ~10 minutes. Complete the course in 10 days or binge it in a weekend.
            </p>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-purple-500/50 transition-all hover:bg-slate-800/70"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20 text-sm">
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-white">{module.title}</h3>
                        <span className="text-slate-400 text-sm">{module.duration}</span>
                      </div>
                      <p className="text-slate-400 text-sm">{module.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bonus Module */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/50 rounded-xl p-5 hover:border-yellow-400 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold px-3 py-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/20 text-sm">
                    BONUS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white">{bonusModule.title}</h3>
                      <span className="text-slate-400 text-sm">{bonusModule.duration}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{bonusModule.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Get All 10 Frameworks — $47 <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-slate-500 text-sm mt-3">One-time payment. Lifetime access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal / Guarantee Section */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl p-8 md:p-12">
              <Shield className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                100% Risk-Free Guarantee
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Try the entire course for 30 days. If you don't feel it was worth every penny, email us and we'll refund you immediately. No questions asked.
              </p>
              <p className="text-purple-400 font-bold text-lg">
                You have nothing to lose and a future-proof career to gain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Inside the Course
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-4"
                >
                  <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              This Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "You're worried about AI replacing your job",
                "You want to advance to executive-level positions",
                "You're a manager who wants to lead more effectively",
                "You want skills that will be valuable for 20+ years",
                "You're tired of generic 'soft skills' advice",
                "You want frameworks from the world's best companies",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Questions? Answers.
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-slate-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Urgency Box */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 inline-block">
              <p className="text-yellow-300 font-bold">
                🔥 FINAL CHANCE: $888 → $47 (95% OFF) — Sale Ends January 12th!
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Become{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Irreplaceable</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              10 executive frameworks. Real case studies. Lifetime access.
              <br />
              The skills that AI can't replicate—and companies will always pay for.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isLoading ? "Processing..." : (
                <>
                  Become Irreplaceable — $47 <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm mb-8">
              100% Risk-Free: 30-day money-back guarantee. No questions asked. • Instant access • Lifetime updates
            </p>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-slate-800 mb-16 sm:mb-0">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-4">© 2025 Million Dollar Blueprint. All rights reserved.</p>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto">
            Career Disclaimer: Results vary. The career advancement examples shown are not guarantees. Your results will depend on your effort, skills, and market conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
