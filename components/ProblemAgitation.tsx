"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, DollarSign } from "lucide-react";

export default function ProblemAgitation() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Condensed Pain Points - Side by Side */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/80 border border-red-500/20 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">AI is Coming for Your Job</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <strong className="text-white">300M jobs</strong> affected by AI in 5 years. Survivors will have 
                    <strong className="text-red-400"> skills AI can't replicate</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/80 border border-red-500/20 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">The Cost of Waiting</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Every year without a promotion costs <strong className="text-white">$20K-$50K</strong>. 
                    Over 10 years? <strong className="text-red-400">$200K-$500K lost</strong>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transition to Solution - Compact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-xl p-6"
          >
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              <strong className="text-emerald-400">Good news:</strong> The same forces disrupting careers are creating 
              <strong className="text-white"> unprecedented opportunities</strong> for those who adapt.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
