'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function VerifyNewsletterContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    // Verify the newsletter subscription
    fetch(`/api/newsletter/verify?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      })
      .catch(error => {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 p-8">
          {status === 'loading' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Confirming Your Subscription
              </h1>
              <p className="text-slate-300">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Subscription Confirmed! 🎉
              </h1>
              <p className="text-slate-300 mb-6">
                {message}
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-300 mb-2">
                  <strong className="text-emerald-400">What's Next?</strong>
                </p>
                <ul className="text-sm text-slate-400 space-y-1 text-left">
                  <li>✓ You'll receive exclusive strategies and insights</li>
                  <li>✓ Early access to new courses</li>
                  <li>✓ Special offers and discounts</li>
                  <li>✓ Weekly tips for success</li>
                </ul>
              </div>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all"
              >
                Back to Home
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Verification Failed
              </h1>
              <p className="text-slate-300 mb-6">
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all"
                >
                  Try Subscribing Again
                </Link>
                <Link
                  href="/contact"
                  className="block px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          © {new Date().getFullYear()} Million Dollar Blueprint. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default function VerifyNewsletterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <VerifyNewsletterContent />
    </Suspense>
  )
}

