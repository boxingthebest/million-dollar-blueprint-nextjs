"use client";

import { ArrowRight, Star, TrendingUp, Heart, Brain, DollarSign, Users, Target, BarChart3, Facebook, Instagram, Mail, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now

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
    "AI-Resistant Skills": "/courses/ai-resistant-skills",
    "High-Performance Wellness": "/courses/wellness",
    "Sales Mastery": "/courses/sales",
    "Leadership & Influence": "/courses/leadership",
    "Digital Marketing Mastery": "/courses/marketing",
    "Wealth Building": "/courses/wealth"
  };

  const courses = [
    {
      title: "AI-Resistant Skills",
      subtitle: "Future-Proof Your Career",
      price: "$197",
      originalPrice: "$395",
      icon: Brain,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      stripeLink: "https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00",
      description: "Master the 5 human skills AI will never replace. From the boardrooms of AWS & Goldman Sachs.",
      students: "253 enrolled",
      image: "/course-ai-skills.jpg",
      available: true
    },
    {
      title: "High-Performance Wellness",
      subtitle: "Eliminate Burnout Forever",
      price: "$197",
      originalPrice: "$395",
      icon: Heart,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      stripeLink: "https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01",
      description: "Executive wellness protocols to sustain peak performance without burning out.",
      students: "187 enrolled",
      image: "/course-wellness.jpg",
      available: true
    },
    {
      title: "Sales Mastery",
      subtitle: "Close High-Ticket Deals",
      price: "$247",
      originalPrice: "$495",
      icon: TrendingUp,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-500/10 to-amber-500/10",
      stripeLink: "#",
      description: "The exact sales frameworks used to scale companies from $500K to $50B+.",
      students: "Coming Soon",
      image: "/course-sales.jpg",
      available: false,
      badge: "NEW"
    },
    {
      title: "Leadership & Influence",
      subtitle: "Command Any Room",
      price: "$247",
      originalPrice: "$495",
      icon: Users,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-500/10 to-indigo-500/10",
      stripeLink: "#",
      description: "Fortune 100 leadership strategies for executive presence and influence.",
      students: "Coming Soon",
      image: "/course-leadership.jpg",
      available: false,
      badge: "NEW"
    },
    {
      title: "Digital Marketing Mastery",
      subtitle: "Grow Your Brand Online",
      price: "$197",
      originalPrice: "$395",
      icon: BarChart3,
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      stripeLink: "#",
      description: "Enterprise-level digital marketing tactics that drive real revenue.",
      students: "Coming Soon",
      image: "/course-marketing.jpg",
      available: false,
      badge: "NEW"
    },
    {
      title: "Wealth Building",
      subtitle: "Financial Intelligence",
      price: "$197",
      originalPrice: "$395",
      icon: DollarSign,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-500/10 to-green-500/10",
      stripeLink: "#",
      description: "Build lasting wealth with strategies from Wall Street insiders.",
      students: "Coming Soon",
      image: "/course-wealth.jpg",
      available: false,
      badge: "NEW"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Product",
      company: "Apple",
      text: "The AI-Resistant Skills course completely transformed how I approach product strategy. Within 3 months of implementing these frameworks, I negotiated a $85K salary increase and was promoted to VP. The insider strategies from AWS and Goldman Sachs are pure gold.",
      result1: "+$85K Salary",
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
      name: "Jennifer Park",
      role: "Director of Engineering",
      company: "Google",
      text: "The High-Performance Wellness course saved my career and my health. I was burning out managing a 50-person team. Now I work smarter, not harder - 40-hour weeks with better results. This is essential for every tech leader.",
      result1: "40-Hour Weeks",
      result2: "Zero Burnout",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Principal Consultant",
      company: "McKinsey & Company",
      text: "As someone who advises C-suite executives daily, I can confirm these strategies are exactly what's used at the highest levels. The course paid for itself in the first week when I closed a $240K consulting engagement using these frameworks.",
      result1: "$240K Contract",
      result2: "First Week ROI",
      rating: 5
    },
    {
      name: "Amanda Foster",
      role: "Head of Growth Marketing",
      company: "Netflix",
      text: "I was skeptical about another online course, but the 30-day guarantee made it risk-free. Best decision ever. I've implemented 15+ strategies that increased our user acquisition by 187%. My VP asked me to train the entire growth team.",
      result1: "+187% Acquisition",
      result2: "Promoted to VP",
      rating: 5
    },
    {
      name: "Robert Kim",
      role: "Senior Investment Analyst",
      company: "Goldman Sachs",
      text: "The bundle was the best investment I've made in my career. Both courses together cost less than one day of executive coaching, but delivered 100x more value. The emotional intelligence module alone transformed how I interact with clients.",
      result1: "100x ROI",
      result2: "$2M+ Deals Closed",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Who is this program for?",
      answer: "This program is designed for ambitious professionals, entrepreneurs, and executives who want to future-proof their careers and build lasting wealth. Whether you're in tech, finance, consulting, or any other industry, these strategies apply universally."
    },
    {
      question: "How long do I have access to the courses?",
      answer: "You get lifetime access to all course materials, including any future updates. Once you enroll, the content is yours forever."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with the course, simply email us within 30 days for a full refund—no questions asked."
    },
    {
      question: "How is this different from other online courses?",
      answer: "Unlike theoretical courses taught by 'gurus,' our content comes from real executives with 22+ years of experience at companies like Apple, Google, Goldman Sachs, and McKinsey. These are battle-tested strategies that actually work at the highest levels."
    },
    {
      question: "Can I purchase individual courses or do I need the bundle?",
      answer: "You can purchase courses individually for $197-$247 each, or get the complete bundle and save $100. The bundle gives you both flagship courses (AI-Resistant Skills + High-Performance Wellness) for just $297."
    },
    {
      question: "How long does it take to complete each course?",
      answer: "Each course is designed to be completed at your own pace. Most students finish within 4-6 weeks, spending 2-3 hours per week. However, you can go faster or slower based on your schedule."
    },
    {
      question: "Will this work for my industry?",
      answer: "Yes! The skills taught—emotional intelligence, strategic thinking, wellness protocols, and relationship building—are universal. Our students come from tech, finance, healthcare, consulting, and more, all seeing remarkable results."
    },
    {
      question: "Is there a payment plan available?",
      answer: "Currently, we offer one-time payment only. However, at these founding member prices, the courses pay for themselves quickly. Many students report ROI within the first month."
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mailchimp integration will be added here
    console.log("Newsletter signup:", email);
    alert("Thanks for subscribing! We'll send you exclusive updates and tips.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar with Social Links */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-white text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>info@milliondollarblueprint.ai</span>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </div>
          <div className="flex gap-4 md:gap-6 items-center">
            <a href="#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">Courses</a>
            <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base hidden sm:inline">About</a>
            <a 
              href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Founder's Welcome Video */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-cyan-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent animate-pulse" style={{animationDuration: '4s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              A Message From Our Founders
            </h2>
            <p className="text-lg md:text-xl text-slate-400 text-center mb-8">
              Discover why Million Dollar Blueprint is different from every other course platform
            </p>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                src="https://player.vimeo.com/video/1128640993?badge=0&autopause=0&player_id=0&app_id=58479" 
                className="w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                title="welcome-video-ENHANCED"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <p className="text-lg md:text-xl font-bold mb-3">⚡ Founding Member Pricing Ends In:</p>
            <div className="flex justify-center gap-3 md:gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 md:px-6 py-3 md:py-4">
                <div className="text-2xl md:text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-xs md:text-sm">Days</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 md:px-6 py-3 md:py-4">
                <div className="text-2xl md:text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm">Hours</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 md:px-6 py-3 md:py-4">
                <div className="text-2xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm">Minutes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 md:px-6 py-3 md:py-4">
                <div className="text-2xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Executive Success" 
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/95" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Your Blueprint to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                A Million-Dollar Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 mb-6">
              Advised by Executives from Amazon, Apple, Google, Goldman Sachs & McKinsey
            </p>
            
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Master the insider strategies from the world's most successful companies. Learn from advisors at Amazon, Apple, Google, Goldman Sachs & McKinsey who've scaled businesses from $500K to $50B+.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-cyan-500/50 transition-all"
              >
                Get Complete Bundle - Save $100 <ArrowRight className="ml-2" />
              </a>
              <a
                href="#courses"
                className="inline-flex items-center justify-center border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 backdrop-blur-sm px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold transition-all"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
            <div className="text-slate-300 font-semibold text-sm md:text-lg">ADVISED BY EXECUTIVES FROM:</div>
            <div className="text-slate-500 text-base md:text-lg">Amazon</div>
            <div className="text-slate-500 text-base md:text-lg">Apple</div>
            <div className="text-slate-500 text-base md:text-lg">Google</div>
            <div className="text-slate-500 text-base md:text-lg">Goldman Sachs</div>
            <div className="text-slate-500 text-base md:text-lg">McKinsey & Company</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                10,000+
              </div>
              <div className="text-slate-400 text-sm md:text-lg">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
                $47K
              </div>
              <div className="text-slate-400 text-sm md:text-lg">Avg Salary Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
                94%
              </div>
              <div className="text-slate-400 text-sm md:text-lg">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
                47
              </div>
              <div className="text-slate-400 text-sm md:text-lg">Countries Worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Choose Your Transformation
              </h2>
              <p className="text-xl md:text-2xl text-slate-400">
                Each course is packed with battle-tested strategies from 100+ years of combined experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {courses.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all rounded-xl overflow-hidden group relative">
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
                    <div className="p-6 md:p-8">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br ${course.bgGradient} flex items-center justify-center mb-4 md:mb-6`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-base md:text-lg text-slate-400 mb-4">{course.subtitle}</p>
                      <p className="text-slate-300 mb-6 text-sm md:text-base">{course.description}</p>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-3xl md:text-4xl font-bold text-white">{course.price}</div>
                        <div className="text-lg md:text-xl text-slate-500 line-through">{course.originalPrice}</div>
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                          Save 50%
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-400 mb-6">
                        {course.students}
                      </div>
                      
                      <Link
                        href={courseUrlMap[course.title] || '#'}
                        className={`block w-full text-center ${course.available ? `bg-gradient-to-r ${course.gradient} hover:opacity-90` : 'bg-slate-700 hover:bg-slate-600'} text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all`}
                      >
                        {course.available ? `Learn More` : 'Coming Soon'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bundle Section */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-8 md:p-12 text-center">
              <div className="inline-block bg-cyan-500/20 text-cyan-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
                🔥 BEST VALUE - SAVE $100
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Success Bundle</h3>
              <p className="text-lg md:text-xl text-slate-300 mb-8">
                Get BOTH flagship courses and save $100. Transform your career AND health.
              </p>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                <span className="line-through text-slate-500 text-3xl md:text-4xl mr-3">$394</span>
                $297
              </div>
              <p className="text-cyan-400 font-semibold mb-8">Save $100 with the bundle</p>
              <a
                href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
              >
                Get Bundle - Save $100
              </a>
              <p className="text-slate-400 text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Success Stories from Top Companies
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                Join professionals from Amazon, Apple, Google, Goldman Sachs, McKinsey & Company, and other Fortune 100 companies who've transformed their careers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-all">
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
                  <div className="border-t border-slate-700 pt-4">
                    <div className="font-bold text-white text-base md:text-lg">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    <div className="text-cyan-400 text-sm font-semibold">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Million Dollar Blueprint Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Why Million Dollar Blueprint?
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                This isn't theory. This is battle-tested insider knowledge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">100+ Years of Combined Experience</h3>
                <p className="text-slate-300">From Amazon, Apple, Google, Goldman Sachs & McKinsey. Real strategies from the highest levels.</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">$500K to $50B+ Scale</h3>
                <p className="text-slate-300">Proven frameworks that actually work. Not academic theory.</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center hover:border-orange-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Founding Member Pricing</h3>
                <p className="text-slate-300">Lock in lifetime access at the lowest price you'll ever see.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg md:text-xl text-slate-400">
                Everything you need to know about Million Dollar Blueprint
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 md:px-8 py-4 md:py-6 flex justify-between items-center text-left hover:bg-slate-800/80 transition-all"
                  >
                    <span className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</span>
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

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Exclusive Insider Strategies
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Join our newsletter for course updates, free training, and insider tips from Amazon, Apple, Google, Goldman Sachs & McKinsey advisors
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all whitespace-nowrap"
              >
                Get Free Training
              </button>
            </form>
            <p className="text-slate-400 text-sm mt-4">🔒 We respect your privacy. Unsubscribe anytime.</p>
            <p className="text-cyan-400 text-sm font-semibold mt-2">Join 5,000+ Subscribers</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Don't Wait Until It's Too Late
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Founding member pricing ends soon. Lock in lifetime access at the lowest price ever.
            </p>
            <a
              href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-red-600 hover:bg-slate-100 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Get Started Now - Save $100
            </a>
            <p className="text-white/90 text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | No Risk</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#courses" className="text-slate-400 hover:text-cyan-400 transition-colors">Courses</a></li>
                <li><a href="#testimonials" className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <p className="text-slate-400 text-sm">info@milliondollarblueprint.ai</p>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-800">
            © 2025 Million Dollar Blueprint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

