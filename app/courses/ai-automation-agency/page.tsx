"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target, Shield, TrendingUp, Briefcase, Building, Rocket, Award, Globe, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AIAutomationAgencyPage() {
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
      { name: "Marcus T.", location: "California" },
      { name: "Jennifer K.", location: "Texas" },
      { name: "David R.", location: "New York" },
      { name: "Rachel M.", location: "Florida" },
      { name: "Kevin L.", location: "Illinois" },
      { name: "Stephanie P.", location: "Arizona" },
      { name: "Brandon S.", location: "Colorado" },
      { name: "Nicole W.", location: "Georgia" },
    ];

    const showNotification = () => {
      const randomPerson = names[Math.floor(Math.random() * names.length)];
      setNotification(randomPerson);
      setTimeout(() => setNotification(null), 4000);
    };

    const initialTimeout = setTimeout(showNotification, 15000);
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
    // Stripe checkout link for $297
    window.location.href = 'https://buy.stripe.com/YOUR_STRIPE_LINK_HERE';
  };

  const modules = [
    {
      number: 1,
      title: "The Agency Opportunity",
      duration: "8 min",
      icon: Target,
      description: "Why AI automation agencies are the fastest-growing business model in 2025. The $47B market opportunity and why businesses are desperate to pay premium prices for AI solutions.",
    },
    {
      number: 2,
      title: "The 5 High-Ticket AI Services",
      duration: "12 min",
      icon: Layers,
      description: "The exact 5 AI automation services that command $2,000-$10,000+ per project. Why these services sell themselves and how to position them for maximum profit.",
    },
    {
      number: 3,
      title: "The Agency Positioning System™",
      duration: "10 min",
      icon: Award,
      description: "How to position yourself as the go-to AI automation expert in your niche. The Authority Stack™ that makes clients chase YOU instead of the other way around.",
    },
    {
      number: 4,
      title: "The $10K Client Acquisition Engine™",
      duration: "15 min",
      icon: Users,
      description: "The exact outreach scripts, proposal templates, and closing techniques that land $5K-$10K+ clients. Includes the 'Dream 100' method for targeting high-value prospects.",
    },
    {
      number: 5,
      title: "The Premium Pricing Framework",
      duration: "10 min",
      icon: DollarSign,
      description: "How to confidently charge $3,000-$10,000+ per project. The value-based pricing model that eliminates price objections and positions you as premium.",
    },
    {
      number: 6,
      title: "The Delivery & Fulfillment System",
      duration: "12 min",
      icon: Rocket,
      description: "How to deliver world-class results using AI tools—even if you're not technical. The exact workflows, templates, and SOPs used by 6-figure agencies.",
    },
    {
      number: 7,
      title: "Scaling to $20K+/Month",
      duration: "10 min",
      icon: TrendingUp,
      description: "The roadmap from solo operator to agency owner. How to build recurring revenue, hire contractors, and scale to $20K-$50K/month and beyond.",
    },
  ];

  const bonusModules = [
    {
      title: "The AI Tool Stack",
      duration: "8 min",
      description: "The exact AI tools and software stack used by top agencies. Setup guides, best practices, and insider tips to maximize efficiency.",
    },
    {
      title: "Client Onboarding Templates",
      duration: "6 min",
      description: "Done-for-you contracts, onboarding documents, and project management templates. Just fill in the blanks and look like a pro.",
    },
    {
      title: "The Retainer Conversion Script",
      duration: "5 min",
      description: "How to convert one-time projects into $2K-$5K/month retainer clients. The exact script that creates predictable recurring revenue.",
    },
  ];

  const faqs = [
    {
      question: "Do I need technical skills or coding experience?",
      answer: "No. The AI tools we use are no-code or low-code. If you can use a computer and follow instructions, you can deliver these services. We show you exactly which tools to use and how to use them."
    },
    {
      question: "How is this different from the AI Income Accelerator?",
      answer: "The AI Income Accelerator teaches you to land your first AI clients and build a side income. This course takes you to the next level—building a full agency that commands premium prices ($5K-$10K+ per project) and scales to $20K+/month."
    },
    {
      question: "How quickly can I land my first high-ticket client?",
      answer: "Most students land their first $2K+ client within 30-60 days of implementing the system. The Client Acquisition Engine gives you the exact scripts and templates to start outreach immediately."
    },
    {
      question: "What if I already have a business or job?",
      answer: "This is designed to work alongside your current situation. Many students start part-time (5-10 hours/week) and transition to full-time once they hit $10K/month. The systems are built for efficiency."
    },
    {
      question: "What kind of support is included?",
      answer: "You get lifetime access to all course materials, templates, and future updates. Plus access to our private community where you can ask questions, share wins, and network with other agency owners."
    },
    {
      question: "Why is it priced at $297?",
      answer: "Because we want serious action-takers, not tire-kickers. This course contains the exact playbook that's helped students build $10K-$30K/month agencies. The ROI from just ONE client pays for the course 10x over."
    },
  ];

  const testimonials = [
    {
      name: "Marcus T.",
      location: "San Francisco, CA",
      result: "$8,500 first month",
      quote: "I was skeptical at first, but the Client Acquisition Engine is legit. I landed a $4,500 project in week 3 and another $4,000 project by the end of the month. This system works.",
      rating: 5,
    },
    {
      name: "Jennifer K.",
      location: "Austin, TX",
      result: "$12K/month in 90 days",
      quote: "I went from charging $500 for freelance work to $5,000+ per project. The positioning and pricing frameworks completely changed how clients see me. Now I have a waitlist.",
      rating: 5,
    },
    {
      name: "David R.",
      location: "Miami, FL",
      result: "Quit 9-5 in 4 months",
      quote: "The retainer conversion script alone was worth 10x the price. I now have 4 clients on $3K/month retainers. That's $12K/month recurring. I quit my job last month.",
      rating: 5,
    },
  ];

  const benefits = [
    "The 5 AI services that command $2K-$10K+ per project",
    "Done-for-you outreach scripts and proposal templates",
    "The Authority Stack™ positioning system",
    "Premium pricing frameworks (no more racing to the bottom)",
    "Client onboarding and delivery SOPs",
    "The Retainer Conversion Script for recurring revenue",
    "Access to private agency owner community",
    "Lifetime access + all future updates",
  ];

  const valueStack = [
    { item: "7 Core Training Modules", value: "$997" },
    { item: "3 Bonus Modules", value: "$297" },
    { item: "Done-For-You Templates & Scripts", value: "$497" },
    { item: "Client Acquisition Swipe Files", value: "$297" },
    { item: "Private Community Access", value: "$197" },
    { item: "Lifetime Updates", value: "$297" },
  ];

  const totalValue = 2582;

  return (
    <div className="min-h-screen bg-slate-950 relative">
      <FuturisticBackground variant="enrollment" />
      
      {/* Urgency Banner - Top */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 text-center text-sm md:text-base font-semibold">
        🚀 $2,582 VALUE → Just $297 (88% OFF) — <span className="underline">Limited Time Launch Price</span>
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
                <p className="text-slate-500 text-xs">just enrolled in the Agency Blueprint!</p>
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
                <p className="text-white font-bold">$2,582 Value → Just $297</p>
                <p className="text-slate-400 text-sm">30-Day Money-Back Guarantee</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-right hidden sm:block">
                  <span className="text-slate-400 line-through text-sm">$997</span>
                  <span className="text-purple-400 font-bold text-xl ml-2">$297</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-purple-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Build Your Agency — $297 <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Building className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Advanced Training • For Serious Entrepreneurs</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Build a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                $20K/Month
              </span>{" "}
              AI Automation Agency
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-4"
            >
              The Complete System to Land $5K-$10K+ Clients and Scale to Six Figures
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400 mb-8"
            >
              No coding required. No prior experience needed. Just follow the system.
            </motion.p>

            {/* Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 mb-8 aspect-video bg-slate-900 border border-slate-800"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                  <p className="text-slate-400">Video Coming Soon</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleCheckout}
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 mb-4"
              >
                Get The Agency Blueprint — $297 <ArrowRight className="ml-2 w-6 h-6" />
              </button>
              <p className="text-slate-500 text-sm">
                One-time payment. Lifetime access. 30-day money-back guarantee.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-8 text-slate-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>500+ Agency Owners</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              You've Learned AI Skills...{" "}
              <span className="text-slate-400">Now What?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-300">
              <p>
                You've taken courses. You've learned the tools. Maybe you've even landed a few small clients.
              </p>
              <p>
                But you're stuck in the <span className="text-purple-400 font-semibold">freelancer trap</span>—trading hours for dollars, competing on price, and wondering if this will ever become a real business.
              </p>
              <p>
                Meanwhile, you see others building <span className="text-white font-semibold">$20K, $30K, even $50K/month agencies</span>... and you wonder what they know that you don't.
              </p>
              <p className="text-white font-semibold text-xl pt-4">
                The difference? They have a SYSTEM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-900 to-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Introducing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                The AI Automation Agency Blueprint™
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              The complete playbook to build, launch, and scale a premium AI automation agency—even if you're starting from scratch.
            </p>

            {/* Key Differentiators */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Premium Pricing</h3>
                <p className="text-slate-400">Charge $5K-$10K+ per project instead of $500. Position yourself as premium, not a commodity.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Client Acquisition</h3>
                <p className="text-slate-400">Done-for-you scripts and templates that land high-ticket clients on autopilot.</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scalable Systems</h3>
                <p className="text-slate-400">Build recurring revenue with retainers and scale beyond trading time for money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Real Results from Real Agency Owners
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-slate-800 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-slate-500 text-sm">{testimonial.location}</p>
                    <p className="text-purple-400 font-bold mt-1">{testimonial.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section className="py-12 md:py-16 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What's Inside The Blueprint
              </h2>
              <p className="text-xl text-slate-400">
                7 Core Modules + 3 Bonus Modules = Complete Agency System
              </p>
            </div>

            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
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

              {/* Bonus Modules */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  <span className="text-yellow-400">BONUS:</span> 3 Additional Modules
                </h3>
                {bonusModules.map((bonus, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/50 rounded-xl p-6 hover:border-yellow-400 transition-all mb-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold px-3 py-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/20 text-sm">
                        BONUS
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{bonus.title}</h3>
                          <span className="text-slate-400 text-sm">{bonus.duration}</span>
                        </div>
                        <p className="text-slate-300">{bonus.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Get All 10 Modules — $297 <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-slate-500 text-sm mt-3">One-time payment. Lifetime access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-900 to-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Everything You're Getting Today
            </h2>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="space-y-4 mb-8">
                {valueStack.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-400" />
                      <span className="text-white">{item.item}</span>
                    </div>
                    <span className="text-slate-400">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-white">Total Value:</span>
                  <span className="text-2xl font-bold text-slate-400 line-through">${totalValue}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold text-white">Your Price Today:</span>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">$297</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-4 rounded-lg text-lg font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get Instant Access — $297 <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal / Guarantee Section */}
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl p-8 md:p-12">
              <Shield className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                30-Day "Build Your Agency" Guarantee
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Go through the entire course. Implement the systems. If you don't feel 100% confident you can build a profitable AI automation agency, email us within 30 days and we'll refund every penny. No questions asked.
              </p>
              <p className="text-purple-400 font-bold text-lg">
                You have nothing to lose and a $20K/month agency to gain.
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
              What You'll Walk Away With
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
      <section className="py-12 md:py-16 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              This Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "You want to build a real business, not just a side gig",
                "You're ready to charge premium prices for your AI skills",
                "You want predictable, recurring revenue (not feast or famine)",
                "You're tired of competing on price with other freelancers",
                "You want systems that scale beyond trading time for money",
                "You're ready to invest in yourself and take action",
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
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Urgency Box */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-8 inline-block">
              <p className="text-purple-300 font-bold">
                🚀 $2,582 VALUE → Just $297 (88% OFF) — Limited Time Launch Price
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">$20K/Month Agency</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Stop trading hours for dollars. Start building a real business.
              <br />
              The blueprint is here. The only question is: are you ready?
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isLoading ? "Processing..." : (
                <>
                  Get The Agency Blueprint — $297 <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm mb-8">
              30-Day Money-Back Guarantee. Zero risk. Unlimited upside.
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
