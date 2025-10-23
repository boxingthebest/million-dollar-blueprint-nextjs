'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Mail } from 'lucide-react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const courseSlug = searchParams.get('courseSlug') || 'ai-resistant-skills-paid'
  const [loading, setLoading] = useState(true)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
    
    // Auto-redirect to Lesson 1 after 3 seconds
    const redirectTimer = setTimeout(() => {
      setRedirecting(true)
      // Redirect to the course learn page which will show Lesson 1
      window.location.href = `/learn/${courseSlug}`
    }, 3000)

    return () => clearTimeout(redirectTimer)
  }, [courseSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-white mt-4">Processing your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-white-tagline.png" alt="Million Dollar Blueprint" className="h-12" />
          </Link>
        </div>
      </nav>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Million Dollar Blueprint!
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Your payment was successful. Get ready to transform your career.
          </p>
          
          {redirecting && (
            <p className="text-cyan-400 font-semibold mb-6 animate-pulse">
              Redirecting you to your course...
            </p>
          )}

          {/* Success Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              {/* What Happens Next */}
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  What Happens Next
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Check your email</strong> - We've sent your receipt and course access details to your inbox
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Access your courses</strong> - Log in to your account to start learning immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Join the community</strong> - Connect with 10,000+ professionals in our private community
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Track your progress</strong> - Monitor your learning journey and course completion
                    </span>
                  </li>
                </ul>
              </div>

              {/* Order Details */}
              {sessionId && (
                <div className="text-left pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400">
                    Order ID: <span className="text-cyan-400 font-mono">{sessionId}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              Access Your Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="bg-slate-700/50 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Need help? Contact us at{' '}
              <a href="mailto:hello@milliondollarblueprint.ai" className="text-cyan-400 hover:text-cyan-300">
                hello@milliondollarblueprint.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

