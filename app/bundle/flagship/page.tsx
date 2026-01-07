"use client";

import { ArrowRight, CheckCircle2, Brain, Zap, Target, Award, Clock, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

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
            className="object-cover object-top opacity-55"
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
              The <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">AI Income Accelerator Bundle™</span>
            </h1>
            <p className="text-xl text-orange-300 font-semibold mb-4">
              Two Proven Systems. One Goal: Your First $1,000 This Month.
            </p>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              The fastest path to your first $1,000 in the AI economy. Combine <strong className="text-white">Get Paid to Train AI</strong> and <strong className="text-white">Make Your First $1K with AI</strong> to start earning this week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center shadow-2xl shadow-orange-500/20">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-widest">Total Value</div>
                <div className="text-4xl font-bold text-slate-500 line-through mb-1">$688</div>
              </div>
              <div className="text-orange-500 text-4xl font-black">→</div>
              <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg p-6 text-center shadow-2xl shadow-orange-500/40">
                <div className="text-sm text-white/80 mb-1 uppercase tracking-widest">Bundle Price</div>
                <div className="text-5xl font-black text-white mb-1">$397</div>
              </div>
            </div>
            <div className="inline-block bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-8">
              Save $291 (42% OFF)
            </div>
            
            <Link
              href="https://buy.stripe.com/14A28q0yRa6rbKc3ly08g0n"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all hover:scale-105"
            >
              Get Started Now - $397 <ArrowRight className="ml-2" />
            </Link>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-12 max-w-2xl mx-auto text-left">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">The "Career Insurance" Guarantee</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Complete all modules. If you don't see measurable improvement in your career within 30 days, email us for a full refund. No questions asked. <strong className="text-white">You keep all the templates and resources.</strong>
              </p>
            </div>
            
            <p className="text-orange-400 font-bold mt-8 text-xl">⚠️ Founding Member Pricing Ends January 15th — Price increases to $688 after</p>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
	          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: Your Path to $1,000</h2>
	          <div className="shadow-2xl border-2 border-orange-500/30 rounded-xl overflow-hidden">
	            <LazyVimeoPlayer
	              videoId="1151497816"
	              title="AI Cash-Flow Duo - Start Earning"
	            />
	          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
	          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
	            What's Included in the AI Cash-Flow Duo
	          </h2>
	          
	          <div className="grid md:grid-cols-2 gap-8 mb-12">
	            {/* Get Paid to Train AI */}
	            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-2 border-orange-500/50 rounded-2xl p-8 hover:scale-105 transition-all">
	              <div className="flex items-center gap-4 mb-6">
	                <div className="bg-orange-500 p-4 rounded-xl">
	                  <Brain className="w-8 h-8 text-white" />
	                </div>
	                <div>
	                  <h3 className="text-3xl font-bold text-white">Get Paid to Train AI</h3>
	                  <p className="text-orange-300 text-lg">Value: $197</p>
	                </div>
	              </div>
	              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
	                Master the "hidden job market" of the AI era. Learn how to make $50-$200/hour training AI models for the world's leading tech companies.
	              </p>
	              <ul className="space-y-3 text-slate-300">
	                <li className="flex items-start gap-2">
	                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
	                  <span>8 comprehensive video modules (3 hours)</span>
	                </li>
	                <li className="flex items-start gap-2">
	                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
	                  <span>AI Trainer Job Board Access</span>
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

	            {/* Make Your First $1K with AI */}
	            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-2xl p-8 hover:scale-105 transition-all">
	              <div className="flex items-center gap-4 mb-6">
	                <div className="bg-cyan-500 p-4 rounded-xl">
	                  <Target className="w-8 h-8 text-white" />
	                </div>
	                <div>
	                  <h3 className="text-3xl font-bold text-white">Make Your First $1K</h3>
	                  <p className="text-cyan-300 text-lg">Value: $491</p>
	                </div>
	              </div>
	              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
	                One simple AI service you can sell to local businesses for $200. Do it 5 times, and you've made your first $1,000. Complete step-by-step system.
	              </p>
	              <ul className="space-y-3 text-slate-300">
	                <li className="flex items-start gap-2">
	                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
	                  <span>5 comprehensive video modules (2 hours)</span>
	                </li>
	                <li className="flex items-start gap-2">
	                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
	                  <span>Client Outreach Templates</span>
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
		            <h3 className="text-3xl font-bold text-white mb-4">Total Bundle Value: $688</h3>
		            <p className="text-4xl text-emerald-400 font-black mb-4">Your Price: $397</p>
		            <p className="text-xl text-slate-300 uppercase tracking-widest">You Save: <span className="text-emerald-400 font-bold">$291 (42% OFF)</span></p>
	              <p className="text-orange-400 font-bold mt-4">⚠️ Price increases to $688 on January 15th</p>
		          </div>
        </div>
      </section>

      {/* Why This Bundle Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
	          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
	            Why This Duo Works
	          </h2>
	          
	          <div className="grid md:grid-cols-3 gap-8">
	            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-orange-500/50 transition-all">
	              <Clock className="w-16 h-16 text-orange-400 mx-auto mb-4" />
	              <h3 className="text-2xl font-bold text-white mb-4">Speed to Income</h3>
	              <p className="text-slate-300 leading-relaxed">
	                No fluff. No theory. We focus on the exact tasks and services that companies are paying for right now. Start earning in your first week.
	              </p>
	            </div>
	            
	            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all">
	              <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
	              <h3 className="text-2xl font-bold text-white mb-4">Proven Frameworks</h3>
	              <p className="text-slate-300 leading-relaxed">
	                Don't guess what works. Use our proven outreach templates and service delivery frameworks to land and satisfy your first clients.
	              </p>
	            </div>
	            
	            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500/50 transition-all">
	              <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
	              <h3 className="text-2xl font-bold text-white mb-4">Stackable Success</h3>
	              <p className="text-slate-300 leading-relaxed">
	                Once you make your first $1,000, you'll have the confidence and the capital to scale into our more advanced professional programs.
	              </p>
	            </div>
	          </div>
        </div>
      </section>

	      {/* Final CTA Section */}
	      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-pink-600">
	        <div className="max-w-4xl mx-auto text-center">
	          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
	            Ready to Make Your First $1,000?
	          </h2>
	          <p className="text-2xl text-white mb-8">
	            Join 440+ professionals who are using AI to create immediate cash flow.
	          </p>
          
	          <Link
	            href="https://buy.stripe.com/14A28q0yRa6rbKc3ly08g0n"
	            className="inline-flex items-center justify-center bg-white text-orange-600 hover:bg-slate-100 px-12 py-6 rounded-lg text-xl font-bold shadow-2xl transition-all hover:scale-105"
	          >
	            Get Started Now - $397 <ArrowRight className="ml-2" />
	          </Link>
            <p className="text-white font-bold mt-6 text-xl italic">"The best investment I've made in my career. Period."</p>
	          <p className="text-white/80 text-sm mt-6">30-Day "Career Insurance" Guarantee | Lifetime Access | Instant Access</p>
        </div>
      </section>
    </div>
  );
}
