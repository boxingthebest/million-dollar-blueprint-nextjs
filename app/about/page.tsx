"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image src="/logo-main-desktop.png" alt="Million Dollar Blueprint" width={800} height={365} className="h-16 w-auto md:h-20" />
            </Link>
            <div className="flex gap-8">
              <Link href="/" className="text-slate-300 hover:text-white transition">Home</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
              <Link href="/#courses" className="text-slate-300 hover:text-white transition">Courses</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Democratizing Elite<br />Career Intelligence
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            The frameworks that build billion-dollar companies shouldn't be locked behind<br />
            $50,000 executive coaching programs.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>
                After more than 25 years navigating the corridors of Fortune 100 companies, a pattern emerged: 
                success wasn't correlated with effort, credentials, or even intelligence. It was about 
                mastering specific frameworks—insider knowledge passed down through mentorship at firms 
                like McKinsey, Goldman Sachs, and Amazon.
              </p>
              <p>
                These weren't taught in business schools. They weren't available in books. They were 
                proprietary systems that separated the top 1% from everyone else.
              </p>
              <p>
                Meanwhile, the market was flooded with courses teaching skills that would be obsolete 
                within five years. AI was rapidly commoditizing technical expertise. The gap between 
                what people were learning and what actually mattered was widening.
              </p>
              <p className="text-white font-medium pt-4">
                Million Dollar Blueprint was founded by a team of former Fortune 100 executives with over 25 years of combined experience to close that gap. Our founding team includes veterans from Amazon, Google, Goldman Sachs, and McKinsey who saw the same problem from different vantage points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">The Market Failure</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
              <div className="text-red-400 text-4xl font-bold mb-4">$50K+</div>
              <h3 className="text-xl font-semibold text-white mb-3">Executive Coaching</h3>
              <p className="text-slate-400">
                Elite frameworks locked behind prohibitive price points, accessible only to C-suite executives.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
              <div className="text-amber-400 text-4xl font-bold mb-4">5 Years</div>
              <h3 className="text-xl font-semibold text-white mb-3">Skill Obsolescence</h3>
              <p className="text-slate-400">
                Average lifespan of technical skills before AI and automation render them commoditized.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
              <div className="text-emerald-400 text-4xl font-bold mb-4">0%</div>
              <h3 className="text-xl font-semibold text-white mb-3">Practical Application</h3>
              <p className="text-slate-400">
                Traditional education focuses on theory, not the battle-tested systems used by elite firms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Methodology</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Proprietary Frameworks</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our team of 25+ year veterans has distilled the exact systems used by Fortune 100 companies 
                  to scale to billions in revenue. Not theory—battle-tested frameworks with proven ROI from 
                  Amazon, Google, Goldman Sachs, and McKinsey.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Resistant Skills</h3>
                <p className="text-slate-300 leading-relaxed">
                  Exclusive focus on capabilities that cannot be automated: strategic influence, high-stakes 
                  negotiation, organizational navigation, and executive presence.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Measurable Outcomes</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our students report an average salary increase of $47,000 within 12 months. We optimize 
                  for career ROI, not completion rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Track Record</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                10,000+
              </div>
              <div className="text-slate-400">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                $47K
              </div>
              <div className="text-slate-400">Avg. Salary Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                92%
              </div>
              <div className="text-slate-400">Career Advancement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                4.9/5
              </div>
              <div className="text-slate-400">Student Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Operating Principles</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Substance Over Marketing</h3>
                <p className="text-slate-300 leading-relaxed">
                  We don't promise overnight transformations or get-rich-quick schemes. We provide 
                  frameworks that compound over decades.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Lifetime Value</h3>
                <p className="text-slate-300 leading-relaxed">
                  One investment, perpetual access. All courses include lifetime updates as we refine 
                  and expand our curriculum.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Risk Reversal</h3>
                <p className="text-slate-300 leading-relaxed">
                  30-day unconditional money-back guarantee. If you don't see immediate applicability, 
                  we'll refund every dollar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join 10,000+ Professionals
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Invest in frameworks that compound for decades, not skills that expire in years.
          </p>
          <Link 
            href="/#courses"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm">
          <p>*Photos used on this site are for illustrative purposes and may include stock photography.</p>
          <p className="mt-2">Results vary by individual effort and market conditions. Past performance does not guarantee future results.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

