"use client"
// @ts-nocheck

import ReactPlayer from "react-player"
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

  // Check if this is a PDF download
  const isPDF = videoUrl && videoUrl.endsWith('.pdf')

  // If PDF, show download interface
  if (isPDF) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="max-w-2xl w-full text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Downloadable Resource</h3>
          <p className="text-slate-300 text-lg mb-8">
            Click the button below to download this PDF resource
          </p>
          <a
            href={videoUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            onClick={() => {
              // Mark as complete when downloaded
              if (!hasMarkedComplete) {
                fetch("/api/lessons/progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ lessonId, completed: true }),
                }).catch(console.error)
                setHasMarkedComplete(true)
              }
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
          <p className="text-slate-400 text-sm mt-6">
            The PDF will open in a new tab or download to your device
          </p>
        </div>
      </div>
    )
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
      {...{
        url: videoUrl,
        width: "100%",
        height: "100%",
        controls: true,
        onProgress: handleProgress,
        config: {
          vimeo: {
            responsive: true,
          },
        },
      } as any}
    />
  )
}

