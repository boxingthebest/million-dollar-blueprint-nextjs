"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Crown, Users, Shield, Clock, Zap, Award, CheckCircle2, TrendingUp, DollarSign, PiggyBank, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

export default function WealthPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [notification, setNotification] = useState<{ name: string; location: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const names = [
      { name: "Richard M.", location: "San Francisco" },
      { name: "Catherine L.", location: "New York" },
      { name: "Andrew K.", location: "Chicago" },
      { name: "Victoria S.", location: "Dallas" },
      { name: "Jonathan R.", location: "Seattle" },
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
    { number: 1, title: "Wealth Building Foundations", duration: "10 min", icon: DollarSign, topics: ["The wealth equation explained", "Income vs. wealth mindset", "Setting your financial targets"] },
    { number: 2, title: "Investment Fundamentals", duration: "12 min", icon: TrendingUp, topics: ["Asset classes explained", "Risk vs. reward framework", "Building your first portfolio"] },
    { number: 3, title: "Tax Optimization Strategies", duration: "11 min", icon: Landmark, topics: ["Tax-advantaged accounts", "Legal tax reduction strategies", "Working with tax professionals"] },
    { number: 4, title: "Multiple Income Streams", duration: "10 min", icon: PiggyBank, topics: ["Active vs. passive income", "Building income diversification", "Scaling your earning potential"] },
    { number: 5, title: "Real Estate Basics", duration: "9 min", icon: Landmark, topics: ["Real estate as an asset class", "Rental property fundamentals", "REITs and alternatives"] },
    { number: 6, title: "Long-Term Wealth Protection", duration: "8 min", icon: Shield, topics: ["Asset protection strategies", "Estate planning basics", "Generational wealth transfer"] }
  ];

  const faqs = [
    { question: "Do I need a lot of money to start?", answer: "No! This course teaches principles that work whether you have $100 or $100,000 to invest. The strategies scale with your income." },
    { question: "Is this financial advice?", answer: "This is financial education, not personalized financial advice. We teach frameworks and principles. Always consult a licensed financial advisor for personal decisions." },
    { question: "How long do I have access?", answer: "Lifetime access. Once you enroll, the course is yours forever, including all future updates." },
    { question: "What's your refund policy?", answer: "30-day money-back guarantee. If you don't see value, email us for a full refund. No questions asked." },
    { question: "Will this work outside the US?", answer: "The core wealth-building principles are universal. Tax strategies are US-focused, but the investment and income frameworks work globally." }
  ];

  const testimonials = [
    { name: "Daniel Foster", role: "Software Engineer", company: "Tech Company", result: "$50K invested in Year 1", text: "Finally understood how to actually build wealth, not just earn income. Invested more in my first year than the previous 5 combined.", rating: 5 },
    { name: "Laura Mitchell", role: "Marketing Director", company: "Agency", result: "3 income streams", text: "Built 3 passive income streams using the frameworks in this course. My money is finally working for me.", rating: 5 },
    { name: "Steven Park", role: "Business Owner", company: "Small Business", result: "Saved $30K in taxes", text: "The tax optimization module alone saved me $30K last year. This course paid for itself 400x over.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-emerald-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-emerald-600" /></div>
              <div><p className="text-slate-800 font-semibold text-sm">{notification.name} from {notification.location}</p><p className="text-slate-500 text-xs">just enrolled in Wealth Building!</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <p className="text-sm md:text-base font-semibold relative z-10">🔥 LAUNCH SALE: <span className="text-yellow-300">50% OFF</span> — Ends January 15th at Midnight</p>
      </div>

      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-teal-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">💰 ESSENTIAL</span>
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">📈 FINANCE</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">The Income-to-Freedom Formula™<span className="block text-emerald-400">Why 95% of High Earners Stay Broke</span></h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">Discover the <strong className="text-white">exact wealth-building system</strong> Wall Street insiders use to turn income into lasting freedom — <strong className="text-emerald-400">that they'll never teach you at work</strong>.</p>
              <div className="space-y-3 mb-8">
                {["6 comprehensive modules (60 min total)", "Investment fundamentals", "Tax optimization strategies", "Multiple income streams", "Real estate basics", "Lifetime access + future updates"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span className="text-slate-300">{item}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold mb-4">50% OFF — ENDS JAN 12</div>
                <div className="flex items-center justify-center gap-4 mb-2"><span className="text-slate-500 line-through text-2xl">$395</span><span className="text-5xl font-black text-white">$197</span></div>
                <p className="text-emerald-400 font-semibold">Save $198 Today</p>
              </div>
              <a href="https://buy.stripe.com/fZu00i2GZemH15yf4g08g0l" className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 mb-4">Get Instant Access — $197<ArrowRight className="inline ml-2 w-5 h-5" /></a>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400"><div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span>30-Day Guarantee</span></div><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>Instant Access</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 py-8 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><div className="text-3xl md:text-4xl font-black text-white">$50K</div><div className="text-emerald-400 text-sm">Avg First Year Invested</div></div>
            <div><div className="text-3xl md:text-4xl font-black text-white">3+</div><div className="text-emerald-400 text-sm">Income Streams Built</div></div>
            <div><div className="text-3xl md:text-4xl font-black text-white">$30K</div><div className="text-emerald-400 text-sm">Tax Savings</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See How It Works</h2><p className="text-slate-400 text-lg">Watch how wealth building can transform your finances</p></div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"><LazyVimeoPlayer videoId="1148769094" /></div>
          <div className="text-center mt-8"><a href="https://buy.stripe.com/fZu00i2GZemH15yf4g08g0l" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">Get Instant Access — $197<ArrowRight className="w-5 h-5" /></a></div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Results from Real Investors</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />))}</div>
                <p className="text-slate-300 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-slate-700 pt-4"><div className="font-bold text-white">{testimonial.name}</div><div className="text-slate-400 text-sm">{testimonial.role}</div><div className="text-emerald-400 font-semibold mt-2">{testimonial.result}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Course Curriculum</h2><p className="text-slate-400">6 modules • 60 minutes of focused content</p></div>
          <div className="space-y-4">
            {modules.map((module) => (
              <div key={module.number} className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden">
                <button onClick={() => setOpenModule(openModule === module.number ? null : module.number)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center"><module.icon className="w-6 h-6 text-emerald-400" /></div><div><div className="text-white font-bold">Module {module.number}: {module.title}</div><div className="text-slate-400 text-sm">{module.duration}</div></div></div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>{openModule === module.number && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-700"><div className="p-6 space-y-3">{module.topics.map((topic, i) => (<div key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">{topic}</span></div>))}</div></motion.div>)}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-2xl p-12">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Shield className="w-10 h-10 text-emerald-400" /></div>
            <h2 className="text-3xl font-bold text-white mb-4">The Results-Or-Refund Promise™</h2>
            <p className="text-slate-300 text-lg mb-6">Complete all modules. If you don&apos;t feel more confident about your wealth-building strategy within 30 days, email us for a <strong className="text-white">full refund</strong>. No questions asked. <strong className="text-emerald-400">You keep all the templates and frameworks.</strong></p>
            <div className="text-emerald-400 font-semibold">100% Risk-Free • Instant Access • Lifetime Updates</div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">This Course Is For You If...</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["You earn good money but don't know how to grow it", "You want to understand investing basics", "You're tired of living paycheck to paycheck", "You want to build multiple income streams", "You need a clear wealth-building roadmap", "You're ready to take control of your financial future"].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-900/50 border border-slate-700 rounded-xl p-4"><CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" /><span className="text-slate-300">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"><span className="text-white font-semibold pr-4">{faq.question}</span><ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
                <AnimatePresence>{openFaq === index && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-700"><div className="p-6"><p className="text-slate-300">{faq.answer}</p></div></motion.div>)}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900/30 to-teal-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-red-500/20 text-red-400 px-6 py-2 rounded-full text-sm font-bold mb-6">⏰ SALE ENDS JANUARY 12TH AT MIDNIGHT</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Build Real Wealth?</h2>
          <p className="text-xl text-slate-300 mb-8">Join hundreds of professionals who&apos;ve transformed their financial future.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"><span className="text-slate-500 line-through text-2xl">$395</span><span className="text-5xl font-black text-white">$197</span><span className="text-emerald-400 font-bold">Save $198</span></div>
          <a href="https://buy.stripe.com/fZu00i2GZemH15yf4g08g0l" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25">Get Instant Access Now<ArrowRight className="w-6 h-6" /></a>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2026 Million Dollar Blueprint. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4"><Link href="/terms" className="text-slate-500 hover:text-slate-300 text-sm">Terms</Link><Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm">Privacy</Link><Link href="/refund" className="text-slate-500 hover:text-slate-300 text-sm">Refund Policy</Link></div>
        </div>
      </footer>

      <AnimatePresence>
        {showStickyBar && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 py-4 px-4 z-40">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="hidden md:block"><div className="text-white font-bold">Wealth Building</div><div className="text-slate-400 text-sm"><span className="line-through">$395</span><span className="text-emerald-400 ml-2 font-bold">$197</span></div></div>
              <a href="https://buy.stripe.com/fZu00i2GZemH15yf4g08g0l" className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold text-center transition-all duration-300">Get Instant Access — $197</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
