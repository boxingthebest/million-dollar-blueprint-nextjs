"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Play, DollarSign, Clock, Zap, Users, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MakeFirst1KPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: 'course',
          productKey: 'makeFirst1K',
          successUrl: `${window.location.origin}/welcome?course=make-first-1k-ai`,
          cancelUrl: `${window.location.origin}/courses/make-first-1k-ai?canceled=true`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const modules = [
    {
      number: 1,
      title: "Your First $200 Service",
      description: "The exact AI service you can sell to local businesses tonight. No experience needed.",
    },
    {
      number: 2,
      title: "The AI Workflow",
      description: "Step-by-step ChatGPT process. Research, prompt, refine, deliver. Under 1 hour.",
    },
    {
      number: 3,
      title: "From $200 to $2,000",
      description: "Turn one-time clients into $300/month recurring revenue. Scale to $10K+.",
    },
  ];

  const faqs = [
    {
      question: "Do I need any tech experience?",
      answer: "No. If you can use Google and type, you can do this. The course shows you exactly what to click, what to type, and what to say. Zero coding, zero technical skills required."
    },
    {
      question: "How quickly can I make my first $200?",
      answer: "Some students land their first client within 48 hours. The 5-a-Day method means you're reaching out to potential clients immediately. Your first $200 could come this week."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "30-day money-back guarantee. If you don't feel the course delivered value, email us for a full refund. No questions asked."
    },
    {
      question: "Is this just another 'make money online' scam?",
      answer: "No hype, no fluff. This is a simple service business model: you help local businesses with AI, they pay you. Real work, real clients, real money. The course shows you exactly how."
    },
    {
      question: "Why is it only $47?",
      answer: "Because I want you to actually do it. A $47 course removes the excuse. If you can't invest $47 in yourself, you're not serious about making extra income. This price makes it a no-brainer."
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Nav */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={160} height={48} className="h-10 w-auto" />
          </Link>
        </div>
      </nav>

      {/* Hero Section - Above the Fold */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Social Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-green-400 text-sm font-medium">New Course</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-300 text-sm">Start earning this week</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Make Your First{" "}
              <span className="text-green-400">$1,000</span>{" "}
              with AI
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              I made my first $1,000 with AI in two weeks. Zero tech experience. 
              This course shows you exactly how.
            </motion.p>

            {/* Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mb-10 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Under 1 hour to complete</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span>$200 per service</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400" />
                <span>Start tonight</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-black font-bold text-xl px-12 py-5 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    Get Instant Access — $47
                    <ArrowRight className="inline ml-2 w-6 h-6" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Risk Reversal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-sm"
            >
              30-day money-back guarantee • Instant access • Lifetime updates
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Math Section */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              The Simple Math
            </h2>
            
            <div className="bg-gray-900 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-green-400 mb-2">$200</div>
                  <div className="text-gray-400">Per service</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-4xl text-gray-600">×</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-green-400 mb-2">5</div>
                  <div className="text-gray-400">Clients</div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                <div className="text-6xl font-bold text-white mb-2">= $1,000</div>
                <div className="text-gray-400">Your first month</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              What You'll Learn
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Three modules. Everything you need. Nothing you don't.
            </p>

            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-black font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      {module.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-gray-400">{module.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              This Is For You If...
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "You want extra income but don't know where to start",
                "You've heard about AI but don't know how to use it",
                "You're tired of courses that don't give you real steps",
                "You want something you can start tonight, not next year",
                "You're willing to do the work if someone shows you how",
                "You want a skill that's actually in demand right now",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Questions? Answers.
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/50 transition-colors"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Make Your First $1,000?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              One simple service. Five clients. $1,000 in your pocket.
              <br />
              The course takes less than an hour. You could start tonight.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-black font-bold text-xl px-12 py-5 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25 mb-6"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Get Instant Access — $47
                  <ArrowRight className="inline ml-2 w-6 h-6" />
                </>
              )}
            </button>

            <p className="text-gray-500 text-sm mb-8">
              30-day money-back guarantee • Instant access • Lifetime updates
            </p>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Million Dollar Blueprint. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
