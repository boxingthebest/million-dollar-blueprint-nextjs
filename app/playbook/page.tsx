"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Star, ArrowRight, Shield, Clock, TrendingUp, Target, Users, MessageSquare, Lightbulb, DollarSign, ChevronDown } from "lucide-react";

export default function PlaybookLanding() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const features = [
    {
      icon: Target,
      title: "The Goldman Sachs Framework",
      description: "The exact 3-step system I used to command respect in every room and position myself for rapid promotions",
      color: "bg-blue-500"
    },
    {
      icon: Clock,
      title: "Strategic Pause Technique",
      description: "How to use silence and timing to project confidence and control high-stakes conversations",
      color: "bg-purple-500"
    },
    {
      icon: DollarSign,
      title: "Salary Negotiation Mastery",
      description: "The frameworks I used to negotiate $100K+ raises without sounding greedy or burning bridges",
      color: "bg-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Executive Communication",
      description: "How to speak with authority, influence without title, and get buy-in from senior leaders",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "The Meeting Before the Meeting",
      description: "Amazon's insider strategy for building consensus and winning decisions before they're made",
      color: "bg-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Breaking the $120K Ceiling",
      description: "Why smart people plateau and the exact mindset shifts required to reach $400K+",
      color: "bg-amber-500"
    }
  ];

  const faqs = [
    {
      question: "How is this different from free content on YouTube?",
      answer: "YouTube gives you information—I give you implementation. These are the exact frameworks I used to close $100M+ in deals at Amazon and Goldman Sachs, compressed into 25 minutes of focused, actionable content. No fluff, no theory—just battle-tested strategies you can use immediately."
    },
    {
      question: "How long do I have access?",
      answer: "Lifetime access. Watch anytime, as many times as you want. The videos and PDF workbook are yours forever."
    },
    {
      question: "Is this really worth $27?",
      answer: "If these frameworks help you negotiate even a $5K raise, that's a 185:1 ROI. Most people who implement these strategies see $50K+ increases within 12 months. $27 is less than lunch."
    },
    {
      question: "What if I'm not in tech or finance?",
      answer: "These frameworks work in any industry. Executive presence, strategic communication, and salary negotiation are universal skills. I've helped professionals in healthcare, consulting, manufacturing, and more."
    },
    {
      question: "How long are the videos?",
      answer: "25+ minutes total across 5 focused videos (5-6 minutes each). No fluff—just the frameworks that matter."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-diverse-executives-v2.jpg"
            alt="Diverse Executive Team Meeting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/60 to-slate-900/45"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase border border-blue-400/30">
                Goldman Sachs & Amazon Frameworks
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              The Executive Presence Playbook
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-4 leading-relaxed max-w-3xl">
              5 Video Masterclasses on the Exact Frameworks That Took Me From $70K to $400K in 5 Years
            </p>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl">
              Battle-tested strategies from 22+ years at Goldman Sachs, Amazon, and elite tech startups. Learn how to command respect, negotiate six-figure raises, and position yourself for executive roles.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300 font-medium">Trusted by 2,000+ executives at Fortune 100 companies</span>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-6xl font-bold text-slate-900">$27</span>
                <div className="flex flex-col">
                  <span className="text-2xl text-gray-400 line-through">$597</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                    95% OFF - LIMITED TIME
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">5 Video Masterclasses (25+ minutes)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Downloadable frameworks & templates</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium">Lifetime access - watch anytime</span>
                </div>
              </div>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Get Instant Access Now"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>

              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="font-semibold">30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <span className="font-semibold">Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-emerald-600" />
              <span className="font-semibold">Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Master */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What You'll Master
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              5 battle-tested frameworks from 22+ years at Goldman Sachs, Amazon, and elite tech startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
              "These frameworks completely transformed how I show up in meetings. Within 3 months, I negotiated an $85K salary increase and was promoted to VP. The Goldman Sachs strategies are pure gold."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
              <div className="text-left">
                <div className="font-bold">Sarah Chen</div>
                <div className="text-slate-400">VP of Product, Apple</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 transition-transform ${
                        openFaq === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                      <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Executive Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 2,000+ executives who've used these frameworks to reach $400K+ salaries
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            Get Started for $27
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-200 mt-4 text-sm">30-Day Money-Back Guarantee • Instant Access • Lifetime Updates</p>
        </div>
      </div>
    </div>
  );
}
