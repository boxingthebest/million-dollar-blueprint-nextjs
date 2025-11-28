"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, Star, Users, Zap, ArrowRight, Download, Target, Briefcase, Award, BarChart3, Rocket, Video, FileText, MessageCircle } from "lucide-react";

export default function ThankYou() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "playbook",
          productKey: "executivePresence397",
          successUrl: `${window.location.origin}/welcome`,
          cancelUrl: `${window.location.origin}/playbook/thank-you`,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout session. Please try again.");
      setIsLoading(false);
    }
  };

  const videos = [
    {
      title: "Video 1: The Goldman Sachs Framework",
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141440345?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 1_ The Goldman Sachs Framework"></iframe></div>',
      description: "Command respect in any room with the 3-pillar system used at Goldman Sachs"
    },
    {
      title: "Video 2: The Strategic Pause Technique",
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141442140?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 2_ The Strategic Pause Technique"></iframe></div>',
      description: "Control any conversation using silence as your secret weapon"
    },
    {
      title: "Video 3: Salary Negotiation Mastery",
      embedCode: '<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141443129?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 3_ Salary Negotiation Mastery"></iframe></div>',
      description: "The exact 3-step framework I used to negotiate $100K+ raises"
    },
    {
      title: "Video 4: Executive Communication",
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141459744?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 4_ Executive Communication"></iframe></div>',
      description: "Speak with authority and influence without needing a title"
    },
    {
      title: "Video 5: The Meeting Before the Meeting",
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141460242?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 5_ The Meeting Before the Meeting"></iframe></div>',
      description: "Amazon's insider strategy for winning decisions before they're made"
    },
    {
      title: "Video 6: Breaking the $120K Ceiling",
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141460954?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 6_ Breaking the $120K Ceiling"></iframe></div>',
      description: "The mindset shifts required to reach $400K+ (BONUS VIDEO)"
    }
  ];

  const courseFeatures = [
    {
      icon: Video,
      title: "15-20 Advanced Video Masterclasses",
      description: "Deep-dive training on advanced salary negotiation, executive leadership presence, strategic relationship building, navigating office politics, and career acceleration frameworks",
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Complete Framework Library",
      description: "Downloadable email scripts, negotiation worksheets, career roadmap planner, executive communication templates, and all the tools you need to implement immediately",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Private Community Access",
      description: "Connect with 2,000+ ambitious professionals climbing to $400K+. Share wins, get feedback, and build strategic relationships with peers on the same journey",
      color: "bg-emerald-500"
    },
    {
      icon: Zap,
      title: "Lifetime Access + Updates",
      description: "All current content plus any new masterclasses, frameworks, or resources added in the future. One payment, lifetime value—yours forever",
      color: "bg-orange-500"
    }
  ];

  const stats = [
    { number: "$127K", label: "Average Salary Increase", icon: TrendingUp },
    { number: "18 months", label: "Average Time to $200K+", icon: Target },
    { number: "2,000+", label: "Executives Trained", icon: Users },
    { number: "97%", label: "Success Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className={`container relative z-10 mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CheckCircle2 className="w-24 h-24 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            🎉 You're In! Welcome to the Executive Presence Playbook
          </h1>
          <p className="text-2xl text-emerald-50 mb-4 font-bold">
            Your purchase was successful. Check your email for login instructions.
          </p>
          <p className="text-xl text-emerald-100 mb-8 font-semibold">
            Start watching the 6 video masterclasses below ↓
          </p>
          
          {/* PDF Download Button */}
          <a
            href="/Executive-Presence-Playbook.pdf"
            download
            className="inline-flex items-center gap-3 bg-white text-emerald-600 font-black py-5 px-10 rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-2xl transform hover:scale-105 active:scale-95 text-lg"
          >
            <Download className="w-6 h-6" />
            📥 Download Your PDF Workbook
          </a>
        </div>
      </div>

      {/* Videos Section */}
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`${index === 5 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-emerald-600 to-teal-600'} text-white font-black px-4 py-2 rounded-full text-sm shadow-lg`}>
                      {index === 5 ? "🎁 BONUS VIDEO" : `▶️ Video ${index + 1}`}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">{video.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 font-semibold">{video.description}</p>
                  <div 
                    className="rounded-lg overflow-hidden shadow-lg"
                    dangerouslySetInnerHTML={{ __html: video.embedCode }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transition Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              You've Got the Foundation.<br />Now Get the Complete System.
            </h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              The <strong>$27 Playbook</strong> gave you 6 powerful videos to get started. But this is just <span className="text-blue-600 font-bold">20% of the complete system</span> that's helped 2,000+ executives reach $400K+ salaries.
            </p>
            <div className="bg-yellow-50 border-l-8 border-yellow-400 p-6 rounded-xl">
              <p className="text-lg font-bold text-slate-900">
                ⚡ <strong>ONE-TIME OPPORTUNITY:</strong> Upgrade to the full <strong>Executive Presence Course</strong> at exclusive pricing—available only on this page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-400 transition-all duration-300 hover:transform hover:scale-105">
                    <Icon className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400 font-semibold uppercase tracking-wide">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Course Features */}
            <div className="mb-16">
              <h3 className="text-3xl font-black mb-8 text-center">What You Get in the Complete Course</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {courseFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 hover:transform hover:-translate-y-1">
                      <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-black mb-3">{feature.title}</h4>
                      <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ROI Comparison */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 border-4 border-yellow-400">
              <h3 className="text-3xl font-black mb-8 text-center">The Math Is Simple</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-5xl font-black text-white mb-3">$397</div>
                  <p className="text-blue-100 font-semibold">Your Investment</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 transform scale-110 shadow-2xl">
                  <div className="text-5xl font-black text-white mb-3">$127K</div>
                  <p className="text-green-100 font-semibold">Average Salary Increase</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                  <div className="text-5xl font-black text-white mb-3">31,991%</div>
                  <p className="text-blue-100 font-semibold">Your ROI</p>
                </div>
              </div>
              <div className="mt-8 bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-2xl font-black mb-2">
                  Even a $10K raise gives you a 2,418% ROI
                </p>
                <p className="text-lg text-blue-100 font-semibold">
                  This isn't an expense—it's the highest-leverage investment in your career.
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-slate-800 border-4 border-emerald-400 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <p className="text-xl mb-4 text-slate-300">
                  You Paid: <span className="font-bold text-white">$27</span> for 6 videos (20% of the system)
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-4xl font-black text-slate-400 line-through">$597</span>
                  <span className="text-7xl font-black text-emerald-400">$397</span>
                </div>
                <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-black text-lg mb-4 animate-pulse">
                  🔥 67% OFF - Exclusive Upgrade Pricing
                </div>
                <p className="text-emerald-300 font-bold text-lg">
                  (Only available on this page for Playbook customers)
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-slate-800 rounded-2xl p-8 mb-12 border-2 border-slate-700">
              <h3 className="text-2xl font-black mb-6 text-center">Playbook vs. Complete Course</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-700">
                      <th className="text-left py-4 px-4 font-black text-slate-300">Feature</th>
                      <th className="text-center py-4 px-4 font-black text-slate-300">$27 Playbook</th>
                      <th className="text-center py-4 px-4 font-black text-emerald-400">$397 Course</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-semibold">Video Masterclasses</td>
                      <td className="text-center py-4 px-4">6 videos</td>
                      <td className="text-center py-4 px-4 font-bold text-emerald-400">20+ videos</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-semibold">Frameworks & Templates</td>
                      <td className="text-center py-4 px-4">Basic</td>
                      <td className="text-center py-4 px-4 font-bold text-emerald-400">Complete Library</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-semibold">Private Community</td>
                      <td className="text-center py-4 px-4">❌</td>
                      <td className="text-center py-4 px-4 font-bold text-emerald-400">✅</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-4 px-4 font-semibold">Advanced Strategies</td>
                      <td className="text-center py-4 px-4">❌</td>
                      <td className="text-center py-4 px-4 font-bold text-emerald-400">✅</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-semibold">Lifetime Updates</td>
                      <td className="text-center py-4 px-4">✅</td>
                      <td className="text-center py-4 px-4 font-bold text-emerald-400">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black py-7 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-2xl active:scale-95 border-4 border-yellow-400"
            >
              {isLoading ? "Processing..." : "🚀 UPGRADE TO COMPLETE COURSE NOW"}
              {!isLoading && <ArrowRight className="w-7 h-7" />}
            </button>

            <p className="text-center text-slate-400 mt-6 font-semibold text-lg">
              ✅ 30-Day Money-Back Guarantee • ⚡ Instant Access • 🔄 Lifetime Updates
            </p>

            <div className="mt-8 bg-yellow-50 border-l-8 border-yellow-400 p-6 rounded-xl">
              <p className="text-slate-900 font-bold text-center">
                ⏰ <strong>This exclusive upgrade pricing expires when you leave this page.</strong> Lock in $397 now before it goes to $597.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
