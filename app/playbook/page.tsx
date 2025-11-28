"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Star, ArrowRight, Shield, Clock, TrendingUp, Target, Users, MessageSquare, Lightbulb, DollarSign, ChevronDown, Zap, Award, BarChart3, Briefcase } from "lucide-react";

export default function PlaybookLanding() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "playbook",
          productKey: "playbook27",
          customerEmail: email,
          successUrl: `${window.location.origin}/playbook/thank-you`,
          cancelUrl: `${window.location.origin}/playbook`,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout session. Please try again.");
      setIsLoading(false);
    }
  };

  const stats = [
    { number: "2,000+", label: "Executives Trained", icon: Users },
    { number: "$127K", label: "Avg. Salary Increase", icon: TrendingUp },
    { number: "22+", label: "Years Experience", icon: Award },
    { number: "97%", label: "Success Rate", icon: BarChart3 }
  ];

  const features = [
    {
      icon: Target,
      title: "The Goldman Sachs Framework",
      description: "The exact 3-step system I used to command respect in every room and position myself for rapid promotions",
      color: "bg-blue-500",
      stat: "Used by 847 executives"
    },
    {
      icon: Clock,
      title: "Strategic Pause Technique",
      description: "How to use silence and timing to project confidence and control high-stakes conversations",
      color: "bg-purple-500",
      stat: "92% report immediate impact"
    },
    {
      icon: DollarSign,
      title: "Salary Negotiation Mastery",
      description: "The frameworks I used to negotiate $100K+ raises without sounding greedy or burning bridges",
      color: "bg-emerald-500",
      stat: "Avg. $87K increase in 12 months"
    },
    {
      icon: MessageSquare,
      title: "Executive Communication",
      description: "How to speak with authority, influence without title, and get buy-in from senior leaders",
      color: "bg-orange-500",
      stat: "Proven across 15+ industries"
    },
    {
      icon: Users,
      title: "The Meeting Before the Meeting",
      description: "Amazon's insider strategy for building consensus and winning decisions before they're made",
      color: "bg-cyan-500",
      stat: "3x faster decision-making"
    },
    {
      icon: Lightbulb,
      title: "Breaking the $120K Ceiling",
      description: "Why smart people plateau and the exact mindset shifts required to reach $400K+",
      color: "bg-amber-500",
      stat: "67% reach $200K+ within 18 months"
    }
  ];

  const transformations = [
    {
      name: "Sarah Chen",
      role: "VP of Product, Apple",
      before: "$145K → $230K",
      time: "3 months",
      quote: "These frameworks completely transformed how I show up in meetings. I negotiated an $85K salary increase and was promoted to VP. The Goldman Sachs strategies are pure gold.",
      result: "58% salary increase"
    },
    {
      name: "Michael Rodriguez",
      role: "Director of Engineering, Microsoft",
      before: "$180K → $320K",
      time: "8 months",
      quote: "The Strategic Pause Technique alone changed everything. I went from being overlooked to leading $50M initiatives. This is career acceleration on steroids.",
      result: "78% salary increase"
    },
    {
      name: "Jennifer Park",
      role: "Senior Manager, Deloitte",
      before: "$95K → $185K",
      time: "14 months",
      quote: "I was stuck at $95K for 3 years. These frameworks got me promoted twice and nearly doubled my income. The ROI is insane.",
      result: "95% salary increase"
    }
  ];

  const faqs = [
    {
      question: "How is this different from free content on YouTube?",
      answer: "YouTube gives you information—I give you implementation. These are the exact frameworks I used to close $100M+ in deals at Amazon and Goldman Sachs, compressed into 30 minutes of focused, actionable content. No fluff, no theory—just battle-tested strategies you can use immediately. McKinsey charges $50K+ for similar frameworks."
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access. Watch anytime, as many times as you want. The videos and PDF workbook are yours forever. Plus, you'll get all future updates at no additional cost."
    },
    {
      question: "Is this really worth $27?",
      answer: "If these frameworks help you negotiate even a $5K raise, that's a 185:1 ROI. Our data shows the average user sees a $87K increase within 12 months. That's a 322,122% ROI. $27 is less than lunch—but this could change your entire career trajectory."
    },
    {
      question: "What if I'm not in tech or finance?",
      answer: "These frameworks work in any industry. Executive presence, strategic communication, and salary negotiation are universal skills. I've helped professionals in healthcare, consulting, manufacturing, retail, and more. The principles of influence and authority transcend industries."
    },
    {
      question: "How long are the videos?",
      answer: "30+ minutes total across 6 focused videos (5-6 minutes each). No fluff—just the frameworks that matter. Designed for busy professionals who need results fast."
    },
    {
      question: "What if it doesn't work for me?",
      answer: "30-day money-back guarantee. If you don't see immediate value, just email us and we'll refund you—no questions asked. But with a 97% satisfaction rate, I'm confident you'll love it."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <Image
              src="/hero-executive-team.jpg"
              alt="Professional Executive Team"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/55"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div 
              className={`inline-block mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                ⚡ Goldman Sachs & Amazon Frameworks
              </span>
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-black text-white leading-tight mb-6 transition-all duration-1000 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              The Executive Presence Playbook
            </h1>

            <p 
              className={`text-2xl lg:text-3xl text-yellow-400 font-bold mb-4 leading-relaxed max-w-3xl transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              From $70K to $400K in 5 Years: The Exact Frameworks That Changed Everything
            </p>

            <p 
              className={`text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              6 battle-tested video masterclasses (30+ minutes) revealing the insider strategies from 22+ years at Goldman Sachs, Amazon, and elite tech startups. <span className="text-white font-semibold">2,000+ executives</span> have used these frameworks to command respect, negotiate six-figure raises, and accelerate into executive roles.
            </p>

            <div 
              className={`flex items-center gap-4 mb-10 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-200 font-bold text-lg">4.9/5.0 from 2,000+ executives</span>
            </div>

            <div 
              className={`bg-white rounded-2xl shadow-2xl p-8 max-w-xl border-4 border-yellow-400 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-6xl font-black text-slate-900">$27</span>
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-400 line-through font-bold">$597</span>
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-black inline-block animate-pulse shadow-lg">
                    🔥 95% OFF - LIMITED TIME
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
                <p className="text-sm font-bold text-blue-900">
                  <span className="text-red-600">⏰ URGENCY:</span> Price increases to $97 in 48 hours. Lock in $27 now.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 font-bold" />
                  <span className="font-semibold">6 Video Masterclasses (30+ minutes)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">Downloadable frameworks & templates</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">Lifetime access + future updates</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-semibold">30-day money-back guarantee</span>
                </div>
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              />

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl active:scale-95 text-lg"
              >
                {isLoading ? "Processing..." : "🚀 GET INSTANT ACCESS NOW"}
                {!isLoading && <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />}
              </button>

              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <Icon className="w-8 h-8 text-yellow-400 transition-transform duration-300 group-hover:scale-125" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400 font-semibold uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              The Math Is Simple
            </h2>
            <p className="text-xl text-slate-700 mb-12">
              One salary negotiation pays for this 322,122 times over
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
                <div className="text-5xl font-black text-slate-900 mb-3">$27</div>
                <div className="text-gray-600 font-semibold">Your Investment</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-xl transform scale-110">
                <div className="text-5xl font-black text-white mb-3">$87K</div>
                <div className="text-green-100 font-semibold">Average Salary Increase</div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
                <div className="text-5xl font-black text-slate-900 mb-3">322,122%</div>
                <div className="text-gray-600 font-semibold">Your ROI</div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl border-l-8 border-yellow-400">
              <p className="text-2xl font-bold text-slate-900 mb-4">
                Even a $5K raise gives you a 18,418% ROI
              </p>
              <p className="text-lg text-slate-600">
                This isn't an expense—it's the highest-leverage investment you'll make in your career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Master */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What You'll Master
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              6 battle-tested frameworks from 22+ years at Goldman Sachs, Amazon, and elite tech startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 group"
                >
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg inline-block">
                    📊 {feature.stat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transformations */}
      <div className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Real Results. Real People. Real Numbers.
            </h2>
            <p className="text-xl text-gray-300">
              These aren't testimonials—they're case studies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transformations.map((person, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 hover:border-yellow-400 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-yellow-400 mb-2">{person.before}</div>
                  <div className="text-sm text-gray-400 font-semibold mb-1">{person.time}</div>
                  <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {person.result}
                  </div>
                </div>

                <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                  "{person.quote}"
                </blockquote>

                <div className="border-t border-slate-700 pt-4">
                  <div className="font-bold text-white">{person.name}</div>
                  <div className="text-sm text-gray-400">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-400">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                    <ChevronDown
                      className={`w-6 h-6 text-slate-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openFaq === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-5 bg-slate-50 border-t-2 border-slate-200">
                      <p className="text-slate-700 leading-relaxed font-medium">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Your Career Breakthrough<br />Starts Right Now
          </h2>
          <p className="text-2xl text-blue-100 mb-4 max-w-3xl mx-auto font-bold">
            Join 2,000+ executives who've used these frameworks to reach $400K+ salaries
          </p>
          <p className="text-xl text-yellow-300 mb-10 font-bold">
            ⏰ Price increases to $97 in 48 hours. Lock in $27 now.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-600 hover:bg-yellow-400 hover:text-slate-900 font-black py-6 px-12 rounded-xl transition-all duration-200 inline-flex items-center gap-3 transform hover:scale-110 hover:shadow-2xl active:scale-95 text-xl"
          >
            🚀 GET INSTANT ACCESS FOR $27
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-blue-100 mt-6 text-base font-semibold">
            ✅ 30-Day Money-Back Guarantee • ⚡ Instant Access • 🔄 Lifetime Updates
          </p>
        </div>
      </div>
    </div>
  );
}
