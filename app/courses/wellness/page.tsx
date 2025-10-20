"use client";

import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
            <a 
              href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base"
            >
              Enroll Now - $197
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/course-wellness.jpg')] opacity-10 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              ⚡ Limited Founding Member Pricing
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Work 40 Hours.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Achieve 80-Hour Results.
              </span>
              <br />
              Without Burnout.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-6">
              Executive wellness protocols from Amazon, Apple, Google & Goldman Sachs
            </p>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              The secret to peak performance isn't working harder—it's working smarter. Top executives at Amazon, Apple, and Google don't burn out because they've mastered the science of sustainable high performance. These aren't wellness tips—they're evidence-based protocols used by Fortune 100 leaders.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-emerald-400 mb-1">40h</div>
                <div className="text-sm text-slate-400">Work Weeks</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-teal-400 mb-1">0%</div>
                <div className="text-sm text-slate-400">Burnout Rate</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-400 mb-1">96%</div>
                <div className="text-sm text-slate-400">Better Energy</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400 mb-1">187</div>
                <div className="text-sm text-slate-400">Students</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 md:px-12 py-4 md:py-6 rounded-lg text-lg md:text-xl font-bold shadow-2xl shadow-emerald-500/50 transition-all"
              >
                Enroll Now - $197 <ArrowRight className="ml-2" />
              </a>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              ✓ 30-Day Money-Back Guarantee &nbsp;&nbsp; ✓ Lifetime Access &nbsp;&nbsp; ✓ Instant Access
            </p>
          </div>
        </div>
      </section>

      {/* Course Content Preview */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              The Executive Energy System™
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 text-center">
              Five pillars of sustainable high performance used by Fortune 100 executives
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Energy Management", desc: "The Goldman Sachs 90-minute productivity protocol" },
                { title: "Cognitive Optimization", desc: "The Google 'Deep Work' framework for unshakeable focus" },
                { title: "Physical Resilience", desc: "The minimum effective dose for executive fitness" },
                { title: "Emotional Regulation", desc: "Managing stress in high-stakes situations" },
                { title: "Purpose Alignment", desc: "The McKinsey 'Meaning Matrix' for career fulfillment" }
              ].map((module, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                  <p className="text-slate-300">{module.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all shadow-2xl"
              >
                Get Full Access Now - $197
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

