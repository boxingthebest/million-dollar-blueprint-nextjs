"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have access to this resource.",
    Verification: "The verification link may have expired or already been used.",
    Default: "An authentication error occurred. Please try again.",
    CredentialsSignin: "Invalid email or password. Please try again.",
    undefined: "An unexpected error occurred. Please try signing in again.",
  }

  const message = errorMessages[error || "Default"] || errorMessages.Default

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            Authentication Error
          </h1>

          <p className="text-slate-400 mb-8">{message}</p>

          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="block w-full bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-700 transition-all duration-300"
            >
              Go Home
            </Link>
          </div>

          {error && error !== "undefined" && (
            <p className="text-slate-600 text-sm mt-6">Error code: {error}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  )
}
