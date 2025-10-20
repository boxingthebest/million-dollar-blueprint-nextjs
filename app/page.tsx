import { ArrowRight, Star, TrendingUp, Heart, Brain, Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const courses = [
    {
      title: "AI-Resistant Skills",
      subtitle: "Future-Proof Your Career",
      price: "$197",
      originalPrice: "$395",
      icon: Brain,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      stripeLink: "https://buy.stripe.com/aFa4gy2GZemHdSkg8k08g00",
      description: "Master the 5 human skills AI will never replace. From the boardrooms of AWS & Goldman Sachs.",
      students: "253 enrolled",
    },
    {
      title: "High-Performance Wellness",
      subtitle: "Eliminate Burnout Forever",
      price: "$197",
      originalPrice: "$395",
      icon: Heart,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      stripeLink: "https://buy.stripe.com/4gMbJ095n92n7tW6xK08g01",
      description: "Executive wellness protocols to sustain peak performance without burning out.",
      students: "187 enrolled",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar with Social Links */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>info@milliondollarblueprint.ai</span>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Million Dollar Blueprint</h1>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold">Courses</a>
            <a href="#about" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold">About</a>
            <a 
              href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Founder's Welcome Video */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              Welcome from Our Founder
            </h2>
            <p className="text-xl text-slate-400 text-center mb-8">
              Learn why we created Million Dollar Blueprint
            </p>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                src="https://player.vimeo.com/video/1128640993?badge=0&autopause=0&player_id=0&app_id=58479" 
                className="w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                title="welcome-video-ENHANCED"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 backdrop-blur-sm px-8 py-3 rounded-full text-lg font-semibold">
              ⚡ Founding Member Pricing - Limited Time
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Your Skilled Way Towards
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                A Million-Dollar Future
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-200 mb-6">
              Advised by Executives from Apple, Google, Goldman Sachs & McKinsey
            </p>
            
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Master the insider strategies from the world's most successful companies. Learn from advisors who've scaled businesses from $500K to $1B+ at the highest levels.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 rounded-lg text-xl font-bold shadow-2xl shadow-cyan-500/50 transition-all"
              >
                Get Complete Bundle - Save $100 <ArrowRight className="ml-2" />
              </a>
              <a
                href="#courses"
                className="inline-flex items-center justify-center border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 backdrop-blur-sm px-12 py-6 rounded-lg text-xl font-bold transition-all"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-slate-300 font-semibold text-lg">ADVISED BY EXECUTIVES FROM:</div>
            <div className="text-slate-500 text-lg">Apple</div>
            <div className="text-slate-500 text-lg">Google</div>
            <div className="text-slate-500 text-lg">Goldman Sachs</div>
            <div className="text-slate-500 text-lg">McKinsey & Company</div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Choose Your Transformation
              </h2>
              <p className="text-2xl text-slate-400">
                Each course is packed with battle-tested strategies from 22 years at the highest levels
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {courses.map((course, idx) => {
                const Icon = course.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-all rounded-xl overflow-hidden group">
                    <div className="p-8">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${course.bgGradient} flex items-center justify-center mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-lg text-slate-400 mb-4">{course.subtitle}</p>
                      <p className="text-slate-300 mb-6">{course.description}</p>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold text-white">{course.price}</div>
                        <div className="text-xl text-slate-500 line-through">{course.originalPrice}</div>
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Save 50%
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-400 mb-6">
                        {course.students}
                      </div>
                      
                      <a
                        href={course.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full text-center bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all`}
                      >
                        Enroll Now - {course.price}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bundle Section */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-12 text-center">
              <div className="inline-block bg-cyan-500/20 text-cyan-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
                BEST VALUE
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Complete Success Bundle</h3>
              <p className="text-xl text-slate-300 mb-8">
                Get BOTH courses and save $100. Transform your career AND health.
              </p>
              <div className="text-6xl font-bold text-white mb-2">
                <span className="line-through text-slate-500 text-4xl mr-3">$394</span>
                $297
              </div>
              <p className="text-cyan-400 font-semibold mb-8">Save $100 with the bundle</p>
              <a
                href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-16 py-6 rounded-lg font-bold text-2xl transition-all shadow-2xl"
              >
                Get Bundle - Save $100
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#courses" className="text-slate-400 hover:text-cyan-400 transition-colors">Courses</a></li>
                <li><a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <p className="text-slate-400 text-sm">info@milliondollarblueprint.ai</p>
            </div>
          </div>
          <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-800">
            © 2025 Million Dollar Blueprint. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

