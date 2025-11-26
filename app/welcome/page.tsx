"use client";

import { useEffect } from "react";
import { CheckCircle2, Mail, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Success Header */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/50">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
              Payment Successful! 🎉
            </h1>

            <p className="text-2xl text-slate-300 mb-8">
              Welcome to Million Dollar Blueprint
            </p>

            {/* Email Notice */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Check Your Email 📧
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    We just sent you a welcome email with instructions to set your password and access your courses.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-left">
                <p className="text-sm font-semibold text-cyan-400 mb-3">
                  What's in your email:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span>Link to set your password</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span>Direct access to your student dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span>Getting started guide</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
            >
              <BookOpen className="w-6 h-6" />
              Access Your Courses Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-slate-400 text-sm mt-6">
              You can set your password now or later using the link in your email
            </p>
          </div>
        </div>
      </div>

      {/* What Happens Next Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Happens Next?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Check Your Email
              </h3>
              <p className="text-slate-300 text-sm">
                Open the welcome email we just sent you (check spam if you don't see it)
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Set Your Password
              </h3>
              <p className="text-slate-300 text-sm">
                Click the link in the email to create your password (takes 30 seconds)
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Start Learning
              </h3>
              <p className="text-slate-300 text-sm">
                Access your dashboard and start your first lesson immediately
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Need Help?
          </h3>
          <p className="text-slate-300 mb-4">
            If you don't receive the email within 5 minutes, check your spam folder or contact us.
          </p>
          <p className="text-cyan-400 font-medium">
            support@milliondollarblueprint.ai
          </p>
        </div>
      </div>
    </div>
  );
}
