"use client";

import { ArrowRight, CheckCircle2, Brain, Zap, Target, Award, TrendingUp, Shield, Users, DollarSign, Star, Clock, Sparkles, Trophy, BadgeCheck, Crown, Phone, FileText, MessageCircle, Calendar, Gem, Lock, Gift, Rocket, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

const courses = [
  { name: "AI-Resistant Skills", value: "$197", icon: Brain },
  { name: "Executive Presence", value: "$397", icon: Zap },
  { name: "Sales Mastery", value: "$247", icon: TrendingUp },
  { name: "Leadership & Influence", value: "$247", icon: Users },
  { name: "Digital Marketing", value: "$197", icon: Target },
  { name: "Wealth Building", value: "$197", icon: DollarSign },
  { name: "Executive Energy System", value: "$197", icon: Shield }
];

const vipBenefits = [
  {
    icon: Phone,
    title: "1-Hour Strategy Session",
    value: "$1,500",
    description: "A private, one-on-one call with our executive coach to map out your personalized career acceleration strategy. We'll identify your biggest opportunities and create a 90-day action plan."
  },
  {
    icon: FileText,
    title: "Customized Career Roadmap",
    value: "$800",
    description: "A detailed, personalized document outlining your exact path to your next promotion, salary increase, or career pivot. Includes specific milestones, timelines, and action items."
  },
  {
    icon: MessageCircle,
    title: "30-Day Priority Support",
    value: "$500",
    description: "Direct access to our team for 30 days after your strategy session. Get answers to your questions, feedback on your progress, and guidance when you need it most."
  }
];

const testimonials = [
  {
    name: "Jennifer Park",
    role: "Chief Marketing Officer",
    company: "Series B Startup",
    image: "/testimonial-jennifer.jpg",
    text: "The VIP strategy session alone was worth 10x what I paid. Within 3 months, I negotiated a $250K package with equity. The personalized roadmap gave me the confidence to ask for what I deserved.",
    rating: 5,
    result: "$250K+ Package"
  },
  {
    name: "David Thompson",
    role: "Managing Director",
    company: "Investment Bank",
    image: "/testimonial-david.jpg",
    text: "I was skeptical about the price, but the ROI has been incredible. The 1-on-1 coaching helped me identify blind spots I'd had for years. Promoted to MD within 6 months.",
    rating: 5,
    result: "Promoted to MD"
  },
  {
    name: "Amanda Foster",
    role: "VP of Engineering",
    company: "FAANG Company",
    image: "/testimonial-amanda.jpg",
    text: "The customized roadmap was a game-changer. It gave me a clear path from Senior Manager to VP. The priority support helped me navigate every challenge along the way.",
    rating: 5,
    result: "Senior Manager → VP"
  }
];

export default function VIPBundlePage() {
  const coursesValue = 197 + 397 + 247 + 247 + 197 + 197 + 197; // $1,679
  const vipServicesValue = 1500 + 800 + 500; // $2,800
  const totalValue = coursesValue + vipServicesValue; // $4,479
  const bundlePrice = 2497;
  const savings = totalValue - bundlePrice;
  const savingsPercent = Math.round((savings / totalValue) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-executive-team.jpg"
            alt="Executive team background"
            fill
            className="object-cover object-top opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950" />
        </div>
        
        {/* Gold/Amber Gradient Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.1),transparent_60%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            {/* VIP Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-2 border-amber-400/50 text-amber-200 px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl shadow-amber-500/20">
              <Crown className="w-6 h-6 text-amber-400" />
              VIP EXECUTIVE BUNDLE • LIMITED AVAILABILITY
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              The <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">Executive Fast-Track</span>
              <br />to Six-Figure Success
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              All 7 courses <strong className="text-white">PLUS</strong> personalized 1-on-1 executive coaching, a customized career roadmap, and 30 days of priority support.
            </p>
            
            {/* Exclusive Badge */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold border border-amber-500/30">
                <Lock className="w-4 h-4" />
                Only 10 Spots Per Month
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">
                <Gift className="w-4 h-4" />
                Founding Member Pricing
              </div>
            </div>
            
            {/* Price Comparison */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-8">
              <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl shadow-amber-500/20">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-widest">Total Value</div>
                <div className="text-4xl font-bold text-slate-500 line-through mb-1">$9,997</div>
              </div>
              <div className="text-amber-500 text-4xl font-black">→</div>
              <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-2xl p-8 text-center shadow-2xl shadow-amber-500/40">
                <div className="text-sm text-slate-900/80 mb-1 uppercase tracking-widest font-bold">VIP Bundle Price</div>
                <div className="text-6xl font-black text-slate-900 mb-1">$2,497</div>
              </div>
            </div>
            
            <div className="inline-block bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 px-10 py-5 rounded-full text-2xl font-bold mb-8 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
              Save ${savings.toLocaleString()} ({savingsPercent}% OFF)
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <Link
                href="https://buy.stripe.com/8x214mepH2DZ4hKcW808g0p"
                className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-slate-900 px-14 py-7 rounded-xl text-2xl font-black shadow-2xl shadow-amber-500/50 transition-all hover:scale-105"
              >
                <Crown className="w-6 h-6 mr-2" />
                Claim Your VIP Spot - $2,497
                <ArrowRight className="ml-2" />
              </Link>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-12 max-w-2xl mx-auto text-left">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The "Career Insurance" Guarantee</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Complete all modules and your strategy session. If you don't see a clear path to a 10x ROI on your investment within 30 days, email us for a full refund. No questions asked. <strong className="text-white">You keep all the templates and your customized roadmap.</strong>
                </p>
              </div>
              
              <p className="text-orange-400 font-bold mt-8 text-xl">⚠️ Only 3 VIP Spots Remaining for January — Price increases to $9,997 after January 12th</p>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-2 text-slate-400">
              <BadgeCheck className="w-5 h-5 text-amber-400" />
              <span>Fortune 100 Trained</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>5.0 VIP Rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>$800-1,200/hr Coaching Value</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Heart className="w-5 h-5 text-pink-400" />
              <span>100% Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: Your Executive Fast-Track</h2>
          <div className="shadow-2xl border-2 border-amber-500/30 rounded-xl overflow-hidden">
            <LazyVimeoPlayer
              videoId="1148748639"
              title="VIP Million Dollar Bundle"
            />
          </div>
        </div>
      </section>

      {/* What Makes VIP Different Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-500/20 text-amber-300 px-6 py-2 rounded-full text-sm font-bold mb-4 border border-amber-500/30">
              EXCLUSIVE VIP BENEFITS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Sets VIP Apart
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Beyond the courses, you get personalized attention that transforms knowledge into results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {vipBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/40 rounded-2xl p-8 hover:scale-105 transition-all hover:shadow-2xl hover:shadow-amber-500/20">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                    <span className="text-amber-400 font-bold">{benefit.value} value</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
          
          {/* VIP Services Total */}
          <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">VIP Services Value: ${vipServicesValue.toLocaleString()}</h3>
            <p className="text-slate-300 text-lg">Personalized coaching and support that accelerates your results 10x faster than courses alone</p>
          </div>
        </div>
      </section>

      {/* All 7 Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/20 text-purple-300 px-6 py-2 rounded-full text-sm font-bold mb-4 border border-purple-500/30">
              COMPLETE COURSE LIBRARY
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All 7 Premium Courses Included
            </h2>
            <p className="text-xl text-slate-400">
              ${coursesValue.toLocaleString()} worth of courses, yours forever
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {courses.map((course, idx) => {
              const Icon = course.icon;
              return (
                <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:border-amber-500/50 transition-all">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{course.name}</div>
                    <div className="text-amber-400 text-xs">{course.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>21+ Hours of Content</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>7 Certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Free Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Testimonials */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-500/20 text-amber-300 px-6 py-2 rounded-full text-sm font-bold mb-4 border border-amber-500/30">
              VIP SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Results from VIP Members
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-900/50 border-2 border-amber-500/30 rounded-2xl p-8 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                  {testimonial.result}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/50">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-amber-400 text-sm">{testimonial.role}</div>
                    <div className="text-slate-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Math Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The ROI Math
            </h2>
            <p className="text-xl text-slate-400">
              Why VIP members see 10-50x returns on their investment
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-amber-500/30 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-slate-700">
                <span className="text-slate-300 text-lg">Average salary increase after VIP program</span>
                <span className="text-emerald-400 text-2xl font-bold">+$47,000/year</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-700">
                <span className="text-slate-300 text-lg">Average time to promotion</span>
                <span className="text-emerald-400 text-2xl font-bold">6 months</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-700">
                <span className="text-slate-300 text-lg">Your VIP investment</span>
                <span className="text-amber-400 text-2xl font-bold">$2,497</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-emerald-500/10 rounded-xl px-4">
                <span className="text-white text-xl font-bold">First-year ROI</span>
                <span className="text-emerald-400 text-3xl font-black">1,782%</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-center mt-8 text-sm">
              *Based on average outcomes from VIP members. Individual results may vary.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Summary */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Everything Included in VIP
          </h2>
          
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-2 border-amber-500/40 rounded-2xl p-8 md:p-12">
            <div className="space-y-4">
              {[
                { item: "All 7 Premium Courses (21+ hours)", value: "$1,679" },
                { item: "1-Hour Private Strategy Session", value: "$1,500" },
                { item: "Customized Career Roadmap Document", value: "$800" },
                { item: "30-Day Priority Support Access", value: "$500" },
                { item: "7 Professional Certificates", value: "Included" },
                { item: "Lifetime Access to All Content", value: "Included" },
                { item: "All Future Course Updates", value: "Included" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <span className="text-white text-lg">{item.item}</span>
                  </div>
                  <span className="text-amber-400 font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            
	            <div className="mt-8 pt-8 border-t-2 border-amber-500/30">
	              <div className="flex justify-between items-center mb-4">
	                <span className="text-slate-400 text-xl">Total Value:</span>
	                <span className="text-slate-400 text-2xl line-through">$9,997</span>
	              </div>
	              <div className="flex justify-between items-center">
	                <span className="text-white text-2xl font-bold">Your VIP Price:</span>
	                <span className="text-amber-400 text-4xl font-black">$2,497</span>
	              </div>
                <p className="text-orange-400 font-bold mt-6 text-center">⚠️ Price increases to $9,997 on January 12th</p>
	            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "How quickly can I schedule my strategy session?",
                a: "Within 7 days of purchase, you'll receive a link to book your 1-hour strategy session at a time that works for you. Most members book within the first 48 hours."
              },
              {
                q: "What happens during the strategy session?",
                a: "We'll review your current situation, identify your biggest opportunities, and create a customized 90-day action plan. You'll leave with clarity on exactly what to do next."
              },
              {
                q: "How does the 30-day priority support work?",
                a: "After your strategy session, you'll have direct access to our team via email for 30 days. Ask questions, get feedback on your progress, and receive guidance when you need it."
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes! If you're not completely satisfied within 30 days, we'll refund your entire investment. No questions asked."
              },
              {
                q: "Why is VIP limited to 10 spots per month?",
                a: "To ensure every VIP member receives personalized attention and high-quality coaching, we limit enrollment. This ensures we can deliver on our promise of transformation."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            <Lock className="w-4 h-4" />
            Only 10 VIP Spots Available This Month
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Your Executive Fast-Track Awaits
          </h2>
          <p className="text-2xl text-white/90 mb-4">
            Join the elite professionals who've invested in personalized transformation.
          </p>
          <p className="text-xl text-white/80 mb-8">
            All 7 courses + 1-on-1 coaching + customized roadmap + 30-day support
          </p>
          
          <Link
            href="https://buy.stripe.com/8x214mepH2DZ4hKcW808g0p"
            className="inline-flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 px-14 py-7 rounded-xl text-2xl font-black shadow-2xl transition-all hover:scale-105"
          >
            <Crown className="w-6 h-6 mr-2 text-amber-400" />
            Claim Your VIP Spot - $2,497
            <ArrowRight className="ml-2" />
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/80 text-sm">
            <span>✓ 30-Day Money-Back Guarantee</span>
            <span>✓ Lifetime Course Access</span>
            <span>✓ Strategy Session Within 7 Days</span>
          </div>
          
          <p className="text-white/60 text-sm mt-8">
            Questions? Email support@milliondollarblueprint.ai
          </p>
        </div>
      </section>
    </div>
  );
}
