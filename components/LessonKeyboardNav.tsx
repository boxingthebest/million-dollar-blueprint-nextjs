"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LessonKeyboardNavProps {
  courseSlug: string
  previousLessonId: string | null
  nextLessonId: string | null
}

export default function LessonKeyboardNav({
  courseSlug,
  previousLessonId,
  nextLessonId
}: LessonKeyboardNavProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Left arrow key - Previous lesson
      if (event.key === 'ArrowLeft' && previousLessonId) {
        router.push(`/learn/${courseSlug}/${previousLessonId}`)
      }

      // Right arrow key - Next lesson
      if (event.key === 'ArrowRight' && nextLessonId) {
        router.push(`/learn/${courseSlug}/${nextLessonId}`)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [courseSlug, previousLessonId, nextLessonId, router])

  return null // This component doesn't render anything
}
