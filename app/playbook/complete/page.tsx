"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, Users, Award, Download, ChevronDown, ChevronUp, Play, FileText, Zap, Star } from "lucide-react";

export default function CompleteCourse() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modules = [
    {
      id: 1,
      title: "Foundation Module",
      description: "Master the core principles of executive presence",
      videoCount: 6,
      videos: [
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
          description: "The mindset shifts required to reach $400K+"
        }
      ]
    },
    {
      id: 2,
      title: "Advanced Implementation Module",
      description: "Apply elite frameworks from top companies",
      videoCount: 9,
      videos: [
        {
          title: "The McKinsey Problem-Solving Blueprint",
          number: 7,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141607107?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 7_ The McKinsey Problem-Solving Blueprint"></iframe></div>',
          description: "Master the 6-step problem-solving framework used by top consultants"
        },
        {
          title: "The Amazon Working Backwards Blueprint",
          number: 8,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141607526?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 8_ The Amazon _Working Backwards_ Blueprint"></iframe></div>',
          description: "Start with the customer and work backwards to build winning products"
        },
        {
          title: "The Google OKR Blueprint for Career Acceleration",
          number: 9,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141607761?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 9_ The Google OKR Blueprint for Career Acceleration"></iframe></div>',
          description: "Set and achieve ambitious goals using Google's OKR framework"
        },
        {
          title: "The Netflix Culture Blueprint for High-Performance Teams",
          number: 10,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141608131?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 10_ The Netflix Culture Blueprint for High-Performance Teams"></iframe></div>',
          description: "Build a culture of freedom, responsibility, and excellence"
        },
        {
          title: "The Apple Innovation Blueprint (Deep Dive)",
          number: 11,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141608782?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="VIDEO 11_ The Apple Innovation Blueprint (Deep Dive)"></iframe></div>',
          description: "Apply design thinking to create breakthrough innovations"
        },
        {
          title: "The Strategic Networking Blueprint",
          number: 12,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141609074?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 12_ The Strategic Networking Blueprint"></iframe></div>',
          description: "Build a powerful network with the 3-tier system"
        },
        {
          title: "The Executive Writing Blueprint",
          number: 13,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141609527?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 13_ The Executive Writing Blueprint"></iframe></div>',
          description: "Write with clarity and impact using the one-page memo framework"
        },
        {
          title: "The Financial Acumen Blueprint for Non-Finance Leaders",
          number: 14,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141611410?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 14_ The Financial Acumen Blueprint for Non-Finance Leaders"></iframe></div>',
          description: "Understand the 3 financial statements and speak the language of business"
        },
        {
          title: "The 90-Day Leadership Transition Blueprint",
          number: 15,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141611628?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 15_ The 90-Day Leadership Transition Blueprint"></iframe></div>',
          description: "Navigate your first 90 days in a new leadership role"
        }
      ]
    },
    {
      id: 3,
      title: "Executive Mastery Module",
      description: "Reach the pinnacle of executive leadership",
      videoCount: 6,
      videos: [
        {
          title: "The Boardroom Presence Blueprint",
          number: 16,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141611926?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 16_ The Boardroom Presence Blueprint"></iframe></div>',
          description: "Command respect and influence in high-stakes executive meetings"
        },
        {
          title: "The Thought Leadership Blueprint",
          number: 17,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141612249?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video 17_ The Thought Leadership Blueprint"></iframe></div>',
          description: "Build your personal brand and become a recognized expert"
        },
        {
          title: "The Wealth Generation Blueprint",
          number: 18,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141612565?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video_18_The_Wealth_Generation_Blueprint"></iframe></div>',
          description: "Build lasting wealth with the 70-20-10 investment strategy"
        },
        {
          title: "The Legacy Blueprint",
          number: 19,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141612902?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video_19_The_Legacy_Blueprint"></iframe></div>',
          description: "Define your legacy and create lasting impact"
        },
        {
          title: "The Personal Energy Management Blueprint",
          number: 20,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141613211?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video_20_The_Personal_Energy_Management_Blueprint"></iframe></div>',
          description: "Optimize your physical, mental, emotional, and spiritual energy"
        },
        {
          title: "The Executive Presence Integration Blueprint",
          number: 21,
          embedCode: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1141613480?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Video_21_The_Executive_Presence_Integration_Blueprint"></iframe></div>',
          description: "Integrate all 21 frameworks into your daily leadership practice"
        }
      ]
    }
  ];

  const pdfResources = [
    { title: "Complete Framework Library", file: "/Complete-Framework-Library.pdf", icon: FileText },
    { title: "90-Day Implementation Roadmap", file: "/90-Day-Implementation-Roadmap.pdf", icon: Zap },
    { title: "The $400K Playbook", file: "/The-400K-Playbook.pdf", icon: TrendingUp },
    { title: "Executive Communication Toolkit", file: "/Executive-Communication-Toolkit.pdf", icon: Users },
    { title: "Career Acceleration Workbook", file: "/Career-Acceleration-Workbook.pdf", icon: Award }
  ];

  const stats = [
    { number: "$127K", label: "Average Salary Increase", icon: TrendingUp },
    { number: "18 months", label: "Average Time to $200K+", icon: Zap },
    { number: "2,000+", label: "Executives Trained", icon: Users },
    { number: "97%", label: "Success Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Banner */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-700"
          style={{
            backgroundImage: "url('/hero-executive-suit.jpg')",
            backgroundSize: '40%',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
            transform: `translateY(${scrollY * 0.5}px) scale(1.05)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60">
            <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        <div className={`container relative z-10 mx-auto px-4 h-full flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Welcome to the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                Complete Executive Presence Course
              </span>
            </h1>
            
            <p className="text-2xl text-slate-300 mb-6 font-semibold">
              You now have access to all 21 video masterclasses and 5 premium resources.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg px-6 py-3">
                <p className="text-emerald-400 font-bold text-lg">✓ Complete Course Unlocked</p>
              </div>
              <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg px-6 py-3">
                <p className="text-yellow-400 font-bold text-lg">✓ Lifetime Access</p>
              </div>
            </div>
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
                  <div className="flex justify-center mb-3">
                    <Icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PDF Resources Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-4 text-center">
            Download Your <span className="text-yellow-400">Premium Resources</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 text-center">
            5 comprehensive PDF guides to accelerate your journey to $400K+
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.file}
                  download
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 hover:border-yellow-500 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-yellow-400 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Modules Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-4 text-center">
            Your <span className="text-yellow-400">21-Video Masterclass</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 text-center">
            Click any module to expand and start watching
          </p>
          
          <div className="space-y-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-black text-xl">
                      {module.id}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white mb-1">{module.title}</h3>
                      <p className="text-slate-400">{module.description} • {module.videoCount} videos</p>
                    </div>
                  </div>
                  {expandedModule === module.id ? (
                    <ChevronUp className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>

                {/* Module Videos */}
                {expandedModule === module.id && (
                  <div className="border-t border-slate-700 p-6 space-y-8">
                    {module.videos.map((video) => (
                      <div key={video.number} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Play className="w-4 h-4 text-slate-900 fill-slate-900" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">Video {video.number}: {video.title}</h4>
                            <p className="text-slate-400">{video.description}</p>
                          </div>
                        </div>
                        <div 
                          className="rounded-lg overflow-hidden shadow-2xl"
                          dangerouslySetInnerHTML={{ __html: video.embedCode }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-2 border-emerald-500 rounded-2xl p-12">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to Reach <span className="text-yellow-400">$400K+</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            You have everything you need. Start with Module 1 and work your way through systematically.
          </p>
          <div className="flex items-center justify-center gap-4 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">Lifetime Access • All 21 Videos • 5 Premium PDFs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
