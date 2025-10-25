"use client"

import React from 'react'
import { BookOpen, Zap, TrendingUp } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: BookOpen,
      title: "Choose Your Path",
      description: "Select from our McKinsey-level courses in Sales, Leadership, Marketing, or Wealth. Or get the complete bundle and save $100.",
      gradient: "from-orange-500 to-pink-500",
      bgGradient: "from-orange-500/10 to-pink-500/10"
    },
    {
      number: "02",
      icon: Zap,
      title: "Master Fortune 100 Frameworks",
      description: "Learn the exact strategies used at Amazon, Apple, Google, Goldman Sachs & McKinsey. Battle-tested frameworks that actually work.",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Transform Your Results",
      description: "Apply what you learn immediately. See measurable improvements in your performance, income, and career trajectory within weeks.",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-500/10 to-green-500/10"
    }
  ]

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 px-6 py-3 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-purple-400 text-2xl">🚀</span>
            <span className="text-white font-semibold">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Path to Success in 3 Steps
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Start transforming your career today with our proven, step-by-step system
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div 
                key={index}
                className="relative group"
              >
                {/* Connector Line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent z-0" />
                )}

                {/* Card */}
                <div className={`relative bg-gradient-to-br ${step.bgGradient} backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 z-10`}>
                  {/* Step Number */}
                  <div className={`absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}>
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-orange-500/50 transition-all hover:scale-105"
          >
            Start Your Transformation Now →
          </a>
          <p className="text-slate-400 mt-4">30-Day Money-Back Guarantee • Lifetime Access</p>
        </div>
      </div>
    </section>
  )
}

