"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MakeFirst1KPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: 'course',
          productKey: 'makeFirst1K',
          successUrl: `${window.location.origin}/welcome?course=make-first-1k-ai`,
          cancelUrl: `${window.location.origin}/courses/make-first-1k-ai?canceled=true`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const modules = [
    {
      number: 1,
      title: "Your First $200 Service",
      duration: "15 min",
      icon: DollarSign,
      description: "The exact AI service you can sell to local businesses tonight. No experience needed. I'll show you the 'AI Business Bio' offer that gets instant yes's.",
    },
    {
      number: 2,
      title: "The AI Workflow",
      duration: "20 min",
      icon: Target,
      description: "Step-by-step ChatGPT process. Research, prompt, refine, deliver. The exact prompts I use to create $200 deliverables in under an hour.",
    },
    {
      number: 3,
      title: "From $200 to $2,000",
      duration: "15 min",
      icon: Zap,
      description: "Turn one-time clients into $300/month recurring revenue. The simple upsell that transforms a side hustle into a real business.",
    },
  ];

  const faqs = [
    {
      question: "Do I need any tech experience?",
      answer: "No. If you can use Google and type, you can do this. The course shows you exactly what to click, what to type, and what to say. Zero coding, zero technical skills required."
    },
    {
      question: "How quickly can I make my first $200?",
      answer: "Some students land their first client within 48 hours. The 5-a-Day method means you're reaching out to potential clients immediately. Your first $200 could come this week."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "30-day money-back guarantee. If you don't feel the course delivered value, email us for a full refund. No questions asked."
    },
    {
      question: "Is this just another 'make money online' scam?",
      answer: "No hype, no fluff. This is a simple service business model: you help local businesses with AI, they pay you. Real work, real clients, real money. The course shows you exactly how."
    },
    {
      question: "Why is it only $47?",
      answer: "Because I want you to actually do it. A $47 course removes the excuse. If you can't invest $47 in yourself, you're not serious about making extra income. This price makes it a no-brainer."
    },
  ];

  const benefits = [
    "One simple AI service anyone can deliver",
    "The exact ChatGPT prompts that create $200 deliverables",
    "Where to find clients who will pay you tonight",
    "The email template that gets responses",
    "How to turn $200 clients into $300/month recurring",
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
            <Link href="/#courses" className="text-white hover:text-green-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/make-1k-ai-hero-v2.jpg')] opacity-5 bg-cover bg-center" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              🚀 New Course — Start Earning This Week
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Make Your First{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">$1,000</span>{" "}
              with AI
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-8"
            >
              I made my first $1,000 with AI in two weeks. Zero tech experience. This course shows you exactly how—one simple service, five clients, $1,000 in your pocket.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Under 1 Hour</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span>$200 Per Service</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-5 h-5 text-green-400" />
                <span>Start Tonight</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span>30-Day Guarantee</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-green-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : (
                  <>
                    Get Instant Access — $47 <ArrowRight className="ml-2" />
                  </>
                )}
              </button>
              <div className="text-slate-400">
                <span className="line-through">$97</span>
                <span className="text-green-400 font-bold ml-2">52% OFF</span>
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
              <p className="text-3xl md:text-4xl font-bold text-white">$200</p>
              <p className="text-slate-400 text-sm">Per Service</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">×5</p>
              <p className="text-slate-400 text-sm">Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-green-400">=</p>
              <p className="text-slate-400 text-sm">&nbsp;</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-green-400">$1,000</p>
              <p className="text-slate-400 text-sm">Your First Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-20 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What You'll Learn
            </h2>
            <p className="text-slate-400 text-center mb-12 text-lg">
              Three modules. Everything you need. Nothing you don't.
            </p>

            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all hover:bg-slate-800/70"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
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
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-black relative">
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
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              This Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "You want extra income but don't know where to start",
                "You've heard about AI but don't know how to use it",
                "You're tired of courses that don't give you real steps",
                "You want something you can start tonight, not next year",
                "You're willing to do the work if someone shows you how",
                "You want a skill that's actually in demand right now",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-black relative">
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
      <section className="py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Make Your First{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">$1,000</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              One simple service. Five clients. $1,000 in your pocket.
              <br />
              The course takes less than an hour. You could start tonight.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-green-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isLoading ? "Processing..." : (
                <>
                  Get Instant Access — $47 <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-slate-500 text-sm mb-8">
              30-day money-back guarantee • Instant access • Lifetime updates
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
      <footer className="py-8 bg-black border-t border-slate-800">
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
