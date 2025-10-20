'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SalesMasteryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/fulllogo_nobuffer(2).jpg" alt="Million Dollar Blueprint" className="h-8 md:h-12" />
            </Link>
            <a
              href="#enroll"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-900 to-red-900/20" />
        <div className="absolute inset-0 bg-[url('/course-sales.jpg')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-500/20 text-orange-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 $247 • 253 Students Enrolled
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              The Sales Frameworks That Scaled Companies from{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                $500K to $50B+
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Why 93% of sales training fails (and the counterintuitive approach Amazon, Google & Goldman Sachs actually use)
            </p>
            <a
              href="#enroll"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl transition-all shadow-2xl"
            >
              Enroll Now - $247
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
