"use client";

import { ArrowRight, Check, Star, Sparkles, Building2, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AIResistantIcon, ExecutiveEnergyIcon, ExecutivePresenceIcon, SalesMasteryIcon, LeadershipIcon, DigitalMarketingIcon, WealthBuildingIcon } from "@/components/CourseIcons";
import StickyCTABar from "@/components/StickyCTABar";

export default function CoursesPage() {
  // AI/Entrepreneur Track Courses
  const aiCourses = [
    {
      title: "The AI Income Accelerator™",
      price: "$97",
      originalPrice: "$297",
      description: "The complete system to land paying AI clients and build a real income stream. 7 modules. Done-for-you templates.",
      image: "/ai-side-hustle-hero.jpg",
      link: "/courses/ai-income-accelerator",
      badge: "⭐ START HERE",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Make Your First $1K with AI",
      price: "$47",
      originalPrice: "$97",
      description: "One simple AI service you can sell to local businesses for $200. Do it 5 times, make $1,000.",
      image: "/make-1k-ai-hero-v2.jpg",
      link: "/courses/make-first-1k-ai",
      badge: "🔥 QUICKEST WIN",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "AI Automation Agency Blueprint™",
      price: "$297",
      originalPrice: "$997",
      description: "The complete system to land $5K-$10K+ clients and scale to six figures. 7 modules. 30-day guarantee.",
      image: "/ai-agency-blueprint-hero.webp",
      link: "/courses/ai-automation-agency",
      badge: "🚀 PREMIUM",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Get Paid to Train AI",
      price: "$97",
      originalPrice: "$197",
      description: "Learn how to get paid $15-$50/hour training AI models from home. No experience required.",
      image: "/get-paid-train-ai-hero.jpg",
      link: "/courses/get-paid-train-ai",
      badge: "BEGINNER",
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  // Career Track Courses
  const careerCourses = [
    {
      title: "AI-Resistant Skills",
      price: "$47",
      originalPrice: "$197",
      description: "Master the 10 proprietary frameworks AI can't replicate. From Fortune 100 boardrooms.",
      image: "/ai-resistant-hero-new.jpg",
      link: "/courses/ai-resistant-skills",
      badge: "BESTSELLER",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Executive Presence",
      price: "$397",
      originalPrice: "$997",
      description: "Master executive presence and influence without authority. From Fortune 100 leaders.",
      image: "/hero-executive-presence-futuristic.png",
      link: "/courses/executive-presence",
      badge: "PREMIUM",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Sales Mastery",
      price: "$247",
      originalPrice: "$495",
      description: "Sales frameworks that scaled companies from $500K to $50B+.",
      image: "/course-sales-new.jpg",
      link: "/courses/sales",
      badge: "NEW",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      title: "Leadership & Influence",
      price: "$247",
      originalPrice: "$495",
      description: "Lead teams and influence decisions without formal authority.",
      image: "/course-leadership.jpg",
      link: "/courses/leadership",
      badge: "",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "Digital Marketing Mastery",
      price: "$197",
      originalPrice: "$395",
      description: "Modern marketing strategies that drive real business results.",
      image: "/course-marketing.jpg",
      link: "/courses/marketing",
      badge: "",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Wealth Building",
      price: "$197",
      originalPrice: "$395",
      description: "Build lasting wealth with proven investment strategies.",
      image: "/course-wealth.jpg",
      link: "/courses/wealth",
      badge: "",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      title: "The Executive Energy System™",
      price: "$197",
      originalPrice: "$395",
      description: "High-performance wellness protocols for busy professionals.",
      image: "/course-wellness.jpg",
      link: "/courses/wellness",
      badge: "",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  // Bundles
  const bundles = [
    {
      title: "AI Cash-Flow Duo",
      price: "$397",
      originalPrice: "$688",
      savings: "Save $291 (42%)",
      description: "The fastest path to your first $1,000 in the AI economy.",
      includes: ["Get Paid to Train AI", "Make Your First $1K with AI"],
      link: "/bundle/flagship",
      badge: "🚀 FLAGSHIP",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "All 10 Courses",
      price: "$797",
      originalPrice: "$2,497",
      savings: "Save $1,700 (68%)",
      description: "Complete transformation across all areas of your professional life.",
      includes: ["All 10 premium courses", "Lifetime access", "10 certificates", "Future updates FREE"],
      link: "/bundle/professional",
      badge: "🔥 MOST POPULAR",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "All 10 + 1-on-1 Strategy",
      price: "$2,497",
      originalPrice: "$9,997",
      savings: "Save $7,500 (75%)",
      description: "Everything plus personalized coaching and VIP community.",
      includes: ["All 10 courses", "1-hour strategy session", "Private VIP community", "Priority support"],
      link: "/bundle/vip",
      badge: "👑 VIP",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-transparent.png" alt="Million Dollar Blueprint" width={200} height={50} className="h-10 w-auto" />
          </Link>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Library</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            All 10 premium courses + 3 bundle options. Choose your path to success.
          </p>
        </div>
      </section>

      {/* AI/Entrepreneur Track */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">AI Income Track</h2>
              <p className="text-cyan-400">Build an AI business & make money on the side</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={course.link} className="block h-full">
                  <div className="bg-slate-900/80 border border-slate-700 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all hover:scale-[1.02] h-full flex flex-col">
                    {course.badge && (
                      <div className={`bg-gradient-to-r ${course.gradient} text-white text-xs font-bold px-3 py-1 text-center`}>
                        {course.badge}
                      </div>
                    )}
                    <div className="relative h-40">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{course.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{course.price}</span>
                        <span className="text-slate-500 line-through text-sm">{course.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Track */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Career Track</h2>
              <p className="text-orange-400">Get promoted & earn more at your job</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={course.link} className="block h-full">
                  <div className="bg-slate-900/80 border border-slate-700 hover:border-orange-500/50 rounded-xl overflow-hidden transition-all hover:scale-[1.02] h-full flex flex-col">
                    {course.badge && (
                      <div className={`bg-gradient-to-r ${course.gradient} text-white text-xs font-bold px-3 py-1 text-center`}>
                        {course.badge}
                      </div>
                    )}
                    <div className="relative h-40">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{course.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{course.price}</span>
                        <span className="text-slate-500 line-through text-sm">{course.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Bundle & Save</h2>
            <p className="text-slate-400">Get more value with our course bundles</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bundles.map((bundle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={bundle.link} className="block h-full">
                  <div className={`bg-slate-900/80 border ${idx === 1 ? 'border-orange-500' : 'border-slate-700'} hover:border-cyan-500/50 rounded-xl overflow-hidden transition-all hover:scale-[1.02] h-full flex flex-col relative`}>
                    <div className={`bg-gradient-to-r ${bundle.gradient} text-white text-sm font-bold px-4 py-2 text-center`}>
                      {bundle.badge}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">{bundle.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">{bundle.description}</p>
                      
                      <div className="space-y-2 mb-6 flex-grow">
                        {bundle.includes.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span className="text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-700 pt-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-3xl font-bold text-white">{bundle.price}</span>
                          <span className="text-slate-500 line-through">{bundle.originalPrice}</span>
                        </div>
                        <p className="text-emerald-400 text-sm font-semibold">{bundle.savings}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Take our 60-second quiz to find the perfect course for your goals.
          </p>
          <Link href="/" className="inline-block bg-white text-cyan-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold text-lg transition-all">
            Back to Homepage
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2025 Million Dollar Blueprint. All rights reserved.
        </div>
      </footer>

      <StickyCTABar />
    </div>
  );
}
