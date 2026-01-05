"use client";

import { ArrowRight, CheckCircle2, Brain, Zap, Target, Award, TrendingUp, Shield, Users, DollarSign, Star, Clock, Sparkles, Trophy, BadgeCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LazyVimeoPlayer from "@/components/LazyVimeoPlayer";

const courses = [
  {
    name: "Get Paid to Train AI",
    value: "$197",
    icon: Brain,
    color: "orange",
    description: "Master the 'hidden job market' of the AI era",
    modules: "8 modules • 3 hours"
  },
  {
    name: "Make Your First $1K with AI",
    value: "$97",
    icon: Target,
    color: "emerald",
    description: "One simple AI service you can sell for $200",
    modules: "5 modules • 2 hours"
  },
  {
    name: "Start Your AI Side Hustle",
    value: "$97",
    icon: Zap,
    color: "cyan",
    description: "Land paying clients who need AI-powered content",
    modules: "6 modules • 2.5 hours"
  },
  {
    name: "AI-Resistant Skills",
    value: "$197",
    icon: Brain,
    color: "orange",
    description: "Master the 10 proprietary frameworks AI can't replicate",
    modules: "10 modules • 3.5 hours"
  },
  {
    name: "Executive Presence",
    value: "$397",
    icon: Zap,
    color: "cyan",
    description: "Command any room with Fortune 100 executive frameworks",
    modules: "8 modules • 2.5 hours"
  },
  {
    name: "Sales Mastery",
    value: "$247",
    icon: TrendingUp,
    color: "emerald",
    description: "Close deals like top performers at Fortune 100 companies",
    modules: "12 modules • 4 hours"
  },
  {
    name: "Leadership & Influence",
    value: "$247",
    icon: Users,
    color: "purple",
    description: "Lead teams and influence without authority",
    modules: "10 modules • 3 hours"
  },
  {
    name: "Digital Marketing",
    value: "$197",
    icon: Target,
    color: "pink",
    description: "Master modern marketing strategies that drive revenue",
    modules: "8 modules • 2.5 hours"
  },
  {
    name: "Wealth Building",
    value: "$197",
    icon: DollarSign,
    color: "amber",
    description: "Build lasting wealth with proven investment frameworks",
    modules: "10 modules • 3 hours"
  },
  {
    name: "Executive Energy System",
    value: "$197",
    icon: Shield,
    color: "teal",
    description: "Sustain peak performance without burnout",
    modules: "8 modules • 2.5 hours"
  }
];

const testimonials = [
  {
    name: "David Chen",
    role: "VP of Product, Tech Startup",
    company: "Former Fortune 100",
    image: "/testimonial-david.jpg",
    text: "This bundle transformed my career trajectory. Within 6 months, I went from Senior Manager to VP.",
    rating: 5
  },
const photoMap: Record<string, string> = {};
  {
    name: "Sarah Mitchell",
    role: "Managing Director",
    company: "Fortune 100 Finance",
    image: "/testimonial-sarah.jpg",
    text: "The combination of all 7 courses gave me a complete toolkit. I've recommended this to my entire team.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Chief Strategy Officer",
    company: "Fortune 500",
    image: "/testimonial-marcus.jpg",
    text: "Best investment I've made in my career. The ROI was 50x within the first year.",
    rating: 5
  }
];

export default function ProfessionalBundlePage() {
  const totalValue = 197 + 97 + 97 + 197 + 397 + 247 + 247 + 197 + 197 + 197; // $2,070
  const bundlePrice = 797;
  const savings = totalValue - bundlePrice;
  const savingsPercent = Math.round((savings / totalValue) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-executive-team.jpg"
            alt="Executive team background"
            fill
            className="object-cover object-top opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950" />
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.2),transparent_50%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse">
              ⭐ MOST POPULAR • COMPLETE TRANSFORMATION BUNDLE
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Unlock Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Complete Potential</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get <strong className="text-white">ALL 10 Premium Courses</strong> for one incredible price. Master every skill needed to dominate in the modern business world.
            </p>
            
            {/* Price Comparison */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 text-center shadow-2xl shadow-purple-500/20">
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-widest">Total Value</div>
                <div className="text-4xl font-bold text-slate-500 line-through mb-1">$2,070</div>
              </div>
              <div className="text-purple-500 text-4xl font-black">→</div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-center shadow-2xl shadow-purple-500/40">
                <div className="text-sm text-white/80 mb-1 uppercase tracking-widest">Bundle Price</div>
                <div className="text-5xl font-black text-white mb-1">$797</div>
              </div>
            </div>
            
            <div className="inline-block bg-emerald-500/20 text-emerald-400 px-8 py-4 rounded-full text-xl font-bold mb-8 border border-emerald-500/30">
              Save $1,273 (61% OFF)
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <Link
                href="https://buy.stripe.com/dRmfZg1CV1zV29C3ly08g0o"
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 rounded-xl text-xl font-bold shadow-2xl shadow-purple-500/50 transition-all hover:scale-105"
              >
                Get All 10 Courses - $797 <ArrowRight className="ml-2" />
              </Link>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mt-12 max-w-2xl mx-auto text-left">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The "Career Insurance" Guarantee</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Complete all modules. If you don't see measurable improvement in your career within 30 days, email us for a full refund. No questions asked. <strong className="text-white">You keep all the templates and resources.</strong>
                </p>
              </div>
              
              <p className="text-orange-400 font-bold mt-8 text-xl">⚠️ Founding Member Pricing Ends January 12th — Price increases to $2,497 after</p>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 text-slate-400">
              <BadgeCheck className="w-5 h-5 text-emerald-400" />
              <span>440+ Students Enrolled</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>21+ Hours of Content</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Trophy className="w-5 h-5 text-purple-400" />
              <span>10 Certificates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Watch: Your Complete Transformation</h2>
          <div className="shadow-2xl border-2 border-purple-500/30 rounded-xl overflow-hidden">
            <LazyVimeoPlayer
              videoId="1148758892"
              title="Professional Bundle - Master Your Career"
            />
          </div>
        </div>
      </section>

      {/* All 7 Courses Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Get in the Professional Bundle
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              10 comprehensive courses covering every skill you need to accelerate your career and build lasting wealth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courses.map((course, idx) => {
              const Icon = course.icon;
              const colorClasses: {[key: string]: {bg: string, border: string, icon: string, text: string}} = {
                orange: { bg: "from-orange-900/40 to-red-900/40", border: "border-orange-500/50", icon: "bg-orange-500", text: "text-orange-300" },
                cyan: { bg: "from-cyan-900/40 to-blue-900/40", border: "border-cyan-500/50", icon: "bg-cyan-500", text: "text-cyan-300" },
                emerald: { bg: "from-emerald-900/40 to-green-900/40", border: "border-emerald-500/50", icon: "bg-emerald-500", text: "text-emerald-300" },
                purple: { bg: "from-purple-900/40 to-violet-900/40", border: "border-purple-500/50", icon: "bg-purple-500", text: "text-purple-300" },
                pink: { bg: "from-pink-900/40 to-rose-900/40", border: "border-pink-500/50", icon: "bg-pink-500", text: "text-pink-300" },
                amber: { bg: "from-amber-900/40 to-yellow-900/40", border: "border-amber-500/50", icon: "bg-amber-500", text: "text-amber-300" },
                teal: { bg: "from-teal-900/40 to-cyan-900/40", border: "border-teal-500/50", icon: "bg-teal-500", text: "text-teal-300" }
              };
              const colors = colorClasses[course.color];
              
              return (
                <div key={idx} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-2xl p-6 hover:scale-105 transition-all`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${colors.icon} p-3 rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{course.name}</h3>
                      <p className={`${colors.text} text-sm font-semibold`}>Value: {course.value}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{course.description}</p>
                  <p className="text-slate-400 text-xs">{course.modules}</p>
                </div>
              );
            })}
          </div>

          {/* Total Value Box */}
	          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-2 border-purple-500/50 rounded-2xl p-8 text-center">
	            <div className="grid md:grid-cols-3 gap-8 items-center">
	              <div>
	                <div className="text-slate-400 text-lg mb-2">Total Value</div>
	                <div className="text-4xl font-bold text-slate-400 line-through">$2,070</div>
	              </div>
	              <div>
	                <div className="text-purple-300 text-lg mb-2">Your Price Today</div>
	                <div className="text-5xl font-black text-white">$797</div>
	              </div>
	              <div>
	                <div className="text-emerald-300 text-lg mb-2">You Save</div>
	                <div className="text-4xl font-bold text-emerald-400">$1,273</div>
	              </div>
	            </div>
              <p className="text-orange-400 font-bold mt-6">⚠️ Price increases to $2,070 on January 12th</p>
	          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            What's Included With Every Course
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all">
	            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                <Clock className="w-8 h-8 text-purple-400" />
	              </div>
	              <h3 className="text-xl font-bold text-white mb-2">25+ Hours</h3>
	              <p className="text-slate-400">Of premium video content across all courses</p>
	            </div>
	            
	            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all">
	              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
	                <Trophy className="w-8 h-8 text-cyan-400" />
	              </div>
	              <h3 className="text-xl font-bold text-white mb-2">10 Certificates</h3>
	              <p className="text-slate-400">Professional certificates for each course</p>
	            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all">
              <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lifetime Access</h3>
              <p className="text-slate-400">Access all content forever, including updates</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center hover:border-amber-500/50 transition-all">
              <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">30-Day Guarantee</h3>
              <p className="text-slate-400">Full refund if you're not satisfied</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Success Stories from Our Students
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
	                <div className="flex items-center gap-4">
	                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/50">
	                    <Image
	                      src={photoMap[testimonial.name] || testimonial.image}
	                      alt={testimonial.name}
	                      fill
	                      className="object-cover"
	                    />
	                  </div>
	                  <div>
	                    <div className="font-bold text-white">{testimonial.name}</div>
	                    <div className="text-purple-400 text-sm">{testimonial.role}</div>
	                    <div className="text-slate-500 text-sm">{testimonial.company}</div>
	                  </div>
	                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Choose the Professional Bundle?
          </h2>
          
          <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-800/50 p-4 font-bold text-white">
              <div>Feature</div>
              <div className="text-center">Individual Courses</div>
              <div className="text-center text-purple-400">Professional Bundle</div>
            </div>
            
            {[
	              { feature: "All 10 Courses", individual: "Select individually", bundle: "All included" },
	              { feature: "Total Price", individual: "$2,070", bundle: "$797" },
	              { feature: "Savings", individual: "$0", bundle: "$1,273 (61%)" },
	              { feature: "Certificates", individual: "Per course", bundle: "All 10 included" },
              { feature: "Future Updates", individual: "Per course", bundle: "All courses FREE" },
              { feature: "Lifetime Access", individual: "✓", bundle: "✓" },
            ].map((row, idx) => (
              <div key={idx} className={`grid grid-cols-3 p-4 ${idx % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                <div className="text-slate-300">{row.feature}</div>
                <div className="text-center text-slate-400">{row.individual}</div>
                <div className="text-center text-emerald-400 font-semibold">{row.bundle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready for Complete Transformation?
          </h2>
          <p className="text-2xl text-white/90 mb-4">
            Join 440+ professionals who've invested in their complete development.
          </p>
	          <p className="text-xl text-white/80 mb-8">
	            Get all 10 courses for just <span className="font-bold">$797</span> (save ${savings})
	          </p>
	          
	          <Link
	            href="https://buy.stripe.com/dRmfZg1CV1zV29C3ly08g0o"
	            className="inline-flex items-center justify-center bg-white text-purple-600 hover:bg-slate-100 px-12 py-6 rounded-xl text-xl font-bold shadow-2xl transition-all hover:scale-105"
	          >
	            Get All 10 Courses Now - $797 <ArrowRight className="ml-2" />
	          </Link>
            <p className="text-white font-bold mt-6 text-xl italic">"The most comprehensive career transformation system I've ever seen."</p>
	          <p className="text-white/80 text-sm mt-6">30-Day "Career Insurance" Guarantee | Lifetime Access | Instant Access</p>
        </div>
      </section>
    </div>
  );
}
