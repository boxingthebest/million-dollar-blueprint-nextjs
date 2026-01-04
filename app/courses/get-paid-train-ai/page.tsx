"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target, Shield, TrendingUp, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GetPaidTrainAIPage() {
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
      { name: "Sarah M.", location: "California" },
      { name: "James T.", location: "Texas" },
      { name: "Emily R.", location: "New York" },
      { name: "Michael K.", location: "Florida" },
      { name: "Jessica L.", location: "Illinois" },
      { name: "David P.", location: "Arizona" },
      { name: "Amanda S.", location: "Colorado" },
      { name: "Chris W.", location: "Georgia" },
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
    // TODO: Replace with actual Stripe checkout link
    window.location.href = 'https://buy.stripe.com/14A00i81j6Uf29C3ly08g0v';
  };

  const modules = [
    {
      number: 1,
      title: "The AI Training Opportunity",
      duration: "6 min",
      icon: Target,
      description: "The multi-billion dollar industry hiding in plain sight. Why companies like Google, Apple, and Meta are desperate for human trainers—and what they're willing to pay.",
    },
    {
      number: 2,
      title: "The Platforms",
      duration: "8 min",
      icon: Briefcase,
      description: "A deep dive into the top 5 platforms where these jobs live: Scale AI, Outlier, micro1, and more. How to sign up, what to expect, and how to position yourself for success.",
    },
    {
      number: 3,
      title: "Passing the Tests (The Game-Changer)",
      duration: "10 min",
      icon: Shield,
      description: "This is why most people fail—and why you won't. Our proven framework for acing the qualification tests on your first try. Real examples, common traps, and the exact strategies that got our students accepted when others couldn't.",
    },
    {
      number: 4,
      title: "Maximizing Your Rate",
      duration: "8 min",
      icon: TrendingUp,
      description: "Not all tasks pay the same. Learn the high-value skills that command $100+/hour: prompt engineering, model red-teaming, and specialized annotation.",
    },
    {
      number: 5,
      title: "Scaling to $5K+/Month",
      duration: "8 min",
      icon: DollarSign,
      description: "Turn this into a consistent income stream. How to build your reputation, get invited to private projects, and manage your time to maximize earnings.",
    },
  ];

  const bonusModule = {
    title: "The 'AI Agent' Method",
    duration: "6 min",
    description: "Use AI to do your AI training work. Learn how to leverage tools like ChatGPT to double your output without working more hours. This is the secret weapon of top earners.",
  };

  const faqs = [
    {
      question: "Do I need any tech experience?",
      answer: "No. If you can browse the internet and follow instructions, you can do this. Most AI training tasks involve reading, writing, and critical thinking—not coding."
    },
    {
      question: "How much can I realistically earn in my first month?",
      answer: "It depends on the time you invest. Most students land their first paid gig within 1-2 weeks. Working 10-15 hours/week, $1,000-$2,000 in your first month is realistic."
    },
    {
      question: "What if I fail the qualification tests?",
      answer: "That's exactly why Module 3 exists. We give you the exact framework to pass on your first try. And if you don't, you can retake most tests after a waiting period."
    },
    {
      question: "Is this a long-term opportunity?",
      answer: "Yes. AI companies will need human trainers for years to come. This isn't a fad—it's a fundamental part of how AI is built."
    },
    {
      question: "Why is it only $47?",
      answer: "Because we want this to be a no-brainer. We believe this course will change your financial future, and we want as many people as possible to have access to it. After this sale, the price goes back to $197."
    },
  ];

  const testimonials = [
    {
      name: "Sarah P.",
      location: "Dallas, TX",
      result: "$250 in first weekend",
      quote: "I thought you needed to be a coder to work in AI. This course proved me wrong. I passed the assessment for Outlier and made my first $250 in a weekend.",
      rating: 5,
    },
    {
      name: "Mike R.",
      location: "Chicago, IL",
      result: "Accepted to 2 platforms",
      quote: "The module on 'Passing the Tests' was a game-changer. I failed my first attempt, but after this course, I got accepted to two different platforms.",
      rating: 5,
    },
    {
      name: "Jessica L.",
      location: "Miami, FL",
      result: "$3,000/month on track",
      quote: "This is the most legitimate side hustle I've found. The work is actually interesting, and the pay is as good as they say. I'm already on track for $3,000 this month.",
      rating: 5,
    },
  ];

  const benefits = [
    "The exact platforms to sign up for today",
    "Step-by-step guide to passing the qualification tests",
    "The skills that command the highest rates ($100+/hr)",
    "How to spot and avoid low-paying tasks",
    "The 'AI Agent' method for automating your work",
    "Real examples from students earning $3K-$5K/month",
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FuturisticBackground variant="enrollment" />
      
      {/* Urgency Banner - Top */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 text-center text-sm md:text-base font-semibold">
        🔥 $641 VALUE → Just $47 (93% OFF) — <span className="underline">Sale Ends January 12th</span>
      </div>

      {/* Social Proof Notification Popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-green-500"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
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
                <p className="text-white font-bold">$641 Value → Just $47</p>
                <p className="text-slate-400 text-sm">100% Risk-Free Guarantee</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-right hidden sm:block">
                  <span className="text-slate-400 line-through text-sm">$197</span>
                  <span className="text-green-400 font-bold text-xl ml-2">$47</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-orange-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Earning — $47 <ArrowRight className="w-4 h-4" />
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
            <Link href="/#courses" className="text-white hover:text-green-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/get-paid-train-ai-hero.jpg')] opacity-10 bg-cover bg-center" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-bold">
                🔥 LAUNCH SALE
              </span>
              <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">
                ⭐ Limited Time Offer
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Get Paid to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Train AI</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-6"
            >
              700,000+ people have signed up for AI training platforms. Most fail the assessments and never get paid. This course shows you exactly how to pass the tests, get accepted, and start earning $50-$200/hour. No tech skills required.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>5 Video Modules ($297 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <DollarSign className="w-5 h-5 text-orange-400" />
                <span>Assessment Frameworks ($197 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-5 h-5 text-orange-400" />
                <span>AI Agent Bonus ($147 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-5 h-5 text-orange-400" />
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
                  <p className="text-orange-400 text-sm mb-1 font-bold">🔥 LAUNCH SALE</p>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 line-through text-xl">$197</span>
                    <span className="text-green-400 font-bold text-4xl">$47</span>
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm font-bold">SAVE 76%</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Processing..." : (
                    <>
                      Start Earning This Week <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">
                ✓ Instant access • ✓ 30-day money-back guarantee • ✓ Lifetime updates
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Math Section */}
      <section className="py-8 bg-black border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">$75</p>
              <p className="text-slate-400 text-sm">Per Hour</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">×15</p>
              <p className="text-slate-400 text-sm">Hours/Week</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-orange-400">=</p>
              <p className="text-slate-400 text-sm">&nbsp;</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-orange-400">$4,500</p>
              <p className="text-slate-400 text-sm">Per Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Forbes/CNBC Quote Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              The Opportunity Is Real. Getting In Is the Hard Part.
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xl text-slate-300 italic mb-4">
                  "There's a hidden job market in AI... companies are paying $50 to $200 an hour for people to train their models."
                </p>
                <p className="text-slate-400 text-sm">— As reported by Forbes</p>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xl text-slate-300 italic mb-4">
                  "People with no tech background are making six figures working from home as AI trainers."
                </p>
                <p className="text-slate-400 text-sm">— As reported by CNBC</p>
              </div>
            </div>
            
            <p className="text-center text-orange-400 font-bold text-xl mt-8">
              This course shows you how to pass the assessments and actually get paid.
            </p>
          </div>
        </div>
      </section>

      {/* Promo Video Section */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              See How It Works
            </h2>
            <p className="text-slate-400 text-center mb-8 text-lg">
              Watch this 60-second overview
            </p>
            <div className="shadow-2xl border border-slate-700 rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
              {/* TODO: Replace with actual video */}
              <p className="text-slate-500">Video Coming Soon</p>
            </div>
            
            {/* CTA After Video */}
            <div className="mt-8 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Yes, I Want This — $47 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              From Zero to AI Trainer in Weeks
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              People just like you are getting paid to train AI
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
                    <p className="text-orange-400 font-bold mt-1">{testimonial.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Your Complete Roadmap to Getting Accepted & Paid
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              5 modules + bonus. Under 2 hours. The exact system to pass assessments and start earning.
            </p>

            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:bg-slate-800/70"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                        <span className="text-slate-400 text-sm">{module.duration}</span>
                      </div>
                      <p className="text-slate-300">{module.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bonus Module */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/50 rounded-xl p-6 hover:border-yellow-400 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold px-3 py-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/20 text-sm">
                    BONUS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{bonusModule.title}</h3>
                      <span className="text-slate-400 text-sm">{bonusModule.duration}</span>
                    </div>
                    <p className="text-slate-300">{bonusModule.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Get All 6 Modules — $47 <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-slate-500 text-sm mt-3">One-time payment. Lifetime access. Sale ends January 12th.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal / Guarantee Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 md:p-12">
              <Shield className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                100% Risk-Free Guarantee
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Try the entire course for 30 days. If you don't land your first paid AI training gig, email us and we'll refund you immediately. No questions asked.
              </p>
              <p className="text-orange-400 font-bold text-lg">
                You have nothing to lose and $4,500/month to gain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-black relative">
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
                  <Check className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              This Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "You want a flexible, remote income stream",
                "You're looking for a way into the AI industry without coding",
                "You're a student, stay-at-home parent, or looking for extra income",
                "You're tired of 'make money online' schemes that don't deliver",
                "You're ready to learn a real, in-demand skill",
                "You want to capitalize on the AI boom before it's too late",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-black relative">
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
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Urgency Box */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-8 inline-block">
              <p className="text-orange-300 font-bold">
                🔥 $641 VALUE → Just $47 (93% OFF) — Ends January 12th!
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Paid to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Train AI</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              This is your chance to get in on the ground floor of a booming industry.
              <br />
              The course takes under 2 hours. You could start earning this week.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isLoading ? "Processing..." : (
                <>
                  Start Earning This Week — $47 <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm mb-8">
              100% Risk-Free: Complete the course. If you don't land your first gig, get every penny back.
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
          <p className="mb-4">© 2026 Million Dollar Blueprint. All rights reserved.</p>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl mx-auto">
            Earnings Disclaimer: Results vary. The income examples shown are not guarantees of income. Your results will depend on your effort, skills, and market conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
