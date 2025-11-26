"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, TrendingUp, Star, Users, Zap, ArrowRight } from "lucide-react";

export default function ThankYou() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "playbook",
          productKey: "executivePresence397",
          successUrl: `${window.location.origin}/playbook/executive-presence`,
          cancelUrl: `${window.location.origin}/playbook/thank-you`,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout session. Please try again.");
      setIsLoading(false);
    }
  };

  const videos = [
    {
      title: "Video 1: Welcome & The Hidden Truth",
      url: "https://share.synthesia.io/embeds/videos/d0b8a7c8-3c1a-4b8d-b9f3-7e5c6d4a2b1c",
      description: "The 3 pillars of executive presence that took me from $70K to $400K"
    },
    {
      title: "Video 2: The Meeting Before the Meeting",
      url: "https://share.synthesia.io/embeds/videos/e1c9b8d9-4d2b-5c9e-c0g4-8f6d7e5b3c2d",
      description: "Amazon's insider strategy for winning decisions before they're made"
    },
    {
      title: "Video 3: Why Smart People Plateau at $120K",
      url: "https://share.synthesia.io/embeds/videos/f2d0c9e0-5e3c-6d0f-d1h5-9g7e8f6c4d3e",
      description: "The mindset shifts required to break into $200K-$400K territory"
    },
    {
      title: "Video 4: The Strategic Pause Technique",
      url: "https://share.synthesia.io/embeds/videos/g3e1d0f1-6f4d-7e1g-e2i6-0h8f9g7d5e4f",
      description: "How to use silence and timing to project confidence and control conversations"
    },
    {
      title: "Video 5: Making Raises Feel Inevitable",
      url: "https://share.synthesia.io/embeds/videos/h4f2e1g2-7g5e-8f2h-f3j7-1i9g0h8e6f5g",
      description: "The 4-step framework for negotiating $50K-$100K raises without sounding greedy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle2 className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to the Executive Presence Playbook!
          </h1>
          <p className="text-2xl text-emerald-50 mb-4">
            Your purchase was successful. Check your email for the receipt and PDF workbook.
          </p>
          <p className="text-lg text-emerald-100">
            Start watching the 5 video masterclasses below ↓
          </p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{video.title}</h3>
                  <p className="text-slate-600 mb-4">{video.description}</p>
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                    <iframe
                      src={video.url}
                      title={video.title}
                      loading="lazy"
                      allow="encrypted-media; fullscreen;"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upsell Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Take It to the Next Level?
              </h2>
              <p className="text-xl text-slate-300">
                You've just completed the <strong>Executive Presence Playbook</strong> — 5 foundational videos to get you started. But this is just the beginning.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-12">
              <div className="text-center mb-8">
                <p className="text-2xl text-slate-200 mb-4">
                  <strong className="text-white">The $27 Playbook gave you 5 videos. The $397 Executive Presence Course gives you the complete system.</strong>
                </p>
                <p className="text-lg text-slate-300 mb-6">
                  This is the full course from the Million Dollar Blueprint — one of 7 premium courses that professionals pay $597-$797 to access in our bundles.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">15+ Advanced Video Masterclasses</h4>
                    <p className="text-slate-300">Deep-dive videos on salary negotiation, leadership presence, strategic relationships, navigating office politics, and more.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">All Frameworks & Templates</h4>
                    <p className="text-slate-300">Downloadable email scripts, negotiation worksheets, career roadmap planner, and executive communication frameworks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Private Community Access</h4>
                    <p className="text-slate-300">Connect with ambitious professionals climbing to $400K+. Share wins, get support, and build strategic relationships.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Quarterly Group Q&A Calls</h4>
                    <p className="text-slate-300">Get your questions answered, share challenges, and stay accountable with live group coaching sessions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Lifetime Access + Future Updates</h4>
                    <p className="text-slate-300">All current content plus any new masterclasses, frameworks, or resources added in the future — yours forever.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <p className="text-lg mb-2">You Paid: $27 for 5 videos</p>
                <p className="text-5xl font-bold mb-4">
                  Complete Course: <span className="line-through text-3xl opacity-75">$597</span> $397
                </p>
                <p className="text-emerald-50 text-sm">(Exclusive Upgrade Pricing for Playbook Customers Only)</p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">The ROI is Obvious</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$50K</div>
                  <p className="text-slate-300">Average raise after implementing these frameworks</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">125:1</div>
                  <p className="text-slate-300">Return on investment (one $50K raise = $250K over 5 years)</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">12 months</div>
                  <p className="text-slate-300">Average time to promotion after mastering executive presence</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Upgrade to the Executive Presence Course Now"}
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>

            <p className="text-center text-slate-400 mt-6">
              30-Day Money-Back Guarantee • Instant Access • Lifetime Updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
