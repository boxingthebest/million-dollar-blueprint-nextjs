"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

export default function ProblemAgitation() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold text-sm">The Uncomfortable Truth</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Here's What's Really Happening to 
              <span className="text-red-400"> Your Career</span>
            </h2>
            <p className="text-xl text-slate-400">
              (And Why Most Professionals Will Never Recover)
            </p>
          </motion.div>

          {/* Pain Points */}
          <div className="space-y-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/80 border border-red-500/20 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI is Coming for Your Job</h3>
                  <p className="text-slate-300 leading-relaxed">
                    <strong className="text-white">300 million jobs</strong> will be affected by AI in the next 5 years (Goldman Sachs). 
                    The professionals who survive won't be the hardest workers — they'll be the ones with 
                    <strong className="text-red-400"> skills AI can't replicate</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/80 border border-red-500/20 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">You're Running Out of Time</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Every month you wait, <strong className="text-white">younger, hungrier competitors</strong> are learning these skills. 
                    The window to position yourself as irreplaceable is closing. 
                    <strong className="text-red-400"> In 2 years, it may be too late.</strong>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/80 border border-red-500/20 rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">The Hidden Cost of Staying the Same</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Every year you don't get promoted costs you <strong className="text-white">$20,000-$50,000</strong> in lost salary. 
                    Over a 10-year career? That's <strong className="text-red-400">$200,000-$500,000</strong> you'll never get back. 
                    And that's before compounding.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transition to Solution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              But Here's the Good News...
            </h3>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              The same forces disrupting careers are creating <strong className="text-emerald-400">unprecedented opportunities</strong> for those who know how to adapt. 
              The professionals who master these 10 skills will <strong className="text-white">command premium salaries</strong> while everyone else scrambles.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
              <span>↓</span>
              <span>Here's exactly how to become one of them</span>
              <span>↓</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
