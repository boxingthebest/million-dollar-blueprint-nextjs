"use client"

import { useState } from "react"
import { Download, Check, ArrowRight, Play, Unlock, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FreeVideoCourse() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [completedVideos, setCompletedVideos] = useState<number[]>([])
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [profileData, setProfileData] = useState({
    role: "",
    challenge: "",
    goal: "",
    timeline: ""
  })
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false)
  const [profileSubmitMessage, setProfileSubmitMessage] = useState("")

  const videos = [
    {
      id: 1,
      title: "Introduction: The AI Revolution & Your Career",
      duration: "5:32",
      vimeoUrl: "https://vimeo.com/1128979353",
      description: "Discover why traditional career advice is obsolete and what skills will make you irreplaceable in the AI era."
    },
    {
      id: 2,
      title: "Skill #1: Strategic Thinking",
      duration: "6:15",
      vimeoUrl: "https://vimeo.com/1128986794",
      description: "Learn the frameworks Fortune 100 executives use to make million-dollar decisions that AI can't replicate."
    },
    {
      id: 3,
      title: "Skill #2: Emotional Intelligence",
      duration: "5:48",
      vimeoUrl: "https://vimeo.com/1128990641",
      description: "Master the human connection skills that drive influence, leadership, and career advancement."
    },
    {
      id: 4,
      title: "Skill #3: Creative Problem-Solving",
      duration: "6:22",
      vimeoUrl: "https://vimeo.com/1128994962",
      description: "Unlock the creative thinking patterns that separate top performers from everyone else."
    },
    {
      id: 5,
      title: "Skill #4: Relationship Building",
      duration: "5:55",
      vimeoUrl: "https://vimeo.com/1128999628",
      description: "Build the strategic relationships that accelerate your career and open doors AI never could."
    },
    {
      id: 6,
      title: "Skill #5: Adaptive Learning",
      duration: "6:08",
      vimeoUrl: "https://vimeo.com/1129000237",
      description: "Develop the meta-skill that ensures you stay ahead no matter how fast technology evolves."
    }
  ]

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
        setProfileData({ role: "", challenge: "", goal: "", timeline: "" })
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
                  35m
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

            {/* Download PDF Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="/5-skills-ai-cant-replace.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download PDF Guide <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#videos"
                className="inline-flex items-center gap-2 border-2 border-pink-500/50 text-pink-300 hover:bg-pink-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
              >
                Watch Videos Below
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
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
      <section id="videos" className="py-16 md:py-20 bg-[#0f1729]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <div className="bg-[#0f1729] rounded-xl overflow-hidden border border-slate-800/50 shadow-2xl">
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
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 px-3 py-1 rounded-full">
                        <span className="text-orange-400 font-semibold text-sm">Lesson {activeVideo + 1} of {videos.length}</span>
                      </div>
                      <div className="text-slate-400 text-sm">{videos[activeVideo].duration}</div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {videos[activeVideo].title}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {videos[activeVideo].description}
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                  {activeVideo > 0 && (
                    <button
                      onClick={() => setActiveVideo(activeVideo - 1)}
                      className="flex-1 bg-[#0f1729] hover:bg-slate-800 border border-slate-700 text-white px-6 py-4 rounded-lg font-semibold transition-all hover:border-cyan-500/50"
                    >
                      ← Previous Lesson
                    </button>
                  )}
                  {activeVideo < videos.length - 1 && (
                    <button
                      onClick={() => setActiveVideo(activeVideo + 1)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/30"
                    >
                      Next Lesson →
                    </button>
                  )}
                </div>
              </div>

              {/* Playlist Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[#0f1729] rounded-xl border border-slate-800/50 p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-2">Course Content</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    {completedVideos.length} of {videos.length} completed
                  </p>
                  <div className="space-y-2">
                    {videos.map((video, idx) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveVideo(idx)}
                        className={`w-full text-left p-4 rounded-lg transition-all ${
                          activeVideo === idx
                            ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50"
                            : "bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            completedVideos.includes(video.id)
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : activeVideo === idx
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                              : "bg-slate-700/50 text-slate-400 border border-slate-600"
                          }`}>
                            {completedVideos.includes(video.id) ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Play className="w-3 h-3 ml-0.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-sm mb-1 leading-snug">
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

      {/* Optional Profile Form */}
      <section className="py-16 md:py-20 bg-[#0a0f1e]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showProfileForm ? (
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Want Personalized Career Strategies?
                  </h2>
                  <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                    Tell us your biggest career challenge and we'll send you targeted recommendations from our premium courses
                  </p>
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
                  >
                    Get My Recommendations <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
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
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      What's your current role?
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
                      What's your biggest career challenge right now?
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
                      What's your ultimate career goal?
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
                      What's your timeline to achieve this?
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

                  <button
                    type="submit"
                    disabled={isSubmittingProfile}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingProfile ? "Submitting..." : "Get My Personalized Recommendations"}
                  </button>

                  {profileSubmitMessage && (
                    <p className="text-center text-green-400 font-semibold">
                      {profileSubmitMessage}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Courses CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready for the Advanced Training?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Take your career to the next level with our premium courses from Fortune 100 executives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 hover:bg-slate-100 px-10 py-4 rounded-lg font-bold text-xl transition-all shadow-2xl hover:scale-105"
              >
                Explore Premium Courses <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-lg font-bold text-xl transition-all hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
            <p className="text-white/80 text-sm mt-6">30-Day Money-Back Guarantee | Lifetime Access | Instant Access</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1e] border-t border-cyan-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Image 
                src="/logo-transparent.png" 
                alt="Million Dollar Blueprint" 
                width={800} 
                height={365} 
                className="h-16 w-auto transition-all hover:scale-105" 
                style={{imageRendering: 'auto', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))'}}
              />
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm">
            © 2025 Million Dollar Blueprint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

