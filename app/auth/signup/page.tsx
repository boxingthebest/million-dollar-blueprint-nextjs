"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseSlug = searchParams.get('course') || 'ai-resistant-skills-paid'
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const courses = [
    {
      title: "AI-Resistant Skills",
      subtitle: "Future-Proof Your Career",
      description: "Master the 5 human skills AI will never replace. From the boardrooms of AWS & Goldman Sachs.",
      price: "$197",
      originalPrice: "$395",
      icon: "🧠",
      available: true,
      enrolled: "253 enrolled"
    },
    {
      title: "The Executive Energy System",
      subtitle: "Turn Burnout Into Breakthrough",
      description: "What Fortune 100 executives pay $2,997 for in executive coaching. Yours for $197.",
      price: "$197",
      originalPrice: "$395",
      icon: "💓",
      available: true,
      enrolled: "187 enrolled"
    },
    {
      title: "Sales Mastery",
      subtitle: "Close High-Ticket Deals",
      description: "The exact sales frameworks used to scale companies from $500K to $50B+.",
      price: "$247",
      originalPrice: "$495",
      icon: "📈",
      available: false,
      enrolled: "Coming Soon"
    },
    {
      title: "Leadership & Influence",
      subtitle: "Command Any Room",
      description: "Fortune 100 leadership strategies for executive presence and influence.",
      price: "$247",
      originalPrice: "$495",
      icon: "👥",
      available: false,
      enrolled: "Coming Soon"
    },
    {
      title: "Digital Marketing Mastery",
      subtitle: "Grow Your Brand Online",
      description: "Enterprise-level digital marketing tactics that drive real revenue.",
      price: "$197",
      originalPrice: "$395",
      icon: "📊",
      available: false,
      enrolled: "Coming Soon"
    },
    {
      title: "Wealth Building",
      subtitle: "Financial Intelligence",
      description: "Build lasting wealth with strategies from Wall Street insiders.",
      price: "$197",
      originalPrice: "$395",
      icon: "💰",
      available: false,
      enrolled: "Coming Soon"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        setError(errorText || "Something went wrong")
        setLoading(false)
        return
      }

      // Auto sign in after successful signup
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Account created but sign in failed. Please try signing in.")
      } else {
        // Redirect to dashboard after successful signup
        router.push("/dashboard")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Image
              src="/logo-main-desktop.png"
              alt="Million Dollar Blueprint"
              width={200}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">
              ⚡ Step 1 of 2: Create Your Account
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Choose Your Transformation
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join 253 professionals who are future-proofing their careers with McKinsey-level frameworks. Create your account to access all courses.
          </p>
        </div>

        {/* Course Catalog Preview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            What You'll Get Access To:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`bg-slate-900/50 border ${
                  course.available ? 'border-cyan-500/30' : 'border-slate-800'
                } rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:transform hover:scale-105 relative`}
              >
                {!course.available && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      COMING SOON
                    </span>
                  </div>
                )}
                
                <div className="text-4xl mb-4">{course.icon}</div>
                
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-cyan-400 text-sm mb-3">{course.subtitle}</p>
                <p className="text-slate-400 text-sm mb-4 min-h-[60px]">{course.description}</p>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-white">{course.price}</span>
                  <span className="text-slate-500 line-through">{course.originalPrice}</span>
                  <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded">
                    Save 50%
                  </span>
                </div>
                
                <p className="text-slate-500 text-sm">{course.enrolled}</p>
              </div>
            ))}
          </div>

          {/* Bundle Offer Teaser */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 text-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🎁 BEST VALUE
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Complete Mastery Bundle</h3>
            <p className="text-slate-300 mb-4 max-w-2xl mx-auto">
              Get ALL 6 courses for <span className="text-purple-400 font-bold">$697</span> (normally $1,282) - Save $585!
            </p>
            <p className="text-slate-400 text-sm">
              Available after you create your account
            </p>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-slate-900/70 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Free Account</h2>
              <p className="text-slate-400">Start your transformation journey today</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                  Create Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Minimum 6 characters"
                />
                <p className="mt-2 text-xs text-slate-500">Use at least 6 characters for security</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-cyan-500/25"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Your Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Free Account
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>

              <p className="text-xs text-center text-slate-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  )
}

