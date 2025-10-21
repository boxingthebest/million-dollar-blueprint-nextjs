"use client"

import { useState, useEffect } from "react"
import { X, Download, ArrowRight, Check } from "lucide-react"

export default function LeadMagnetPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenLeadMagnet")
    if (hasSeenPopup) return

    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Check localStorage again to get the latest value
      const currentHasSeenPopup = localStorage.getItem("hasSeenLeadMagnet")
      if (e.clientY <= 0 && !currentHasSeenPopup) {
        setIsVisible(true)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenLeadMagnet", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("🎉 Success! Redirecting to your free video course...")
        setEmail("")
        
        // Redirect to video course page after 2 seconds
        setTimeout(() => {
          window.location.href = "/free-video-course"
        }, 2000)
      } else {
        setSubmitStatus("error")
        setSubmitMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Network error. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-500/20 max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Futuristic Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.03)_1px,transparent_1px)] bg-[size:32px_32px] rounded-2xl" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Content */}
          <div className="relative p-8 md:p-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
              <Download className="w-4 h-4 text-orange-400" />
              <span className="text-white font-semibold text-sm">FREE DOWNLOAD</span>
            </div>
            
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Wait! Get Your Free Guide:
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500">
                5 Skills AI Can't Replace
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-300 mb-6">
              Discover the exact skills that will future-proof your career and make you irreplaceable in the age of AI.
            </p>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Proven strategies from Fortune 100 executives</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">Actionable steps you can implement today</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">No fluff - just battle-tested insights</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">100% free, instant access</span>
              </div>
            </div>
            
            {/* Form */}
            {submitStatus !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-orange-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? "Sending..." : "Get Free Video Guide"} <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
                
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm">{submitMessage}</p>
                )}
                
                <p className="text-slate-400 text-xs text-center">
                  🔒 We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-xl text-white font-semibold mb-2">{submitMessage}</p>
                <p className="text-slate-400">This popup will close automatically...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

