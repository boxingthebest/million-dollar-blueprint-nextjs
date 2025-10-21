"use client"

import { useState, useEffect } from "react"
import { Download, Check, ArrowRight, Play, Unlock, ChevronRight, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FreeVideoCourse() {
  const [hasAccess, setHasAccess] = useState(false)
  const [activeVideo, setActiveVideo] = useState(0)
  const [completedVideos, setCompletedVideos] = useState<number[]>([])
  const [showProfileForm, setShowProfileForm] = useState(false)
  
  // Email gate form data
  const [emailGateData, setEmailGateData] = useState({
    email: "",
    firstName: "",
    lastName: ""
  })
  const [isSubmittingEmailGate, setIsSubmittingEmailGate] = useState(false)
  const [emailGateMessage, setEmailGateMessage] = useState("")
  
  // Extended profile form data
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    age: "",
    gender: "",
    phone: "",
    company: "",
    yearsExperience: "",
    industry: "",
    role: "",
    challenge: "",
    goal: "",
    timeline: ""
  })
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
  const [profileSubmitMessage, setProfileSubmitMessage] = useState("")

  // Check if user already has access (stored in localStorage)
  useEffect(() => {
    const accessGranted = localStorage.getItem('courseAccessGranted')
    if (accessGranted === 'true') {
      setHasAccess(true)
    }
  }, [])

  const videos = [
    {
      id: 1,
      title: "Introduction: The AI Revolution & Your Career",
      duration: "1:32",
      vimeoUrl: "https://vimeo.com/1128979353",
      description: "Discover why traditional career advice is obsolete and what skills will make you irreplaceable in the AI era."
    },
    {
      id: 2,
      title: "Skill #1: Strategic Thinking",
      duration: "4:09",
      vimeoUrl: "https://vimeo.com/1128986794",
      description: "Learn the frameworks Fortune 100 executives use to make million-dollar decisions that AI can't replicate."
    },
    {
      id: 3,
      title: "Skill #2: Emotional Intelligence",
      duration: "4:38",
      vimeoUrl: "https://vimeo.com/1128990641",
      description: "Master the human connection skills that drive influence, leadership, and career advancement."
    },
    {
      id: 4,
      title: "Skill #3: Creative Problem-Solving",
      duration: "3:38",
      vimeoUrl: "https://vimeo.com/1128994962",
      description: "Unlock the creative thinking patterns that separate top performers from everyone else."
    },
    {
      id: 5,
      title: "Skill #4: Relationship Building",
      duration: "3:38",
      vimeoUrl: "https://vimeo.com/1128999628",
      description: "Build the strategic relationships that accelerate your career and open doors AI never could."
    },
    {
      id: 6,
      title: "Skill #5: Adaptive Learning",
      duration: "3:40",
      vimeoUrl: "https://vimeo.com/1129000237",
      description: "Develop the meta-skill that ensures you stay ahead no matter how fast technology evolves."
    }
  ]

  const handleEmailGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingEmailGate(true)
    setEmailGateMessage("")

    try {
      // Submit minimal data to Mailchimp
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailGateData.email,
          firstName: emailGateData.firstName,
          lastName: emailGateData.lastName,
          // Required fields with placeholder values
          city: "Not provided",
          state: "Not provided",
          country: "Not provided",
          role: "Lead Magnet Signup",
          challenge: "Accessing free course",
          goal: "Learn AI-proof skills",
          timeline: "Not specified"
        }),
      })

      if (response.ok) {
        // Grant access
        setHasAccess(true)
        localStorage.setItem('courseAccessGranted', 'true')
        // Prevent popup from showing again
        localStorage.setItem('hasSeenLeadMagnet', 'true')
        setEmailGateMessage("✓ Success! Enjoy your free training.")
      } else {
        setEmailGateMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setEmailGateMessage("Network error. Please try again.")
    } finally {
      setIsSubmittingEmailGate(false)
    }
  }

  const handleVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId])
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingProfile(true)
    setProfileSubmitMessage("")

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        setProfileSubmitMessage("✓ Thank you! We'll send you personalized recommendations soon.")
        setProfileData({ email: "", firstName: "", lastName: "", city: "", state: "", country: "", age: "", gender: "", phone: "", company: "", yearsExperience: "", industry: "", role: "", challenge: "", goal: "", timeline: "" })
        setTimeout(() => setShowProfileForm(false), 3000)
      } else {
        setProfileSubmitMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setProfileSubmitMessage("Network error. Please try again.")
    } finally {
      setIsSubmittingProfile(false)
    }
  }

  const getVimeoEmbedUrl = (vimeoUrl: string) => {
    const videoId = vimeoUrl.split("/").pop()
    return `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`
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

      {!hasAccess ? (
        // EMAIL GATE - Show this first before any content
        <section className="relative py-16 md:py-24 overflow-hidden min-h-screen flex items-center">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Headline */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Get Instant Access to
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500">
                    5 Skills AI Can't Replace
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-300 mb-6">
                  Free Video Training + PDF Guide
                </p>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Taught by advisors from Amazon, Apple, Google, Goldman Sachs & McKinsey
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-[#0f1729]/50 border border-cyan-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                    6
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Video Lessons</div>
                </div>
                <div className="bg-[#0f1729]/50 border border-orange-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
                    21m
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Expert Training</div>
                </div>
                <div className="bg-[#0f1729]/50 border border-emerald-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
                    100%
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Free Access</div>
                </div>
                <div className="bg-[#0f1729]/50 border border-purple-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
                    PDF
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Guide Included</div>
                </div>
              </div>

              {/* Email Gate Form */}
              <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-4 py-2 rounded-full mb-4">
                    <Unlock className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold text-sm">INSTANT ACCESS</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Enter Your Details to Get Started
                  </h2>
                  <p className="text-slate-400">
                    No credit card required • 100% free forever
                  </p>
                </div>

                <form onSubmit={handleEmailGateSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={emailGateData.firstName}
                          onChange={(e) => setEmailGateData({...emailGateData, firstName: e.target.value})}
                          placeholder="John"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={emailGateData.lastName}
                          onChange={(e) => setEmailGateData({...emailGateData, lastName: e.target.value})}
                          placeholder="Doe"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
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
                        value={emailGateData.email}
                        onChange={(e) => setEmailGateData({...emailGateData, email: e.target.value})}
                        placeholder="john@example.com"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  {emailGateMessage && (
                    <div className={`p-4 rounded-lg ${emailGateMessage.includes('✓') ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                      {emailGateMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingEmailGate}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-5 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmittingEmailGate ? (
                      "Getting Your Access..."
                    ) : (
                      <>
                        Get Instant Access
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>No Credit Card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>100% Free</span>
                    </div>
                  </div>
                </form>
              </div>

              {/* What You'll Learn */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-start gap-3 bg-[#0f1729]/30 border border-slate-800/50 rounded-lg p-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {video.id}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{video.title}</h4>
                        <p className="text-slate-400 text-sm">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // CONTENT - Show this after email gate is passed
        <>
          {/* Hero Section */}
          <section className="relative py-16 md:py-20 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,146,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
            
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-5 py-2 rounded-full mb-8">
                  <Unlock className="w-4 h-4 text-green-400" />
                  <span className="text-white font-semibold text-sm">UNLOCKED: FREE ACCESS</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Free Video Training:
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500">
                    5 Skills AI Can't Replace
                  </span>
                </h1>
                
                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                  Taught by advisors from Amazon, Apple, Google, Goldman Sachs & McKinsey
                </p>

                <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
                  The World Economic Forum predicts 85 million jobs will be displaced by AI by 2025. But there are 5 human skills AI will never replicate. Master them, and you'll be irreplaceable.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                  <div className="bg-[#0f1729]/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                      6
                    </div>
                    <div className="text-slate-400 text-sm font-medium">Video Lessons</div>
                  </div>
                  <div className="bg-[#0f1729]/50 border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 mb-2">
                      21m
                    </div>
                    <div className="text-slate-400 text-sm font-medium">Expert Training</div>
                  </div>
                  <div className="bg-[#0f1729]/50 border border-emerald-500/20 rounded-xl p-6 hover:border-emerald-500/40 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-2">
                      100%
                    </div>
                    <div className="text-slate-400 text-sm font-medium">Free Access</div>
                  </div>
                  <div className="bg-[#0f1729]/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-2">
                      PDF
                    </div>
                    <div className="text-slate-400 text-sm font-medium">Guide Included</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/5SkillsAICantReplace.pdf"
                    download
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF Guide
                  </a>
                  <a
                    href="#video-player"
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Videos Below
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>100% Free Forever</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Player Section */}
          <section id="video-player" className="py-16 md:py-24 bg-[#0f1729]/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Video Player */}
                  <div className="lg:col-span-2">
                    <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl">
                      <div className="aspect-video bg-black">
                        <iframe
                          src={getVimeoEmbedUrl(videos[activeVideo].vimeoUrl)}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          onEnded={() => handleVideoComplete(videos[activeVideo].id)}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                          <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-semibold">
                            Lesson {activeVideo + 1} of {videos.length}
                          </span>
                          <span>{videos[activeVideo].duration}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {videos[activeVideo].title}
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                          {videos[activeVideo].description}
                        </p>
                      </div>
                    </div>

                    {/* Next Lesson Button */}
                    {activeVideo < videos.length - 1 && (
                      <button
                        onClick={() => setActiveVideo(activeVideo + 1)}
                        className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                      >
                        Next Lesson →
                      </button>
                    )}
                  </div>

                  {/* Course Content Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-6 sticky top-24">
                      <h3 className="text-xl font-bold text-white mb-4">Course Content</h3>
                      <div className="text-sm text-slate-400 mb-6">
                        {completedVideos.length} of {videos.length} completed
                      </div>
                      <div className="space-y-3">
                        {videos.map((video, index) => (
                          <button
                            key={video.id}
                            onClick={() => setActiveVideo(index)}
                            className={`w-full text-left p-4 rounded-lg transition-all ${
                              activeVideo === index
                                ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30"
                                : "bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                completedVideos.includes(video.id)
                                  ? "bg-green-500"
                                  : activeVideo === index
                                  ? "bg-gradient-to-r from-orange-500 to-pink-500"
                                  : "bg-slate-700"
                              }`}>
                                {completedVideos.includes(video.id) ? (
                                  <Check className="w-4 h-4 text-white" />
                                ) : (
                                  <span className="text-white text-xs font-bold">{index + 1}</span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-semibold text-sm mb-1 line-clamp-2">
                                  {video.title}
                                </div>
                                <div className="text-slate-400 text-xs">
                                  {video.duration}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Form Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0f1e] to-[#0f1729]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {!showProfileForm ? (
                  <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Want Personalized Career Strategies?
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                      Tell us your biggest career challenge and we'll send you targeted recommendations from our premium courses
                    </p>
                    <button
                      onClick={() => setShowProfileForm(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-500/30 inline-flex items-center gap-2"
                    >
                      Get My Recommendations
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#0f1729] border border-slate-800/50 rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-white mb-2 text-center">
                      Tell Us About Your Goals
                    </h2>
                    <p className="text-slate-400 text-center mb-8">
                      We'll send you personalized strategies based on your situation
                    </p>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            placeholder="John"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            placeholder="Doe"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      {/* Location */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={profileData.city}
                            onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                            placeholder="New York"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            State/Province *
                          </label>
                          <input
                            type="text"
                            value={profileData.state}
                            onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                            placeholder="NY"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Country *
                          </label>
                          <input
                            type="text"
                            value={profileData.country}
                            onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                            placeholder="USA"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Optional Demographics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Age (Optional)
                          </label>
                          <input
                            type="number"
                            value={profileData.age}
                            onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                            placeholder="30"
                            min="18"
                            max="100"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Gender (Optional)
                          </label>
                          <select
                            value={profileData.gender}
                            onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                          >
                            <option value="">Prefer not to say</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Company (Optional)
                          </label>
                          <input
                            type="text"
                            value={profileData.company}
                            onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                            placeholder="Acme Corp"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Industry (Optional)
                          </label>
                          <input
                            type="text"
                            value={profileData.industry}
                            onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                            placeholder="Technology, Finance, Healthcare, etc."
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Years of Experience (Optional)
                          </label>
                          <select
                            value={profileData.yearsExperience}
                            onChange={(e) => setProfileData({...profileData, yearsExperience: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                          >
                            <option value="">Select experience</option>
                            <option value="0-2 years">0-2 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="6-10 years">6-10 years</option>
                            <option value="11-15 years">11-15 years</option>
                            <option value="16+ years">16+ years</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          What's your current role? *
                        </label>
                        <input
                          type="text"
                          value={profileData.role}
                          onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                          placeholder="e.g., Marketing Manager, Software Engineer, Consultant"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          What's your biggest career challenge right now? *
                        </label>
                        <textarea
                          value={profileData.challenge}
                          onChange={(e) => setProfileData({...profileData, challenge: e.target.value})}
                          placeholder="e.g., Stuck in current position, need to develop leadership skills, want to transition industries"
                          required
                          rows={3}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          What's your ultimate career goal? *
                        </label>
                        <input
                          type="text"
                          value={profileData.goal}
                          onChange={(e) => setProfileData({...profileData, goal: e.target.value})}
                          placeholder="e.g., Become VP of Marketing, Start my own business, Double my income"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          What's your timeline to achieve this? *
                        </label>
                        <select
                          value={profileData.timeline}
                          onChange={(e) => setProfileData({...profileData, timeline: e.target.value})}
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          <option value="">Select timeline</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="2+ years">2+ years</option>
                        </select>
                      </div>

                      {profileSubmitMessage && (
                        <div className={`p-4 rounded-lg ${profileSubmitMessage.includes('✓') ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                          {profileSubmitMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingProfile}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingProfile ? "Submitting..." : "Get My Personalized Recommendations"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready for the Advanced Training?
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Take your career to the next level with our premium courses from Fortune 100 executives
                </p>
                <Link
                  href="/#courses"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
                >
                  Explore Premium Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

