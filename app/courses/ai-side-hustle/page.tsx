"use client";

import FuturisticBackground from "@/components/FuturisticBackground";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, DollarSign, Zap, ChevronDown, Star, Users, Target, Briefcase, TrendingUp, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AISideHustlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = () => {
    setIsLoading(true);
    // Redirect to Stripe payment link - will be updated with actual link
    window.location.href = 'https://buy.stripe.com/PLACEHOLDER_AI_SIDE_HUSTLE';
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
    {
      number: "BONUS",
      title: "Building Long-Term Client Relationships",
      duration: "6 min",
      icon: Gift,
      description: "The secret to recurring revenue. Keep clients for months and years. Communication strategies and handling problems gracefully.",
    },
  ];

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
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/ai-side-hustle-hero.jpg')] opacity-10 bg-cover bg-center" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              🚀 New Course — Start Earning This Week
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Start Your AI Side Hustle:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Make $1K-$3K/Month</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-300 mb-8"
            >
              The exact system to land paying clients who need AI-powered content. No coding. No tech skills. Just a laptop and a proven system you can start this weekend.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Under 1 Hour</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <span>$300-500 Per Client</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Start This Weekend</span>
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
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : (
                  <>
                    Get Instant Access — $47 <ArrowRight className="ml-2" />
                  </>
                )}
              </button>
              <div className="text-slate-400">
                <span className="line-through">$97</span>
                <span className="text-cyan-400 font-bold ml-2">52% OFF</span>
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
              <p className="text-3xl md:text-4xl font-bold text-white">$300-500</p>
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

      {/* Problem Section */}
      <section className="py-16 md:py-20 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
            >
              Other Courses Give You Ideas.{" "}
              <span className="text-cyan-400">We Give You a Business.</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ What Others Teach</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• List of 20+ vague "AI business ideas"</li>
                  <li>• Generic "use ChatGPT to write stuff"</li>
                  <li>• No actual client acquisition strategy</li>
                  <li>• Surface-level advice you can Google</li>
                  <li>• No templates, scripts, or systems</li>
                </ul>
              </div>
              
              <div className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">✅ What You Get Here</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• ONE proven system you can start today</li>
                  <li>• Exact scripts and templates to copy</li>
                  <li>• Step-by-step client acquisition playbook</li>
                  <li>• Deep insights from real freelancers</li>
                  <li>• Everything you need in under 1 hour</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
          >
            What You'll Learn
          </motion.h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            6 focused videos. Under 1 hour total. Everything you need to land your first paying client.
          </p>
          
          <div className="max-w-4xl mx-auto grid gap-4">
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">
                        Video {module.number}: {module.title}
                      </h3>
                      <span className="text-cyan-400 text-sm font-medium">{module.duration}</span>
                    </div>
                    <p className="text-slate-400">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            >
              Everything You Need to{" "}
              <span className="text-cyan-400">Start Earning</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-slate-800/30 p-4 rounded-lg"
                >
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Start Your AI Side Hustle?
            </motion.h2>
            <p className="text-xl text-slate-300 mb-8">
              For less than the cost of dinner, get the complete system to make $1K-$3K/month with AI.
            </p>
            
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? "Processing..." : (
                <>
                  Get Instant Access — $47 <ArrowRight className="ml-2" />
                </>
              )}
            </button>
            
            <p className="text-slate-400">
              <span className="line-through">$97</span>
              <span className="text-cyan-400 font-bold ml-2">52% OFF</span>
              <span className="mx-2">•</span>
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-slate-900/50 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-300">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your First $1,000 is Closer Than You Think
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Stop watching others make money with AI. Start building your own income stream today.
            </p>
            
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold shadow-2xl shadow-cyan-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : (
                <>
                  Get Instant Access — $47 <ArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
