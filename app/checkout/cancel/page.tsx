'use client'

import Link from 'next/link'
import { XCircle, ArrowLeft, Mail } from 'lucide-react'

export default function CheckoutCancel() {
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

      {/* Cancel Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500 mb-6">
            <XCircle className="w-10 h-10 text-orange-500" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Checkout Cancelled
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            No worries! Your payment was not processed.
          </p>

          {/* Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 mb-8">
            <div className="space-y-6 text-left">
              <h2 className="text-2xl font-bold text-white">
                What would you like to do?
              </h2>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Try again</strong> - Return to the course page and complete your purchase
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Explore other courses</strong> - Browse our complete catalog
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Get the free course</strong> - Start with our free AI-Resistant Skills video course
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Contact support</strong> - Have questions? We're here to help
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Courses
            </Link>
            <Link
              href="/free-video-course"
              className="bg-slate-700/50 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Free Course
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Need help?{' '}
              <a href="mailto:hello@milliondollarblueprint.ai" className="text-cyan-400 hover:text-cyan-300">
                hello@milliondollarblueprint.ai
              </a>
            </p>
          </div>

          {/* Money-Back Guarantee */}
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              <strong>30-Day Money-Back Guarantee</strong> - Try any course risk-free. If you're not satisfied, we'll refund 100% of your money.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

