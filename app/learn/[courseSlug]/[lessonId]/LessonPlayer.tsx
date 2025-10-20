"use client"

import ReactPlayer, { type ReactPlayerProps } from "react-player"
import { useState, useEffect } from "react"

interface LessonPlayerProps {
  videoUrl: string
  lessonId: string
  userId: string
  isCompleted: boolean
}

export default function LessonPlayer({
  videoUrl,
  lessonId,
  userId,
  isCompleted,
}: LessonPlayerProps) {
  const [hasMarkedComplete, setHasMarkedComplete] = useState(isCompleted)

  const handleProgress = async (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    // Mark as complete when user watches 90% of the video
    if (state.played > 0.9 && !hasMarkedComplete) {
      try {
        await fetch("/api/lessons/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId,
            completed: true,
          }),
        })
        setHasMarkedComplete(true)
      } catch (error) {
        console.error("Failed to mark lesson as complete:", error)
      }
    }
  }

  // If no video URL, show placeholder
  if (!videoUrl || videoUrl === "placeholder") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-slate-400 text-lg">Video coming soon</p>
          <p className="text-slate-500 text-sm mt-2">
            This lesson is currently being prepared
          </p>
        </div>
      </div>
    )
  }

  return (
    <ReactPlayer
      url={videoUrl}
      width="100%"
      height="100%"
      controls
      onProgress={handleProgress as ReactPlayerProps['onProgress']}
      config={{
        vimeo: {
          playerOptions: {
            responsive: true,
          },
        },
      }}
    />
  )
}

