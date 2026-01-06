"use client";

import { motion } from "framer-motion";
import { Check, Gift, Zap, Shield, Clock, Award } from "lucide-react";
import Link from "next/link";

export default function GodfatherOffer() {
  const valueItems = [
    { name: "Get Paid to Train AI Course", value: "$197", icon: Zap },
    { name: "Make Your First $1K with AI Course", value: "$491", icon: Zap },
    { name: "Start Your AI Side Hustle Course", value: "$641", icon: Zap },
    { name: "AI-Resistant Skills Course", value: "$888", icon: Zap },
    { name: "Sales Mastery Course", value: "$495", icon: Zap },
    { name: "Digital Marketing Mastery Course", value: "$395", icon: Zap },
    { name: "Executive Presence Course", value: "$997", icon: Zap },
    { name: "Leadership & Influence Course", value: "$495", icon: Zap },
    { name: "Wealth Building Course", value: "$395", icon: Zap },
    { name: "The Executive Energy System™ Course", value: "$395", icon: Zap },
  ];

  const bonuses = [
    { name: "10 Professional Certificates", value: "$500", icon: Award },
    { name: "Lifetime Access & Updates", value: "$997", icon: Clock },
    { name: "The Results-Or-Refund Promise™", value: "Priceless", icon: Shield },
  ];

  const totalValue = 5389 + 500 + 997; // $6,886

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-full mb-6">
              <Gift className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold text-sm">The Godfather Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Get When You 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Join Today</span>
            </h2>
            <p className="text-xl text-slate-400">
              An offer so good, you'd feel stupid saying no
            </p>
          </motion.div>

          {/* Value Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/80 border-2 border-purple-500/30 rounded-2xl p-6 md:p-10 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              📚 All 10 Premium Courses
            </h3>
            
            {/* Course Items */}
            <div className="space-y-3 mb-8">
              {valueItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <span className="text-slate-400 font-semibold">{item.value} value</span>
                </motion.div>
              ))}
            </div>

            {/* Bonuses */}
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              🎁 Plus These Bonuses
            </h3>
            <div className="space-y-3 mb-8">
              {bonuses.map((bonus, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-purple-500/30 bg-purple-500/10 px-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <bonus.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">{bonus.name}</span>
                  </div>
                  <span className="text-purple-400 font-bold">{bonus.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Total Value */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-slate-400 text-lg mb-2">Total Value:</div>
              <div className="text-4xl md:text-5xl font-black text-white mb-4 line-through decoration-red-500">
                ${totalValue.toLocaleString()}+
              </div>
              <div className="text-slate-400 text-lg mb-2">Your Price Today:</div>
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                $797
              </div>
              <div className="inline-block bg-emerald-500/20 text-emerald-400 px-6 py-2 rounded-full text-lg font-bold">
                You Save ${(totalValue - 797).toLocaleString()} (88% OFF)
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/bundle/professional"
              className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-400 hover:via-pink-400 hover:to-purple-400 text-white px-12 py-6 rounded-xl font-bold text-xl md:text-2xl transition-all shadow-2xl shadow-purple-500/30 hover:scale-105 hover:shadow-purple-500/50"
              style={{ backgroundSize: '200% 100%' }}
            >
              Yes! Give Me Everything for $797
            </Link>
            <p className="text-slate-400 mt-4">
              ✓ Instant Access • ✓ 30-Day Guarantee • ✓ Lifetime Updates
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
