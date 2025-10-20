"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function FreeCourse() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // If not logged in, redirect to signup
      if (!session) {
        router.push(`/auth/signup?redirect=/free-course`)
        return
      }

      // Enroll in the free course
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: "ai-resistant-skills-free", // This should be the actual course ID
        }),
      })

      if (response.ok) {
        router.push("/learn/ai-resistant-skills-free")
      } else {
        setError("Failed to enroll. Please try again.")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Image
              src="/logo-main-desktop.png"
              alt="Million Dollar Blueprint"
              width={200}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            The 5 Skills A.I. Can't Replace
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Master the uniquely human skills that Fortune 100 executives use to stay irreplaceable
          </p>
          <p className="text-cyan-400 text-lg font-semibold">100% FREE • 25 Minutes • No Credit Card Required</p>
        </div>

        {/* What You'll Learn */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn:</h2>
          <div className="space-y-4">
            {[
              {
                title: "Strategic Thinking",
                description: "Frame problems and make decisions like McKinsey consultants",
              },
              {
                title: "Emotional Intelligence",
                description: "The skill 40% of Fortune 100 boards require in CEO candidates",
              },
              {
                title: "Creative Problem-Solving",
                description: "How Amazon and Google solve impossible problems",
              },
              {
                title: "Executive Presence",
                description: "Command any room and inspire confidence",
              },
              {
                title: "Adaptive Learning",
                description: "Learn faster than the world is changing",
              },
            ].map((skill, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-white font-semibold">{skill.title}</h3>
                  <p className="text-slate-400 text-sm">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Future-Proof Your Career?
          </h3>
          <p className="text-slate-300 mb-6">
            Join thousands of professionals who are mastering A.I.-resistant skills
          </p>

          {session ? (
            <button
              onClick={handleEnroll}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-12 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? "Enrolling..." : "Start Free Course Now →"}
            </button>
          ) : (
            <Link
              href="/auth/signup?redirect=/free-course"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-12 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-lg"
            >
              Get Instant Access (Free) →
            </Link>
          )}

          {error && (
            <p className="mt-4 text-red-400">{error}</p>
          )}
        </div>
      </main>
    </div>
  )
}

