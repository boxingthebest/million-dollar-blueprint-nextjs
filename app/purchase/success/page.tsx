"use client";

import { Suspense } from "react";
import { CheckCircle, Mail, ArrowRight, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

function PurchaseSuccessContent() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/purchase-success-hero-v2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-900/90 z-[5]" />
      
      {/* Main Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-6 py-3 mb-8 animate-pulse">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-green-300 font-semibold uppercase tracking-wider text-sm">
              Payment Successful
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Million Dollar
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Blueprint
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-blue-200 mb-4 max-w-4xl mx-auto">
            You've Just Unlocked Elite-Level Training
          </p>
          <p className="text-lg md:text-xl text-blue-300 mb-12 max-w-3xl mx-auto">
            Join ambitious professionals transforming their careers with frameworks from Amazon, Goldman Sachs & McKinsey
          </p>

          {/* Email Check Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-pink-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 md:p-12 mb-12 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Check Your Email
            </h2>
            
            <p className="text-lg md:text-xl text-blue-200 mb-6">
              We've sent you an email with instructions to set up your account and access your course.
            </p>

            {/* Instructions */}
            <div className="bg-white/10 rounded-2xl p-6 mb-6 text-left">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Next Steps:
              </h3>
              <ol className="space-y-3 text-blue-200">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                  <span>Click the "Set Up Your Account" link in the email</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                  <span>Create your password</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                  <span>Start learning immediately!</span>
                </li>
              </ol>
            </div>

            {/* Course Info */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Your Course Access</h3>
              </div>
              <p className="text-blue-200 mb-4">
                Sales Mastery: The Blueprint for High-Ticket Closing
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-white mb-1">6</div>
                  <div className="text-xs text-blue-300">Modules</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-white mb-1">40+</div>
                  <div className="text-xs text-blue-300">Lessons</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-white mb-1">∞</div>
                  <div className="text-xs text-blue-300">Lifetime</div>
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-600 hover:via-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-orange-500/50 hover:scale-105"
            >
              Already Set Up? Sign In
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Support */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-blue-300 text-sm mb-2">
              <strong className="text-white">Didn't receive the email?</strong>
            </p>
            <p className="text-blue-300 text-sm">
              Check your spam folder or contact us at{" "}
              <a href="mailto:support@milliondollarblueprint.ai" className="text-amber-400 hover:underline font-semibold">
                support@milliondollarblueprint.ai
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <HeroSectionDivider />
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <PurchaseSuccessContent />
    </Suspense>
  );
}

