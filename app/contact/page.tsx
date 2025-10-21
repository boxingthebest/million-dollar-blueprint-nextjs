"use client"

import { useState } from "react"
import { Mail, User, MessageSquare, Send, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Submit to Mailchimp with contact inquiry tag
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "Contact",
          city: "Not provided",
          state: "Not provided",
          country: "Not provided",
          role: "Contact Form Inquiry",
          challenge: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`,
          goal: "Contact inquiry",
          timeline: "Immediate"
        }),
      })

      if (response.ok) {
        setSubmitMessage("✓ Thank you! We'll get back to you within 24 hours.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitMessage("Something went wrong. Please try emailing us directly at support@milliondollarblueprint.ai")
      }
    } catch (error) {
      setSubmitMessage("Network error. Please try again or email us at support@milliondollarblueprint.ai")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Navigation */}
      <nav className="bg-[#0f1729]/95 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <Image 
                src="/logo-main-desktop.png" 
                alt="Million Dollar Blueprint" 
                width={600} 
                height={274} 
                className="h-12 w-auto md:h-14 transition-all hover:scale-105" 
                style={{imageRendering: 'auto'}}
              />
            </Link>
            <Link 
              href="/#courses"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-orange-500/30 text-sm md:text-base"
            >
              All Courses
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500">Touch</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Have questions? We're here to help. Send us a message and we'll respond within 24 hours.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="What's this about?"
                    required
                    className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={6}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-lg ${submitMessage.includes('✓') ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-5 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Contact Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0f1729]/50 border border-slate-800/50 rounded-xl p-6 text-center">
                <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-slate-400 text-sm">support@milliondollarblueprint.ai</p>
              </div>
              <div className="bg-[#0f1729]/50 border border-slate-800/50 rounded-xl p-6 text-center">
                <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Response Time</h3>
                <p className="text-slate-400 text-sm">Within 24 hours</p>
              </div>
              <div className="bg-[#0f1729]/50 border border-slate-800/50 rounded-xl p-6 text-center">
                <Check className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Support Hours</h3>
                <p className="text-slate-400 text-sm">Monday - Friday, 9AM - 5PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

