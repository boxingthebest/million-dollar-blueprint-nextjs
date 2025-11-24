"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface MarkCompleteButtonProps {
  lessonId: string
  isCompleted: boolean
}

export default function MarkCompleteButton({ lessonId, isCompleted }: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(isCompleted)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggleComplete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: !completed })
      })

      if (response.ok) {
        setCompleted(!completed)
        router.refresh() // Refresh to update progress bar
      }
    } catch (error) {
      console.error('Error updating completion status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleComplete}
      disabled={loading}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        completed
          ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        'Updating...'
      ) : completed ? (
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Mark as Incomplete
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mark as Complete
        </span>
      )}
    </button>
  )
}
