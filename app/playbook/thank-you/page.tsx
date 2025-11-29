"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, TrendingUp, Star, Users, Zap, ArrowRight, Download, Target, Briefcase, Award, BarChart3, Rocket, Video, FileText, MessageCircle, Play, BookOpen, Clock, DollarSign, Shield } from "lucide-react";

export default function ThankYou() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      title: "The Goldman Sachs Framework",
      number: 1,
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141440345?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 1_ The Goldman Sachs Framework"></iframe></div>',
      description: "Command respect in any room with the 3-pillar system used at Goldman Sachs"
    },
    {
      title: "The Strategic Pause Technique",
      number: 2,
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141442140?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 2_ The Strategic Pause Technique"></iframe></div>',
      description: "Control any conversation using silence as your secret weapon"
    },
    {
      title: "Salary Negotiation Mastery",
      number: 3,
      embedCode: '<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141443129?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 3_ Salary Negotiation Mastery"></iframe></div>',
      description: "The exact 3-step framework I used to negotiate $100K+ raises"
    },
    {
      title: "Executive Communication",
      number: 4,
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141459744?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 4_ Executive Communication"></iframe></div>',
      description: "Speak with authority and influence without needing a title"
    },
    {
      title: "The Meeting Before the Meeting",
      number: 5,
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141460242?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 5_ The Meeting Before the Meeting"></iframe></div>',
      description: "Amazon's insider strategy for winning decisions before they're made"
    },
    {
      title: "Breaking the $120K Ceiling",
      number: 6,
      embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141460954?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 6_ Breaking the $120K Ceiling"></iframe></div>',
      description: "The mindset shifts required to reach $400K+ (BONUS VIDEO)",
      isBonus: true
    }
  ];

  const courseFeatures = [
    {
      icon: Video,
      title: "15-20 Advanced Video Masterclasses",
      description: "Deep-dive training on advanced salary negotiation, executive leadership presence, strategic relationship building, navigating office politics, and career acceleration frameworks",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileText,
      title: "Complete Framework Library",
      description: "Downloadable email scripts, negotiation worksheets, career roadmap planner, executive communication templates, and all the tools you need to implement immediately",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Private Community Access",
      description: "Connect with 2,000+ ambitious professionals climbing to $400K+. Share wins, get feedback, and build strategic relationships with peers on the same journey",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Lifetime Access + Updates",
      description: "All current content plus any new masterclasses, frameworks, or resources added in the future. One payment, lifetime value—yours forever",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { number: "$127K", label: "Average Salary Increase", icon: TrendingUp },
    { number: "18 months", label: "Average Time to $200K+", icon: Target },
    { number: "2,000+", label: "Executives Trained", icon: Users },
    { number: "97%", label: "Success Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Banner with Executive Background */}
      <div className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-700"
          style={{
            backgroundImage: "url('/hero-executive-suit.jpg')",
            backgroundSize: '40%',
            backgroundPosition: 'center 40%',
            transform: `translateY(${scrollY * 0.5}px) scale(1.05)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60">
            {/* Enhanced Glowing orbs */}
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            {/* Additional accent glows */}
            <div className="absolute top-10 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className={`container relative z-10 mx-auto px-4 h-full flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Welcome to the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                Executive Presence Playbook
              </span>
            </h1>
            
            <p className="text-2xl text-slate-300 mb-6 font-semibold">
              Your purchase was successful. Check your email for login instructions.
            </p>
            
            <p className="text-xl text-emerald-400 mb-8 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start watching the 6 video masterclasses below
            </p>
            
            <a
              href="/Executive-Presence-Playbook.pdf"
              download
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold py-5 px-10 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-2xl transform hover:scale-105 active:scale-95 text-lg group"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Download Your PDF Workbook
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-y border-slate-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-400 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${video.isBonus ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} text-white font-black px-5 py-2 rounded-full text-sm shadow-lg flex items-center gap-2`}>
                      {video.isBonus ? (
                        <>
                          <Star className="w-4 h-4" />
                          BONUS VIDEO
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Video {video.number}
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-white">{video.title}</h3>
                  </div>
                  <p className="text-slate-400 mb-4 font-medium">{video.description}</p>
                  <div 
                    className="rounded-lg overflow-hidden shadow-2xl"
                    dangerouslySetInnerHTML={{ __html: video.embedCode }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transition Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-6 py-3 rounded-full mb-8">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">ONE-TIME OPPORTUNITY</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              You've Got the Foundation.<br />Now Get the Complete System.
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              The <strong className="text-white">$27 Playbook</strong> gave you 6 powerful videos to get started. But this is just <span className="text-yellow-400 font-bold">20% of the complete system</span> that's helped 2,000+ executives reach $400K+ salaries.
            </p>
          </div>
        </div>
      </div>

      {/* Gap Analysis Section */}
      <div className="bg-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
              Here's The Truth: 6 Videos Won't Get You to $400K
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* What You Have */}
              <div className="bg-slate-900 border-2 border-red-500/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white">What You Have Now ($27)</h3>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">6 foundational videos (30 minutes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-300">Basic PDF workbook</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-1"></div>
                    <span className="text-red-300 line-through">NO implementation roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-1"></div>
                    <span className="text-red-300 line-through">NO advanced strategies for $200K-$400K</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-1"></div>
                    <span className="text-red-300 line-through">NO community support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-red-400 flex-shrink-0 mt-1"></div>
                    <span className="text-red-300 line-through">NO copy-paste templates</span>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 font-bold text-center">
                    Result: You'll plateau at $120K-$150K
                  </p>
                </div>
              </div>

              {/* What You Need */}
              <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-2 border-emerald-500 rounded-2xl p-8 shadow-2xl shadow-emerald-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white">What You Need ($397)</h3>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">20+ video masterclasses (3+ hours)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">Complete framework library</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">Step-by-step implementation roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">Advanced $200K-$400K strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">Private community (2,000+ executives)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white font-semibold">Copy-paste email scripts & templates</span>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <p className="text-emerald-300 font-bold text-center">
                    Result: You'll reach $400K+ in 18-24 months
                  </p>
                </div>
              </div>
            </div>

            {/* The Gap */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-red-400" />
                <h3 className="text-3xl font-black text-white">The Gap That's Costing You $250K+</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                The 6 videos give you <strong className="text-white">awareness</strong> (about 20% of the system). But without the <strong className="text-white">implementation roadmap</strong>, <strong className="text-white">advanced strategies</strong>, <strong className="text-white">scripts</strong>, and <strong className="text-white">community</strong>, most people plateau at $120K-$150K.
              </p>
              <p className="text-white text-xl font-bold">
                The Complete Course fills that gap. It's the difference between knowing and doing.
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                "I bought the $27 playbook first and tried to implement it on my own for 6 months. I got stuck at $140K. Then I upgraded to the $397 course, got the scripts, implementation guide, and community support. <strong className="text-white">8 months later, I went from $135K to $210K in total compensation (including stock and bonus incentives).</strong> The complete system made all the difference."
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold border border-emerald-500/30">
                  +$75K Total Comp
                </span>
                <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                  8 Months
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700">
                  <Image
                    src="/testimonial-jessica-kim.jpg"
                    alt="Jessica Kim"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Jessica Kim</div>
                  <div className="text-slate-400">Director of Product at Google</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <DollarSign className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                The Math Is Simple
              </h2>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-slate-400 text-sm font-semibold mb-2">Investment</div>
                  <div className="text-4xl font-black text-white">$397</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm font-semibold mb-2">Average Salary Increase</div>
                  <div className="text-4xl font-black text-emerald-400">$127K</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm font-semibold mb-2">ROI</div>
                  <div className="text-4xl font-black text-yellow-400">31,991%</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
              <p className="text-yellow-400 text-lg font-bold">
                Even a $5K raise gives you a 1,159% ROI. This is the easiest decision you'll make this year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
              What's Included in the Complete Course
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {courseFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-slate-900 border border-slate-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
              Playbook vs. Complete Course
            </h2>
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="text-left p-6 text-white font-bold">Feature</th>
                    <th className="text-center p-6 text-slate-400 font-bold">Playbook ($27)</th>
                    <th className="text-center p-6 text-emerald-400 font-bold">Complete Course ($397)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="p-6 text-slate-300">Video Masterclasses</td>
                    <td className="p-6 text-center text-slate-400">6 videos (30 min)</td>
                    <td className="p-6 text-center text-white font-bold">20+ videos (3+ hours)</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300">Framework Library</td>
                    <td className="p-6 text-center text-slate-400">Basic PDF</td>
                    <td className="p-6 text-center text-white font-bold">Complete Library</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300">Implementation Roadmap</td>
                    <td className="p-6 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 mx-auto"></div>
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300">Advanced Strategies ($200K-$400K)</td>
                    <td className="p-6 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 mx-auto"></div>
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300">Private Community Access</td>
                    <td className="p-6 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 mx-auto"></div>
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300">Copy-Paste Templates & Scripts</td>
                    <td className="p-6 text-center">
                      <div className="w-5 h-5 rounded-full border-2 border-red-400 mx-auto"></div>
                    </td>
                    <td className="p-6 text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-slate-300 font-bold">Expected Outcome</td>
                    <td className="p-6 text-center text-red-300">Plateau at $120K-$150K</td>
                    <td className="p-6 text-center text-emerald-400 font-bold">Reach $400K+ in 18-24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Reach $400K+?
            </h2>
            <p className="text-2xl text-emerald-50 mb-8 font-semibold">
              Upgrade to the Complete Executive Presence Course
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-white/60 text-3xl font-bold line-through">$997</div>
                <div className="text-6xl font-black text-white">$397</div>
              </div>
              <p className="text-emerald-100 text-lg font-semibold mb-2">
                Exclusive upgrade pricing - Available only on this page
              </p>
              <p className="text-white/80 text-sm">
                This offer expires when you leave this page
              </p>
            </div>
            
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="inline-flex items-center gap-3 bg-white text-slate-900 font-black py-6 px-12 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-2xl transform hover:scale-105 active:scale-95 text-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  Upgrade to Complete Course - $397
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2,000+ Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
