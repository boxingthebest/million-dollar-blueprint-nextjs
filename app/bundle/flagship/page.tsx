"use client";

import { ArrowRight, CheckCircle2, Brain, Zap, Target, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FlagshipBundlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-executive-team.jpg"
            alt="Executive team background"
            fill
            className="object-cover object-top opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950" />
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,146,60,0.15),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-orange-500/20 to-cyan-500/20 border border-orange-500/30 text-orange-300 px-6 py-3 rounded-full text-sm font-bold mb-6">
              🔥 FLAGSHIP BUNDLE • LIMITED TIME OFFER
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Master the Skills That <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">Create Real Wealth</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Combine <strong className="text-white">AI-Resistant Skills</strong> and <strong className="text-white">Executive Presence</strong> to future-proof your career and command executive-level compensation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-1">$297</div>
                <div className="text-sm text-slate-400">Bundle Price</div>
              </div>
              <div className="text-slate-400 text-2xl font-bold">vs</div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-4xl font-bold text-slate-500 line-through mb-1">$594</div>
                <div className="text-sm text-slate-400">Individual Price</div>
              </div>
            </div>
            <div className="inline-block bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-8">
              Save $297 (50% OFF)
            </div>
            
            <Link
              href="https://buy.stripe.com/test_PLACEHOLDER"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all hover:scale-105"
            >
              Get Started Now - $297 <ArrowRight className="ml-2" />
            </Link>
            <p className="text-slate-400 text-sm mt-4">✓ 30-Day Money-Back Guarantee • Lifetime Access • Instant Access</p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            What's Included in the Flagship Bundle
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* AI-Resistant Skills */}
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-2 border-orange-500/50 rounded-2xl p-8 hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-500 p-4 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">AI-Resistant Skills</h3>
                  <p className="text-orange-300 text-lg">Value: $197</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Master the 10 proprietary frameworks AI can't replicate. Future-proof your career with the exact strategies used by Fortune 100 executives at Amazon, Goldman Sachs, and McKinsey.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <span>10 comprehensive video modules (3.5 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <span>5 downloadable PDF toolkits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <span>Professional certificate of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <span>Lifetime access to all updates</span>
                </li>
              </ul>
            </div>

            {/* Executive Presence */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-2xl p-8 hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-500 p-4 rounded-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Executive Presence</h3>
                  <p className="text-cyan-300 text-lg">Value: $397</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Command any room with the executive presence frameworks used by Fortune 100 leaders. Learn to influence without authority and accelerate your path to senior leadership.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>8 comprehensive video modules (2.5 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>Executive communication templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>Professional certificate of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span>Lifetime access to all updates</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500/50 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Total Bundle Value: $594</h3>
            <p className="text-2xl text-emerald-400 font-bold mb-4">Your Price: $297</p>
            <p className="text-xl text-slate-300">You Save: <span className="text-emerald-400 font-bold">$297 (50% OFF)</span></p>
          </div>
        </div>
      </section>

      {/* Why This Bundle Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Why Combine These Two Courses?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-orange-500/50 transition-all">
              <Target className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Future-Proof Your Skills</h3>
              <p className="text-slate-300 leading-relaxed">
                AI-Resistant Skills ensures you stay irreplaceable as automation accelerates. These are the frameworks AI will never replicate.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all">
              <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Command Executive Presence</h3>
              <p className="text-slate-300 leading-relaxed">
                Executive Presence gives you the influence and gravitas to lead at the highest levels, even without formal authority.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500/50 transition-all">
              <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Accelerate to Six Figures</h3>
              <p className="text-slate-300 leading-relaxed">
                Together, these courses create a complete system for breaking into six-figure compensation and senior leadership roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Future-Proof Your Career?
          </h2>
          <p className="text-2xl text-white mb-8">
            Join 440+ professionals who are building AI-resistant skills and executive presence.
          </p>
          
          <Link
            href="https://buy.stripe.com/test_PLACEHOLDER"
            className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-slate-100 px-12 py-6 rounded-lg text-xl font-bold shadow-2xl transition-all hover:scale-105"
          >
            Get Started Now - $297 <ArrowRight className="ml-2" />
          </Link>
          <p className="text-white text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | Instant Access</p>
        </div>
      </section>
    </div>
  );
}
