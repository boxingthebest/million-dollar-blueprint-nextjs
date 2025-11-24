"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Sparkles, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

function PurchaseSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"welcome" | "setup">("welcome");

  useEffect(() => {
    // Get email from URL params if available
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSetupAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to sign in
        router.push("/auth/signin?success=account_created");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to set up account");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "setup") {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <FuturisticBackground />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Create Your Password
                </h2>
                <p className="text-blue-200">
                  Set up your account to access your course
                </p>
              </div>

              <form onSubmit={handleSetupAccount} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? "Creating Account..." : "Create Account & Access Course"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep("welcome")}
                  className="w-full text-blue-300 hover:text-white transition-colors"
                >
                  ← Back
                </button>
              </form>

              {/* Already have account */}
              <div className="mt-6 text-center">
                <p className="text-blue-300 text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-amber-400 hover:underline font-semibold">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen - Full Hero Style
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

          {/* Course Access Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-pink-600/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 md:p-12 mb-12 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Sales Mastery Course
              </h2>
            </div>
            <p className="text-lg text-blue-200 mb-6">
              The frameworks that scaled companies from <span className="text-amber-400 font-bold">$500K to $50B+</span>
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">6</div>
                <div className="text-sm text-blue-300">Modules</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">40+</div>
                <div className="text-sm text-blue-300">Lessons</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">∞</div>
                <div className="text-sm text-blue-300">Lifetime Access</div>
              </div>
            </div>

            {/* Next Step */}
            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold text-white">Next Step</h3>
              </div>
              <p className="text-blue-200">
                Create your password to access your course and start learning immediately
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setStep("setup")}
              className="w-full bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 hover:from-orange-600 hover:via-pink-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all shadow-2xl hover:shadow-orange-500/50 hover:scale-105 flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Set Up Your Account & Start Learning
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Support */}
          <p className="text-blue-300 text-sm">
            Questions? Email us at{" "}
            <a href="mailto:support@milliondollarblueprint.ai" className="text-amber-400 hover:underline font-semibold">
              support@milliondollarblueprint.ai
            </a>
          </p>
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

