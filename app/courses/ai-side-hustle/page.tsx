"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target, Shield, TrendingUp, Briefcase, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AISideHustlePage() {
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
      { name: "Rachel M.", location: "California" },
      { name: "Kevin T.", location: "Texas" },
      { name: "Lisa R.", location: "New York" },
      { name: "Brandon K.", location: "Florida" },
      { name: "Stephanie L.", location: "Illinois" },
      { name: "Derek P.", location: "Arizona" },
      { name: "Nicole S.", location: "Colorado" },
      { name: "Tyler W.", location: "Georgia" },
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
    window.location.href = 'https://buy.stripe.com/7sYfZgftLguPcOg1dq08g0u';
  };

  const modules = [
    {
      number: 1,
      title: "The AI Side Hustle Opportunity",
      duration: "7 min",
      icon: Target,
      description: "The hidden market of millions of businesses that need AI help. Why this is the perfect time to start. Real income expectations.",
    },
    {
      number: 2,
      title: "5 AI Services That Sell Right Now",
      duration: "8 min",
      icon: Briefcase,
      description: "Social media content, blog posts, video scripts, email sequences, presentations. Which one to start with based on your skills.",
    },
    {
      number: 3,
      title: "Setting Up Your Freelance Profile",
      duration: "8 min",
      icon: Users,
      description: "Step-by-step Fiverr/Upwork setup. The exact profile template that converts. How to create samples with zero clients.",
    },
    {
      number: 4,
      title: "Pricing Your Services for Profit",
      duration: "7 min",
      icon: DollarSign,
      description: "The 3-tier pricing framework. Real numbers that work. Psychology of pricing and when to raise rates.",
    },
    {
      number: 5,
      title: "Landing Your First 3 Clients",
      duration: "9 min",
      icon: Star,
      description: "The Fiverr flywheel. Local business outreach with exact scripts. Leveraging your network. Copy-paste templates.",
    },
    {
      number: 6,
      title: "Scaling to $3K/Month",
      duration: "8 min",
      icon: TrendingUp,
      description: "Client retention strategies. Systems that save time. When to raise prices. Building a real business.",
    },
  ];

  const bonusModule = {
    title: "Building Long-Term Client Relationships",
    duration: "6 min",
    description: "The secret to recurring revenue. Keep clients for months and years. Communication strategies and handling problems gracefully.",
  };

  const faqs = [
    {
      question: "Do I need any tech experience?",
      answer: "No. If you can use ChatGPT and type, you can do this. The course shows you exactly what tools to use, what to say to clients, and how to deliver. Zero coding required."
    },
    {
      question: "How quickly can I make my first money?",
      answer: "Some students land their first client within a week using the Fiverr flywheel method. The local business outreach strategy can work even faster if you're willing to send messages. Your first $300-500 could come within 2 weeks."
    },
    {
      question: "Is $1K-$3K/month realistic?",
      answer: "Yes, and here's the math: A basic social media content package sells for $300-500. Land 3-6 clients, deliver monthly, and you're at $1K-$3K. This is a proven model—thousands of freelancers are doing it right now."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "30-day money-back guarantee. If you don't feel the course delivered value, email us for a full refund. No questions asked."
    },
    {
      question: "How is this different from other courses?",
      answer: "Other courses give you a list of ideas. We give you a business in a box—the exact system, scripts, and templates to land your first paying client this week. Deep insights, not surface-level fluff."
    },
  ];

  const testimonials = [
    {
      name: "Rachel K.",
      location: "Denver, CO",
      result: "$1,200 in first month",
      quote: "I was skeptical about freelancing, but the Fiverr flywheel method actually works. Got my first 3 clients in 10 days. Now I have 5 monthly retainers.",
      rating: 5,
    },
    {
      name: "Marcus J.",
      location: "Atlanta, GA",
      result: "$2,800/month recurring",
      quote: "The outreach scripts are gold. I landed a $500/month client on my second day. Now I'm at $2,800/month with just 6 clients.",
      rating: 5,
    },
    {
      name: "Emily T.",
      location: "Phoenix, AZ",
      result: "Quit my 9-5 in 3 months",
      quote: "Started as a side hustle, now it's my full-time income. The pricing framework helped me charge what I'm worth. Best investment I've made.",
      rating: 5,
    },
  ];

  const benefits = [
    "The exact 5 AI services clients pay for right now",
    "Copy-paste profile templates for Fiverr & Upwork",
    "Word-for-word outreach scripts that get responses",
    "The 3-tier pricing framework that maximizes income",
    "Client retention strategies for recurring revenue",
    "Systems to deliver faster and earn more per hour",
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FuturisticBackground variant="enrollment" />
      
      {/* Urgency Banner - Top */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-4 text-center text-sm md:text-base font-semibold">
        🔥 LAUNCH SALE: <span className="font-bold">$641 → $47</span> (93% OFF) — <span className="underline">Ends January 12th at Midnight</span>
      </div>

      {/* Social Proof Notification Popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-cyan-500"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-cyan-600" />
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
                  <span className="text-cyan-400 font-bold text-xl ml-2">$47</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Your Side Hustle — $47 <ArrowRight className="w-4 h-4" />
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
            <Link href="/#courses" className="text-white hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/ai-side-hustle-hero.jpg')] opacity-5 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold">
                🚀 New Course — Start Earning This Week
              </span>
              <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">
                ⭐ 89+ students enrolled
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Start Your AI Side Hustle:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">$1K-$3K/Month</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-6"
            >
              The exact system to land paying clients who need AI-powered content. No coding. No tech skills. Just a laptop and a proven system you can start this weekend.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>7 Video Modules ($397 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <span>Outreach Scripts ($147 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Profile Templates ($97 value)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-5 h-5 text-cyan-400" />
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
                  <p className="text-cyan-400 text-sm mb-1 font-bold">$641 VALUE → Just $47</p>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 line-through text-xl">$197</span>
                    <span className="text-cyan-400 font-bold text-4xl">$47</span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-sm font-bold">SAVE 93%</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? "Processing..." : (
                    <>
                      Start Your Side Hustle <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-slate-500 text-sm mt-4">
                100% Risk-Free: If you don't land your first client, get every penny back.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Income Calculator */}
      <section className="py-8 bg-black border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">$500</p>
              <p className="text-slate-400 text-sm">Per Client/Month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">×6</p>
              <p className="text-slate-400 text-sm">Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">=</p>
              <p className="text-slate-400 text-sm">&nbsp;</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-cyan-400">$3,000</p>
              <p className="text-slate-400 text-sm">Per Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Video Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              See How It Works
            </h2>
            <p className="text-slate-400 text-center mb-8 text-lg">
              Watch this quick overview
            </p>
            <div className="shadow-2xl border border-slate-700 rounded-xl overflow-hidden">
              <LazyVimeoPlayer
                videoId="1148769094"
                title="AI Side Hustle Course Overview"
              />
            </div>
            
            {/* CTA After Video */}
            <div className="mt-8 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
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
              Real Results from Real Students
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              People just like you are building AI side hustles
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
                    <p className="text-cyan-400 font-bold mt-1">{testimonial.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What You'll Learn
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              7 modules + bonus. Under 1 hour. Everything you need to land your first paying client.
            </p>

            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:bg-slate-800/70"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
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
                transition={{ delay: 0.6 }}
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
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Get All 7 Modules — $47 <ArrowRight className="w-5 h-5" />
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
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12">
              <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                100% Risk-Free Guarantee
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Try the entire course for 30 days. If you don't feel it was worth every penny, email us and we'll refund you immediately. No questions asked.
              </p>
              <p className="text-cyan-400 font-bold text-lg">
                You have nothing to lose and $3,000/month to gain.
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
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
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
                "You want a side income but don't know where to start",
                "You've tried freelancing but couldn't land clients",
                "You're curious about AI but don't know how to monetize it",
                "You want something you can start this weekend",
                "You're tired of courses that don't give real results",
                "You want a skill that's in demand right now",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-cyan-400" />
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
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Urgency Box */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8 inline-block">
              <p className="text-yellow-300 font-bold">
                🔥 FINAL CHANCE: $641 → $47 (93% OFF) — Sale Ends January 12th!
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI Side Hustle</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              One proven system. Six clients. $3,000/month.
              <br />
              The course takes under an hour. You could land your first client this week.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isLoading ? "Processing..." : (
                <>
                  Start Your Side Hustle — $47 <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm mb-8">
              100% Risk-Free: Complete all modules. No client in 30 days? Full refund. • Instant access • Lifetime updates
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
            Earnings Disclaimer: Results vary. The income examples shown are not guarantees of income. Your results will depend on your effort, skills, and market conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
