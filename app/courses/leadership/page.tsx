/* eslint-disable react/no-unescaped-entities */
import ApexChatbot from "@/components/ApexChatbot";
"use client";
import FuturisticBackground from "@/components/FuturisticBackground";
import TiltCard from "@/components/TiltCard";
import { motion } from "framer-motion";
import HeroSectionDivider from "@/components/HeroSectionDivider";

import { ArrowRight, Star, Check, ChevronDown, Brain, Target, Lightbulb, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LeadershipPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

    const modules = [
    {
      number: 1,
      title: "The Leadership Mindset Shift",
      duration: "8 min",
      lessons: 1,
      icon: Brain,
      topics: [
        "From manager to leader: the fundamental difference",
        "The \"Level 5 Leadership\" model from Jim Collins (Good to Great)",
        "How Satya Nadella transformed Microsoft's culture ($300B to $3T)",
        "The paradox of humility and will in great leaders",
        "Key takeaway: Authority is given. Influence is earned."
      ]
    },
    {
      number: 2,
      title: "The Steve Jobs Reality Distortion Field",
      duration: "10 min",
      lessons: 1,
      icon: Star,
      topics: [
        "How Jobs inspired teams to achieve the impossible",
        "The psychology of charisma and magnetic leadership",
        "Creating a compelling vision that people want to follow",
        "The \"Think Different\" leadership philosophy",
        "Key takeaway: Great leaders don't predict the future. They create it."
      ]
    },
    {
      number: 3,
      title: "The McKinsey 3-Layer Influence Model",
      duration: "9 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Logical appeal (data and analysis)",
        "Emotional appeal (storytelling and vision)",
        "Cooperative appeal (building coalitions)",
        "How McKinsey consultants influence C-suite executives",
        "Key takeaway: Influence requires head, heart, and hands."
      ]
    },
    {
      number: 4,
      title: "The White House Message Box Technique",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "How presidential speechwriters craft persuasive messages",
        "The 4-quadrant message framework",
        "Controlling the narrative in high-stakes situations",
        "Crisis communication from the Situation Room",
        "Key takeaway: The story you tell becomes the reality people believe."
      ]
    },
    {
      number: 5,
      title: "Navy SEAL Leadership Under Pressure",
      duration: "9 min",
      lessons: 1,
      icon: Target,
      topics: [
        "Extreme Ownership: Jocko Willink's leadership philosophy",
        "Decentralized command: empowering teams to execute",
        "Leading through chaos and uncertainty",
        "The \"Cover and Move\" teamwork principle",
        "Key takeaway: Leaders don't make excuses. They make decisions."
      ]
    },
    {
      number: 6,
      title: "Building High-Performing Teams",
      duration: "8 min",
      lessons: 1,
      icon: TrendingUp,
      topics: [
        "Google's Project Aristotle: what makes teams effective",
        "Psychological safety as the foundation of performance",
        "The \"Tuckman Model\": Forming, Storming, Norming, Performing",
        "How Amazon uses \"Two-Pizza Teams\" for agility",
        "Key takeaway: Great teams aren't built. They're engineered."
      ]
    },
    {
      number: 7,
      title: "The Art of Strategic Communication",
      duration: "10 min",
      lessons: 1,
      icon: Lightbulb,
      topics: [
        "Executive presence: commanding the room without saying a word",
        "The \"Pyramid Principle\" from McKinsey for clear communication",
        "How to present to the C-suite (Jeff Bezos' 6-page memo rule)",
        "Storytelling frameworks from Pixar and TED Talks",
        "Key takeaway: Clarity is power. Confusion is weakness."
      ]
    },
    {
      number: 8,
      title: "Conflict Resolution & Difficult Conversations",
      duration: "9 min",
      lessons: 1,
      icon: Heart,
      topics: [
        "The \"Crucial Conversations\" framework for high-stakes dialogue",
        "How to give feedback that changes behavior (not just feelings)",
        "Managing up: influencing your boss and stakeholders",
        "The \"Radical Candor\" model from Kim Scott (Google, Apple)",
        "Key takeaway: Avoiding conflict doesn't prevent it. It guarantees it."
      ]
    },
    {
      number: 9,
      title: "Decision-Making Under Uncertainty",
      duration: "10 min",
      lessons: 1,
      icon: Target,
      topics: [
        "The \"OODA Loop\" from military strategy (Observe, Orient, Decide, Act)",
        "How Jeff Bezos makes \"Type 1\" vs \"Type 2\" decisions",
        "The \"Pre-Mortem\" technique from Gary Klein",
        "Avoiding analysis paralysis in fast-moving environments",
        "Key takeaway: Speed matters. But direction matters more."
      ]
    },
    {
      number: 10,
      title: "Building Your Leadership Legacy",
      duration: "8 min",
      lessons: 1,
      icon: Star,
      topics: [
        "From individual contributor to executive: the career path",
        "Developing future leaders (succession planning)",
        "Building a personal brand as a thought leader",
        "The path to C-suite: CEO, COO, Chief of Staff",
        "Key takeaway: Leadership isn't about you. It's about who you develop."
      ]
    }
  ];

  const faqs = [
    {
      question: "I'm an introvert. Can I still be a great leader?",
      answer: "Yes. Some of the world's most influential leaders are introverts. We'll teach you how to leverage your natural strengths to become a powerful and respected leader."
    },
    {
      question: "I'm not in a formal leadership role. Is this course for me?",
      answer: "Yes. Leadership is a skill, not a title. This course will teach you how to lead from any position and influence those around you, whether you have a team or not."
    },
    {
      question: "How is this different from other leadership courses?",
      answer: "We focus on the practical, actionable techniques of influence, not just the theory of management. You'll get the specific frameworks used by leaders at the world's top companies."
    },
    {
      question: "What if I don't have a team?",
      answer: "You'll learn how to influence your peers, your boss, and your entire organization. The skills you learn in this course will make you a more effective and respected professional, no matter your role."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, a 30-day, no-questions-asked money-back guarantee. We're confident that this course will transform your career, and we're willing to prove it."
    }
  ];

  const benefits = [
    "Command any room with confidence and charisma",
    "Inspire and motivate your team to achieve the impossible",
    "Navigate complex corporate politics with ease",
    "Accelerate your career and become a sought-after leader",
    "Build a legacy of impact and influence"
  ];

  const deliverables = [
    "The Executive Presence Scorecard™",
    "The Influence & Persuasion Toolkit (20+ templates)",
    "The Storyteller's Framework",
    "The Difficult Conversation Planner",
    "50+ page workbook with real-world scenarios",
    "Access to a private community of senior leaders"
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-pink-900/20" />
        <div className="absolute inset-0 bg-[url('/course-leadership.jpg')] bg-cover bg-center opacity-10" />
        
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{animationDelay: '2s'}} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-purple-500/20 text-purple-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              👑 $247 • 189 Students Enrolled • Only 47 Spots Left This Month
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Influence is the New Authority.
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              The executive presence strategies used by leaders at McKinsey, the White House, and Navy SEALs.
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $247 (Originally $495 • Save 50%)
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
                  src="https://player.vimeo.com/video/1130648860?badge=0&autopause=0&player_id=0&app_id=58479&playsinline=1&muted=0" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  title="Leadership & Influence Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Problem: You Have Authority, But No Influence</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                You've been promoted. You have the title, the team, and the responsibility. But you feel like an imposter. Your voice isn't heard in meetings. Your ideas are overlooked. Your team is compliant, but not committed. You have authority, but you lack *influence*. In today's flat, fast-moving organizations, formal authority is a fragile and fleeting source of power. True leadership is the ability to influence without it.
              </p>
            </div>
            <div className="bg-black border-2 border-slate-600 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: "#ffffff"}}>The Solution: Master Executive Presence</h2>
              <p className="text-lg leading-relaxed" style={{color: "#ffffff"}}>
                This isn't a course on management theory. This is a deep dive into the science and art of **executive presence**. We've decoded the specific verbal and non-verbal communication techniques, storytelling frameworks, and psychological triggers used by the world's most influential leaders—from McKinsey partners and White House speechwriters to Navy SEAL commanders. You'll learn how to command any room, inspire any team, and accelerate your career.
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
              title: "The Steve Jobs \"Reality Distortion Field\"",
              description: "How to create a vision so compelling that people will do anything to make it a reality.",
              icon: <Brain className="h-20 w-20 text-purple-400" />
            }, {
              title: "The McKinsey 3-Layer Influence Model™",
              description: "A framework for persuading any audience, from the boardroom to the front lines.",
              icon: <TrendingUp className="h-20 w-20 text-purple-400" />
            }, {
              title: "The White House \"Message Box\" Technique",
              description: "How to control the narrative in any high-stakes conversation.",
              icon: <Lightbulb className="h-20 w-20 text-purple-400" />
            }, {
              title: "The Navy SEAL \"Laws of Combat\" for Corporate Politics",
              description: "How to navigate complex organizations and build powerful alliances.",
              icon: <Target className="h-20 w-20 text-purple-400" />
            }, {
              title: "The Charisma Code",
              description: "The 3 elements of charisma and how to develop them.",
              icon: <Heart className="h-20 w-20 text-purple-400" />
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
            {modules.map((module) => (
              <div key={module.number} className="bg-black border-2 border-slate-600 rounded-lg mb-4">
                <button
                  className="w-full flex justify-between items-center p-6 text-left"
                  onClick={() => setOpenModule(openModule === module.number ? null : module.number)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-yellow-500/20 p-4 rounded-full shadow-lg shadow-purple-500/50">
                      <module.icon className="h-14 w-14 text-purple-400" />
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
                          <Check className="h-5 w-5 text-purple-400" />
                          <span className="text-white">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
                    <h3 className="text-center text-white text-2xl font-bold mb-4">Learn the frameworks used by:</h3>
          <p className="text-center text-white text-lg max-w-4xl mx-auto">
            <span className="text-cyan-400 font-semibold">McKinsey consultants</span> • 
            <span className="text-cyan-400 font-semibold"> Navy SEAL commanders</span> • 
            <span className="text-cyan-400 font-semibold"> White House strategists</span> • 
            <span className="text-cyan-400 font-semibold"> Google executives</span> • 
            <span className="text-cyan-400 font-semibold"> Amazon leadership teams</span>
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
                    <Check className="h-14 w-14 text-purple-400 mt-1 flex-shrink-0" />
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
                    <Check className="h-14 w-14 text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-lg text-white">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Professional Certificate Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-500/20 to-yellow-500/20">
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
                  Leadership & Influence Certificate
                </p>
                <p className="text-white text-center text-sm md:text-base">
                  Demonstrating mastery in: Executive Presence, Strategic Leadership, Team Building, Influence Tactics
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white text-sm mb-1">Certificate ID</p>
                  <p className="text-white font-mono text-xs">MDB-LEA-XXXXX</p>
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
                  <Check className="h-5 w-5 text-purple-400" />
                  <span>Add to LinkedIn</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-purple-400" />
                  <span>Download PDF</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check className="h-5 w-5 text-purple-400" />
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
      <section id="enroll" className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Don't Just Manage. Lead.</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Ready to unlock your leadership potential? Enroll now and get lifetime access to the frameworks that build empires.</p>
          <a
            href="https://buy.stripe.com/14A7sK95nfqL4hKaO008g04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-600 px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl hover:scale-105"
          >
            Enroll Now - $247 (Originally $495 • Save 50%)
          </a>
        </div>
      </section>


      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-700 via-purple-600 to-yellow-500 border-t-4 border-purple-400 shadow-2xl z-50 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">🔥 Limited Time: Save 50% Today</p>
            <p className="text-white text-sm">30-Day Money-Back Guarantee • Lifetime Access</p>
          </div>
          <a
            href="https://buy.stripe.com/14A7sK95nfqL4hKaO008g04"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition-all shadow-xl whitespace-nowrap text-purple-700 hover:bg-purple-50"
          >
            Enroll Now - $247
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

