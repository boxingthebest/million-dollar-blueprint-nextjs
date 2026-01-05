"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Crown, Users, Shield, Clock, Zap, Award, CheckCircle2, TrendingUp, BarChart3, Megaphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

export default function MarketingPage() {
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
      { name: "Jessica M.", location: "Los Angeles" },
      { name: "Brandon K.", location: "Miami" },
      { name: "Stephanie L.", location: "Austin" },
      { name: "Tyler R.", location: "Portland" },
      { name: "Nicole S.", location: "Phoenix" },
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
    { number: 1, title: "Digital Marketing Foundations", duration: "10 min", icon: Megaphone, topics: ["The modern marketing landscape", "Customer journey mapping", "Building your marketing stack"] },
    { number: 2, title: "Content Marketing Mastery", duration: "12 min", icon: Lightbulb, topics: ["Content strategy that converts", "SEO fundamentals for visibility", "Creating viral-worthy content"] },
    { number: 3, title: "Social Media Strategy", duration: "11 min", icon: Users, topics: ["Platform selection for your audience", "Organic growth strategies", "Building engaged communities"] },
    { number: 4, title: "Paid Advertising Fundamentals", duration: "10 min", icon: Target, topics: ["Facebook/Meta ads basics", "Google Ads essentials", "Budget allocation strategies"] },
    { number: 5, title: "Email Marketing & Automation", duration: "9 min", icon: Zap, topics: ["Building high-converting email lists", "Automation sequences that sell", "Segmentation for personalization"] },
    { number: 6, title: "Analytics & Optimization", duration: "8 min", icon: BarChart3, topics: ["Key metrics that matter", "A/B testing frameworks", "Data-driven decision making"] }
  ];

  const faqs = [
    { question: "Do I need marketing experience?", answer: "No! This course is designed for beginners and intermediate marketers alike. We start with foundations and build up to advanced strategies." },
    { question: "Will this work for my industry?", answer: "Yes. These are universal digital marketing principles that work across B2B, B2C, e-commerce, SaaS, and service businesses." },
    { question: "How long do I have access?", answer: "Lifetime access. Once you enroll, the course is yours forever, including all future updates as platforms change." },
    { question: "What's your refund policy?", answer: "30-day money-back guarantee. If you don't see value, email us for a full refund. No questions asked." },
    { question: "Is this course up-to-date with 2026 strategies?", answer: "Absolutely! We update the course regularly to reflect the latest platform changes, algorithm updates, and marketing trends." }
  ];

  const testimonials = [
    { name: "Ashley Rodriguez", role: "E-commerce Owner", company: "Online Store", result: "3x revenue in 90 days", text: "Implemented the paid ads strategy and tripled my store revenue in just 3 months. The ROI on this course is insane.", rating: 5 },
    { name: "Derek Thompson", role: "Marketing Manager", company: "SaaS Startup", result: "500% more leads", text: "Our lead generation increased 5x after applying the content marketing and SEO strategies. Game changer.", rating: 5 },
    { name: "Melissa Park", role: "Freelance Marketer", company: "Self-Employed", result: "Doubled client rates", text: "The skills I learned allowed me to double my freelance rates. Clients see me as a strategic partner now.", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="fixed bottom-24 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-xs border-l-4 border-orange-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-slate-800 font-semibold text-sm">{notification.name} from {notification.location}</p><p className="text-slate-500 text-xs">just enrolled in Digital Marketing!</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <p className="text-sm md:text-base font-semibold relative z-10">🔥 LAUNCH SALE: <span className="text-yellow-300">75% OFF</span> — Ends January 12th at Midnight</p>
      </div>

      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-950 to-red-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.15),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/30">📈 HIGH DEMAND</span>
                <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold border border-yellow-500/30">🎯 MARKETING</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Digital Marketing<span className="block text-orange-400">Master the Modern Game</span></h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">Learn the <strong className="text-white">complete digital marketing stack</strong> from content to paid ads to analytics.</p>
              <div className="space-y-3 mb-8">
                {["6 comprehensive modules (60 min total)", "Content & SEO strategies", "Social media growth tactics", "Paid advertising fundamentals", "Email marketing automation", "Lifetime access + future updates"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" /><span className="text-slate-300">{item}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-block bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold mb-4">75% OFF — ENDS JAN 12</div>
                <div className="flex items-center justify-center gap-4 mb-2"><span className="text-slate-500 line-through text-2xl">$297</span><span className="text-5xl font-black text-white">$77</span></div>
                <p className="text-orange-400 font-semibold">Save $220 Today</p>
              </div>
              <a href="https://buy.stripe.com/5kA00i5T95Ql3o07t608g0s" className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25 mb-4">Get Instant Access — $77<ArrowRight className="inline ml-2 w-5 h-5" /></a>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400"><div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span>30-Day Guarantee</span></div><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>Instant Access</span></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-900/50 to-red-900/50 py-8 border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><div className="text-3xl md:text-4xl font-black text-white">3x</div><div className="text-orange-400 text-sm">Revenue Growth</div></div>
            <div><div className="text-3xl md:text-4xl font-black text-white">500%</div><div className="text-orange-400 text-sm">More Leads</div></div>
            <div><div className="text-3xl md:text-4xl font-black text-white">2x</div><div className="text-orange-400 text-sm">Client Rates</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See How It Works</h2><p className="text-slate-400 text-lg">Watch how digital marketing can transform your business</p></div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"><LazyVimeoPlayer videoId="1148769094" /></div>
          <div className="text-center mt-8"><a href="https://buy.stripe.com/5kA00i5T95Ql3o07t608g0s" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">Get Instant Access — $77<ArrowRight className="w-5 h-5" /></a></div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Results from Real Marketers</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />))}</div>
                <p className="text-slate-300 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-slate-700 pt-4"><div className="font-bold text-white">{testimonial.name}</div><div className="text-slate-400 text-sm">{testimonial.role}</div><div className="text-orange-400 font-semibold mt-2">{testimonial.result}</div></div>
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
                  <div className="flex items-center gap-4"><div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center"><module.icon className="w-6 h-6 text-orange-400" /></div><div><div className="text-white font-bold">Module {module.number}: {module.title}</div><div className="text-slate-400 text-sm">{module.duration}</div></div></div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>{openModule === module.number && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-700"><div className="p-6 space-y-3">{module.topics.map((topic, i) => (<div key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" /><span className="text-slate-300">{topic}</span></div>))}</div></motion.div>)}</AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-2xl p-12">
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Shield className="w-10 h-10 text-orange-400" /></div>
            <h2 className="text-3xl font-bold text-white mb-4">100% Risk-Free Guarantee</h2>
            <p className="text-slate-300 text-lg mb-6">Try Digital Marketing for 30 days. If you don&apos;t see improvement in your marketing results, email us for a full refund. No questions asked.</p>
            <div className="text-orange-400 font-semibold">30-Day Money-Back Guarantee</div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">This Course Is For You If...</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["You want to grow your business online", "You're confused by all the marketing options", "You want to reduce your customer acquisition cost", "You need to build a consistent lead pipeline", "You want to understand what actually works", "You're ready to master digital marketing"].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-900/50 border border-slate-700 rounded-xl p-4"><CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0" /><span className="text-slate-300">{item}</span></div>
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

      <section className="py-20 px-4 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-red-500/20 text-red-400 px-6 py-2 rounded-full text-sm font-bold mb-6">⏰ SALE ENDS JANUARY 12TH AT MIDNIGHT</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Master Digital Marketing?</h2>
          <p className="text-xl text-slate-300 mb-8">Join hundreds of marketers who&apos;ve transformed their results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"><span className="text-slate-500 line-through text-2xl">$297</span><span className="text-5xl font-black text-white">$77</span><span className="text-orange-400 font-bold">Save $220</span></div>
          <a href="https://buy.stripe.com/5kA00i5T95Ql3o07t608g0s" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25">Get Instant Access Now<ArrowRight className="w-6 h-6" /></a>
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
              <div className="hidden md:block"><div className="text-white font-bold">Digital Marketing</div><div className="text-slate-400 text-sm"><span className="line-through">$297</span><span className="text-orange-400 ml-2 font-bold">$77</span></div></div>
              <a href="https://buy.stripe.com/5kA00i5T95Ql3o07t608g0s" className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-bold text-center transition-all duration-300">Get Instant Access — $77</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
