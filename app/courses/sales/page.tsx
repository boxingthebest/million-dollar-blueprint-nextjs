"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp, Shield, Clock, Users, DollarSign, Zap, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

export default function SalesMasteryPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [notification, setNotification] = useState<{ name: string; location: string } | null>(null);

  // Sticky bar scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Social proof notifications
  useEffect(() => {
    const names = [
      { name: "Michael R.", location: "New York" },
      { name: "Jennifer K.", location: "California" },
      { name: "David L.", location: "Texas" },
      { name: "Amanda S.", location: "Florida" },
      { name: "Chris P.", location: "Illinois" },
      { name: "Rachel M.", location: "Georgia" },
    ];

    const showNotification = () => {
      const randomPerson = names[Math.floor(Math.random() * names.length)];
      setNotification(randomPerson);
      setTimeout(() => setNotification(null), 4000);
    };

    const initialTimeout = setTimeout(showNotification, 8000);
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const modules = [
    {
      number: 1,
      title: "The Revenue Architect's Mindset",
      duration: "8 min",
      icon: Brain,
      topics: [
        "The Jordan Belfort Straight Line System (without the fraud)",
        "Why 'selling' died in 2015 and what replaced it",
        "The 5 mental shifts of 7-figure earners at Salesforce"
      ]
    },
    {
      number: 2,
      title: "The MEDDPICC Enterprise Sales Framework",
      duration: "10 min",
      icon: Target,
      topics: [
        "Metrics, Economic Buyer, Decision Criteria, Decision Process",
        "How Salesforce uses MEDDPICC to close $1M+ deals",
        "Navigating complex B2B sales cycles"
      ]
    },
    {
      number: 3,
      title: "SPIN Selling: The Question Framework",
      duration: "9 min",
      icon: Lightbulb,
      topics: [
        "Situation, Problem, Implication, Need-Payoff questions",
        "How to uncover needs prospects don't know they have",
        "The Google '3-Layer Deep' discovery technique"
      ]
    },
    {
      number: 4,
      title: "The Challenger Sale 2.0",
      duration: "10 min",
      icon: TrendingUp,
      topics: [
        "Teach, Tailor, Take Control methodology",
        "How to challenge prospects' thinking",
        "Why solution selling is dead and insight selling won"
      ]
    },
    {
      number: 5,
      title: "Building Your Predictive Pipeline",
      duration: "9 min",
      icon: DollarSign,
      topics: [
        "The math behind a $1M quota",
        "Lead Velocity Rate (LVR): the metric that predicts growth",
        "The '3x Rule' for pipeline coverage"
      ]
    },
    {
      number: 6,
      title: "The Trusted Advisor Blueprint",
      duration: "8 min",
      icon: Heart,
      topics: [
        "How Goldman Sachs builds unshakeable client relationships",
        "Moving from vendor to strategic partner",
        "The 4 pillars of executive presence in sales"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is this course right for me if I'm not in a traditional sales role?",
      answer: "Absolutely! Whether you're a founder, consultant, freelancer, or professional who needs to influence and persuade, these frameworks apply. Everyone sells—whether it's ideas, services, or themselves in interviews."
    },
    {
      question: "How is this different from other sales courses?",
      answer: "This isn't theory from 'gurus.' These are the exact frameworks used at Salesforce, Oracle, and Goldman Sachs. Battle-tested strategies from 22+ years of closing enterprise deals."
    },
    {
      question: "What if I'm already experienced in sales?",
      answer: "Even top performers find gaps in their approach. The MEDDPICC and Challenger frameworks alone have helped seasoned reps increase their close rates by 30-50%."
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access. Once you enroll, the course is yours forever, including all future updates."
    },
    {
      question: "What's your refund policy?",
      answer: "30-day money-back guarantee. If you don't see value, email us for a full refund. No questions asked."
    }
  ];

  const testimonials = [
    {
      name: "Marcus Chen",
      role: "Enterprise Account Executive",
      company: "SaaS Company",
      result: "Closed $1.2M deal",
      text: "The MEDDPICC framework changed everything. I closed my largest deal ever within 60 days of taking this course.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "Sales Director",
      company: "Fortune 500",
      result: "147% of quota",
      text: "My team went from 80% quota attainment to 147% after implementing these strategies. Best investment we've made.",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Startup Founder",
      company: "Tech Startup",
      result: "$500K in new revenue",
      text: "As a founder, I hated 'selling.' This course reframed everything. We've added $500K in ARR since I took it.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Social Proof Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-emerald-500"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-sm">{notification.name} from {notification.location}</p>
                <p className="text-slate-500 text-xs">just enrolled in Sales Mastery!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <p className="text-sm md:text-base font-semibold relative z-10">
          🔥 LAUNCH SALE: <span className="text-yellow-300">50% OFF</span> — Ends January 12th at Midnight
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">
                  ⭐ TOP RATED
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">
                  🔥 BESTSELLER
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Sales Mastery
                <span className="block text-emerald-400">Close Like a Fortune 100 Rep</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                The exact frameworks used at <strong className="text-white">Salesforce</strong>, <strong className="text-white">Oracle</strong>, and <strong className="text-white">Goldman Sachs</strong> to close 7-figure deals. No sleazy tactics—just proven systems.
              </p>

              {/* Value Stack */}
              <div className="space-y-3 mb-8">
                {[
                  "6 comprehensive modules (54 min total)",
                  "MEDDPICC Enterprise Framework",
                  "SPIN Selling Question Templates",
                  "Challenger Sale Playbook",
                  "Pipeline Calculator Spreadsheet",
                  "Lifetime access + future updates"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Pricing Box */}
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold mb-4">
                  50% OFF — ENDS JAN 12
                </div>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-slate-500 line-through text-2xl">$495</span>
                  <span className="text-5xl font-black text-white">$247</span>
                </div>
                <p className="text-emerald-400 font-semibold">Save $248 Today</p>
              </div>

              <a
                href="https://buy.stripe.com/6oU8wO3L31zV4hKe0c08g0i"
                className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 mb-4"
              >
                Get Instant Access — $247
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </a>

              <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Income Calculator Bar */}
      <section className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 py-8 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">$50K</div>
              <div className="text-emerald-400 text-sm">Avg Deal Size Increase</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">147%</div>
              <div className="text-emerald-400 text-sm">Quota Attainment</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">30%</div>
              <div className="text-emerald-400 text-sm">Higher Close Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See How It Works
            </h2>
            <p className="text-slate-400 text-lg">
              Watch how these frameworks can transform your sales career
            </p>
          </div>
          
          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <LazyVimeoPlayer videoId="1148769094" />
          </div>

          <div className="text-center mt-8">
            <a
              href="https://buy.stripe.com/6oU8wO3L31zV4hKe0c08g0i"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Instant Access — $247
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Results from Real Sales Professionals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  <div className="text-emerald-400 font-semibold mt-2">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Course Curriculum
            </h2>
            <p className="text-slate-400">6 modules • 54 minutes of focused content</p>
          </div>

          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.number} className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <module.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Module {module.number}: {module.title}</div>
                      <div className="text-slate-400 text-sm">{module.duration}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openModule === module.number && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-700"
                    >
                      <div className="p-6 space-y-3">
                        {module.topics.map((topic, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-2xl p-12">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              100% Risk-Free Guarantee
            </h2>
            <p className="text-slate-300 text-lg mb-6">
              Try Sales Mastery for 30 days. If you don't see improvement in your sales approach, email us for a full refund. No questions asked. We're confident you'll love it.
            </p>
            <div className="text-emerald-400 font-semibold">
              30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* This Is For You If Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            This Course Is For You If...
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "You want to close bigger deals with more confidence",
              "You're tired of 'winging it' and want proven frameworks",
              "You want to move from transactional to strategic selling",
              "You're a founder or consultant who needs to sell",
              "You want to hit (and exceed) your quota consistently",
              "You're ready to invest in your sales career"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-700"
                    >
                      <div className="p-6">
                        <p className="text-slate-300">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900/30 to-teal-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-red-500/20 text-red-400 px-6 py-2 rounded-full text-sm font-bold mb-6">
            ⏰ SALE ENDS JANUARY 12TH AT MIDNIGHT
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Close Like a Pro?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of sales professionals who've transformed their careers with these frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <span className="text-slate-500 line-through text-2xl">$495</span>
            <span className="text-5xl font-black text-white">$247</span>
            <span className="text-emerald-400 font-bold">Save $248</span>
          </div>
          <a
            href="https://buy.stripe.com/6oU8wO3L31zV4hKe0c08g0i"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
          >
            Get Instant Access Now
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2026 Million Dollar Blueprint. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-sm">Terms</Link>
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm">Privacy</Link>
            <Link href="/refund" className="text-slate-500 hover:text-slate-300 text-sm">Refund Policy</Link>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 py-4 px-4 z-40"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="hidden md:block">
                <div className="text-white font-bold">Sales Mastery</div>
                <div className="text-slate-400 text-sm">
                  <span className="line-through">$495</span>
                  <span className="text-emerald-400 ml-2 font-bold">$247</span>
                </div>
              </div>
              <a
                href="https://buy.stripe.com/6oU8wO3L31zV4hKe0c08g0i"
                className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold text-center transition-all duration-300"
              >
                Get Instant Access — $247
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
