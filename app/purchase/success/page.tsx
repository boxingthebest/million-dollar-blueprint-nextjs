"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import FuturisticBackground from "@/components/FuturisticBackground";

export default function PurchaseSuccessPage() {
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <FuturisticBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {step === "welcome" ? (
            // Welcome/Congratulations Screen
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 text-center">
              {/* Success Icon with Animation */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse"></div>
                  <CheckCircle className="relative w-24 h-24 text-green-400 animate-bounce" />
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🎉 Congratulations!
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-8">
                Your Purchase is Complete
              </p>

              {/* Course Info */}
              <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl p-6 mb-8 border border-orange-500/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <p className="text-lg text-white font-semibold">You now have access to:</p>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Sales Mastery Course
                </h2>
                <p className="text-blue-200 mt-2">
                  The frameworks that scaled companies from $500K to $50B+
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Next Step</h3>
                <p className="text-blue-200 text-center mb-4">
                  Create your password to access your course and start learning immediately.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setStep("setup")}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Set Up Your Account
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Support */}
              <p className="text-blue-300 text-sm mt-6">
                Questions? Email us at{" "}
                <a href="mailto:support@milliondollarblueprint.ai" className="text-amber-400 hover:underline">
                  support@milliondollarblueprint.ai
                </a>
              </p>
            </div>
          ) : (
            // Account Setup Screen
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
                {/* Email (read-only) */}
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
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          )}
        </div>
      </div>
    </div>
  );
}

