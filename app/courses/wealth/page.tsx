'use client';
import Link from 'next/link';

export default function WealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/fulllogo_nobuffer(2).jpg" alt="Million Dollar Blueprint" className="h-8 md:h-12" />
            </Link>
            <a href="#enroll" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold">
              Enroll Now
            </a>
          </div>
        </div>
      </nav>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/course-wealth.jpg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-green-500/20 text-green-300 px-6 py-2 rounded-full text-sm font-bold mb-6">
              💰 $197 • Coming Soon
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Wealth Building:{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Financial Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Build lasting wealth with strategies from Wall Street insiders (not get-rich-quick schemes)
            </p>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">What You'll Master:</h3>
              <ul className="text-left space-y-3 text-slate-300">
                <li>✓ The Goldman Sachs Wealth Acceleration Protocol™</li>
                <li>✓ Investment strategies used by high-net-worth individuals</li>
                <li>✓ Tax optimization and asset protection</li>
                <li>✓ Building multiple income streams</li>
                <li>✓ Real estate and alternative investments</li>
                <li>✓ Legacy planning and generational wealth</li>
              </ul>
            </div>
            <a href="#enroll" className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 md:px-16 py-4 md:py-6 rounded-lg font-bold text-xl md:text-2xl">
              Join Waitlist
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2025 Million Dollar Blueprint. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
