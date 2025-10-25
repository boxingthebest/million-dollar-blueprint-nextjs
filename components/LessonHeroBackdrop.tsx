"use client";

import { useEffect, useState } from "react";

interface LessonHeroBackdropProps {
  lessonNumber: number;
  lessonTitle: string;
  moduleTitle: string;
  totalLessons: number;
}

export default function LessonHeroBackdrop({
  lessonNumber,
  lessonTitle,
  moduleTitle,
  totalLessons,
}: LessonHeroBackdropProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Show hero for 3 seconds when lesson changes
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [lessonNumber]);

  if (!show) return null;

  // Calculate progress percentage
  const progressPercent = Math.round((lessonNumber / totalLessons) * 100);

  // Milestone celebrations
  const isMilestone = progressPercent === 25 || progressPercent === 50 || progressPercent === 75 || progressPercent === 100;
  const milestoneMessage = {
    25: "🎯 25% Complete - You're Building Momentum!",
    50: "🚀 Halfway There - Keep Pushing Forward!",
    75: "⭐ 75% Complete - Almost at Mastery!",
    100: "🏆 Course Complete - You Did It!"
  }[progressPercent];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-lg animate-fade-in">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          {/* Module badge */}
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              {moduleTitle}
            </span>
          </div>

          {/* Lesson number */}
          <div className="mb-4">
            <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Lesson {lessonNumber}
            </span>
          </div>

          {/* Lesson title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {lessonTitle}
          </h1>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Course Progress</span>
              <span className="font-bold text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Milestone celebration */}
          {isMilestone && milestoneMessage && (
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-2xl animate-bounce-subtle">
              <p className="text-2xl font-bold text-white">{milestoneMessage}</p>
            </div>
          )}

          {/* Loading indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

