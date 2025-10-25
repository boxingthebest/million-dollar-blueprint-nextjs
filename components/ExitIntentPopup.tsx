"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("exitPopupSeen");
    if (hasSeenPopup) {
      setIsDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from top of viewport (indicating exit intent)
      if (e.clientY <= 0 && !isDismissed) {
        setIsVisible(true);
        sessionStorage.setItem("exitPopupSeen", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 animate-pulse" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ⏰ Wait! Don't Miss This Opportunity
            </h2>
            <p className="text-xl text-slate-300 mb-2">
              Get <span className="text-orange-400 font-bold">$100 OFF</span> Your First Course
            </p>
            <p className="text-slate-400">
              Join 10,000+ professionals transforming their careers
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 mb-6 border border-cyan-500/30">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/badge-guarantee.png"
                alt="30-Day Guarantee"
                width={80}
                height={80}
                className="flex-shrink-0"
              />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Risk-Free 30-Day Guarantee
                </h3>
                <p className="text-slate-300 text-sm">
                  Try any course completely risk-free. Not satisfied? Get a full refund, no questions asked.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Lifetime access to all course materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Battle-tested frameworks from Fortune 100 companies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>30-day money-back guarantee</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://buy.stripe.com/5kQfZg2GZ5Qb5lO9JW08g02"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Claim $100 OFF Now →
            </a>
            <button
              onClick={handleClose}
              className="sm:w-auto px-6 py-4 text-slate-400 hover:text-white transition-colors text-sm"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

