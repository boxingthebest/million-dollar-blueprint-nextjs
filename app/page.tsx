"use client";

import { ArrowRight, Star, Facebook, Instagram, Mail, Check, ChevronDown } from "lucide-react";
import { AIResistantIcon, ExecutiveEnergyIcon, ExecutivePresenceIcon, SalesMasteryIcon, LeadershipIcon, DigitalMarketingIcon, WealthBuildingIcon } from "@/components/CourseIcons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Static imports for critical above-the-fold components
import StickyCTABar from "@/components/StickyCTABar";
import CountdownTimer from "@/components/CountdownTimer";

// Dynamic imports for below-the-fold components
const AnimatedCounter = dynamic(() => import("@/components/AnimatedCounter"), { ssr: false });
const ValueProposition = dynamic(() => import("@/components/ValueProposition"), { ssr: false });
const ApexChatbot = dynamic(() => import("@/components/ApexChatbot"), { ssr: false });
const TiltCard = dynamic(() => import("@/components/TiltCard"), { ssr: false });
const TrustBadgeCarousel = dynamic(() => import("@/components/TrustBadgeCarousel"), { ssr: false });
const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), { ssr: false });
const AnimatedNavigation = dynamic(() => import("@/components/AnimatedNavigation"), { ssr: false });
const Enhanced3DCard = dynamic(() => import("@/components/Enhanced3DCard"), { ssr: false });
const ScrollReveal = dynamic(() => import("@/components/ScrollReveal"), { ssr: false });
const LazyVimeoPlayer = dynamic(() => import("@/components/LazyVimeoPlayer"), { ssr: false });
const ProblemAgitation = dynamic(() => import("@/components/ProblemAgitation"), { ssr: false });
const GodfatherOffer = dynamic(() => import("@/components/GodfatherOffer"), { ssr: false });
const ChooseYourPath = dynamic(() => import("@/components/ChooseYourPath"), { ssr: false });


export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [notification, setNotification] = useState<{ name: string; location: string } | null>(null);

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

    const initialTimeout = setTimeout(showNotification, 30000);
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 60000 + 60000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-01-15T23:59:59'); // January 15, 2026

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const courseUrlMap: Record<string, string> = {
    "AI Automation Agency Blueprint™": "/courses/ai-automation-agency",
    "Get Paid to Train AI": "/courses/get-paid-train-ai",
    "AI-Resistant Skills": "/courses/ai-resistant-skills",
    "Executive Presence": "/courses/executive-presence",
    "Sales Mastery": "/courses/sales",
    "Leadership & Influence": "/courses/leadership",
    "Digital Marketing Mastery": "/courses/marketing",
    "Wealth Building": "/courses/wealth",
    "The Executive Energy System™": "/courses/wellness",
    "Make Your First $1K with AI": "/courses/make-first-1k-ai",
    "The AI Income Accelerator™": "/courses/ai-income-accelerator"
  };

  // Courses ordered by persona: AI/Entrepreneur Track first (most popular), then Career Track
  // Showing 6 featured courses to minimize scrolling on mobile
  const courses = [
    // 💰 ENTREPRENEUR TRACK - AI Income Courses (First 3)
    {
      title: "The AI Income Accelerator™",
      subtitle: "Make Your First $5K/Month with AI",
      price: "$97",
      originalPrice: "$297",
      icon: AIResistantIcon,
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500 to-blue-600",
      stripeLink: "/courses/ai-income-accelerator",
      description: "$1,532 value → $97. The complete system to land paying AI clients and build a real income stream. 7 modules. Done-for-you templates. The \"First Client\" Guarantee™.",
      students: "New",
      image: "/ai-side-hustle-hero.jpg",
      available: true,
      badge: "⭐ START HERE"
    },
    {
      title: "Make Your First $1K with AI",
      subtitle: "The $1K Quick-Start System™",
      price: "$47",
      originalPrice: "$97",
      icon: AIResistantIcon,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500 to-emerald-600",
      stripeLink: "/courses/make-first-1k-ai",
      description: "$491 value → $47. One simple AI service you can sell to local businesses for $200. Do it 5 times, make $1,000.",
      students: "New",
      image: "/make-1k-ai-hero-v2.jpg",
      available: true,
      badge: "🔥 QUICKEST WIN"
    },
    {
      title: "AI Automation Agency Blueprint™",
      subtitle: "Build a $20K/Month Agency",
      price: "$297",
      originalPrice: "$997",
      icon: AIResistantIcon,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-500 to-indigo-600",
      stripeLink: "/courses/ai-automation-agency",
      description: "$2,582 value → $297. The complete system to land $5K-$10K+ clients and scale to six figures. 7 modules. Done-for-you templates. 30-day guarantee.",
      students: "New",
      image: "/ai-agency-blueprint-hero.webp",
      available: true,
      badge: "🚀 PREMIUM"
    },
    // 🏢 CAREER TRACK - Professional Development (Next 3)
    {
      title: "AI-Resistant Skills",
      subtitle: "The 10 Irreplaceable Skills Framework™",
      price: "$47",
      originalPrice: "$197",
      icon: AIResistantIcon,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500 to-red-600",
      stripeLink: "https://buy.stripe.com/3cI7sK2GZ7Yj5lO4pC08g0s",
      description: "$888 value → $47. Master the 10 proprietary frameworks AI can't replicate. From Fortune 100 boardrooms.",
      students: "253 enrolled",
      image: "/ai-resistant-hero-new.jpg",
      available: true,
      badge: "CAREER TRACK"
    },
    {
      title: "Executive Presence",
      subtitle: "The Command Presence Protocol™",
      price: "$397",
      originalPrice: "$997",
      icon: ExecutivePresenceIcon,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500 to-teal-600",
      stripeLink: "https://buy.stripe.com/14A6oG95nguP9C43ly08g0h",
      description: "Master executive presence and influence without authority. From Fortune 100 leaders.",
      students: "187 enrolled",
      image: "/hero-executive-presence-futuristic.png",
      available: true,
      badge: "PREMIUM"
    },
    {
      title: "Sales Mastery",
      subtitle: "The Fortune 100 Close System™",
      price: "$247",
      originalPrice: "$495",
      icon: SalesMasteryIcon,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-500 to-amber-600",
      stripeLink: "https://buy.stripe.com/6oU8wO3L31zV4hKe0c08g0i",
      description: "Sales frameworks that scaled companies from $500K to $50B+.",
      students: "142 enrolled",
      image: "/course-sales-new.jpg",
      available: true,
      badge: "NEW"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Product",
      company: "Apple",
      text: "The AI-Resistant Skills course completely transformed how I approach product strategy. Within 3 months of implementing these frameworks, I was promoted to VP. The insider strategies from top companies are pure gold.",
      result1: "Promoted to VP",
      result2: "Promoted in 90 Days",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Sales Director",
      company: "Salesforce",
      text: "I've taken dozens of leadership courses, but nothing compares to the real-world strategies taught here. These aren't theories - they're the exact frameworks used at Fortune 100 companies. My team's performance increased 210% in Q1.",
      result1: "+210% Performance",
      result2: "$3.2M New Revenue",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Principal Consultant",
      company: "Top Consulting Firm",
      text: "As someone who advises C-suite executives daily, I can confirm these strategies are exactly what's used at the highest levels. The course paid for itself quickly when I closed a major consulting engagement using these frameworks.",
      result1: "Major Contract",
      result2: "First Week ROI",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, simply email us within 30 days for a full refund—no questions asked. You keep all the templates and frameworks."
    },
    {
      question: "How is this different from free content or AI?",
      answer: "Free content gives you information—we give you implementation. These are battle-tested frameworks from 22+ years at Fortune 100 companies that actually work. You're buying a shortcut that saves years of trial and error."
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access to all course materials, including future updates. Once you enroll, the content is yours forever."
    },
    {
      question: "Is there a payment plan?",
      answer: "Currently one-time payment only. At these founding member prices, most students report ROI within the first month."
    }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("🎉 Thanks for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
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
                <p className="text-slate-500 text-xs">just enrolled in a course!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Bar with Social Links */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-white text-sm relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide text-base">🔥 LAUNCH SALE — Selected Courses 75%+ OFF — Ends January 15th</span>
          </div>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/milliondollarblueprint.official/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/milliondollarblueprint.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <AnimatedNavigation />

      {/* Countdown Timer Banner */}
      <CountdownTimer 
        targetDate={new Date('2026-01-15T23:59:59')} 
        title="🔥 LAUNCH SALE ENDS JANUARY 15TH — Selected Courses 75%+ OFF"
      />

      {/* Hero Section */}
      <section className="py-16 md:py-32 relative overflow-hidden animated-gradient-bg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Executive Success" 
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/95" />
          

          

          
          {/* Glowing Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 px-6 py-3 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-white font-semibold text-sm md:text-base">⚠️ WARNING: This Isn't Another Generic Course</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
<motion.span
		                initial={{ opacity: 0, y: 20 }}
		                animate={{ opacity: 1, y: 0 }}
		                transition={{ duration: 0.6, delay: 0.4 }}
		                className="inline-block"
		              >
		                The Hidden Career Accelerator That Got
		              </motion.span>
		              <br />
		              <motion.span 
		                initial={{ opacity: 0, scale: 0.9 }}
		                animate={{ opacity: 1, scale: 1 }}
		                transition={{ duration: 0.8, delay: 0.6 }}
		                className="holographic-text inline-block"
		              >
		                440+ Professionals Promoted
		              </motion.span>
		              <br />
		              <motion.span
		                initial={{ opacity: 0, y: 10 }}
		                animate={{ opacity: 1, y: 0 }}
		                transition={{ duration: 0.6, delay: 0.8 }}
		                className="text-2xl md:text-3xl lg:text-4xl text-slate-300 inline-block mt-2"
		              >
		                (While Everyone Else Stayed Stuck)
		              </motion.span>
            </motion.h1>
            
	            <p className="text-2xl md:text-3xl lg:text-4xl text-slate-200 mb-4 font-bold">
	              Get Promoted in 90 Days — Or Your Money Back
	            </p>
            
            <p className="text-lg md:text-xl text-cyan-300 mb-3 font-semibold">
              Discover the 10 AI-Resistant Skills Fortune 100 Executives Use to Command Six Figures
            </p>
            
            <p className="text-base md:text-lg text-slate-400 mb-3">
              — That They'll Never Teach You at Work
            </p>
            
            {/* Unique Mechanism - Todd Brown */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-emerald-400 font-bold text-sm md:text-base">Introducing The M.D.B. Acceleration Method™</span>
              <span className="text-slate-400 text-sm">— The Same Framework That Scaled Companies from $10M to $100M+</span>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400">
                <Image src="/dana-penza-headshot.png" alt="Dana Penza" width={40} height={40} className="object-cover" />
              </div>
              <div className="text-left">
                <div className="text-cyan-400 font-bold text-sm">Created by Dana Penza</div>
                <div className="text-slate-300 text-xs">22+ Years in Cloud Computing, Wall Street & Tech Startups</div>
              </div>
            </div>
            
            <p className="text-base md:text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn <strong className="text-white">AI-Resistant Skills</strong>, <strong className="text-white">Sales Mastery</strong>, <strong className="text-white">Leadership</strong>, <strong className="text-white">Digital Marketing</strong>, <strong className="text-white">Executive Wellness</strong>, <strong className="text-white">Wealth Building</strong>, and our new <strong className="text-white">AI Income Accelerator</strong> courses from battle-tested frameworks used to scale companies from $10M to $100M+.
            </p>
            
            {/* Animated Stats Counter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8"
            >
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 text-center">
                <AnimatedCounter end={440} suffix="+" className="text-3xl md:text-4xl font-bold text-cyan-400" />
                <p className="text-slate-300 text-sm mt-1">Students</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                <AnimatedCounter end={22} suffix="+" className="text-3xl md:text-4xl font-bold text-purple-400" />
                <p className="text-slate-300 text-sm mt-1">Years Experience</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4 text-center">
                <AnimatedCounter end={10} className="text-3xl md:text-4xl font-bold text-pink-400" />
                <p className="text-slate-300 text-sm mt-1">Elite Courses</p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-4 text-center">
                <AnimatedCounter end={100} suffix="%" className="text-3xl md:text-4xl font-bold text-orange-400" />
                <p className="text-slate-300 text-sm mt-1">Money-Back</p>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.15, rotate: [0, -1, 1, -1, 0] }}
                whileTap={{ scale: 0.95 }}
                href="/bundle/flagship"
                className="neon-button relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 text-white px-10 md:px-14 py-5 md:py-7 rounded-xl text-xl md:text-2xl font-bold overflow-hidden group"
                style={{ backgroundSize: '200% 100%' }}
              >
                <span className="relative z-10 flex items-center">
                  Get Started 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500 pointer-events-none" />
              </motion.a>
              <a
                href="#courses"
                className="neon-button-cyan inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold"
              >
                Browse Courses
              </a>
            </div>
            
            {/* Trust Badge Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-8"
            >
              <TrustBadgeCarousel />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-slate-300 text-sm md:text-base justify-center">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>




      {/* Choose Your Path - Two Persona Selection */}
      <ChooseYourPath />

      {/* Problem Agitation - Suby Style */}
      <ProblemAgitation />

      {/* Founder's Welcome Video */}
      <section className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-cyan-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent animate-pulse" style={{animationDuration: '4s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">See What's Possible</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 text-center mb-12">
              Watch how 440+ professionals are breaking into six figures with Million Dollar Blueprint <span className="text-cyan-400">(55 sec)</span>
            </p>
            <div className="shadow-2xl border-2 border-cyan-500/30 rounded-xl overflow-hidden">
              <LazyVimeoPlayer
                videoId="1151486661"
                title="Million Dollar Blueprint - Your Blueprint to Millions"
              />
            </div>
            

          </div>
        </div>
      </section>

      {/* Compact Instructor Credibility Bar */}
      <section className="py-8 bg-slate-900/50 border-y border-cyan-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <Image 
                src="/dana-penza-headshot.png" 
                alt="Dana Penza" 
                width={60} 
                height={60}
                className="rounded-full border-2 border-cyan-500/30"
              />
              <div>
                <p className="text-white font-bold">Dana Penza</p>
                <p className="text-cyan-400 text-sm">22+ Years Fortune 100 Experience</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-slate-700"></div>
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">$100M+</div>
                <div className="text-xs text-slate-400">Revenue Driven</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">440+</div>
                <div className="text-xs text-slate-400">Professionals Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Choose Your Transformation
              </h2>
              <p className="text-xl md:text-2xl text-slate-400">
                Each course is packed with battle-tested strategies from 100+ years of combined experience
              </p>
            </ScrollReveal>

            {/* All Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 items-stretch max-w-6xl mx-auto">
              {courses.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="h-full"
                  >
                    <div className="glass-card rounded-xl overflow-hidden group relative hover:scale-[1.02] transition-transform duration-200 flex flex-col h-full cursor-pointer">
                    {course.badge && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        {course.badge}
                      </div>
                    )}
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={course.image} 
                        alt={course.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow duration-300 ${course.bgGradient} flex items-center justify-center mb-4 md:mb-6`}>
                        <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" style={{filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))"}} />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{course.title}</h3>
                      <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">{course.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex flex-col mb-3">
                          <span className="text-slate-500 text-lg line-through">{course.originalPrice}</span>
                          <div className="text-4xl md:text-5xl font-bold text-white">{course.price}</div>
                        </div>
                        <div className="text-sm text-slate-400">
                          {course.students}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        {course.available ? (
                          <Link
                            href={courseUrlMap[course.title] || '#'}
                            className={`neon-button-cyan block w-full text-center bg-gradient-to-r ${course.gradient} text-white px-6 md:px-8 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg`}
                          >
                            Enroll Now
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="block w-full text-center bg-slate-700 text-slate-400 px-6 md:px-8 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg cursor-not-allowed"
                          >
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bundle Section */}
            <ScrollReveal id="bundles" className="mt-16">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Choose Your Bundle</h2>
              <p className="text-xl md:text-2xl text-slate-400 text-center mb-16">Save more when you invest in your complete transformation</p>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                {/* Starter Bundle */}
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-2xl p-8 md:p-10 text-center hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 relative group flex flex-col h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col flex-grow">
                  <div className="inline-block bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-cyan-400/30">
                    🚀 FLAGSHIP
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Cash-Flow Duo</h3>
                  <p className="text-lg text-slate-300 mb-8">
                    The fastest path to your first $1,000 in the AI economy. Start earning this week.
                  </p>
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-white mb-2">$397</div>
                    <div className="text-xl text-slate-400 line-through mb-2">$688</div>
                    <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">Save $291 (42%)</div>
                  </div>
                  <ul className="text-left text-white mb-6 space-y-3 flex-grow">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span className="font-semibold">Get Paid to Train AI ($197 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span className="font-semibold">Make Your First $1K ($491 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Lifetime access to both courses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>2 professional certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>30-day "Career Insurance" guarantee</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <a
                    href="/bundle/flagship"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg w-full hover:shadow-cyan-500/50"
                  >
                    Get Flagship Bundle - $397
                  </a>
                  <p className="text-slate-400 text-sm mt-4">✓ 30-Day Money-Back Guarantee</p>
                  </div>
                  </div>
                </div>

                {/* Professional Bundle - BEST VALUE */}
                <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 border-4 border-purple-400 rounded-2xl p-8 text-center hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 relative group flex flex-col h-full bundle-pulse">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 MOST POPULAR
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col flex-grow pt-4">
                  <div className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-purple-400/30">
                    ⭐ PROFESSIONAL
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">All 10 Courses</h3>
                  <p className="text-lg text-slate-300 mb-8">
                    Complete transformation across all areas of your professional life
                  </p>
                  <div className="mb-8">
                    <div className="text-7xl font-bold text-white mb-2 animate-pulse">$797</div>
                    <div className="text-xl text-slate-400 line-through mb-2">$2,497</div>
                    <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">Save $1,700 (68%)</div>
                  </div>
                  <ul className="text-left text-white mb-6 space-y-3 flex-grow">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="font-semibold">All 10 premium courses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Lifetime access to everything</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>10 professional certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>30-day "Career Insurance" guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="font-semibold">Future course updates FREE</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <a
                    href="/bundle/professional"
                    className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white px-8 py-5 rounded-lg font-bold text-xl transition-all shadow-2xl w-full hover:shadow-purple-500/50"
                  >
                    Get Complete Access - $797
                  </a>
                  <p className="text-slate-400 text-sm mt-4">✓ 30-Day Money-Back Guarantee</p>
                  </div>
                  </div>
                </div>

                {/* VIP Bundle */}
                <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 relative group flex flex-col h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col flex-grow">
                  <div className="inline-block bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-amber-400/30">
                    👑 VIP
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">All 10 + 1-on-1 Strategy</h3>
                  <p className="text-lg text-slate-300 mb-8">
                    Everything plus personalized 1-on-1 coaching and private community
                  </p>
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-white mb-2">$2,497</div>
                    <div className="text-xl text-slate-400 line-through mb-2">$9,997</div>
                    <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">Save $7,500 (75%)</div>
                  </div>
                  <ul className="text-left text-white mb-6 space-y-3 flex-grow">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span className="font-semibold">All 10 premium courses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span className="font-semibold">1-hour strategy session + customized roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span className="font-semibold">Private VIP community access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>10 professional certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Lifetime access + updates</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <a
                    href="/bundle/vip"
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg w-full hover:shadow-amber-500/50"
                  >
                    Get VIP Access - $2,497
                  </a>
                  <p className="text-slate-400 text-sm mt-4">✓ 30-Day Money-Back Guarantee</p>
                  </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                What Our Students Are Saying
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                Real results from professionals who've implemented these frameworks
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Our students work at leading companies including those shown below. Company names indicate current or former employers, not endorsements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, idx) => {
                const photoMap: {[key: string]: string} = {
                  'Sarah Chen': '/testimonial-sarah.jpg',
                  'Marcus Rodriguez': '/testimonial-marcus.jpg',
                  'Jennifer Park': '/testimonial-jennifer.jpg',
                  'David Thompson': '/testimonial-david.jpg',
                  'Amanda Foster': '/testimonial-amanda.jpg',
                  'Robert Kim': '/testimonial-robert.jpg'
                };
                return (
                <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">{testimonial.text}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {testimonial.result1}
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {testimonial.result2}
                    </span>
                  </div>
                  <div className="border-t border-slate-700 pt-4 flex items-center gap-4">
                    <img 
                      src={photoMap[testimonial.name]} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50"
                    />
                    <div>
                      <div className="font-bold text-white text-base md:text-lg">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      <div className="text-cyan-400 text-sm font-semibold">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
            <p className="text-center text-slate-500 text-sm mt-8 max-w-3xl mx-auto">
              *Individual results shown. Results may vary based on individual effort, experience, and market conditions. These testimonials represent exceptional outcomes and are not typical. Your results will depend on your dedication and implementation of the strategies taught.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Condensed to 4 key questions */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Questions? We've Got Answers
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 md:px-8 py-4 md:py-6 flex justify-between items-center text-left hover:bg-slate-800/80 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        {idx === 1 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        {idx === 2 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        {idx === 3 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        {idx === 4 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        {idx === 5 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                        {idx === 6 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        {idx === 7 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                        {idx > 7 && <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      </div>
                      <span className="text-lg md:text-xl font-semibold text-white">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 md:px-8 pb-4 md:pb-6">
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

	      {/* Hormozi Guarantee Section */}
	      <section className="py-12 bg-slate-900 border-y border-cyan-500/20">
	        <div className="container mx-auto px-4">
	          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-2xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl">
	            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
	            <div className="relative z-10">
	              <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-8 border border-cyan-500/30">
	                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
	                </svg>
	              </div>
	              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Results-Or-Refund Promise™</h2>
	              <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
	                "Complete all modules. If you don't feel more confident about your AI-proof career, or if you don't see a clear path to your first $1K within 30 days, email us for a <span className="text-white font-bold underline decoration-cyan-500">full refund</span>. No questions asked. <span className="text-cyan-400 font-bold">You keep all the templates and frameworks.</span>"
	              </p>
	              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 font-medium">
	                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-400" /> 100% Risk-Free</span>
	                <span className="hidden md:block text-slate-600">|</span>
	                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-400" /> Instant Access</span>
	                <span className="hidden md:block text-slate-600">|</span>
	                <span className="flex items-center gap-2"><Check className="w-5 h-5 text-cyan-400" /> Lifetime Updates</span>
	              </div>
	            </div>
	          </div>
	        </div>
	      </section>

	      {/* Final CTA Section */}
	      <section className="py-12 md:py-16 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
	        <div className="container mx-auto px-4">
	          <div className="max-w-4xl mx-auto text-center text-white">
	            <h2 className="text-3xl md:text-4xl font-bold mb-4">
	              Don't Wait Until It's Too Late
	            </h2>
	            <p className="text-xl md:text-2xl mb-8">
	              Founding member pricing ends January 15th. <span className="font-bold underline">Price increases to $1,497 after the deadline.</span>
	            </p>
	            <a
	              href="/bundle/professional"
	              className="inline-block bg-white text-red-600 hover:bg-slate-100 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
	            >
	              Get All 10 Courses - $797
	            </a>
	            <p className="text-white/90 text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | No Risk</p>
	          </div>
	        </div>
	      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-cyan-500/20 py-16">
        <div className="container mx-auto px-4">
          {/* Footer Logo */}
          <div className="flex justify-center mb-12">
            <div className="drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Image src="/logo-transparent.png" alt="Million Dollar Blueprint" width={800} height={365} className="h-20 w-auto md:h-24 transition-all hover:scale-105 logo-glow-animated" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#courses" className="text-slate-400 hover:text-cyan-400 transition-colors">Courses</a></li>
                <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund-policy" className="text-slate-400 hover:text-cyan-400 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-4">
                <a href="https://www.facebook.com/milliondollarblueprint.official/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/milliondollarblueprint.ai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <p className="text-slate-400 text-sm">Need help? For questions, technical issues, or setup support, email <a href="mailto:hello@milliondollarblueprint.ai" className="text-cyan-400 hover:text-cyan-300 transition-colors">hello@milliondollarblueprint.ai</a></p>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-800">
            <p className="mb-4 text-xs text-slate-600 max-w-4xl mx-auto">
              EARNINGS DISCLAIMER: Results vary. The testimonials and examples used are exceptional results and are not intended to guarantee that you will achieve the same results. Your results will depend on many factors including your background, experience, and work ethic. All business involves risk and requires consistent effort and action.
            </p>
            © 2025 Million Dollar Blueprint. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <StickyCTABar />
      
      {/* Apex AI Chatbot */}
      <ApexChatbot />
      
    </div>
  );
}

