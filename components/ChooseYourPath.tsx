"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChooseYourPath() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 px-6 py-2 rounded-full mb-6">
              <span className="text-cyan-400 font-semibold text-sm">CHOOSE YOUR PATH</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What's Your Goal?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Select the path that matches where you want to go
            </p>
          </motion.div>

          {/* Two Path Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Corporate Track */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="#courses" className="block group">
                <div className="relative bg-gradient-to-br from-blue-900/40 via-slate-800/50 to-indigo-900/40 border-2 border-blue-500/30 rounded-2xl p-8 md:p-10 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 h-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      🏢 Corporate Track
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-lg text-blue-300 font-semibold mb-4">
                      "I want to get promoted & earn more at my job"
                    </p>
                    
                    {/* Description */}
                    <p className="text-slate-400 mb-6">
                      Master the AI-resistant skills that Fortune 100 executives use to command six figures. Get promoted in 90 days.
                    </p>
                    
                    {/* Course List */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-blue-400">✓</span>
                        <span>AI-Resistant Skills</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-blue-400">✓</span>
                        <span>Executive Presence</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-blue-400">✓</span>
                        <span>Leadership & Influence</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-blue-400">✓</span>
                        <span>Sales Mastery</span>
                      </li>
                    </ul>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                      <span>View Career Courses</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Entrepreneur Track */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="#courses" className="block group">
                <div className="relative bg-gradient-to-br from-emerald-900/40 via-slate-800/50 to-cyan-900/40 border-2 border-emerald-500/30 rounded-2xl p-8 md:p-10 hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 h-full">
                  {/* Popular Badge */}
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    🔥 MOST POPULAR
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      💰 Entrepreneur Track
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-lg text-emerald-300 font-semibold mb-4">
                      "I want to build an AI business & make money on the side"
                    </p>
                    
                    {/* Description */}
                    <p className="text-slate-400 mb-6">
                      Learn how to monetize AI skills and build a profitable business. From your first $1K to $20K/month.
                    </p>
                    
                    {/* Course List */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-emerald-400">✓</span>
                        <span>Make Your First $1K with AI</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">START HERE</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-emerald-400">✓</span>
                        <span>The AI Income Accelerator™</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-300">
                        <span className="text-emerald-400">✓</span>
                        <span>AI Automation Agency Blueprint™</span>
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">PREMIUM</span>
                      </li>
                    </ul>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors">
                      <span>View AI Income Courses</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
