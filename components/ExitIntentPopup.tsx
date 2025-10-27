"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Download, Shield, TrendingUp, Zap } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user has dismissed popup in last 7 days
    const dismissedUntil = localStorage.getItem("leadMagnetDismissed");
    if (dismissedUntil && new Date(dismissedUntil) > new Date()) {
      return;
    }

    // Check if user already subscribed
    const hasSubscribed = localStorage.getItem("leadMagnetSubscribed");
    if (hasSubscribed) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    // Desktop: Exit-intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && !isVisible) {
        hasTriggered = true;
        setIsVisible(true);
      }
    };

    // Mobile: 45-second delay (no exit-intent on mobile)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      timeoutId = setTimeout(() => {
        if (!hasTriggered && !isVisible) {
          hasTriggered = true;
          setIsVisible(true);
        }
      }, 45000); // 45 seconds
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // Don't show again for 7 days
    const dismissUntil = new Date();
    dismissUntil.setDate(dismissUntil.getDate() + 7);
    localStorage.setItem("leadMagnetDismissed", dismissUntil.toISOString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store email in localStorage to pre-fill the form on landing page
    localStorage.setItem("leadMagnetEmail", email);
    
    // Mark as subscribed to prevent popup from showing again
    localStorage.setItem("leadMagnetSubscribed", "true");
    
    // Redirect to free video course page
    router.push("/free-video-course");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden">
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

        <div className="relative z-10 p-6 md:p-10">
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
              FREE VIDEO TRAINING
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              5 Skills to Master in an AI-Resistant World
            </h2>
            <p className="text-xl text-slate-300">
              The exact skills Fortune 100 executives are learning right now
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 mb-6 border border-cyan-500/30">
            <h3 className="text-white font-bold text-lg mb-4">
              What You'll Get:
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">6 Video Lessons</strong> - 21 minutes of expert training</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">PDF Guide</strong> - Downloadable action plan</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span><strong className="text-white">Instant Access</strong> - Start learning immediately</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-4 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Free Video Training →
            </button>

            <p className="text-slate-400 text-xs text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>

          <button
            onClick={handleClose}
            className="w-full mt-4 px-6 py-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            No thanks, I don't want to future-proof my career
          </button>
        </div>
      </div>
    </div>
  );
}

