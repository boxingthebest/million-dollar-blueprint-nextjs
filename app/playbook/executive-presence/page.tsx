"use client";

import { useEffect } from "react";
import { CheckCircle2, Download, Users, Video, Play, FileText, MessageCircle } from "lucide-react";

export default function ExecutivePresence() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoModules = [
    {
      title: "Module 1: Advanced Salary Negotiation",
      videos: [
        { title: "The Psychology of Salary Negotiation", duration: "12 min" },
        { title: "Building Your Compensation Case", duration: "15 min" },
        { title: "Timing Your Ask for Maximum Impact", duration: "10 min" },
      ]
    },
    {
      title: "Module 2: Strategic Relationship Building",
      videos: [
        { title: "Identifying Key Stakeholders", duration: "8 min" },
        { title: "The Art of Executive Networking", duration: "14 min" },
        { title: "Building Allies Across Functions", duration: "11 min" },
      ]
    },
    {
      title: "Module 3: Leadership Presence",
      videos: [
        { title: "Commanding Respect Without Authority", duration: "13 min" },
        { title: "Executive Body Language", duration: "9 min" },
        { title: "Speaking with Gravitas", duration: "12 min" },
      ]
    },
    {
      title: "Module 4: Navigating Office Politics",
      videos: [
        { title: "Reading the Room", duration: "10 min" },
        { title: "Managing Up Effectively", duration: "14 min" },
        { title: "Handling Difficult Conversations", duration: "16 min" },
      ]
    },
    {
      title: "Module 5: Personal Brand & Visibility",
      videos: [
        { title: "Crafting Your Executive Story", duration: "11 min" },
        { title: "Strategic Visibility Tactics", duration: "13 min" },
        { title: "Building Your Reputation", duration: "10 min" },
      ]
    }
  ];

  const downloadableResources = [
    { title: "Salary Negotiation Email Templates", icon: FileText },
    { title: "Career Roadmap Planner", icon: FileText },
    { title: "Executive Communication Frameworks", icon: FileText },
    { title: "Meeting Prep Worksheets", icon: FileText },
    { title: "1-on-1 Conversation Guides", icon: FileText },
    { title: "Strategic Visibility Checklist", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <CheckCircle2 className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to the Executive Presence Course!
          </h1>
          <p className="text-2xl text-emerald-50 mb-4">
            You now have lifetime access to the complete Executive Presence system—the same course included in our $597-$797 bundles.
          </p>
          <p className="text-lg text-emerald-100">
            Everything you need is below: 15+ advanced masterclasses, downloadable frameworks, community access, and quarterly coaching calls.
          </p>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 Quick Start Guide</h2>
          <ol className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
              <span>Watch the video modules below in order (or jump to topics you need most)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
              <span>Download the frameworks and templates to implement immediately</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
              <span>Join the private community to connect with other ambitious professionals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
              <span>Mark your calendar for the next quarterly Q&A call (check your email for dates)</span>
            </li>
          </ol>
        </div>

        {/* Video Library */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Video className="w-8 h-8 text-slate-900" />
            <h2 className="text-3xl font-bold text-slate-900">Video Library</h2>
          </div>
          <div className="space-y-6">
            {videoModules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {module.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{video.title}</div>
                          <div className="text-sm text-slate-600">{video.duration}</div>
                        </div>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                        Watch Now →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Download className="w-8 h-8 text-slate-900" />
            <h2 className="text-3xl font-bold text-slate-900">Downloadable Resources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {downloadableResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{resource.title}</div>
                      <div className="text-sm text-slate-600">PDF Download</div>
                    </div>
                    <Download className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Access */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-slate-900" />
            <h2 className="text-3xl font-bold text-slate-900">Community Access</h2>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Join the Private Community</h3>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Connect with ambitious professionals climbing to $400K+. Share wins, ask questions, get support, and build strategic relationships with people on the same journey.
                </p>
                <a
                  href="https://community.milliondollarblueprint.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Access Community →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quarterly Calls */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">📅 Quarterly Group Q&A Calls</h3>
          <p className="text-slate-700 mb-4">
            Get your questions answered, share challenges, and stay accountable with live group coaching sessions. Check your email for the next call date and Zoom link.
          </p>
          <p className="text-sm text-slate-600">
            Can't make it live? All calls are recorded and available in your member area within 24 hours.
          </p>
        </div>
      </div>

      {/* Upsell to Full Bundle */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Want the Complete System?</h2>
          <p className="text-xl text-slate-300 mb-8">
            You've unlocked Executive Presence. Get all 7 courses (AI-Resistant Skills, Sales, Leadership, Marketing, Wellness, Wealth Building) for just $597.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg transition-colors"
          >
            View All Courses →
          </a>
        </div>
      </div>
    </div>
  );
}
