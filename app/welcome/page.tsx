"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Mail, BookOpen, ArrowRight, Zap, Trophy, Target, Rocket } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Success Header */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        
        <div className={`container mx-auto px-4 py-20 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/50 animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
              🎉 You're In!
            </h1>

            <p className="text-3xl text-emerald-400 font-black mb-4">
              Payment Successful
            </p>

            <p className="text-2xl text-slate-300 mb-12 font-bold">
              Welcome to the <span className="text-white">Million Dollar Blueprint</span> — Your Career Transformation Starts Now
            </p>

            {/* Email Notice */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8 mb-8 hover:border-emerald-400 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-2xl font-black text-white mb-3">
                    📧 Check Your Email Right Now
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed font-semibold">
                    We just sent you a <span className="text-emerald-400 font-bold">welcome email</span> with instructions to set your password and access your courses immediately.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 border-2 border-slate-700 rounded-xl p-6 text-left">
                <p className="text-base font-black text-cyan-400 mb-4">
                  📋 What's in your email:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-semibold">🔐 Link to set your password (takes 30 seconds)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-semibold">🎓 Direct access to your student dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-semibold">🚀 Getting started guide to maximize results</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xl rounded-xl transition-all duration-200 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 border-2 border-emerald-400"
            >
              <BookOpen className="w-7 h-7" />
              🚀 ACCESS YOUR COURSES NOW
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-slate-400 text-base mt-6 font-semibold">
              You can set your password now or later using the link in your email
            </p>
          </div>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16">
            Your Next Steps to $400K+
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8 text-center hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 text-white font-black text-2xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-black text-white mb-3">
                📧 Check Your Email
              </h3>
              <p className="text-slate-300 text-base font-semibold leading-relaxed">
                Open the welcome email we just sent you (check spam if you don't see it in 2 minutes)
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8 text-center hover:border-emerald-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 text-white font-black text-2xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-black text-white mb-3">
                🔐 Set Your Password
              </h3>
              <p className="text-slate-300 text-base font-semibold leading-relaxed">
                Click the link in the email to create your password (takes 30 seconds)
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8 text-center hover:border-purple-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 text-white font-black text-2xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-black text-white mb-3">
                🚀 Start Learning
              </h3>
              <p className="text-slate-300 text-base font-semibold leading-relaxed">
                Access your dashboard and start your first lesson immediately—your transformation begins today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-10 text-center border-4 border-yellow-400 shadow-2xl">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white mb-6">
              You Just Made the Best Investment in Your Career
            </h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed font-semibold">
              2,000+ executives have used these frameworks to reach $400K+ salaries. The average salary increase is <span className="text-yellow-400 font-black">$127,000</span>. Your journey starts right now.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-2">97%</div>
                <p className="text-blue-100 font-semibold">Success Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <Target className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-2">18 mo</div>
                <p className="text-blue-100 font-semibold">Avg. Time to $200K+</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <Rocket className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-2">$127K</div>
                <p className="text-blue-100 font-semibold">Avg. Salary Increase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="container mx-auto px-4 py-12 pb-20">
        <div className="max-w-2xl mx-auto bg-slate-800/30 backdrop-blur-sm border-2 border-slate-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-4">
            Need Help?
          </h3>
          <p className="text-slate-300 mb-6 font-semibold text-lg">
            If you don't receive the email within 5 minutes, check your spam folder or contact us immediately.
          </p>
          <a 
            href="mailto:support@milliondollarblueprint.ai"
            className="text-cyan-400 font-black text-xl hover:text-cyan-300 transition-colors"
          >
            📧 support@milliondollarblueprint.ai
          </a>
        </div>
      </div>
    </div>
  );
}
