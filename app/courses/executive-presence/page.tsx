"use client";
/* eslint-disable react/no-unescaped-entities */
import ApexChatbot from "@/components/ApexChatbot";
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";
import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp, Crown, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FuturisticBackground from "@/components/FuturisticBackground";
import HeroSectionDivider from "@/components/HeroSectionDivider";

export default function ExecutivePresencePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const modules = [
    {
      number: 1,
      title: "The Goldman Sachs Framework",
      duration: "5 min",
      lessons: 1,
      icon: Crown,
      topics: [
        "Command respect in any room with the 3-pillar system used at Goldman Sachs",
        "The foundation of executive presence: gravitas, communication, and appearance",
        "How to build instant credibility in high-stakes meetings",
        "Real-world examples from Goldman Sachs boardrooms",
        "Key takeaway: Executive presence is a learnable skill, not a personality trait"
      ]
    },
    {
      number: 2,
      title: "The Strategic Pause Technique",
      duration: "5 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Control any conversation using silence as your secret weapon",
        "The psychology of the strategic pause in negotiations",
        "How top executives use silence to command attention",
        "When and how to pause for maximum impact",
        "Key takeaway: The most powerful thing you can say is nothing"
      ]
    },
    {
      number: 3,
      title: "Salary Negotiation Mastery",
      duration: "5 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The exact 3-step framework I used to negotiate $100K+ raises",
        "How to anchor the negotiation in your favor",
        "The \"walk-away\" strategy that gets you what you deserve",
        "Timing your ask for maximum leverage",
        "Key takeaway: You don't get what you deserve. You get what you negotiate"
      ]
    },
    {
      number: 4,
      title: "Executive Communication",
      duration: "5 min",
      lessons: 1,
      icon: Users,
      topics: [
        "Speak with authority and influence without needing a title",
        "The Pyramid Principle for C-suite presentations",
        "How to structure your message for executive audiences",
        "Storytelling techniques that drive action",
        "Key takeaway: Executives don't have time for details. Lead with the answer"
      ]
    },
    {
      number: 5,
      title: "The Meeting Before the Meeting",
      duration: "5 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Amazon's insider strategy for winning decisions before they're made",
        "How to build consensus before the formal meeting",
        "The art of pre-selling your ideas to key stakeholders",
        "Why decisions are made in hallways, not conference rooms",
        "Key takeaway: The meeting is just a formality. The real work happens before"
      ]
    },
    {
      number: 6,
      title: "Breaking the $120K Ceiling (BONUS)",
      duration: "5 min",
      lessons: 1,
      icon: Star,
      topics: [
        "The mindset shifts required to reach $400K+",
        "Why most professionals plateau at $120K-$150K",
        "The identity shift from employee to executive",
        "How to think like a $400K+ earner",
        "Key takeaway: Your income is a reflection of your identity, not your effort"
      ]
    },
    {
      number: 7,
      title: "The McKinsey Blueprint: How to Solve Any Business Problem",
      duration: "5 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "The exact problem-solving system used by elite consultants",
        "How to dissect complex challenges using the MECE framework",
        "Building issue trees to map every possible solution",
        "The 80/20 rule for prioritizing high-impact actions",
        "Key takeaway: Executives don't solve problems. They dissect them"
      ]
    },
    {
      number: 8,
      title: "The Amazon Blueprint: Invent Like a Day 1 Company",
      duration: "5 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "The 'Working Backwards' process Amazon uses to create world-changing products",
        "How to start with the customer and work backward to the solution",
        "Writing press releases before building the product",
        "Why Amazon banned PowerPoint in favor of 6-page memos",
        "Key takeaway: Start with the end in mind, then build the path to get there"
      ]
    },
    {
      number: 9,
      title: "The Google Blueprint: Get Promoted in Half the Time",
      duration: "5 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "The OKR system Google uses for career acceleration",
        "How to set objectives that align with company priorities",
        "Measuring key results that prove your impact",
        "The quarterly review process that drives promotions",
        "Key takeaway: You get promoted when your impact is undeniable"
      ]
    },
    {
      number: 10,
      title: "The Netflix Blueprint: Lead Like a Silicon Valley Icon",
      duration: "5 min",
      lessons: 1,
      icon: Users,
      topics: [
        "Build and lead high-performance teams using Netflix's culture principles",
        "The 'Freedom and Responsibility' framework",
        "How to hire A-players and fire fast",
        "Creating a culture of radical candor and high performance",
        "Key takeaway: Great teams are built, not found"
      ]
    },
    {
      number: 11,
      title: "The Apple Blueprint: Think Like a Design Genius",
      duration: "5 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Deep dive into Apple's innovation framework",
        "The 'Think Different' philosophy in practice",
        "How to simplify complexity and create elegant solutions",
        "Steve Jobs' product development process",
        "Key takeaway: Innovation is saying no to 1,000 things"
      ]
    },
    {
      number: 12,
      title: "The Networking Blueprint: Build a World-Class Network",
      duration: "5 min",
      lessons: 1,
      icon: Users,
      topics: [
        "Strategic networking systems for executive-level relationships",
        "The 'Give First' philosophy for building powerful connections",
        "How to network without feeling salesy or transactional",
        "Building a personal board of advisors",
        "Key takeaway: Your network is your net worth"
      ]
    },
    {
      number: 13,
      title: "The Writing Blueprint: Write Like a C-Suite Executive",
      duration: "5 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "Master executive-level written communication",
        "The BLUF (Bottom Line Up Front) writing method",
        "How to write emails that get read and acted on",
        "Crafting executive summaries and strategic memos",
        "Key takeaway: Clear writing is clear thinking"
      ]
    },
    {
      number: 14,
      title: "The Finance Blueprint: Speak the Language of the C-Suite",
      duration: "5 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Financial acumen for non-finance leaders",
        "Understanding P&L, balance sheets, and cash flow",
        "How to speak confidently about ROI, EBITDA, and margins",
        "Making data-driven decisions that drive business results",
        "Key takeaway: If you can't speak finance, you can't lead at the executive level"
      ]
    },
    {
      number: 15,
      title: "The 90-Day Blueprint: Master Any New Leadership Role",
      duration: "5 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The leadership transition framework for new roles",
        "How to make an impact in your first 90 days",
        "Building credibility and trust with your new team",
        "The 30-60-90 day plan for executive success",
        "Key takeaway: The first 90 days set the tone for your entire tenure"
      ]
    },
    {
      number: 16,
      title: "The Boardroom Blueprint: Command the Highest-Stakes Room",
      duration: "5 min",
      lessons: 1,
      icon: Crown,
      topics: [
        "Presence and influence in boardroom settings",
        "How to present to board members and investors",
        "Handling tough questions with confidence and grace",
        "The art of executive storytelling in high-stakes presentations",
        "Key takeaway: The boardroom is where careers are made or broken"
      ]
    },
    {
      number: 17,
      title: "The Thought Leadership Blueprint: Become the Go-To Expert",
      duration: "5 min",
      lessons: 1,
      icon: Star,
      topics: [
        "Build your reputation as an industry thought leader",
        "How to create content that positions you as an expert",
        "Speaking, writing, and publishing strategies",
        "Building a personal brand that opens doors",
        "Key takeaway: Thought leadership is the ultimate career accelerator"
      ]
    },
    {
      number: 18,
      title: "The Wealth Blueprint: Turn Your Income into Freedom",
      duration: "5 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Wealth generation strategies for high earners",
        "How to invest your executive income for long-term wealth",
        "Tax optimization strategies for $200K+ earners",
        "Building multiple income streams beyond your salary",
        "Key takeaway: High income doesn't equal wealth. Wealth is what you keep"
      ]
    },
    {
      number: 19,
      title: "The Legacy Blueprint: Define Your Ultimate Mission",
      duration: "5 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "Create lasting impact and define your leadership legacy",
        "How to align your career with your deepest values",
        "Building a mission-driven career that matters",
        "Defining success on your own terms",
        "Key takeaway: Your legacy is not what you achieve. It's who you become"
      ]
    },
    {
      number: 20,
      title: "The Energy Blueprint: Perform Like a World-Class Athlete",
      duration: "5 min",
      lessons: 1,
      icon: Zap,
      topics: [
        "Personal energy management for sustained high performance",
        "The sleep, nutrition, and exercise habits of top executives",
        "How to manage stress and avoid burnout",
        "Building sustainable high-performance routines",
        "Key takeaway: You can't lead others if you can't manage your own energy"
      ]
    },
    {
      number: 21,
      title: "The Final Blueprint: Make Executive Presence Your Identity",
      duration: "5 min",
      lessons: 1,
      icon: Crown,
      topics: [
        "Integration of all frameworks into your daily leadership practice",
        "Creating your personal executive presence playbook",
        "The 30-day integration challenge",
        "How to make these principles automatic and effortless",
        "Key takeaway: Executive presence is not something you do. It's who you are"
      ]
    }
  ];

  const faqs = [
    {
      question: "Who is this course for?",
      answer: "This course is for mid-level to senior professionals who want to accelerate their path to executive leadership. Whether you're a manager, director, or VP, if you're ready to command the room and influence without authority, this is for you."
    },
    {
      question: "How is this different from other leadership courses?",
      answer: "We don't teach generic leadership theory. We teach the specific frameworks, behaviors, and communication patterns used by Fortune 100 executives. This is reverse-engineered executive presence from the world's top companies."
    },
    {
      question: "I'm not naturally charismatic. Can I still develop executive presence?",
      answer: "Absolutely. Executive presence is a skill, not a personality trait. We break it down into learnable, repeatable frameworks that anyone can master with practice."
    },
    {
      question: "How long does it take to complete?",
      answer: "The course is approximately 2 hours of video content, but you'll want to spend time implementing the frameworks. Most students complete it in 2-3 weeks while applying the concepts in real-time."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, a 30-day, no-questions-asked money-back guarantee. If you don't feel like you've gotten 10x the value, we'll refund you in full."
    }
  ];

  const benefits = [
    "Command any room with confidence and gravitas",
    "Influence without authority across all levels",
    "Present to C-suite executives with clarity and impact",
    "Navigate office politics strategically",
    "Accelerate your path to senior leadership"
  ];

  const deliverables = [
    "The Executive Presence Assessment™",
    "The Gravitas Builder Framework",
    "The C-Suite Communication Playbook",
    "The Political Navigation Matrix",
    "60+ page workbook with real-world scenarios",
    "Access to a private community of executives"
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Futuristic Animated Background */}
      <FuturisticBackground variant="enrollment" />
      {/* Navigation */}
      <nav className="bg-black border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16 logo-glow" />
          </Link>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link href="/#courses" className="text-white hover:text-cyan-400 transition-colors font-semibold text-sm md:text-base">All Courses</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden animated-gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-teal-900/20" />
        <div className="absolute inset-0 bg-[url('/hero-executive-presence-futuristic.png')] bg-cover bg-top opacity-30" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              👑 $397 • 187 Students Enrolled • Only 47 Spots Left This Month
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Command Any Room. Lead Without a Title.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              The executive presence frameworks used by Fortune 100 leaders to accelerate to the C-suite.
            </p>
            <a
              href="https://buy.stripe.com/test_PLACEHOLDER_EXEC_PRESENCE"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $397 (Originally $997 • Save 60%)
            </a>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: What You'll Learn</h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-slate-600">
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/1141887983?h=9b8c7d6e5f&title=0&byline=0&portrait=0" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                  title="Executive Presence Course"
                />
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Problem: You're Invisible at the Top</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                You're smart. You work hard. You deliver results. But when it comes to promotions, you're passed over for someone with less experience but more "presence." You've been told you need to "think more strategically" or "communicate better," but no one tells you how. The truth? Executive presence isn't taught in business school. It's learned in the boardrooms of Fortune 100 companies—and we've reverse-engineered it for you.
              </p>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Solution: Master Executive Presence</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                This isn't another course on "leadership skills." This is a masterclass in **executive presence**—the invisible force that separates directors from VPs, and VPs from C-suite executives. We've studied the communication patterns, decision-making frameworks, and influence tactics of the world's top executives and distilled them into a repeatable system. You'll learn how to command any room, influence without authority, and accelerate your path to senior leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">What You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              title: "The Gravitas Framework",
              description: "How to project confidence and authority in any situation.",
              icon: <Crown className="h-20 w-20 text-emerald-400" />
            }, {
              title: "C-Suite Communication",
              description: "The McKinsey Pyramid Principle for executive presentations.",
              icon: <Users className="h-20 w-20 text-emerald-400" />
            }, {
              title: "Influence Without Authority",
              description: "How to lead cross-functional teams without being the boss.",
              icon: <Zap className="h-20 w-20 text-emerald-400" />
            }, {
              title: "Political Navigation",
              description: "Understanding and leveraging organizational power dynamics.",
              icon: <Brain className="h-20 w-20 text-emerald-400" />
            }, {
              title: "Decision-Making Under Pressure",
              description: "The OODA Loop for high-stakes executive decisions.",
              icon: <Target className="h-20 w-20 text-emerald-400" />
            }].map((item, index) => (
              <div key={index} className="bg-black p-8 rounded-lg border-2 border-slate-800">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Complete Course Curriculum</h2>
          <div className="max-w-4xl mx-auto">
            {/* Modules 1-10 */}
            {modules.slice(0, 10).map((module) => (
              <div key={module.number} className="bg-black border-2 border-slate-600 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-full shadow-lg shadow-emerald-500/50">
                      <module.icon className="h-14 w-14 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Module {module.number}: {module.title}</h3>
                      <p className="text-sm text-white">{module.duration} • {module.lessons} lessons</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-14 w-14 text-white transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                </button>
                {openModule === module.number && (
                  <div className="p-6 border-t border-slate-600">
                    <ul className="space-y-3">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-emerald-400" />
                          <span className="text-white">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            
            {/* Advanced Modules Dropdown (11-21) */}
            <div className="mt-8">
              <button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg flex justify-between items-center transition-all"
                onClick={() => setOpenModule(openModule === 999 ? null : 999)}
              >
                <span className="text-lg">View Advanced Modules (11-21)</span>
                <ChevronDown className={`h-6 w-6 transition-transform ${openModule === 999 ? 'rotate-180' : ''}`} />
              </button>
              
              {openModule === 999 && (
                <div className="mt-4 space-y-4">
                  {modules.slice(10).map((module) => (
                    <div key={module.number} className="bg-black border-2 border-slate-600 rounded-lg">
                      <button
                        className="w-full flex justify-between items-center p-6 text-left"
                        onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 rounded-full shadow-lg shadow-emerald-500/50">
                            <module.icon className="h-14 w-14 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">Module {module.number}: {module.title}</h3>
                            <p className="text-sm text-white">{module.duration} • {module.lessons} lessons</p>
                          </div>
                        </div>
                        <ChevronDown className={`h-14 w-14 text-white transition-transform ${openModule === module.number ? 'rotate-180' : ''}`} />
                      </button>
                      {openModule === module.number && (
                        <div className="p-6 border-t border-slate-600">
                          <ul className="space-y-3">
                            {module.topics.map((topic, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <Check className="h-5 w-5 text-emerald-400" />
                                <span className="text-white">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-white text-2xl font-bold mb-4">Learn the frameworks used by:</h3>
          <p className="text-center text-white text-lg max-w-4xl mx-auto">
            <span className="text-cyan-400 font-semibold">Microsoft executives</span> • 
            <span className="text-cyan-400 font-semibold"> Amazon leaders</span> • 
            <span className="text-cyan-400 font-semibold"> Google directors</span> • 
            <span className="text-cyan-400 font-semibold"> Goldman Sachs partners</span> • 
            <span className="text-cyan-400 font-semibold"> McKinsey consultants</span>
          </p>
        </div>
      </section>

      {/* Benefits & Deliverables Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">After Completing This Course, You Will:</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-14 w-14 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Proprietary Frameworks & Tools</h3>
              <ul className="space-y-4">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-14 w-14 text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Need Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900 to-black border-2 border-emerald-500 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-emerald-500/20 p-4 rounded-full">
                  <Crown className="h-12 w-12 text-emerald-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">What You Need ($397)</h2>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">21 video masterclasses (3+ hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">Complete framework library</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">Step-by-step implementation roadmap</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">Advanced C-suite strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">Private community (2,000+ executives)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-white">Copy-paste templates & frameworks</span>
                </li>
              </ul>

              <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <p className="text-2xl font-bold text-white">Result: You'll reach VP/C-suite in 18-24 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certificate Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Earn Your Professional Certificate</h2>
            <p className="text-xl text-white text-center mb-12 max-w-3xl mx-auto">
              Upon completion, receive a verified certificate you can share with employers, add to your LinkedIn profile, and showcase your expertise.
            </p>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-2xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">Certificate of Completion</h3>
                </div>
                <p className="text-white text-lg">Million Dollar Blueprint</p>
              </div>
              
              <div className="border-t-2 border-b-2 border-cyan-400/30 py-8 mb-8">
                <p className="text-white text-sm text-center mb-2">This certifies that</p>
                <p className="text-3xl md:text-4xl font-bold text-white text-center mb-4">[Your Name]</p>
                <p className="text-white text-sm text-center mb-2">has successfully completed</p>
                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-4">
                  Executive Presence Certificate
                </p>
                <p className="text-white text-center text-sm md:text-base">
                  Demonstrating mastery in: Gravitas, C-Suite Communication, Influence Without Authority, Political Navigation
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white text-sm mb-1">Certificate ID</p>
                  <p className="text-white font-mono text-xs">MDB-EXP-XXXXX</p>
                </div>
                <div>
                  <p className="text-white text-sm mb-1">Issued Date</p>
                  <p className="text-white font-semibold">Upon Completion</p>
                </div>
                <div>
                  <p className="text-white text-sm mb-1">Verification</p>
                  <p className="text-cyan-400 font-semibold">Blockchain Verified</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span>Add to LinkedIn</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span>Download PDF</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span>Share on Social Media</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-black/30 border border-cyan-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">🎓</div>
                <h4 className="text-white font-bold mb-2">Career Advancement</h4>
                <p className="text-white text-sm">Show employers your commitment to professional development</p>
              </div>
              <div className="bg-black/30 border border-purple-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-white font-bold mb-2">Verified Credentials</h4>
                <p className="text-white text-sm">Blockchain-verified certificates with unique IDs</p>
              </div>
              <div className="bg-black/30 border border-emerald-400/30 rounded-xl p-6">
                <div className="text-4xl mb-3">💼</div>
                <h4 className="text-white font-bold mb-2">LinkedIn Ready</h4>
                <p className="text-white text-sm">One-click integration with your LinkedIn profile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-800">
                <button
                  className="w-full flex justify-between items-center py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                  <ChevronDown className={`h-14 w-14 text-white transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="pb-6">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Command Any Room?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Enroll now and get lifetime access to the frameworks that accelerate careers to the C-suite.</p>
          <a
            href="https://buy.stripe.com/test_PLACEHOLDER_EXEC_PRESENCE"
            className="inline-block bg-white text-emerald-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $397 (Originally $997 • Save 60%)
          </a>
        </div>
      </section>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 border-t-4 border-emerald-400 shadow-2xl z-50 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">🔥 Limited Time: Save 60% Today</p>
            <p className="text-white text-sm">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
          <a
            href="https://buy.stripe.com/test_PLACEHOLDER_EXEC_PRESENCE"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap" style={{color: '#059669'}}
          >
            Enroll Now - $397
          </a>
        </div>
      </div>

      <ApexChatbot />

      {/* Footer */}
      <footer className="bg-slate-950 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
