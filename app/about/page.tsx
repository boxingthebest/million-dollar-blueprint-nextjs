"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedCounter from '@/components/AnimatedCounter';
import StickyCTABar from '@/components/StickyCTABar';
import { Linkedin, Award, TrendingUp, Users, Briefcase, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 sticky top-0 z-50 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <Link href="/" className="flex items-center drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Image src="/logo-transparent.png" alt="Million Dollar Blueprint" width={800} height={365} className="h-16 w-auto md:h-20 transition-all hover:scale-105" style={{imageRendering: 'auto', filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'}} priority />
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Democratizing </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Elite Career Intelligence</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            The frameworks that build billion-dollar companies shouldn't be locked behind<br />
            $50,000 executive coaching programs.
          </p>
        </div>
      </section>

      {/* FOUNDER SECTION - NEW! */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Your Mentor</h2>
            <p className="text-xl text-slate-300">22+ Years of Elite Experience, Distilled Into Actionable Frameworks</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan-500/10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
                <Image 
                  src="/dana-penza-headshot.png" 
                  alt="Dana Penza - Founder & CEO" 
                  width={600} 
                  height={600}
                  className="relative rounded-2xl shadow-2xl border-2 border-cyan-500/30"
                />
              </div>

              {/* Bio */}
              <div>
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Dana Penza</h3>
                  <p className="text-xl text-cyan-400 font-semibold mb-4">Founder & CEO</p>
                  <div className="flex items-center gap-2 text-slate-300">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    <span>Syracuse University - Finance & Marketing</span>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p className="text-lg">
                    Dana Penza is not a theoretical coach. He is a <span className="text-white font-semibold">battle-tested executive with 22+ years</span> of experience at the world's most elite companies, having driven <span className="text-cyan-400 font-semibold">hundreds of millions of dollars in revenue</span> and scaled businesses from $10M to over $100M.
                  </p>
                  <p>
                    From the cloud revolution at <span className="text-white font-semibold">Amazon Web Services (AWS)</span> to the high-stakes world of <span className="text-white font-semibold">Goldman Sachs</span> and transformative tech startups like <span className="text-white font-semibold">Rubrik, Citrix, and Perfecto</span>, Dana has seen what "good" looks like at the highest levels.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">22+</div>
                    <div className="text-sm text-slate-400">Years Experience</div>
                  </div>
                  <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">$100M+</div>
                    <div className="text-sm text-slate-400">Revenue Driven</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Highlights */}
            <div className="mt-12 pt-12 border-t border-slate-700">
              <h4 className="text-2xl font-bold text-white mb-8 text-center">Career Highlights</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Amazon */}
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white">Amazon Web Services</h5>
                      <p className="text-sm text-cyan-400">Account Director</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Led strategic enterprise accounts during the cloud revolution, gaining unparalleled insight into how the world's most innovative companies scale.
                  </p>
                </div>

                {/* Goldman Sachs */}
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white">Goldman Sachs & Wall Street</h5>
                      <p className="text-sm text-cyan-400">Analyst</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Built analytical foundation working with elite financial institutions including JPMorgan Chase and Citi, mastering high-stakes corporate strategy.
                  </p>
                </div>

                {/* Startups */}
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-white">Tech Startups</h5>
                      <p className="text-sm text-cyan-400">Sales Leader & Advisor</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Key player at Rubrik, Citrix, and Perfecto. Helped scale companies from $10M to $100M+ and through successful IPOs and acquisitions.
                  </p>
                </div>
              </div>
            </div>

            {/* The Why Story */}
            <div className="mt-12 pt-12 border-t border-slate-700">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-7 h-7 text-cyan-400" />
                  Why Million Dollar Blueprint?
                </h4>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p className="text-lg">
                    After helping Fortune 500 companies scale billions in revenue and watching multiple startups grow from $10M to $100M+, Dana recognized a disturbing pattern: <span className="text-white font-semibold">talented professionals were hitting a ceiling not because they lacked ability, but because they lacked access to the insider frameworks</span> used at elite companies.
                  </p>
                  <p>
                    The strategies that drove success at Amazon, Goldman Sachs, and high-growth startups weren't taught in business schools or available in books. They were proprietary knowledge passed down through mentorship—creating an unfair advantage for those on the inside.
                  </p>
                  <p className="text-white font-semibold text-lg">
                    Dana created Million Dollar Blueprint with one mission: democratize the playbook of the elite and give everyone the blueprint to change the trajectory of their life and career.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="mt-12 pt-12 border-t border-slate-700">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Commitment to Giving Back</h4>
              <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed text-center">
                  Beyond the boardroom, Dana has led <span className="text-white font-semibold">career-building workshops</span> with organizations like <span className="text-cyan-400 font-semibold">YearUp</span> and <span className="text-cyan-400 font-semibold">New York Cares</span>, and provided personal mentorship to countless professionals seeking to unlock their potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              <p>
                After more than 22 years navigating the corridors of Fortune 100 companies and high-growth startups, a pattern emerged: 
                success wasn't correlated with effort, credentials, or even intelligence. It was about 
                mastering specific frameworks—insider knowledge passed down through mentorship at firms 
                like Amazon, Goldman Sachs, and elite tech companies.
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
                Million Dollar Blueprint was founded to close that gap—to give ambitious professionals access to the same frameworks that drive success at the world's most elite companies.
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
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="text-red-400 text-4xl font-bold mb-4">$50K+</div>
              <h3 className="text-xl font-semibold text-white mb-3">Executive Coaching</h3>
              <p className="text-slate-400">
                Elite frameworks locked behind prohibitive price points, accessible only to C-suite executives.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="text-amber-400 text-4xl font-bold mb-4">5 Years</div>
              <h3 className="text-xl font-semibold text-white mb-3">Skill Obsolescence</h3>
              <p className="text-slate-400">
                Average lifespan of technical skills before AI and automation render them commoditized.
              </p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
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
                  Distilled from 22+ years at Amazon, Goldman Sachs, and high-growth tech companies. 
                  Not theory—battle-tested frameworks with proven ROI that have driven hundreds of millions in revenue.
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
                <h3 className="text-xl font-semibold text-white mb-2">Real-World Application</h3>
                <p className="text-slate-300 leading-relaxed">
                  Every framework has been tested in the trenches—from scaling startups to $100M+ to managing 
                  strategic accounts at the world's most innovative companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-4 bg-slate-900/30">
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
            Ready to Access the Insider's Playbook?
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

      {/* Sticky CTA Bar */}
      <StickyCTABar />
    </div>
  );
}

