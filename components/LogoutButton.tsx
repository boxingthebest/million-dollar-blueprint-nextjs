"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/auth/signin")
  }

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Log Out</span>
    </button>
  )
}

