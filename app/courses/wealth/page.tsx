"use client";

import Image from "next/image";
import Link from "next/link";

export default function WealthPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.jpg" alt="Million Dollar Blueprint" width={200} height={60} className="h-12 w-auto md:h-16" />
          </Link>
          <Link href="/#courses" className="text-slate-300 hover:text-cyan-400 transition-colors font-semibold">
            All Courses
          </Link>
        </div>
      </nav>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Wealth Building
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              Coming Soon
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Build wealth like Wall Street insiders (without the Wall Street salary)
          </p>
          <Link
            href="/#courses"
            className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
          >
            View Available Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
