"use client"

import React from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  result1: string
  result2: string
  rating: number
  image?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-emerald-400 text-2xl">💎</span>
            <span className="text-white font-semibold">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Results from Real Professionals
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join hundreds of executives, entrepreneurs, and professionals who've transformed their careers with Fortune 100 frameworks
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Results */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <p className="text-emerald-400 font-bold text-sm">{testimonial.result1}</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-3">
                  <p className="text-cyan-400 font-bold text-sm">{testimonial.result2}</p>
                </div>
              </div>

              {/* Author */}
              <div className="border-t border-slate-700 pt-4">
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-slate-400 text-sm">{testimonial.role}</p>
                <p className="text-cyan-400 text-sm font-semibold">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all hover:scale-105"
          >
            Join These Success Stories →
          </a>
        </div>
      </div>
    </section>
  )
}

